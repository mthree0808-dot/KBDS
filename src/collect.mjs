// Serialized into use_figma by the CLI. No network or canvas writes.
export async function collect(figma, config) {
  const page = await figma.getNodeByIdAsync(config.pageId);
  if (!page || page.type !== 'PAGE') throw new Error('Expected an existing pageId');
  await figma.setCurrentPageAsync(page);
  const root = await figma.getNodeByIdAsync(config.rootId);
  if (!root) throw new Error('Root not found');
  let owner = root;
  while (owner && owner.type !== 'PAGE') owner = owner.parent;
  if (!owner || owner.id !== page.id) throw new Error('Root belongs to another page');
  const all = [];
  const visit = (n, path, parentId, ancestorVisible) => {
    const visible = ancestorVisible && (!('visible' in n) || n.visible);
    all.push({ node: n, path, parentId, visible });
    if ('children' in n) n.children.forEach((c, i) => visit(c, [...path, i], n.id, visible));
  };
  visit(root, [], null, true);
  const offset = config.offset ?? 0;
  const limit = config.limit ?? 10;
  const items = [];
  const fields = ['x','y','width','height','layoutMode','layoutWrap','itemSpacing','counterAxisSpacing',
    'paddingTop','paddingRight','paddingBottom','paddingLeft','primaryAxisAlignItems','counterAxisAlignItems',
    'primaryAxisSizingMode','counterAxisSizingMode','layoutSizingHorizontal','layoutSizingVertical',
    'layoutPositioning','clipsContent','cornerRadius','topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius',
    'fills','strokes','strokeWeight','effects','opacity','boundVariables','explicitVariableModes','resolvedVariableModes',
    'fillStyleId','strokeStyleId','effectStyleId','absoluteBoundingBox','constraints'];
  for (const row of all.slice(offset, offset + limit)) {
    const n = row.node;
    const out = { id: n.id, name: n.name, type: n.type, path: row.path, parentId: row.parentId, visible: row.visible };
    for (const key of fields) if (key in n) out[key] = typeof n[key] === 'symbol' ? 'MIXED' : n[key];
    if (n.type === 'INSTANCE') {
      const main = await n.getMainComponentAsync();
      out.component = main ? {id:main.id,key:main.key,name:main.name,remote:main.remote} : null;
      out.componentProperties = n.componentProperties;
      out.overrides = n.overrides;
    }
    if (n.type === 'TEXT') {
      out.characters = n.characters;
      out.textAutoResize = n.textAutoResize;
      out.hasMissingFont = n.hasMissingFont;
      out.segments = n.getStyledTextSegments(['fontName','fontSize','lineHeight','letterSpacing','textStyleId','fills','boundVariables']);
      out.textAlignHorizontal = n.textAlignHorizontal;
    }
    items.push(out);
  }
  // Resolve references by key; IDs alone are file-local and cannot be allowlists.
  const variableIds = new Set();
  const styleIds = new Set();
  const scan = v => {
    if (!v || typeof v !== 'object') return;
    if (v.type === 'VARIABLE_ALIAS') variableIds.add(v.id);
    for (const [k, x] of Object.entries(v)) {
      if (/StyleId$/.test(k) && typeof x === 'string' && x && x !== 'MIXED') styleIds.add(x);
      scan(x);
    }
  };
  scan(items);
  const variables = [];
  const pending = [...variableIds];
  const seen = new Set();
  while (pending.length) {
    const id = pending.shift();
    if (seen.has(id)) continue;
    seen.add(id);
    const v = await figma.variables.getVariableByIdAsync(id);
    if (!v) { variables.push({id, unresolved:true}); continue; }
    const c = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
    variables.push({id:v.id,key:v.key,name:v.name,type:v.resolvedType,valuesByMode:v.valuesByMode,
      collectionId:v.variableCollectionId,collectionKey:c?.key,modes:c?.modes,scopes:v.scopes});
    for (const value of Object.values(v.valuesByMode)) if (value && typeof value === 'object' && value.type === 'VARIABLE_ALIAS') pending.push(value.id);
  }
  const styles = [];
  for (const id of styleIds) {
    const s = await figma.getStyleByIdAsync(id);
    styles.push(s ? {id:s.id,key:s.key,name:s.name,type:s.type} : {id,unresolved:true});
  }
  return {schemaVersion:1,fileKey:config.fileKey,pageId:page.id,rootId:root.id,total:all.length,
    offset,limit,nextOffset:offset+items.length<all.length?offset+items.length:null,items,variables,styles};
}

export function collectorScript(config) {
  return `return await (${collect.toString()})(figma, ${JSON.stringify(config)});`;
}
