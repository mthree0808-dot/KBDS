import { digest, parseUrl, validatePlan } from './core.mjs';

// Conservative compiler: only referenced layouts, linked instances and styled text.
// Unsupported source features stop here rather than silently approximating them.
export function buildScript(plan, registry, reference) {
  const result=validatePlan(plan,registry,reference);
  if(result.errors.length) throw new Error(JSON.stringify(result,null,2));
  for(const spec of plan.nodes) {
    const r=reference.items.find(n=>n.id===spec.referenceId);
    if(spec.kind==='instance') {
      const unsupported=(r.overrides??[]).some(o=>o.id!==r.id || o.overriddenFields.some(f=>!['width','height'].includes(f)));
      const complexProperties=Object.values(r.componentProperties??{}).some(p=>['SLOT','INSTANCE_SWAP'].includes(p.type));
      if(unsupported || complexProperties)throw new Error(`COMPILER_UNSUPPORTED: ${spec.id} has nested overrides, slots or instance swaps. Use a source-inspected dedicated MCP script and the same output audit.`);
      for(const [k,value] of Object.entries(spec.properties??{})) {
        const p=r.componentProperties?.[k];
        if(!p || !['TEXT','BOOLEAN'].includes(p.type))throw new Error(`COMPILER_UNSUPPORTED: ${spec.id}/${k}; select exact variant key instead of overriding variant or swap IDs.`);
        if((p.type==='BOOLEAN'&&typeof value!=='boolean')||(p.type==='TEXT'&&typeof value!=='string'))throw new Error(`Invalid property type: ${k}`);
      }
    }
  }
  const payload={plan,reference,registry,target:parseUrl(plan.targetUrl),planHash:digest(plan)};
  return `return await (${build.toString()})(figma, ${JSON.stringify(payload)});`;
}
async function build(figma, data) {
  const {plan,reference,registry,target,planHash}=data;
  if(figma.fileKey && figma.fileKey!==target.fileKey) throw new Error('Wrong target file');
  if(target.fileKey===registry.sourceFileKey) throw new Error('Source file is read-only');
  const parent=await figma.getNodeByIdAsync(target.nodeId);
  if(!parent || !['PAGE','SECTION','FRAME'].includes(parent.type)) throw new Error('Target must be a page, section or frame');
  let page=parent;while(page && page.type!=='PAGE')page=page.parent;
  if(!page)throw new Error('Target page missing');
  await figma.setCurrentPageAsync(page);
  const runName=`MO/${plan.runId}`;
  if(parent.children.some(n=>n.name===runName)) throw new Error('Run already exists; inspect receipt/canvas before retry. Never duplicate or overwrite.');
  const refs=new Map(reference.items.map(n=>[n.id,n]));
  const sourceVars=new Map([...registry.variables,...reference.variables].filter(v=>v.key).map(v=>[v.id,v]));
  const importedVars=new Map();const components=new Map();const styles=new Map();
  const modes=[];
  const variable=async id=>{
    if(importedVars.has(id))return importedVars.get(id);
    const src=sourceVars.get(id);if(!src)throw new Error(`Unresolved variable ${id}`);
    const v=await figma.variables.importVariableByKeyAsync(src.key);importedVars.set(id,v);return v;
  };
  // Imports and fonts are validated before creating output nodes.
  for(const n of plan.nodes) {
    if(n.kind==='instance'&&!components.has(n.componentKey)) {
      const c=await figma.importComponentByKeyAsync(n.componentKey);components.set(n.componentKey,c);
      const texts=c.findAllWithCriteria({types:['TEXT']});
      for(const t of texts)for(const s of t.getStyledTextSegments(['fontName']))await figma.loadFontAsync(s.fontName);
    }
    const r=refs.get(n.referenceId);
    if(n.kind==='text') {
      const s=reference.styles.find(x=>x.id===r.segments[0].textStyleId);
      const imported=await figma.importStyleByKeyAsync(s.key);styles.set(n.id,imported);
      await figma.loadFontAsync(r.segments[0].fontName);
    }
    if(n.kind!=='instance') {
      for(const [field,value] of Object.entries(r.boundVariables??{})) if(value?.type==='VARIABLE_ALIAS')await variable(value.id);
      for(const field of ['fills','strokes'])for(const p of r[field]??[])if(p.boundVariables?.color)await variable(p.boundVariables.color.id);
    }
  }
  for(const [key,name] of Object.entries(plan.modes??{})) {
    const collection=registry.collections.find(c=>c.key===key);
    if(!collection)throw new Error('Unknown mode collection');
    const first=registry.variables.find(v=>v.collectionId===collection.id);
    if(!first)throw new Error('Collection has no importable variable');
    const v=await variable(first.id);
    const targetCollection=await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
    const mode=targetCollection.modes.find(m=>m.name===name);
    if(!mode)throw new Error('Requested mode unavailable');
    // Mode switches can affect text font families. Load every known font first.
    for(const font of new Map(registry.textStyles.map(s=>[JSON.stringify(s.fontName),s.fontName])).values())await figma.loadFontAsync(font);
    modes.push({collection:targetCollection,modeId:mode.modeId});
  }
  const created=[];const nodes={};let root=null;
  try {
    for(const spec of plan.nodes) {
      const r=refs.get(spec.referenceId);
      let n;
      if(spec.kind==='instance') {
        n=components.get(spec.componentKey).createInstance();created.push(n.id);
        const inherited=Object.fromEntries(Object.entries(r.componentProperties??{}).filter(([,p])=>['TEXT','BOOLEAN'].includes(p.type)).map(([k,p])=>[k,p.value]));
        if(Object.keys(inherited).length)n.setProperties(inherited);
        if(spec.properties) n.setProperties(spec.properties);
      } else if(spec.kind==='text') {
        n=figma.createText();created.push(n.id);
        await figma.loadFontAsync(n.fontName);
        await n.setTextStyleIdAsync(styles.get(spec.id).id);
        n.textAutoResize='HEIGHT';n.resize(r.width,Math.max(1,r.height));n.characters=spec.characters;
        n.textAlignHorizontal=r.textAlignHorizontal;
      } else {
        n=figma.createAutoLayout(r.layoutMode);created.push(n.id);
        n.fills=[];n.strokes=[];
        n.resize(r.width,r.height);
        for(const k of ['layoutWrap','itemSpacing','counterAxisSpacing','paddingTop','paddingRight','paddingBottom','paddingLeft',
          'primaryAxisAlignItems','counterAxisAlignItems','clipsContent','topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius','strokeWeight']) {
          if(r[k]!==undefined && r[k]!=='MIXED')n[k]=r[k];
        }
      }
      nodes[spec.id]=n.id;n.name=spec.parentId?(spec.name??r.name):runName;
      const host=spec.parentId?await figma.getNodeByIdAsync(nodes[spec.parentId]):parent;
      host.appendChild(n);
      if(!spec.parentId) {
        root=n;
        for(const m of modes)n.setExplicitVariableModeForCollection(m.collection,m.modeId);
        n.x=Math.max(0,...parent.children.filter(c=>c.id!==n.id).map(c=>c.x+c.width))+100;n.y=0;
      }
      if(spec.kind!=='text')n.resize(r.width,r.height);
      if(spec.kind!=='instance') {
        for(const [field,value] of Object.entries(r.boundVariables??{})) {
          if(value?.type==='VARIABLE_ALIAS')n.setBoundVariable(field,await variable(value.id));
        }
        for(const field of ['fills','strokes']) {
          if(!(field in n))continue;
          n[field]=await Promise.all((r[field]??[]).map(async p=>{
            const id=p.boundVariables?.color?.id;
            if(!id)throw new Error(`Unbound paint ${spec.id}/${field}`);
            const {boundVariables,...paint}=p;
            return figma.variables.setBoundVariableForPaint(paint,'color',await variable(id));
          }));
        }
      }
      // Preserve the source's sizing after append and resize, which reset sizing modes.
      if(spec.kind!=='text' && r.layoutSizingHorizontal)n.layoutSizingHorizontal=spec.parentId?r.layoutSizingHorizontal:'FIXED';
      if(spec.kind!=='text' && r.layoutSizingVertical)n.layoutSizingVertical=r.layoutSizingVertical;
    }
    const all=[];const walk=n=>{all.push(n.id);if('children'in n)n.children.forEach(walk);};walk(root);
    return {status:'BUILT_REQUIRES_REVIEW',planHash,fileKey:target.fileKey,pageId:page.id,rootId:root.id,nodes,createdNodeIds:all,
      mutatedNodeIds:[parent.id],outputUrl:`https://www.figma.com/design/${target.fileKey}/?node-id=${root.id.replace(':','-')}`};
  } catch(error) {
    const all=new Set(created);
    for(const id of created){const n=await figma.getNodeByIdAsync(id);if(n&&'children'in n)for(const c of n.findAll())all.add(c.id);}
    return {status:'PARTIAL_FAILURE',planHash,fileKey:target.fileKey,pageId:page.id,rootId:root?.id,nodes,
      createdNodeIds:[...all],mutatedNodeIds:[parent.id],error:String(error),requiresCanvasReadBeforeRetry:true};
  }
}
