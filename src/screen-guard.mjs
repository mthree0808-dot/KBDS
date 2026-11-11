import fs from 'node:fs';
import { collect } from './collect.mjs';

export const screenRules = JSON.parse(fs.readFileSync(new URL('../knowledge/screen-rules.json', import.meta.url), 'utf8'));

// Pure, serializable checker: the CLI and live Figma builds run identical code.
// It never changes the canvas or claims that a screenshot has been reviewed.
export function auditScreen(snapshot, contract = {}, rules) {
  const errors = [], checked = [];
  if (!contract || typeof contract !== 'object' || Array.isArray(contract)) return {status:'BLOCKED',errors:[{severity:'error',code:'CONTRACT',message:'검수 명세는 객체여야 합니다'}],checked};
  const fail = (code, node, message) => errors.push({severity: 'error', code, nodeId: node?.id, message});
  const items = snapshot?.items ?? [], map = new Map(items.map(n => [n.id, n]));
  const root = map.get(snapshot?.rootId);
  const children = new Map();
  for (const n of items) {
    if (!children.has(n.parentId)) children.set(n.parentId, []);
    children.get(n.parentId).push(n);
  }
  const kids = n => children.get(n?.id) ?? [];
  const visible = n => {
    const seen = new Set();
    while (n) {
      if (seen.has(n.id)) return false;
      seen.add(n.id);
      if (n.visible === false || n.opacity === 0) return false;
      n = map.get(n.parentId);
    }
    return true;
  };
  const within = (n, predicate) => {
    const seen = new Set();
    while (n && !seen.has(n.id)) {seen.add(n.id); if (predicate(n)) return true; n = map.get(n.parentId);}
    return false;
  };
  const vars = new Map((snapshot?.variables ?? []).map(v => [v.id, v]));
  const styleKeys = new Map((snapshot?.styles ?? []).map(s => [s.id, s.key]));
  const token = alias => vars.get(alias?.id)?.key;
  const near = (a, b) => typeof a === 'number' && Math.abs(a - b) < 0.1;
  function resolve(path, start = root) {
    let matches = [start].filter(Boolean);
    for (const name of path) matches = matches.flatMap(kids).filter(n => n.name === name);
    return matches;
  }
  function one(path, start = root) {
    const found = resolve(path, start);
    if (found.length !== 1) fail('REQUIRED_PATH', start, `${path.join(' > ')}: 정확히 1개 필요, 실제 ${found.length}개`);
    return found.length === 1 ? found[0] : null;
  }
  function paint(n, key, show = true) {
    if (!n) return;
    const matches = (n.fills ?? []).filter(p => p.type === 'SOLID' && token(p.boundVariables?.color) === key);
    if (matches.length !== 1) fail('BG_TOKEN', n, `필수 배경 토큰 ${key} 연결 누락/중복`);
    else {
      const p = matches[0];
      if ((p.visible !== false) !== show) fail('BG_VISIBILITY', n, `배경 Paint visible은 ${show}여야 합니다`);
      if (show && (!visible(n) || within(n, a => !near(a.opacity ?? 1, 1)) || !near(p.opacity ?? 1, 1))) fail('BG_OPACITY', n, '배경 레이어·Paint 노출 및 opacity 1 필요');
    }
    checked.push({kind: 'fill', nodeId: n.id, tokenKey: key, visible: show});
  }
  function spacing(n, expected, following) {
    if (!n) return;
    if (!near(n.itemSpacing, expected)) fail('GAP', n, `${following ?? n.name}: gap ${expected}px 필요, 실제 ${n.itemSpacing}`);
    if (expected && token(n.boundVariables?.itemSpacing) !== rules.spacing[expected]) fail('GAP_TOKEN', n, `gap ${expected}px의 spacing 토큰 연결 누락/불일치`);
    checked.push({kind: 'gap', nodeId: n.id, expected});
  }
  for (const ac of items.filter(n=>n.type==='INSTANCE'&&n.name==='Accordion'&&visible(n))) {
    if (!items.some(t=>t.type==='TEXT'&&t.characters?.trim()==='알려드립니다'&&within(t,a=>a.id===ac.id))) continue;
    for (const icon of items.filter(n=>n.name==='solid-info-circle'&&visible(n)&&within(n,a=>a.id===ac.id))) {
      const vectors=items.filter(n=>visible(n)&&within(n,a=>a.id===icon.id)&&n.fills?.some(p=>p.type==='SOLID'));
      if (!vectors.length) fail('NOTICE_ICON',icon,'알려드립니다 아이콘 Fill 필요');
      for (const vector of vectors) paint(vector,rules.notice.iconColor);
    }
    for (const area of items.filter(n=>n.name==='Button Area'&&visible(n)&&within(n,a=>a.id===ac.id))) {
      const parent=map.get(area.parentId), siblings=kids(parent).filter(visible), at=siblings.indexOf(area), before=siblings[at-1];
      if (before) {
        spacing(parent,rules.notice.buttonGap);
        if (before.name==='TextList Group') spacing(before,rules.notice.listGap);
        else if (/^TextList/.test(before.name)&&siblings.filter(n=>/^TextList/.test(n.name)).length>1) fail('NOTICE_LIST_GROUP',parent,'복수 TextList는 TextList Group으로 묶습니다');
      }
      for (const button of items.filter(n=>n.name==='TextButton'&&visible(n)&&within(n,a=>a.id===area.id))) if(button.componentProperties?.size?.value!==rules.notice.buttonSize) fail('NOTICE_BUTTON_SIZE',button,'알려드립니다 TextButton size small 필요');
    }
  }
  if (!rules?.version || !rules?.colors || !rules?.spacing) fail('RULES', root, '공통 규칙 파일이 없거나 불완전합니다');
  if (!root || snapshot?.complete !== true || snapshot.total !== items.length || new Set(items.map(n => n.id)).size !== items.length) fail('SNAPSHOT', root, '완전한 현재 화면 스냅샷 필요');
  for (const n of items) if (typeof n.name !== 'string' || typeof n.type !== 'string') fail('SNAPSHOT_NODE', n, '노드 name·type 누락');
  for (const n of items) if (n.id !== snapshot?.rootId && !map.has(n.parentId)) fail('SNAPSHOT_PARENT', n, '부모 노드가 스냅샷에서 누락됐습니다');
  const reachable = new Set();
  const visit = n => {if (!n || reachable.has(n.id)) return; reachable.add(n.id); kids(n).forEach(visit);};
  visit(root);
  if (reachable.size !== items.length) fail('SNAPSHOT_TREE', root, '루트와 연결되지 않은 노드 또는 순환 계층이 있습니다');
  if (errors.length) return {status: 'BLOCKED', errors, checked, ruleVersion: rules?.version};
  const roots = kids(root);
  if(contract.firstContainerRole!==undefined&&!['feedback','top-icon'].includes(contract.firstContainerRole))fail('CONTRACT',root,'firstContainerRole은 feedback 또는 top-icon입니다');
  const insetOverrides=contract.containerInsetOverrides??[];
  if(!Array.isArray(insetOverrides))fail('CONTRACT',root,'containerInsetOverrides는 승인 경로·값·근거 배열입니다');
  const approvedInsets=new Map();
  for(const rule of Array.isArray(insetOverrides)?insetOverrides:[]){
    if(!Array.isArray(rule.path)||!rule.path.length||rule.path.some(p=>typeof p!=='string')||![0,20].includes(rule.value)||typeof rule.reason!=='string'||!rule.reason.trim()){fail('CONTRACT',root,'Container 인셋 예외에는 실제 path, value0/20, 승인 reason이 필요합니다');continue;}
    const n=one(rule.path);
    if(n&&(!/^Container(?: [1-9]\d*)?$/.test(n.name)||map.get(n.parentId)?.name!=='## BODY'))fail('CONTRACT',n,'인셋 예외는 BODY 직계 Container만 지정합니다');
    else if(n)approvedInsets.set(n.id,rule.value);
  }
  // Keypad/pattern Popup Body uses the same outside-padding ownership as
  // literal ## BODY; PDF and other native Popup bodies remain separate.
  const inputPopupBody=n=>{
    if(n.type!=='FRAME'||n.name!=='Body')return false;
    const slot=map.get(n.parentId),popup=map.get(slot?.parentId);
    return slot?.type==='SLOT'&&popup?.type==='INSTANCE'&&popup.name==='Popup'&&items.some(c=>c.type==='INSTANCE'&&['Keypad','Pattern','Centerinput / Pattern'].includes(c.name)&&visible(c)&&within(c,a=>a.id===popup.id));
  };
  for (const body of items.filter(n=>n.type==='FRAME'&&(n.name==='## BODY'||inputPopupBody(n))&&visible(n))) {
    for (const field of ['paddingTop','paddingRight','paddingBottom','paddingLeft']) if (!near(body[field],0)) fail('BODY_PADDING',body,'일반 ## BODY 및 키패드·패턴 Popup Body의 상하좌우 padding은 모두0px입니다');
    // A structural wrapper may contain page Containers. Stop at each page
    // Container; native component internals are never page Containers.
    const containers=[];
    function collectContainers(parent) {
      for(const n of kids(parent)) {
        if(!visible(n)||n.layoutPositioning==='ABSOLUTE'||n.type!=='FRAME')continue;
        if(/^Container(?: [1-9]\d*)?$/.test(n.name))containers.push(n);
        else collectContainers(n);
      }
    }
    collectContainers(body);
    function leadingUi(container) {
      let current=container;const seen=new Set();
      while(current?.type==='FRAME'&&!seen.has(current.id)) {
        seen.add(current.id);
        const first=kids(current).find(n=>visible(n)&&n.layoutPositioning!=='ABSOLUTE');
        if(!first)break;current=first;
      }
      return current;
    }
    containers.forEach((n,index)=>{
      if (n.type!=='FRAME'||n.layoutMode!=='VERTICAL') fail('BODY_CONTAINER_LAYOUT',n,'BODY의 Container는 실제 Vertical Auto Layout 프레임입니다');
      const fullWidth=items.some(c=>visible(c)&&within(c,a=>a.id===n.id)&&(c.name==='StepIndicator'||c.name==='Infobox / FullWidth'||c.name==='알려드립니다'||c.name==='Tab'&&c.componentProperties?.variant?.value==='1depth'||c.type==='INSTANCE'&&c.name==='Accordion'&&items.some(t=>t.type==='TEXT'&&t.characters?.trim()==='알려드립니다'&&within(t,a=>a.id===c.id))));
      for(const field of ['paddingLeft','paddingRight']) {
        const value=approvedInsets.get(n.id)??(fullWidth?0:20);
        if(!near(n[field],value)) fail('BODY_CONTAINER_INSET',n,`${fullWidth?'전폭':'일반'} Container의 ${field}=${value}px 필요`);
        if(value&&token(n.boundVariables?.[field])!==rules.spacing[value]) fail('BODY_CONTAINER_PADDING_TOKEN',n,`${field}: ${value}px spacing 토큰 필요`);
      }
      const lead=leadingUi(n);
      const beginsFlush=lead?.type==='INSTANCE'&&(lead.name==='StepIndicator'||lead.name==='Tab'&&lead.componentProperties?.variant?.value==='1depth');
      const beginsFeedbackOrIcon=lead?.type==='INSTANCE'&&(['Feedback','IconContainer'].includes(lead.name)||/^status-/.test(lead.name))||['feedback','top-icon'].includes(contract.firstContainerRole);
      const top=index===0?(beginsFlush?0:beginsFeedbackOrIcon?40:24):0;
      const bottom=index===containers.length-1?rules.bodyContainerLastBottom:0;
      for (const [field,value]of [['paddingTop',top],['paddingBottom',bottom]]) {
        if (!near(n[field],value)) fail('BODY_CONTAINER_PADDING',n,`${field}: ${value}px 필요`);
        if (value&&token(n.boundVariables?.[field])!==rules.spacing[value]) fail('BODY_CONTAINER_PADDING_TOKEN',n,`${field}: ${value}px spacing 토큰 필요`);
      }
    });
    checked.push({kind:'body-container-padding',nodeId:body.id,containers:containers.map(n=>n.id)});
  }
  const inferred = roots.some(n => ['Dialog','Dialog Area'].includes(n.name)) ? 'dialog'
    : roots.some(n => n.name === 'BottomSheet') ? 'bottom-sheet'
    : roots.some(n => n.name === 'Popup') ? 'popup'
    : roots.some(n => n.name === '## BODY') ? 'page' : null;
  const screenType = contract.screenType === 'auto' || !contract.screenType ? inferred : contract.screenType;
  if (contract.dialogPattern!==undefined && contract.dialogPattern!=='phone-details') fail('CONTRACT',root,'지원하지 않는 dialogPattern입니다');
  if (!['page', 'popup', 'pdf', 'dialog', 'bottom-sheet', 'layout'].includes(screenType)) fail('SCREEN_TYPE', root, '화면 유형을 판정할 수 없습니다. screenType을 명시하세요');
  if (screenType !== 'layout' && screenType) paint(root, rules.colors.white);
  const systemOS=contract.systemBarOS??'iOS';
  if(!['iOS','Android'].includes(systemOS))fail('CONTRACT',root,'systemBarOS는 사용자 지정이 있을 때만 iOS 또는 Android로 명시합니다');
  if(screenType!=='layout')for(const n of items.filter(n=>n.type==='INSTANCE'&&visible(n)&&['StatusBar','HomeIndicator'].includes(n.name))){
    const p=n.componentProperties??{},expected=n.name==='StatusBar'?systemOS:systemOS==='Android'?'AOS':'iOS';
    if((n.name==='StatusBar'?p.variant?.value:p.os?.value)!==expected||n.name==='StatusBar'&&p.mode?.value!=='light')fail('SYSTEM_BAR_OS',n,'StatusBar iOS/light·HomeIndicator iOS를 유지합니다. 폰트 오류로 OS를 대체하지 않습니다');
    checked.push({kind:'system-bar-os',nodeId:n.id,expected});
  }
  const notes=contract.annotationAllowlist??[],allowedNotes=new Map();
  if(!Array.isArray(notes))fail('CONTRACT',root,'annotationAllowlist는 실제 경로·labels·유지 근거 배열입니다');
  for(const note of Array.isArray(notes)?notes:[]){
    if(!note||!Array.isArray(note.path)||!note.path.length||note.path.some(x=>typeof x!=='string')||!Array.isArray(note.labels)||!note.labels.length||note.labels.some(x=>typeof x!=='string'||!x.trim())||typeof note.reason!=='string'||!note.reason.trim()){fail('CONTRACT',root,'어노테이션 유지에는 실제 path, 정확한 labels, reason이 필요합니다');continue;}
    const n=one(note.path);if(n)allowedNotes.set(n.id,new Set(note.labels));
  }
  for(const n of items.filter(n=>visible(n)&&(n.annotations??[]).length)){
    if(n.annotations.some(a=>!allowedNotes.get(n.id)?.has(a.labelMarkdown??a.label??'')))fail('UNREVIEWED_ANNOTATION',n,'사용자 주석과 버전 메모를 구분하고 미확인 어노테이션을 정리합니다');
    checked.push({kind:'annotations',nodeId:n.id,count:n.annotations.length});
  }
  if (screenType === 'page') {
    one(['## HEADER']); one(['## BODY']);
    const footers = roots.filter(n => ['## FOOTER', 'Footer'].includes(n.name));
    if (footers.length !== 1) fail('FOOTER', root, '일반 화면의 푸터는 정확히 1개 필요');
    if (roots.some(n => n.name === 'Popup')) fail('PAGE_POPUP', root, '일반 화면을 Popup으로 감싸지 않습니다');
  }
  const popups = roots.filter(n => n.name === 'Popup');
  if (contract.keyboardViewport !== undefined && contract.keyboardViewport !== 'fixed844') fail('CONTRACT',root,'keyboardViewport은 fixed844만 지원합니다');
  if (contract.keyboardViewport === 'fixed844' && (screenType !== 'popup' || popups.length !== 1)) fail('KEYBOARD_VIEWPORT',root,'고정844 키패드 상태는 실제 Popup 하나가 필요합니다');
  for (const popup of popups) {
    const slot = one(['Slot'], popup);
    if (!slot) continue;
    one(['Header'], slot); const body = one(['Body'], slot); one(['Footer'], slot);
    if (contract.keyboardViewport === 'fixed844') {
      const spec=rules.keyboardViewport,footer=resolve(['Footer'],slot)[0];
      if (!near(root.width,spec.width)||!near(root.height,spec.height)||root.layoutSizingVertical!=='FIXED') fail('KEYBOARD_VIEWPORT',root,'키패드 노출 상태는390×844 Fixed입니다. 키패드 때문에 Hug로 확장하지 않습니다');
      for(const n of [popup,slot,body].filter(Boolean))if(n.layoutSizingVertical!=='FILL')fail('KEYBOARD_LAYOUT',n,'고정844 키패드 Popup·Slot·Body는 남은 높이 Fill입니다');
      if(body?.clipsContent!==true)fail('KEYBOARD_LAYOUT',body,'키패드 노출 Body는 뷰포트에 맞춰 clip합니다');
      const pads=items.filter(n=>n.type==='INSTANCE'&&['Keypad','Item / Pad'].includes(n.name)&&visible(n)&&within(n,a=>a.id===footer?.id));
      if(!footer||footer.layoutPositioning!=='AUTO'||footer.layoutSizingVertical!=='HUG'||!pads.length||pads.some(n=>n.layoutPositioning!=='AUTO'))fail('KEYBOARD_LAYOUT',footer,'Footer는 AUTO·Hug이며 실제 키패드를 AUTO로 포함합니다');
      checked.push({kind:'keyboard-fixed-viewport',nodeId:root.id,height:spec.height});
    }
    // A PDF document also identifies the type when its toolbar was omitted.
    const pdf = screenType === 'pdf' || resolve(['Title Area'], body).length || resolve(['body', 'PDF Document'], body).length;
    if (body && pdf) {
      paint(one(['Title Area'], body), rules.colors.pdf);
      const viewport = one(['body'], body); paint(viewport, rules.colors.pdf);
      if (viewport) {
        const document=one(['PDF Document'], viewport);
        paint(document, rules.colors.white);
        const footer=resolve(['Footer'],slot)[0];
        // Long, fully exposed terms reserve only the area covered by the
        // absolute footer; the viewport already contributes bottom padding.
        if (root.layoutSizingVertical==='HUG' && document?.layoutSizingVertical==='HUG' && footer?.layoutPositioning==='ABSOLUTE') {
          const strokeInLayout=document.strokesIncludedInLayout && (document.strokes??[]).some(p=>p.visible!==false&&(p.opacity??1)>0);
          const bottomStroke=strokeInLayout ? (document.strokeBottomWeight??document.strokeWeight??0)*(document.strokeAlign==='INSIDE'?1:document.strokeAlign==='CENTER'?0.5:0) : 0;
          const expected=footer.height-viewport.paddingBottom-bottomStroke;
          if (!Number.isFinite(expected) || expected<0 || !near(document.paddingBottom,expected)) fail('PDF_FOOTER_PADDING',document,'긴 약관의 문서 하단 패딩은 Footer 높이 − body 하단 패딩 − 레이아웃에 포함된 하단 테두리입니다');
          const last=kids(document).filter(n=>visible(n)&&n.layoutPositioning!=='ABSOLUTE').at(-1);
          const bottom=last?.absoluteBoundingBox?.y+last?.absoluteBoundingBox?.height;
          const top=footer.absoluteBoundingBox?.y;
          if (!Number.isFinite(bottom) || !Number.isFinite(top) || !near(top,bottom)) fail('PDF_FOOTER_JOIN',last??document,'긴 약관의 마지막 콘텐츠 하단과 Footer 상단은 실제 간격0px여야 합니다');
          checked.push({kind:'pdf-footer-join',nodeId:document.id,expectedPaddingBottom:expected,gap:top-bottom});
        }
      }
    }
  }
  if (['popup', 'pdf'].includes(screenType) && popups.length !== 1) fail('POPUP', root, 'Popup 인스턴스는 정확히 1개 필요');
  const overlays = ['dialog', 'bottom-sheet'].includes(screenType);
  if (overlays) {
    one(['Dimmed']);
    const allowed = new Set(['Dimmed', 'Dialog', 'Dialog Area', 'BottomSheet', 'StatusBar', 'HomeIndicator', 'Keypad']);
    for (const n of roots) if (visible(n) && !allowed.has(n.name)) fail('OVERLAY_BACKGROUND', n, 'Dimmed 아래에 이전 화면을 재현하지 않습니다');
  }
  if (screenType === 'bottom-sheet') {
    const lists=items.filter(n=>n.type==='INSTANCE'&&n.name==='List'&&visible(n)&&within(n,a=>a.type==='INSTANCE'&&a.name==='BottomSheet'));
    const suffixes=n=>items.filter(c=>c.type==='INSTANCE'&&c.name==='Item / Suffix'&&within(c,a=>a.id===n.id));
    const navigation=contract.sheetListPattern==='navigation'||contract.sheetListPattern!=='selection'&&lists.some(n=>suffixes(n).some(c=>visible(c)&&c.componentProperties?.variant?.value==='pageIndicator'));
    if(contract.sheetListPattern!==undefined&&!['selection','navigation'].includes(contract.sheetListPattern))fail('CONTRACT',root,'sheetListPattern은 selection 또는 navigation입니다');
    if(lists.length&&!navigation){
      for(const n of lists){
        if(n.layoutSizingVertical!==rules.bottomSheetList.layoutSizingVertical||!near(n.height,rules.bottomSheetList.height))fail('SHEET_LIST_FIXED48',n,'선택 바텀시트 List는 체크 유무 모두48px·세로Fixed입니다');
        checked.push({kind:'sheet-list-sizing',nodeId:n.id,expected:'FIXED',height:48});
      }
      const explicit=contract.sheetListSelectedIndices, selected=explicit??(lists.length>rules.bottomSheetList.defaultSelectedIndex?[rules.bottomSheetList.defaultSelectedIndex]:[]);
      if(!Array.isArray(selected)||selected.some(i=>!Number.isInteger(i)||i<0||i>=lists.length)||new Set(selected).size!==selected.length)fail('CONTRACT',root,'sheetListSelectedIndices는 기획에 명시된 선택 항목의 유효한0-based 인덱스 배열입니다');
      else lists.forEach((n,i)=>{
        const chosen=selected.includes(i),prop=Object.entries(n.componentProperties??{}).find(([k])=>k.split('#')[0]==='hasSuffix')?.[1]?.value;
        if(prop!==chosen)fail('SHEET_LIST_SELECTION',n,'기획 지정 선택 우선·미지정 두 번째 List 선택과 hasSuffix가 일치해야 합니다');
        if(chosen&&!suffixes(n).some(c=>visible(c)&&c.componentProperties?.variant?.value==='checkMark'))fail('SHEET_LIST_CHECKMARK',n,'선택 List의 Item / Suffix는 노출된 checkMark여야 합니다');
      });
    }
    for (const n of roots.filter(n => ['BottomSheet', 'HomeIndicator', 'Keypad'].includes(n.name))) if (n.layoutPositioning !== 'AUTO') fail('SHEET_FLOW', n, 'BottomSheet·HomeIndicator·Keypad는 AUTO 흐름이어야 합니다');
    for (const n of roots.filter(n => ['Dimmed', 'StatusBar'].includes(n.name))) if (n.layoutPositioning !== 'ABSOLUTE') fail('SHEET_OVERLAY', n, 'Dimmed·StatusBar만 Absolute로 배치합니다');
  }
  if (screenType !== 'layout') {
    const homes = items.filter(n => n.name === 'HomeIndicator' && n.type === 'INSTANCE' && visible(n));
    if (homes.length !== 1) fail('HOME_INDICATOR', root, '노출된 HomeIndicator 인스턴스 1개 필요');
    for (const home of homes) paint(home, rules.colors.elevated, screenType !== 'dialog');
  }
  const dialogAreas = roots.filter(n => n.name === 'Dialog Area' && visible(n));
  if (screenType==='dialog' && items.filter(n=>n.type==='INSTANCE'&&n.name==='Dialog'&&visible(n)).length!==1) fail('DIALOG_INSTANCE',root,'실제 노출된 Dialog 인스턴스는 정확히 1개 필요합니다');
  if (screenType === 'dialog' && dialogAreas.length) {
    const area=one(['Dialog Area']), home=one(['HomeIndicator']);
    if (area) {
      one(['Dialog'],area);
      if (kids(area).filter(visible).some(n=>n.name!=='Dialog') || roots.some(n=>n.name==='Dialog')) fail('DIALOG_AREA_CONTENT',area,'Dialog Area 내부에는 실제 Dialog만 배치합니다');
      if (area.type!=='FRAME' || area.layoutMode!=='VERTICAL' || area.layoutSizingHorizontal!=='FILL' || area.layoutSizingVertical!=='FILL' || area.layoutPositioning!=='AUTO' || area.primaryAxisAlignItems!=='CENTER' || area.counterAxisAlignItems!=='CENTER' || !near(area.itemSpacing,0)) fail('DIALOG_AREA_LAYOUT',area,'Dialog Area는 Vertical / Fill·Fill / AUTO / 양 축 CENTER / gap0입니다');
      if (home && (!near(area.paddingTop,home.height) || ['paddingLeft','paddingRight','paddingBottom'].some(p=>!near(area[p],0)) || !near(area.height,root.height-home.height) || home.layoutPositioning!=='AUTO')) fail('DIALOG_AREA_SAFE_AREA',area,'상단 패딩은 HomeIndicator 높이만큼 보정하며 HomeIndicator는 AUTO 흐름입니다');
    }
  }
  const isPhoneGroup = n => n.name==='Title / Text' && kids(n).some(c=>c.name==='Title / Element' && items.some(t=>t.type==='TEXT' && t.characters==='대표전화' && within(t,a=>a.id===c.id)));
  for (const dialog of items.filter(n=>n.type==='INSTANCE' && n.name==='Dialog' && visible(n))) {
    const groups=items.filter(n=>isPhoneGroup(n) && within(n,a=>a.id===dialog.id));
    const finalPhone = contract.dialogPattern==='phone-details' || dialog.componentProperties?.variant?.value==='alertAccordion' && groups.length;
    if (!finalPhone) continue;
    if (dialogAreas.length!==1 || map.get(dialog.parentId)?.name!=='Dialog Area') fail('DIALOG_PHONE_AREA',dialog,'최종 대표전화·응답코드 패턴은 Dialog Area 안에 배치합니다');
    if (!near(dialog.width,320) || dialog.layoutSizingHorizontal!=='FIXED' || dialog.layoutSizingVertical!=='HUG' || dialog.layoutPositioning!=='AUTO') fail('DIALOG_PHONE_SIZE',dialog,'Dialog는 가로 Fixed320 / 세로 Hug / AUTO입니다');
    spacing(dialog,20);
    for (const [p,v] of Object.entries({paddingTop:24,paddingRight:20,paddingBottom:20,paddingLeft:20})) if (!near(dialog[p],v)) fail('DIALOG_PHONE_PADDING',dialog,`${p}=${v}px 필요`);
    const slot=one(['Slot'],dialog),accordion=one(['Accordion'],dialog),buttons=one(['ButtonGroup'],dialog);
    if (kids(dialog).filter(visible).map(n=>n.name).join('|')!=='Slot|Accordion|ButtonGroup') fail('DIALOG_PHONE_ORDER',dialog,'Slot → Accordion → ButtonGroup 순서를 유지합니다');
    if (slot) {
      spacing(slot,16);
      if (kids(slot).filter(visible).map(n=>n.name).join('|')!=='Item Group|Title / Text') fail('DIALOG_PHONE_SLOT',slot,'Slot 내부는 Item Group과 대표전화 Title / Text의 두 형제입니다');
      const group=one(['Item Group'],slot),phone=one(['Title / Text'],slot);
      if (group) {
        if (group.layoutMode!=='VERTICAL' || group.layoutSizingHorizontal!=='FILL' || group.layoutSizingVertical!=='HUG' || !near(group.itemSpacing,8)) fail('DIALOG_ITEM_GROUP',group,'상단 제목·설명은 Vertical / Fill·Hug / gap8인 Item Group으로 묶습니다');
        if (group.boundVariables?.itemSpacing && token(group.boundVariables.itemSpacing)!==rules.spacing[8]) fail('DIALOG_ITEM_GROUP_TOKEN',group,'Item Group 간격에 변수가 연결돼 있으면 spacing/md여야 합니다');
        const kinds=kids(group).filter(visible).map(n=>n.type==='INSTANCE'&&n.name==='Item / Slot'?n.componentProperties?.variant?.value:null);
        if (kinds.join('|')!=='title|description') fail('DIALOG_ITEM_GROUP',group,'실제 Item / Slot(title) → Item / Slot(description)이 필요합니다');
      }
      if (phone) {
        spacing(phone,4);
        if (phone.layoutSizingHorizontal!=='FILL' || phone.layoutSizingVertical!=='HUG' || kids(phone).map(n=>n.name).join('|')!=='Title / Element|Text') fail('DIALOG_PHONE_GROUP',phone,'대표전화는 Title / Text > Title / Element, Text로 구성합니다');
        const label=one(['Title / Element'],phone),textWrap=one(['Text'],phone);
        if (label) for (const prefix of ['tooltip#','optional#','hasSuffix#']) if (Object.entries(label.componentProperties??{}).find(([k])=>k.startsWith(prefix))?.[1]?.value!==false) fail('DIALOG_PHONE_LABEL',label,'대표전화 제목 optional·tooltip·suffix는 false입니다');
        if (textWrap) {
          const texts=kids(textWrap).filter(n=>n.type==='TEXT');
          if (texts.length!==1 || !near(textWrap.itemSpacing,0)) fail('DIALOG_PHONE_TEXT',textWrap,'Text 래퍼(gap0) 안에 실제 번호 Text 하나를 배치합니다');
          for (const t of texts) {
            if (!t.segments?.length || t.segments.some(s=>s.fontName?.family!=='Pretendard'||s.fontName?.style!=='SemiBold'||s.fontSize!==16)) fail('DIALOG_PHONE_FONT',t,'대표전화는 Pretendard SemiBold16 숫자용 원형 스타일입니다');
            if (t.hyperlink || (t.textDecoration??'NONE')!=='NONE') fail('DIALOG_PHONE_LINK',t,'대표전화에 임의 밑줄·하이퍼링크를 추가하지 않습니다');
            paint(t,rules.colors.primary);
          }
        }
      }
    }
    if (accordion) for (const [key,value] of Object.entries({type:'solid',variant:'standard',size:'small',expanded:'true'})) if (accordion.componentProperties?.[key]?.value!==value) fail('DIALOG_PHONE_ACCORDION',accordion,`자세히보기 Accordion ${key}=${value} 필요`);
    if (buttons && buttons.layoutPositioning==='ABSOLUTE') fail('DIALOG_PHONE_BUTTONS',buttons,'ButtonGroup은 Dialog 내부 일반 흐름입니다');
  }
  // Compare actual boundaries even when title and consent have different
  // Container parents. Do not merge or mutate Containers to satisfy this check.
  for (const body of items.filter(n => n.type === 'FRAME' && n.name === '## BODY' && visible(n))) {
    const flow = [];
    function flatten(n) {
      for (const c of kids(n).filter(c => visible(c) && c.layoutPositioning !== 'ABSOLUTE')) {
        if (c.type === 'FRAME') flatten(c); else flow.push(c);
      }
    }
    flatten(body);
    for (let i=0; i<flow.length-1; i++) {
      const a=flow[i], b=flow[i+1];
      if (a.name !== 'Title / Page' || b.name !== 'ConsentGroup') continue;
      if (a.parentId === b.parentId) spacing(map.get(a.parentId),24);
      else {
        const aa=a.absoluteBoundingBox, bb=b.absoluteBoundingBox;
        if (!aa || !bb) fail('TITLE_CONSENT_MEASURE',b,'분리된 제목/약관의 실제 경계 측정이 필요합니다');
        else if (!near(bb.y-aa.y-aa.height,24)) fail('TITLE_CONSENT_GAP',b,'Title / Page → ConsentGroup 실제 경계는24px입니다');
        checked.push({kind:'title-consent-boundary',nodeId:b.id,expected:24});
      }
    }
  }
  for (const footer of items.filter(n => n.type === 'SLOT' && n.name === 'FooterArea' && visible(n) && within(n,a=>a.type==='INSTANCE'&&a.name==='InputField'))) {
    if (items.some(n => n.type === 'INSTANCE' && /^TextList(?: \/|$)/.test(n.name) && visible(n) && within(n,a=>a.id===footer.id) && !within(n,a=>a.type==='INSTANCE'&&a.name==='Item / Footer'&&a.componentProperties?.variant?.value==='error'))) fail('INPUT_HINT_FOOTER',footer,'별도 설명 TextList는 InputField FooterArea 밖에서12px로 묶습니다');
  }
  for (const n of items) {
    if (!visible(n)) continue;
    if (n.type === 'INSTANCE' && !n.component?.key) fail('INSTANCE_KEY', n, '실제 원본 mainComponent key가 없습니다');
    if (n.type !== 'TEXT') continue;
    if (n.hasMissingFont) {
      const spec=rules.nativeStatusBarFontException,segments=n.segments??[];
      const accepted=spec&&segments.length>0&&segments.every(s=>s.fontName?.family===spec.fontFamily&&s.fontName?.style===spec.fontStyle)&&within(n,p=>p.type==='INSTANCE'&&p.name==='StatusBar'&&p.component?.key===spec.componentKey&&p.componentProperties?.variant?.value==='iOS'&&p.componentProperties?.mode?.value==='light');
      if(accepted)checked.push({kind:'accepted-native-status-font',nodeId:n.id,componentKey:spec.componentKey});
      else fail('MISSING_FONT', n, '누락 폰트가 있습니다');
    }
    const parent = map.get(n.parentId);
    if (parent?.name === 'Label' && n.name === '버튼명' && within(parent, p => p.type === 'INSTANCE' && ['BoxButton', 'TextButton'].includes(p.name))) {
      if (n.layoutSizingHorizontal !== 'HUG' || n.textAutoResize !== 'WIDTH_AND_HEIGHT') fail('CTA_HUG', n, 'Label 문구는 원형 가로 Hug / WIDTH_AND_HEIGHT여야 합니다');
    }
    if (within(n, p => p.name === 'StatusBar') || n.name === 'Bullet') continue;
    const value = (n.characters ?? '').trim();
    const numeric = /\d/.test(value) && /^[\d\s.,:;+/()%~−–—-]+$/.test(value);
    const family = value === '더미이미지' || numeric ? 'Pretendard' : /\p{L}/u.test(value) ? 'KBFG Text' : null;
    if (family) {
      const segments = n.segments ?? [];
      if (!segments.length || segments.some(s => s.fontName?.family !== family)) fail('FONT_FAMILY', n, `${value}: ${family} 필요`);
      if (segments.some(s => !s.textStyleId && !s.boundVariables?.fontFamily)) fail('FONT_BINDING', n, '텍스트 스타일 또는 fontFamily 변수 연결 필요');
    }
    let input = map.get(n.parentId);
    while (input && !(input.type === 'INSTANCE' && input.name === 'Item / Input')) input=map.get(input.parentId);
    if (numeric && input && within(input,a=>a.type==='INSTANCE'&&a.name==='InputField') && rules.inputNumeric?.itemVariants.includes(input.componentProperties?.variant?.value)) {
      const spec=rules.inputNumeric, segments=n.segments??[];
      if (!segments.length || segments.some(s=>styleKeys.get(s.textStyleId)!==spec.styleKey || s.fontName?.family!=='Pretendard' || s.fontName?.style!=='SemiBold')) fail('INPUT_NUMERIC_STYLE',n,'숫자 입력은 최신 Numeric md 스타일의 실제 Pretendard SemiBold와 Text Style 연결을 보존합니다');
      if (!segments.length || segments.some(s=>Object.entries(spec.bindings).some(([field,key])=>token(s.boundVariables?.[field])!==key))) fail('INPUT_NUMERIC_BINDINGS',n,'숫자 입력의 fontFamily·fontWeight·fontSize·lineHeight·letterSpacing 변수 연결이 필요합니다');
    }
  }
  // Approved dummy artwork is portable: its PNG SHA-1 is Figma's imageHash.
  // Real content images without the editable dummy label are outside this rule.
  for (const area of items.filter(n => n.name === 'Image Area' && visible(n))) {
    const labels = items.filter(n => n.type === 'TEXT' && n.characters === '더미이미지' && visible(n) && within(n, a => a.id === area.id));
    if (!labels.length) continue;
    const spec = rules.dummyImage;
    const label = labels[0], image = kids(area).find(n => n.type === 'INSTANCE' && n.name === 'ImageContainer');
    if (!spec) {fail('DUMMY_RULES', area, '최신 더미이미지 독립 명세가 필요합니다'); continue;}
    if (labels.length !== 1 || label.parentId !== area.id || !image || kids(area).length !== 2) fail('DUMMY_STRUCTURE', area, 'Image Area 직계에 native ImageContainer와 편집 가능한 더미이미지 TEXT만 필요합니다');
    if (area.layoutMode !== 'VERTICAL' || area.layoutSizingHorizontal !== 'FILL' || area.layoutSizingVertical !== 'HUG' || area.layoutPositioning === 'ABSOLUTE' || !near(area.itemSpacing,0) || !near(area.paddingTop,40) || !near(area.paddingBottom,40) || !near(area.paddingLeft,0) || !near(area.paddingRight,0) || (area.fills ?? []).length || (area.strokes ?? []).length) fail('DUMMY_AREA', area, 'Image Area는 Vertical Fill/Hug AUTO·padding40/0/40/0·gap0·배경/선 없음입니다');
    for (const field of ['paddingTop','paddingBottom']) if (token(area.boundVariables?.[field]) !== rules.spacing[40]) fail('DUMMY_PADDING_TOKEN', area, 'Image Area 상하40 spacing/6xl 연결 필요');
    if (image) {
      if (image.component?.key !== spec.componentKey || image.componentProperties?.ratio?.value !== '2:1' || image.layoutSizingHorizontal !== 'FILL' || image.layoutSizingVertical !== 'FIXED' || image.layoutPositioning === 'ABSOLUTE' || !near(image.width,area.width) || !near(image.height,image.width/2) || !near(area.height,image.height+80)) fail('DUMMY_IMAGE_LAYOUT', image, '최신 ImageContainer ratio2:1 Fill/Fixed와 Image Area 크기를 보존합니다');
      const p = image.fills?.[0];
      const matrixOk = Array.isArray(p?.imageTransform) && p.imageTransform.length === 2 && p.imageTransform.every((row,i) => row.length === 3 && row.every((v,j) => near(v,spec.imageTransform[i][j])));
      if (image.fills?.length !== 1 || p?.type !== 'IMAGE' || p.imageHash !== spec.imageHash || p.scaleMode !== 'CROP' || p.visible === false || !near(p.opacity ?? 1,1) || !near(p.scalingFactor,0.5) || !matrixOk || Object.values(p.filters ?? {}).some(v => !near(v,0))) fail('DUMMY_IMAGE_PAINT', image, '저장 원본 PNG·CROP·승인 imageTransform/scalingFactor를 보존합니다');
    }
    const segments = label.segments ?? [];
    const familyAlias = label.boundVariables?.fontFamily;
    if (!segments.length || segments.some(s => s.fontName?.family !== 'Pretendard' || s.fontName?.style !== 'SemiBold' || !near(s.fontSize,spec.fontSize) || s.lineHeight?.unit !== 'PERCENT' || !near(s.lineHeight.value,140) || !near(s.letterSpacing?.value,0)) || ![spec.fontFamilyVariableKey,...(spec.compatibleFontFamilyVariableKeys??[])].includes(token(Array.isArray(familyAlias)?familyAlias[0]:familyAlias))) fail('DUMMY_LABEL_FONT', label, '더미 라벨은 Pretendard SemiBold21·행간140%·자간0·원본 fontFamily 변수입니다');
    const f=label.fills?.[0], st=label.strokes?.[0];
    if (label.fills?.length !== 1 || f?.type !== 'SOLID' || f.visible === false || !near(f.opacity,0.4) || !near(f.color?.r,1) || !near(f.color?.g,0) || !near(f.color?.b,0) || label.strokes?.length !== 1 || st?.type !== 'SOLID' || st.visible === false || !near(st.opacity ?? 1,1) || !near(st.color?.r,1) || !near(st.color?.g,1) || !near(st.color?.b,1) || !near(label.strokeWeight,2) || label.strokeAlign !== 'OUTSIDE') fail('DUMMY_LABEL_PAINT', label, '더미 라벨 빨강40% Fill·흰색2px OUTSIDE Stroke 필요');
    if (label.layoutPositioning !== 'ABSOLUTE' || label.constraints?.horizontal !== 'CENTER' || label.constraints?.vertical !== 'CENTER' || label.textAutoResize !== 'WIDTH_AND_HEIGHT' || label.textAlignHorizontal !== 'CENTER' || Math.abs(label.x-(area.width-label.width)/2)>1 || Math.abs(label.y-(area.height-label.height)/2)>1) fail('DUMMY_LABEL_POSITION', label, '편집 가능한 더미 라벨은 ABSOLUTE·CENTER constraints·중앙 배치입니다');
    checked.push({kind:'approved-dummy-image',nodeId:area.id});
  }
  // Check authored groups; leave native component internals intact. Editable
  // Slot content is included, since these frames are assembled by the designer.
  function authored(n) {
    let p = map.get(n.parentId);
    while (p) {
      if (p.type === 'SLOT') return true;
      if (p.type === 'INSTANCE') return false;
      p = map.get(p.parentId);
    }
    return true;
  }
  for(const n of items.filter(n=>n.type==='FRAME'&&visible(n)&&authored(n)&&n.layoutMode==='HORIZONTAL')){
    const content=kids(n).filter(c=>visible(c)&&c.layoutPositioning!=='ABSOLUTE');
    if(!content.length)continue;
    if(n.name==='Title / TextButton'&&(n.layoutSizingHorizontal!=='FILL'||n.layoutSizingVertical!=='HUG'))fail('TITLE_BUTTON_SIZING',n,'Title / TextButton은 Horizontal Fill/Hug이며 방향 변경 후 sizing을 재설정합니다');
    if(content.some(c=>typeof c.y==='number'&&typeof c.height==='number'&&(c.y<-.1||c.y+c.height>n.height+.1)))fail('CONTENT_WRAPPER_HEIGHT',n,'콘텐츠 자식이 부모 높이 밖으로 넘칩니다. 초기화용1px Fixed 높이를 남기지 않습니다');
  }
  for(const n of items.filter(n=>n.type==='INSTANCE'&&n.name==='DataList'&&visible(n))){
    let p=map.get(n.parentId),card=null,group=null;
    while(p){if(!group&&p.type==='INSTANCE'&&p.name===rules.cardSlot.dataListGroupComponent)group=p;if(p.type==='INSTANCE'&&p.name==='Card / Surface'){card=p;break;}p=map.get(p.parentId);}
    if(!card||!authored(card))continue;
    if(!group||group.componentProperties?.variant?.value!==rules.cardSlot.dataListVariant||!within(n,a=>a.type==='SLOT'&&map.get(a.parentId)?.id===group.id))fail('CARD_DATALIST_GROUP_C',n,'Card 내부 DataList는 실제 Group-C(variant:dataList)의 Slot 안에 배치합니다');
    checked.push({kind:'card-datalist-group-c',nodeId:n.id,cardId:card.id});
  }
  const baselines=contract.cardSlotBaselines??[];
  if(!Array.isArray(baselines))fail('CONTRACT',root,'cardSlotBaselines는 편집 전 Card Slot 구조 배열입니다');
  function preserveCardChildren(parent,specs){
    if(!Array.isArray(specs)){fail('CONTRACT',parent,'보존 children은 이름·타입·선택적 children 배열입니다');return;}
    const actual=kids(parent);let cursor=0;
    for(const spec of specs){
      if(!spec||typeof spec.name!=='string'||typeof spec.type!=='string'){fail('CONTRACT',parent,'보존 구조의 name·type이 필요합니다');continue;}
      const i=actual.findIndex((n,index)=>index>=cursor&&n.name===spec.name&&n.type===spec.type);
      if(i<0){fail('CARD_SLOT_STRUCTURE',parent,`원형 구조 ${spec.name}(${spec.type}) 삭제·재명명·재부모화·순서 변경: 삭제하지 않고 눈을 끕니다`);continue;}
      cursor=i+1;if(spec.children!==undefined)preserveCardChildren(actual[i],spec.children);
    }
  }
  for(const baseline of Array.isArray(baselines)?baselines:[]){
    if(!baseline||!Array.isArray(baseline.path)||!baseline.path.length||baseline.path.some(p=>typeof p!=='string')){fail('CONTRACT',root,'cardSlotBaselines에는 정확한 Slot path가 필요합니다');continue;}
    const slot=one(baseline.path);if(!slot)continue;
    if(slot.type!=='SLOT'||slot.name!=='Slot'||map.get(slot.parentId)?.type!=='INSTANCE'||map.get(slot.parentId)?.name!=='Card / Surface'){fail('CONTRACT',slot,'보존 기준은 실제 Card / Surface 직계 Slot입니다');continue;}
    preserveCardChildren(slot,baseline.children);checked.push({kind:'card-slot-structure',nodeId:slot.id,includesHidden:true});
  }
  const stem = n => {const name=n.type === 'TEXT' ? 'Text' : n.type === 'INSTANCE' ? n.name.split(' / ')[0] : n.name;return name==='CheckBox'?'Checkbox':name;};
  const repeatable = new Set(['Text', 'TextList', 'InputField', 'DataList', 'Card', 'Data Block', 'Radio', 'Checkbox', 'List', 'Accordion']);
  const boxUi=n=>n?.type==='INSTANCE'&&(/^(Infobox)(?: \/|$)/.test(n.name)||n.name==='Card / Surface')||n?.type==='FRAME'&&['Infobox Group','Data Block','Data Block Group','Text Box','Text Box Group','Card Group'].includes(n.name);
  // Preserve the data group and box group as whole UI units across Container
  // boundaries. Their native/internal spacing is a separate layer.
  for(const body of items.filter(n=>n.type==='FRAME'&&n.name==='## BODY'&&visible(n))){
    const flow=[];
    function blocks(n){for(const c of kids(n).filter(c=>visible(c)&&c.layoutPositioning!=='ABSOLUTE')){
      if(c.type==='FRAME'&&c.name!=='Title / DataList Group'&&!boxUi(c))blocks(c);else flow.push(c);
    }}
    blocks(body);
    for(let i=0;i<flow.length-1;i++){
      const a=flow[i],b=flow[i+1];if(a.name!=='Title / DataList Group'||!boxUi(b)||a.parentId===b.parentId)continue;
      const aa=a.absoluteBoundingBox,bb=b.absoluteBoundingBox;
      if(!aa||!bb)fail('DATA_BOX_MEASURE',b,'분리된 데이터 그룹/박스의 실제 경계 측정이 필요합니다');
      else if(!near(bb.y-aa.y-aa.height,rules.titleDataListToBoxGap))fail('DATA_BOX_GAP',b,'Title / DataList Group 다음 박스 UI의 실제 간격은32px입니다');
      checked.push({kind:'data-to-box-boundary',nodeId:b.id,expected:rules.titleDataListToBoxGap});
    }
  }
  const selectorName = n => n.type==='INSTANCE' && /^(Tab|Segment|SegmentedControl|Chip)(?: \/ .+)?$/.test(n.name) ? n.name.split(' / ')[0] : null;
  // Bottom-pinned consent is one composite. Detect flattened/renamed versions
  // as well, rather than checking only a group that already has the right name.
  const footers = items.filter(n => n.type === 'FRAME' && ['Footer', '## FOOTER'].includes(n.name));
  for (const footer of footers) {
    const hasConsent = items.some(n => n.type === 'INSTANCE' && ['ConsentFinal', 'ConsentGroup'].includes(n.name) && visible(n) && within(n, a => a.id === footer.id));
    if (hasConsent && kids(footer).filter(n => n.type === 'FRAME' && n.name === 'ConsentFinal / StickyButton' && visible(n)).length !== 1) fail('CONSENT_CTA_GROUP', footer, '하단 약관은 직계 ConsentFinal / StickyButton으로 실제 묶어야 합니다');
  }
  function consentComposite(n) {
    const cs = kids(n), parent = map.get(n.parentId);
    if (parent?.type !== 'FRAME' || !['Footer', '## FOOTER'].includes(parent.name)) fail('CONSENT_CTA_PARENT', n, 'ConsentFinal / StickyButton은 Footer의 직계 자식입니다');
    if (n.layoutMode !== 'VERTICAL' || n.layoutPositioning !== 'AUTO' || n.layoutSizingHorizontal !== 'FILL' || n.layoutSizingVertical !== 'HUG' || ['paddingTop','paddingRight','paddingBottom','paddingLeft'].some(p => !near(n[p],0))) fail('CONSENT_CTA_LAYOUT', n, '약관·CTA 그룹은 Vertical / Fill·Hug / AUTO / padding0입니다');
    if (cs.length !== 2 || cs[0].name !== 'ConsentFinal' || cs[0].type !== 'FRAME' || cs[1].name !== 'StickyButton' || cs[1].type !== 'INSTANCE') {fail('CONSENT_CTA', n, 'ConsentFinal 래퍼 → 실제 StickyButton 인스턴스 순서·구조 필요'); return;}
    spacing(n,24);
    const wrap=cs[0], native=kids(wrap), sticky=cs[1];
    if (wrap.layoutMode !== 'VERTICAL' || wrap.layoutPositioning !== 'AUTO' || wrap.layoutSizingHorizontal !== 'FILL' || wrap.layoutSizingVertical !== 'HUG' || !near(wrap.itemSpacing,0)) fail('CONSENT_CTA_WRAPPER', wrap, 'ConsentFinal 래퍼는 Vertical / Fill·Hug / AUTO / gap0입니다');
    for (const [field,value] of Object.entries({paddingTop:0,paddingRight:20,paddingBottom:0,paddingLeft:20})) {
      if (!near(wrap[field],value) || value && token(wrap.boundVariables?.[field]) !== rules.spacing[value]) fail('CONSENT_CTA_PADDING',wrap,`${field}: ${value}px 및 해당 spacing 토큰 필요`);
    }
    if (native.length !== 1 || native[0].type !== 'INSTANCE' || native[0].name !== 'ConsentFinal') fail('CONSENT_CTA_INSTANCE',wrap,'래퍼 안에 실제 ConsentFinal 인스턴스 1개 필요; ConsentGroup·수동 프레임으로 대체 금지');
    else if (native[0].layoutPositioning !== 'AUTO' || native[0].layoutSizingVertical !== 'HUG') fail('CONSENT_CTA_SIZING',native[0],'약관 인스턴스는 AUTO / 세로 Hug로 긴 문구를 수용합니다');
    if (sticky.layoutPositioning !== 'AUTO' || sticky.layoutSizingHorizontal !== 'FILL' || sticky.layoutSizingVertical !== 'HUG') fail('CONSENT_CTA_SIZING',sticky,'StickyButton은 AUTO / 가로 Fill·세로 Hug입니다');
  }
  for (const n of items.filter(n => n.type === 'FRAME' && authored(n) && visible(n))) {
    const cs = kids(n).filter(c => visible(c) && c.layoutPositioning !== 'ABSOLUTE');
    const queryControls=cs.length===3&&cs.every(c=>c.type==='INSTANCE')&&selectorName(cs[0])==='SegmentedControl'&&cs[1].name==='InputField'&&cs[2].name==='BoxButton';
    if(n.name==='Sorting Group')fail('DEPRECATED_GROUP_NAME',n,'Sorting Group 특례는 폐기됐습니다. 실제 구성으로 복합 부모명을 판정합니다');
    if(queryControls){
      if(n.name!=='SegmentedControl / Contents')fail('CONTENTS_NAME',n,'세 조회 컨트롤의 부모명은 SegmentedControl / Contents입니다');
      spacing(n,12);
    }
    const second=cs[1],nested=second?.type==='FRAME'?kids(second).filter(c=>visible(c)&&c.layoutPositioning!=='ABSOLUTE'):[];
    if(cs.length===2&&cs[0].type==='INSTANCE'&&nested.length>=2&&new Set(nested.map(stem)).size>1&&n.name.includes(' / ')){
      const expected=stem(cs[0])+' / Contents';
      if(n.name!==expected)fail('COMPLEX_PARENT_NAME',n,'복합 콘텐츠를 포함하는 상위 부모명은 '+expected+'입니다. 자식 이름을 그대로 이어 붙이지 않습니다');
    }
    for (const selector of cs.filter(c=>selectorName(c)&&selectorName(c)!=='Tab')) {
      const prefix=selectorName(selector);
      if (n.layoutMode!=='VERTICAL'||n.layoutPositioning!=='AUTO'||n.layoutSizingHorizontal!=='FILL'||n.layoutSizingVertical!=='HUG'||!n.name.startsWith(`${prefix} / `)||cs[0]?.id!==selector.id||cs.length<2) fail('SELECTOR_CONTENT_GROUP',selector,'Segment·Chip은 후속 콘텐츠와 실제 Vertical / Fill·Hug / AUTO 복합 그룹으로 묶고 구조에 맞게 명명합니다');
    }
    if (n.name === 'ConsentFinal / StickyButton') consentComposite(n);
    if (!cs.length) continue;
    const hint=cs[1], fieldHint=cs[0]?.type==='INSTANCE'&&cs[0].name==='InputField'&&(hint?.name==='TextList Group'||hint?.type==='INSTANCE'&&stem(hint)==='TextList');
    if (fieldHint) {
      const name=hint.name==='TextList Group'?'InputField / TextList Group':'InputField / TextList';
      if (n.name!==name || cs.length!==2 || n.layoutMode!=='VERTICAL' || n.layoutSizingHorizontal!=='FILL' || n.layoutSizingVertical!=='HUG' || n.layoutPositioning!=='AUTO' || ['paddingTop','paddingRight','paddingBottom','paddingLeft'].some(p=>!near(n[p],0))) fail('INPUT_HINT_GROUP',n,'필드와 설명은 실제 '+name+' Vertical Fill/Hug AUTO padding0 복합 그룹입니다');
      spacing(n,12);
      if (hint.name==='TextList Group') spacing(hint,8);
      if (Object.entries(cs[0].componentProperties??{}).find(([k])=>k.startsWith('hasFooter#'))?.[1]?.value===true) fail('INPUT_HINT_FOOTER',cs[0],'별도 설명과 native FooterArea를 중복하지 않습니다');
    }
    if (n.name.endsWith(' Group') && !n.name.includes(' / ')) {
      const rawBase = n.name.slice(0, -6),base=rawBase==='CheckBox'?'Checkbox':rawBase;
      if (repeatable.has(base) && (cs.length < 2 || cs.some(c => stem(c) !== base))) fail('GROUP_CONTENTS', n, `${n.name}은 실제 같은 항목의 복수만 포함해야 합니다`);
    }
    for (const base of repeatable) {
      // Native Card section instances are parts of one card, not repeated cards.
      const repeated = cs.filter(c => (c.type === 'TEXT' || c.type === 'INSTANCE' || c.type === 'FRAME') && stem(c) === base && !(base === 'Card' && c.type === 'INSTANCE' && /^Card \/ (Body|Header|Footer)(?: \/|$)/.test(c.name)));
      if (repeated.length > 1 && n.name !== `${base} Group` && !(base==='Checkbox'&&n.name==='CheckBox Group') && !(base==='InputField'&&n.name==='InputField / Contents'&&cs.length===3&&stem(cs[0])==='InputField'&&cs[1].type==='INSTANCE'&&cs[1].name==='Divider / Horizontal'&&stem(cs[2])==='InputField')) fail('REPEAT_GROUP', n, `반복 ${base} ${repeated.length}개를 실제 ${base} Group으로 묶어야 합니다`);
    }
    if (cs.some(c => stem(c) === 'Text') && cs.some(c => c.name === 'TextList Group') && n.name !== 'Text / TextList Group') fail('MIXED_GROUP_NAME', n, 'Text와 TextList Group의 부모명은 Text / TextList Group입니다');
    if (n.name === 'Title / TextList Group' && !cs.some(c => c.name === 'TextList Group')) fail('PARENT_NAME', n, '구조 변경 후 부모명을 다시 판정하세요. 복합 콘텐츠는 Title / Contents입니다');
    if (n.name.startsWith('Title / ') && n.name !== 'Title / Contents' && cs.some(c => c.type === 'FRAME' && c.name === n.name)) fail('PARENT_NAME', n, '같은 Title 복합 그룹을 중첩한 상위 부모는 Title / Contents입니다');
    if (cs.some(c => c.name === 'Title / Section' || c.name === 'Title / Element') && cs.some(c => c.name.includes(' / ') && c.name !== 'Title / Section' && c.name !== 'Title / Element' && c.type === 'FRAME') && n.name.startsWith('Title / ') && n.name !== 'Title / Contents') fail('PARENT_NAME', n, '제목과 복합 콘텐츠의 부모명은 Title / Contents입니다');
    const uniformGap = {'InputField Group': 24, 'InputField / Contents':24};
    if (uniformGap[n.name] !== undefined) spacing(n, uniformGap[n.name]);
    if (['Radio Group','Checkbox Group','CheckBox Group'].includes(n.name)) {
      const g=rules.choiceGroupSpacing;
      const fieldGap=(field,expected)=>{
        if(!near(n[field],expected))fail('CHOICE_GAP',n,`${field}: ${expected}px 필요, 실제 ${n[field]}`);
        if(token(n.boundVariables?.[field])!==rules.spacing[expected])fail('CHOICE_GAP_TOKEN',n,`${field}: ${expected}px spacing 토큰 불일치`);
        checked.push({kind:'choice-gap',nodeId:n.id,field,expected});
      };
      if(n.layoutMode==='GRID'){fieldGap('gridRowGap',g.row);fieldGap('gridColumnGap',g.column);}
      else if(n.layoutMode==='VERTICAL')spacing(n,g.row);
      else if(n.layoutMode==='HORIZONTAL'){spacing(n,g.column);if(n.layoutWrap==='WRAP')fieldGap('counterAxisSpacing',g.row);}
      else fail('CHOICE_LAYOUT',n,'선택 그룹은 실제 Auto Layout/Grid로 배치합니다');
    }
    if (['Checkbox Group','CheckBox Group'].includes(n.name) && n.layoutMode==='HORIZONTAL' && n.layoutWrap==='WRAP' && (n.layoutSizingHorizontal!=='FILL'||n.layoutSizingVertical!=='HUG')) fail('CHECKBOX_WRAP_LAYOUT',n,'줄바꿈 Checkbox Group은 가로 Fill·세로 Hug로 제한 폭 안에 전체 항목을 노출합니다');
    if (cs.length > 1 && cs.every(c => c.name === 'Title / TextList Group')) spacing(n, 24);
    for (let i = 0; i < cs.length - 1; i++) {
      const a = cs[i], b = cs[i + 1]; let gap;
      if (['Title / Section', 'Title / Element'].includes(a.name)) gap = screenType === 'bottom-sheet' && (b.type === 'TEXT' || ['Text', 'Text Group', 'TextList Group'].includes(b.name)) ? 12 : 16;
      if (a.name==='Title / Element' && ['Radio Group','Checkbox Group','CheckBox Group'].includes(b.name)) gap=rules.choiceGroupSpacing.titleElement;
      if (a.name==='Title / Section' && b.name==='IconButton' && n.name==='Title / IconButton' && n.layoutMode==='HORIZONTAL') gap=8;
      if (a.name==='InputField Group' && (b.name==='TextList Group'||b.type==='INSTANCE'&&stem(b)==='TextList')) gap=24;
      if (screenType==='dialog' && isPhoneGroup(n) && a.name==='Title / Element') gap=4;
      if (a.name === 'Title / Page' && b.name === 'Image Area') gap = 0;
      if (['Image Area', 'ImageContainer', 'Infobox / Card'].includes(a.name)) gap = 24;
      if (a.name === 'Chip / Basic') gap = b.name === 'Feedback' ? 24 : 8;
      if (a.name === 'Tab') {
        let first=b;const seen=new Set();
        while(first?.type==='FRAME'&&!seen.has(first.id)){seen.add(first.id);first=kids(first).find(c=>visible(c)&&c.layoutPositioning!=='ABSOLUTE');}
        gap=first?.type==='INSTANCE'&&first.name==='Infobox / Card'?16:24;
      }
      if (a.name === 'Feedback') gap = 40;
      if (a.name === 'Infobox / Solid' && ['InputField', 'InputField Group', 'Feedback'].includes(b.name)) gap = 24;
      if (a.name === 'Title / DataList Group' && boxUi(b)) gap = rules.titleDataListToBoxGap;
      if (gap !== undefined && ['VERTICAL', 'HORIZONTAL'].includes(n.layoutMode)) spacing(n, gap, `${a.name} → ${b.name}`);
    }
  }
  const requirements = contract.checks ?? [];
  if (!Array.isArray(requirements)) fail('CONTRACT', root, 'checks는 배열이어야 합니다');
  for (const rule of Array.isArray(requirements) ? requirements : []) {
    if (!Array.isArray(rule.path) || !rule.path.length || rule.path.some(p => typeof p !== 'string')) {fail('CONTRACT', root, '각 검사에 정확한 path 배열 필요'); continue;}
    const n = one(rule.path); if (!n) continue;
    if (rule.kind === 'fill' && typeof rule.tokenKey === 'string') paint(n, rule.tokenKey, rule.visible !== false);
    else if (rule.kind === 'gap' && Number.isFinite(rule.value)) spacing(n, rule.value);
    else if (rule.kind === 'text' && typeof rule.value === 'string') {
      if (n.type !== 'TEXT' || n.characters !== rule.value) fail('COPY', n, '기획 원문과 텍스트 불일치');
    } else if (rule.kind === 'instance' && typeof rule.key === 'string') {
      if (n.type !== 'INSTANCE' || n.component?.key !== rule.key) fail('COMPONENT', n, '선택한 최신 원형 key와 불일치');
    } else if (rule.kind === 'property' && typeof rule.property === 'string' && Object.hasOwn(rule, 'value')) {
      if (n.componentProperties?.[rule.property]?.value !== rule.value) fail('PROPERTY', n, `${rule.property} 공개 옵션 불일치`);
    } else if (rule.kind === 'layout' && typeof rule.field === 'string' && Object.hasOwn(rule, 'value')) {
      if (n[rule.field] !== rule.value) fail('LAYOUT', n, `${rule.field} 불일치`);
    } else if(rule.kind==='children'&&Array.isArray(rule.value)&&rule.value.every(v=>typeof v==='string')){
      const names=kids(n).filter(c=>visible(c)&&c.layoutPositioning!=='ABSOLUTE').map(c=>c.name);
      if(JSON.stringify(names)!==JSON.stringify(rule.value))fail('CHILDREN',n,'승인된 직계 자식의 수·이름·순서와 다릅니다');
    } else fail('CONTRACT', n, '지원하지 않거나 값이 빠진 검사입니다');
  }
  return {status: errors.length ? 'BLOCKED' : 'STRUCTURE_OK_REQUIRES_VISUAL_REVIEW', ruleVersion: rules.version,
    rootId: root.id, screenType, checked, errors, nodeCount: items.length};
}

function configCheck(config) {
  if (!config?.fileKey || (!config?.pageId && !config?.pageIdFromReceipt)) throw new Error('fileKey 및 pageId 필요');
  if (config.fileKey === '09eGMNTNnkE0CTxPdr7lnk') throw new Error('라이브러리는 제작 대상이 아닙니다');
}

export function screenAuditScript(config, contract = {}) {
  configCheck(config);
  if (!config.rootId || !config.pageId) throw new Error('pageId 및 rootId 필요');
  return `const snapshot = await (${collect.toString()})(figma, ${JSON.stringify({...config, offset: 0, limit: Number.MAX_SAFE_INTEGER})});\nreturn (${auditScreen.toString()})(snapshot, ${JSON.stringify(contract)}, ${JSON.stringify(screenRules)});`;
}

// Dedicated complex builds use this wrapper too. Build + one capture + audit
// execute in the same MCP call, without another round trip per rule or screen.
export function guardBuildScript(code, config, contract = {}) {
  configCheck(config);
  if (typeof code !== 'string' || !code.trim()) throw new Error('제작 스크립트 필요');
  return `async function buildRequestedScreen() {\n${code}\n}\n` +
    `const receipt = await buildRequestedScreen();\n` +
    `if (!receipt || receipt.error || ['PARTIAL_FAILURE','BLOCKED'].includes(receipt.status)) return {status:'BLOCKED', receipt, errors:[{code:'BUILD_FAILED',message:'실패한 제작은 완료할 수 없습니다'}]};\n` +
    `const rootIds = receipt.rootId ? [receipt.rootId] : (receipt.mapping ?? []).map(n => n.id);\n` +
    `if (!rootIds.length || rootIds.some(id => typeof id !== 'string')) return {status:'BLOCKED', receipt, errors:[{code:'ROOT_RECEIPT',message:'제작 반환값에 rootId 또는 mapping[].id 필요'}]};\n` +
    `const audits = [];\nfor (const rootId of [...new Set(rootIds)]) {\n` +
    `const snapshot = await (${collect.toString()})(figma, {...${JSON.stringify(config)}, pageId:${config.pageIdFromReceipt ? 'receipt.pageId' : JSON.stringify(config.pageId)}, rootId, offset:0, limit:Number.MAX_SAFE_INTEGER, skipPageSwitch:true});\n` +
    `audits.push((${auditScreen.toString()})(snapshot, ${JSON.stringify(contract)}, ${JSON.stringify(screenRules)}));\n}\n` +
    `return {status:audits.some(a => a.errors.length) ? 'BLOCKED_REQUIRES_FIX' : 'BUILT_REQUIRES_REVIEW', receipt, audits};`;
}
