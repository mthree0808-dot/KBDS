// Serialize this helper into use_figma; import the chosen numeric style once
// per batch and pass it in. Never override fontName after applying the style.
export async function applyInputNumericText(figma, node, value, numericStyle) {
  if (node?.type !== 'TEXT' || !/\d/.test(value) || !/^[\d\s.,:;+/()%~−–—-]+$/.test(value)) throw new Error('숫자 값 Text만 적용합니다');
  if (!numericStyle?.id || !numericStyle.fontName) throw new Error('최신 역할별 숫자 Text Style을 먼저 import합니다');
  const fonts = [...node.getStyledTextSegments(['fontName']).map(s => s.fontName), numericStyle.fontName];
  const unique = new Map(fonts.map(f => [JSON.stringify(f), f]));
  await Promise.all([...unique.values()].map(f => figma.loadFontAsync(f)));
  await node.setTextStyleIdAsync(numericStyle.id);
  node.characters = value;
  return {id: node.id, styleKey: numericStyle.key};
}
