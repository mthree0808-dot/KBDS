import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseUrl, unwrap, mergeChunks, digest, validatePlan, validateOutput, report } from './core.mjs';
import { collectorScript } from './collect.mjs';
import { buildScript } from './build.mjs';

const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const write=(p,v)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,typeof v==='string'?v:JSON.stringify(v,null,2)+'\n','utf8');};
const [command,...args]=process.argv.slice(2);
const registryPath=path.join(base,'knowledge/registry.json');
try {
  if(command==='help'||!command) {
    console.log(`MO Figma harness (Node 22+, no dependencies)
  catalog [keyword]                    원본 컴포넌트/토큰/스타일 검색
  init <run-id> <wireframe-url> <target-url>
  collect <file-key> <page-id> <root-id> <offset> <limit> <output.js>
  merge <output.json> <chunk1.json> ...  잘림/누락/중복 검사 후 병합
  hash <file.json>                      계획 근거 해시
  plan <plan.json> <reference.json>     제작 전 검사
  build <plan.json> <reference.json> <output.js>
  verify <plan.json> <reference.json> <actual.json> <receipt.json> <visual.json> <report.md>

생성한 JS를 Codex Figma use_figma(code, fileKey, skillNames)로 실행합니다.
CLI는 Figma에 직접 접속하지 않으며 build는 스크립트만 생성합니다.`);
  } else if(command==='catalog') {
    const r=read(registryPath);const q=(args[0]??'').toLowerCase();
    console.log(JSON.stringify(['components','variables','textStyles'].flatMap(kind=>r[kind].filter(x=>x.name.toLowerCase().includes(q)).map(x=>({kind,...x}))),null,2));
  } else if(command==='init') {
    const [runId,wireframeUrl,targetUrl]=args;
    if(!/^[a-zA-Z0-9_-]+$/.test(runId??''))throw new Error('run-id: 영문, 숫자, _, -만 허용');
    parseUrl(wireframeUrl);const target=parseUrl(targetUrl);
    if(target.fileKey==='09eGMNTNnkE0CTxPdr7lnk')throw new Error('원본 디자인 시스템은 산출물 대상이 아닙니다');
    const dir=path.join(base,'runs',runId);if(fs.existsSync(dir))throw new Error('동일 run-id가 존재합니다');
    write(path.join(dir,'plan.json'),{schemaVersion:1,runId,wireframeUrl,targetUrl,registryHash:digest(read(registryPath)),referenceHash:'',preflight:{sourceRechecked:false,evidence:''},requirements:[],nodes:[]});
    write(path.join(dir,'visual.json'),{status:'NOT_RUN',reviewer:'',outputHash:'',referenceHash:'',screenshots:{reference:'',output:''},checks:Object.fromEntries(['layout','typography','spacing','clipping','overlap','requirements','icons','imageRegions'].map(k=>[k,{status:'NOT_RUN',evidence:''}]))});
    console.log(dir);
  } else if(command==='collect') {
    const [fileKey,pageId,rootId,offsetRaw,limitRaw,out]=args;
    const offset=Number(offsetRaw),limit=Number(limitRaw);
    if(!out||!Number.isInteger(offset)||offset<0||!Number.isInteger(limit)||limit<1||limit>25)throw new Error('offset >=0, limit 1..25 필요');
    write(out,collectorScript({fileKey,pageId,rootId,offset,limit}));console.log(out);
  } else if(command==='merge') {
    const [out,...files]=args;write(out,mergeChunks(files.map(read)));console.log(out);
  } else if(command==='hash') console.log(digest(read(args[0])));
  else if(command==='plan'||command==='build') {
    const [p,r,out]=args;const plan=read(p),refs=read(r),registry=read(registryPath);
    if(command==='build'){write(out,buildScript(plan,registry,refs));console.log(out);}
    else {const result=validatePlan(plan,registry,refs);console.log(JSON.stringify(result,null,2));if(result.errors.length)process.exitCode=1;}
  } else if(command==='verify') {
    const [p,r,a,receipt,v,out]=args;const plan=read(p);
    const result=validateOutput(plan,read(registryPath),read(r),read(a),unwrap(read(receipt)),read(v));
    write(out,report(result,plan));write(out+'.json',result);console.log(result.status);
    if(result.errors.length)process.exitCode=1;
  } else throw new Error('Unknown command. Use help.');
} catch(e) {console.error(e.message);process.exitCode=1;}
