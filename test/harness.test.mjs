import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {digest,parseUrl,unwrap,mergeChunks,validatePlan,validateOutput} from '../src/core.mjs';
import {buildScript} from '../src/build.mjs';

function fixture() {
  const registry={sourceFileKey:'SOURCE',components:[{type:'COMPONENT',key:'button'}],variables:[{id:'v1',key:'spacing'}],collections:[],textStyles:[]};
  const ref={id:'r1',type:'FRAME',name:'Root',width:390,height:844,layoutMode:'VERTICAL',layoutSizingHorizontal:'FIXED',layoutSizingVertical:'FIXED',itemSpacing:24,
    paddingTop:0,paddingLeft:0,paddingRight:0,paddingBottom:0,primaryAxisAlignItems:'MIN',counterAxisAlignItems:'MIN',fills:[],strokes:[],boundVariables:{itemSpacing:{type:'VARIABLE_ALIAS',id:'v1'}}};
  const references={complete:true,items:[ref],variables:[],styles:[]};
  const plan={schemaVersion:1,runId:'test',wireframeUrl:'https://www.figma.com/design/Wire/?node-id=1-2',targetUrl:'https://www.figma.com/design/Target/?node-id=3-4',
    registryHash:digest(registry),referenceHash:digest(references),preflight:{sourceRechecked:true,evidence:'fresh MCP read'},requirements:[{id:'R1',sourceNodeId:'1:2',description:'화면'}],
    nodes:[{id:'root',kind:'layout',referenceId:'r1',reason:'공통 화면 구조',requirementIds:['R1']}]};
  const actual={complete:true,total:1,fileKey:'Target',rootId:'o1',items:[{...ref,id:'o1',parentId:null}],variables:[{id:'v1',key:'spacing'}]};
  const receipt={status:'BUILT_REQUIRES_REVIEW',planHash:digest(plan),rootId:'o1',nodes:{root:'o1'}};
  const visual={status:'PASS',reviewer:'test reviewer',outputHash:digest(actual),referenceHash:digest(references),screenshots:{reference:'reference.png',output:'output.png'},checks:Object.fromEntries(['layout','typography','spacing','clipping','overlap','requirements','icons','imageRegions'].map(k=>[k,{status:'PASS',evidence:'inspected fixture'}]))};
  return {registry,references,plan,actual,receipt,visual};
}
const check=f=>validatePlan(f.plan,f.registry,f.references);
const verify=f=>validateOutput(f.plan,f.registry,f.references,f.actual,f.receipt,f.visual);
test('Figma URL parsing supports branch and rejects foreign origins',()=>{
  assert.deepEqual(parseUrl('https://www.figma.com/design/abc/branch/xyz/Name?node-id=1-2'),{fileKey:'xyz',nodeId:'1:2'});
  for(const url of ['https://figma.com.evil.test/design/a/?node-id=1-2','https://figma.com/design/a/','http://figma.com/design/a/?node-id=1-2'])assert.throws(()=>parseUrl(url));
});
test('truncated and error MCP responses cannot become evidence',()=>{
  assert.throws(()=>unwrap({content:[{type:'text',text:'{"x":'}]}));
  assert.throws(()=>unwrap({isError:true,content:[]}));
});
test('complete pagination is required',()=>{
  const a={fileKey:'a',rootId:'r',pageId:'p',total:2,offset:0,items:[{id:'1'}],nextOffset:1};
  const b={...a,offset:1,items:[{id:'2'}],nextOffset:null};
  assert.equal(mergeChunks([b,a]).items.length,2);
  assert.throws(()=>mergeChunks([a]));assert.throws(()=>mergeChunks([a,a]));
  assert.throws(()=>mergeChunks([a,{...b,rootId:'other'}]));
});
test('evidence backed plan passes',()=>assert.equal(check(fixture()).status,'READY'));
test('source design system cannot be output',()=>{const f=fixture();f.plan.targetUrl='https://figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=1-2';assert.ok(check(f).errors.some(e=>e.code==='SOURCE_READ_ONLY'));});
test('changed reference blocks stale plan',()=>{const f=fixture();f.references.items[0].paddingTop=20;assert.ok(check(f).errors.some(e=>e.code==='STALE_REFERENCE'));});
test('unbound spacing cannot be used as a token',()=>{const f=fixture();delete f.references.items[0].boundVariables.itemSpacing;assert.ok(check(f).errors.some(e=>e.code==='UNBOUND_METRIC'));});
test('missing requirement is a hard failure',()=>{const f=fixture();f.plan.nodes[0].requirementIds=[];assert.ok(check(f).errors.some(e=>e.code==='MISSING_REQUIREMENT'));});
test('invented component and detached substitute rejected',()=>{
  const f=fixture();f.plan.nodes.push({id:'button',parentId:'root',kind:'instance',componentKey:'invented',referenceId:'r1',reason:'button'});
  assert.ok(check(f).errors.some(e=>e.code==='COMPONENT'));
});
test('unsupported absolute position blocks approximation',()=>{const f=fixture();f.references.items[0].layoutPositioning='ABSOLUTE';assert.ok(check(f).errors.some(e=>e.code==='ABSOLUTE_UNSUPPORTED'));});
test('mode must be selected from reference evidence',()=>{const f=fixture();f.registry.collections=[{id:'c',key:'ck',name:'Type',modes:[{modeId:'default',name:'Default'},{modeId:'large',name:'Large'}]}];f.references.items[0].resolvedVariableModes={c:'large'};assert.ok(check(f).errors.some(e=>e.code==='MODE'));});
test('compiled script is valid async JS and contains retry guard',()=>{
  const f=fixture();const code=buildScript(f.plan,f.registry,f.references);const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
  assert.doesNotThrow(()=>new AsyncFunction('figma',code));assert.match(code,/Run already exists/);
});
test('blocked plans cannot compile',()=>{const f=fixture();f.plan.requirements=[];assert.throws(()=>buildScript(f.plan,f.registry,f.references));});
test('compiler refuses nested overrides rather than dropping template content',()=>{
  const f=fixture();f.references.items.push({id:'ri',type:'INSTANCE',component:{key:'button'},overrides:[{id:'child',overriddenFields:['characters']}]});
  f.plan.nodes.push({id:'button',parentId:'root',kind:'instance',componentKey:'button',referenceId:'ri',reason:'reference button'});
  f.plan.referenceHash=digest(f.references);
  assert.throws(()=>buildScript(f.plan,f.registry,f.references),/COMPILER_UNSUPPORTED/);
});
test('current structural and visual evidence passes',()=>assert.equal(verify(fixture()).status,'PASS'));
test('no visual evidence cannot pass',()=>{const f=fixture();f.visual={};assert.ok(verify(f).errors.some(e=>e.code==='VISUAL_REVIEW'));});
test('stale screenshot review cannot pass after mutation',()=>{const f=fixture();f.actual.items[0].width=400;assert.ok(verify(f).errors.some(e=>e.code==='VISUAL_REVIEW'));});
test('template spacing drift is detected',()=>{const f=fixture();f.actual.items[0].itemSpacing=20;assert.ok(verify(f).errors.some(e=>e.code==='LAYOUT'));});
test('width drift is detected',()=>{const f=fixture();f.actual.items[0].width=375;assert.ok(verify(f).errors.some(e=>e.code==='WIDTH'));});
test('unverified output mode cannot pass',()=>{const f=fixture();f.plan.modes={color:'Dark'};assert.ok(verify(f).errors.some(e=>e.code==='OUTPUT_MODE'));});
test('removed binding is detected even if pixel value matches',()=>{const f=fixture();f.actual.items[0].boundVariables={};assert.ok(verify(f).errors.some(e=>e.code==='TOKEN_BINDING'));});
test('foreign token and unexpected nodes are detected',()=>{
  const f=fixture();f.actual.items.push({id:'extra',type:'FRAME',parentId:'o1',boundVariables:{itemSpacing:{type:'VARIABLE_ALIAS',id:'foreign'}}});f.actual.total=2;
  const result=verify(f);assert.ok(result.errors.some(e=>e.code==='UNPLANNED_NODE'));assert.ok(result.errors.some(e=>e.code==='FOREIGN_TOKEN'));
});
test('image fills are forbidden',()=>{const f=fixture();f.actual.items[0].fills=[{type:'IMAGE',imageHash:'image'}];assert.ok(verify(f).errors.some(e=>e.code==='IMAGE'));});
test('partial build cannot be reported complete',()=>{const f=fixture();f.receipt.status='PARTIAL_FAILURE';assert.ok(verify(f).errors.some(e=>e.code==='RECEIPT_STATUS'));});
test('real registry and reference are complete and traceable',()=>{
  const r=JSON.parse(fs.readFileSync(new URL('../knowledge/registry.json',import.meta.url),'utf8'));
  const s=JSON.parse(fs.readFileSync(new URL('../knowledge/reference-header.json',import.meta.url),'utf8'));
  assert.equal(r.variables.length,584);assert.equal(r.textStyles.length,114);assert.equal(r.components.length,1273);
  assert.equal(new Set(r.components.map(c=>c.key)).size,r.components.length);
  assert.equal(s.items.length,42);assert.equal(s.complete,true);
  assert.equal(s.items[0].width,390);assert.ok(s.items.some(n=>n.type==='TEXT'&&n.segments.some(s=>s.fontName.family==='KBFG Text')));
});
