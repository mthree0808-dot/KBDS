import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync, spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {auditScreen, screenRules as rules, screenAuditScript, guardBuildScript} from '../src/screen-guard.mjs';

const frames = (id, name, parentId, extra = {}) => ({id, name, parentId, type:'FRAME', visible:true, opacity:1,
  layoutMode:'VERTICAL', layoutPositioning:'AUTO', width:390, height:40, itemSpacing:0, paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0, fills:[], ...extra});
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
function longPdf() {
  const s=pdf();
  Object.assign(s.items.find(n=>n.id==='root'),{layoutSizingVertical:'HUG'});
  Object.assign(s.items.find(n=>n.id==='doc'),{layoutSizingVertical:'HUG',paddingBottom:114});
  Object.assign(s.items.find(n=>n.id==='viewport'),{paddingBottom:12});
  Object.assign(s.items.find(n=>n.id==='foot'),{layoutPositioning:'ABSOLUTE',height:126,absoluteBoundingBox:{y:200,height:126}});
  return add(s,frames('last','Text','doc',{absoluteBoundingBox:{y:180,height:20}}));
}
test('long PDF joins last content to footer with computed 114px reserve',()=>{
  const result=check(longPdf());
  assert.equal(result.errors.length,0);
  assert.ok(result.checked.some(n=>n.kind==='pdf-footer-join'&&n.gap===0&&n.expectedPaddingBottom===114));
});
test('long PDF rejects old 146px reserve and extra 32px content-to-footer gap',()=>{
  const s=longPdf();s.items.find(n=>n.id==='doc').paddingBottom=146;
  s.items.find(n=>n.id==='foot').absoluteBoundingBox.y+=32;
  assert.ok(codes(s).includes('PDF_FOOTER_PADDING'));
  assert.ok(codes(s).includes('PDF_FOOTER_JOIN'));
});
test('long PDF measures footer boundary independently and catches overlap',()=>{
  const s=longPdf();s.items.find(n=>n.id==='foot').absoluteBoundingBox.y-=12;
  assert.ok(codes(s).includes('PDF_FOOTER_JOIN'));
  assert.ok(!codes(s).includes('PDF_FOOTER_PADDING'));
});
test('long PDF recalculates reserve for different footer and viewport heights',()=>{
  const s=longPdf();s.items.find(n=>n.id==='foot').height=144;
  s.items.find(n=>n.id==='viewport').paddingBottom=16;
  s.items.find(n=>n.id==='doc').paddingBottom=128;
  assert.equal(check(s).errors.length,0);
});
test('long PDF preserves included inside border and uses 113px reserve',()=>{
  const s=longPdf();Object.assign(s.items.find(n=>n.id==='doc'),{
    paddingBottom:113,strokeBottomWeight:1,strokeAlign:'INSIDE',strokesIncludedInLayout:true,strokes:fill(rules.colors.white)});
  assert.equal(check(s).errors.length,0);
  s.items.find(n=>n.id==='doc').paddingBottom=114;
  assert.ok(codes(s).includes('PDF_FOOTER_PADDING'));
});
test('long PDF subtracts only the included interior part of visible border',()=>{
  for(const [align,included,show,padding]of [['CENTER',true,true,113.5],['OUTSIDE',true,true,114],['INSIDE',false,true,114],['INSIDE',true,false,114]]){
    const s=longPdf();Object.assign(s.items.find(n=>n.id==='doc'),{
      paddingBottom:padding,strokeBottomWeight:1,strokeAlign:align,strokesIncludedInLayout:included,strokes:[{...fill(rules.colors.white)[0],visible:show}]});
    assert.equal(check(s).errors.length,0,`${align}/${included}/${show}`);
  }
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
  const s=add(page(),frames('g','Tab / Infobox','body',{layoutSizingHorizontal:'FILL',layoutSizingVertical:'HUG',itemSpacing:24}),component('tab','Tab','g'),component('info','Infobox / Card','g'));
  assert.ok(codes(s).includes('GAP'));
  s.items.find(n=>n.id==='g').itemSpacing=16;assert.ok(codes(s).includes('GAP_TOKEN'));
  s.items.find(n=>n.id==='g').boundVariables={itemSpacing:{id:rules.spacing[16]}};assert.equal(check(s).errors.length,0);
});
test('full-width Tab keeps 16px to Card inside its inset wrapper',()=>{
  const s=add(page(),frames('g','Tab / Infobox','body',{layoutSizingHorizontal:'FILL',layoutSizingVertical:'HUG',itemSpacing:16,boundVariables:{itemSpacing:{id:rules.spacing[16]}}}),
    component('tab','Tab','g'),frames('inset','Infobox','g',{paddingLeft:20,paddingRight:20}),component('info','Infobox / Card','inset'));
  assert.equal(check(s).errors.length,0);
  s.items.find(n=>n.id==='g').itemSpacing=24;assert.ok(codes(s).includes('GAP'));
  s.items.find(n=>n.id==='g').boundVariables.itemSpacing={id:rules.spacing[24]};
  s.items.find(n=>n.id==='info').name='Text';assert.equal(check(s).errors.length,0);
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

function containerPage(single=false) {
  const s=page();
  const padding=(top,bottom)=>({paddingTop:top,paddingBottom:bottom,paddingLeft:20,paddingRight:20,
    boundVariables:{paddingLeft:{id:rules.spacing[20]},paddingRight:{id:rules.spacing[20]},...(top?{paddingTop:{id:rules.spacing[top]}}:{}),...(bottom?{paddingBottom:{id:rules.spacing[bottom]}}:{})}});
  if(single)return add(s,frames('c1','Container','body',padding(24,0)));
  return add(s,frames('c1','Container 1','body',padding(24,0)),frames('c2','Container 2','body',padding(0,0)),frames('c3','Container 3','body',padding(0,32)));
}
test('BODY owns no padding; single Container has no bottom while multiple end with32',()=>{
  for(const s of [containerPage(),containerPage(true)])assert.equal(check(s).errors.length,0);
  for(const field of ['paddingTop','paddingRight','paddingBottom','paddingLeft']){
    const s=containerPage();s.items.find(n=>n.id==='body')[field]=20;assert.ok(codes(s).includes('BODY_PADDING'));
  }
});
test('container position and spacing tokens cannot be replaced by BODY padding',()=>{
  for(const [id,field,value]of [['c1','paddingTop',0],['c2','paddingTop',24],['c2','paddingBottom',32],['c3','paddingBottom',0]]){
    const s=containerPage();s.items.find(n=>n.id===id)[field]=value;assert.ok(codes(s).includes('BODY_CONTAINER_PADDING'));
  }
  const s=containerPage();delete s.items.find(n=>n.id==='c1').boundVariables.paddingTop;assert.ok(codes(s).includes('BODY_CONTAINER_PADDING_TOKEN'));
});
test('ordinary containers require 20px insets and bindings',()=>{
  const s=containerPage();s.items.find(n=>n.id==='c2').paddingLeft=0;assert.ok(codes(s).includes('BODY_CONTAINER_INSET'));
  const t=containerPage();delete t.items.find(n=>n.id==='c2').boundVariables.paddingRight;assert.ok(codes(t).includes('BODY_CONTAINER_PADDING_TOKEN'));
});
test('leading StepIndicator wrapper uses zero inset and top0',()=>{
  const s=containerPage();const c=s.items.find(n=>n.id==='c1');c.paddingLeft=c.paddingRight=c.paddingTop=0;delete c.boundVariables.paddingTop;add(s,component('steps','StepIndicator','c1'));
  assert.equal(check(s).errors.length,0);c.paddingLeft=20;assert.ok(codes(s).includes('BODY_CONTAINER_INSET'));
});
function selectorPage(kind='Tab',variant='2depth') {
  const s=containerPage(true),c=s.items.find(n=>n.id==='c1');
  if(kind==='Tab'&&variant==='1depth'){c.paddingLeft=c.paddingRight=c.paddingTop=0;delete c.boundVariables.paddingTop;}
  const gap=kind==='Chip'?8:24;
  return add(s,frames('selector-group',`${kind} / Contents`,'c1',{layoutSizingHorizontal:'FILL',layoutSizingVertical:'HUG',itemSpacing:gap,boundVariables:{itemSpacing:{id:rules.spacing[gap]}}}),
    component('selector',kind,'selector-group',{componentProperties:{variant:{value:variant}}}),frames('contents','Contents','selector-group'));
}
test('existing Tab composites remain valid while Segment and Chip still require grouping',()=>{
  for(const [name,variant]of [['Tab','1depth'],['Tab','2depth'],['Segment','basic'],['Chip','single']])assert.equal(check(selectorPage(name,variant)).errors.length,0);
  for(const name of ['Segment','Chip']){const s=selectorPage(name);s.items.find(n=>n.id==='contents').parentId='c1';assert.ok(codes(s).includes('SELECTOR_CONTENT_GROUP'));}
});
test('Segment grouping still requires an actual correctly named auto-layout',()=>{
  const s=selectorPage('Segment');s.items.find(n=>n.id==='selector-group').name='Container';assert.ok(codes(s).includes('SELECTOR_CONTENT_GROUP'));
  const t=selectorPage('Segment');t.items.find(n=>n.id==='selector-group').layoutMode='NONE';assert.ok(codes(t).includes('SELECTOR_CONTENT_GROUP'));
});

function directTabContainer(){
  const s=selectorPage('Tab','1depth');
  s.items=s.items.filter(n=>n.id!=='selector-group');
  s.items.find(n=>n.id==='selector').parentId='c1';
  s.items.find(n=>n.id==='contents').parentId='c1';s.total=s.items.length;
  Object.assign(s.items.find(n=>n.id==='c1'),{layoutSizingHorizontal:'FILL',layoutSizingVertical:'HUG',itemSpacing:24,boundVariables:{itemSpacing:{id:rules.spacing[24]}}});
  return s;
}
test('direct BODY Container can group a leading Tab and its whole content subtree',()=>{
  assert.equal(check(directTabContainer()).errors.length,0);
});
test('Tab next to other Container siblings does not require an explicit composite',()=>{
  const s=directTabContainer();add(s,frames('other','Title / Contents','c1'));
  assert.equal(check(s).errors.length,0);
});
test('Tab grouping cancellation removes order naming and following-content group assertions',()=>{
  for(const change of ['order','layout','sizing','content']){
    const s=directTabContainer(),c=s.items.find(n=>n.id==='c1');
    if(change==='order'){const i=s.items.findIndex(n=>n.id==='contents');s.items.unshift(s.items.splice(i,1)[0]);}
    if(change==='layout')c.layoutMode='NONE';
    if(change==='sizing')c.layoutSizingVertical='FIXED';
    if(change==='content')s.items.find(n=>n.id==='contents').parentId='body';
    assert.ok(!codes(s).includes('SELECTOR_CONTENT_GROUP'),change);
    if(change==='layout')assert.ok(codes(s).includes('BODY_CONTAINER_LAYOUT'));
  }
});
test('Tab to composite beginning with inset Infobox Card uses16 rather than24',()=>{
  const s=directTabContainer(),c=s.items.find(n=>n.id==='c1');c.itemSpacing=16;c.boundVariables.itemSpacing={id:rules.spacing[16]};
  s.items.find(n=>n.id==='contents').name='Infobox / Contents';
  add(s,frames('inset-info','Infobox','contents'),component('info','Infobox / Card','inset-info'),frames('remaining','Contents','contents'));
  assert.equal(check(s).errors.length,0);c.itemSpacing=24;assert.ok(codes(s).includes('GAP'));
});
test('notices are full-width even when their Accordion is inside a wrapper',()=>{
  const s=containerPage();const c=s.items.find(n=>n.id==='c3');c.paddingLeft=c.paddingRight=0;
  add(s,component('notice','Accordion','c3'),textNode('notice-title','알려드립니다','notice'));
  assert.equal(check(s).errors.length,0);c.paddingRight=20;assert.ok(codes(s).includes('BODY_CONTAINER_INSET'));
});
test('Popup Body and native Slot padding are outside the literal BODY migration',()=>{
  const s=pdf();s.items.find(n=>n.id==='body').paddingTop=40;s.items.find(n=>n.id==='slot').paddingLeft=20;
  assert.equal(check(s).errors.length,0);
});

test('leading nested first-depth Tab gets top0 while second-depth alone keeps24',()=>{
  const s=selectorPage('Tab','1depth');assert.equal(check(s).errors.length,0);
  s.items.find(n=>n.id==='c1').paddingTop=24;assert.ok(codes(s).includes('BODY_CONTAINER_PADDING'));
  const t=selectorPage('Tab','2depth');assert.equal(check(t).errors.length,0);
  t.items.find(n=>n.id==='c1').paddingTop=0;assert.ok(codes(t).includes('BODY_CONTAINER_PADDING'));
});
test('first-depth Tab later in a container does not remove initial top24',()=>{
  const s=selectorPage('Tab','1depth');const c=s.items.find(n=>n.id==='c1');c.paddingTop=24;c.boundVariables.paddingTop={id:rules.spacing[24]};
  s.items.splice(s.items.findIndex(n=>n.id==='selector-group'),0,frames('intro','Intro','c1'));s.total=s.items.length;
  assert.equal(check(s).errors.length,0);
});
test('first UI detection skips hidden and absolute nodes through layout wrappers',()=>{
  const s=containerPage(true),c=s.items.find(n=>n.id==='c1');c.paddingTop=c.paddingLeft=c.paddingRight=0;
  add(s,frames('hidden','Hidden','c1',{visible:false}),frames('overlay','Overlay','c1',{layoutPositioning:'ABSOLUTE'}),frames('wrap','Contents','c1'),component('step','StepIndicator','wrap'));
  assert.equal(check(s).errors.length,0);
});
function nestedTabPage(){
  const s=containerPage(true),c=s.items.find(n=>n.id==='c1');c.paddingTop=c.paddingLeft=c.paddingRight=0;
  const layout={layoutSizingHorizontal:'FILL',layoutSizingVertical:'HUG'};
  add(s,frames('upper','Tab / Infobox','c1',{...layout,itemSpacing:16,boundVariables:{itemSpacing:{id:rules.spacing[16]}}}),
    component('tab1','Tab','upper',{componentProperties:{variant:{value:'1depth'}}}),
    frames('inset','Infobox','upper',{paddingLeft:20,paddingRight:20}),component('info','Infobox / Card','inset'),
    frames('lower','Tab / Data Block Group','c1',{...layout,itemSpacing:24,boundVariables:{itemSpacing:{id:rules.spacing[24]}}}),
    component('tab2','Tab','lower',{componentProperties:{variant:{value:'2depth'}}}),frames('data','Data Block Group','lower',{paddingLeft:20,paddingRight:20}));
  return s;
}
test('upper and lower Tabs may occupy separate Containers after grouping cancellation',()=>{
  const s=nestedTabPage();assert.equal(check(s).errors.length,0);
  s.items.find(n=>n.id==='c1').paddingBottom=0;
  add(s,frames('c2','Container 2','body',{paddingBottom:32,paddingLeft:20,paddingRight:20,boundVariables:{paddingLeft:{id:rules.spacing[20]},paddingRight:{id:rules.spacing[20]},paddingBottom:{id:rules.spacing[32]}}}));
  s.items.find(n=>n.id==='lower').parentId='c2';assert.equal(check(s).errors.length,0);
});

test('children contract catches Container merging and inserted wrappers',()=>{
  const s=containerPage(),c={checks:[{path:['## BODY'],kind:'children',value:['Container 1','Container 2','Container 3']}]};
  assert.equal(check(s,c).errors.length,0);s.items.find(n=>n.id==='c2').parentId='c1';assert.ok(codes(s,c).includes('CHILDREN'));
  const t=page();add(t,frames('c','Container 1','body'),component('tab','Tab','c'),component('info','Infobox / Card','c'));
  const k={checks:[{path:['## BODY','Container 1'],kind:'children',value:['Tab','Infobox / Card']}]};
  assert.ok(!codes(t,k).includes('CHILDREN'));add(t,frames('wrap','Infobox / Contents','c'));t.items.find(n=>n.id==='info').parentId='wrap';assert.ok(codes(t,k).includes('CHILDREN'));
});
test('approved inset override is scoped to a direct Container with a reason',()=>{
  const s=containerPage(),c=s.items.find(n=>n.id==='c2');c.paddingLeft=c.paddingRight=0;
  const contract={containerInsetOverrides:[{path:['## BODY','Container 2'],value:0,reason:'승인된 native Tab 내부 인셋 보존'}]};
  assert.equal(check(s,contract).errors.length,0);s.items.find(n=>n.id==='c3').paddingLeft=0;assert.ok(codes(s,contract).includes('BODY_CONTAINER_INSET'));
  delete contract.containerInsetOverrides[0].reason;assert.ok(codes(s,contract).includes('CONTRACT'));
});
test('first Feedback or top icon uses Container top40 with its spacing token',()=>{
  for(const name of ['Feedback','IconContainer','status-success']){
    const s=containerPage(true),c=s.items.find(n=>n.id==='c1');c.paddingTop=40;c.boundVariables.paddingTop={id:rules.spacing[40]};add(s,component('lead',name,'c1'));
    assert.equal(check(s).errors.length,0,name);c.paddingTop=24;assert.ok(codes(s).includes('BODY_CONTAINER_PADDING'));
    c.paddingTop=40;delete c.boundVariables.paddingTop;assert.ok(codes(s).includes('BODY_CONTAINER_PADDING_TOKEN'));
  }
});
test('nested icon is detected but later Feedback does not set Container top40',()=>{
  const s=containerPage(true),c=s.items.find(n=>n.id==='c1');c.paddingTop=40;c.boundVariables.paddingTop={id:rules.spacing[40]};add(s,frames('wrap','Icon Area','c1'),component('icon','IconContainer','wrap'));assert.equal(check(s).errors.length,0);
  const t=containerPage(true);add(t,component('title','Title / Page','c1'),component('feedback','Feedback','c1'));assert.equal(check(t).errors.length,0);
  const u=containerPage();add(u,component('feedback','Feedback','c2'));assert.equal(check(u).errors.length,0);
});
test('explicit top-icon role covers image components without guessing every image is an icon',()=>{
  const s=containerPage(true);add(s,component('image','ImageContainer','c1'));assert.equal(check(s).errors.length,0);
  const c=s.items.find(n=>n.id==='c1');c.paddingTop=40;c.boundVariables.paddingTop={id:rules.spacing[40]};assert.equal(check(s,{firstContainerRole:'top-icon'}).errors.length,0);
  assert.ok(codes(s,{firstContainerRole:'unknown'}).includes('CONTRACT'));
  const tab=selectorPage('Tab','1depth');assert.equal(check(tab,{firstContainerRole:'top-icon'}).errors.length,0);
});
function inputPopup(kind='Keypad'){
  const s=snapshot([frames('root','화면ID_입력',null,{fills:fill(rules.colors.white)}),component('pop','Popup','root'),frames('slot','Slot','pop',{type:'SLOT'}),frames('header','Header','slot'),frames('body','Body','slot'),frames('footer','Footer','slot'),component('home','HomeIndicator','footer',{fills:fill(rules.colors.elevated)})]);
  add(s,frames('c1','Container 1','body',{paddingTop:24,paddingLeft:20,paddingRight:20,boundVariables:{paddingTop:{id:rules.spacing[24]},paddingLeft:{id:rules.spacing[20]},paddingRight:{id:rules.spacing[20]}}}),component('title','Title / Page','c1'),frames('c2','Container 2','body',{paddingLeft:20,paddingRight:20,paddingBottom:32,boundVariables:{paddingLeft:{id:rules.spacing[20]},paddingRight:{id:rules.spacing[20]},paddingBottom:{id:rules.spacing[32]}}}),component('input',kind,'footer'));
  return s;
}
test('keypad and pattern Popup Body own no padding while their Containers own24/20/32',()=>{
  for(const kind of ['Keypad','Pattern','Centerinput / Pattern']){const s=inputPopup(kind);assert.equal(check(s).errors.length,0,kind);s.items.find(n=>n.id==='body').paddingTop=24;s.items.find(n=>n.id==='c1').paddingTop=0;assert.ok(codes(s).includes('BODY_PADDING'));assert.ok(codes(s).includes('BODY_CONTAINER_PADDING'));}
});
test('input Popup padding migration preserves token checks without applying to PDF',()=>{
  const s=inputPopup();delete s.items.find(n=>n.id==='c1').boundVariables.paddingTop;assert.ok(codes(s).includes('BODY_CONTAINER_PADDING_TOKEN'));
  const t=pdf();t.items.find(n=>n.id==='body').paddingTop=24;assert.equal(check(t).errors.length,0);
});

test('single ordinary Feedback and first-depth Tab Containers have bottom0 without token',()=>{
  const ordinary=containerPage(true),feedback=containerPage(true),tab=selectorPage('Tab','1depth');
  const c=feedback.items.find(n=>n.id==='c1');c.paddingTop=40;c.boundVariables.paddingTop={id:rules.spacing[40]};add(feedback,component('feedback','Feedback','c1'));
  for(const s of [ordinary,feedback,tab]){
    assert.equal(check(s).errors.length,0);
    const container=s.items.find(n=>n.id==='c1');container.paddingBottom=32;container.boundVariables.paddingBottom={id:rules.spacing[32]};assert.ok(codes(s).includes('BODY_CONTAINER_PADDING'));
    container.paddingBottom=0;assert.ok(codes(s).includes('BODY_CONTAINER_PADDING_TOKEN'));delete container.boundVariables.paddingBottom;assert.equal(check(s).errors.length,0);
  }
});
test('single input Popup Container also has no bottom while two Containers keep last32',()=>{
  const s=inputPopup();s.items=s.items.filter(n=>n.id!=='c2');s.total=s.items.length;assert.equal(check(s).errors.length,0);
  const c=s.items.find(n=>n.id==='c1');c.paddingBottom=32;c.boundVariables.paddingBottom={id:rules.spacing[32]};assert.ok(codes(s).includes('BODY_CONTAINER_PADDING'));
  assert.equal(check(inputPopup()).errors.length,0);
});
