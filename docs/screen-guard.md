# 제작과 같은 호출에서 실행하는 공통 검사

`src/screen-guard.mjs`와 `knowledge/screen-rules.json`이 실제 실행 코드다. MD를 읽었다는 사실만으로 검수 완료 처리하지 않는다. Node.js 외 추가 설치나 API 키는 필요 없다. Figma 접속·실행은 기존 Codex Figma MCP를 사용한다.

## 제작할 때

일반 `build` 명령은 공통 검사까지 포함한 스크립트를 생성한다. Slot·Grid·중첩 컴포넌트 등을 다루는 전용 제작 스크립트는 다음처럼 감싼다.

```sh
node src/cli.mjs guard-build /tmp/build.js FILE_KEY PAGE_ID /tmp/build-checked.js /tmp/contract.json
```

마지막 contract 경로는 선택 사항이다. 생성된 JS 전체를 `use_figma`에서 실행한다. 제작 코드가 먼저 실행되고, 반환한 각 루트의 실제 노드를 한 번 수집해 필수 규칙을 검사한다. 같은 호출 안에서 실행하므로 BG·폰트·간격·레이어 검사마다 별도 호출하지 않는다. 여러 화면의 `mapping`도 한 번에 검사한다. 제작 스크립트는 올바른 페이지로 먼저 전환해야 하며 검사기는 다른 페이지로 몰래 전환하지 않는다.

제작 코드의 반환값:

```js
return {rootId: screen.id, pageId: figma.currentPage.id, createdNodeIds};
// 또는 여러 화면
return {mapping: screens.map(n => ({id: n.id})), createdNodeIds};
```

- `BLOCKED_REQUIRES_FIX`: 실제 결과에서 필수 규칙 실패. `audits[].errors`의 nodeId·code를 보고 수정한다. 제작 결과·receipt를 보존하므로 화면을 중복 생성하지 않는다. 수정 후에는 해당 루트만 `guard`로 재검사한다.
- `BUILT_REQUIRES_REVIEW`: 공통 구조 검사 통과. 이후 실제 화면을 시각 검수한다. 자동으로 전체 검수 `PASS`를 만들지 않는다.
- 제작 오류·빈 receipt·루트 누락은 `BLOCKED`다. 도구 자체가 오류를 반환했다면 Figma 도구의 safeToRetryWithoutCanvasRead 지시에 따른다.

기존 화면 또는 수정 후 재검사:

```sh
node src/cli.mjs guard FILE_KEY PAGE_ID ROOT_ID /tmp/check.js /tmp/contract.json
# 생성된 check.js를 use_figma에서 실행한다 (읽기 전용).
node src/cli.mjs audit /tmp/complete-snapshot.json /tmp/contract.json
# 기존 collect/merge로 수집한 JSON을 로컬에서 검사한다. 오류 시 exit 1.
```

## 현재 자동 검사 범위

|항목|자동 검사|
|---|---|
|스냅샷|전체 수집, 중복 ID, 누락 부모·순환/분리 계층|
|BODY/Container|일반 BODY·키패드/패턴 Popup Body 네 방향padding0, 첫 Container 상단 일반24·Feedback/상단 아이콘40·StepIndicator/1depth Tab 시작0, 단일 하0·하단 변수 해제/복수 마지막하32 및 토큰, 일반 좌우20/StepIndicator·1depth Tab·알려드립니다 등 식별 가능한 전폭 외곽0|
|선택 UI 그룹|Segment·Chip과 후속 콘텐츠의 실제 Vertical·Fill/Hug·AUTO 부모·명칭·순서. Tab 그룹핑·동일 Container 범위 강제는 삭제|
|화면 구조|일반 직계 3단, Popup Slot의 Header/Body/Footer, PDF 툴바·뷰포트·문서|
|BG|PDF Title Area·body의 light-gray, 문서·화면 white, 실제 변수 key·Paint 노출·opacity·레이어 노출|
|HomeIndicator|elevated 변수 연결, Dialog만 배경 Paint 숨김, 기타 화면 노출|
|오버레이|이전 화면 배경 재현 금지, 바텀시트 AUTO/Absolute 구분, Dialog Area의 중앙 정렬·안전영역 보정|
|대표전화 오류 Dialog|최종320px Dialog·Item Group·16/8/4/20 간격, 번호 SemiBold16/primary/링크 없음, 펼친 자세히보기|
|컴포넌트|실제 mainComponent key, 명시한 최신 key·공개 옵션과 일치|
|더미 Image Area|편집 가능한 더미 라벨이 있는 영역의 native ratio2:1·원본 PNG/hash·CROP·패딩40/0/40/0·서체21/SemiBold/변수·빨강40%·흰색2px OUTSIDE·중앙 배치|
|CTA|BoxButton/TextButton의 Label 문구 가로 Hug·WIDTH_AND_HEIGHT|
|하단 약관·CTA|Footer 직계 ConsentFinal / StickyButton 존재, 실제 래퍼·인스턴스·순서, gap24, 좌우padding20, AUTO·Fill/Hug; 이름만 바꾸거나 ConsentGroup으로 대체한 경우 차단|
|서체|실제 Text 단위 숫자/혼용 판정, 전화번호·날짜 구분자, 누락 폰트와 스타일/서체 변수 연결|
|레이어|실제 반복 그룹, Text/TextList 혼합, 구조에 맞는 부모명, 원형 내부 일괄 변경 방지|
|간격|InputField Group24, Radio/Checkbox Group20, Section16/바텀시트 텍스트12, Tab→Infobox / Card16, Image Area 후24 등 코드에 명시된 조합과 토큰|
|기획별 요구|contract에 명시한 원문·component key·공개 옵션·배치 속성·추가 Fill·gap|

모든 MD 문장이나 모든 조합을 자동 판정하는 도구는 아니다. 기획 원문과 실제 컴포넌트 선택의 타당성, 아이콘 의미, 임의 override가 향후 variant 전환에 미치는 영향, 잘림·겹침·위계·자연 줄바꿈은 직접 원본/시각/전환 검수가 필요하다. 실제 폰트 누락은 네이티브 StatusBar 내부라도 오류로 보고하며, 원형 문제를 통과시키기 위해 무시하지 않는다. 숫자·기호만인 정적 장식은 문자/숫자 서체 자동 판정에서 제외한다. 검사기는 임의로 레이어를 이동하거나 원본을 수정하지 않는다.

## 작업별 명세

화면 유형은 `auto`, `page`, `popup`, `pdf`, `dialog`, `bottom-sheet`다. `layout`은 독립 화면이 아닌 레이아웃 조각 검수에만 사용하며, 실제 화면 검사를 우회하는 용도로 쓰지 않는다. 경로는 루트를 제외한 **정확한 직계 자식 이름의 배열**이다. 경로가 없거나 중복이면 오류다. 숫자 ID와 공개 옵션 키는 원본 조회로 확인한다.

```json
{
  "screenType": "pdf",
  "checks": [
    {"kind":"fill","path":["Popup","Slot","Body","Title Area"],"tokenKey":"a888f227e02f51f118bd937ae9d9ad73617f1765"},
    {"kind":"gap","path":["Popup","Slot","Body","body","PDF Document"],"value":32}
  ]
}
```

지원 kind: `fill(tokenKey, visible)`, `gap(value)`, `text(value)`, `instance(key)`, `property(property, value)`, `layout(field, value)`, `children(value: 직계 자식 이름 배열)`. 문자열은 기획 원문 그대로 비교한다. unsupported kind·값 누락·경로 미확인은 실패다. 반복 이름 때문에 경로가 중복되면 제작에서 구분 가능한 적절한 래퍼를 사용하거나 현재 스냅샷과 전용 검사를 사용하며 원형 내부를 임의로 재명명하지 않는다.

## 유지보수와 검증

규칙을 변경할 때 MD·기계 규칙·회귀 테스트를 함께 갱신한다. `node --test`는 BG 누락/숨김, 고정 CTA, 숫자·혼용 서체, 반복/혼합 그룹, 간격·토큰, 스냅샷 오류와 생성 스크립트의 실행·실패 차단을 검사한다. 테스트 시간은 Figma 제작 전체 시간이나 연결 속도를 보장하는 수치가 아니다.

일반 `verify`도 공통 검사를 실행한 뒤 기존 참조 비교와 현재 스크린샷 증거를 검사한다. 구조 통과 후 같은 화면을 변경하지 않았다면 반복 수집하지 않는다. 시각 수정이 발생하면 해당 결과와 영향 범위만 다시 확인한다. 별도 보고서는 사용자 요청이 있을 때만 생성한다.

### 대표전화·응답코드 최종 Dialog

공통 오류 최종 틀은 `{"screenType":"dialog","dialogPattern":"phone-details"}`로 명시할 수 있습니다. 실제 alertAccordion Dialog와 대표전화 블록이 있는 경우에도 자동으로 검사합니다. 일반 단순 Dialog에는 이 내용을 강제하지 않습니다. 원형의 자세한 제목/설명 스타일·그림자·아이콘 크기·예시가 아닌 실제 응답코드는 독립 명세와 기획을 함께 직접 대조합니다.

### BODY 전폭 판정의 범위

자동 검사는 실제 이름과 공개 variant로 StepIndicator·Tab(1depth)·Infobox / FullWidth 및 알려드립니다 제목을 가진 Accordion을 식별한다. Divider가 문서 내부인지 화면 전폭인지, 일반 본문 내부 래퍼의 중복 여백과 선택 UI가 제어하는 정확한 콘텐츠 범위는 기획·실제 계층으로 직접 확인한다. 검사를 통과시키기 위해 네이티브 컴포넌트 내부 padding이나 이름을 바꾸지 않는다.

### 첫 UI와 Tab 그룹핑 의무 삭제 (2026-11-04)

Container의 첫 보이는 일반 흐름 경로를 따라 StepIndicator/1depth Tab 시작을 식별하며 상단0px 예외를 계속 검사한다. Tab과 후속 콘텐츠의 그룹·부모 명칭은 검사하지 않으며, 상하위 탭의 동일 Container 강제 검사(TOP_TAB_SCOPE)도 삭제했다. Segment·Chip의 그룹핑과 BODY/Container 패딩 검사는 유지한다. 같은 부모에서 Tab 다음 실제 UI가 Infobox / Card인 경우16px, 그 외24px 간격 검사는 유지한다. 서로 다른 부모 사이의 실제 Tab→콘텐츠 경계 간격은 직접 확인한다. 그룹이 없다는 이유로 새 래퍼를 강제하지 않으며 기존 그룹의 자동 해제도 요구하지 않는다.

### Container 구조 보존 계약

`checks`에 `{path:["## BODY"],kind:"children",value:["Container 1","Container 2"]}`와 각 Container의 실제 직계 자식 이름 목록을 추가한다. 보이는 일반 흐름 자식의 수·이름·순서를 검사해 병합·중간 래퍼 추가를 차단한다. 원래 구조는 자동 추정하지 않으므로 수정 전 계층 또는 사용자 복원 지시를 계약으로 제공한다.

승인된 전폭/자체 인셋과 기본20 판정이 다를 때만 `containerInsetOverrides:[{path:["## BODY","Container 2"],value:0,reason:"2067:2030 승인: native Tab2 내부20·본문350 중앙/자체인셋 보존"}]`로 실제 경로를 명시한다. 값0/20·비어 있지 않은 근거·BODY 직계 Container만 허용한다. 다른 패딩/토큰·서체·구조 검사는 유지하며 실제 중복 인셋 여부는 직접 확인한다. 이 예외를 임의 병합이나 오류 숨김에 사용하지 않는다.

### Feedback·상단 아이콘 상단40

첫 보이는 일반 흐름 경로의 실제 Feedback·IconContainer·status-*는 첫 Container 상단40px와 spacing/6xl을 검사한다. 이름만으로 알 수 없는 ImageContainer 아이콘 사례는 기획·원형 확인 후 `{firstContainerRole:"top-icon"}` 또는 feedback으로 명시할 수 있다. 일반24·최초 StepIndicator/1depth Tab0·두 번째 이후 상0·BODY padding0·단일하0/복수 마지막하32를 적용한다. 사진이나 뒤쪽 아이콘은 자동으로40을 적용하지 않는다. 아이콘 의미·렌더는 직접 확인한다.

### 키패드·패턴 Popup Body

실제 Popup > Slot > Body와 같은 Popup 안의 Keypad·Pattern·Centerinput / Pattern 인스턴스를 식별하면 본문 padding0·Container 시작 UI별 상24/40/0·좌우20·단일하0/복수 마지막하32 및 토큰을 검사한다. PDF·다른 Popup Body에는 이 분기를 적용하지 않는다. 승인5054:2599처럼 Body0/첫 Container24를 따르고 겉보기 위치가 같은 Body24/Container0도 실패 처리한다. 원문·입력 상태·원형 내부 패딩·전체 높이·실제 경계는 직접 대조한다.

### 단일 Container 하단

본문 직계에서 보이는 AUTO 페이지 Container가 하나면 paddingBottom0 및 boundVariables.paddingBottom 미연결을 검사한다. 시작 UI별 상단24/40/0와 좌우 인셋은 유지한다. 복수이면 마지막하32·spacing/5xl을 계속 검사한다. 일반 BODY와 키패드/패턴 Popup Body에 적용하며 Container 병합이나 native 내부 패딩 변경의 근거가 아니다.
