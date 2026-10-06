import { createHash } from 'node:crypto';

export const SOURCE = '09eGMNTNnkE0CTxPdr7lnk';
export const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
export function parseUrl(value, requireNode = true) {
  const u = new URL(value);
  if (u.protocol !== 'https:' || !['figma.com','www.figma.com'].includes(u.hostname)) throw new Error('Figma HTTPS URL required');
  const m = u.pathname.match(/^\/design\/([A-Za-z0-9]+)(?:\/branch\/([A-Za-z0-9]+))?(?:\/|$)/);
  if (!m) throw new Error('Figma Design URL required');
  const nodeId = u.searchParams.get('node-id')?.replace(/-/g, ':');
  if (requireNode && !nodeId) throw new Error('node-id가 포함된 URL이 필요합니다');
  if (nodeId && !/^\d+:\d+$/.test(nodeId)) throw new Error('Invalid node-id');
  return {fileKey:m[2] ?? m[1],nodeId};
}
export function unwrap(value) {
  if (!value?.content) return value;
  if (value.isError) throw new Error('Figma returned an error');
  const texts = value.content.filter(c => c.type === 'text');
  for (const item of texts) { try { return JSON.parse(item.text); } catch {} }
  throw new Error('완전한 JSON이 없습니다. 응답 잘림 여부를 확인하고 더 작은 페이지로 다시 수집하세요.');
}
export function mergeChunks(chunks) {
  if (!chunks.length) throw new Error('No chunks');
  chunks = chunks.map(unwrap).sort((a,b)=>a.offset-b.offset);
  const first=chunks[0]; let next=0; const ids=new Set();
  for(const c of chunks) {
    if(c.fileKey!==first.fileKey || c.rootId!==first.rootId || c.pageId!==first.pageId || c.total!==first.total) throw new Error('Mixed snapshots');
    if(c.offset!==next || !Array.isArray(c.items) || !c.items.length) throw new Error('Missing or duplicate chunk');
    for(const n of c.items) { if(ids.has(n.id)) throw new Error('Duplicate node'); ids.add(n.id); }
    next+=c.items.length;
  }
  if(next!==first.total || chunks.at(-1).nextOffset!==null) throw new Error('Incomplete snapshot');
  const unique = key => [...new Map(chunks.flatMap(c=>c[key]??[]).map(x=>[x.id,x])).values()];
  return {schemaVersion:1,fileKey:first.fileKey,pageId:first.pageId,rootId:first.rootId,
    collectedAt:new Date().toISOString(),complete:true,total:next,items:chunks.flatMap(c=>c.items),variables:unique('variables'),styles:unique('styles')};
}

const check = (out, condition, code, message, nodeId) => { if(!condition) out.push({severity:'error',code,message,nodeId}); };
export function validatePlan(plan, registry, references) {
  const errors=[];
  check(errors,plan.schemaVersion===1,'SCHEMA','schemaVersion must be 1');
  let wire,target;
  try {wire=parseUrl(plan.wireframeUrl);target=parseUrl(plan.targetUrl);} catch(e) {errors.push({severity:'error',code:'URL',message:e.message});}
  check(errors,target?.fileKey!==SOURCE,'SOURCE_READ_ONLY','디자인 시스템 원본은 쓰기 금지');
  check(errors,!(wire && target && wire.fileKey===target.fileKey && wire.nodeId===target.nodeId),'WIRE_READ_ONLY','기획서와 동일한 노드에 쓰기 금지');
  check(errors,typeof plan.runId==='string' && /^[a-zA-Z0-9_-]+$/.test(plan.runId),'RUN_ID','안전한 고유 runId 필요');
  check(errors,Array.isArray(plan.requirements)&&plan.requirements.length>0,'REQUIREMENTS','기획 요구사항이 필요합니다');
  check(errors,references.complete===true,'REFERENCE_INCOMPLETE','템플릿 전체 수집 필요');
  check(errors,plan.referenceHash===digest(references),'STALE_REFERENCE','계획의 템플릿 해시가 현재 근거와 다릅니다');
  check(errors,plan.registryHash===digest(registry),'STALE_REGISTRY','계획의 레지스트리 해시가 현재 근거와 다릅니다');
  check(errors,plan.preflight?.sourceRechecked===true && typeof plan.preflight?.evidence==='string' && plan.preflight.evidence.length>0,'PREFLIGHT','이번 실행의 원본 재조회 근거 필요');
  const components=new Set(registry.components.filter(c=>c.type==='COMPONENT').map(c=>c.key));
  const refMap=new Map(references.items.map(n=>[n.id,n]));
  const variables=new Map([...registry.variables,...references.variables].filter(v=>v.key).map(v=>[v.id,v]));
  const reqs=new Set((plan.requirements??[]).map(r=>r.id));
  const covered=new Set();const nodeIds=new Set();
  const allowedKind=['layout','instance','text','image-region'];
  for (const n of plan.nodes??[]) {
    check(errors,typeof n.id==='string' && !nodeIds.has(n.id),'PLAN_ID','노드 id 누락 또는 중복',n.id);
    check(errors,!n.parentId || nodeIds.has(n.parentId),'PARENT','부모가 먼저 선언되어야 합니다',n.id);
    nodeIds.add(n.id);
    check(errors,allowedKind.includes(n.kind),'KIND','허용하지 않는 노드 종류',n.id);
    check(errors,typeof n.reason==='string'&&n.reason.length>0,'REASON','선택 근거 필요',n.id);
    for(const id of n.requirementIds??[]) {check(errors,reqs.has(id),'UNKNOWN_REQUIREMENT','알 수 없는 요구사항',n.id);covered.add(id);}
    const ref=refMap.get(n.referenceId);
    check(errors,!!ref,'REFERENCE','실측 템플릿 노드 필요',n.id);
    check(errors,!ref || ref.layoutPositioning!=='ABSOLUTE','ABSOLUTE_UNSUPPORTED','절대 배치는 전용 스크립트와 별도 근거 검수가 필요합니다',n.id);
    if(ref) for(const [collectionId,modeId] of Object.entries(ref.resolvedVariableModes??{})) {
      const collection=registry.collections?.find(c=>c.id===collectionId);
      if(collection && collection.modes.length>1) check(errors,plan.modes?.[collection.key]===collection.modes.find(m=>m.modeId===modeId)?.name,'MODE',`${collection.name} 모드가 참조와 다릅니다`,n.id);
    }
    if(n.kind==='instance') {
      check(errors,components.has(n.componentKey),'COMPONENT','등록된 정확한 variant component key 필요',n.id);
      check(errors,ref?.component?.key===n.componentKey,'COMPONENT_REFERENCE','참조 인스턴스와 component key 불일치',n.id);
    }
    if(n.kind==='text') {
      check(errors,ref?.type==='TEXT' && ref.segments?.length===1,'TEXT_REFERENCE','단일 스타일 텍스트 참조 필요; 혼합 스타일은 전용 작업으로 처리',n.id);
      check(errors,typeof n.characters==='string' && n.characters.length>0,'TEXT','기획서 문구 필요',n.id);
      check(errors,!!references.styles.find(s=>s.id===ref?.segments?.[0]?.textStyleId && s.key),'TEXT_STYLE','원본 텍스트 스타일 연결 필요',n.id);
      for(const paint of ref?.fills??[])check(errors,paint.type==='SOLID'&&variables.has(paint.boundVariables?.color?.id),'TEXT_PAINT','텍스트 색상 토큰 필요',n.id);
    }
    if(n.kind==='layout'||n.kind==='image-region') {
      check(errors,['FRAME','INSTANCE'].includes(ref?.type),'LAYOUT_REFERENCE','프레임 참조 필요',n.id);
      check(errors,ref?.layoutMode==='VERTICAL'||ref?.layoutMode==='HORIZONTAL','AUTO_LAYOUT','자동 레이아웃 참조 필요',n.id);
      for(const p of ['paddingTop','paddingRight','paddingBottom','paddingLeft','itemSpacing','counterAxisSpacing','topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']) {
        if(typeof ref?.[p]==='number' && ref[p]!==0) check(errors,variables.has(ref.boundVariables?.[p]?.id),'UNBOUND_METRIC',`${p}=${ref[p]} 원본에 토큰 연결 없음; 임의 토큰화 금지`,n.id);
      }
      for(const field of ['fills','strokes']) for(const paint of ref?.[field]??[]) {
        check(errors,paint.type==='SOLID'&&variables.has(paint.boundVariables?.color?.id),'UNBOUND_PAINT',`${field} 토큰 연결 필요`,n.id);
      }
      check(errors,!ref?.effects?.length,'EFFECT_UNSUPPORTED','효과가 있는 컨테이너는 원본 컴포넌트로 사용',n.id);
    }
  }
  check(errors,(plan.nodes??[]).filter(n=>!n.parentId).length===1,'ROOT','정확히 하나의 루트 필요');
  const rootNode=(plan.nodes??[]).find(n=>!n.parentId);
  check(errors,rootNode?.kind==='layout','ROOT_LAYOUT','루트는 레이아웃이어야 합니다');
  for(const n of plan.nodes??[]) if(n.parentId) check(errors,(plan.nodes??[]).find(p=>p.id===n.parentId)?.kind==='layout','PARENT_KIND','자식 추가는 레이아웃 컨테이너에만 허용합니다',n.id);
  for(const req of plan.requirements??[]) {
    check(errors,typeof req.sourceNodeId==='string' && typeof req.description==='string','REQ_SOURCE','요구사항 원본 노드 및 내용 필요');
    check(errors,covered.has(req.id),'MISSING_REQUIREMENT',`미반영 요구사항: ${req.id}`);
  }
  return {status:errors.length?'BLOCKED':'READY',errors};
}

export function validateOutput(plan, registry, references, actual, receipt, visual) {
  const errors=[...validatePlan(plan,registry,references).errors];
  check(errors,actual.complete===true && actual.items?.length===actual.total,'OUTPUT_INCOMPLETE','산출물 전체 수집 필요');
  check(errors,receipt.planHash===digest(plan),'RECEIPT_PLAN','제작 영수증과 계획 불일치');
  check(errors,receipt.status==='BUILT_REQUIRES_REVIEW','RECEIPT_STATUS','부분 실패한 제작은 완료 처리 불가');
  check(errors,receipt.rootId===actual.rootId && actual.fileKey===parseUrl(plan.targetUrl).fileKey,'OUTPUT_SCOPE','산출물 파일/루트 불일치');
  const map=new Map((actual.items??[]).map(n=>[n.id,n]));
  const refs=new Map(references.items.map(n=>[n.id,n]));
  const keys=new Set(registry.components.filter(c=>c.type==='COMPONENT').map(c=>c.key));
  const varKeys=new Set(registry.variables.map(v=>v.key));
  const actualVars=new Map((actual.variables??[]).map(v=>[v.id,v]));
  const referenceVars=new Map([...registry.variables,...references.variables].map(v=>[v.id,v]));
  const actualRoot=map.get(actual.rootId);
  for(const [collectionKey,modeName] of Object.entries(plan.modes??{})) {
    const v=(actual.variables??[]).find(v=>v.collectionKey===collectionKey);
    const modeId=actualRoot?.resolvedVariableModes?.[v?.collectionId];
    check(errors,!!v && v.modes?.find(m=>m.modeId===modeId)?.name===modeName,'OUTPUT_MODE','산출물 모드가 계획과 다르거나 조회되지 않았습니다');
  }
  const plannedOutputIds=new Set(Object.values(receipt.nodes??{}));
  for(const n of actual.items??[]) {
    if(n.type==='INSTANCE') check(errors,keys.has(n.component?.key),'FOREIGN_COMPONENT','승인되지 않은 컴포넌트 또는 누락 mainComponent',n.id);
    if(n.type==='TEXT') check(errors,!n.hasMissingFont,'MISSING_FONT','폰트 누락',n.id);
    for(const p of n.fills??[]) check(errors,p.type!=='IMAGE'&&p.type!=='VIDEO','IMAGE','이미지는 영역만 표시해야 합니다',n.id);
    let ancestor=map.get(n.parentId);let insideInstance=false;
    while(ancestor) {if(ancestor.type==='INSTANCE'){insideInstance=true;break;}ancestor=map.get(ancestor.parentId);}
    check(errors,plannedOutputIds.has(n.id)||insideInstance,'UNPLANNED_NODE','계획에 없는 독립 노드',n.id);
    const scan=v=>{if(!v||typeof v!=='object')return;if(v.type==='VARIABLE_ALIAS')check(errors,varKeys.has(actualVars.get(v.id)?.key),'FOREIGN_TOKEN','출처 불명 또는 허용하지 않은 토큰',n.id);for(const x of Object.values(v))scan(x);};
    scan(n.boundVariables);scan(n.fills);scan(n.strokes);
  }
  for(const n of plan.nodes??[]) {
    const a=map.get(receipt.nodes?.[n.id]);const r=refs.get(n.referenceId);
    check(errors,!!a,'MISSING_NODE','계획 노드 누락',n.id);if(!a||!r)continue;
    if(n.parentId)check(errors,a.parentId===receipt.nodes[n.parentId],'HIERARCHY','부모 계층 변경',a.id);
    if(n.kind==='instance') {
      check(errors,a.type==='INSTANCE' && a.component?.key===n.componentKey,'INSTANCE','인스턴스 분리/교체 감지',a.id);
      for(const [key,value] of Object.entries(n.properties??{})) check(errors,a.componentProperties?.[key]?.value===value,'PROPERTY',`속성 ${key} 불일치`,a.id);
      // Inspect inherited typography too; a valid mainComponent key alone is insufficient.
      if(Array.isArray(r.path)&&Array.isArray(a.path)) {
        const descendants=references.items.filter(x=>x.type==='TEXT' && x.path.length>r.path.length && r.path.every((v,i)=>x.path[i]===v));
        for(const t of descendants) {
          const relative=t.path.slice(r.path.length);const path=[...a.path,...relative];
          const rendered=actual.items.find(x=>JSON.stringify(x.path)===JSON.stringify(path));
          check(errors,rendered?.type==='TEXT','INSTANCE_TEXT','템플릿 내부 텍스트 계층 변경/누락',a.id);
          if(rendered?.type==='TEXT') {
            const typography=x=>(x.segments??[]).map(s=>({fontName:s.fontName,fontSize:s.fontSize,lineHeight:s.lineHeight,letterSpacing:s.letterSpacing}));
            check(errors,JSON.stringify(typography(rendered))===JSON.stringify(typography(t)),'TYPOGRAPHY','인스턴스 내부 타이포그래피 변경',rendered.id);
          }
        }
      }
    } else if(n.kind==='text') {
      check(errors,a.characters===n.characters,'COPY','문구 누락/변경',a.id);
      for(const key of ['fontName','fontSize','lineHeight','letterSpacing']) check(errors,JSON.stringify(a.segments?.[0]?.[key])===JSON.stringify(r.segments?.[0]?.[key]),'TYPOGRAPHY',`${key} 템플릿 불일치`,a.id);
      const sourceStyle=references.styles.find(s=>s.id===r.segments?.[0]?.textStyleId)?.key;
      const outputStyle=actual.styles?.find(s=>s.id===a.segments?.[0]?.textStyleId)?.key;
      check(errors,!!sourceStyle && outputStyle===sourceStyle,'STYLE_BINDING','텍스트 스타일 연결 누락/변경',a.id);
    } else {
      for(const key of ['layoutMode','itemSpacing','paddingTop','paddingRight','paddingBottom','paddingLeft','primaryAxisAlignItems','counterAxisAlignItems']) check(errors,JSON.stringify(a[key])===JSON.stringify(r[key]),'LAYOUT',`${key} 템플릿 불일치`,a.id);
    }
    if(n.kind!=='instance') {
      for(const [field,value] of Object.entries(r.boundVariables??{})) if(value?.type==='VARIABLE_ALIAS')check(errors,
        actualVars.get(a.boundVariables?.[field]?.id)?.key===referenceVars.get(value.id)?.key && !!referenceVars.get(value.id)?.key,
        'TOKEN_BINDING',`${field} 토큰 연결 누락/변경`,a.id);
      for(const field of ['fills','strokes']) {
        check(errors,(a[field]??[]).length===(r[field]??[]).length,'PAINT_COUNT',`${field} 개수 변경`,a.id);
        for(let i=0;i<(r[field]??[]).length;i++) {
          const source=r[field][i].boundVariables?.color?.id;
          check(errors,!!source && actualVars.get(a[field]?.[i]?.boundVariables?.color?.id)?.key===referenceVars.get(source)?.key,'PAINT_BINDING',`${field} 색상 토큰 변경`,a.id);
        }
      }
    }
    check(errors,a.width>0&&a.height>0,'ZERO_SIZE','크기 붕괴',a.id);
    check(errors,Math.abs(a.width-r.width)<0.1,'WIDTH','템플릿 기준 폭 불일치',a.id);
  }
  const visualOk=visual?.status==='PASS' && visual.outputHash===digest(actual) && visual.referenceHash===digest(references)
    && typeof visual.reviewer==='string' && visual.reviewer.length>0
    && ['layout','typography','spacing','clipping','overlap','requirements','icons','imageRegions'].every(k=>visual.checks?.[k]?.status==='PASS'&&visual.checks[k].evidence)
    && visual.screenshots?.reference && visual.screenshots?.output;
  check(errors,visualOk,'VISUAL_REVIEW','현재 산출물 스크린샷 기반 시각 검수 근거 필요');
  return {status:errors.length?'BLOCKED':'PASS',errors,planHash:digest(plan),outputHash:digest(actual)};
}

export function report(result, plan) {
  const esc = s => String(s??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' ');
  return `# 디자인 작업 리포트\n\n상태: **${result.status}**\n\n기획서: ${plan.wireframeUrl}\n\n산출물: ${plan.targetUrl}\n\n## 작업 근거\n\n|계획 노드|요구사항|참조 노드|선택 근거|\n|---|---|---|---|\n${(plan.nodes??[]).map(n=>`|${esc(n.id)}|${esc(n.requirementIds?.join(', '))}|${esc(n.referenceId)}|${esc(n.reason)}|`).join('\n')}\n\n## 오류 및 미검증\n\n${result.errors.length?result.errors.map(e=>`- [${e.code}] ${e.nodeId??''} ${e.message}`).join('\n'):'- 제출된 구조·시각 검수 증거에서 오류 없음.'}\n\n주의: CLI는 시각 검수를 수행하지 않습니다. 스크린샷을 확인한 검수자의 증거를 검증합니다.\n`;
}
