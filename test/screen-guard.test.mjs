import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync, spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {auditScreen, screenRules as rules, screenAuditScript, guardBuildScript} from '../src/screen-guard.mjs';

const frames = (id, name, parentId, extra = {}) => ({id, name, parentId, type:'FRAME', visible:true, opacity:1,
  layoutMode:'VERTICAL', layoutPositioning:'AUTO', width:390, height:40, itemSpacing:0, fills:[], ...extra});
const component = (id,name,parentId,extra={}) => frames(id,name,parentId,{type:'INSTANCE',component:{key:`key-${name}`},...extra});
const fill = key => [{type:'SOLID',visible:true,opacity:1,color:{r:1,g:1,b:1},boundVariables:{color:{type:'VARIABLE_ALIAS',id:key}}}];
function snapshot(items) {
  return {fileKey:'Target',pageId:'page',rootId:'root',complete:true,total:items.length,items,
    variables:[...Object.values(rules.colors),...Object.values(rules.spacing).filter(Boolean)].map(key=>({id:key,key})), styles:[]};
}
function page() {
  return snapshot([frames('root','화면ID_화면',null,{height:844,fills:fill(rules.colors.white)}),frames('head','## HEADER','root'),
    frames('body','## BODY','root'),frames('foot','## FOOTER','root'),component('home','HomeIndicator','foot',{fills:fill(rules.colors.elevated)})]);
}
function pdf() {
  return snapshot([frames('root','화면ID_약관',null,{fills:fill(rules.colors.white)}),component('pop','Popup','root'),
    frames('slot','Slot','pop',{type:'SLOT'}),frames('head','Header','slot'),frames('body','Body','slot'),
    frames('toolbar','Title Area','body',{fills:fill(rules.colors.pdf)}),frames('viewport','body','body',{fills:fill(rules.colors.pdf)}),
    frames('doc','PDF Document','viewport',{fills:fill(rules.colors.white)}),frames('foot','Footer','slot'),
    component('home','HomeIndicator','foot',{fills:fill(rules.colors.elevated)})]);
}
function textNode(id,value,parentId,extra={}) {
  return frames(id,'Content',parentId,{type:'TEXT',characters:value,hasMissingFont:false,
    segments:[{characters:value,fontName:{family:'KBFG Text',style:'Light'},textStyleId:'style'}],...extra});
}
const add = (s,...items) => {s.items.push(...items);s.total=s.items.length;return s;};
const check = (s,c={}) => auditScreen(s,c,rules);
const codes = (s,c={}) => check(s,c).errors.map(e=>e.code);
test('valid page and PDF pass structural checks, never visual PASS',()=>{
  for(const s of [page(),pdf()]) assert.equal(check(s).status,'STRUCTURE_OK_REQUIRES_VISUAL_REVIEW');
});
test('missing PDF toolbar fill blocks even if viewport and document are correct',()=>{
  const s=pdf();s.items.find(n=>n.id==='toolbar').fills=[];assert.ok(codes(s).includes('BG_TOKEN'));
});
test('PDF missing toolbar layer is not mistaken for a normal popup',()=>{
  const s=pdf();s.items=s.items.filter(n=>n.id!=='toolbar');s.total--;assert.ok(codes(s).includes('REQUIRED_PATH'));
});
test('same RGB without variable alias does not satisfy BG requirement',()=>{
  const s=pdf();delete s.items.find(n=>n.id==='toolbar').fills[0].boundVariables;assert.ok(codes(s).includes('BG_TOKEN'));
});
test('BG paint visibility, paint opacity, layer opacity, and ancestor opacity are separate checks',()=>{
  for(const mutate of [n=>n.fills[0].visible=false,n=>n.fills[0].opacity=0,n=>n.opacity=.5,n=>n.visible=false]) {
    const s=pdf();mutate(s.items.find(n=>n.id==='toolbar'));assert.ok(check(s).errors.length);
  }
  const s=pdf();s.items.find(n=>n.id==='body').opacity=.5;assert.ok(codes(s).includes('BG_OPACITY'));
});
test('wrong token fails even when pixels happen to match',()=>{
  const s=pdf();s.items.find(n=>n.id==='toolbar').fills=fill(rules.colors.white);assert.ok(codes(s).includes('BG_TOKEN'));
});
test('fixed-width CTA label fails inside an otherwise genuine component',()=>{
  const s=add(page(),component('cta','BoxButton','foot'),frames('label','Label','cta'),textNode('cta-text','다음','label',{
    name:'버튼명',layoutSizingHorizontal:'FIXED',textAutoResize:'HEIGHT'}));
  assert.ok(codes(s).includes('CTA_HUG'));
  Object.assign(s.items.at(-1),{layoutSizingHorizontal:'HUG',textAutoResize:'WIDTH_AND_HEIGHT'});assert.equal(check(s).errors.length,0);
});
test('phone, formatted date and numeric cell require Pretendard; mixed text stays KBFG',()=>{
  for(const value of ['1588-9999','+82 (10) 1234-5678','2028.09.26 22:40','1,234.50']) {
    const s=add(page(),textNode('number',value,'body'));assert.ok(codes(s).includes('FONT_FAMILY'));
    s.items.at(-1).segments[0].fontName.family='Pretendard';assert.equal(check(s).errors.length,0);
  }
  for(const value of ['123,000원','총 3건','6자리 입력','대표전화 1588-9999']) assert.equal(check(add(page(),textNode('mixed',value,'body'))).errors.length,0);
});
test('correct family without a style or family variable is blocked',()=>{
  const s=add(page(),textNode('text','안내','body'));delete s.items.at(-1).segments[0].textStyleId;assert.ok(codes(s).includes('FONT_BINDING'));
});
test('hidden native text does not cause a false font failure',()=>{
  const s=add(page(),textNode('hidden','123','body',{visible:false,segments:[]}));assert.equal(check(s).errors.length,0);
});
test('dialog hides only HomeIndicator paint; bottom sheet keeps it visible and AUTO',()=>{
  const s=page();s.items=s.items.filter(n=>!['head','body','foot'].includes(n.id));s.items.find(n=>n.id==='home').parentId='root';
  add(s,frames('dim','Dimmed','root',{type:'RECTANGLE',layoutPositioning:'ABSOLUTE'}),component('dialog','Dialog','root'));
  s.total=s.items.length;assert.ok(codes(s).includes('BG_VISIBILITY'));
  s.items.find(n=>n.id==='home').fills[0].visible=false;assert.equal(check(s).errors.length,0);
  const d=s.items.find(n=>n.id==='dialog');d.name='BottomSheet';
  s.items.find(n=>n.id==='home').fills[0].visible=true;assert.equal(check(s).errors.length,0);
  d.layoutPositioning='ABSOLUTE';assert.ok(codes(s).includes('SHEET_FLOW'));
});
test('overlay rejects reconstructed background screen',()=>{
  const s=page();add(s,component('dialog','Dialog','root'),frames('dim','Dimmed','root'));assert.ok(codes(s).includes('OVERLAY_BACKGROUND'));
});
test('repeated fields must be actually grouped, not only renamed elsewhere',()=>{
  const s=add(page(),component('f1','InputField','body'),component('f2','InputField','body'));
  assert.ok(codes(s).includes('REPEAT_GROUP'));
  add(s,frames('group','InputField Group','body',{itemSpacing:24,boundVariables:{itemSpacing:{id:rules.spacing[24]}}}));
  s.items.find(n=>n.id==='f1').parentId='group';s.items.find(n=>n.id==='f2').parentId='group';assert.equal(check(s).errors.length,0);
});
test('TextList Group containing plain Text is a naming error',()=>{
  const s=add(page(),frames('g','TextList Group','body'),textNode('a','설명1','g'),textNode('b','설명2','g'));
  assert.ok(codes(s).includes('GROUP_CONTENTS'));s.items.find(n=>n.id==='g').name='Text Group';assert.equal(check(s).errors.length,0);
});
test('mixed Text and TextList require real grouping and recomputed parent names',()=>{
  const s=add(page(),frames('g','TextList Group','body'),textNode('a','설명','g'),component('b','TextList / Unordered','g'),component('c','TextList / Unordered','g'));
  assert.ok(codes(s).includes('GROUP_CONTENTS'));
  s.items.find(n=>n.id==='g').name='Text / TextList Group';add(s,frames('list','TextList Group','g'));
  for(const id of ['b','c'])s.items.find(n=>n.id===id).parentId='list';assert.equal(check(s).errors.length,0);
  s.items.find(n=>n.id==='g').name='Title / TextList Group';assert.ok(codes(s).includes('MIXED_GROUP_NAME'));
});
test('native component internal Label frames are not renamed by group rules',()=>{
  const s=add(page(),component('c','SomeComponent','body'),frames('native','Label','c'),textNode('a','앞','native'),textNode('b','뒤','native'));
  assert.equal(check(s).errors.length,0);
});
test('nested Title groups require Title / Contents without flattening complex text groups',()=>{
  const s=add(page(),frames('parent','Title / Accordion Group','body'),frames('a','Title / Accordion Group','parent'),frames('b','Title / Accordion Group','parent'));
  assert.ok(codes(s).includes('PARENT_NAME'));s.items.find(n=>n.id==='parent').name='Title / Contents';assert.equal(check(s).errors.length,0);
  s.items.find(n=>n.id==='a').name='Text / TextList Group';s.items.find(n=>n.id==='b').name='Text / TextList Group';assert.equal(check(s).errors.length,0);
});
test('approved Title / Table Group keeps its different Title / Text child',()=>{
  const s=add(page(),frames('table-group','Title / Table Group','body'),frames('intro','Title / Text','table-group'),frames('table','Table Group','table-group'));
  assert.equal(check(s).errors.length,0);
});
test('Section gap is 16, while bottom sheet text exception is 12',()=>{
  const s=add(page(),frames('g','Title / Text','body',{itemSpacing:8}),component('title','Title / Section','g'),textNode('text','설명','g'));
  assert.ok(codes(s).includes('GAP'));
  Object.assign(s.items.find(n=>n.id==='g'),{itemSpacing:16,boundVariables:{itemSpacing:{id:rules.spacing[16]}}});assert.equal(check(s).errors.length,0);
  Object.assign(s.items.find(n=>n.id==='g'),{itemSpacing:12,boundVariables:{itemSpacing:{id:rules.spacing[12]}}});
  assert.ok(codes(s).includes('GAP'));
  s.items=s.items.filter(n=>!['head','foot'].includes(n.id));
  s.items.find(n=>n.id==='body').name='BottomSheet';s.items.find(n=>n.id==='body').type='INSTANCE';s.items.find(n=>n.id==='body').component={key:'sheet'};
  add(s,frames('slot','Slot','body',{type:'SLOT'}),frames('dim','Dimmed','root',{layoutPositioning:'ABSOLUTE'}));
  s.items.find(n=>n.id==='g').parentId='slot';s.items.find(n=>n.id==='home').parentId='root';s.total=s.items.length;
  assert.equal(check(s).errors.length,0);
});
test('Tab to Infobox Card requires 16 including token connection',()=>{
  const s=add(page(),frames('g','Container','body',{itemSpacing:24}),component('tab','Tab','g'),component('info','Infobox / Card','g'));
  assert.ok(codes(s).includes('GAP'));
  s.items.find(n=>n.id==='g').itemSpacing=16;assert.ok(codes(s).includes('GAP_TOKEN'));
  s.items.find(n=>n.id==='g').boundVariables={itemSpacing:{id:rules.spacing[16]}};assert.equal(check(s).errors.length,0);
});
test('explicit copy, public property and component-key requirements block mismatches',()=>{
  const s=add(page(),textNode('text','수정 전','body'),component('c','Chip / Basic','body',{componentProperties:{variant:{value:'single'}}}));
  const c={checks:[{path:['## BODY','Content'],kind:'text',value:'수정 후'},{path:['## BODY','Chip / Basic'],kind:'property',property:'variant',value:'multiple'},
    {path:['## BODY','Chip / Basic'],kind:'instance',key:'current-library-key'}]};
  for(const code of ['COPY','PROPERTY','COMPONENT'])assert.ok(codes(s,c).includes(code));
});
test('duplicate paths and missing contracts cannot silently pass',()=>{
  const s=add(page(),frames('x','## BODY','root'));assert.ok(codes(s).includes('REQUIRED_PATH'));
  assert.ok(codes(page(),{checks:[{path:['## BODY'],kind:'invented'}]}).includes('CONTRACT'));
  assert.ok(codes(page(),null).includes('CONTRACT'));
  assert.ok(codes(page(),{checks:[{path:['## BODY'],kind:'property',property:'missing'}]}).includes('CONTRACT'));
});
test('incomplete snapshot and cyclic disconnected nodes are blocked',()=>{
  const s=page();s.complete=false;assert.ok(codes(s).includes('SNAPSHOT'));
  const t=add(page(),frames('a','A','b'),frames('b','B','a'));assert.ok(codes(t).includes('SNAPSHOT_TREE'));
});
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
test('standalone and guarded build scripts are valid async JavaScript',()=>{
  for(const code of [screenAuditScript({fileKey:'Target',pageId:'page',rootId:'root'}),guardBuildScript('return {rootId:"root"};',{fileKey:'Target',pageId:'page'})])assert.doesNotThrow(()=>new AsyncFunction('figma',code));
  assert.throws(()=>guardBuildScript('return {};',{fileKey:'Target'}));
});
function live(s) {
  const nodes=new Map(s.items.map(n=>[n.id,{...n,children:[]}])) , page={id:'page',type:'PAGE',children:[]};
  for(const node of nodes.values()) {
    node.parent=nodes.get(node.parentId)??page;node.parent.children.push(node);
    if(node.type==='TEXT')node.getStyledTextSegments=()=>node.segments;
    if(node.type==='INSTANCE')node.getMainComponentAsync=async()=>({id:'main',...node.component});
  }
  let switches=0;
  return {figma:{fileKey:'Target',currentPage:page,getNodeByIdAsync:async id=>id==='page'?page:nodes.get(id),setCurrentPageAsync:async()=>{switches++;},
    variables:{getVariableByIdAsync:async id=>({...s.variables.find(v=>v.id===id),variableCollectionId:'collection',valuesByMode:{}}),getVariableCollectionByIdAsync:async()=>({key:'collection',modes:[]})},
    getStyleByIdAsync:async()=>({id:'style',key:'style-key',type:'TEXT'})},switches:()=>switches};
}
test('one build call returns a blocking audit without another page switch',async()=>{
  const s=pdf();s.items.find(n=>n.id==='toolbar').fills=[];const mock=live(s);
  const code=guardBuildScript('return {rootId:"root",pageId:"page",status:"BUILT_REQUIRES_REVIEW"};',{fileKey:'Target',pageIdFromReceipt:true});
  const result=await new AsyncFunction('figma',code)(mock.figma);
  assert.equal(result.status,'BLOCKED_REQUIRES_FIX');assert.ok(result.audits[0].errors.some(e=>e.code==='BG_TOKEN'));assert.equal(mock.switches(),0);
});
test('one build call audits six independent roots and deduplicates receipt entries',async()=>{
  const s=page();
  for(let i=2;i<=6;i++)add(s,...page().items.map(n=>({...n,id:`${n.id}-${i}`,parentId:n.parentId?`${n.parentId}-${i}`:null})));
  const mock=live(s),mapping=['root',...Array.from({length:5},(_,i)=>`root-${i+2}`),'root'].map(id=>({id}));
  const code=guardBuildScript(`return {mapping:${JSON.stringify(mapping)}};`,{fileKey:'Target',pageId:'page'});
  const result=await new AsyncFunction('figma',code)(mock.figma);assert.equal(result.status,'BUILT_REQUIRES_REVIEW');assert.equal(result.audits.length,6);
});
test('failed or empty build receipts never become success',async()=>{
  for(const body of ['return {status:"PARTIAL_FAILURE",error:"failed"};','return {};']) {
    const result=await new AsyncFunction('figma',guardBuildScript(body,{fileKey:'Target',pageId:'page'}))({});assert.equal(result.status,'BLOCKED');
  }
});
test('CLI audit fails with nonzero exit and guard-build generates runnable code',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'kbds-guard-'));
  try {
    const s=pdf();s.items.find(n=>n.id==='toolbar').fills=[];const file=path.join(dir,'actual.json');fs.writeFileSync(file,JSON.stringify(s));
    const cli=new URL('../src/cli.mjs',import.meta.url).pathname;
    const result=spawnSync(process.execPath,[cli,'audit',file],{encoding:'utf8'});assert.equal(result.status,1);assert.match(result.stdout,/BG_TOKEN/);
    const build=path.join(dir,'build.js'),out=path.join(dir,'guarded.js');fs.writeFileSync(build,'return {rootId:"root"};');
    execFileSync(process.execPath,[cli,'guard-build',build,'Target','page',out]);assert.doesNotThrow(()=>new AsyncFunction('figma',fs.readFileSync(out,'utf8')));
  } finally {fs.rmSync(dir,{recursive:true,force:true});}
});
test('entry instructions stay below 16KiB and point to executable checks',()=>{
  const agents=fs.readFileSync(new URL('../AGENTS.md',import.meta.url),'utf8');
  assert.ok(Buffer.byteLength(agents)<16*1024);assert.match(agents,/guard-build/);assert.match(agents,/docs\/sources\/designer-ui-rules\.md/);
});
function pinnedConsent() {
  const modes={layoutSizingHorizontal:'FILL',layoutSizingVertical:'HUG',paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};
  return add(page(),frames('consent-cta','ConsentFinal / StickyButton','foot',{...modes,itemSpacing:24,boundVariables:{itemSpacing:{id:rules.spacing[24]}}}),
    frames('consent-wrap','ConsentFinal','consent-cta',{...modes,paddingLeft:20,paddingRight:20,boundVariables:{paddingLeft:{id:rules.spacing[20]},paddingRight:{id:rules.spacing[20]}}}),
    component('consent-native','ConsentFinal','consent-wrap',{layoutSizingVertical:'HUG'}),component('sticky','StickyButton','consent-cta',modes));
}
test('bottom consent keeps its approved composite, actual wrapper and native instances',()=>assert.equal(check(pinnedConsent()).errors.length,0));
test('flattened or renamed bottom consent composite cannot escape the check',()=>{
  const s=pinnedConsent();s.items.find(n=>n.id==='consent-cta').name='Button Area';assert.ok(codes(s).includes('CONSENT_CTA_GROUP'));
  const t=pinnedConsent();t.items.find(n=>n.id==='consent-wrap').parentId='foot';t.items.find(n=>n.id==='sticky').parentId='foot';t.items=t.items.filter(n=>n.id!=='consent-cta');t.total--;
  assert.ok(codes(t).includes('CONSENT_CTA_GROUP'));
});
test('ConsentGroup does not substitute for ConsentFinal; manual CTA is rejected',()=>{
  const s=pinnedConsent();s.items.find(n=>n.id==='consent-native').name='ConsentGroup';assert.ok(codes(s).includes('CONSENT_CTA_INSTANCE'));
  const t=pinnedConsent();t.items.find(n=>n.id==='sticky').type='FRAME';assert.ok(codes(t).includes('CONSENT_CTA'));
});
test('bottom consent padding, AUTO/Hug and exact child order are required',()=>{
  for(const mutate of [s=>s.items.find(n=>n.id==='consent-wrap').paddingLeft=0,s=>s.items.find(n=>n.id==='sticky').layoutPositioning='ABSOLUTE',
    s=>s.items.find(n=>n.id==='consent-native').layoutSizingVertical='FIXED',s=>s.items.find(n=>n.id==='consent-cta').paddingTop=24]){
    const s=pinnedConsent();mutate(s);assert.ok(check(s).errors.length);
  }
  const s=pinnedConsent();const a=s.items.findIndex(n=>n.id==='sticky'),b=s.items.findIndex(n=>n.id==='consent-wrap');[s.items[a],s.items[b]]=[s.items[b],s.items[a]];assert.ok(codes(s).includes('CONSENT_CTA'));
});
test('consent state, label and button state are not copied from the reference',()=>{
  for(const selected of ['true','false']){const s=pinnedConsent();s.items.find(n=>n.id==='consent-native').componentProperties={checked:{value:selected}};s.items.find(n=>n.id==='sticky').componentProperties={disabled:{value:selected}};assert.equal(check(s).errors.length,0);}
});
test('default color and gap token keys exist in the shared registry',()=>{
  const registry=JSON.parse(fs.readFileSync(new URL('../knowledge/registry.json',import.meta.url),'utf8'));
  const keys=new Set(registry.variables.map(v=>v.key));
  for(const key of [...Object.values(rules.colors),...Object.values(rules.spacing).filter(Boolean)])assert.ok(keys.has(key),key);
});
function finalPhoneDialog() {
  const size={layoutSizingHorizontal:'FILL',layoutSizingVertical:'HUG'};
  const g=value=>({itemSpacing:value,boundVariables:{itemSpacing:{id:rules.spacing[value]}}});
  return snapshot([
    frames('root','화면ID_공통 오류',null,{height:844,fills:fill(rules.colors.white)}),frames('dim','Dimmed','root',{type:'RECTANGLE',layoutPositioning:'ABSOLUTE'}),
    frames('area','Dialog Area','root',{...size,layoutSizingVertical:'FILL',height:810,paddingTop:34,paddingRight:0,paddingBottom:0,paddingLeft:0,primaryAxisAlignItems:'CENTER',counterAxisAlignItems:'CENTER'}),
    component('dialog','Dialog','area',{...size,layoutSizingHorizontal:'FIXED',width:320,...g(20),paddingTop:24,paddingRight:20,paddingBottom:20,paddingLeft:20,componentProperties:{variant:{value:'alertAccordion'}}}),
    frames('slot','Slot','dialog',{type:'SLOT',...size,...g(16)}),frames('item-group','Item Group','slot',{...size,...g(8)}),
    component('title-slot','Item / Slot','item-group',{componentProperties:{variant:{value:'title'}}}),textNode('title','인증시간이 만료되었습니다.','title-slot',{name:'Title'}),
    component('desc-slot','Item / Slot','item-group',{componentProperties:{variant:{value:'description'}}}),textNode('description','다시 시도해주세요.','desc-slot'),
    frames('phone','Title / Text','slot',{...size,...g(4)}),component('phone-label','Title / Element','phone',{componentProperties:{'tooltip#1':{value:false},'optional#1':{value:false},'hasSuffix#1':{value:false}}}),
    textNode('label-text','대표전화','phone-label',{name:'Title'}),frames('numbers','Text','phone',{...size,itemSpacing:0}),
    textNode('phone-text','1588-9999, 1599-9999, 1644-9999','numbers',{fills:fill(rules.colors.primary),textDecoration:'NONE',hyperlink:null,segments:[{fontName:{family:'Pretendard',style:'SemiBold'},fontSize:16,textStyleId:'numeric-bold'}]}),
    component('accordion','Accordion','dialog',{componentProperties:{type:{value:'solid'},variant:{value:'standard'},size:{value:'small'},expanded:{value:'true'}}}),
    component('buttons','ButtonGroup','dialog'),component('home','HomeIndicator','root',{height:34,fills:fill(rules.colors.elevated).map(p=>({...p,visible:false}))})
  ]);
}
test('final phone-details Dialog Area and 8/16/4/20 hierarchy pass together',()=>assert.equal(check(finalPhoneDialog()).errors.length,0));
test('Dialog Area cannot conceal a reconstructed background screen',()=>{
  const s=finalPhoneDialog();add(s,frames('back','Previous screen','area'));assert.ok(codes(s).includes('DIALOG_AREA_CONTENT'));
});
test('final dialog centering compensates HomeIndicator height instead of fixed y',()=>{
  for(const mutate of [s=>s.items.find(n=>n.id==='area').paddingTop=0,s=>s.items.find(n=>n.id==='home').layoutPositioning='ABSOLUTE',s=>s.items.find(n=>n.id==='area').height=844]){
    const s=finalPhoneDialog();mutate(s);assert.ok(codes(s).includes('DIALOG_AREA_SAFE_AREA'));
  }
});
test('old flattened title-description layout is blocked in the final phone pattern',()=>{
  const s=finalPhoneDialog();s.items.find(n=>n.id==='item-group').name='Title / Text';assert.ok(codes(s).includes('DIALOG_PHONE_SLOT'));
});
test('phone block keeps SemiBold16 primary and no invented link',()=>{
  for(const mutate of [n=>n.segments[0].fontName.style='Regular',n=>n.fills=fill(rules.colors.tertiary),n=>n.hyperlink={type:'URL',value:'tel:1588-9999'},n=>n.textDecoration='UNDERLINE']){
    const s=finalPhoneDialog();mutate(s.items.find(n=>n.id==='phone-text'));assert.ok(check(s).errors.length);
  }
});
test('details accordion stays expanded and separate from Slot',()=>{
  const s=finalPhoneDialog();s.items.find(n=>n.id==='accordion').componentProperties.expanded.value='false';assert.ok(codes(s).includes('DIALOG_PHONE_ACCORDION'));
  const t=finalPhoneDialog();t.items.find(n=>n.id==='accordion').parentId='slot';assert.ok(codes(t).includes('DIALOG_PHONE_ORDER'));
});
test('the final pattern is not forced onto unrelated simple dialogs',()=>{
  const s=finalPhoneDialog();s.items.find(n=>n.id==='dialog').componentProperties.variant.value='alert';
  s.items.find(n=>n.id==='dialog').width=350;s.items.find(n=>n.id==='phone-text').segments[0].fontName.style='Regular';
  assert.equal(check(s).errors.length,0);
});
test('an explicit dialog pattern cannot pass when Dialog itself is absent',()=>{
  const s=snapshot([frames('root','화면',null,{fills:fill(rules.colors.white)}),frames('dim','Dimmed','root'),component('home','HomeIndicator','root',{fills:fill(rules.colors.elevated).map(p=>({...p,visible:false}))})]);
  assert.ok(codes(s,{screenType:'dialog',dialogPattern:'phone-details'}).includes('DIALOG_INSTANCE'));
  assert.ok(codes(finalPhoneDialog(),{dialogPattern:'unknown'}).includes('CONTRACT'));
});
