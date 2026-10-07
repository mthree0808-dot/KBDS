# UI Design & Code Generation Rules

이 문서는 Figma 와이어프레임을 바탕으로 일관된 UI 화면을 생성할 때 참조하는 디자인 가이드라인입니다.

## 1. Reference Sources (디자인 시스템)
- **Design System URL**: `https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/MO-%EB%94%94%EC%9E%90%EC%9D%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC?m=auto&node-id=0-1&t=k9nL7yLI1W2gR3hE-1`
- **규칙**:
  - 버튼, 인풋, 모달, 헤더 등 컴포넌트는 위 디자인 시스템에 정의된 기본 Spec(Props, Color Token, Radius 등)을 우선 사용합니다.
  - 가이드라인에 명시된 `DataList (layout: split, size: 14)`, `size: medium`, `variant: standard` 등의 속성은 Figma 컴포넌트 우측 패널의 **Component Properties(컴포넌트 속성)**를 의미하므로 정확히 일치시켜 적용합니다.
  - 임의의 신규 스타일을 정의하기 전에 디자인 시스템에 일치하는 컴포넌트가 있는지 먼저 확인하고 매핑합니다.
- **Color Token 규칙 (텍스트 강조)**:
  - 텍스트 강조 시 Status(상태/피드백 등) 성격에 부합하는 경우는 `text/status` 컬러 변수를 사용합니다.
  - 시맨틱(Status)한 경우를 제외한 일반적인 텍스트 강조는 `text/accent` 컬러 변수를 사용합니다.
- **인라인 링크 텍스트 스타일 (TextList / Unordered 및 일반 텍스트 공통)**:
  - 문장 중간에 링크 처리되는 부분을 표기할 경우:
    - **Color Token**: `text/neutral/secondary`
    - **Typography**: 동일 폰트 계열 내 `bold`로 정의된 Text Style 적용
    - **Type Settings**:
      - `Decoration`: **Underline** 체크
      - `Underline Details > Offset`: **`25%`** 설정
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
- **바텀시트 아트보드 Background**: 바텀시트 화면 프레임 자체의 Background는 반드시 **`background/neutral/white`** 변수를 적용합니다.

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
   - **Auto Layout 속성**: Flow: **Vertical**, **`gap: 32px` (`5xl` 토큰)**
   - **상하 패딩 규칙**:
     - 기본: **`padding-top: 24px` (`3xl` 토큰)**, **`padding-bottom: 32px` (`5xl` 토큰)** 적용
     - **최상단 요소에 따른 `padding-top: 0` 예외**: `StepIndicator`, `Tab (variant: 1depth)`, `InputField (item/input: searchIcon)`이 `## BODY` 최상단에 올 경우 **`padding-top: 0px`**으로 설정합니다.
   - **좌우 패딩 규칙 (Full-Width 요소 존재 여부에 따른 분기)**:
     - **Full-Width 요소(`알려드립니다`, `Divider / Horizontal` 등)가 `## BODY`에 포함되는 경우**:
       - `## BODY`의 **`padding-left: 0px`, `padding-right: 0px`** 설정
       - Full-Width 요소를 제외하고 크게 그룹핑되는 **`Container [순번]`들에 `padding-left: 20px` (`2xl`), `padding-right: 20px` (`2xl`)**을 적용
     - **Full-Width 요소가 없는 일반 화면인 경우**:
       - `## BODY`의 **`padding-left: 20px` (`2xl`), `padding-right: 20px` (`2xl`)** 기본 적용
       - 개별 `Container [순번]`의 좌우 패딩은 `0px`로 유지
   - **Infobox / FullWidth 배치 예외**: `## HEADER` 직후 공지 성격의 내용이 올 경우 `Infobox / FullWidth` 컴포넌트를 사용하며, **`Container`로 감싸지 않고 독립 배치**합니다.
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
    - `Slot-Prefix`: `Item / Prefix (variant: icon)`, `IconContainer: icon` 항목을 기획서에 상응하는 은행명 아이콘으로 설정
    - `Middle`: `first` 내 폰트 스타일 유지, 상단 텍스트는 **통장명**, 하단 텍스트는 **`[은행명] 123456-04-123456`** 형식으로 기재 (Prefix 아이콘과 일치하는 은행명 반영)
    - `Slot-Suffix`: `Item / Suffix`에서 **`variant: checkMark`** 적용

---

## 3. Figma Auto Layout & Naming Rules (피그마 오토레이아웃 및 네이밍)
- **기본 레이아웃 원칙**: `## BODY` 내부를 구성하는 모든 블록 요소는 기본적으로 **Auto Layout**을 적용합니다. (단, Infobox / FullWidth 제외)
- **단독 컴포넌트 Container 적용 및 기본 gap(10px) 제거 원칙**:
  - `StepIndicator`, `Tab` 등과 같이 단독으로 쓰이는 컴포넌트라 하더라도 독립 배치하지 않고 **`Container` (또는 `Container [순번]`)로 감싸서 적용**합니다.
  - 피그마에서 오토레이아웃 생성 시 기본으로 부여되는 **10px gap은 반드시 제거(0 또는 지정 토큰값으로 변경)**합니다.
- **간격 제어 원칙 (Padding 제어 배제 및 Gap 기반 제어)**:
  - 개별 `Container` 또는 `Container [순번]`에 적용되던 **`padding-top` 설정은 일체 배제(0 설정)**합니다.
  - 화면의 수직 간격 흐름은 **`## BODY`의 기본 `gap: 32px` (`5xl`)** 및 각 `Container` 내부 오토레이아웃의 **`gap` 속성**만으로 제어합니다.
  - Container 좌우 패딩은 화면 내 Full-Width 요소 유무에 따른 규칙(섹션 2-C 참조)에 따릅니다.
- **Container 레이어 네이밍 (단일 컨텐츠 및 순차 부여 규칙)**:
  - **단일 컨텐츠인 경우**: 화면 내에 단 하나의 컨텐츠/블록만 존재하여 Container가 1개인 경우, 숫자 접미사 없이 **`Container`**로 단독 명명합니다.
  - **복수 컨텐츠인 경우**: 위에서 아래로 2개 이상의 블록이 배치될 경우, **`Container 1`**, **`Container 2`**, **`Container 3`**과 같이 숫자를 순차적으로 증가시켜 명명합니다.
- **Container 내부 서브 그룹 네이밍 규칙 (직관적 영문 Title Case)**:
  - Container 내부 레이어명은 컨텐츠를 확인한 후 **직관적인 영문(Title Case, 띄어쓰기 적용)**으로 정의합니다. 불필요하게 길지 않되 역할이 명확해야 합니다.
  - **대표 컴포넌트 간 명확한 결합인 경우**: 슬래시를 사용해 **`[대표 컴포넌트명] / [대표 컴포넌트명]`**으로 명명합니다.
    - 예: `Title / Input`
  - **그 외 별도 그룹핑인 경우**: **`Name Text`** 형식(단어별 띄어쓰기, 각 단어의 첫 글자는 반드시 대문자)으로 명명합니다.
    - 예: `Consent Group`, `Text Group`, `Input Group`, `CheckBox Group`, `Radio Group`
- **컴포넌트별 조합 및 레이아웃 규칙**:
  - **SelectButton 조합 패턴**:
    - `SelectButton`이 `hasTitle: True` 외에 `Title / Section` (Slot에서 Description이 노출되는 경우)과 함께 쓰일 때 둘 사이 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
  - **Title / Section 조합 패턴**:
    - `Title / Section`과 `Infobox / Card`가 조합될 시 둘 사이 Auto Layout **`gap: 16px` (`xl` 토큰)** 적용
  - **Infobox / Card 조합 패턴**:
    - `Infobox / Card`와 단수 또는 복수의 `TextList`가 조합될 시 둘 사이 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용
  - **Input & TextList 조합 패턴**:
    - **Input Group 다음 일반 TextList 노출**: `Input Group`과 `TextList`를 그룹핑하고 둘 사이 간격은 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
    - **특정 InputField의 부가설명 성격 TextList**: 불릿 리스트 형태로 추가 설명이 들어갈 때는 해당 `InputField`와 `TextList`를 별도로 묶어 그룹핑하고 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용
    - *(참고: 불릿이 아닌 단순 문장형 부연 설명은 `InputField` 내부의 `hasFooter: True` 및 `Item / Footer / hint`를 사용합니다.)*
  - **TextList (size: 14, depth: 1) 상호 결합 패턴**:
    - `TextList (size: 14, depth: 1)` 및 `TextList` 컴포넌트들이 오토레이아웃으로 함께 묶일 때 내부 Auto Layout **`gap: 8px` (`md` 토큰)** 적용
  - **Title / Element + 복수 CheckBox / Radio 조합 패턴**:
    - 복수의 CheckBox 요소들은 **`CheckBox Group`**, 복수의 Radio 요소들은 **`Radio Group`**으로 명명하여 묶음
    - `Title / Element`와 `CheckBox Group` (또는 `Radio Group`)을 합쳐 **`Group`** 오토레이아웃으로 그룹핑
    - **표준 레이아웃 (Grid 형태)**:
      - Flow: **`grid`** (기획서에 따라 `3*1`, `2*auto` 등 설정)
      - 간격: **`gap between columns: 16px` (`xl`)**, **`gap between rows: 8px` (`md`)** 적용
    - **항목 텍스트가 긴 경우 (Vertical 형태)**:
      - 항목 텍스트 길이가 길어 grid 배치가 곤란한 경우 `Group`의 Flow 속성을 **`vertical`**로 설정하고 Auto Layout **`gap: 8px` (`md` 토큰)** 적용
  - **일반 화면 계좌 선택 패턴**:
    - 상단에 타이틀이나 탭이 배치되고 하단에 계좌 선택 리스트가 위치할 때, 계좌 항목들을 **`Container [순번]`**으로 그룹핑하고 Auto Layout **`gap: 4px` (`xs` 토큰)** 적용
    - `List` 내부 Spec: 바텀시트 계좌 선택과 동일하게 구성하되, `Slot-Suffix`의 `Item / Suffix`는 **`variant: checkBox`**로 적용
    - **`Title / Page` -> `Tab` -> `Container [순번]` (은행 선택 항목) 구조인 경우**: 요소 간 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
  - **Title / Page 조합 패턴**:
    - **Title / Page + Infobox / Solid**: 오토레이아웃 그룹핑 후 Auto Layout **`gap: 16px` (`xl` 토큰)** 적용
    - **Title / Page + Infobox / Card**: 최상단 배치 시 둘 사이 Auto Layout **`gap: 16px` (`xl` 토큰)** 적용
    - **Title / Page + Image Area + ProgressStep + Infobox / Card 흐름**:
      1. `Title / Page` 다음에 오는 `ImageContainer`는 **`Image Area`**라는 오토레이아웃으로 감싸고 **`padding: 40px 0`** 적용
      2. `Image Area` 다음에 `ProgressStep`이 올 경우 둘 사이 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
      3. `ProgressStep` 다음에 `Infobox / Card`가 올 경우 둘 사이 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
    - **Title / Page + InputField + Card / Surface**: 세 요소를 오토레이아웃으로 그룹핑하고 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
    - **Title / Section + InputField 조합 (`Title / Input`)**:
      1. `InputField`들을 먼저 오토레이아웃으로 묶어 **`Input Group`**으로 명명하고 **`gap: 24px` (`3xl` 토큰)** 적용
      2. `Title / Section`과 `Input Group`을 오토레이아웃으로 그룹핑하고 **`gap: 16px` (`xl` 토큰)** 적용
      3. 이 그룹의 레이어명은 **`Title / Input`**으로 명명
  - **조회기간 컨트롤 (SegmentedControl + InputField)**:
    - `SegmentedControl` 하단에 `InputField (variant: date-date)`가 위치할 경우, 두 요소를 Auto Layout으로 그룹핑하고 레이어명을 **`Group`**으로 지정합니다.
  - **InputField 연속 배치**: 단일 오토레이아웃 프레임으로 묶고, 내부 간격은 Auto Layout **`gap: 24px` (`3xl` 토큰)**을 적용합니다.
  - **Card / Surface 연속 배치**: 카드 컴포넌트들이 열거될 경우 단일 오토레이아웃 프레임으로 그룹핑하고, 내부 간격은 Auto Layout **`gap: 12px` (`lg` 토큰)**을 적용합니다.
  - **List 컴포넌트 패딩 예외**:
    - `List` 컴포넌트가 `Container` 내부로 들어올 때, `List` 자체에 기본 설정되어 있는 **좌우 패딩(padding-left, padding-right) 값은 `0px`로 재설정**합니다.
  - **DataList (일반 수평 데이터 열거 구조)**:
    - 구조: 상단 `Divider / Horizontal` + `DataList` 목록 + 하단 `Divider / Horizontal`
    - Divider Spec: `thickness: 1px`, `tone: tertiaryMuted`, `length: full`
    - 그룹핑 및 간격: 위 요소를 모두 묶어 단일 오토레이아웃 프레임으로 그룹핑하고 Auto Layout **`gap: 16px` (`xl` 토큰)**을 적용합니다.
  - **DataList 후속 공지 문구 (TextList / Unordered)**:
    - `DataList` 그룹 바로 다음에 공지 성격의 문구가 위치할 경우 `TextList / Unordered` 컴포넌트를 열거하여 배치합니다.
  - **일반 본문 TextList 연속 배치**:
    - `Infobox / Card`, `Card`, 알려드립니다 외부의 일반 본문에 쓰이는 `TextList`가 여러 개 열거될 경우, 오토레이아웃으로 그룹핑하고 **기본 `gap: 12px` (`lg` 토큰)**을 적용합니다.
  - **Form 내 Accordion 배치**: 폼 형태로 열거되는 도중 위치하는 `Accordion`은 오토레이아웃을 적용하여 `Container [순번]`으로 명명합니다.
  - **하단 "알려드립니다" 공통 패턴**:
    - `Container` 또는 `Container [순번]` 내부에 `Divider / Horizontal (thickness: 10px, variant: tertiary, length: full)`을 상단에 배치하고, 그 바로 아래에 `Accordion (type: basic, variant: standard, size: medium)` 컴포넌트를 순서대로 배치합니다.
    - **오토레이아웃 해제 및 속성**: `Accordion`을 별도의 오토레이아웃 프레임으로 다시 감싸지 않고(오토레이아웃 해제/단일 컴포넌트 직접 배치), `Accordion` 컴포넌트 자체의 수평 크기는 **`width: fill`**로 설정합니다.
    - 이 Container의 Auto Layout **`gap: 0px`**을 적용합니다.

---

## 4. 약관 화면 전용 패턴 (Consent Layout Rules)

### A. 계층별 오토레이아웃 및 컴포넌트 규칙
- **Depth 1 (약관 타이틀 항목)**:
  - `Title / Page` 다음에 위치하는 최상위 약관 타이틀
  - 컴포넌트 Spec: `Consent` (`size: large`, `variant: solid`, 기획서에 따라 `hasArrow: true/false`, `Item / Arrow: down, up, right` 선택 적용)
  - 오토레이아웃 프레임명: **`Depth 1`**
  - **복수 열거 시**: `Depth 1` 항목들이 여러 개 열거될 때는 `Container`로 묶고 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용
- **Depth 2 (하위 약관 항목)**:
  - `Depth 1`의 직속 하위 항목들
  - 컴포넌트 Spec: `Consent` (`size: large`, `variant: basic`)
  - 오토레이아웃 프레임명: **`Depth 2`**, Auto Layout **`gap: 0px`**
  - **상위-하위 간격**: `Depth 1`과 `Depth 2` 사이 간격은 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용
- **Depth 3 (세부 하위 뎁스)**:
  - `Depth 2` 내부의 `Consent (size: large, variant: basic)` 아래에 위치하는 항목
  - 컴포넌트 Spec: `Consent` (`size: medium`, `variant: basic`)
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

## 5. Spacing Tokens & Layout Rules

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
- **`## BODY` padding-top 예외 (`0px`)**: 최상단에 `StepIndicator`, `Tab (variant: 1depth)`, `InputField (item/input: searchIcon)` 배치 시 적용
- **`## BODY` 내부 컴포넌트/Container 간 간격**: Auto Layout **`gap: 32px` (`5xl`)** 기본 적용
- *(참고: 개별 Container의 상하 패딩은 배제되며, 블록 간 간격은 `## BODY`의 `gap: 32px`를 통해 균일하게 제어됩니다.)*

---

### C. 컴포넌트 배치 간격 및 옵션 규칙
- **단일 인풋 간 간격 (`Input Group` 등)**: 내부 Auto Layout **`gap: 24px` (`3xl`)** 적용
- **`Title / Section`과 `Input Group` 사이 간격 (`Title / Input`)**: 내부 Auto Layout **`gap: 16px` (`xl`)** 적용
- **`Title / Section`과 `SelectButton` (Description 노출 시) 사이 간격**: 내부 Auto Layout **`gap: 24px` (`3xl`)** 적용
- **`Title / Section`과 `Infobox / Card` 사이 간격**: 내부 Auto Layout **`gap: 16px` (`xl`)** 적용
- **`Infobox / Card`와 `TextList` 사이 간격**: 내부 Auto Layout **`gap: 12px` (`lg`)** 적용
- **`Input Group`과 일반 `TextList` 사이 간격**: 내부 Auto Layout **`gap: 24px` (`3xl`)** 적용
- **`InputField`와 부가설명 `TextList` 사이 간격**: 내부 Auto Layout **`gap: 12px` (`lg`)** 적용
- **`TextList (size: 14, depth: 1)` + `TextList` 결합 간격**: 내부 Auto Layout **`gap: 8px` (`md`)** 적용
- **`Title / Element` + CheckBox/Radio Group 간격**:
  - Grid 적용 시: **`gap between columns: 16px` (`xl`)**, **`gap between rows: 8px` (`md`)** 적용
  - 긴 텍스트 (Vertical) 적용 시: Auto Layout **`gap: 8px` (`md`)** 적용
- **`Title / Page`와 `Infobox / Solid` 사이 간격**: 내부 Auto Layout **`gap: 16px` (`xl`)** 적용
- **`Title / Page`와 `Infobox / Card` 사이 간격 (최상단)**: 내부 Auto Layout **`gap: 16px` (`xl`)** 적용
- **`Title / Page`와 `InputField + Card / Surface` 그룹 내부 간격**: 내부 Auto Layout **`gap: 24px` (`3xl`)** 적용
- **`Title / Page` -> `Tab` -> `Container` (은행 선택 항목) 사이 간격**: Auto Layout **`gap: 24px` (`3xl`)** 적용
- **계좌 선택 리스트 그룹 내부 간격 (일반 및 바텀시트)**: Auto Layout **`gap: 4px` (`xs`)** 적용
- **Image Area 흐름 간격**:
  - `Image Area` 내부 패딩: `padding: 40px 0`
  - `Image Area`와 `ProgressStep` 간격: Auto Layout **`gap: 24px` (`3xl`)** 적용
  - `ProgressStep`과 `Infobox / Card` 간격: Auto Layout **`gap: 24px` (`3xl`)** 적용
- **약관 UI 간격**:
  - `Depth 1` 열거 시 Container 내부 간격: Auto Layout **`gap: 12px` (`lg`)** 적용
  - `Depth 1`과 `Depth 2` 간격: Auto Layout **`gap: 12px` (`lg`)** 적용
  - `Depth 2` 내부 항목 간격: Auto Layout **`gap: 0px`** 적용
  - `Depth 3` 내부 패딩 및 간격: **`padding: 4px 20px 12px`**, Auto Layout **`gap: 0px`**
  - `Outline Container` 내부 기본 간격: Auto Layout **`gap: 16px` (`xl`)** 적용
  - `Outline Container` 내부 소타이틀과 `Group` / 항목 간격: Auto Layout **`gap: 8px` (`md`)** 적용
  - 긴 텍스트 `Depth 4` 내부 항목 간격: Flow `vertical`, Auto Layout **`gap: 0px`**
- **Card / Surface 간 간격**: 내부 Auto Layout **`gap: 12px` (`lg`)** 적용
- **DataList 일반 그룹 내부 간격**: 상·하단 Divider 포함 내부 Auto Layout **`gap: 16px` (`xl`)** 적용
- **선택형 바텀시트 List 간 간격**: `Container 1` 내부 Auto Layout **`gap: 8px` (`md`)** 적용 (List 자체 좌우 패딩: 0px)
- **알려드립니다 컨텐츠 Container 내부 간격**: Divider(10px, tertiary)와 Accordion 사이 Auto Layout **`gap: 0px`** 적용

#### TextList 사이즈 및 그룹 간격 규칙
- **컴포넌트 내부 삽입 시 (`size: 14`)**:
  - `Infobox / Card`, `Card`, 알려드립니다 내에 들어가는 `TextList`는 Property **`size: 14`**를 적용합니다.
- **일반 본문 사용 시 (`size: 16`)**:
  - 위 컴포넌트 내부를 제외한 일반 본문에 위치하는 `TextList`는 Property **`size: 16`**을 적용합니다.
  - 연속 열거 시 오토레이아웃 그룹핑 후 **`gap: 12px` (`lg` 토큰)**을 적용합니다.

#### 완료 화면(Completion Screen) 전용 레이아웃 규칙
- **상단 Feedback 영역**:
  - `## BODY` 최상단에 `Feedback` 컴포넌트를 위치시키고 `Container 1` 오토레이아웃으로 감쌉니다.
  - 하위 계층: `Item / Feedback`에서 status 아이콘을 **`status-circleCheck`**로 지정합니다.
- **후속 DataList 그룹핑 및 간격**:
  - Feedback 다음에 열거되는 데이터 콘텐츠는 `Container [순번]`으로 그룹핑합니다.
  - 그룹 내부 구조: `Title / Element` (기획에 따라 노출/비노출) + `Divider / Horizontal` (`thickness: 1px`, `tone: quaternary`, `length: full`) + `DataList (layout: split, size: 14)`
  - 오토레이아웃 간격: 해당 `Container [순번]` 내부 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용

#### 특수 공지 및 상태별 컴포넌트 규칙
- **Title / Page 직후 단일 공지 문구**:
  - `Title / Page` 다음에 공지 성격의 단일 문구가 나오는 경우 `Infobox / Solid` 컴포넌트 사용
  - Property: `size: medium`, `status: warning`, `hasSuffix: false`
  - 두 요소 간 오토레이아웃 그룹핑 후 **`gap: 16px` (`xl` 토큰)** 적용
- **화면 하단 공지형 카드 (Infobox / Card)**:
  - 화면 하단에 '알려드립니다' 대신 공지 성격의 내용을 넣을 때 `Infobox / Card` 컴포넌트 사용
  - 영역 제어: `Title Area`, `Slot-Contents`, `Button Area` 요소를 기획에 따라 선택적으로 노출/숨김 처리하고 `Slot-Contents` 내에 콘텐츠 배치
- **하단 "알려드립니다" 패턴 컴포넌트 상세 Spec**:
  - 구성 순서: `Divider / Horizontal` -> `Accordion`
  - Divider Property: `thickness: 10px`, `variant: tertiary`, `length: full`
  - Accordion Property: `type: basic`, `variant: standard`, `size: medium`, **`width: fill`** (오토레이아웃 감싸기 해제)
  - 그룹핑 간격: Auto Layout **`gap: 0px`**
- **Empty State (Feedback 컴포넌트)**:
  - `Container` 내에 위치할 경우:
    - **Property**: `variant: small` 사용

---

### D. 안내성 컴포넌트 ("알아두세요" Box)
- **그룹 박스**: 모서리 라운드 및 배경색이 적용된 정보 안내 박스 UI
- **내부 타이틀과 불릿 리스트 간격**: `12px` (`lg`)
- **불릿 리스트 항목 간 간격 (Item-to-Item Gap)**: `8px` (`md`)

---

## 6. Workflow & Processing Order (작업 지침)
1. **Figma 링크 분석 및 화면 식별/네이밍**:
   - 사용자가 전달한 Figma 와이어프레임 링크(또는 JSON/구조)에서 화면 흐름을 파악하고 일반/완료/바텀시트/약관 화면 여부를 판별합니다.
   - 기획서 내 중괄호(`{ ... }`) 표기 명칭을 기반으로 생성할 아트보드 레이어명을 **`화면ID_[화면을 나타내는 명칭]`** 형식으로 확정합니다.
2. **아트보드 및 루트 프레임 세팅**:
   - **일반 및 완료 화면**: 가로 `390px` 기준 프레임 생성 후 `## HEADER`, `## BODY`, `## FOOTER` 3단 구조 세팅 (콘텐츠 양에 따라 Fill / Hug 적용).
   - **바텀시트 화면**: 가로 `390px * 844px` 프레임에 배경 **`background/neutral/white`** 지정 후 `Dimmed` 배경(Absolute) -> `BottomSheet` -> `StatusBar`(Absolute, iOS/light) -> `HomeIndicator` 구조로 세팅.
   - **공통 Body Auto Layout 세팅**:
     - 상하 패딩: 기본 **`padding-top: 24px` (`3xl`)**, **`padding-bottom: 32px` (`5xl`)** (최상단이 `StepIndicator`, `Tab(1depth)`, `InputField(searchIcon)`인 경우 `padding-top: 0px`)
     - 수직 간격: **`gap: 32px` (`5xl`)**
     - **좌우 패딩 제어**: 화면 내에 `알려드립니다`나 Full-Width `Divider / Horizontal`과 같이 가로를 꽉 채워야 하는 요소가 포함되는 경우 `## BODY`의 좌우 패딩을 **`0px`**로 설정하고, 그 외의 일반 콘텐츠 `Container [순번]`들에 **`padding-left: 20px`, `padding-right: 20px`**을 부여합니다. Full-Width 요소가 전혀 없는 화면은 `## BODY`의 좌우 패딩을 **`20px`**로 설정합니다.
3. **컴포넌트 매핑 및 Property 적용**:
   - 와이어프레임의 요소를 디자인 시스템 컴포넌트로 치환하고, 문서에 정의된 Property(`size`, `variant`, `layout` 등)를 Figma 우측 속성 패널 기준으로 일치시킵니다.
   - 단독 컴포넌트(`StepIndicator`, `Tab` 등)라도 반드시 `Container [순번]`으로 감싸며, Figma 기본 10px gap은 0으로 제거합니다.
   - `InputField` 필수/안내 설정:
     - `Title / Element` 필수 표기는 `optional: true`, 텍스트 **`(필수)`**, `3xs medium`, 컬러 `text/accent` 적용
     - 단순 문장형 부연 설명/안내 문구는 `InputField`의 **`hasFooter: True`** 및 **`Item / Footer / hint`**에 적용
   - `SelectButton`과 `Title / Section (Description 노출)` 조합 시 `gap: 24px`를 적용합니다.
   - `Title / Section`과 `Infobox / Card` 조합 시 `gap: 16px`, `Infobox / Card`와 `TextList` 조합 시 `gap: 12px`를 적용합니다.
   - `Input Group`과 일반 `TextList`는 `gap: 24px`, 부가설명 성격의 불릿 `TextList`는 해당 `InputField`와 묶어 `gap: 12px`로 매핑합니다.
   - `TextList (size: 14, depth: 1)`과 `TextList` 결합 시 오토레이아웃 `gap: 8px` (`md`)을 적용합니다.
   - `Title / Element`와 CheckBox/Radio 그룹핑 시 그리드는 Column `16px`, Row `8px`로 설정하고 긴 텍스트는 Vertical `gap: 8px`로 분기합니다.
   - **계좌 선택 화면**:
     - 바텀시트: `hasScrollDim: True`, Slot 내 `Container (gap: 4px)`, Prefix에 해당 은행 아이콘, Middle에 통장명 및 `은행명 계좌번호`, Suffix에 `checkMark` 적용
     - 일반 화면: `Container [순번] (gap: 4px)`, 바텀시트와 동일 구조에 Suffix만 `checkBox`로 적용 (`Title / Page` -> `Tab` -> Container 간격은 `gap: 24px`)
   - `TextList` 적용 시 위치에 따라 Property `size: 14` 또는 `size: 16`을 분기 적용합니다.
   - `List` 컴포넌트가 `Container` 내부로 들어갈 때 자체 좌우 패딩을 `0px`로 조정합니다.
   - **약관 UI**: `Depth 1` (`Consent solid`), `Depth 2` (`Consent basic large`), `Depth 3` (`Consent basic medium`), `Outline Container`(`gap: 16px`, 복수 조합 시 `Divider 1px tertiary` 구분) 및 `Depth 4` 분기(Grid 2*2 vs Vertical 0px)를 정확히 매핑합니다.
   - **완료 화면**: 상단에 `Feedback` (`status-circleCheck`)을 배치하고, 후속 `DataList` 그룹에는 `tone: quaternary`인 Divider 및 `gap: 12px` (`lg`)을 적용합니다.
   - 텍스트 강조 및 인라인 링크 스타일 규칙을 엄격히 적용합니다:
     - 상태 강조는 `text/status`, 일반 강조는 `text/accent` 토큰 사용
     - 문장 내 링크 텍스트는 `text/neutral/secondary` + `Bold` Text Style + `Underline (Offset: 25%)` 적용
   - `Image Area`(`padding: 40px 0`), `ProgressStep`(`gap: 24px`), `Infobox / Card`(`gap: 24px`) 흐름을 준수합니다.
   - 하단 공지 영역은 `Divider(10px, tertiary) + Accordion(width: fill, gap: 0)`으로 구성하며 별도의 오토레이아웃으로 Accordion을 감싸지 않습니다.
4. **오토레이아웃 및 네이밍 구조화**:
   - `## BODY` 내부 블록을 판별하여, 단일 블록인 경우 `Container`, 복수 블록인 경우 `Container 1`, `Container 2` 등으로 순차 명명합니다.
   - **Container 내부 네이밍**: 컨텐츠를 확인하여 직관적인 영문 Title Case(`Name Text` 형식) 또는 컴포넌트 결합형(`Title / Input` 등)으로 명확히 부여합니다.
   - 연속된 `InputField`는 `Input Group`으로 묶고 `gap: 24px` (`3xl`)을 적용하며, 상위 `Title / Section`과 `gap: 16px` (`xl`)으로 묶어 `Title / Input`을 구성합니다.
   - `Card / Surface`는 `gap: 12px` (`lg`), 일반 본문 `TextList`는 `gap: 12px` (`lg`), 바텀시트 일반 `List`는 `gap: 8px` (`md`), 계좌 선택 `List`는 `gap: 4px` (`xs`)으로 그룹핑합니다.
5. **토큰 기반 간격 검증**: 섹션 5에 정의된 간격 규칙(0px, `md`, `lg`, `xl`, `2xl`, `3xl`, `5xl`, `6xl`, `7xl` 등)이 오토레이아웃의 gap 및 Body padding에 올바르게 매핑되었는지 최종 확인 후 결과물을 출력합니다.
