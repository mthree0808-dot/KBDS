# UI Design & Code Generation Rules



이 문서는 Figma 와이어프레임을 바탕으로 일관된 UI 화면을 생성할 때 참조하는 디자인 가이드라인입니다.



## 1. Reference Sources (디자인 시스템)

- **Design System URL**: `https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/MO-%EB%94%94%EC%9E%90%EC%9D%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC?m=auto&node-id=0-1&t=k9nL7yLI1W2gR3hE-1`

- **컴포넌트 원형 보존 및 타이포그래피 우선순위 원칙 (CRITICAL)**:

  - 디자인 시스템에 등록된 **컴포넌트 명칭은 절대로 변경하지 않습니다** (예: `Consent / 계열사 정보제공`, `CheckBox / 휴대폰번호` 등 한글 명칭이나 임의의 수식어를 덧붙여 컴포넌트명을 변형하는 행위 절대 금지).

  - 와이어프레임과 컴포넌트를 매핑하는 과정에서 **`Title / Page`**, **`Title / Section`**, **`Title / Element`** 등의 타이틀 컴포넌트를 매핑할 때, **와이어프레임 상에서 볼드(Bold) 등으로 임의 표기되어 있더라도 이를 개별 수정하지 말고 디자인 시스템 컴포넌트에 사전 정의된 원형 폰트 스타일/Weight를 최우선으로 유지**하여 적용합니다.

  - 가이드라인에 명시된 `DataList (layout: split, size: 14)`, `size: medium`, `variant: standard` 등의 속성은 Figma 컴포넌트 우측 패널의 **Component Properties(컴포넌트 속성)**를 의미하므로 정확히 일치시켜 적용합니다.

  - 임의의 신규 스타일을 정의하기 전에 디자인 시스템에 일치하는 컴포넌트가 있는지 먼저 확인하고 매핑합니다.

- **SelectButton 타입 규칙**:

  - 간결한 항목들을 다룰 경우: Property **`word`** 타입 적용

  - 그렇지 않은 일반/문장형 항목인 경우: Property **`sentence`** 타입 적용

- **텍스트 강조 및 Color Token 세부 규칙**:

  - 텍스트에 강조색(긍정, 부정, 단순 강조 등)을 적용할 때, **동일 폰트 크기 계열 내 `medium` 타입의 텍스트 스타일/변수**를 적용합니다.

  - **테이블 셀 텍스트 Weight 예외 원칙 (CRITICAL)**:

    - **`Table / Cell` 내에 위치하는 텍스트는 특정 컬러(시맨틱 상태색, 비시맨틱 강조색 등 의미 유무 무관)를 적용하더라도 폰트의 weight를 `medium`으로 변경하지 않고, 원형 그대로 `light`를 유지합니다.**

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

- **바텀시트 및 Dialog 아트보드 Background**: 바텀시트 및 Dialog 화면 프레임 자체의 Background는 반드시 **`background/neutral/white`** 변수를 적용합니다.



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

     - **링크 리스트 전용 화면 예외**: 링크 리스트만 열거되는 화면의 경우 `## BODY`의 간격을 Auto Layout **`gap: 0px`**로 적용합니다.

   - **상하 패딩 규칙**:

     - 기본: **`padding-top: 24px` (`3xl` 토큰)**, **`padding-bottom: 32px` (`5xl` 토큰)** 적용

     - **최상단 요소에 따른 `padding-top: 0` 예외**: `StepIndicator`, `Tab (variant: 1depth)`, `InputField (item/input: searchIcon)`이 `## BODY` 최상단에 올 경우 **`padding-top: 0px`**으로 설정합니다.

     - **Infobox / FullWidth 최상단 배치 예외**: `Infobox / FullWidth`가 `## BODY` 최상단에 올 경우 `## BODY`의 패딩을 **`padding: 0 0 32px`**로 설정하고, 직후 간격은 Auto Layout **`gap: 24px` (`3xl`)**을 적용하며, 하단에 배치되는 콘텐츠들은 `Container [순번]`에서 **`padding: 0 20px`**을 적용합니다.

     - **링크 리스트 열거 화면 예외**: 링크 리스트 패턴이 적용되는 화면의 경우 **`padding-top: 16px` (`xl` 토큰)** 적용

     - **단독 피드백 화면 `padding-top: 80px` 예외**: 헤더 바로 다음에 별도 UI 없이 `Feedback (variant: medium)`만 올 경우 **`padding-top: 80px` (`8xl` 토큰)** 적용

   - **좌우 패딩 규칙 (Full-Width 요소 존재 여부에 따른 분기)**:

     - **Full-Width 요소(`알려드립니다`, `Divider / Horizontal`, `Tab` 직후 피드백, `Infobox / FullWidth`, 링크 리스트 등)가 `## BODY`에 포함되는 경우**:

       - `## BODY`의 **`padding-left: 0px`, `padding-right: 0px`** 설정

       - Full-Width 요소를 제외하고 크게 그룹핑되는 **`Container [순번]`들에 `padding-left: 20px` (`2xl`), `padding-right: 20px` (`2xl`)**을 적용 (단, 링크 리스트의 각 Container는 자체 지정 패딩을 따름)

     - **Full-Width 요소가 없는 일반 화면인 경우**:

       - `## BODY`의 **`padding-left: 20px` (`2xl`), `padding-right: 20px` (`2xl`)** 기본 적용

       - 개별 `Container [순번]`의 좌우 패딩은 `0px`로 유지

   - 높이 속성은 위 콘텐츠 양 규칙(Fill 또는 Hug)을 준수

3. **`## FOOTER`**:

   - **하단 고정 버튼(StickyButton / CTA)이 없는 경우**: `HomeIndicator`만 배치

   - **하단 고정 버튼(StickyButton / CTA)이 있는 경우**: `StickyButton(CTA)` + `HomeIndicator` 순차 배치



### D. 바텀시트(Bottom Sheet) 화면 규격 및 구조

바텀시트로 기획된 화면 역시 가로 `390px`, 세로 `844px` 규격 및 오토레이아웃을 적용하며 아래 레이어 구조를 준수합니다.



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

  4. **`HomeIndicator`**: 최하단 배치

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

  4. **`HomeIndicator`**: 최하단 배치



---



## 3. Figma Auto Layout & Naming Rules (피그마 오토레이아웃 및 네이밍)

- **기본 레이아웃 원칙**: `## BODY` 내부를 구성하는 모든 블록 요소는 기본적으로 **Auto Layout**을 적용합니다. (단, Infobox / FullWidth 제외)

- **단독 컴포넌트 Container 적용 및 기본 gap(10px) 제거 원칙**:

  - `StepIndicator`, `Tab` 등과 같이 단독으로 쓰이는 컴포넌트라 하더라도 독립 배치하지 않고 **`Container` (또는 `Container [순번]`)로 감싸서 적용**합니다.

  - 피그마에서 오토레이아웃 생성 시 기본으로 부여되는 **10px gap은 반드시 제거(0 또는 지정 토큰값으로 변경)**합니다.

- **간격 제어 원칙 (Padding 제어 배제 및 Gap 기반 제어)**:

  - 개별 `Container` 또는 `Container [순번]`에 적용되던 **`padding-top` 설정은 기본적으로 일체 배제(0 설정)**합니다. (단, Tab 직후 단독 피드백 Container의 `padding: 80px 0`, 링크 리스트 Container, Infobox/FullWidth 하단 콘텐츠 패딩 제외)

  - 화면의 수직 간격 흐름은 **`## BODY`의 기본 `gap: 32px` (`5xl`)** (링크 리스트 전용 화면은 `gap: 0px`) 및 각 `Container` 내부 오토레이아웃의 **`gap` 속성**만으로 제어합니다.

  - Container 좌우 패딩은 화면 내 Full-Width 요소 유무에 따른 규칙(섹션 2-C 참조)에 따릅니다.

- **Container 레이어 네이밍 (단일 컨텐츠 및 순차 부여 규칙)**:

  - **단일 컨텐츠인 경우**: 화면 내에 단 하나의 컨텐츠/블록만 존재하여 Container가 1개인 경우, 숫자 접미사 없이 **`Container`**로 단독 명명합니다.

  - **복수 컨텐츠인 경우**: 위에서 아래로 2개 이상의 블록이 배치될 경우, **`Container 1`**, **`Container 2`**, **`Container 3`**과 같이 숫자를 순차적으로 증가시켜 명명합니다.

- **레이어 및 그룹 네이밍 절대 규칙 (엄격 준수)**:

  - **한글 사용 절대 금지**: 레이어 명, 그룹 명에는 **어떠한 경우에도 한글을 사용하지 않고 반드시 직관적인 영문**으로만 정의합니다.

  - **컴포넌트 고유 명칭 변경 및 한글 결합 절대 금지**: 피그마 컴포넌트 원본 고유 명칭에 한글이나 부가 수식어를 덧붙여 수정하지 않습니다 (예: `Consent / 계열사 정보제공`, `CheckBox / 휴대폰번호` 등의 형태 절대 금지). 컴포넌트는 원본 컴포넌트명을 있는 그대로 유지합니다.

  - **그룹 네이밍 포맷**: 슬래시를 사용한 세부 한글 명칭 결합 방식을 일체 배제하고, 단독 **`Group`** 또는 직관적인 **`[역할] Group`** 형태의 **Title Case 영문(단어 띄어쓰기, 첫 글자 대문자)**으로만 명명합니다.

    - 권장 예시: `Group`, `Groups`, `Input Group`, `Account Group`, `Consent Group`, `Text Group`, `CheckBox Group`, `Radio Group`, `Filter Group`, `List Group`, `Sorting Group`, `Table Group`, `TextList Group` 등

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

  - 입력 폼 형태에서 사용자가 항목을 추가할 수 있는 구조인 경우, 마지막 입력 항목 바로 아래에 **`BoxButton (variant: tertiary, size: medium)`**을 배치하고, 위 항목과의 간격은 Auto Layout **`gap: 24px` (`3xl` 토큰)**을 적용합니다.

- **체크박스 아이템 및 서브 항목 패턴 (CheckBox Item & CheckSub)**:

  - `CheckBox`는 항상 **`CheckBox Item`** (Auto Layout **`gap: 0px`**) 프레임으로 감쌉니다.

  - 체크박스 선택 시 펼쳐지는 하위 종속 항목들은 **`CheckSub`** 오토레이아웃으로 감싸고:

    - 간격 및 패딩: Auto Layout **`gap: 20px` (`2xl` 토큰)**, **`padding: 16px 0 12px`**

    - **마지막 CheckBox Item 내의 CheckSub**: **`padding: 16px 0 0`** 적용

- **일반 화면 데이터 출력 Card / Surface 완성형 구조 및 컴포넌트 매핑 (Data Display Card)**:

  - 일반 화면에서 데이터를 뿌려주는 UI는 `DataList`를 1px Divider로 열거하지 않고, `Card / Surface` 컴포넌트 내부에 다음과 같은 계층 구조로 배치합니다:

    1. **`Header`**: 상단에 위치하며, 기획/필요에 따라 **`badge`** 노출

    2. **`Body`**:

       - 하위 요소들을 감싸는 **`Groups`** 오토레이아웃 프레임 생성 (**Auto Layout `gap: 16px`**)

       - `Groups` 내부 첫 번째 요소: **`Group`** 오토레이아웃 프레임 내에 **`Card / Body / Group-A` (variant: `titleMedium`)** 배치

       - `Groups` 내부 두 번째 요소: **`Group`** 오토레이아웃 프레임 (Flow: **`vertical`**, Auto Layout **`gap: 12px`**) 생성 후, 하위에 **`Card / Body / Group-C` (variant: `textList`)**를 1개 또는 그 이상 순차 배치

    3. **`Footer`**: `Body` 하단에 위치하며 **`Card / Footer / Button` (variant: `buttonGroup`)** 배치

    - *(참고: 위 구조는 완성형 기준이며, 와이어프레임 기획에 따라 각 영역의 노출/비노출을 유연하게 조정하여 작업합니다.)*

  - **데이터 상태 값 노출형 (Status Value Pattern)**:

    1. `Card / Surface` > `Body` 내부의 **`Groups`** 속성을 Flow: **`horizontal`**, Alignment: **`align left`**로 설정

    2. `Groups` 내부 좌측: **`Group`** 오토레이아웃 (Auto Layout **`gap: 4px`**) 내에 **`Card / Body / Group-A` (variant: `titleMedium`)** 및 **`Card / Body / Group-A` (variant: `Description`)** 수직 배치

    3. `Groups` 내부 우측: **`Label / Default`** (variant: `tint`) 배치

       - Tone 분기: 긍정은 **`blue`**, 부정은 **`red`**, 중립은 **`darkGray`** 적용

    4. 좌측 `Group`과 우측 `Label / Default` 사이 간격은 Auto Layout **`gap: 16px` (`xl` 토큰)**의 수평 구조로 배치

- **컴포넌트별 조합 및 레이아웃 규칙**:

  - **SelectButton 조합 패턴**:

    - `SelectButton`이 `hasTitle: True` 외에 `Title / Section` (Slot에서 Description이 노출되는 경우)과 함께 쓰일 때 둘 사이 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용

  - **Title / Section 조합 패턴**:

    - `Title / Section`과 `Infobox / Card`가 조합될 시 둘 사이 Auto Layout **`gap: 16px` (`xl` 토큰)** 적용

  - **Infobox / Card 조합 패턴**:

    - `Infobox / Card`와 단수 또는 복수의 `TextList`가 조합될 시 둘 사이 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용

  - **Input & TextList 조합 패턴**:

    - **Input Group 다음 일반 TextList 노출**: `Input Group`과 `TextList`를 그룹핑하고 둘 사이 간격은 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
