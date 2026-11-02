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
  const inferred = roots.some(n => n.name === 'Dialog') ? 'dialog'
    : roots.some(n => n.name === 'BottomSheet') ? 'bottom-sheet'
    : roots.some(n => n.name === 'Popup') ? 'popup'
    : roots.some(n => n.name === '## BODY') ? 'page' : null;
  const screenType = contract.screenType === 'auto' || !contract.screenType ? inferred : contract.screenType;
  if (!['page', 'popup', 'pdf', 'dialog', 'bottom-sheet', 'layout'].includes(screenType)) fail('SCREEN_TYPE', root, '화면 유형을 판정할 수 없습니다. screenType을 명시하세요');
  if (screenType !== 'layout' && screenType) paint(root, rules.colors.white);
  if (screenType === 'page') {
    one(['## HEADER']); one(['## BODY']);
    const footers = roots.filter(n => ['## FOOTER', 'Footer'].includes(n.name));
    if (footers.length !== 1) fail('FOOTER', root, '일반 화면의 푸터는 정확히 1개 필요');
    if (roots.some(n => n.name === 'Popup')) fail('PAGE_POPUP', root, '일반 화면을 Popup으로 감싸지 않습니다');
  }
  const popups = roots.filter(n => n.name === 'Popup');
  for (const popup of popups) {
    const slot = one(['Slot'], popup);
    if (!slot) continue;
    one(['Header'], slot); const body = one(['Body'], slot); one(['Footer'], slot);
    // A PDF document also identifies the type when its toolbar was omitted.
    const pdf = screenType === 'pdf' || resolve(['Title Area'], body).length || resolve(['body', 'PDF Document'], body).length;
    if (body && pdf) {
      paint(one(['Title Area'], body), rules.colors.pdf);
      const viewport = one(['body'], body); paint(viewport, rules.colors.pdf);
      if (viewport) paint(one(['PDF Document'], viewport), rules.colors.white);
    }
  }
  if (['popup', 'pdf'].includes(screenType) && popups.length !== 1) fail('POPUP', root, 'Popup 인스턴스는 정확히 1개 필요');
  const overlays = ['dialog', 'bottom-sheet'].includes(screenType);
  if (overlays) {
    one(['Dimmed']);
    const allowed = new Set(['Dimmed', 'Dialog', 'BottomSheet', 'StatusBar', 'HomeIndicator', 'Keypad']);
    for (const n of roots) if (visible(n) && !allowed.has(n.name)) fail('OVERLAY_BACKGROUND', n, 'Dimmed 아래에 이전 화면을 재현하지 않습니다');
  }
  if (screenType === 'bottom-sheet') {
    for (const n of roots.filter(n => ['BottomSheet', 'HomeIndicator', 'Keypad'].includes(n.name))) if (n.layoutPositioning !== 'AUTO') fail('SHEET_FLOW', n, 'BottomSheet·HomeIndicator·Keypad는 AUTO 흐름이어야 합니다');
    for (const n of roots.filter(n => ['Dimmed', 'StatusBar'].includes(n.name))) if (n.layoutPositioning !== 'ABSOLUTE') fail('SHEET_OVERLAY', n, 'Dimmed·StatusBar만 Absolute로 배치합니다');
  }
  if (screenType !== 'layout') {
    const homes = items.filter(n => n.name === 'HomeIndicator' && n.type === 'INSTANCE' && visible(n));
    if (homes.length !== 1) fail('HOME_INDICATOR', root, '노출된 HomeIndicator 인스턴스 1개 필요');
    for (const home of homes) paint(home, rules.colors.elevated, screenType !== 'dialog');
  }
  for (const n of items) {
    if (!visible(n)) continue;
    if (n.type === 'INSTANCE' && !n.component?.key) fail('INSTANCE_KEY', n, '실제 원본 mainComponent key가 없습니다');
    if (n.type !== 'TEXT') continue;
    if (n.hasMissingFont) fail('MISSING_FONT', n, '누락 폰트가 있습니다');
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
  const stem = n => n.type === 'TEXT' ? 'Text' : n.type === 'INSTANCE' ? n.name.split(' / ')[0] : n.name;
  const repeatable = new Set(['Text', 'TextList', 'InputField', 'DataList', 'Card', 'Data Block', 'Radio', 'Checkbox', 'List', 'Accordion']);
  for (const n of items.filter(n => n.type === 'FRAME' && authored(n) && visible(n))) {
    const cs = kids(n).filter(c => visible(c) && c.layoutPositioning !== 'ABSOLUTE');
    if (!cs.length) continue;
    if (n.name.endsWith(' Group') && !n.name.includes(' / ')) {
      const base = n.name.slice(0, -6);
      if (repeatable.has(base) && (cs.length < 2 || cs.some(c => stem(c) !== base))) fail('GROUP_CONTENTS', n, `${n.name}은 실제 같은 항목의 복수만 포함해야 합니다`);
    }
    for (const base of repeatable) {
      const repeated = cs.filter(c => (c.type === 'TEXT' || c.type === 'INSTANCE' || c.type === 'FRAME') && stem(c) === base);
      if (repeated.length > 1 && n.name !== `${base} Group`) fail('REPEAT_GROUP', n, `반복 ${base} ${repeated.length}개를 실제 ${base} Group으로 묶어야 합니다`);
    }
    if (cs.some(c => stem(c) === 'Text') && cs.some(c => c.name === 'TextList Group') && n.name !== 'Text / TextList Group') fail('MIXED_GROUP_NAME', n, 'Text와 TextList Group의 부모명은 Text / TextList Group입니다');
    if (n.name === 'Title / TextList Group' && !cs.some(c => c.name === 'TextList Group')) fail('PARENT_NAME', n, '구조 변경 후 부모명을 다시 판정하세요. 복합 콘텐츠는 Title / Contents입니다');
    if (n.name.startsWith('Title / ') && n.name !== 'Title / Contents' && cs.some(c => c.type === 'FRAME' && c.name === n.name)) fail('PARENT_NAME', n, '같은 Title 복합 그룹을 중첩한 상위 부모는 Title / Contents입니다');
    if (cs.some(c => c.name === 'Title / Section' || c.name === 'Title / Element') && cs.some(c => c.name.includes(' / ') && c.name !== 'Title / Section' && c.name !== 'Title / Element' && c.type === 'FRAME') && n.name.startsWith('Title / ') && n.name !== 'Title / Contents') fail('PARENT_NAME', n, '제목과 복합 콘텐츠의 부모명은 Title / Contents입니다');
    const uniformGap = {'InputField Group': 24, 'Radio Group': 20, 'Checkbox Group': 20};
    if (uniformGap[n.name] !== undefined) spacing(n, uniformGap[n.name]);
    if (cs.length > 1 && cs.every(c => c.name === 'Title / TextList Group')) spacing(n, 24);
    if (n.name === 'ConsentFinal / StickyButton') {
      if (cs.length !== 2 || cs[0].name !== 'ConsentFinal' || cs[1].name !== 'StickyButton') fail('CONSENT_CTA', n, 'ConsentFinal → StickyButton 순서·구조 필요');
      spacing(n, 24);
    }
    for (let i = 0; i < cs.length - 1; i++) {
      const a = cs[i], b = cs[i + 1]; let gap;
      if (['Title / Section', 'Title / Element'].includes(a.name)) gap = screenType === 'bottom-sheet' && (b.type === 'TEXT' || ['Text', 'Text Group', 'TextList Group'].includes(b.name)) ? 12 : 16;
      if (a.name === 'Title / Page' && b.name === 'Image Area') gap = 0;
      if (['Image Area', 'ImageContainer', 'Infobox / Card'].includes(a.name)) gap = 24;
      if (a.name === 'Chip / Basic') gap = b.name === 'Feedback' ? 24 : 8;
      if (a.name === 'Tab') gap = b.name === 'Infobox / Card' ? 16 : 24;
      if (a.name === 'Feedback') gap = 40;
      if (a.name === 'Infobox / Solid' && ['InputField', 'InputField Group', 'Feedback'].includes(b.name)) gap = 24;
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
