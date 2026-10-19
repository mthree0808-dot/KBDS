# UI Design & Code Generation Rules

이 문서는 Figma 와이어프레임을 바탕으로 일관된 UI 화면을 생성할 때 참조하는 디자인 가이드라인입니다.

## 1. Reference Sources (디자인 시스템)

### 사용자 승인 갱신 (2026-10-19): Tab 후속 간격과 조회 내역
- **Tab 후속 일반 콘텐츠 간격과 계층**: 1depth·2depth·3depth Tab 다음에 Infobox / Card, 입력, 목록, Data Block 등 일반 콘텐츠가 이어지면 **gap 24px (`spacing/3xl`)**을 적용합니다. 이 구간은 아래 BODY 기본 gap 32px보다 우선합니다. 같은 콘텐츠 블록은 하나의 `Container [순번]` 안에 구성하며, 간격을 맞추기 위해 각 요소를 별도 Container로 감싼 뒤 외부 복합 래퍼에 넣지 않습니다. 패딩이나 빈 프레임으로 간격을 대신하지 않습니다. 별도 명시된 특수 Feedback 패턴은 해당 규칙을 따릅니다.
- **Tab + Infobox / Card 필수 구조 (2026-10-19 사용자 교정)**: `## BODY > Container 1 > Tab, Infobox / Card`로 구성합니다. `Tab`과 `Infobox / Card`는 **Container 1의 직계 자식**이며 Container 1의 Vertical Auto Layout gap에 `spacing/3xl`=24px를 연결합니다. `Tab / Infobox > Container 1, Container 2` 구조와, Tab·Infobox를 각각 Container로 감싸는 구조는 금지합니다. 이 규칙은 아래 일반 복합 그룹 네이밍 공식보다 우선합니다. Tab은 화면 폭을 채우고, Infobox / Card는 좌우 20px 여백이 남는 콘텐츠 폭으로 가운데 정렬합니다. 다음 독립 본문 블록은 형제 `Container 2`부터 순차 명명합니다.
- **건별 조회 내역의 Data Block 매핑**: 고객명·이용기관·이용서비스·인증완료처럼 한 건을 구성하는 사실 데이터는 와이어프레임의 평면 DataList Group·상하 Divider 형태를 그대로 복제하지 않고 **건별 Data Block**으로 치환합니다. 문구·값·순서·건수는 보존합니다. 일반 수평 DataList의 Divider 규칙보다 이 매핑을 우선하며, 완료 화면의 별도 Feedback·데이터 구조는 유지합니다.
- **승인 참조**: [아웃라인 Data Block](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=4-979), [회색 무테 Data Block](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=4-994). 두 링크는 스타일 대안이며, 반복 건마다 서로 다른 스타일을 강제하지 않습니다.
- **구조와 토큰**: Vertical Auto Layout, padding 20px (`spacing/2xl`), radius 20px (`radius/2xl`), Title↔DataList Group gap 16px (`spacing/xl`), 목록 내부 gap 12px (`spacing/lg`). 각 DataList는 `layout: split`, `size: 14`, `hasDivider: false`를 적용합니다. 아웃라인은 `surface/neutral/quaternary-muted` + `border/neutral/secondary-muted` + `stroke/md`, 회색 무테는 `surface/neutral/tertiary-muted` + `strokes: []`를 사용합니다.
- **기획에 없는 요소**: 제목이 없으면 참조의 Title을 숨기고 빈 공간이나 임의 제목을 추가하지 않습니다. 기획에 없는 툴팁·아이콘도 숨깁니다. 복수 건은 `Data Block Group` 안에 모두 `Data Block`이라는 동일한 레이어명으로 열거하고 gap 12px (`spacing/lg`)를 적용합니다.

- **Design System URL**: `https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/MO-%EB%94%94%EC%9E%90%EC%9D%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC?m=auto&node-id=0-1&t=k9nL7yLI1W2gR3hE-1`
- **컴포넌트 원형 보존 및 타이포그래피 우선순위 원칙 (CRITICAL)**:
  - 디자인 시스템에 등록된 **컴포넌트 명칭은 절대로 변경하지 않습니다** (예: `Consent / 계열사 정보제공`, `CheckBox / 휴대폰번호` 등 한글 명칭이나 임의의 수식어를 덧붙여 컴포넌트명을 변형하는 행위 절대 금지).
  - 와이어프레임과 컴포넌트를 매핑하는 과정에서 **`Title / Page`**, **`Title / Section`**, **`Title / Element`** 등의 타이틀 컴포넌트를 매핑할 때, **와이어프레임 상에서 볼드(Bold) 등으로 임의 표기되어 있더라도 이를 개별 수정하지 말고 디자인 시스템 컴포넌트에 사전 정의된 원형 폰트 스타일/Weight를 최우선으로 유지**하여 적용합니다.
  - 가이드라인에 명시된 `DataList (layout: split, size: 14, hasDivider: false)`, `size: medium`, `variant: standard`, `os: iOS` 등의 속성은 Figma 컴포넌트 우측 패널의 **Component Properties(컴포넌트 속성)**를 의미하므로 정확히 일치시켜 적용합니다.
  - 임의의 신규 스타일을 정의하기 전에 디자인 시스템에 일치하는 컴포넌트가 있는지 먼저 확인하고 매핑합니다.
- **텍스트 스타일·변수 연결 보존 (2026-10-19 사용자 교정, CRITICAL)**:
  - 일반 본문과 문장 내 강조 구간 모두 원본 KBDS Text Style의 key로 스타일을 연결합니다. 변수의 이름·key와 alias 연결을 보존하며, 동일 이름의 새 변수나 고정 수치로 대체하지 않습니다.
  - 강조는 동일 크기 계열의 원본 Medium Text Style을 해당 구간에 적용합니다. 예: 일반 본문 `Dynamic/Body/md∙16∙Light`, Face ID·지문 강조 구간 `Dynamic/Body/md∙16∙Medium`. `fontName`, `fontWeight` 또는 크기·행간·자간을 직접 덮어써 Text Style과 변수 연결을 끊지 않습니다. 혼합 스타일을 적용할 때는 구간별 Text Style 적용 API(예: `setRangeTextStyleIdAsync`)를 사용합니다.
  - 변경 전 현재 구간의 서체를 로드하고, 변경 후 모든 구간의 style key와 `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing` 변수 alias를 원본 스타일과 대조합니다. 텍스트 색상 변수도 유지합니다. 화면에 같은 서체로 보이더라도 스타일·변수 연결이 누락된 구간은 검수 실패입니다.
- **HomeIndicator 속성 규칙**:
  - `## FOOTER` 및 바텀시트/Dialog/Popup 최하단에 배치되는 `HomeIndicator` 컴포넌트는 우측 패널의 Component Property **`os: iOS`**를 필수로 선택하여 적용합니다.
- **SelectButton 타입 규칙**:
  - 간결한 항목들을 다룰 경우: Property **`word`** 타입 적용
  - 그렇지 않은 일반/문장형 항목인 경우: Property **`sentence`** 타입 적용
- **텍스트 강조 및 Color Token 세부 규칙**:
  - 텍스트에 강조색(긍정, 부정, 단순 강조 등)을 적용할 때, 기본적으로 **동일 폰트 크기 계열 내 `medium` 타입의 텍스트 스타일/변수**를 적용합니다.
  - **테이블 내 예외 규칙 (CRITICAL)**: **`Table / Cell`에 들어가는 텍스트는 시맨틱(의미형)/비시맨틱(단순 강조) 특정 컬러를 적용하더라도 폰트의 Weight를 `medium`으로 변경하지 않고, 원형 그대로 `light`를 유지합니다.**
  - **시맨틱 상태 강조**:
    - 긍정: **`text/status/positive`**
    - 부정: **`text/status/negative`**
  - **단순 텍스트 강조 (비시맨틱)**:
    - 단순 파란색 강조: **`text/accent/blue`**
    - 단순 빨간색 강조: **`text/accent/red`**
    - 단순 검정색 강조: **`text/neutral/primary`**
- **인라인 링크 텍스트 스타일 (TextList / Unordered 및 일반 텍스트 공통)**:
  - 문장 중간에 링크 처리되는 부분을 표기할 경우:
    - **Color Token**: `text/neutral/secondary`
    - **Typography**: 동일 폰트 계열 내 `bold`로 정의된 Text Style 적용
    - **Type Settings**:
      - `Decoration`: **Underline** 체크
      - `Underline Details > Offset`: **`25%`** 설정
- **텍스트 버튼(TextButton) 및 아이콘 조합 규칙**:
  - 바로가기 버튼을 제외하고, 아이콘과 버튼이 조합될 경우 `TextButton`의 **`hasPrefix: True`**로 설정하고 버튼의 명칭/역할과 매핑되는 아이콘을 적용합니다.
  - 아이콘이 들어가지 않되 버튼으로 쓰여야 하는 경우: **`hasPrefix: False`**, **`hasSuffix: False`**, **`underline: True`** 설정
- **InputField 필수/선택 표기 규칙 (`Title / Element`)**:
  - `InputField` 레이블 상단 `Title / Element` 컴포넌트 적용 시:
    - **속성 설정**: Property `optional: true` 설정
    - **선택 표기**: 기획서상 선택 항목인 경우 텍스트를 그대로 `"선택"`으로 유지
    - **필수 표기 (* 표기 항목)**: 기획서상 `*`로 표기된 필수 항목인 경우:
      - 표기 텍스트: `*` 대신 **`(필수)`**로 표기
      - 텍스트 폰트 크기/스타일: **`3xs`** 스케일, Font Weight: **`medium`**
      - Color Token: **`text/accent`** 컬러 변수 적용
- **InputField 자체 하단 안내/힌트 문구 규칙 (`hasFooter`)**:
  - `InputField`에 붙는 부연 설명이나 안내 문구 중, 불릿 리스트 형태가 아닌 단순 일반 문장 형태인 경우:
    - `InputField`의 Property **`hasFooter: True`** 설정
    - 하위 계층인 **`Item / Footer / hint`**에 해당 안내 텍스트를 적용

---

## 2. Screen Frame & Base Structure (아트보드 규격 및 기본 구조)

### A. 아트보드(화면 프레임) 네이밍 및 배경 규칙
- **아트보드 네이밍**: 기획서 와이어프레임 내 페이지 ID가 공란이므로, 기획서 상의 중괄호(`{ ... }`)로 표기된 화면 명칭을 확인하여 다음 규칙으로 명명합니다.
  - **네이밍 포맷**: `화면ID_[화면을 나타내는 명칭]`
  - *(예: 기획서에 `{한글잔액증명서_발급신청}`으로 표기된 경우 -> `화면ID_한글잔액증명서_발급신청`)*
- **바텀시트, Dialog, Full Popup 아트보드 Background**: 바텀시트, Dialog, 풀팝업 화면 프레임 자체의 Background는 반드시 **`background/neutral/white`** 변수를 적용합니다.

### B. 일반 페이지 기본 규격 및 Resizing
- **규격**: 가로 `390px`, 기본 세로 `844px`
- **Auto Layout**: Flow 속성은 **Vertical (세로 방향)** 적용
- **스크롤/콘텐츠 양에 따른 Resizing 규칙**:
  - **콘텐츠가 세로 844px 내에서 소화되는 경우**:
    - 아트보드 높이: `844px` 고정 (Fixed: 844)
    - `## BODY` 영역 높이: **Fill**
  - **콘텐츠가 세로 844px를 초과하는 경우**:
    - `## BODY` 영역 높이: **Hug**
    - 아트보드 세로 Resizing: 콘텐츠 길이에 맞춰 가변 대응하도록 **Hug** 적용

### C. 일반 페이지 최상위 레이어 그룹핑 구조
화면 프레임 바로 아래의 루트 레이어는 반드시 다음 3가지 영역으로 그룹핑하며, 세 영역 모두 **Auto Layout (Flow: Vertical)**을 적용합니다.

1. **`## HEADER`**:
   - 내부 필수 컴포넌트: `StatusBar`, `AppBar` 순차 배치
2. **`## BODY`**:
   - 실질적인 화면 콘텐츠(Container, Container 1, Container 2 등)가 위치하는 메인 영역
   - **Auto Layout 속성 (기본 및 예외)**: Flow: **Vertical**, **`gap: 32px` (`5xl` 토큰)**
     - **컴포넌트 조합 간격 우선 적용**: `StepIndicator` 직후 및 `Infobox / Solid` 다음 `InputField` 사이에는 **`gap: 24px` (`3xl` 토큰)**을 적용합니다. 각 컴포넌트를 감싼 `Container` 또는 `Container [순번]` 사이에도 동일하게 적용하며, 해당 구간에서는 기본 `gap: 32px`보다 우선합니다. (상세 규칙: 섹션 3 및 7-C)
     - **링크 리스트 전용 화면 예외**: 링크 리스트만 열거되는 화면의 경우 `## BODY`의 간격을 Auto Layout **`gap: 0px`**로 적용합니다.
   - **상하 패딩 규칙**:
     - 기본: **`padding-top: 24px` (`3xl` 토큰)**, **`padding-bottom: 32px` (`5xl` 토큰)** 적용
     - **완료 화면 예외**: 상단 Feedback과 후속 데이터 그룹이 있는 완료 화면은 **`padding: 40px 20px 32px`** (상단 `spacing/6xl`, 좌우 `spacing/2xl`, 하단 `spacing/5xl`), Container 간 **`gap: 40px` (`spacing/6xl`)**을 적용합니다. 상세 구조는 섹션 7의 완료 화면 규칙을 따릅니다.
     - **최상단 요소에 따른 `padding-top: 0` 예외**: `StepIndicator`, `Tab (variant: 1depth)`, `InputField (item/input: searchIcon)`, **헤더 직후 Tab 등과 맞닿는 피드백 화면의 `Tab`**이 `## BODY` 최상단에 올 경우 **`padding-top: 0px`**으로 설정합니다.
     - **단독 피드백 화면 `padding-top: 40px` 예외**: Feedback 위 상단에 헤더만 존재하는 단독 피드백 화면의 경우 `## BODY`의 **`padding-top: 40px` (`6xl` 토큰)**을 적용합니다.
     - **Infobox / FullWidth 최상단 배치 예외**: `Infobox / FullWidth`가 `## BODY` 최상단에 올 경우 `## BODY`의 패딩을 **`padding: 0 0 32px`**로 설정하고, 직후 간격은 Auto Layout **`gap: 24px` (`3xl`)**을 적용하며, 하단에 배치되는 콘텐츠들은 `Container [순번]`에서 **`padding: 0 20px`**을 적용합니다.
     - **링크 리스트 열거 화면 예외**: 링크 리스트 패턴이 적용되는 화면의 경우 **`padding-top: 16px` (`xl` 토큰)** 적용
   - **좌우 패딩 규칙 (Full-Width 요소 존재 여부에 따른 분기)**:
     - **Full-Width 요소(`Accordion`, `알려드립니다`, `Divider / Horizontal`, `Tab` 직후 피드백, `Infobox / FullWidth`, 링크 리스트 등)가 `## BODY`에 포함되는 경우**:
       - `## BODY`의 **`padding-left: 0px`, `padding-right: 0px`** 설정
       - Full-Width 요소를 제외하고 크게 그룹핑되는 **`Container [순번]`들에 `padding-left: 20px` (`2xl`), `padding-right: 20px` (`2xl`)**을 적용 (단, 링크 리스트의 각 Container는 자체 지정 패딩을 따름)
     - **Full-Width 요소가 없는 일반 화면인 경우**:
       - `## BODY`의 **`padding-left: 20px` (`2xl`), `padding-right: 20px` (`2xl`)** 기본 적용
       - 개별 `Container [순번]`의 좌우 패딩은 `0px`로 유지
     - **완료 화면의 데이터 그룹 내부 Divider 예외**: `Title` 안의 `Divider / Horizontal (length: full)`은 해당 350px 콘텐츠 영역을 채우는 구분선입니다. 이 Divider만을 이유로 `## BODY`의 좌우 패딩 20px를 0으로 바꾸지 않습니다.
   - **'알려드립니다' 컨테이너 분할 필수 원칙**: `## BODY` 내에 '알려드립니다'가 위치할 경우, 다른 상단 요소들과 결합하지 않고 반드시 독립된 **`Container [순번]`으로 그룹핑하여 분할**합니다.
   - 높이 속성은 위 콘텐츠 양 규칙(Fill 또는 Hug)을 준수
3. **`## FOOTER`**:
   - **하단 고정 버튼(StickyButton / CTA)이 없는 경우**: `HomeIndicator` (Property: **`os: iOS`**)만 배치
   - **하단 고정 버튼(StickyButton / CTA)이 있는 경우**: `StickyButton(CTA)` + `HomeIndicator` (Property: **`os: iOS`**) 순차 배치

### D. 바텀시트(Bottom Sheet) 화면 규격 및 구조
바텀시트로 기획된 화면 역시 가로 `390px`, 세로 `844px` 규격 및 오토레이아웃을 적용하며 아래 레이어 구조를 준수합니다.

- **최소 콘텐츠 바텀시트의 Slot 높이 (2026-10-19 사용자 교정)**: 본문이 짧아 원본 BottomSheet의 최소 높이가 적용되는 경우, **Slot의 세로 Resizing을 Fill**(`layoutSizingVertical: FILL`)로 설정합니다. 원본 minHeight와 바텀시트 높이는 유지하고 남는 높이를 Slot이 흡수하여 하단 버튼 뒤에 불필요한 여백이 남지 않도록 합니다. Slot 안의 Container·Text·텍스트 자체는 Hug를 유지합니다. 긴 콘텐츠의 기존 Hug·스크롤 패턴까지 일괄 Fill로 바꾸지 않습니다. 승인 예시는 [권유직원 등록](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=44-898)입니다.

- **아트보드 자체 Background**: **`background/neutral/white`**
- **레이어 계층 및 Position 구조**:
  1. **`Dimmed`**:
     - 사이즈: `390px * 844px` 사각형 (Rectangle)
     - Color Token: `background/overlay/dimmed` 변수 값 적용
     - 속성: **Position 설정(Absolute Position)하여 화면 전체에 띄움**
  2. **`BottomSheet` 컴포넌트**: 본문 바텀시트 UI 배치
  3. **`StatusBar`**:
     - 속성: `variant: iOS`, `mode: light`
     - 속성: **Position 설정(Absolute Position)하여 최상단에 띄움**
  4. **`HomeIndicator`**: Property **`os: iOS`** 적용, 최하단 배치
- **일반 선택형 바텀시트 (List Component 매핑 규칙)**:
  - **컴포넌트 계층**: `BottomSheet` > `Item / BottomSheet` > `Slot` 내부에 **`Container 1`**을 배치하고 그 안에 `List` 컴포넌트들을 열거합니다.
  - **오토레이아웃 간격 및 패딩**:
    - `List`들을 감싸는 `Container 1`의 Auto Layout **`gap: 8px` (`md` 토큰)**을 적용합니다.
    - `Container` 내에 삽입되는 `List` 컴포넌트 자체의 **좌우 패딩(padding-left, padding-right)은 `0px`**으로 설정합니다.
  - **체크 활성화 상태 (Active/Selected)**:
    - 체크가 활성화된 `List`는 `hasSuffix: True` 설정
    - 하위 계층: `Slot-Suffix` > `Item / Suffix`에서 `variant: checkMark` 적용
  - **데이터 매핑**: 기획서에 명시된 리스트 항목 텍스트를 `List` 컴포넌트에 순차적으로 1:1 매핑합니다.
- **계좌 선택 전용 바텀시트 화면 패턴**:
  - **BottomSheet Property**: **`hasScrollDim: True`** 설정
  - **컴포넌트 계층**: `BottomSheet` > `Slot` 내부를 **`Container`**로 감싸고 Auto Layout **`gap: 4px` (`xs` 토큰)** 설정
  - **List 내부 구조**:
    - `Slot-Prefix`: `Item / Prefix (variant: icon, size: 32)`, `IconContainer: icon` 항목을 기획서에 상응하는 은행명 아이콘으로 설정
    - `Middle`: `first` 내 폰트 스타일 유지, 상단 텍스트는 **통장명**, 하단 텍스트는 **`[은행명] 123456-04-123456`** 형식으로 기재 (Prefix 아이콘과 일치하는 은행명 반영)
    - `Slot-Suffix`: `Item / Suffix`에서 **`variant: checkMark`** 적용

### E. 다이얼로그(Dialog) 화면 규격 및 구조
Dialog 화면은 바텀시트와 동일한 레이어 구조를 가져가되, Dialog 컴포넌트의 위치 속성만 중앙으로 설정합니다.

- **아트보드 규격 및 Background**: 가로 `390px`, 세로 `844px`, Background는 **`background/neutral/white`** 적용
- **레이어 계층 및 Position 구조**:
  1. **`Dimmed`**:
     - 사이즈: `390px * 844px` 사각형 (Rectangle)
     - Color Token: `background/overlay/dimmed` 변수 값 적용
     - 속성: **Position 설정(Absolute Position)하여 화면 전체에 띄움**
  2. **`Dialog` 컴포넌트**:
     - **오토레이아웃 상 화면 정중앙(Center Alignment)에 위치**하도록 설정
  3. **`StatusBar`**:
     - 속성: `variant: iOS`, `mode: light`
     - 속성: **Position 설정(Absolute Position)하여 최상단에 띄움**
  4. **`HomeIndicator`**: Property **`os: iOS`** 적용, 최하단 배치

### F. 풀팝업(Full Popup) 화면 규격 및 구조
풀팝업으로 기획된 화면의 레이어 및 오토레이아웃 계층 구조입니다.
- **아트보드 Background**: **`background/neutral/white`**
- **레이어 계층 구조**:
  - `StatusBar` (Position 설정(Absolute)하여 최상단에 띄움)
  - `Popup`
    - `Slot`
      - `Header` (오토레이아웃) > 내부 필수: `AppBar`
      - `Body` (오토레이아웃) > 내부 필수: **`Container 1`**, **`Container 2`** 등 순차 열거
      - `Footer` (오토레이아웃) > 내부 필수: `HomeIndicator` (Property: **`os: iOS`**)

### G. 약관 상세 화면 (PDF 뷰어 화면) 전용 규격 및 구조
PDF 형태의 약관 내용을 출력하는 상세 화면의 표준 레이아웃 구조입니다.
- **아트보드 Background**: **`background/neutral/white`**
- **1. `## HEADER`**: `StatusBar`, `AppBar` 순차 배치
- **2. `## BODY`**:
  - **`Container 1`**:
    - Styling: `background-color: background/neutral/light-gray`, `padding: 12px 20px`
    - 내부 구조: **`Title / IconContainer Group`** (Auto Layout, `gap: 16px`, Alignment: **`align right`**)
      - 하위 좌측: **`Title`** (오토레이아웃 아님, 텍스트 스타일: **`xs･14･medium`**)
      - 하위 우측: **`IconContainer Group`** (Auto Layout, `gap: 16px`) > **`IconContainer`** (`size: 14`, 왼쪽부터 차례로 `icon: line-magnify`, `line-arrowDown`, `line-menu` 3개 배치)
  - **`Container 2`**:
    - Styling: `background-color: background/neutral/light-gray`, `padding: 12px`
    - 내부 구조:
      - **`Rectangle`**: `background-color: background/neutral/white`, `border-width: stroke/md`, `border-color: border/neutral/tertiary-muted`
      - **'pdf 약관 내용' 텍스트**: 텍스트 스타일: **`md･16･bold`**, Color: **`text/neutral/placeholder`**, 속성: **Position(Absolute Position) 설정 후 상하좌우 정중앙(Center Alignment)** 배치
- **3. `Pagination / Carousel` (Floating Position)**:
  - 위치: `## BODY` 바로 다음에 위치시키되, 우측 패널에서 **Position(Absolute Position)**으로 설정
  - 좌표: 화면상에서 `## FOOTER` 바로 위(**`Y: 686px`**)에 플로팅 배치
- **4. `## FOOTER`**:
  - **`StickyButton`**: Property `variant: white`, `hasCTA: True`, `hasScrollDim: True`, 하위 ButtonGroup 속성 `count: 1`
  - **`HomeIndicator`**: Property **`os: iOS`**

---

## 3. Figma Auto Layout & Naming Rules (피그마 오토레이아웃 및 네이밍)
- **기본 레이아웃 원칙**: `## BODY` 내부를 구성하는 모든 블록 요소는 기본적으로 **Auto Layout**을 적용합니다. (단, Infobox / FullWidth 등 자체 완결형 블록 제외)
- **단독 컴포넌트 Container 적용 및 기본 gap(10px) 제거 원칙**:
  - `StepIndicator`, `Tab` 등과 같이 단독으로 쓰이는 컴포넌트라 하더라도 독립 배치하지 않고 **`Container` (또는 `Container [순번]`)로 감싸서 적용**합니다.
  - 피그마에서 오토레이아웃 생성 시 기본으로 부여되는 **10px gap은 반드시 제거(0 또는 지정 토큰값으로 변경)**합니다.
- **간격 제어 원칙 (Padding 제어 배제 및 Gap 기반 제어)**:
  - 개별 `Container` 또는 `Container [순번]`에 적용되던 **`padding-top` 설정은 기본적으로 일체 배제(0 설정)**합니다. (단, Tab 직후 피드백 화면의 Container [순번] `padding-top: 40px`, 링크 리스트 Container, Infobox/FullWidth 하단 콘텐츠 패딩 제외)
  - 화면의 수직 간격 흐름은 **`## BODY`의 기본 `gap: 32px` (`5xl`)** (링크 리스트 전용 화면은 `gap: 0px`) 및 각 `Container` 내부 오토레이아웃의 **`gap` 속성**만으로 제어합니다.
  - **Infobox / Solid 다음 InputField 간격**: `Infobox / Solid` 바로 다음에 `InputField`가 위치할 경우, 두 요소 사이의 수직 간격은 Auto Layout **`gap: 24px` (`3xl` 토큰)**을 적용합니다. `InputField`가 `Container` 또는 `Container [순번]`으로 감싸져 있거나, 두 컴포넌트가 각각 Container로 감싸져 있어도 동일하게 적용합니다.
  - **StepIndicator 직후 간격**: `StepIndicator` 또는 이를 감싼 `Container` / `Container [순번]`과 바로 다음 UI(또는 이를 감싼 Container) 사이의 수직 간격은 Auto Layout **`gap: 24px` (`3xl` 토큰)**을 적용합니다.
  - **24px 간격 예외의 적용 우선순위**: 위 두 구간은 `## BODY`의 기본 `gap: 32px`보다 우선합니다. 해당 구간을 제어하는 부모 오토레이아웃의 `gap`에 `3xl` 토큰을 적용하고, 필요 시 해당 요소들을 별도 오토레이아웃으로 그룹핑하여 다른 구간의 간격을 유지합니다. `padding`, 빈 프레임 또는 음수 간격으로 대체하지 않습니다.
  - Container 좌우 패딩은 화면 내 Full-Width 요소(`Accordion`, `알려드립니다`, Full-Width `Divider / Horizontal` 등) 유무에 따른 규칙(섹션 2-C 참조)에 따릅니다.
- **Container 레이어 네이밍 (단일 컨텐츠 및 순차 부여 규칙)**:
  - **단일 컨텐츠인 경우**: 화면 내에 단 하나의 컨텐츠/블록만 존재하여 Container가 1개인 경우, 숫자 접미사 없이 **`Container`**로 단독 명명합니다.
  - **Slot 내부에도 동일 적용**: 바텀시트·Dialog·Popup 등의 개별 Slot 안에서 Container가 하나이면 **`Container`**로 명명합니다. 전체 파일의 다른 화면이나 다른 Slot의 Container 개수는 합산하지 않습니다. 해당 Slot에 Container가 복수인 경우에만 순번을 붙입니다.
  - **복수 컨텐츠인 경우**: 위에서 아래로 2개 이상의 블록이 배치될 경우, **`Container 1`**, **`Container 2`**, **`Container 3`**과 같이 숫자를 순차적으로 증가시켜 명명합니다.
  - **'알려드립니다' Container**: 화면 하단 '알려드립니다'는 반드시 별도의 **`Container [순번]`**으로 독립 그룹핑합니다.

---

### 레이어 계층 구조 및 네이밍 체계 (Layer Naming Hierarchy)
레이어 명, 그룹 명에는 **어떠한 경우에도 한글을 사용하지 않고 반드시 직관적인 영문**으로만 정의합니다. 컴포넌트 원형 고유 명칭은 절대 변경하지 않되, 오토레이아웃 그룹핑 시 아래의 명명 공식을 엄격히 준수합니다.

#### 1. 복합 컴포넌트 그룹핑 네이밍 공식
아래 공식은 필요한 내부 복합 그룹에 적용하며, 페이지 `Container [순번]`를 외부 복합 래퍼로 감싸는 근거가 아닙니다. Tab + Infobox / Card는 앞서 정의한 하나의 Container 안에 두 컴포넌트를 직계 자식으로 두는 구조를 우선합니다.

컴포넌트명이 `Title / Page`와 같이 슬래시(`/`)를 포함하는 경우, 오토레이아웃 레이어명을 조합할 때는 **슬래시 앞단의 대표 명칭(`Title`)만 사용**합니다.
- **2개 요소 결합형**: `[컴포넌트/그룹 1 앞단] / [컴포넌트/그룹 2 앞단]`
  - *(예: `Title / Page`와 `InputField` 결합 시 -> **`Title / InputField`**)*
- **3개 이상 요소 결합형 (세 덩이 이상 형성 시)**: `[첫 번째 컴포넌트/그룹 앞단] / Contents`
  - *(예 1: `Title / Page` + `InputField` + `Accordion` 결합 시 -> **`Title / Contents`**)*
  - *(예 2: `Title / Text` + `Title / Text` 열거 결합 시 -> **`Title / Contents`**)*

#### 2. 단수 및 복수 컴포넌트 오토레이아웃 네이밍
- **복수 컴포넌트 열거 시**: 동일 컴포넌트들이 반복 열거되어 오토레이아웃으로 묶일 때는 컴포넌트명 뒤에 **`Group`**을 붙입니다.
  - 예시: `InputField Group` (복수의 InputField), `Accordion Group` (복수의 Accordion), `Radio Group` (복수의 Radio), `TextList Group`, `Table Group`, `Account Group`, `Consent Group`, `Card Group`, `Data Block Group` 등
- **Group 내부 반복 자식의 레이어명 (2026-10-19 사용자 승인)**: `[레이어명] Group` 안에 반복되는 자식은 모두 원래 레이어명을 사용하며 숫자 순번을 붙이지 않습니다. 예를 들어 `Data Block Group`의 자식은 모두 `Data Block`, `Text Box Group`의 자식은 모두 `Text Box`, `InputField Group`의 자식은 모두 `InputField`로 명명합니다. `Container 1`, `Container 2`처럼 별도로 정의된 페이지 Container 순번 규칙은 예외로 유지하며, 컴포넌트 원형 명칭도 유지합니다.
- **단수 컴포넌트 래핑 시**: 화면 최상단 `StepIndicator`나 하단 `알려드립니다` 등의 영향으로 Full-Width 화면에서 단일 컴포넌트에 좌우 `padding: 0 20px` 등을 부여하기 위해 불가피하게 오토레이아웃으로 감싸는 경우, `Group`을 붙이지 않고 해당 **`[컴포넌트명]` 단독**으로 명명합니다.
  - 예시: 단일 InputField를 감쌀 경우 -> **`InputField`**, 단일 Accordion을 감쌀 경우 -> **`Accordion`**

#### 3. 버튼 영역 오토레이아웃 규칙 (`Button Area`)
- `## BODY` 영역 내에서 `BoxButton`, `Pagination / Basic` (더보기) 또는 기타 일반 버튼 컴포넌트가 배치될 경우:
  - 오토레이아웃 프레임명: **`Button Area`**
  - 간격: Auto Layout **`gap: 0px`** 지정
  - 정렬: 기획서 와이어프레임에 따라 **`align center`** 또는 **`align right`**로 정렬 속성 설정

#### 4. 체크박스 및 라디오 컴포넌트 규칙
- **CheckBox**: 항상 오토레이아웃 프레임 **`CheckBox`** (Auto Layout **`gap: 0px`**)로 감쌉니다. (종속 하위 항목은 **`CheckSub`** 유지)
- **Radio**: **`Radio` 컴포넌트는 개별 오토레이아웃으로 감싸지 않고 컴포넌트 원형 그대로 열거**하며, 이들을 감싸는 상위 **`Radio Group`의 내부 간격은 Auto Layout `gap: 20px` (`2xl` 토큰)**을 적용합니다.

#### 5. 타이틀과 일반 텍스트 결합 규칙
- **일반 텍스트 공통 래핑 (2026-10-19 사용자 교정)**: 타이틀과의 결합 여부와 관계없이, Slot·Container에 배치하는 일반 본문은 **`Text`**라는 Vertical Auto Layout 프레임으로 감쌉니다. gap과 padding은 0, 가로 Fill·세로 Hug로 설정하고 내부 텍스트도 가로 Fill·세로 Hug 및 자동 높이로 구성합니다. 바텀시트의 단일 본문 블록은 **`Slot > Container > Text > Content`** 구조를 적용합니다. `Content`는 편집 가능한 텍스트 레이어이며, 일반 텍스트를 Container의 직계 자식으로 두지 않습니다. 기존 DS 컴포넌트 내부의 원형 계층과 불릿 TextList 사용 규칙은 유지합니다.
- `Title / Section` 또는 `Title / Element`와 일반 텍스트(Description 등)가 결합될 때:
  - 텍스트를 단독으로 두지 않고, 반드시 **`Text` (Auto Layout `gap: 0px`)**라는 오토레이아웃 프레임으로 감싸서 계층을 구성합니다.
- **일반 본문 내 `Title / Section` + 단일 TextList 결합 예외 (CRITICAL)**:
  - 일반 본문에서 계층(Hierarchy)을 정의하는 도중 **`Title / Section` 바로 다음에 단일 항목의 `TextList / Unordered`가 올 경우, 불릿을 임의로 제거하거나 일반 텍스트로 치환하지 않고 불릿이 유지된 디자인 시스템 컴포넌트 `TextList / Unordered`를 그대로 정의**하여 사용합니다.

---

- **타이틀 관련 레이아웃 규칙**:
  - **Title / Page 직후 Description 노출 시**: `Title / Page` 하위 레이어 중 **`Description`** 레이어의 가시성(눈 아이콘)을 활성화하여 사용합니다.
  - **Title / Section 우측에 버튼이 위치할 때**: 두 요소를 오토레이아웃으로 그룹핑하고 레이어명을 **`Container Title`** (Flow: **`horizontal`**, Auto Layout **`gap: 8px` (`md`)**, Alignment: **`align left`**)로 설정합니다.
- **조회 컨트롤 및 Sorting Group 패턴**:
  - `SegmentedControl (조회기간)` + `InputField` + `BoxButton (size: medium, variant: secondary)`이 함께 그룹핑될 때:
    - 오토레이아웃 레이어명: **`Sorting Group`**
    - 간격: Auto Layout **`gap: 12px` (`lg` 토큰)** 적용
- **안내 문구 컴포넌트 분기 매핑 규칙**:
  - **Card / Surface 다음에 안내성 문구가 노출될 때**: **`Infobox / Basic`** 컴포넌트로 매핑하여 배치합니다.
  - **입력 폼(InputField, SelectButton 등)에서 안내 문구가 노출될 때**: **`Infobox / Solid`** 컴포넌트로 매핑하여 배치합니다.
  - **InputField, SelectButton 등 밑에 Infobox / Card가 위치할 때**: 두 요소 사이 간격은 Auto Layout **`gap: 20px` (`2xl` 토큰)**을 적용합니다.
  - **Infobox / Card 내부 단일 항목 텍스트 규칙**: 항목이 단 1개인 경우, 기획서상 불릿으로 표기되어 있더라도 불릿을 제거한 일반 텍스트로 삽입하며, 타이포그래피 스타일은 **`Dynamic/Body/xs∙14∙Light`**, 컬러는 **`text/neutral/tertiary`**를 적용합니다.
- **입력 폼 항목 추가 버튼 패턴**:
  - 입력 폼 형태에서 사용자가 항목을 추가할 수 있는 구조인 경우, 마지막 입력 항목 바로 아래에 `Button Area` 또는 **`BoxButton (variant: tertiary, size: medium)`**을 배치하고, 위 항목과의 간격은 Auto Layout **`gap: 24px` (`3xl` 토큰)**을 적용합니다.
- **체크박스 아이템 및 서브 항목 패턴 (CheckBox & CheckSub)**:
  - `CheckBox`는 항상 **`CheckBox`** (Auto Layout **`gap: 0px`**) 프레임으로 감쌉니다.
  - 체크박스 선택 시 펼쳐지는 하위 종속 항목들은 **`CheckSub`** 오토레이아웃으로 감싸고:
    - 간격 및 패딩: Auto Layout **`gap: 20px` (`2xl` 토큰)**, **`padding: 16px 0 12px`**
    - **마지막 CheckBox 내의 CheckSub**: **`padding: 16px 0 0`** 적용
- **Table 구조 및 TextList 연계 규칙 (Table Pattern)**:
  - **계층 구조**: **`Table Group`** > **`Slot-Body`** > **`Grid`**
  - **`Table Group` 속성**:
    - 오토레이아웃 프레임으로 묶음
    - Flow: **`vertical`**
    - 간격: Auto Layout **`gap: 1px` (`3xs` 토큰)** 적용
  - **`Slot-Body` 속성**:
    - 오토레이아웃 프레임으로 세팅
    - Styling: **`border-top: stroke/md`**, Border Color: **`border/neutral/quaternary`**
    - 내부의 `Grid` 오토레이아웃 프레임을 감싸는 Wrapper 레이어로 동작합니다.
  - **`Grid` 속성 및 레이아웃 분기**:
    - 오토레이아웃 프레임으로 세팅
    - Flow: **`grid`**
    - Grid Column 설정: 와이어프레임 구조를 참조하여 **`2*auto`**, **`3*auto`**, 또는 **`4*auto`**로 가변 적용합니다.
  - **Thead (헤더 셀) 컴포넌트 매핑 규칙**:
    - 기본 헤더 셀: **`Table / Header` (variant: `default`)**
    - 우측 맨 마지막 헤더 셀: **`Table / Header` (variant: `last`)**
  - **Tbody (본문 셀) 컴포넌트 및 타이포그래피 규칙**:
    - 행 타이틀 셀: 행의 타이틀 성격인 경우 헤더 컴포넌트 규칙을 준용하거나 시스템에 정의된 타이틀 셀을 매핑
    - 타이틀이 아닌 일반 본문 셀: **`Table / Cell` (variant: `default`)**
    - 행의 우측 맨 마지막 본문 셀: **`Table / Cell` (variant: `last`)**
    - **Table Cell 텍스트 컬러 및 Weight 규칙 (CRITICAL)**: **`Table / Cell` 내 텍스트에 특정 컬러(상태 의미색 또는 단순 강조색 무관)를 적용할 때, 폰트의 Weight는 `medium`으로 변경하지 않고 반드시 `light` 스타일을 유지합니다.**
  - **Table 하단 부속 텍스트 리스트 (`TextList / Unordered`) 연계 규칙**:
    - 단일 리스트인 경우: `Table Group` 내부에 `Slot-Body` 다음 형제 요소로 **`TextList / Unordered`** 배치
    - 복수 리스트인 경우: 리스트들을 **`TextList Group`** (Auto Layout **`gap: 8px` (`md` 토큰)**)으로 그룹핑하여 `Slot-Body` 다음 형제 요소로 배치

---

### 박스 UI 역할 및 스타일 선택 규칙 (Box UI Rules)
박스는 외형이 아닌 **사용자 동작과 콘텐츠의 주된 목적**으로 분류합니다. 먼저 역할을 정한 뒤 아웃라인 또는 회색 배경 스타일을 선택합니다. 배경·테두리를 바꿔도 역할과 레이어 명칭은 바뀌지 않습니다.

|역할|사용 방식|대표 예시|
|---|---|---|
|동작·선택|디자인 시스템의 `Card / Surface` 인스턴스|이체, 상세 이동, 상품·계좌·항목 선택, 체크·라디오 선택|
|사실 데이터 표시|직접 구성한 Auto Layout 프레임 `Data Block`|이름, 전화번호, 부모님 기본정보, 거래내역, 계좌정보, 금액|
|설명·안내·주의·상태 전달|직접 구성한 Auto Layout 프레임 `Text Box`|이용 안내, 유의사항, 한국어 상담센터 안내 등 기존 Infobox로 정의되지 않은 안내 박스|

기존 `Infobox / Basic`, `Infobox / Solid`, `Infobox / Card`, `Infobox / FullWidth`의 용도에 해당하면 해당 컴포넌트와 전용 규칙을 우선 적용합니다. `Text Box`를 이유로 기존 Infobox를 일괄 대체하지 않습니다.

#### 1. 액션 포함형 카드: `Card / Surface`
- **적용 조건**: 박스 내부에 **이체·상세 이동 버튼, 체크박스·라디오 등 선택 요소가 있거나 박스 전체가 이동·선택의 동작 대상**인 경우 사용합니다. 푸터 버튼 유무만으로 판단하지 않습니다. 상품 선택, 계좌 선택, 항목 선택 등이 이에 해당합니다.
- **동작의 경계**: `Data Block` 바깥의 형제 `Button Area`에 수정 버튼 등이 있어도 박스 자체가 동작하지 않으면 `Data Block`을 유지합니다. 데이터 표시만 하는 박스에 임의의 이동·선택 동작을 추가하여 Card로 바꾸지 않습니다.
- **푸터 버튼형 계층 구조 예시** (선택·상세 이동형은 해당 원본 variant/공개 속성 및 Slot 구조를 따르며 불필요한 Footer를 추가하지 않음):
  1. **`Header`**: 상단에 위치하며, 기획/필요에 따라 **`badge`** 노출
  2. **`Body`**:
     - 하위 요소들을 감싸는 **`Groups`** 오토레이아웃 프레임 생성 (**Auto Layout `gap: 16px`**)
     - `Groups` 내부 첫 번째 요소: **`Group`** 오토레이아웃 프레임 내에 **`Card / Body / Group-A` (variant: `titleMedium`)** 배치
     - `Groups` 내부 두 번째 요소: **`Group`** 오토레이아웃 프레임 (Flow: **`vertical`**, Auto Layout **`gap: 12px`**) 생성 후, 하위에 **`Card / Body / Group-C` (variant: `textList`)**를 1개 또는 그 이상 순차 배치
  3. **`Footer`**: `Body` 하단에 위치하며 **`Card / Footer / Button` (variant: `buttonGroup`)** 배치
- **데이터 상태 값 노출형 (Status Value Pattern)**:
  - 상태 값이나 Label이 있다는 이유만으로 `Card / Surface`를 사용하지 않습니다. 아래 Card 패턴은 실제 동작이 함께 있을 때만 적용하며, 동작 없는 사실 데이터는 `Data Block`, 설명·안내 중심 상태 메시지는 `Text Box`로 분류합니다.
  1. `Card / Surface` > `Body` 내부의 **`Groups`** 속성을 Flow: **`horizontal`**, Alignment: **`align left`**로 설정
  2. `Groups` 내부 좌측: **`Group`** 오토레이아웃 (Auto Layout **`gap: 4px`**) 내에 **`Card / Body / Group-A` (variant: `titleMedium`)** 및 **`Card / Body / Group-A` (variant: `Description`)** 수직 배치
  3. `Groups` 내부 우측: **`Label / Default`** (variant: `tint`) 배치 (긍정 `blue`, 부정 `red`, 중립 `darkGray`)
  4. 좌측 `Group`과 우측 `Label / Default` 사이 간격은 Auto Layout **`gap: 16px` (`xl` 토큰)** 적용

#### 2. 액션 미포함 정보성 카드: `Data Block` (타이틀 + DataList UI)
- **적용 조건**: 내부 동작 없이 이름·전화번호·거래내역·계좌정보·금액 등 **사실 데이터를 보여주는 UI**인 경우, `Card / Surface`를 사용하지 않고 직접 오토레이아웃 프레임으로 구성합니다. 타이틀과 DataList가 대표 구조이며, 정보의 성격에 맞는 원본 텍스트·컴포넌트 조합도 허용합니다.
- **최상위 프레임 Spec 및 레이어 네이밍**:
  - 레이어 명칭: 단일·복수 모두 **`Data Block`**. 복수는 **`Data Block Group`**으로 묶고, 내부 자식은 모두 **`Data Block`**으로 명명하며 순번을 붙이지 않습니다.
  - Layout: Auto Layout, Flow: **`vertical`**, **`gap: 16px` (`xl` 토큰)**
  - 기본 아웃라인 Styling: **`border: stroke/md`**, Border Color: **`border/neutral/secondary-muted`**, Fill: **`surface/neutral/quaternary-muted`**, **`border-radius: 20px` (`radius/2xl`)**, **`padding: 20px` (`spacing/2xl`)**. 아래 스타일 선택 기준에 따라 회색 배경·무테 형태도 허용합니다.
  - **승인 예시의 간격 차이**: 아래 부모님 기본정보 예시(`2659:18577`)는 타이틀과 `DataList Group` 사이가 **`20px` (`spacing/2xl`)**입니다. 이 패턴을 재사용할 때는 20px를 적용하며, 기존 기본 16px 규칙을 모든 Data Block에서 일괄 변경하지 않습니다.
- **내부 계층 구조**:
  1. **타이틀 영역**:
     - 텍스트 Spec: Font Size: **`font-size/body/md`**, Color: **`text/neutral/primary`**
     - 오토레이아웃 프레임으로 감싸고 레이어 명칭은 **`Title`**로 설정
  2. **DataList 영역**:
     - 개별 컴포넌트: **`DataList (layout: split, size: 14, hasDivider: false)`**
     - 복수의 `DataList`들을 단일 오토레이아웃 프레임으로 한 번 감쌈
     - 래핑 프레임 레이어명: **`DataList Group`**, 간격: Auto Layout **`gap: 12px` (`lg` 토큰)** 적용

#### 3. 설명·안내형 박스: `Text Box`
- **적용 조건**: 데이터의 조회·대조보다 설명, 이용 안내, 주의, 상태 전달이 주목적이며 기존 Infobox 용도에 해당하지 않는 박스입니다. 한국어 상담센터처럼 전화번호·이메일이 포함되어도 안내 문맥이 주목적이면 `Text Box`로 분류합니다. 단순 연락처 텍스트의 존재를 버튼이나 선택 동작으로 간주하지 않습니다.
- **구성**: `Card / Surface`를 사용하거나 분리(detach)하지 않고 Auto Layout 프레임으로 직접 만듭니다. 레이어명은 단일·복수 모두 `Text Box`이며, 반복 목록은 `Text Box Group`으로 묶고 내부 자식에 순번을 붙이지 않습니다.
- **참조 예시의 기본 구조**: Flow `vertical`, 패딩 **20px (`spacing/2xl`)**, 내부 간격 **16px (`spacing/xl`)**, 라운드 **14px (`radius/lg`)**. 필요에 따라 원본 `Title / Section`, `TextList / Unordered`, `Divider / Horizontal` 등을 조합합니다. Data Block의 DataList 구조나 20px 라운드를 일괄 적용하지 않습니다.

#### 4. 아웃라인 / 회색 배경 스타일의 선택
- **아웃라인형**: 독립된 정보 영역의 경계를 명확히 구분할 때 사용합니다. 직접 만드는 `Data Block` / `Text Box`의 참조 스타일은 Fill **`surface/neutral/quaternary-muted`**, Border **`stroke/md` + `border/neutral/secondary-muted`**입니다.
- **회색 배경·무테형**: Fill **`surface/neutral/tertiary-muted`**, **외곽 border 제거(`strokes: []`)**로 적용합니다. 같은 화면에 아웃라인 박스가 이어지거나 박스 안에 박스가 놓여 경계선이 중첩되는 경우, 보조 설명·안내 영역을 부드럽게 구분할 때 우선 고려합니다. 내부 콘텐츠 구분용 Divider까지 일괄 제거한다는 뜻은 아닙니다.
- **선택 재량**: 고정된 한 형태를 모든 화면에 적용하지 않습니다. 주변 박스의 테두리 반복, 주·보조 정보 위계, 콘텐츠 밀도와 구분 필요성을 보고 두 형태를 유연하게 선택합니다. 중첩을 줄이되 서로 다른 영역의 구분과 가독성은 유지합니다. 선택은 매번 사용자 승인 없이 진행할 수 있으며 적용 이유를 작업의 기존 검수 기록에 간단히 남깁니다.
- **유지할 것**: 역할명, 콘텐츠·동작, 원본 서체·컴포넌트, 역할별 패딩·라운드·간격과 연결된 DS 토큰은 유지합니다. 색상·간격·스타일·컴포넌트를 새로 만들지 않습니다. `Card / Surface`는 원본 variant/공개 속성이 지원하는 범위에서 스타일을 선택하며 임의 재구성하거나 detach하지 않습니다.
- **네이밍 적용 범위**: 페이지 레이아웃용 `Container [순번]`과 콘텐츠 박스인 `Data Block` / `Text Box`는 별개입니다. 페이지 Container 규칙 때문에 콘텐츠 박스 이름을 Container로 바꾸거나 박스 자체의 20px 내부 패딩을 제거하지 않습니다.

#### 5. 사용자 승인 Figma 예시 (2026-10-15 확인)
- [동작형 Card / Surface — 계좌 선택·이체](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2659-18345): 박스 `2659:18395`, `2661:26306`.
- [정보 표시형 Data Block — 부모님 기본정보](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2659-18558): 박스 `2659:18577`; 외부 수정 버튼은 형제 `Button Area`에 위치합니다.
- [아웃라인형 Text Box — 한국어 상담센터](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2659-18992): 박스 `2659:19033`.
- [회색 배경·무테형 Text Box — 아웃라인 Data Block과 함께 배치](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2659-19168): 박스 `2659:19188`; Fill `surface/neutral/tertiary-muted`, `strokes: []`.

---

- **컴포넌트별 조합 및 레이아웃 규칙**:
  - **SelectButton 조합 패턴**:
    - `SelectButton`이 `hasTitle: True` 외에 `Title / Section` (Slot에서 Description이 노출되는 경우)과 함께 쓰일 때 둘 사이 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
  - **Title / Section 조합 패턴**:
    - `Title / Section`과 `Infobox / Card`가 조합될 시 둘 사이 Auto Layout **`gap: 16px` (`xl` 토큰)** 적용
  - **Infobox / Card 조합 패턴**:
    - `Infobox / Card`와 단수 또는 복수의 `TextList`가 조합될 시 둘 사이 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용
  - **Input & TextList 조합 패턴**:
    - **InputField Group 다음 일반 TextList 노출**: `InputField Group`과 `TextList`를 그룹핑하고 둘 사이 간격은 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
    - **특정 InputField의 부가설명 성격 TextList**: 불릿 리스트 형태로 추가 설명이 들어갈 때는 해당 `InputField`와 `TextList`를 별도로 묶어 그룹핑하고 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용
    - *(참고: 불릿이 아닌 단순 문장형 부연 설명은 `InputField` 내부의 `hasFooter: True` 및 `Item / Footer / hint`를 사용합니다.)*
  - **TextList (size: 14, depth: 1) 상호 결합 패턴**:
    - `TextList (size: 14, depth: 1)` 및 `TextList` 컴포넌트들이 오토레이아웃으로 함께 묶일 때 내부 Auto Layout **`gap: 8px` (`md` 토큰)** 적용
  - **Title / Element + Radio Group / CheckBox Group 조합 패턴**:
    - **Title / Element와 Radio Group 사이 간격**: Auto Layout **`gap: 16px` (`xl` 토큰)** 적용
    - **Radio Group 내부 구조**: `Radio` 컴포넌트는 오토레이아웃으로 감싸지 않고 원형 그대로 열거하며, 내부 간격은 Auto Layout **`gap: 20px` (`2xl` 토큰)** 적용
    - **CheckBox 그리드 레이아웃**:
      - Flow: **`grid`** (기획서에 따라 `3*1`, `2*auto` 등 설정)
      - 간격: **`gap between columns: 16px` (`xl`)**, **`gap between rows: 20px` (`2xl`)** 적용
    - **항목 텍스트가 긴 경우 (Vertical 형태)**:
      - 항목 텍스트 길이가 길어 grid 배치가 곤란한 경우 `Group`의 Flow 속성을 **`vertical`**로 설정하고 Auto Layout **`gap: 20px` (`2xl` 토큰)** 적용
  - **일반 화면 계좌 선택 패턴**:
    - 상단에 타이틀이나 탭이 배치되고 하단에 계좌 선택 리스트가 위치할 때, 계좌 항목들을 **`Account Group`**으로 그룹핑하여 `Container [순번]` 내에 배치하고 Auto Layout **`gap: 4px` (`xs` 토큰)** 적용
    - `List` 내부 Spec: 바텀시트 계좌 선택과 동일하게 `Slot-Prefix`의 `Item / Prefix (size: 32)`로 설정하되, `Slot-Suffix`의 `Item / Suffix`는 **`variant: checkBox`**로 적용
    - **`Title / Page` -> `Tab` -> `Container [순번]` (은행 선택 항목) 구조인 경우**: 요소 간 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
  - **Title / Page 조합 패턴**:
    - **Title / Page + Infobox / Solid**: Property **`size: medium`** 적용 후 오토레이아웃 그룹핑, Auto Layout **`gap: 16px` (`xl` 토큰)** 적용
    - **Title / Page + Infobox / Card**: 최상단 배치 시 둘 사이 Auto Layout **`gap: 16px` (`xl` 토큰)** 적용
    - **Title / Page + Image Area + 후속 콘텐츠 흐름 (2026-10-19 사용자 교정)**:
      1. `Title / Page`와 `Image Area`는 같은 `Container [순번]`의 직계 자식으로 배치하고 **gap 0px**을 적용합니다. 이미지 앞에 별도 Container나 여백을 추가하지 않습니다.
      2. `Image Area`는 [승인 참조 10580:10543](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=10580-10543)를 따릅니다. Vertical Auto Layout, 가로 Fill·세로 Hug, 내부 gap 0, **padding 40px 0 (`spacing/6xl`)**입니다. 내부 `ImageContainer`는 **ratio 2:1 / 가로 Fill / 세로 Fixed**이며 콘텐츠 폭 350px일 때 **350×175px**, 전체 Image Area는 **350×255px**입니다. 임의의 96×96 정사각형으로 축소하지 않습니다. 실제 이미지는 별도 요청 없이 추가하지 않습니다.
      3. `Image Area` 다음에 `ProgressStep`, `Infobox / Card` 등 콘텐츠가 이어지면 종류와 무관하게 **gap 24px (`spacing/3xl`)**을 적용합니다. 내부 패딩 40px와 외부 후속 gap 24px를 구분합니다.
      4. `ProgressStep` 다음에 `Infobox / Card`가 올 경우 둘 사이 **gap 24px (`spacing/3xl`)**을 유지합니다.
    - **Title / Page + InputField + Card / Surface**: 세 요소를 오토레이아웃으로 그룹핑하고 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
    - **Title / Section + InputField 조합**:
      1. `InputField`들을 먼저 오토레이아웃으로 묶어 **`InputField Group`**으로 명명하고 **`gap: 24px` (`3xl` 토큰)** 적용
      2. `Title / Section`과 `InputField Group`을 오토레이아웃으로 그룹핑하여 **`Title / InputField`**로 명명하고 **`gap: 16px` (`xl` 토큰)** 적용
  - **InputField 연속 배치**: 단일 오토레이아웃 프레임(`InputField Group`)으로 묶고, 내부 간격은 Auto Layout **`gap: 24px` (`3xl` 토큰)**을 적용합니다.
  - **Card / Surface 또는 Data Block 연속 배치**:
    - 카드들이 열거될 경우 각각 **`Card Group`** 또는 **`Data Block Group`**으로 그룹핑하고 내부 간격은 Auto Layout **`gap: 12px` (`lg` 토큰)**을 적용합니다.
    - **더보기 버튼 연계**: `Card Group` 또는 `Data Block Group` 바로 다음에 더보기 컴포넌트(`Pagination / Basic`)가 위치할 경우, 더보기 컴포넌트를 **`Button Area`**로 감싸고, 그룹과 `Button Area` 사이의 간격은 Auto Layout **`gap: 20px` (`2xl` 토큰)**을 적용합니다.
  - **List 컴포넌트 패딩 예외**:
    - `List` 컴포넌트가 `Container` 내부로 들어올 때, `List` 자체에 기본 설정되어 있는 **좌우 패딩(padding-left, padding-right) 값은 `0px`로 재설정**합니다.
  - **일반 본문 TextList 연속 배치**:
    - `Infobox / Card`, `Card`, 알려드립니다 외부의 일반 본문에 쓰이는 `TextList`가 여러 개 열거될 경우, 오토레이아웃으로 그룹핑하고 **기본 `gap: 12px` (`lg` 토큰)**을 적용합니다.
  - **Form 내 Accordion 배치**: 폼 형태로 열거되는 도중 위치하는 `Accordion`은 오토레이아웃을 적용하여 `Container [순번]`으로 명명합니다. (복수 열거 시 `Accordion Group`)
  - **하단 "알려드립니다" 공통 패턴 및 상태 규칙**:
    - `Container` 또는 `Container [순번]` 내부에 `Divider / Horizontal (thickness: 10px, variant: tertiary, length: full)`을 상단에 배치하고, 그 바로 아래에 `Accordion (type: basic, variant: standard, size: medium, hasDivider: false)` 컴포넌트를 순서대로 배치합니다.
    - **독립 컨테이너 분할 필수**: '알려드립니다'는 다른 본문 요소와 합치지 않고 반드시 **독립된 `Container [순번]`으로 그룹핑하여 분할**합니다.
    - **펼침 상태(Open State) 반영**: 와이어프레임 상에서 '알려드립니다'가 펼쳐져 있는 구조인 경우, **실제 펼쳐진(Open/Expanded) 상태로 화면에 렌더링**합니다.
    - **내부 Divider 숨김**: 알려드립니다 내부에 위치하는 Accordion은 **`hasDivider: false`를 적용하며, Accordion 내부의 divider는 항상 숨김(비노출)** 처리합니다.
    - **오토레이아웃 해제 및 속성**: `Accordion`을 별도의 오토레이아웃 프레임으로 다시 감싸지 않고(오토레이아웃 해제/단일 컴포넌트 직접 배치), `Accordion` 컴포넌트 자체의 수평 크기는 **`width: fill`**로 설정합니다.
    - 이 Container의 Auto Layout **`gap: 0px`**을 적용합니다.

---

## 4. 약관 화면 전용 패턴 (Consent Layout Rules)

### A. 계층별 오토레이아웃 및 컴포넌트 규칙
- **Depth 1 (약관 타이틀 항목)**:
  - `Title / Page` 다음에 위치하는 최상위 약관 타이틀
  - 컴포넌트 Spec: `Consent` (`size: large`, `variant: solid`, 기획서에 따라 `hasArrow: true/false`, `Item / Arrow: down, up, right` 선택 적용, 컴포넌트 원형 이름 변경 금지)
  - 오토레이아웃 프레임명: **`Depth 1`**
  - **복수 열거 시**: `Depth 1` 항목들이 여러 개 열거될 때는 `Container`로 묶고 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용
- **Depth 2 (하위 약관 항목)**:
  - `Depth 1`의 직속 하위 항목들
  - 컴포넌트 Spec: `Consent` (`size: large`, `variant: basic`, 컴포넌트 원형 이름 변경 금지)
  - 오토레이아웃 프레임명: **`Depth 2`**, Auto Layout **`gap: 0px`**
  - **상위-하위 간격**: `Depth 1`과 `Depth 2` 사이 간격은 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용
- **Depth 3 (세부 하위 뎁스)**:
  - `Depth 2` 내부의 `Consent (size: large, variant: basic)` 아래에 위치하는 항목
  - 컴포넌트 Spec: `Consent` (`size: medium`, `variant: basic`, 컴포넌트 원형 이름 변경 금지)
  - 오토레이아웃 프레임명: **`Depth 3`**
  - 패딩 및 간격: **`padding: 4px 20px 12px`**, Auto Layout **`gap: 0px`**
- **Depth 3 내 소타이틀 + Depth 4 결합 패턴 (`Outline Container`)**:
  - `Depth 3` 내에서 작은 타이틀과 세부 선택 요소들이 결합될 때:
    1. 전체를 **`Consent Area`** 오토레이아웃으로 감싸고 **`padding-left: 20px` (`2xl` 토큰)** 적용
    2. `Consent Area` 내부에 **`Outline Container`** 오토레이아웃 프레임 생성:
       - Styling: `background: background/neutral/elevated`, `border: border/neutral/secondary-muted`, `border-radius: radius/xl`, `padding: 16px` (`xl` 토큰)
       - Layout: `width: fill`, `height: hug`, Flow: `vertical`
       - **Auto Layout Gap**: **기본 `gap: 16px` (`xl` 토큰)** 적용
    3. `Outline Container` 내부에 **`Item / TextArea`**를 소타이틀로 배치하고, 하위에 **`Depth 4`** 오토레이아웃 배치
    4. **소타이틀 + Depth 4 조합이 복수 열거될 때**: 각 조합 사이에 **`Divider / Horizontal (thickness: 1px, variant: tertiary, length: full)`**을 삽입하여 구분
  - **Depth 4 내부 체크 항목 형태에 따른 분기**:
    - **짧은 체크 항목 (문자, 이메일, 전화, 우편 등)**:
      - 오토레이아웃 프레임명: **`Group`**
      - Flow 속성: **`grid`**, Grid 구조: **`2*2`**
      - 소타이틀과 `Group` 사이 간격: Auto Layout **`gap: 8px` (`md` 토큰)**
    - **긴 텍스트 체크 항목 (고유식별정보 수집 이용 동의 등)**:
      - `Group` 프레임을 생성하지 않음
      - Flow 속성: **`vertical`**, Auto Layout **`gap: 0px`**
      - 소타이틀과 항목 간격: Auto Layout **`gap: 8px` (`md` 토큰)**

---

## 5. 피드백 / Empty State 화면 전용 패턴 (Feedback Layout Rules)
'조회할 계좌가 없습니다', '내역이 없습니다' 등 데이터 부재 및 상태 피드백 화면의 오토레이아웃 규칙입니다.

### A. 화면 유형별 배치 및 간격 규칙
1. **단독 피드백 화면 (헤더 직후 피드백만 노출되는 경우)**:
   - 컴포넌트 Spec: `Feedback (variant: medium)`
   - 계층 구조: `## BODY` > **`Container [순번]`** 내부에 `Feedback` 배치
   - **`## BODY` 패딩**: **`padding-top: 40px` (`6xl` 토큰)** 적용 (상단에 헤더만 존재하는 경우)
   - **`Container [순번]` 패딩**: **`padding: 24px 0` (`3xl` 토큰)** 적용
2. **헤더 직후 Tab 등과 맞닿는 피드백 화면 (Tab 직후 피드백)**:
   - 컴포넌트 Spec: `Feedback (variant: medium)`
   - **`## BODY` 패딩**: **`padding-top: 0px`**, 좌우 패딩은 **`0px`** 설정
   - 계층 구조: `Tab` 바로 다음에 오는 `Feedback` 영역은 **`Container [순번]`**으로 감싸고, 그 내부에 **`Feedback`**이라는 오토레이아웃 프레임을 한 번 더 생성하여 컴포넌트를 배치
   - **`Container [순번]` 패딩**: **`padding-top: 40px` (`6xl` 토큰)** 적용
   - **내부 `Feedback` 오토레이아웃 프레임 패딩**: **`padding: 24px 0` (`3xl` 토큰)** 적용
3. **Tab + Infobox FullWidth + InputField + Feedback 흐름**:
   - 상위 구조: `Tab`과 `Infobox / FullWidth`를 단일 **`Container`**로 감쌈
   - 이 Container와 하위 `InputField` 간격: Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
   - `InputField`와 하단 피드백 영역 간격: Auto Layout **`gap: 32px` (`5xl` 토큰)** 적용
   - **피드백 계층 및 패딩**: `Feedback (variant: small)`을 사용하며, **`Feedback`** 오토레이아웃 프레임으로 한 번 더 감싸고 **`padding: 24px 0` (`3xl` 토큰)** 적용
4. **Infobox FullWidth + Group + Feedback 흐름**:
   - 구조: `Container [순번] (Infobox / FullWidth)` -> `Container [순번] (Group)` -> `Feedback (Feedback)` 구조
   - 직전 Container와 `Feedback` 사이 간격: Auto Layout **`gap: 32px` (`5xl` 토큰)** 적용
   - 컴포넌트 Spec: `Feedback (variant: small)`을 사용하며, **`Feedback`** 오토레이아웃 프레임으로 감싸고 **`padding: 24px 0` (`3xl` 토큰)** 적용
5. **Card / Surface + Filter Group + Feedback 흐름**:
   - 상위 구조: `Container [순번] (Card / Surface)` + `Container [순번] (Filter Group + Feedback)`
   - **Filter Group 내부 구조**:
     - `Divider / Horizontal (thickness: 10px)` + `Filter Area (Filter)` 조합
     - `Filter Area`의 패딩: **`padding: 0 20px`**
     - `Filter Group` 내부 간격: Auto Layout **`gap: 0px`**
   - `Filter Group`과 `Feedback (Feedback)` 프레임 간격: Auto Layout **`gap: 16px` (`xl` 토큰)** 적용
   - **Filter Group이 없는 경우**: 부모격인 `Container [순번]`의 Auto Layout **`gap: 0px`** 적용
6. **카드 형태 피드백 (Card Feedback)**:
   - 데이터가 없을 때 카드로 노출되어야 하는 경우:
   - `Container [순번]` 내에 **`Card`** 오토레이아웃 프레임을 생성하고 내부에 `Feedback` 배치
   - **Card 프레임 Spec**:
     - `padding: 48px 0` (`7xl` 토큰)
     - `border-radius: 16px` (`radius/xl`)
     - `border: 1px`, `border-color: border/neutral/secondary-muted`
     - `background: background/neutral/white`

---

## 6. 링크 리스트 화면 전용 패턴 (Link List Layout Rules)
화면 내에 링크 리스트들이 그룹화되어 열거되는 화면의 오토레이아웃 및 패딩 규칙입니다.

### A. Body 패딩 및 간격 기본 규칙
- 링크 리스트가 열거되는 화면의 `## BODY`는 상단 패딩을 **`padding-top: 16px` (`xl` 토큰)**으로 적용합니다.
- **`## BODY` 내부 간격**: 링크 리스트만 열거되는 화면의 경우 `## BODY`의 간격은 Auto Layout **`gap: 0px`**을 적용합니다.
- `## BODY`의 좌우 패딩은 Full-Width Divider 등이 포함되므로 **`0px`**로 설정합니다.

### B. 단일 기본 원형 구조
- `Container [순번]` 내부에 **`List`** 오토레이아웃 프레임을 배치:
  - 프레임 속성: Auto Layout **`gap: 16px` (`xl` 토큰)**, **`padding: 20px 20px 16px`**
- **`List` 프레임 내부 구조**:
  1. 상단에 **`Title / Section`** 배치
  2. 하단에 **`List Group`** 오토레이아웃 프레임 (Auto Layout **`gap: 4px` (`xs` 토큰)**) 배치
  3. `List Group` 내부에 **`List`** 컴포넌트들을 순차 배치하고, 각 `List` 컴포넌트 사이마다 **`Divider / Horizontal (thickness: 1px, variant: tertiary, length: full)`**을 삽입
  4. **마지막 `List` 컴포넌트 하단에는 Divider를 생략**

### C. 복수 열거(누적) 시 Container별 패딩 및 Divider 규칙
링크 리스트 블록이 2개 이상 누적되어 쌓일 때의 순서별 규칙입니다.
- **첫 번째 `Container 1`**:
  - 내부 `List` 프레임 속성: Auto Layout **`gap: 16px` (`xl`)**, **`padding: 0px 20px 16px`**
- **두 번째 및 중간 `Container [순번]`**:
  - `Container [순번]` 자체 속성: Auto Layout **`gap: 0px`**
  - 상단에 **`Divider / Horizontal (thickness: 10px, variant: tertiary, length: full)`** 배치
  - 그 아래에 `List` 프레임 배치: Auto Layout **`gap: 16px` (`xl`)**, **`padding: 20px 20px 16px`**
- **마지막 `Container [순번]`**:
  - 상단에 **`Divider / Horizontal (thickness: 10px, variant: tertiary, length: full)`** 배치
  - 그 아래에 `List` 프레임 배치: Auto Layout **`gap: 16px` (`xl`)**, **`padding: 20px 20px 0px`**

---

## 7. Spacing Tokens & Layout Rules

### A. Spacing Token Reference (피그마 토큰 매핑 기준)
디자인 시스템에 정의된 기본 간격 스케일입니다. 간격 적용 시 임의의 픽셀 수치를 직접 하드코딩하지 말고, 반드시 아래 표의 Token 이름으로 매핑하여 피그마 오토레이아웃(Auto Layout) 및 코드에 적용하세요. (단, 0px 간격은 별도 토큰 없이 간격 0으로 처리합니다.)

| Token | Value |
| --- | --- |
| `3xs` | 1px |
| `2xs` | 2px |
| `xs` | 4px |
| `sm` | 6px |
| `md` | 8px |
| `lg` | 12px |
| `xl` | 16px |
| `2xl` | 20px |
| `3xl` | 24px |
| `4xl` | 28px |
| `5xl` | 32px |
| `6xl` | 40px |
| `7xl` | 48px |
| `8xl` | 80px |

---

### B. ## BODY 기본 간격 구조
- **`## BODY` 기본 패딩**: `padding-top: 24px` (`3xl`), `padding-bottom: 32px` (`5xl`)
- **완료 화면 우선 규칙**: 상단 Feedback + 후속 데이터 그룹 패턴은 **`padding: 40px 20px 32px`**, **`gap: 40px` (`spacing/6xl`)**을 적용합니다. 그룹 내부의 `length: full` Divider는 BODY 좌우 패딩을 제거하는 Full-Width 요소로 취급하지 않습니다.
- **`## BODY` padding-top 예외**:
  - `StepIndicator`, `Tab (variant: 1depth)`, `InputField (item/input: searchIcon)`, 헤더 직후 `Tab` 배치 시: **`0px`**
  - 단독 피드백 화면 (헤더 바로 다음 피드백만 위치): **`40px` (`6xl`)**
  - `Infobox / FullWidth` 최상단 배치 시: **`padding: 0 0 32px`**
  - 링크 리스트 화면 패턴 적용 시: **`16px` (`xl`)**
- **`## BODY` padding-left, padding-right 제어**:
  - **Full-Width 요소(`Accordion`, `알려드립니다`, `Divider / Horizontal`, `Tab` 직후 피드백, `Infobox / FullWidth`, 링크 리스트 등) 포함 시**: **`0px`**
  - **일반 화면**: **`20px` (`2xl`)**
- **`## BODY` 내부 컴포넌트/Container 간 간격**: Auto Layout **`gap: 32px` (`5xl`)** 기본 적용 (단, 링크 리스트 전용 화면은 **`gap: 0px`** 적용)
  - **24px 우선 적용 구간**: `StepIndicator`(또는 이를 감싼 Container) 직후 및 `Infobox / Solid` 다음 `InputField`(또는 이를 감싼 Container) 사이에는 **`gap: 24px` (`3xl`)**을 적용합니다. 해당 구간을 구분해 기본 32px 간격과 혼용합니다. (상세 규칙: 섹션 3 및 7-C)

---

### C. 컴포넌트 배치 간격 및 옵션 규칙
- **`Infobox / Solid` 다음 `InputField` 사이 간격**: Auto Layout **`gap: 24px` (`3xl`)** 적용. `InputField`를 감싼 `Container` / `Container [순번]`이 이어지는 경우와 각 컴포넌트를 감싼 Container 사이에도 동일하게 적용하며, 해당 구간은 `## BODY` 기본 32px 간격보다 우선합니다.
- **`StepIndicator`와 바로 다음 UI 사이 간격**: Auto Layout **`gap: 24px` (`3xl`)** 적용. `StepIndicator` 또는 다음 UI를 감싼 `Container` / `Container [순번]` 사이에도 동일하게 적용하며, 해당 구간은 `## BODY` 기본 32px 간격보다 우선합니다.
- **단일 인풋 간 간격 (`InputField Group` 등)**: 내부 Auto Layout **`gap: 24px` (`3xl`)** 적용
- **`Title / Section`과 `Input Group` 사이 간격**: 내부 Auto Layout **`gap: 16px` (`xl`)** 적용
- **`Title / Section` 우측 버튼 조합 (`Container Title`)**: Flow `horizontal`, Auto Layout **`gap: 8px` (`md`)**, Alignment `align left`
- **`Title / Section` 또는 `Title / Element` + 일반 텍스트 결합**: 일반 텍스트는 **`Text (gap: 0px)`** 오토레이아웃으로 감싸서 결합
- **`Title / Element`와 `Radio Group` 사이 간격**: 내부 Auto Layout **`gap: 16px` (`xl`)** 적용
- **`Radio Group` 내부 간격**: Auto Layout **`gap: 20px` (`2xl`)** 적용 (내부 `Radio`는 개별 오토레이아웃 없이 컴포넌트 원형 그대로 배치)
- **`Title / Section`과 `SelectButton` (Description 노출 시) 사이 간격**: 내부 Auto Layout **`gap: 24px` (`3xl`)** 적용
- **`Title / Section`과 `Infobox / Card` 사이 간격**: 내부 Auto Layout **`gap: 16px` (`xl`)** 적용
- **`Infobox / Card`와 `TextList` 사이 간격**: 내부 Auto Layout **`gap: 12px` (`lg`)** 적용
- **`InputField Group`과 일반 `TextList` 사이 간격**: 내부 Auto Layout **`gap: 24px` (`3xl`)** 적용
- **`InputField`와 부가설명 `TextList` 사이 간격**: 내부 Auto Layout **`gap: 12px` (`lg`)** 적용
- **`InputField`, `SelectButton` 등과 하단 `Infobox / Card` 사이 간격**: Auto Layout **`gap: 20px` (`2xl`)** 적용
- **버튼 영역 (`Button Area`) 속성**: Auto Layout **`gap: 0px`**, 필요에 따라 **`align center`**, **`align right`** 적용
- **입력 폼 하단 항목추가 버튼 (`Button Area` 또는 `BoxButton`)과 상단 항목 간격**: Auto Layout **`gap: 24px` (`3xl`)** 적용
- **조회 컨트롤 그룹 (`Sorting Group`) 내부 간격**: Auto Layout **`gap: 12px` (`lg`)** 적용
- **`TextList (size: 14, depth: 1)` + `TextList` 결합 간격**: 내부 Auto Layout **`gap: 8px` (`md`)** 적용
- **`Table Group` 내부 간격**: Auto Layout **`gap: 1px` (`3xs` 토큰)** 적용
- **`TextList Group` 내부 간격 (복수 TextList 결합 시)**: 내부 Auto Layout **`gap: 8px` (`md` 토큰)** 적용
- **정보성 카드 `Data Block` (액션 미포함) 내부 간격**: 프레임 Auto Layout **`gap: 16px` (`xl` 토큰)**, 내부 `DataList`를 묶는 `DataList Group` 간격은 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용
- **`Card Group` 또는 `Data Block Group`과 하단 더보기(`Pagination / Basic`) 사이 간격**: 더보기 컴포넌트를 `Button Area`로 감싸고 둘 사이 간격은 Auto Layout **`gap: 20px` (`2xl` 토큰)** 적용
- **`Title / Element` + CheckBox 그리드 간격**:
  - Grid 적용 시: **`gap between columns: 16px` (`xl`)**, **`gap between rows: 20px` (`2xl`)** 적용
  - 긴 텍스트 (Vertical) 적용 시: Auto Layout **`gap: 20px` (`2xl`)** 적용
- **체크박스 아이템 간격 및 패딩**:
  - `CheckBox`: Auto Layout **`gap: 0px`**
  - `CheckSub` (종속 항목): Auto Layout **`gap: 20px` (`2xl`)**, **`padding: 16px 0 12px`** (마지막 아이템은 `padding: 16px 0 0`)
- **`Title / Page`와 `Infobox / Solid` 사이 간격**: 내부 Auto Layout **`gap: 16px` (`xl`)** 적용 (Infobox / Solid Property: **`size: medium`**)
- **`Title / Page`와 `Infobox / Card` 사이 간격 (최상단)**: 내부 Auto Layout **`gap: 16px` (`xl`)** 적용
- **`Title / Page`와 `InputField + Card / Surface` 그룹 내부 간격**: 내부 Auto Layout **`gap: 24px` (`3xl`)** 적용
- **`Title / Page` -> `Tab` -> `Container` (은행 선택 항목) 사이 간격**: Auto Layout **`gap: 24px` (`3xl`)** 적용
- **계좌 선택 리스트 그룹 내부 간격 (일반 및 바텀시트)**: Auto Layout **`gap: 4px` (`xs`)** 적용
- **Image Area 흐름 간격**:
  - `Title / Page` → `Image Area`: 같은 Container 안에서 **gap 0px**
  - `Image Area` 내부 패딩: **40px 0 (`spacing/6xl`)**, Vertical / Fill·Hug / gap 0. 내부 `ImageContainer`는 **ratio 2:1 / Fill·Fixed**로 콘텐츠 폭 350px 기준 350×175px, 전체 영역 350×255px
  - `Image Area` → 후속 콘텐츠(`ProgressStep`, `Infobox / Card` 등): **gap 24px (`spacing/3xl`)**
  - `ProgressStep`과 `Infobox / Card` 간격: Auto Layout **`gap: 24px` (`3xl`)** 적용
- **Infobox / FullWidth 최상단 배치 시 하단 간격**: Auto Layout **`gap: 24px` (`3xl`)** 적용
- **약관 UI 간격**:
  - `Depth 1` 열거 시 Container 내부 간격: Auto Layout **`gap: 12px` (`lg`)** 적용
  - `Depth 1`과 `Depth 2` 간격: Auto Layout **`gap: 12px` (`lg`)** 적용
  - `Depth 2` 내부 항목 간격: Auto Layout **`gap: 0px`** 적용
  - `Depth 3` 내부 패딩 및 간격: **`padding: 4px 20px 12px`**, Auto Layout **`gap: 0px`**
  - `Outline Container` 내부 기본 간격: Auto Layout **`gap: 16px` (`xl`)** 적용
  - `Outline Container` 내부 소타이틀과 `Group` / 항목 간격: Auto Layout **`gap: 8px` (`md`)** 적용
  - 긴 텍스트 `Depth 4` 내부 항목 간격: Flow `vertical`, Auto Layout **`gap: 0px`**
- **피드백 화면 흐름 패딩 및 간격**:
  - 단독 피드백 화면: `Container [순번]`에 **`padding: 24px 0` (`3xl`)** 적용
  - Tab 직후 피드백 화면: `Container [순번]`에 **`padding-top: 40px` (`6xl`)** 적용, 내부 `Feedback` 프레임에 **`padding: 24px 0` (`3xl`)** 적용
  - `Tab - Infobox FullWidth` Container와 `InputField` 간격: Auto Layout **`gap: 24px` (`3xl`)**
  - `InputField`와 `Feedback (padding: 24px 0)` 간격: Auto Layout **`gap: 32px` (`5xl`)**
  - `Group` Container와 `Feedback (padding: 24px 0)` 간격: Auto Layout **`gap: 32px` (`5xl`)**
  - `Filter Group`과 `Feedback` 간격: Auto Layout **`gap: 16px` (`xl`)**
- **링크 리스트 그룹 간격**:
  - `List` 프레임 내부 Auto Layout **`gap: 16px` (`xl`)** 적용
  - `List Group` 내부 Auto Layout **`gap: 4px` (`xs`)** 적용
  - Divider(10px) 포함 Container 내부 Auto Layout **`gap: 0px`** 적용
- **Card / Surface 및 Data Block 간 간격**: 내부 Auto Layout **`gap: 12px` (`lg`)** 적용
- **선택형 바텀시트 List 간 간격**: `Container 1` 내부 Auto Layout **`gap: 8px` (`md`)** 적용 (List 자체 좌우 패딩: 0px)
- **알려드립니다 컨텐츠 Container 내부 간격**: Divider(10px, tertiary)와 Accordion 사이 Auto Layout **`gap: 0px`** 적용

#### TextList 사이즈 및 그룹 간격 규칙
- **컴포넌트 내부 삽입 시 (`size: 14`)**:
  - `Infobox / Card`, `Card`, 알려드립니다 내에 들어가는 `TextList`는 Property **`size: 14`**를 적용합니다.
- **일반 본문 사용 시 (`size: 16`)**:
  - 위 컴포넌트 내부를 제외한 일반 본문에 위치하는 `TextList`는 Property **`size: 16`**을 적용합니다.
  - 연속 열거 시 오토레이아웃 그룹핑 후 **`gap: 12px` (`lg` 토큰)**을 적용합니다.

#### 완료 화면(Completion Screen) 전용 레이아웃 규칙
- **Feedback 크기 필수 규칙 (2026-10-19 사용자 교정)**: **완료 화면에서 Feedback은 항상 Large**를 사용합니다. 디자인 시스템의 실제 공개 속성명은 `varient`, 값은 `large`이므로 API에서는 `varient: large`로 설정합니다. 완료 화면에는 Medium·Small을 적용하지 않으며, 일반 피드백·Empty State의 크기 규칙보다 이 완료 화면 규칙을 우선합니다. [외국인 이용불가 안내](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=47-972)도 사용자가 지정한 이 규칙의 적용 화면입니다. 상태 아이콘·문구·버튼은 해당 기획을 유지하고, 내부 아이콘 크기·서체·간격은 Large 원형을 따릅니다. 완료 화면이 아닌 Empty State에는 기존 상황별 크기 규칙을 유지합니다.
- **승인 기준**: [업데이트된 완료 화면](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2668-26353) (`2668:26353`, 2026-10-15 확인). 아래 규칙은 상단 Feedback + 후속 데이터 그룹을 가진 완료 화면에 적용하며, 일반 화면이나 Empty State의 간격을 일괄 변경하지 않습니다.
- **`## BODY` 구조 및 패딩**:
  - Flow **`vertical`**, **`padding: 40px 20px 32px`** (상단 `spacing/6xl`, 좌우 `spacing/2xl`, 하단 `spacing/5xl`).
  - `Container 1` (Feedback)과 `Container 2` (데이터 영역) 사이의 Auto Layout **`gap: 40px` (`spacing/6xl`)**. 일반 BODY 기본 gap 32px보다 우선합니다.
  - 좌우 정렬은 승인 예시처럼 **center**를 유지하며, 데이터 영역 `Container 2`는 가로 **Fill**로 콘텐츠 폭 350px를 채웁니다. 내용이 기본 화면 높이에 들어가면 기존 일반 규격대로 BODY 높이는 Fill입니다.
- **상단 Feedback 영역**:
  - `## BODY` 최상단에 `Feedback` 컴포넌트를 위치시키고 `Container 1` 오토레이아웃으로 감쌉니다.
  - 하위 계층: `Item / Feedback`에서 status 아이콘을 **`status-circleCheck`**로 지정합니다.
  - `Container 1` 및 후속 데이터용 Container의 패딩은 **0px**로 유지합니다. 상단 40px를 Container의 `padding-top`에 다시 더하지 않습니다. Feedback 내부 원형 속성·서체는 유지합니다.
- **`Container 2` — 복수 데이터 그룹 간격**:
  - Flow **`vertical`**, padding **0px**, 가로 **Fill**, 세로 **Hug**.
  - 하나 이상의 **`Title / DataList Group`**을 순서대로 배치합니다. 복수일 때 그룹 사이의 Auto Layout **`gap: 32px` (`spacing/5xl`)**을 적용합니다. 후속 그룹의 `padding-top: 24px`로 대체하거나 추가하지 않습니다.
- **각 `Title / DataList Group` 내부 구조**:
  - Flow **`vertical`**, padding **0px**, 가로 **Fill**, 세로 **Hug**.
  - 자식은 **`Title` → `DataList Group`** 순서이며, 둘 사이 Auto Layout **`gap: 16px` (`spacing/xl`)**을 적용합니다.
  - **`Title`**: 별도의 **Vertical Auto Layout** 프레임, padding **0px**, 가로 **Fill**, 세로 **Hug**. 내부에 **`Title / Element` → `Divider / Horizontal`**을 순서대로 배치하고 **`gap: 12px` (`spacing/lg`)**를 적용합니다. Title / Element의 원형 서체(승인 예시 `KBFG Text Medium`)를 유지합니다. 기획상 타이틀이 없으면 가시성만 대응하며 임의의 빈 공간을 추가하지 않습니다.
  - **Title 내부 Divider의 실제 Component Properties**: **`thickness: 1px`, `variant: primary`, `length: full`**. 이전 완료 화면의 `tone: quaternary` 규칙을 이 패턴에 적용하지 않습니다. 여기서 full은 콘텐츠 폭 350px이며 BODY 좌우 20px 패딩을 유지합니다.
  - **`DataList Group`**: Vertical Auto Layout, padding **0px**, 가로 **Fill**, 세로 **Hug**. **`DataList (layout: split, size: 14, hasDivider: false)`**를 열거하고 내부 **`gap: 12px` (`spacing/lg`)**를 적용합니다. 단일 항목도 같은 그룹 구조를 유지합니다.
- **간격 계층 검수**: BODY **40px** → 복수 `Title / DataList Group` 사이 **32px** → `Title`과 `DataList Group` 사이 **16px** → Title 내부 및 DataList 목록 내부 각각 **12px**를 서로 구분합니다. 데이터 영역 전체를 하나의 12px gap으로 평탄화하지 않습니다.

#### 특수 공지 및 상태별 컴포넌트 규칙
- **Title / Page 직후 단일 공지 문구**:
  - `Title / Page` 다음에 공지 성격의 단일 문구가 나오는 경우 `Infobox / Solid` 컴포넌트 사용
  - Property: **`size: medium`**, `status: warning`, `hasSuffix: false`
  - 두 요소 간 오토레이아웃 그룹핑 후 **`gap: 16px` (`xl` 토큰)** 적용
- **화면 하단 공지형 카드 (Infobox / Card)**:
  - 화면 하단에 '알려드립니다' 대신 공지 성격의 내용을 넣을 때 `Infobox / Card` 컴포넌트 사용
  - 영역 제어: `Title Area`, `Slot-Contents`, `Button Area` 요소를 기획에 따라 선택적으로 노출/숨김 처리하고 `Slot-Contents` 내에 콘텐츠 배치
- **하단 "알려드립니다" 패턴 컴포넌트 상세 Spec**:
  - 구성 순서: `Divider / Horizontal` -> `Accordion`
  - Divider Property: `thickness: 10px`, `variant: tertiary`, `length: full`
  - Accordion Property: `type: basic`, `variant: standard`, `size: medium`, **`width: fill`**, **`hasDivider: false`** (오토레이아웃 감싸기 해제)
  - **Divider 숨김**: Accordion 내부의 divider는 항상 숨김 처리
  - **상태 제어**: 와이어프레임에서 펼쳐져 있다면 실제로 **펼친 상태(Expanded/Open)**로 노출
  - 그룹핑 간격: Auto Layout **`gap: 0px`**

---

## 8. Workflow & Processing Order (작업 지침)
1. **Figma 링크 분석 및 화면 식별/네이밍**:
   - 사용자가 전달한 Figma 와이어프레임 링크(또는 JSON/구조)에서 화면 흐름을 파악하고 일반/완료/바텀시트/Dialog/풀팝업/약관상세(PDF)/피드백/링크 리스트 화면 여부를 판별합니다.
   - 기획서 내 중괄호(`{ ... }`) 표기 명칭을 기반으로 생성할 아트보드 레이어명을 **`화면ID_[화면을 나타내는 명칭]`** 형식으로 확정합니다.
2. **아트보드 및 루트 프레임 세팅**:
   - **일반 및 완료 화면**: 가로 `390px` 기준 프레임 생성 후 `## HEADER`, `## BODY`, `## FOOTER` 3단 구조 세팅 (콘텐츠 양에 따라 Fill / Hug 적용). `## FOOTER` 내 `HomeIndicator`는 **`os: iOS`** Property를 적용합니다.
   - **바텀시트 화면**: 가로 `390px * 844px` 프레임에 배경 **`background/neutral/white`** 지정 후 `Dimmed` 배경(Absolute) -> `BottomSheet` -> `StatusBar`(Absolute, iOS/light) -> `HomeIndicator` (Property: **`os: iOS`**) 구조로 세팅.
   - **Dialog 화면**: 가로 `390px * 844px` 프레임에 배경 **`background/neutral/white`** 지정 후 `Dimmed` 배경(Absolute) -> `Dialog`(화면 정중앙 배치) -> `StatusBar`(Absolute, iOS/light) -> `HomeIndicator` (Property: **`os: iOS`**) 구조로 세팅.
   - **풀팝업 화면**: 배경 **`background/neutral/white`**, `StatusBar` (Absolute) -> `Popup` > `Slot` > `Header` (`AppBar`) + `Body` (`Container [순번]`) + `Footer` (`HomeIndicator: os iOS`) 구조로 세팅.
   - **약관 상세 화면 (PDF)**: `## HEADER` (`StatusBar`, `AppBar`) -> `## BODY` (`Container 1`, `Container 2`) -> `Pagination / Carousel` (Absolute Position, `Y: 686px`) -> `## FOOTER` (`StickyButton`, `HomeIndicator: os iOS`) 구조로 세팅.
   - **공통 Body Auto Layout 세팅**:
     - 상하 패딩: 기본 **`padding-top: 24px` (`3xl`)**, **`padding-bottom: 32px` (`5xl`)**
     - 상단 Feedback + 후속 데이터 그룹이 있는 완료 화면은 **`padding: 40px 20px 32px`**, Container 간 **`gap: 40px` (`spacing/6xl`)**을 우선 적용합니다. 내부 Title의 full-width Divider 때문에 BODY 좌우 패딩을 제거하지 않습니다.
     - 최상단이 `StepIndicator`, `Tab(1depth)`, `InputField(searchIcon)` 또는 헤더 직후 `Tab` 배치 시: **`padding-top: 0px`** 적용
     - 단독 피드백 화면(헤더 바로 다음 피드백만 위치): **`padding-top: 40px` (`6xl`)** 적용
     - `Infobox / FullWidth` 최상단 배치 시: **`padding: 0 0 32px`**
     - 링크 리스트 화면의 경우 **`padding-top: 16px` (`xl`)** 적용
     - 수직 간격: 기본 **`gap: 32px` (`5xl`)** (링크 리스트만 열거 시 **`gap: 0px`** 적용). 단, `StepIndicator` 직후 및 `Infobox / Solid` 다음 `InputField` 사이에는 **`gap: 24px` (`3xl`)**을 우선 적용하며, 해당 컴포넌트를 감싼 `Container` / `Container [순번]` 사이에도 동일하게 적용합니다.
     - **좌우 패딩 제어**: 화면 내에 `Accordion`, `알려드립니다`, Full-Width `Divider / Horizontal`, `Tab` 직후 피드백, `Infobox / FullWidth`, 링크 리스트 등 가로를 꽉 채워야 하는 요소가 포함되는 경우 `## BODY`의 좌우 패딩을 **`0px`**로 설정하고, 그 외의 일반 콘텐츠 `Container [순번]`들에 **`padding-left: 20px`, `padding-right: 20px`**을 부여합니다. Full-Width 요소가 전혀 없는 화면은 `## BODY`의 좌우 패딩을 **`20px`**로 설정합니다.
     - **'알려드립니다' 분할**: '알려드립니다'는 항상 독립된 `Container [순번]`으로 분할하여 배치합니다.
3. **컴포넌트 매핑 및 Property 적용**:
   - 와이어프레임의 요소를 디자인 시스템 컴포넌트로 치환하고, 문서에 정의된 Property(`size`, `variant`, `layout`, `hasDivider`, `os` 등)를 Figma 우측 속성 패널 기준으로 일치시킵니다.
   - **컴포넌트 원형 명칭은 절대로 변경하지 않으며, 와이어프레임 상 볼드 여부와 무관하게 디자인 시스템의 Title 컴포넌트(`Title / Page`, `Title / Section`, `Title / Element`) 원형 스타일을 우선시하여 적용합니다.**
   - `Title / Page` 다음에 디스크립션이 오는 경우 하위 `Description` 레이어의 가시성을 활성화합니다.
   - `Title / Section` 또는 `Title / Element`에 일반 텍스트가 결합될 시 일반 텍스트를 **`Text (gap: 0px)`** 오토레이아웃으로 감싸서 계층을 구성합니다. 단, **일반 본문에서 `Title / Section` 다음에 단일 항목의 `TextList / Unordered`가 올 경우 불릿이 유지된 컴포넌트 그대로 정의**합니다.
   - `Title / Element`와 `Radio Group`은 `gap: 16px`, `Radio Group` 내부의 `Radio`는 개별 오토레이아웃 없이 컴포넌트 그대로 열거하며 `gap: 20px`를 적용합니다.
   - `Title / Section` 우측 버튼 조합은 `Container Title (horizontal, gap: 8px, align left)`로 오토레이아웃 그룹핑합니다.
   - 텍스트 강조 시 같은 폰트 크기 내 `medium` 변수를 쓰고 `positive`, `negative`, `blue`, `red`, `primary` 토큰 규칙을 준수합니다. (단, `Table / Cell` 내 텍스트 컬러 지정 시에는 Weight를 `medium`으로 올리지 않고 `light`를 유지)
   - 바로가기 버튼 외 아이콘 결합 버튼은 `TextButton`의 `hasPrefix: True` 설정, 아이콘 없는 버튼형 텍스트는 `hasPrefix/hasSuffix: False`, `underline: True`로 적용합니다.
   - `SelectButton`은 간결한 항목일 경우 `word`, 그렇지 않을 경우 `sentence` 타입을 적용합니다.
   - 안내 문구는 위치에 따라 `Card / Surface` 다음은 `Infobox / Basic`, 입력 폼 내는 `Infobox / Solid (size: medium)`, 인풋 하단 배치는 `gap: 20px`의 `Infobox / Card`로 매핑합니다.
   - `Infobox / Card`의 단일 항목은 불릿을 생략하고 `Dynamic/Body/xs∙14∙Light`, `text/neutral/tertiary`로 적용합니다.
   - 본문 내 버튼 요소 및 더보기(`Pagination / Basic`)는 **`Button Area` (gap: 0px, align center/right)** 오토레이아웃 프레임으로 배치합니다.
   - 조회 컨트롤 그룹은 `Sorting Group (gap: 12px)`으로 묶습니다.
   - `CheckBox`는 `CheckBox (gap: 0)` 및 하위 `CheckSub (gap: 20px, padding: 16px 0 12px / 마지막 16px 0 0)`으로 감쌉니다.
   - 단독 컴포넌트(`StepIndicator`, `Tab` 등)라도 반드시 `Container [순번]`으로 감싸며, Figma 기본 10px gap은 0으로 제거합니다.
   - `InputField` 필수/안내 설정:
     - `Title / Element` 필수 표기는 `optional: true`, 텍스트 **`(필수)`**, `3xs medium`, 컬러 `text/accent` 적용
     - 단순 문장형 부연 설명/안내 문구는 `InputField`의 **`hasFooter: True`** 및 **`Item / Footer / hint`**에 적용
   - `SelectButton`과 `Title / Section (Description 노출)` 조합 시 `gap: 24px`를 적용합니다.
   - `Title / Section`과 `Infobox / Card` 조합 시 `gap: 16px`, `Infobox / Card`와 `TextList` 조합 시 `gap: 12px`를 적용합니다.
   - `InputField Group`과 일반 `TextList`는 `gap: 24px`, 부가설명 성격의 불릿 `TextList`는 해당 `InputField`와 묶어 `gap: 12px`로 매핑합니다.
   - `TextList (size: 14, depth: 1)`과 `TextList` 결합 시 오토레이아웃 `gap: 8px` (`md`)을 적용합니다.
   - `HomeIndicator` 컴포넌트는 항상 우측 속성 패널에서 **`os: iOS`** 속성을 지정합니다.
   - **Table 매핑**:
     - `Table Group` (오토레이아웃, Auto Layout `gap: 1px`) > `Slot-Body` (오토레이아웃, `border-top: stroke/md`, `border-color: border/neutral/quaternary`) > `Grid` (오토레이아웃, Flow: `grid`, `2*auto` / `3*auto` / `4*auto`) 계층 구조를 설정합니다.
     - Thead 셀: `Table / Header (variant: default)`, 행 맨 우측은 `Table / Header (variant: last)`를 적용합니다.
     - Tbody 셀: 비타이틀 셀은 `Table / Cell (variant: default)`, 행 맨 우측은 `Table / Cell (variant: last)`를 적용하며, 셀 내부 텍스트 컬러 지정 시 폰트 Weight는 반드시 `light`를 유지합니다.
     - 하단 부속 텍스트: 단일 리스트는 `TextList / Unordered` 단독 배치, 복수인 경우 `TextList Group (gap: 8px)`으로 묶어 배치합니다.
   - **계좌 선택 화면**:
     - 바텀시트: `hasScrollDim: True`, Slot 내 `Container (gap: 4px)`, Prefix에 해당 은행 아이콘(`size: 32`), Middle에 통장명 및 `은행명 계좌번호`, Suffix에 `checkMark` 적용
     - 일반 화면: `Container [순번]` 내 `Account Group (gap: 4px)`, 바텀시트와 동일 구조(Prefix `size: 32`)에 Suffix만 `checkBox`로 적용 (`Title / Page` -> `Tab` -> Container 간격은 `gap: 24px`)
   - **박스 UI 매핑** (역할을 먼저 분류하고 아웃라인 / 회색 배경·무테 스타일을 선택; 상세 규칙과 승인 예시는 섹션 3의 Box UI Rules 참조):
     - **액션 포함형**: `Card / Surface` 사용 (버튼/액션이 들어갈 때만 한정). 푸터 버튼형의 예시는 `Header (badge)` + `Body` 내 `Groups (gap: 16px)` > `Group (Card / Body / Group-A: titleMedium)` + `Group (vertical, gap: 12px, Card / Body / Group-C: textList)` + `Footer (Card / Footer / Button: buttonGroup)`. 상세 이동·선택형에 이 Footer 구조를 강제하지 않고 원본 variant/공개 속성·Slot을 따릅니다.
     - **액션 미포함형 (정보성 카드)**: **`Data Block`** 오토레이아웃 프레임(`border: stroke/md`, `border-color: border/neutral/secondary-muted`, `radius: 20px`, `padding: 20px`, `gap: 16px`) 구축. 상단에 `Title` 오토레이아웃 프레임 내 타이틀(`font-size/body/md`, `text/neutral/primary`) 배치 + 하단에 `DataList Group` 오토레이아웃 프레임(`gap: 12px`) 내 `DataList (layout: split, size: 14, hasDivider: false)` 배치
     - **동작 판정**: Footer 버튼 외에 상세 이동·이체·체크·라디오·박스 전체 선택도 Card에 해당합니다. 외부 형제 `Button Area`의 버튼만으로 Data Block을 Card로 바꾸지 않습니다. 상태 Label만 있는 경우도 자동으로 Card에 해당하지 않습니다.
     - **설명·안내형**: 기존 Infobox로 정의되지 않은 설명·주의·상태 메시지는 **`Text Box`**로 직접 구성합니다. 참조 패딩 20px, 내부 gap 16px, 라운드 14px를 각각 DS 토큰으로 연결합니다.
     - **스타일 선택**: 아웃라인 경계가 반복·중첩되면 `surface/neutral/tertiary-muted` + border 제거 형태를 우선 고려합니다. 역할과 스타일을 혼동하지 않고 주변 위계·밀도·가독성으로 선택합니다. Data Block의 승인된 부모님 기본정보 패턴은 내부 gap 20px를 적용합니다.
   - **링크 리스트 패턴**: 단일 원형(List padding: 20px 20px 16px, List Group gap: 4px, 1px Divider) 및 누적형(첫 번째 0px 20px 16px, 중간 10px Divider + 20px 20px 16px, 마지막 10px Divider + 20px 20px 0px) 규칙을 준수합니다.
   - `TextList` 적용 시 위치에 따라 Property `size: 14` 또는 `size: 16`을 분기 적용합니다.
   - `List` 컴포넌트가 `Container` 내부로 들어갈 때 자체 좌우 패딩을 `0px`로 조정합니다.
   - **약관 UI**: `Depth 1` (`Consent solid`), `Depth 2` (`Consent basic large`), `Depth 3` (`Consent basic medium`), `Outline Container`(`gap: 16px`, 복수 조합 시 `Divider 1px tertiary` 구분) 및 `Depth 4` 분기(Grid 2*2 vs Vertical 0px)를 정확히 매핑합니다.
   - **피드백(Empty State) UI**:
     - 단독형: `## BODY`의 `padding-top: 40px`, `Container [순번]` 패딩 `padding: 24px 0` 매핑
     - Tab 직후형: `## BODY`의 `padding-top: 0px`, `Container [순번]`에 `padding-top: 40px` 부여 후 내부 `Feedback` 오토레이아웃 프레임에 `padding: 24px 0` 매핑
     - 인풋/그룹 직후형: `Feedback` 오토레이아웃 프레임으로 한 번 더 감싸고 `padding: 24px 0`, 상단과의 간격 `gap: 32px` 매핑
     - Filter 결합형: Filter Area `0 20px`, 간격 `gap: 16px` 매핑
     - Card 피드백형: Card `padding: 48px 0`, `radius: 16px`, 테두리/배경 매핑
   - **완료 화면**: `Container 1`의 `Feedback` 다음에 `Container 2`를 배치합니다. Container 2는 `Title / DataList Group`들을 **gap 32px**로 열거하며, 각 그룹은 `Title` + `DataList Group`의 **gap 16px** 구조입니다. Title은 Vertical Auto Layout으로 `Title / Element` + `Divider / Horizontal (thickness: 1px, variant: primary, length: full)`을 **gap 12px**로 묶고, DataList Group은 `DataList (layout: split, size: 14, hasDivider: false)`를 **gap 12px**로 묶습니다. Container와 하위 그룹의 패딩은 0이며, BODY 패딩과 40px 간격을 중복 적용하지 않습니다.
   - `Title / Page` → `Image Area` gap 0px, `Image Area` → 후속 콘텐츠 gap 24px를 검수합니다. 승인 참조 `10580:10543`처럼 Image Area padding 40px 0, 내부 이미지 ratio 2:1 / Fill·Fixed(폭 350px 기준 350×175px), 전체 영역 높이 255px를 확인합니다.
   - 하단 공지 영역은 `Divider(10px, tertiary) + Accordion(width: fill, hasDivider: false, gap: 0)`으로 구성하며 별도의 오토레이아웃으로 감싸지 않습니다. Accordion 내부의 divider는 항상 숨기고, 와이어프레임상 펼쳐진 상태라면 실제로 펼쳐진 상태로 렌더링합니다.
4. **오토레이아웃 및 네이밍 구조화**:
   - `## BODY` 내부 블록을 판별하여, 단일 블록인 경우 `Container`, 복수 블록인 경우 `Container 1`, `Container 2` 등으로 순차 명명합니다. 정보성 데이터 박스 자체는 단일·복수 모두 `Data Block`, 설명·안내 박스 자체는 단일·복수 모두 `Text Box`로 명명합니다. Group 내부 반복 자식에 순번을 붙이지 않으며 페이지 Container의 순번 규칙과 구분합니다.
   - **레이어 및 그룹 네이밍 (한글 사용 절대 금지)**:
     - 2개 요소 그룹핑: 슬래시 앞단 명칭을 결합하여 `[컴포넌트 1] / [컴포넌트 2]` (예: `Title / InputField`)
     - 3개 이상 요소 그룹핑: `[첫 번째 컴포넌트] / Contents` (예: `Title / Contents`)
     - 복수 열거 컴포넌트: `[컴포넌트명] Group` (예: `InputField Group`, `Accordion Group`, `Radio Group`, `TextList Group`, `Table Group`, `Account Group`, `Card Group`, `Data Block Group` 등)
     - 단수 컴포넌트 래핑(패딩 목적 등): `[컴포넌트명]` 단독 (예: `InputField`, `Accordion`)
     - 버튼 영역: **`Button Area`** (Auto Layout `gap: 0px`, `align center` / `align right`)
     - 일반 텍스트 래핑: **`Text`** (Auto Layout `gap: 0px`)
     - 기본 그룹: Title Case 영문 (`Group`, `Groups`, `Container Title`, `Card`, `Data Block`, `CheckBox`, `CheckSub`, `Feedback` 등)
   - 연속된 `InputField`는 `InputField Group`으로 묶고 `gap: 24px` (`3xl`)을 적용하며, 상위 `Title / Section`과 `gap: 16px` (`xl`)으로 묶어 `Title / InputField`를 구성합니다.
   - `Card / Surface` 및 `Data Block`은 각각 열거 시 `Card Group` / `Data Block Group` (`gap: 12px`, `lg`)으로 묶고, 하단 더보기(`Button Area`)와의 간격은 `gap: 20px` (`2xl`)을 적용합니다.
   - 일반 본문 `TextList`는 `gap: 12px` (`lg`), 바텀시트 일반 `List`는 `gap: 8px` (`md`), 계좌 선택 `List`는 `gap: 4px` (`xs`)으로 그룹핑합니다.
   - `Table Group`은 `gap: 1px` (`3xs`), 복수 `TextList / Unordered`는 `TextList Group (gap: 8px)`으로 구조화합니다.
5. **토큰 기반 간격 검증**: 섹션 7에 정의된 간격 규칙(0px, `3xs`, `md`, `lg`, `xl`, `2xl`, `3xl`, `5xl`, `6xl`, `7xl`, `8xl` 등)이 오토레이아웃의 gap 및 Body padding에 올바르게 매핑되었는지 최종 확인 후 결과물을 출력합니다.
