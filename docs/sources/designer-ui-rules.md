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

---

## 2. Screen Frame & Base Structure (아트보드 규격 및 기본 구조)

### A. 아트보드(화면 프레임) 네이밍 규칙
- 기획서 와이어프레임 내 페이지 ID가 공란이므로, 기획서 상의 중괄호(`{ ... }`)로 표기된 화면 명칭을 확인하여 다음 규칙으로 아트보드 이름을 명명합니다.
  - **네이밍 포맷**: `화면ID_[화면을 나타내는 명칭]`
  - *(예: 기획서에 `{한글잔액증명서_발급신청}`으로 표기된 경우 -> `화면ID_한글잔액증명서_발급신청`)*

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
   - 실질적인 화면 콘텐츠(Container 1, Container 2 등)가 위치하는 메인 영역
   - **기본 패딩 규칙**: 하단 여백 대응을 위해 **`padding-bottom: 32px` (`5xl` 토큰)**을 필히 적용합니다.
   - **StepIndicator 배치 예외**: `StepIndicator`는 `## BODY` 영역 내 **최상단**에 위치시키되, **`Container`로 감싸지 않고 독립 배치**합니다.
   - **Infobox / FullWidth 배치 예외**: `## HEADER` 직후 공지 성격의 내용이 올 경우 `Infobox / FullWidth` 컴포넌트를 사용하며, **`Container`로 감싸지 않고 독립 배치**합니다.
   - 높이 속성은 위 콘텐츠 양 규칙(Fill 또는 Hug)을 준수
3. **`## FOOTER`**:
   - **하단 고정 버튼(StickyButton / CTA)이 없는 경우**: `HomeIndicator`만 배치
   - **하단 고정 버튼(StickyButton / CTA)이 있는 경우**: `StickyButton(CTA)` + `HomeIndicator` 순차 배치

### D. 바텀시트(Bottom Sheet) 화면 규격 및 구조
바텀시트로 기획된 화면 역시 동일하게 규격 및 오토레이아웃을 적용하며 아래 레이어 구조를 준수합니다.

- **아트보드 규격**: 가로 `390px`, 세로 `844px` (Auto Layout 적용, 네이밍은 `화면ID_[화면을 나타내는 명칭]` 준수)
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
- **선택형 바텀시트 (List Component 매핑 규칙)**:
  - **컴포넌트 계층**: `BottomSheet` > `Item / BottomSheet` > `Slot` 내부에 **`Container 1`**을 배치하고 그 안에 `List` 컴포넌트들을 열거합니다.
  - **오토레이아웃 간격**: `List`들을 감싸는 `Container 1`의 Auto Layout **`gap: 8px` (`md` 토큰)**을 적용합니다.
  - **체크 활성화 상태 (Active/Selected)**:
    - 체크가 활성화된 `List`는 `hasSuffix: True` 설정
    - 하위 계층: `Slot-Suffix` > `Item / Suffix`에서 `variant: checkMark` 적용
  - **데이터 매핑**: 기획서에 명시된 리스트 항목 텍스트를 `List` 컴포넌트에 순차적으로 1:1 매핑합니다.

---

## 3. Figma Auto Layout & Naming Rules (피그마 오토레이아웃 및 네이밍)
- **기본 레이아웃 원칙**: `## BODY` 내부를 구성하는 모든 블록 요소는 기본적으로 **Auto Layout**을 적용합니다. (단, StepIndicator 및 Infobox / FullWidth 제외)
- **좌우 여백 기본 규칙**: `Container [순번]`으로 감싸는 모든 프레임의 **좌우 패딩(padding-left, padding-right)은 `20px` (`2xl` 토큰)**을 기본 적용합니다.
- **수직 간격(Spacing) 적용 방식**: 요소 간의 상하 간격은 개별 요소의 margin 대신, 해당 요소를 감싸는 오토레이아웃 프레임의 **`padding-top` 값에만 지정된 간격 토큰을 적용**합니다. (padding-bottom은 0 또는 컴포넌트 규격 유지)
- **레이어 네이밍 (순차 부여)**:
  - `## BODY` 내에서 위에서 아래로 배치되는 오토레이아웃 프레임의 레이어명은 **`Container 1`**, **`Container 2`**, **`Container 3`**과 같이 숫자를 순차적으로 증가시켜 명명합니다.
- **컴포넌트별 그룹핑 및 레이아웃 규칙**:
  - **InputField 연속 배치**: 단일 오토레이아웃 프레임(`Container [순번]`)으로 묶고, 내부 간격은 Auto Layout **`gap: 20px` (`2xl` 토큰)**을 적용합니다.
  - **조회기간 컨트롤 (SegmentedControl + InputField)**:
    - `SegmentedControl` 하단에 `InputField (variant: date-date)`가 위치할 경우, 두 요소를 Auto Layout으로 그룹핑하고 레이어명을 **`Group`**으로 지정합니다.
  - **Card / Surface 연속 배치**: 카드 컴포넌트들이 열거될 경우 단일 오토레이아웃 프레임(`Container [순번]`)으로 그룹핑하고, 내부 간격은 Auto Layout **`gap: 12px` (`lg` 토큰)**을 적용합니다.
  - **DataList (일반 수평 데이터 열거 구조)**:
    - 레이블과 데이터가 수평으로 놓이는 일반적 구조(예: 증명구분 | 한글잔액증명 등)는 `DataList (layout: split, size: 14)` 컴포넌트를 사용합니다.
    - 구조: 상단 `Divider / Horizontal` + `DataList` 목록 + 하단 `Divider / Horizontal`
    - Divider Spec: `thickness: 1px`, `tone: tertiaryMuted`, `length: full`
    - 그룹핑 및 간격: 위 요소를 모두 묶어 단일 오토레이아웃 프레임(`Container [순번]`)으로 그룹핑하고 Auto Layout **`gap: 16px` (`xl` 토큰)**을 적용합니다.
  - **DataList 후속 공지 문구 (TextList / Unordered)**:
    - `DataList` 그룹 바로 다음에 공지 성격의 문구가 위치할 경우 `TextList / Unordered` 컴포넌트를 열거합니다.
    - 그룹핑 및 간격: 해당 요소들을 `Container [순번]`으로 감싸고 **`padding-top: 12px` (`lg` 토큰)**을 적용합니다.
  - **일반 본문 TextList 연속 배치**:
    - `Infobox / Card`, `Card`, `알려드립니다(Accordion)` 외부의 일반 본문에 쓰이는 `TextList`가 여러 개 열거될 경우, 오토레이아웃으로 그룹핑하고 **기본 `gap: 12px` (`lg` 토큰)**을 적용합니다.
  - **Form 내 Accordion 배치**: 폼 형태로 열거되는 도중 위치하는 `Accordion`은 오토레이아웃을 적용하여 **`Container [순번]`**으로 명명하고, **`padding-top: 20px` (`2xl` 토큰)**을 적용합니다.

---

## 4. Spacing Tokens & Layout Rules

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

### B. ## HEADER 직후 간격 (해당 Container의 padding-top에 적용)
| 케이스 | 배치 요소 | padding-top 수치 (적용 토큰) | 비고 |
| --- | --- | --- | --- |
| Case 1 | `## HEADER` 바로 아래 **Title / Page** | `24px` (`3xl`) | `Container [순번]`으로 감쌈 |
| Case 2 | `## HEADER` 바로 아래 **검색 인풋(Search Input)** | `0px` (여백 없음 / padding-top: 0) | |
| Case 3 | `## HEADER` 바로 아래 **박스 형태의 데이터 UI (Data Card/Box)** | `24px` (`3xl`) | |
| Case 4 | `## HEADER` 바로 아래 **타이틀 및 인풋 그룹 (Title & Inputs)** | `24px` (`3xl`) | |
| Case 5 | `## HEADER` 바로 아래 **공지 성격 (Infobox / FullWidth)** | `0px` (여백 없음) | Container로 감싸지 않음. **이 컴포넌트 바로 다음에 오는 Container는 `padding-top: 32px` (`5xl`) 적용** |

---

### C. 컴포넌트 배치 간격 및 옵션 규칙
- **단일 인풋 간 간격**: `Container [순번]` 내부 Auto Layout **`gap: 20px` (`2xl`)** 적용
- **Card / Surface 간 간격**: `Container [순번]` 내부 Auto Layout **`gap: 12px` (`lg`)** 적용
- **DataList 일반 그룹 내부 간격**: 상·하단 Divider 포함 `Container [순번]` 내부 Auto Layout **`gap: 16px` (`xl`)** 적용
- **선택형 바텀시트 List 간 간격**: `Container 1` 내부 Auto Layout **`gap: 8px` (`md`)** 적용

#### TextList 사이즈 및 그룹 간격 규칙
- **컴포넌트 내부 삽입 시 (`size: 14`)**:
  - `Infobox / Card`, `Card`, `알려드립니다(Accordion)` 내에 들어가는 `TextList`는 Property **`size: 14`**를 적용합니다.
- **일반 본문 사용 시 (`size: 16`)**:
  - 위 컴포넌트 내부를 제외한 일반 본문에 위치하는 `TextList`는 Property **`size: 16`**을 적용합니다.
  - 연속 열거 시 오토레이아웃 그룹핑 후 **`gap: 12px` (`lg` 토큰)**을 적용합니다.

#### 완료 화면(Completion Screen) 전용 레이아웃 규칙
- **상단 Feedback 영역**:
  - `## BODY` 최상단에 `Feedback` 컴포넌트를 위치시키고 `Container 1` 오토레이아웃으로 감쌉니다.
  - 패딩 설정: **`padding-left: 20px` (`2xl`)**, **`padding-right: 20px` (`2xl`)**, **`padding-top: 40px` (`6xl`)** 적용
  - 하위 계층: `Item / Feedback`에서 status 아이콘을 **`status-circleCheck`**로 지정합니다.
- **후속 DataList 그룹핑 및 간격**:
  - Feedback 다음에 열거되는 데이터 콘텐츠는 `Container [순번]`으로 그룹핑합니다.
  - 그룹 내부 구조: `Title / Element` (기획에 따라 노출/비노출) + `Divider / Horizontal` (`thickness: 1px`, `tone: quaternary`, `length: full`) + `DataList (layout: split, size: 14)`
  - 오토레이아웃 간격: 해당 `Container [순번]` 내부 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용
  - 그룹 간 간격: 이 Container 그룹과 다음에 열거되는 동일한 DataList 그룹 간에는 **`padding-top: 24px` (`3xl` 토큰)**을 적용합니다.

#### 특수 공지 및 상태별 컴포넌트 규칙
- **DataList 직후 공지 문구**:
  - `DataList` 그룹 바로 아래 공지 문구가 올 경우 `TextList / Unordered` 사용
  - 그룹핑 및 간격: `Container [순번]`으로 감싸고 **`padding-top: 12px` (`lg` 토큰)** 적용
- **Title / Page 직후 단일 공지 문구**:
  - `Title / Page` 다음에 공지 성격의 단일 문구가 나오는 경우 `Infobox / Solid` 컴포넌트 사용
  - Property: `size: medium`, `status: warning`, `hasSuffix: false`
  - 그룹핑 및 간격: 해당 컴포넌트를 `Container [순번]`으로 감싸고 **`padding-top: 32px` (`5xl` 토큰)** 적용
  - 후속 간격: 이 Container 바로 다음에 위치하는 `Container [순번]`은 **`padding-top: 24px` (`3xl` 토큰)** 적용
- **화면 하단 공지형 카드 (Infobox / Card)**:
  - 화면 하단에 '알려드립니다' 대신 공지 성격의 내용을 넣을 때 `Infobox / Card` 컴포넌트 사용
  - 영역 제어: `Title Area`, `Slot-Contents`, `Button Area` 요소를 기획에 따라 선택적으로 노출/숨김 처리하고 `Slot-Contents` 내에 콘텐츠 배치
  - 그룹핑 및 간격: `Container [순번]`으로 감싸고 **`padding-top: 32px` (`5xl` 토큰)** 적용
- **화면 하단 아코디언 공통 패턴 ("알려드립니다" Accordion + Divider)**:
  - 구성 컴포넌트: `Divider / Horizontal` + `Accordion` 조합
  - Divider Property: `thickness: 10px`, `tone: tertiaryMuted`, `length: full`
  - Accordion Property: `type: basic`, `variant: standard`, `size: medium`, `hasPrefix: True`, `Item / Prefix Icon: solid-info-circle`
  - 그룹핑 및 간격: 위 `Divider`와 `Accordion`을 묶어 **`Container [순번]`** 오토레이아웃 프레임으로 그룹핑하고 **`padding-top: 32px` (`5xl` 토큰)** 적용
- **Empty State (Feedback 컴포넌트)**:
  - `Container`로 감싸진 `Title / Page` 다음에 조회된 내용 및 데이터가 없는 `Feedback` 컴포넌트가 위치할 경우:
    - **Property**: `variant: small` 사용
    - **그룹핑 및 간격**: `Feedback` 컴포넌트를 `Container [순번]`으로 감싸고 **`padding-top: 48px` (`7xl` 토큰)** 적용

---

### D. 안내성 컴포넌트 ("알아두세요" Box)
- **그룹 박스**: 모서리 라운드 및 배경색이 적용된 정보 안내 박스 UI
- **내부 타이틀과 불릿 리스트 간격**: `12px` (`lg`)
- **불릿 리스트 항목 간 간격 (Item-to-Item Gap)**: `8px` (`md`)

---

## 5. Workflow & Processing Order (작업 지침)
1. **Figma 링크 분석 및 화면 식별/네이밍**:
   - 사용자가 전달한 Figma 와이어프레임 링크(또는 JSON/구조)에서 화면 흐름을 파악하고 일반/완료/바텀시트 화면 여부를 판별합니다.
   - 기획서 내 중괄호(`{ ... }`) 표기 명칭을 기반으로 생성할 아트보드 레이어명을 **`화면ID_[화면을 나타내는 명칭]`** 형식으로 확정합니다.
2. **아트보드 및 루트 프레임 세팅**:
   - **일반 및 완료 화면**: 가로 `390px` 기준 프레임 생성 후 `## HEADER`, `## BODY`, `## FOOTER` 3단 구조 세팅 (콘텐츠 양에 따라 Fill / Hug 적용).
   - **바텀시트 화면**: 가로 `390px * 844px` 프레임에 `Dimmed` 배경(Absolute) -> `BottomSheet` -> `StatusBar`(Absolute, iOS/light) -> `HomeIndicator` 구조로 세팅.
   - **공통 Body 패딩**: `## BODY` 영역 하단에 **`padding-bottom: 32px` (`5xl`)**을 기본 세팅합니다.
3. **컴포넌트 매핑 및 Property 적용**:
   - 와이어프레임의 요소를 디자인 시스템 컴포넌트로 치환하고, 문서에 정의된 Property(`size`, `variant`, `layout` 등)를 Figma 우측 속성 패널 기준으로 일치시킵니다.
   - `TextList` 적용 시 위치에 따라 Property `size: 14` 또는 `size: 16`을 분기 적용합니다.
   - **완료 화면**: 상단에 `Feedback` (`status-circleCheck`)을 `Container 1`로 감싸고 `padding-top: 40px` (`6xl`)을 부여하며, 후속 `DataList` 그룹에는 `tone: quaternary`인 Divider 및 `gap: 12px` (`lg`)을 적용합니다.
   - 텍스트 강조 및 인라인 링크 스타일 규칙을 엄격히 적용합니다:
     - 상태 강조는 `text/status`, 일반 강조는 `text/accent` 토큰 사용
     - 문장 내 링크 텍스트는 `text/neutral/secondary` + `Bold` Text Style + `Underline (Offset: 25%)` 적용
   - 독립 배치 요소 처리: `StepIndicator`와 `Infobox / FullWidth`는 `## BODY` 내에서 Container 없이 단독 배치합니다.
   - `SegmentedControl` + `InputField (date-date)` 조합은 Auto Layout 후 레이어명을 `Group`으로 지정합니다.
   - 일반 `DataList`는 `layout: split, size: 14` 적용 후 상하에 1px Divider(`tone: tertiaryMuted`)를 포함하여 `Container`로 묶고 `gap: 16px` (`xl`)을 설정합니다.
   - `DataList` 바로 아래 공지 문구는 `TextList / Unordered`로 매핑하고 Container의 `padding-top: 12px` (`lg`)을 적용합니다.
   - `Title / Page` 직후 공지 문구는 `Infobox / Solid (size: medium, status: warning, hasSuffix: false)`로 매핑합니다.
   - 하단 공지 영역은 유형에 따라 `Infobox / Card` 또는 `Divider(10px) + Accordion(solid-info-circle)`으로 분기 적용합니다.
   - 선택형 바텀시트는 `Slot` 내부 `Container 1`에 `List`를 배치하고, 선택된 항목은 `hasSuffix: True`, `Slot-Suffix > Item / Suffix`를 `checkMark`로 설정합니다.
   - 데이터 없음 상태일 경우 `Feedback` 컴포넌트의 variant를 `small`로 설정합니다.
4. **오토레이아웃 및 네이밍 구조화**:
   - `## BODY` 내부 블록을 `Container 1`, `Container 2` 등으로 순차 명명하고, 좌우 패딩 `20px` (`2xl`)을 기본 적용합니다.
   - 상황별 `padding-top` 토큰 규칙을 엄격히 적용합니다:
     - 완료 화면 상단 Feedback: `40px` (`6xl`), 후속 동일 DataList 그룹 간: `24px` (`3xl`)
     - `## HEADER` 직후: Title/Page (`3xl`), Box (`3xl`), Search (`0px`)
     - `Infobox / FullWidth` 직후 Container: `32px` (`5xl`)
     - `Infobox / Solid`: `32px` (`5xl`), 그 직후 Container: `24px` (`3xl`)
     - `DataList` 직후 `TextList / Unordered` Container: `12px` (`lg`)
     - 일반 Form 내 Accordion: `20px` (`2xl`)
     - 하단 공지(`Infobox / Card`, 알려드립니다 그룹): `32px` (`5xl`)
     - Feedback (Empty State): `48px` (`7xl`)
   - 연속된 `InputField`는 `gap: 20px` (`2xl`), `Card / Surface`는 `gap: 12px` (`lg`), 일반 본문 `TextList`는 `gap: 12px` (`lg`), 바텀시트 `List`는 `gap: 8px` (`md`)으로 그룹핑합니다.
5. **토큰 기반 간격 검증**: 섹션 4에 정의된 간격 규칙(0px, `md`, `lg`, `xl`, `2xl`, `3xl`, `5xl`, `6xl`, `7xl` 등)이 올바르게 매핑되었는지 최종 확인 후 결과물을 출력합니다.