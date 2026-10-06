# 계획 및 증거 형식

`init`은 빈 계획을 만듭니다. 다음은 형식 예시이며 실제 ID·해시는 원본을 읽어 채워야 합니다. 예시를 그대로 제작에 사용하지 않습니다.

디자이너 규칙도 기본으로 적용합니다. 각 노드의 reason에 관련 D01~D27을 기록하고 `designer-review.md`에서 적용값·근거·결과 노드를 연결합니다. 화면 이름은 `화면ID_명칭`으로 계획합니다. 현재 일반 생성기의 root 이름 `MO/runId`와는 차이가 있으므로 그대로 완료 처리하지 않습니다. 전용 경로 및 미지원 규칙 처리 기준은 `docs/designer-rules.md`를 참조합니다.

```json
{
  "schemaVersion": 1,
  "runId": "task-001",
  "wireframeUrl": "https://www.figma.com/design/FILE/?node-id=1-2",
  "targetUrl": "https://www.figma.com/design/OUTPUT/?node-id=3-4",
  "registryHash": "node src/cli.mjs hash knowledge/registry.json 결과",
  "referenceHash": "reference.json 해시",
  "preflight": {"sourceRechecked": true, "evidence": "runs/task-001/source-preflight.json"},
  "modes": {
    "b7b943b9ebb8944296e082234e2c3a2d7dc093ec": "Light",
    "4db82376655b7b41abf6af6c48b08ddf52104e1d": "Default"
  },
  "requirements": [{"id":"REQ-01","sourceNodeId":"1:2","description":"기획서 원문 및 기능"}],
  "nodes": [
    {"id":"screen","kind":"layout","referenceId":"10638:16306","requirementIds":["REQ-01"],"reason":"같은 페이지 구조"},
    {"id":"header","parentId":"screen","kind":"layout","referenceId":"10638:16307","requirementIds":["REQ-01"],"reason":"원본 HEADER 재사용"}
  ]
}
```

지원 kind:

|kind|필수 추가 정보|행동|
|---|---|---|
|layout|자동 레이아웃 referenceId|원본 구조·토큰 연결 보존|
|instance|componentKey, 선택적 properties|정확한 variant 컴포넌트를 import하고 instance 생성|
|text|characters|원본 단일 구간 text style과 색상 토큰 연결|
|image-region|이미지 없는 자동 레이아웃 referenceId|빈 영역; 이미지를 생성하거나 다운로드하지 않음|

properties는 실제 Figma 속성 키를 사용합니다. `Label#...` 같은 suffix를 추정하지 않습니다. variant 변경은 정확한 componentKey 선택과 함께 계획에 반영합니다. 공개되지 않은 내부 text override는 일반 컴파일러 지원 범위 밖입니다.

참조와 기획의 컴포넌트가 다르면 적합한 템플릿을 다시 고르거나, 추가 원본 근거를 모아 전용 제작 경로를 사용합니다. 임의의 component key를 넣어 비슷한 UI로 바꾸지 않습니다.

receipt는 최소한 status, planHash, fileKey, pageId, rootId, 계획 id→실제 nodeId 매핑(nodes), createdNodeIds, mutatedNodeIds가 필요합니다. receipt는 제작 도구의 실제 반환값이어야 합니다. 계획서와 같은 파일에 결과를 만들 때에는 읽기 전용 기획 영역과 출력 영역이 겹치지 않는지 실제 계층으로 추가 확인합니다.
