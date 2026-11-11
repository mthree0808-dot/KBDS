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
|BODY/Container|일반 BODY·키패드/패턴 Popup Body 네 방향padding0, 첫 Container 상단 일반24·Feedback/상단 아이콘40·StepIndicator/1depth Tab 시작0, 단일·복수 모두 마지막하32 및 토큰, 일반 좌우20/StepIndicator·1depth Tab·알려드립니다 등 식별 가능한 전폭 외곽0|
|선택 UI 그룹|Segment·Chip과 후속 콘텐츠의 실제 Vertical·Fill/Hug·AUTO 부모·명칭·순서. Tab 그룹핑·동일 Container 범위 강제는 삭제|
|화면 구조|일반 직계 3단, Popup Slot의 Header/Body/Footer, PDF 툴바·뷰포트·문서|
|고정 키패드 뷰포트|`keyboardViewport: "fixed844"` 계약의390×844 Fixed·Popup/Slot/Body Fill·Body clip·키패드 Footer AUTO/Hug. 입력 필드의 실제 노출은 직접 확인|
|BG|PDF Title Area·body의 light-gray, 문서·화면 white, 실제 변수 key·Paint 노출·opacity·레이어 노출|
|HomeIndicator|elevated 변수 연결, Dialog만 배경 Paint 숨김, 기타 화면 노출|
|오버레이|이전 화면 배경 재현 금지, 바텀시트 AUTO/Absolute 구분, Dialog Area의 중앙 정렬·안전영역 보정|
|대표전화 오류 Dialog|최종320px Dialog·Item Group·16/8/4/20 간격, 번호 SemiBold16/primary/링크 없음, 펼친 자세히보기|
|컴포넌트|실제 mainComponent key, 명시한 최신 key·공개 옵션과 일치|
|더미 Image Area|편집 가능한 더미 라벨이 있는 영역의 native ratio2:1·원본 PNG/hash·CROP·패딩40/0/40/0·서체21/SemiBold/변수·빨강40%·흰색2px OUTSIDE·중앙 배치|
|CTA|BoxButton/TextButton의 Label 문구 가로 Hug·WIDTH_AND_HEIGHT|
|하단 약관·CTA|Footer 직계 ConsentFinal / StickyButton 존재, 실제 래퍼·인스턴스·순서, gap24, 좌우padding20, AUTO·Fill/Hug; 이름만 바꾸거나 ConsentGroup으로 대체한 경우 차단|
|숫자 입력 원형|business-num/cellphone의 Numeric md Text Style·실제 SemiBold·다섯 typography alias, 확대 모드 보존|
|필드 설명·약관 경계|FooterArea 내부 TextList 차단, 외부 InputField / TextList(Group)의12px·목록8px, Title / Page→ConsentGroup 동일 부모24 또는 분리 부모 실제 경계24|
|서체|실제 Text 단위 숫자/혼용 판정, 전화번호·날짜 구분자, 누락 폰트와 스타일/서체 변수 연결|
|레이어|실제 반복 그룹, Text/TextList 혼합, 구조에 맞는 부모명, 원형 내부 일괄 변경 방지|
|데이터 그룹 다음 박스|Title / DataList Group→Infobox(그룹)·Data Block(그룹)·Text Box(그룹)·Card/Surface(그룹)의 외부32px 및 토큰, 분리 Container의 실제 경계|
|간격|InputField Group24, Radio/Checkbox 그룹 제목8·세로8/가로16, Section16/바텀시트 텍스트12, Tab→Infobox / Card16, Image Area 후24 등 코드에 명시된 조합과 토큰|
|기획별 요구|contract에 명시한 원문·component key·공개 옵션·배치 속성·추가 Fill·gap|

모든 MD 문장이나 모든 조합을 자동 판정하는 도구는 아니다. 기획 원문과 실제 컴포넌트 선택의 타당성, 아이콘 의미, 임의 override가 향후 variant 전환에 미치는 영향, 잘림·겹침·위계·자연 줄바꿈은 직접 원본/시각/전환 검수가 필요하다. 실제 폰트 누락은 원칙적으로 오류다. 다만2026-11-11 사용자 확정에 따라 확인된 원형 iOS StatusBar 내부의 SF Pro Text Semibold 누락만 완료 차단에서 제외한다. 본문·숫자·AppBar·다른 서체 누락은 계속 차단한다. 숫자·기호만인 정적 장식은 문자/숫자 서체 자동 판정에서 제외한다. 검사기는 임의로 레이어를 이동하거나 원본을 수정하지 않는다.

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

페이지 Container 검사는 BODY 직계뿐 아니라 기존 구조용 FRAME 래퍼 아래까지 순서대로 탐색한다. 페이지 Container를 만나면 그 하위 탐색을 멈추며 INSTANCE 안에는 진입하지 않는다. `Contents` 아래 Container와 BODY 직계 Container가 함께 있어도 실제 첫·마지막을 기준으로 판정한다. 네이티브 StepIndicator 내부의 동명 Container는 페이지 여백 편집 대상이 아니다.

`checks`에 `{path:["## BODY"],kind:"children",value:["Container 1","Container 2"]}`와 각 Container의 실제 직계 자식 이름 목록을 추가한다. 보이는 일반 흐름 자식의 수·이름·순서를 검사해 병합·중간 래퍼 추가를 차단한다. 원래 구조는 자동 추정하지 않으므로 수정 전 계층 또는 사용자 복원 지시를 계약으로 제공한다.

승인된 전폭/자체 인셋과 기본20 판정이 다를 때만 `containerInsetOverrides:[{path:["## BODY","Container 2"],value:0,reason:"2067:2030 승인: native Tab2 내부20·본문350 중앙/자체인셋 보존"}]`로 실제 경로를 명시한다. 값0/20·비어 있지 않은 근거·BODY 직계 Container만 허용한다. 다른 패딩/토큰·서체·구조 검사는 유지하며 실제 중복 인셋 여부는 직접 확인한다. 이 예외를 임의 병합이나 오류 숨김에 사용하지 않는다.

### Feedback·상단 아이콘 상단40

첫 보이는 일반 흐름 경로의 실제 Feedback·IconContainer·status-*는 첫 Container 상단40px와 spacing/6xl을 검사한다. 이름만으로 알 수 없는 ImageContainer 아이콘 사례는 기획·원형 확인 후 `{firstContainerRole:"top-icon"}` 또는 feedback으로 명시할 수 있다. 일반24·최초 StepIndicator/1depth Tab0·두 번째 이후 상0·BODY padding0·단일·복수 모두 마지막하32를 적용한다. 사진이나 뒤쪽 아이콘은 자동으로40을 적용하지 않는다. 아이콘 의미·렌더는 직접 확인한다.

### 키패드·패턴 Popup Body

실제 Popup > Slot > Body와 같은 Popup 안의 Keypad·Pattern·Centerinput / Pattern 인스턴스를 식별하면 본문 padding0·Container 시작 UI별 상24/40/0·좌우20·단일·복수 모두 마지막하32 및 토큰을 검사한다. PDF·다른 Popup Body에는 이 분기를 적용하지 않는다. 승인5054:2599처럼 Body0/첫 Container24를 따르고 겉보기 위치가 같은 Body24/Container0도 실패 처리한다. 원문·입력 상태·원형 내부 패딩·전체 높이·실제 경계는 직접 대조한다.

### 단일 Container 하단

화면이844px 이내여도 단일 Container의 paddingBottom32와 spacing/5xl 연결을 검사한다. 콘텐츠가844px을 초과해도 동일하다. 종전 단일0·변수 해제 검사는 철회한다. 시작 UI별 상단24/40/0와 좌우 인셋은 유지한다. 복수이면 마지막만하32·spacing/5xl을 검사한다. 일반 BODY와 키패드/패턴 Popup Body에 적용하며 Container 병합이나 native 내부 패딩 변경의 근거가 아니다.

### 입력 화면 교정 기준 (2026-11-04)

`knowledge/input-field-corrections.json`은 삭제 가능한 교정 화면의 독립 명세다. 숫자 입력은 `src/input-numeric.mjs` helper에 import한 최신 숫자 스타일을 전달해 적용하며, 스타일 적용 후 fontName/Bold를 다시 덮어쓰지 않는다. 실제 사업자번호·휴대폰 값 Text는 기본 Numeric md SemiBold 및 다섯 변수 연결을 검사하고, 구분자만 있는 Text는 native 스타일을 보존한다. 동적 확대 모드를16px로 고정하지 않는다. 필드 설명 TextList는 FooterArea 밖12px이며 전체 InputField Group 뒤 일반 TextList24px와 구분한다. 제목/약관이 분리된 Container에 있으면 absoluteBoundingBox로 실제 간격을 측정하므로 Container의 gap 값만 보고 통과시키지 않는다. 검사는 조회 전용이며 Container 병합·기획 값 변경을 자동 수행하지 않는다.

### 기존 조회 컨트롤 Sorting Group 지원 (2026-11-05)

상세 MD의 기존 Sorting Group 규칙을 공통 검사에도 적용한다. 실제 native SegmentedControl → InputField → BoxButton의 세 자식 순서, Vertical·Fill/Hug·AUTO 및 gap12·spacing/lg를 검사한다. 이 정확한 조합에서만 Sorting Group 명칭을 허용하며, 이름만 바꾸거나 임의 Segment/Chip 조합의 검사를 우회하지 않는다.

### 기존 CheckBox·구분선 입력 조합 판정 보완 (2026-11-05)

Checkbox Group과 기존 CheckBox Group 표기는 실제 native CheckBox·동명 래퍼의 반복으로 판정한다. 2026-11-05 교체 규칙에 따라 제목→그룹8px, 세로8px·가로16px(Grid 행8·열16)와 해당 필드의 토큰을 검사한다. native 이름을 바꾸지 않는다. 두 InputField 섹션 사이에 실제 Divider / Horizontal이 있는 세 요소 조합은 기존 복합 명명 공식에 따라 InputField / Contents·gap24로 검사하며, 동종 항목만 담는 InputField Group으로 오판하지 않는다. 다른 구성에는 이 예외를 적용하지 않는다.

## 가로 선택 그룹과 제목 아이콘 조합 교정(2026-11-05)

- 기존 MD의 `Title / Section` 우측 버튼 조합은 `Title / IconButton` Horizontal에서8px·spacing/md로 검사한다. 일반 Section 후속16px와 구분한다.
- `Checkbox Group`/`CheckBox Group`을 Horizontal·WRAP으로 바꿀 때 가로 Fill·세로 Hug를 다시 설정한다. 방향 변경으로 가로 Hug가 되어 뒤 항목이 화면 밖으로 펼쳐지는 상태는 `CHECKBOX_WRAP_LAYOUT` 오류다. 항목 개수·실제 줄바꿈·잘림은 화면으로도 확인한다.

### Checkbox·Radio 배치 간격 교체 (2026-11-05)

일반 선택 그룹은 Vertical itemSpacing8, Horizontal itemSpacing16, Horizontal·WRAP의 counterAxisSpacing8, Grid gridRowGap8/gridColumnGap16 및 각 spacing/md·xl 연결을 검사한다. Grid의 비활성 itemSpacing은 판정하지 않는다. Title / Element→선택 그룹8px 예외를 일반 제목16px보다 우선하며 native 내부·약관 depth·CheckSub에는 확대 적용하지 않는다. 독립 폼 단위24px는 실제 경로의 contract.checks로 지정한다.

### 선택 바텀시트 기본 선택·48px Fixed 복원 (2026-11-09)

일반 선택 List는 체크 유무 모두 높이48px·세로Fixed(`SHEET_LIST_FIXED48`)를 검사한다. 기획에서 명시한 선택이 있으면 contract의 `sheetListSelectedIndices`에0-based 인덱스 배열로 지정한다(첫 번째=[0], 첫째·셋째=[0,2], 명시적 미선택=[]). 지정이 없으면 두 번째 List(인덱스1)를 기본 선택하며 hasSuffix와 노출된 Item / Suffix checkMark를 검사한다. 안내 List도 실제 노출 순서에 포함한다. 항목 하나뿐이면 임의 선택하지 않는다. 이동형 pageIndicator 목록은 이 검사에서 제외하며 도움말·이동형 전용 패턴은 확인 후 `sheetListPattern:"navigation"`으로 명시한다. 이 분기는 일반 선택 목록의 오류를 우회하기 위한 용도가 아니다. 문구·구분선·아이콘·기획의 선택 지정 여부와 시각적 외형은 직접 대조한다.

### Card Slot 구조 보존 및 Group-C DataList (2026-11-09)

편집 가능한 Card / Surface 내부의 노출 DataList는 실제 `Card / Body / Group-C(variant:dataList) > Slot` 아래인지 자동 검사한다(`CARD_DATALIST_GROUP_C`). Card 밖 Data Block·Text Box와 숨겨진 미사용 원형은 이 검사를 적용하지 않는다. immutable 상위 컴포넌트 내부를 검사 통과용으로 detach하지 않는다.

삭제·재명명·재부모화·순서 변경 방지는 `contract.cardSlotBaselines`에 편집 전 원형 Slot의 구조를 기록해 검사한다(`CARD_SLOT_STRUCTURE`). 각 원소는 `{path:[실제 Card Slot까지의 이름 경로],children:[{name,type,children?:[...]},...]}`다. FRAME·SLOT은 숨김 포함 재귀 기록하고 native INSTANCE는 이름·타입까지 기록한다. 동명 Group도 개수대로 배열에 남긴다. 검사는 숨긴 노드도 존재 여부를 확인하므로 visible=false는 허용하고, 삭제·누락·다른 부모 이동은 차단한다. 콘텐츠 추가는 허용하며 원형 구조의 존재와 상대 순서를 보존한다. 새로운 파일·variant마다 실제 원형에서 기준을 수집하고, 기준이 없는 스냅샷만으로 과거 삭제 여부를 판정했다고 말하지 않는다. 기획별 노출·폰트·시각 결과는 직접 확인한다.


### 방향 변경·시스템바·어노테이션 검사 (2026-11-11)

- `TITLE_BUTTON_SIZING`: 편집 가능한 `Title / TextButton` 가로 래퍼의 Fill/Hug를 검사한다. `CONTENT_WRAPPER_HEIGHT`: 편집 가능한 Horizontal 콘텐츠 래퍼에서 보이는 AUTO 자식이 부모의 실제 y/height 경계를 넘는지 검사한다. native 내부·숨김·Absolute 장식은 제외하며 모든 디자인의 겹침을 자동 판정하는 검사는 아니다.
- `SYSTEM_BAR_OS`: 존재하는 StatusBar의 `variant:iOS / mode:light`, HomeIndicator의 `os:iOS` 공개 속성을 검사한다. 사용자에게 Android 작업 지시를 받은 경우에만 `contract.systemBarOS:"Android"`를 명시한다(StatusBar Android, HomeIndicator AOS). 폰트 오류를 우회하기 위한 옵션이 아니다. 사용자 확정 SF Pro Text Semibold 예외는 별도 폰트 설치·재로딩 없이 원형을 유지한다. native 높이/안전영역·외형은 직접 확인한다. 시스템바 자체의 필수 존재는 해당 화면의 경로 계약으로 검사한다.
- `UNREVIEWED_ANNOTATION`: collector가 `annotations`를 수집하며 보이는 노드의 미확인 주석을 차단한다. 업무상 필요한 기존 주석은 `contract.annotationAllowlist:[{path:[실제 이름 경로],labels:[정확한 labelMarkdown 또는 label],reason:"유지 근거"}]`로 특정한다. 경로·내용이 바뀌면 다시 확인하며 주석 전체를 포괄 허용하지 않는다. 숨김 노드의 주석·유입 출처는 별도 대조한다. 검사는 주석을 자동 삭제하지 않는다.
- 알려드립니다의 대응 승인 Prefix 크기·Slot/Title Area 패딩 등은 실제 경로의 `contract.checks`와 직접 대조로 확인한다. 위 자동 검사와 기존 공통 검사 통과만으로 승인 템플릿 전체 일치·원문·시각 검수가 완료됐다고 보고하지 않는다.


### iOS StatusBar 원형 폰트 경고 예외 (2026-11-11 사용자 확정)

`knowledge/screen-rules.json.nativeStatusBarFontException`의 원본 component key·iOS/light 공개 속성·실제 Text segment의 SF Pro Text/Semibold가 함께 일치할 때만 `MISSING_FONT` 차단을 제외하고 `accepted-native-status-font` 근거를 남긴다. 이 한 건은 화면 완료를 막지 않는다. 이름만 StatusBar인 수동/다른 원형, 본문·숫자·AppBar 텍스트, 다른 폰트/스타일, 확인할 segment가 없는 경우는 기존 누락 폰트 검사를 유지한다. 원형 폰트 교체·OS 변경·시스템 폰트 업로드를 요구하지 않는다. 해당 화면의 다른 필수 검사는 유지한다.
