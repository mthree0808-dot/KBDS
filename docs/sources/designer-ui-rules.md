# UI Design & Code Generation Rules

이 문서는 Figma 와이어프레임을 바탕으로 일관된 UI 화면을 생성할 때 참조하는 디자인 가이드라인입니다.

## 1. Reference Sources (디자인 시스템)

### 문자·숫자 데이터 서체 분리 (2026-10-27 사용자 확정)
- **금액 입력 등 문자와 숫자 데이터가 명확히 분리되는 경우, 문자는 `KBFG Text`, 숫자는 `Pretendard`를 적용합니다. 숫자만으로 구성된 텍스트·입력값은 `Pretendard`를 사용합니다.** 예: 금액의 숫자 `123,000`은 Pretendard, 별도 단위 `원`과 항목명·안내 문구는 KBFG Text입니다. 숫자 데이터에 포함된 자릿수 구분자·소수점은 해당 숫자와 같은 서체를 적용합니다.
- 이 규칙은 데이터 서체에 대한 사용자 승인 변경으로, 해당 범위에서는 기존 컴포넌트의 서체 상속 규칙보다 우선합니다. 일반 문장에 숫자가 섞였다는 이유만으로 문장 전체를 Pretendard로 바꾸지 않습니다. 동일 Text 안에서도 문자·숫자가 명확히 분리된 데이터라면 해당 구간별로 매핑합니다.
- 최신 라이브러리의 해당 역할·크기·굵기에 맞는 원본 Text Style 및 서체 변수를 확인해 적용하며, `Pretendard Variable`로 대신하지 않습니다. 크기·굵기·행간·자간·색상·Hug/Fill과 컴포넌트 연결·공개 옵션은 보존하고, 서체를 분리하려고 detach하거나 레이어 구조를 불필요하게 바꾸지 않습니다.
- 최종 검수에서 문자 구간의 KBFG Text, 숫자 구간 및 숫자 전용 값의 Pretendard, 각 구간의 스타일·변수 연결과 입력·variant 전환 후 결과를 확인합니다. 이 문서 갱신만으로 기존 화면의 일괄 수정이 완료된 것으로 기록하지 않습니다.

### v0.95 약관 상세·약관 동의 레이아웃 갱신 (2026-10-27 사용자 확정)
- 이번 사용자가 지정한 7개 참조는 `Templates(작성중)` 페이지에 있더라도 **약관 상세 및 동의 레이아웃의 승인 기준**입니다. 페이지 이름만으로 적용을 보류하지 않습니다. 최신 라이브러리 `09eGMNTNnkE0CTxPdr7lnk`에서 원형을 직접 확인·import하고, 기획의 문구·개수·순서·선택 상태에 맞춥니다. 라이브러리 원본은 읽기 전용이며 산출물에서 적용합니다.
- **약관 상세**는 §2.G의 `Popup > Slot > ## HEADER / ## BODY / ## FOOTER` 구조를 사용합니다. **약관 동의 입력·선택**은 §4의 `ConsentGroup` / `Item / Consent` / `ConsentFinal` 조합을 사용합니다. 약관 동의 화면 전체를 자동으로 Popup으로 바꾸지는 않습니다.
- 이 갱신은 종전 약관 상세의 아트보드 직계 3단 구조·Container 1/2 유지 지시와, 종전 약관 동의의 `Depth 1~4` 일반 프레임·`Consent solid/basic`·수동 `Outline Container` 제작 규칙을 대체합니다. 해당 구형 구조를 새 약관 제작의 기본으로 사용하지 않습니다. 다른 유형의 일반 화면·키패드 Popup 규칙은 유지합니다.
- v0.95 참조의 `Title / Page > Item / Label(page)` 제목은 현재 Default 기준 **24px Medium / 행간 34px**입니다. 과거 22px/31px 실측값을 고정해 덮어쓰지 않고, 현재 원형 Text Style·font-size/title/3xl·line-height/title/3xl·font-weight/medium 변수 및 실제 모드를 유지합니다.

### 모든 컴포넌트는 최신 라이브러리 원형에서 직접 적용 (2026-10-23 사용자 확정)
- **모든 컴포넌트의 기준은 [MO 디자인 라이브러리](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=0-1)의 현재 원본**입니다. `Title / Page`에만 한정하지 않고 입력·약관·버튼·목록·인포박스·아이콘·헤더·푸터 등 전체에 적용합니다. 주변 화면이나 이전 제작본의 외형·스타일·변수·override를 기준으로 새 화면을 만들지 않습니다.
- 기획안에서는 문구·순서·상태·필수/선택·행동·화면 유형을 읽습니다. 기획안의 기존 인스턴스나 주변 화면은 필요한 컴포넌트의 역할을 찾는 단서일 뿐이며, 그 인스턴스의 수정된 텍스트·크기·색상·변수를 그대로 복제하지 않습니다. 사용자가 명시한 승인 예시는 구성·위계·간격 규칙의 근거로 유지하되, 하위 컴포넌트와 토큰은 최신 라이브러리 원형을 확인하여 적용합니다.
- 제작 전에 사용할 원본의 component key, 공개 속성, 실제 Slot 구성, Text Style key와 변수 연결을 직접 확인하고 **해당 라이브러리 컴포넌트를 import하여 새 인스턴스로 배치**합니다. 캐시·레지스트리·검증된 제작 스크립트는 탐색과 절차 재사용에만 사용하며 현재 원본 확인을 대신하지 않습니다. 현재 정의와 다른 오래된 로컬 원형이나 이전 화면의 clone을 최신 원형으로 간주하지 않습니다.
- Slot 안의 텍스트도 라이브러리에서 정의한 실제 하위 컴포넌트를 사용합니다. 예를 들어 `Title / Page`의 페이지 제목은 **`Item / Label (variant: page)`**, 현재 원본 Medium 스타일(v0.95 Default 기준 24px)과 `font-weight/medium` 연결을 유지하고 문구만 매핑합니다. 기획의 Bold 일반 Text를 그대로 넣거나 모든 컴포넌트의 굵기를 일괄 Medium으로 바꾸지 않습니다. 다른 컴포넌트 역시 각각의 원본 Weight·색상·크기·행간·서체 변수를 따릅니다.
- 원형 내부의 Hug/Fill/Fixed, 패딩·간격, 스타일·변수와 공개 속성 연결을 보존합니다. 일반 래퍼용 Auto Layout 처리를 모든 인스턴스에 일괄 적용하지 않습니다. 기획에 없는 더미 제목·설명·툴팁·아이콘은 원형 공개 속성으로 숨기고, 필요한 아이콘은 라이브러리 원본을 instance-swap으로 지정합니다. 문서에 명시된 높이·간격 등 사용자 교정은 해당 범위에만 적용합니다.
- 완료 전 라이브러리 원본과 실제 인스턴스·텍스트 구간의 style/variable key, Slot 계층, 크기 모드, 문구·상태를 대조하고 화면의 잘림·겹침을 확인합니다. variant·size·선택·가시성·instance-swap 등 편집 옵션은 원본이 지원하는 연결과 전환을 유지합니다. 현재 원형을 확인하지 못했거나 전환 검수가 실패하면 주변 화면으로 추정 대체하거나 정상 완료로 보고하지 않습니다.

### Infobox / Card 버튼은 원형 Button Area 사용 (2026-10-23 사용자 확정)
- 인포박스 안에 버튼이 필요하면 [라이브러리 기준25386:80100](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=25386-80100)처럼 **`hasButton: true`로 원형 `Button Area`를 노출**합니다. **`Slot-Contents` 안에 버튼을 넣지 않습니다.**
- 계층은 **`Infobox / Card > Slot-Contents`(본문)와 `Infobox / Card > Button Area > TextButton`(버튼)**입니다. 두 영역은 인포박스의 직계 형제이며 원형 인스턴스와 공개 속성을 유지합니다. 버튼을 담으려고 Slot 안에 별도의 Button Area를 만들거나 detach하지 않습니다.
- 참조 TextButton은 **secondary / xsmall / hasPrefix false / hasSuffix true / underline false**, 우측 원형 `line-chevron-right`, Hug·Hug 및 문구 WIDTH_AND_HEIGHT를 사용합니다. 원형 Button Area는 Horizontal / Fill·Hug / 우측 정렬(MAX)·수직 center / gap12px / padding-top4px입니다. Slot-Contents gap8px와 원형 padding은 보존합니다.
- 제목·prefix·suffix는 기획에 필요한 경우에만 해당 공개 속성으로 노출합니다. 버튼 구조 교정을 이유로 참조의 더미 제목·아이콘·본문을 추가하지 않고 기존 안내 문구·목록·버튼명을 유지합니다. 기준 작업 인포박스는 [2180:8644](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2180-8644)의 `앱 알림 설정`입니다.


### Feedback 후속 콘텐츠 간격 (2026-10-23 사용자 확정)
- **`Feedback` 다음에 별도의 본문·설명·목록 등 후속 콘텐츠 블록이 이어지는 경우 외부 간격은 40px (`spacing/6xl`)**로 적용합니다. 일반 BODY 기본 gap 32px보다 우선하며 완료 화면의 후속 데이터뿐 아니라 [재외국민 비대상 안내 2157:9320](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2157-9320)처럼 안내 뒤 콘텐츠가 이어지는 화면에도 적용합니다.
- 참조 화면은 `## BODY` > `Container 1`(실제 Feedback) → `Container 2`(후속 안내) 구조이며 BODY의 itemSpacing을 **32px에서 40px로 교정**했습니다. Feedback 하단 경계부터 다음 콘텐츠 상단 경계까지 실제 간격 40px를 확인합니다. 래퍼 패딩과 gap을 중복 가산하거나 빈 프레임으로 여백을 만들지 않습니다.
- 이 규칙은 **Feedback 뒤의 외부 간격**입니다. Feedback 내부 아이콘·제목·보조 문구 간격, BODY 상단 패딩, 후속 콘텐츠 내부 Title / Section → 콘텐츠 16px·반복 Title / TextList Group 사이24px는 각각 유지합니다. 앞쪽 `Chip / Basic` → Feedback의24px 규칙도 변경하지 않습니다.


### 항목에 포함된 스위치 크기 (2026-10-23 사용자 확정)
- [빠른 로그인 기준 2347:15715](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2347-15715)처럼 항목에 스위치를 조합하는 경우, 실제 스위치 컴포넌트의 공개 속성을 **`size: medium`**으로 설정합니다. 빠른 로그인과 같은 설정 항목의 스위치에 동일하게 적용합니다.
- 너비·높이를 임의로 조절해 medium 외형을 흉내 내지 않고 원본 인스턴스와 공개 size 속성을 사용합니다. 기획의 켜짐·꺼짐 및 비활성 상태, 레이블, 기존 항목 구조·간격·서체·변수 연결은 유지합니다.


### 키패드·패턴 입력 화면의 Popup 및 AppBar 제목 (2026-10-23 사용자 확정)
- 앞으로 **키패드 입력 화면과 패턴을 그리는 화면은 원본 `Popup` 컴포넌트 틀**로 제작합니다. 이 유형은 일반 화면의 최상위 3단 구조보다 본 최신 사용자 지시를 우선합니다. 기존 인증 화면 모두를 Popup으로 확대하는 규칙은 아닙니다.
- 구조는 `StatusBar`(최상단 Absolute) + `Popup > Slot > Header / Body / Footer`이며, 기존 본문·입력 컴포넌트·키패드·패턴의 원형 연결과 속성·문구·배치를 유지합니다. 키패드 화면 Body의 padding-top 24px 규칙도 유지합니다.
- **AppBar는 `variant: sub`, `hasTitle: true`**로 설정하고 KB 로고를 노출하지 않습니다. [승인 기준 2380:12952](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2380-12952)처럼 AppBar의 **`Label` Auto Layout 안 `타이틀`**에 이전 화면에서 쓰던 실제 AppBar 제목을 적용합니다. 기준의 제목은 `KB국민인증서 발급`이며 다른 흐름에 이 문구를 고정 복사하지 않습니다.
- 이전 화면의 AppBar 제목을 그대로 이어받고, 아트보드명·페이지 ID·본문 입력 안내를 제목으로 대신하지 않습니다. 원형 Title Text Style·서체·변수·Label 구조를 유지하며, 기존 hasTitle false는 이 유형에서 최신 true 지시로 교정합니다. 닫기 버튼과 기획의 입력 상태도 보존합니다.


### 섹션 제목·반복 제목 목록 그룹 간격 (2026-10-22 사용자 확정)
- **`Title / Section` 다음 콘텐츠와의 외부 gap은 16px (`spacing/xl`)**입니다. Text·TextList Group 등 후속 콘텐츠의 종류와 관계없이 적용합니다. `TextList Group` 내부 항목 간격 8px와 혼동하지 않습니다.
- **반복되는 `Title / TextList Group` 사이의 기본 gap은 24px (`spacing/3xl`)**입니다. 각 그룹 내부의 Title / Section → TextList Group은 16px, 그 안의 반복 TextList 항목 간격은 기존 8px를 유지합니다. 부모 래퍼 이름이 `Title / Contents`여도 반복 그룹 사이에는 24px를 적용합니다.
- [전자칩 태그 기준 2153:8503](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2153-8503)의 두 Title / TextList Group 내부는 각각 16px, 두 그룹을 감싼 Title / Contents는 24px입니다. 종전 제작본의 내부 8px·그룹 사이 16px는 승인 기준이 아닙니다.


### 이미지 영역 다음 콘텐츠 기본 간격 (2026-10-22 사용자 확정)
- **`Image Area` 또는 단독 `ImageContainer` 다음 콘텐츠와의 기본 외부 gap은 24px (`spacing/3xl`)**입니다. 후속 콘텐츠 종류와 무관하게 적용하고 일반 BODY gap 32px보다 우선합니다. 사용자가 별도로 명시한 간격이 있으면 해당 지시를 따릅니다.
- Image Area로 감싼 구성은 **Image Area의 바깥 경계부터** 다음 콘텐츠까지 24px, ImageContainer 단독 구성은 **ImageContainer의 바깥 경계부터** 다음 콘텐츠까지 24px를 적용합니다. 이미지 내부와 래퍼 외부에 각각 24px를 중복 적용하거나 빈 프레임·추가 padding으로 간격을 늘리지 않습니다. 기존 Image Area 내부 패딩·이미지 크기·Title / Page → Image Area gap 0px는 유지하며, 승인된 Image Area 전체를 빈 ImageContainer로 대체하라는 뜻은 아닙니다.

### 키패드 화면 BODY 상단 패딩 (2026-10-22 사용자 확정)
- [키패드 화면 2071:3356](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2071-3356)을 기준으로, 키패드가 포함된 화면의 **`## BODY`는 `padding-top: 24px` (`spacing/3xl`)**로 적용합니다. 기존 키패드 템플릿의 다른 상단 패딩보다 이 최신 값을 우선합니다.
- 24px는 `## BODY` 자체에 적용하며 하위 Container의 padding-top이나 빈 프레임으로 중복 추가하지 않습니다. Keypad 원형 내부 패딩·숫자 배치·variant와 HEADER·FOOTER, BODY의 다른 패딩·간격은 이 변경으로 수정하지 않습니다. BottomSheet의 Slot 패딩을 바꾸는 규칙은 아닙니다.

### Infobox 후속 간격·선택 그룹 간격·임의 강조 금지 (2026-10-21 사용자 최종 교정)
- **Infobox / Card 다음 콘텐츠**: 콘텐츠 종류와 무관하게 바로 다음 콘텐츠와의 외부 간격은 **24px (`spacing/3xl`)**로 적용합니다. 각각을 감싼 Container 사이에도 같은 실제 간격을 적용하며 BODY 기본 32px 및 종전 Infobox / Card → TextList 12px보다 우선합니다. 카드 내부 Slot·TextList 간격이나 카드 앞쪽 Title·InputField와의 간격은 이 규칙으로 변경하지 않습니다. 빈 프레임·중복 padding으로 간격을 더하지 않습니다.
- **선택 그룹 내부 간격**: `Radio Group`과 `Checkbox Group`(기존 표기 `CheckBox Group` 포함)의 반복 항목 사이 gap은 **20px (`spacing/2xl`)**입니다. Horizontal·Vertical 모두 적용하고 Grid는 행·열 gap 모두 20px로 설정합니다. 개별 Radio·CheckBox 원형 내부 간격, 단일 CheckBox 래퍼 gap 0, Title / Element와 그룹 사이 gap 16px는 별도 규칙을 유지합니다.
- **기획에 없는 문장 내 강조·링크 추가 금지**: 메뉴명·대괄호·다른 화면을 언급하는 문장이라는 이유만으로 Bold/Medium, 강조색, 밑줄, hyperlink·이동 동작을 추가하지 않습니다. 기획 또는 사용자 지시에 명시된 구간에만 해당 강조·링크 규칙을 적용합니다. `[고객정보조회(개인정보열람)]`처럼 기획에 강조·링크가 없는 구간은 주변 일반 본문과 동일한 원본 Text Style·Weight·색상을 유지합니다. 링크 스타일 규칙은 이미 링크로 확정된 구간의 표현 방법이며, 링크 여부를 임의 판정하는 근거가 아닙니다.
- **기획에 있는 강조는 반드시 반영 — 동일 크기 Medium (2026-10-21 최종 명확화)**: 위 금지 규칙은 기획의 강조·링크를 생략하라는 뜻이 아닙니다. 기획에 표시된 강조 구간과 링크는 보존하며, 본문 강조 굵기는 **현재와 동일한 텍스트 크기·계열의 `medium` 변수에 연결된 원본 Medium Text Style로만** 변경합니다. 기획에서 Bold로 표현했더라도 강조 의도를 동일 크기 Medium으로 매핑하고 Bold·Semibold·크기 확대·고정 fontWeight 값으로 대신하지 않습니다. 예: 14 Light → 14 Medium, 16 Light → 16 Medium. 굵기만 강조된 경우 색상·밑줄·링크를 덧붙이지 않고, 색상·밑줄·링크는 각각 기획에 명시된 표현만 따릅니다. 실제 링크 구간의 굵기도 Medium 기준을 우선합니다. 제목·CTA 등 DS 컴포넌트의 원형 Weight 전체를 일괄 Medium으로 바꾸는 규칙은 아닙니다.

### 인포박스 단일 안내와 본문 섹션 제목 (2026-10-21 사용자 재확정)
- **인포박스 안의 단일 안내 항목**: [발급폐기내역조회 2158:10984](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2158-10984)처럼 인포박스 콘텐츠에 `TextList / Unordered`가 하나만 들어가는 경우, 불릿 없는 일반 텍스트로 구성합니다. 한 항목이 여러 줄로 줄바꿈되거나 문장을 여러 개 포함해도 항목 수를 늘려 해석하지 않습니다. 일반 텍스트는 `Text` Vertical Auto Layout(gap·padding 0, Fill·Hug) > 편집 가능한 `Content`로 감싸고 원본 Text Style·변수·색상 연결을 유지합니다. Infobox / Card는 기존 단일 항목 규칙의 `Dynamic/Body/xs∙14∙Light` 및 `text/neutral/tertiary`를 따르고, 다른 인포박스는 각 원형의 해당 본문 스타일을 유지합니다. 복수 안내 항목의 TextList와 인포박스 밖 일반 본문의 단일 TextList 유지 규칙은 구분합니다.
- **본문 구획의 제목은 실제 Title / Section 사용**: [재외국민 비대상 안내 2157:9320](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2157-9320)의 `재외국민이란?`, `재외국민 등록방법(1가지 선택)`처럼 뒤따르는 설명·목록을 대표하는 섹션 제목은 실제 **`Title / Section` 컴포넌트 인스턴스**로 구성합니다. 일반 Text에 Medium/Bold를 적용하거나 래퍼 이름만 Title로 바꾸어 대신하지 않습니다. 제목 문구만 매핑하고 원형 서체·Weight·스타일·변수·공개 속성을 유지하며, 기획에 없는 SubTitle·Description·아이콘·suffix는 원형 노출 속성으로 숨깁니다. 아래 설명은 일반 Text, 목록은 해당 TextList 규칙을 따릅니다. 제목으로 보이는 외형뿐 아니라 실제 인스턴스·mainComponent key를 검수합니다.

### Chip 가로 스와이프·Data Block 아웃라인·데이터 없음 아이콘 (2026-10-21 사용자 확정)
- **Chip 직후 콘텐츠 간격 (2026-10-21 최종 교정)**: `Chip / Basic` 다음에 **`Feedback` 또는 이를 감싼 `Feedback` 래퍼가 오는 경우**, 부모 Auto Layout의 **gap은 24px (`spacing/3xl`)**로 설정합니다. [승인 기준 2180:10209](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2180-10209)을 참조하며, 이 경우에는 종전 8px 규칙보다 24px 예외를 우선합니다. `Data Block Group`·목록·일반 본문 등 **그 밖의 다음 콘텐츠와의 gap은 8px (`spacing/md`)**을 유지합니다. Chip 원형의 내부 패딩, Data Block Group 내부 반복 박스 간격, Feedback 래퍼 내부 패딩은 별도 규칙대로 유지합니다. 빈 프레임이나 중복 padding-top으로 외부 간격을 추가하지 않습니다.
- **Chip / Basic의 기획 방식 보존**: [사용자 수정 기준 2158:8074](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2158-8074)처럼 기획이 좌우 스와이프를 표현한 경우, Chip은 한 줄 가로 스와이프/스크롤 형태로 구성하고 우측 확장·접기 화살표를 노출하지 않습니다. `hasControl: false`, `extended: false`, Slot Horizontal / NO_WRAP과 원본 클리핑을 유지합니다. 모든 항목을 한 화면에 보이게 하려고 확장형·여러 줄·폰트 축소·문구 생략으로 바꾸지 않습니다. 뒤 항목이 일부 보이거나 뷰포트 밖에 있는 것은 가로 스와이프 기획의 일부입니다. 항목명·순서·선택 상태·원본 variant 및 전환 연결을 보존합니다. 속성 값만 false인지 보지 말고 실제 ControlContainer와 화살표가 비노출인지 확인합니다. 프로토타입 스크롤 동작을 구현·완료 보고할 때는 실제 가로 스크롤 설정과 동작을 별도로 검증합니다.
- **Infobox / Card와 이어지는 Data Block**: 위 사용자 수정본처럼 상단 회색 Infobox / Card와 Data Block의 솔리드 배경이 반복되어 시각적으로 중첩되는 경우, 하단 Data Block은 **아웃라인형**을 사용합니다. Fill `surface/neutral/quaternary-muted` + Border `border/neutral/secondary-muted` + `stroke/md`, padding·radius 20px를 적용하고 DataList의 문구·순서·스타일·변수·기존 간격을 보존합니다. 역할명은 Data Block이며 Card / Surface로 바꾸지 않습니다. 이 경우 아래 일반적인 아웃라인/회색 무테 선택 재량보다 본 규칙을 우선합니다. 다른 맥락의 회색 무테 허용까지 전역 폐지하지는 않습니다.
- **데이터가 없는 경우의 아이콘**: 조회 결과·이력·내역 등 표시할 데이터가 없는 모든 Empty State의 Feedback은 [기준 2150:14233](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2150-14233)처럼 **`status-nodata`** 원본 아이콘을 사용합니다. `status-noResult` 돋보기·검색 아이콘, 경고·완료 아이콘 등으로 임의 대체하지 않습니다. `Item / Feedback`의 공개 status instance-swap 속성으로 연결하고 실제 mainComponent key까지 확인합니다. Feedback 크기·문구·간격은 해당 Empty State 규칙을 유지하며, 아이콘 통일을 이유로 완료 화면 Large 규칙을 빈 상태에 적용하지 않습니다.

### 은행·증권사 선택 화면 통일 (2026-10-20 사용자 최종 확정)
- 앞으로 은행·증권사 선택 화면은 [은행/증권사 선택 2101:12453](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2101-12453)을 공통 기준으로 재사용합니다. 종전 `2109:3661`의 심볼 매핑만 참고하는 범위를 넘어, 바텀시트·Tab·GridButton·아이템·기관 심볼의 구성과 속성을 함께 통일합니다. 다른 선택형 버튼의 일반 primary/grid 예시보다 이 전용 기준을 우선합니다.
- **바텀시트와 Tab**: 제목은 `은행/증권사 선택`, 닫기 버튼을 유지합니다. BottomSheet의 `hasScrollDim: true`, `hasStickyButton: true`를 유지하고 StickyButton은 `hasCTA: false`, `hasSubButton: false`, `hasScrollDim: true`로 하단 스크롤 딤만 표시합니다. Slot은 가로 Fill·세로 Hug / padding `0 0 20px` / gap 24px이며, 직계 자식은 `Tab` → `GridButton` 순서입니다. Tab은 `1depth / extendable: false`, 은행·증권사 두 항목과 기획의 선택 상태를 사용합니다.
- **기관 Grid**: GridButton은 `variant: secondary / type: grid`, 가로 Fill·세로 Hug / 좌우 padding 20px입니다. 내부 Slot의 실제 Grid Auto Layout은 3열 균등 FLEX 1, 행·열 gap 8px, 행 높이 Hug를 유지합니다. 참조의 18개·6행은 현재 은행 목록의 결과이며 실제 행 수는 기획 항목 수에 맞춥니다. 기관명·순서·중복·선택/비활성 상태는 기획대로 보존합니다.
- **기관 아이템과 심볼**: `Item / Vertical`은 secondary / hasIcon true / hasSubLabel false, padding 16px / gap 12px / Grid 셀 가로·세로 Fill을 유지합니다. 참조의 셀 높이는 100px이며 고정 3열 기준 현재 폭은 약 111.33px입니다. IconContainer는 size 36, Label과 내부 문구는 원본 Hug·서체·변수를 유지합니다. 기관별 원본 심볼을 공개 instance-swap 속성으로 매핑하고 기본 ICON·공통 아이콘·다른 기관 심볼로 대체하지 않습니다. 카드·List·primary GridButton으로 임의 변형하지 않습니다.

### CTA Label Hug 및 은행·증권사 심볼 (2026-10-20 사용자 확정)
- **CTA 문구는 원본 Hug 상속**: `StickyButton > ButtonGroup > BoxButton > Label > 버튼명`에서 Label과 내부 텍스트의 원형 가로·세로 Hug를 유지합니다. 텍스트는 원형 `textAutoResize: WIDTH_AND_HEIGHT`를 상속하며 문구만 변경합니다. `resize()`·고정 width·`textAutoResize: HEIGHT`·일반 본문용 Fill/자동 높이 처리를 버튼명에 적용하지 않습니다. CTA 바깥 버튼의 Fill 또는 원형 높이와 내부 Label/문구의 Hug는 구분합니다.
- **크기 override 금지 및 검수**: 원본이 이미 Hug이므로 매번 크기 속성을 재설정하지 않습니다. 잘못된 크기 override만 제거하고 문구·상태·아이콘·원형 서체·스타일·변수를 보존합니다. `49px` 등 현재 측정된 폭은 Hug의 계산 결과일 수 있으므로 숫자만으로 고정폭 여부를 판단하지 않고 Resizing과 override를 확인합니다. 문구 변경 뒤 자연스럽게 폭이 갱신되는지 검수합니다.
- **은행·증권사 선택은 실제 기관 심볼 매핑**: [은행/증권사 선택 2109:3661](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2109-3661)처럼 `GridButton > Slot > Grid > Item / Vertical > IconContainer`를 유지하고 IconContainer의 공개 instance-swap 속성에 해당 은행·증권사의 원본 심볼을 적용합니다. 기본 `ICON`, 공통 아이콘, 임의 로고나 다른 기관 심볼로 대신하지 않습니다. 이 유형은 도움말 목록에서 작업자가 아이콘을 지정하도록 기본 아이콘만 두는 예외와 구분합니다.
- **범위와 출처**: 기획의 항목명·순서·중복·선택 상태와 Grid 행·열 구성을 보존합니다. 심볼은 MO 디자인 라이브러리 `09eGMNTNnkE0CTxPdr7lnk`의 F07. System Icon 페이지 `1:672` > `04 로고`(`18273:39357`)에서 기관명·기관 코드·component key를 확인하여 사용합니다. 은행은 `logo/bg/bank/` 원본을 우선하며 증권사는 해당 증권사 원본을 확인합니다. IconContainer의 원형 크기와 인스턴스 구조를 유지하고 detach·직접 그리기를 하지 않습니다. 심볼을 확인하지 못하면 다른 기관으로 추정 대체하지 않고 미확인으로 명시합니다.

### 사용자 승인 갱신 (2026-10-19): Tab 후속 간격과 조회 내역
- **Tab 후속 일반 콘텐츠 간격과 계층**: 1depth·2depth·3depth Tab 다음에 Infobox / Card, 입력, 목록, Data Block 등 일반 콘텐츠가 이어지면 **gap 24px (`spacing/3xl`)**을 적용합니다. 이 구간은 아래 BODY 기본 gap 32px보다 우선합니다. 같은 콘텐츠 블록은 하나의 `Container [순번]` 안에 구성하며, 간격을 맞추기 위해 각 요소를 별도 Container로 감싼 뒤 외부 복합 래퍼에 넣지 않습니다. 패딩이나 빈 프레임으로 간격을 대신하지 않습니다. 별도 명시된 특수 Feedback 패턴은 해당 규칙을 따릅니다.
- **Tab + Infobox / Card 필수 구조 (2026-10-19 사용자 교정)**: `## BODY > Container 1 > Tab, Infobox / Card`로 구성합니다. `Tab`과 `Infobox / Card`는 **Container 1의 직계 자식**이며 Container 1의 Vertical Auto Layout gap에 `spacing/3xl`=24px를 연결합니다. `Tab / Infobox > Container 1, Container 2` 구조와, Tab·Infobox를 각각 Container로 감싸는 구조는 금지합니다. 이 규칙은 아래 일반 복합 그룹 네이밍 공식보다 우선합니다. Tab은 화면 폭을 채우고, Infobox / Card는 좌우 20px 여백이 남는 콘텐츠 폭으로 가운데 정렬합니다. 다음 독립 본문 블록은 형제 `Container 2`부터 순차 명명합니다.
- **건별 조회 내역의 Data Block 매핑**: 고객명·이용기관·이용서비스·인증완료처럼 한 건을 구성하는 사실 데이터는 와이어프레임의 평면 DataList Group·상하 Divider 형태를 그대로 복제하지 않고 **건별 Data Block**으로 치환합니다. 문구·값·순서·건수는 보존합니다. 일반 수평 DataList의 Divider 규칙보다 이 매핑을 우선하며, 완료 화면의 별도 Feedback·데이터 구조는 유지합니다.
- **승인 참조**: [아웃라인 Data Block](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=4-979), [회색 무테 Data Block](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=4-994). 두 링크는 스타일 대안이며, 반복 건마다 서로 다른 스타일을 강제하지 않습니다.
- **구조와 토큰**: Vertical Auto Layout, padding 20px (`spacing/2xl`), radius 20px (`radius/2xl`), Title↔DataList Group gap 16px (`spacing/xl`), 목록 내부 gap 12px (`spacing/lg`). 각 DataList는 `layout: split`, `size: 14`, `hasDivider: false`를 적용합니다. 아웃라인은 `surface/neutral/quaternary-muted` + `border/neutral/secondary-muted` + `stroke/md`, 회색 무테는 `surface/neutral/tertiary-muted` + `strokes: []`를 사용합니다.
- **기획에 없는 요소**: 제목이 없으면 참조의 Title을 숨기고 빈 공간이나 임의 제목을 추가하지 않습니다. 기획에 없는 툴팁·아이콘도 숨깁니다. 복수 건은 `Data Block Group` 안에 모두 `Data Block`이라는 동일한 레이어명으로 열거하고 gap 12px (`spacing/lg`)를 적용합니다.

- **Design System URL**: `https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/MO-%EB%94%94%EC%9E%90%EC%9D%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC?m=auto&node-id=0-1&t=k9nL7yLI1W2gR3hE-1`
- **컴포넌트 원형 보존 및 타이포그래피 우선순위 원칙 (CRITICAL)**:
  - **작업자 편집 가능성 및 완료 조건 (2026-10-21 사용자 확정)**: 앞으로 전달하는 컴포넌트는 작업자가 Figma 우측 프로퍼티 패널에서 `variant`, `size`, 선택/비활성 상태, 노출 여부, instance-swap 등 원본이 공개한 옵션을 변경해도 원본이 지원하는 범위에서 정상 반영되어야 합니다. 실제 컴포넌트 인스턴스와 공개 속성·내부 연결 구조를 유지하며, 외형만 같게 만들거나 동작을 막는 구조 교체·override를 남기지 않습니다. Chip에만 한정하지 않습니다.
  - **실제 콘텐츠 적용 후 옵션 검수**: 화면용 문구·항목·상태를 적용한 최종 인스턴스에서 제공되는 옵션의 유효한 조합을 양방향으로 전환하여 내부 타입·시각 상태·레이아웃·문구·선택 상태·서체·변수가 원본의 전환 규칙대로 반영되는지 확인합니다. 원본에서 전환에 따라 바뀌도록 정의된 상태는 그 정의를 따릅니다. 프로퍼티 값만 바뀌고 실제 결과가 따라 바뀌지 않으면 완료가 아닙니다. 검수 후에는 기획 상태로 되돌립니다. Slot 수정이나 도구의 제약으로 자동 전환이 제한되면 정상 동작으로 전달하지 않고 영향을 받는 옵션과 제한을 명확히 알립니다. 원본이 지원하지 않는 동작까지 보장하거나 임의 추가하지 않습니다.
  - **원본 동작 보존 검수 (2026-10-21)**: 컴포넌트 인스턴스라는 사실과 외형 일치만으로 원형 보존을 판정하지 않습니다. 부모 variant가 내부 아이템 타입을 바꾸는 컴포넌트는 원본 기본 아이템과 연결 방식을 우선 유지하고, Slot을 비운 뒤 특정 타입의 아이템으로 일괄 교체하지 않습니다. 콘텐츠를 넣도록 설계된 일반 Slot까지 편집 금지하는 규칙은 아닙니다.
  - **Chip 전환 회귀 검수**: `Chip / Basic`은 원본에서 single은 `Item / SolidChip`, multiple은 `Item / LineChip`입니다. 실제 화면에 넣을 문구·항목 수·선택 상태를 적용한 뒤 `single → multiple → single` 및 사용하는 extended 상태를 왕복하여 내부 실제 component key·타입, 문구·선택 상태·서체·변수·배치를 비교합니다. 바깥 variant 값만 바뀌고 Slot 내부 타입이 고정되면 실패입니다. 검수 후에는 원래 기획 상태로 복원합니다.
  - **Slot override 한계 처리**: 기본 아이템의 문구·상태·가시성 변경도 도구에서 Slot override로 처리될 수 있으므로 '기본 아이템만 수정하면 해결된다'고 추정하지 않습니다. 원본과 수정본을 분리해 검증하고, 도구·원본 연결 구조·제작 방식 중 원인을 확인합니다. 동작이 보존되지 않으면 완료로 보고하지 않고 제한을 명시합니다. 검증 없이 원본 라이브러리 수정이 필수라고 단정하거나, 별도 허용 없이 원본을 변경·detach·새 컴포넌트로 대체하지 않습니다.
  - 디자인 시스템에 등록된 **컴포넌트 명칭은 절대로 변경하지 않습니다** (예: `Consent / 계열사 정보제공`, `CheckBox / 휴대폰번호` 등 한글 명칭이나 임의의 수식어를 덧붙여 컴포넌트명을 변형하는 행위 절대 금지).
  - 와이어프레임과 컴포넌트를 매핑하는 과정에서 **`Title / Page`**, **`Title / Section`**, **`Title / Element`** 등의 타이틀 컴포넌트를 매핑할 때, **와이어프레임 상에서 볼드(Bold) 등으로 임의 표기되어 있더라도 이를 개별 수정하지 말고 디자인 시스템 컴포넌트에 사전 정의된 원형 폰트 스타일/Weight를 최우선으로 유지**하여 적용합니다.
  - 가이드라인에 명시된 `DataList (layout: split, size: 14, hasDivider: false)`, `size: medium`, `variant: standard`, `os: iOS` 등의 속성은 Figma 컴포넌트 우측 패널의 **Component Properties(컴포넌트 속성)**를 의미하므로 정확히 일치시켜 적용합니다.
  - 임의의 신규 스타일을 정의하기 전에 디자인 시스템에 일치하는 컴포넌트가 있는지 먼저 확인하고 매핑합니다.
- **텍스트 스타일·변수 연결 보존 (2026-10-19 사용자 교정, CRITICAL)**:
  - 일반 본문과 문장 내 강조 구간 모두 원본 KBDS Text Style의 key로 스타일을 연결합니다. 변수의 이름·key와 alias 연결을 보존하며, 동일 이름의 새 변수나 고정 수치로 대체하지 않습니다.
  - 기획에 표시된 강조 구간을 생략하지 않고 동일 크기 계열의 원본 Medium Text Style 및 연결된 medium 변수를 해당 구간에 적용합니다. 예: 일반 본문 `Dynamic/Body/md∙16∙Light`, Face ID·지문 강조 구간 `Dynamic/Body/md∙16∙Medium`. Bold·Semibold 또는 크기 확대를 강조 수단으로 대신하지 않습니다. `fontName`, `fontWeight` 또는 크기·행간·자간을 직접 덮어써 Text Style과 변수 연결을 끊지 않습니다. 혼합 스타일을 적용할 때는 구간별 Text Style 적용 API(예: `setRangeTextStyleIdAsync`)를 사용합니다.
  - 변경 전 현재 구간의 서체를 로드하고, 변경 후 모든 구간의 style key와 `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing` 변수 alias를 원본 스타일과 대조합니다. 텍스트 색상 변수도 유지합니다. 화면에 같은 서체로 보이더라도 스타일·변수 연결이 누락된 구간은 검수 실패입니다.
- **HomeIndicator 속성 규칙**:
  - `## FOOTER` 및 바텀시트/Dialog/Popup 최하단에 배치되는 `HomeIndicator` 컴포넌트는 우측 패널의 Component Property **`os: iOS`**를 필수로 선택하여 적용합니다.
- **SelectButton 타입 규칙**:
  - 간결한 항목들을 다룰 경우: Property **`word`** 타입 적용
  - 그렇지 않은 일반/문장형 항목인 경우: Property **`sentence`** 타입 적용
- **텍스트 강조 및 Color Token 세부 규칙**:
  - **적용 전제**: 기획 또는 사용자 지시에 명시된 문장 내 강조에만 아래 스타일을 적용합니다. 메뉴명·대괄호만 보고 강조를 새로 만들지 않습니다.
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
  - **적용 전제**: 기획 또는 사용자 지시에서 링크로 명시된 구간에만 적용합니다. 단순 메뉴명·다른 화면 언급·대괄호를 링크로 추정하지 않으며, 기획에 없는 링크 외형이나 URL·이동 동작을 추가하지 않습니다.
  - 문장 중간에 링크 처리되는 부분을 표기할 경우:
    - **Color Token**: `text/neutral/secondary`
    - **Typography (2026-10-21 최종 교정)**: 동일 텍스트 크기·계열 내 `medium` 변수에 연결된 원본 Medium Text Style 적용. 종전 링크 구간 Bold 지정은 Medium으로 교정
    - **Type Settings**:
      - `Decoration`: **Underline** 체크
      - `Underline Details > Offset`: **`25%`** 설정
- **텍스트 버튼(TextButton) 및 아이콘 조합 규칙**:
  - 바로가기 버튼을 제외하고, 아이콘과 버튼이 조합될 경우 `TextButton`의 **`hasPrefix: True`**로 설정하고 버튼의 명칭/역할과 매핑되는 아이콘을 적용합니다.
  - 아이콘이 들어가지 않되 버튼으로 쓰여야 하는 경우: **`hasPrefix: False`**, **`hasSuffix: False`**, **`underline: True`** 설정
- **InputField 필수/선택 표기 규칙 (`Title / Element`, 2026-10-20 최종 교정)**:
  - 기획서상 **필수 항목(`*` 등)은 `optional` 래퍼 레이어를 비노출**합니다. 공개 속성 **`optional: false`**로 설정하고 실제 `optional` 프레임의 `visible: false`를 검수합니다. 텍스트만 지워 공간을 남기지 않으며, `*`나 `(필수)` 표기를 새로 노출하지 않습니다.
  - 기획서상 **필수가 아닌 항목은 `optional: true`**로 설정하고 원형 `Title / Element`의 기본 **`(선택)`**을 그대로 노출합니다. **색상·서체·Text Style·변수 연결은 어떤 것도 변경하지 않습니다.** 임의 강조색이나 필수 표기용 스타일로 덮어쓰지 않습니다.
  - 기존 `(필수)`·강조색 재정의가 남아 있다면 원형의 `(선택)` 텍스트·스타일·색상으로 복원한 뒤 필수 여부에 따라 래퍼 가시성만 제어합니다. 종전 `optional: true + (필수) + 3xs medium + text/accent` 지시는 폐기합니다.
- **InputField 자체 하단 안내/힌트 문구 규칙 (`hasFooter`)**:
  - `InputField`에 붙는 부연 설명이나 안내 문구 중, 불릿 리스트 형태가 아닌 단순 일반 문장 형태인 경우:
    - `InputField`의 Property **`hasFooter: True`** 설정
    - 하위 계층인 **`Item / Footer / hint`**에 해당 안내 텍스트를 적용
- **InputField 및 박스 아래 보조 TextButton (2026-10-20 최종 교정)**:
  - [휴대폰 인증 기준 2025:6834](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2025-6834)처럼 입력 필드 다음에 해결방법·도움말 등의 보조 버튼이 오는 경우, **`InputField / Button Area`** Vertical Auto Layout 안에 **`InputField` → `Button Area`** 순서로 배치합니다. 조합은 가로 Fill·세로 Hug, **gap 12px (`spacing/lg`)**입니다.
  - `Button Area`는 가로 Fill·세로 Hug, gap 0, 가로 우측 정렬(`counterAxisAlignItems: MAX`), 세로 가운데 정렬입니다. 내부는 실제 **`TextButton` (`variant: secondary`, `size: xsmall`, `hasPrefix: false`, `hasSuffix: true`, `underline: false`)** 인스턴스와 우측 이동 화살표를 사용하며 버튼 자체는 Hug·Hug입니다.
  - **최종 variant 기준**: [휴대폰 인증 2025:7407](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2025-7407)의 하단 TextButton `2025:7417`처럼 **인풋 조합 및 박스 아래에 별도 배치하는 TextButton은 `variant: secondary`**를 사용합니다. 앞서 이 패턴에 기록한 `primary`는 `secondary`로 교정합니다. 박스의 기존 간격·정렬·버튼 크기는 유지하며, 박스 아래에도 InputField 조합의 간격·크기를 일괄 복제하지 않습니다. InputField 내부의 버튼과 독립 CTA에는 이 규칙을 일괄 적용하지 않습니다.
  - 상위 Container에서 `Title / Page`와 이 조합 사이 간격은 24px (`spacing/3xl`)입니다. InputField 내부 타이머·다시받기 등의 기존 속성과 기획 문구는 유지합니다. 입력 필드 뒤의 보조 이동 버튼 패턴이며, 독립 CTA나 InputField 내부 버튼까지 일괄 변경하지 않습니다.

---

## 2. Screen Frame & Base Structure (아트보드 규격 및 기본 구조)

### A. 아트보드(화면 프레임) 네이밍 및 배경 규칙
- **아트보드 네이밍 (2026-10-19 사용자 확정)**: 화면 내부뿐 아니라 기획서의 주변 페이지 ID 영역과 해당 화면의 연결 관계를 확인하고, 기획서 상의 중괄호(`{ ... }`)로 표기된 화면 명칭을 함께 읽어 명명합니다.
  - **페이지 ID가 있는 경우**: 페이지 ID 필드에 기재된 실제 값을 그대로 사용하여 `실제페이지ID_화면명`으로 명명합니다. 예: `F730_한글잔액증명서_발급신청`. `F730`은 형식 예시이며 실제 기획서에 없는 ID를 만들어 넣지 않습니다.
  - **페이지 ID가 공란인 경우**: 기존 방식인 `화면ID_화면명`을 유지합니다. 예: `화면ID_한글잔액증명서_발급신청`.
  - **접두어 출처 제한**: 접두어는 기획서의 `페이지 ID` 필드만 기준으로 합니다. 요구사항 ID, 상위 프레임명, 화면명 또는 흐름 주석의 `730MF`·`750MF` 등을 페이지 ID로 해석하거나 조합하지 않습니다. `-` 등 미기재 표시도 공란으로 처리합니다. 기존 화면명에 포함된 숫자나 약어를 추출하여 ID로 사용하지 않습니다.
  - **미확인과 공란 구분**: ID 영역을 읽지 못했거나 어느 화면의 ID인지 불명확한 경우 공란으로 단정하거나 임의로 추정하지 않고 미확인 상태를 명시합니다.
- **바텀시트, Dialog, Full Popup 아트보드 Background**: 바텀시트, Dialog, 풀팝업 화면 프레임 자체의 Background는 반드시 **`background/neutral/white`** 변수를 적용합니다.

### B. 일반 페이지 기본 규격 및 Resizing
- **일반 화면과 Popup 적용 범위 (2026-10-21 사용자 교정, 우선 적용)**:
  - 일반 화면은 **`## HEADER` / `## BODY` / `## FOOTER`를 아트보드의 직계 자식**으로 두는 구조를 기본으로 합니다. 일반 화면 전체를 `Popup > Slot > Header / Body / Footer`로 감싸지 않습니다.
  - **`Popup`은 기획의 페이지 형태 또는 사용자의 명시 지시에서 풀팝업으로 확인된 경우에만** 사용합니다. iOS 화면, 인증·PIN 입력 화면, 닫기(X) 버튼, 이전 제작본의 Popup 사용 여부만으로 풀팝업이라고 추정하지 않습니다. 풀팝업임이 확인되지 않은 일반 화면에는 기본 3단 구조를 적용하며, 근거가 불명확하면 임의로 Popup을 추가하지 않습니다.
  - [휴대폰 인증 2025:6834](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2025-6834)의 최상위 3단 구조를 기준으로 합니다. [인증 요청(iOS) 2027:732](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2027-732)를 Popup으로 감싼 기존 제작은 사용자 교정 대상이며, 일반 인증 화면용 템플릿의 근거로 재사용하지 않습니다.
  - 템플릿 복제 전에 화면 유형과 루트 계층을 대조하고, 완료 전 실제 직계 자식·레이어명·Vertical Auto Layout·StatusBar의 HEADER 소속을 검수합니다. 외형이 같더라도 일반 화면에 불필요한 Popup 래퍼가 남으면 구조 검수 실패입니다.
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
     - **키패드 화면 (2026-10-22 확정)**: `## BODY` 자체의 **`padding-top: 24px` (`spacing/3xl`)** 적용. 키패드 템플릿의 다른 값이나 하위 Container 패딩으로 대체·중복하지 않습니다.
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
  - **체크 활성화 상태 및 기본 선택 우선순위 (2026-10-21 사용자 확정)**:
    - [계좌번호 선택 기준 2230:10109](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2230-10109)의 [BottomSheet 2230:10111](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2230-10111)처럼, 항목을 선택하고 체크마크로 현재 선택을 표시하는 List형 바텀시트에 적용합니다. 계좌 선택 전용 패턴에도 같은 선택 우선순위를 적용합니다.
    - **기획에 초기 선택 항목이나 선택할 항목의 순서가 별도로 명시되어 있으면 그 항목을 최우선**으로 적용합니다. 별도 지정이 없으면 **화면에서 위에서 두 번째 `List`**를 기본 선택으로 표시합니다. `눌러서 선택` 같은 안내 항목도 실제 List로 노출되면 첫 번째 항목으로 세며, 항목을 재정렬하거나 실제 데이터 항목만 다시 세지 않습니다.
    - 선택한 `List`의 공개 속성을 **`hasSuffix: True`**, 하위 **`Slot-Suffix > Item / Suffix`의 공개 속성을 `variant: checkMark`**로 설정합니다. 우측 프로퍼티 패널에서도 해당 원본 인스턴스와 속성이 유지되어야 합니다.
    - 일반 단일 선택에서는 나머지 `List`의 `hasSuffix: False`를 유지합니다. 원본 기획의 복수 선택 상태가 명시된 경우에는 그 상태를 따릅니다. 항목 문구·순서·컴포넌트 연결과 아래의 48px 높이 규칙을 보존합니다.
  - **체크마크 노출 여부에 따른 높이 통일 (2026-10-20 사용자 확정)**:
    - 셀렉트 바텀시트의 `List`는 체크마크가 노출되거나 비노출이어도 **모두 높이 48px / 세로 Fixed**(`layoutSizingVertical: FIXED`)로 설정합니다. 체크마크 비노출 시 원형의 Hug 높이 46px로 줄어드는 동작은 허용하지 않습니다.
    - `hasSuffix`로 체크마크 노출 여부만 제어하고, 선택 상태 변경 전후에도 List 높이 48px와 항목 위치를 유지합니다. 실제 List 인스턴스·내부 계층·서체·변수 연결은 보존합니다.
    - 이 규칙은 체크마크로 선택 상태를 표시하는 셀렉트 바텀시트 List에 적용하며, 아이콘·부연 문구를 포함한 도움말/이용 방법 선택 List의 높이까지 일괄 48px로 변경하지 않습니다.
  - **데이터 매핑**: 기획서에 명시된 리스트 항목 텍스트를 `List` 컴포넌트에 순차적으로 1:1 매핑합니다.
- **도움말·이용 방법 선택 바텀시트 (2026-10-19 사용자 승인, 위 일반 선택형보다 우선)**:
  - [인증번호 입력 도움말 기획](https://www.figma.com/design/CdyCQv4aFslTl7MGoQxmU9/?node-id=4469-44517)과 같은 이용 방법 선택 화면은 [추가 본인 인증 기준 185:14891](https://www.figma.com/design/KFlklMvGmg0MXGfAXvpprn/?node-id=185-14891)처럼 **테두리 카드 없이 `List` 인스턴스**로 구성합니다.
  - `BottomSheet > Slot > Container > List Group > List`를 기본으로 하며, 기획에 본문 안내가 있으면 Container의 `Text > Content` 다음에 `List Group`을 배치하고 둘 사이 gap 16px (`spacing/xl`)을 적용합니다. 단일 Container 이름에는 순번을 붙이지 않습니다.
  - Slot padding은 `0px 0px 20px`, Container는 `0px 20px`, 내부 `List Group` gap은 **0px**입니다. List는 가로 Fill·세로 Hug, 자체 padding `12px 0`, `hasHeader: false`, `hasPrefix: true`, `hasSuffix: true`입니다.
  - `Slot-Prefix`에는 **`Item / Prefix (variant: bgIcon)` 기본 인스턴스**를 둡니다. 원형의 48×48px 아이콘 영역(래퍼 폭 52px)을 유지하며, 최종 아이콘은 작업자가 직접 교체하므로 임의의 전화·챗봇 아이콘으로 매핑하지 않습니다.
  - Middle은 주 문구 16px Bold, 부연 문구가 있으면 14px Light 및 보조 텍스트 색상으로 배치합니다. Suffix는 **`Item / Suffix (variant: pageIndicator)`** 우측 화살표를 사용합니다. 원본 Text Style·색상·서체 변수 연결을 유지하고 기획의 문구와 항목 순서를 보존합니다.
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
기획의 페이지 형태 또는 사용자의 명시 지시에서 **풀팝업으로 확인된 화면과 2026-10-23 사용자가 지정한 키패드·패턴 입력 화면에** 적용하는 레이어 및 오토레이아웃 계층 구조입니다. 일반 화면에는 §2-B·C의 최상위 3단 구조를 적용하며, 이 절을 기본 템플릿으로 확대 적용하지 않습니다.
- **아트보드 Background**: **`background/neutral/white`**
- **레이어 계층 구조**:
  - `StatusBar` (Position 설정(Absolute)하여 최상단에 띄움)
  - `Popup`
    - `Slot`
      - `Header` (오토레이아웃) > 내부 필수: `AppBar`
      - `Body` (오토레이아웃) > 내부 필수: **`Container 1`**, **`Container 2`** 등 순차 열거
      - `Footer` (오토레이아웃) > 내부 필수: `HomeIndicator` (Property: **`os: iOS`**)

### G. 약관 상세 화면 (PDF 뷰어 화면) — v0.95 Popup 구조

최신 승인 기준은 [약관 상세 31888:30615](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31888-30615)입니다. 종전 `72:9033 → 82:1994`의 직계 HEADER/BODY/FOOTER 구조 대신 실제 `Popup`을 사용합니다.

```text
화면 아트보드
├─ StatusBar
├─ Popup
│  └─ Slot
│     ├─ ## HEADER > AppBar
│     ├─ ## BODY > Title Area, body
│     └─ ## FOOTER > StickyButton, HomeIndicator
└─ Pagination / Carousel (Absolute)
```

- **레이어명**: 산출물의 Popup Slot 안 `Header`, `Body`, `Footer`는 각각 **`## HEADER`, `## BODY`, `## FOOTER`**로 통일합니다. `Popup`, `Slot`, `AppBar` 등 실제 컴포넌트 명칭과 하위 `Title Area`, `body`는 원형을 유지합니다. 이전 Container 1/2 명명·계층 유지 규칙으로 최신 구조를 되돌리지 않습니다.
- **아트보드·StatusBar·Popup**: 기준은 390×844, Vertical / gap·padding 0 / `background/neutral/white`입니다. StatusBar는 아트보드 직계 첫 자식이며 iOS/light, 가로 Fill·세로 Fixed 44px, **Auto Layout 일반 흐름**입니다. Popup은 그 아래 가로·세로 Fill(기준 390×800), Slot은 Fill·Fill / gap·padding 0입니다. 이 PDF 유형에 키패드 Popup의 StatusBar Absolute 규칙을 일괄 적용하지 않습니다.
- **`## HEADER`**: Fill·Hug, 기준 56px. AppBar는 `variant: sub`, `hasTitle: true`, `hasPrev: false`, `hasTextButton: false`, `hasIconButton1/2: false`, `hasIconButton3: true`이며 원형 닫기 버튼과 실제 약관 제목을 사용합니다.
- **`## BODY`**: Fill·Fill / Vertical / gap·padding 0, 기준 390×744px. `Title Area`는 Horizontal / Fill·Hug / padding 12px 20px 0 / gap 16px, 기준 높이 36px입니다. 내부 `title + button > Suffix`의 아이콘 그룹은 gap 16px, 실제 IconContainer size 24이며 검색·다운로드·목차 아이콘의 원본 연결을 유지합니다. `body`는 Vertical / Fill·Fill / 양 축 center / padding·gap 12px, 기준 높이 708px입니다.
- **PDF 영역**: `body` 안 흰색 Rectangle은 원형 배경·테두리 변수와 Fill 크기를 유지하고, `pdf 약관 내용` 표시 텍스트는 실제 원형 스타일·서체·색상 변수와 Absolute 중앙 배치를 유지합니다. 콘텐츠를 이미지로 평탄화하지 않습니다.
- **`## FOOTER`**: Popup Slot의 자식이지만 **Absolute**, 기준 x0/y674(Popup Slot 좌표), 가로 Fixed 390·세로 Hug 126px입니다. BODY의 Fill 높이를 줄이는 일반 흐름으로 바꾸지 않습니다. StickyButton은 white / hasCTA true / hasSubButton false / hasScrollDim true, HomeIndicator는 os iOS입니다. CTA 문구는 기획에 맞추되 Label과 버튼명은 원형 Hug를 유지합니다.
- **`Pagination / Carousel`**: 아트보드의 직계 실제 인스턴스 / Absolute / black·medium, 기준 103×32px, x143.5/y686 / horizontal CENTER·vertical MAX constraints입니다. Popup Slot 내부로 옮기거나 일반 흐름에 넣지 않습니다. 최신 원형을 import하고 서체·변수·원본 연결을 유지하며 SVG·벡터·일반 Frame이나 이전 화면 clone으로 대체하지 않습니다.
- **최종 검수**: Popup 연결, Slot 내부 3개 `##` 레이어명, StatusBar Auto, BODY·body Fill, Footer Absolute, Pagination의 부모·좌표·constraints 및 실제 인스턴스를 대조합니다. 390×844 실측 높이는 StatusBar 44 / Popup 800 / HEADER 56 / BODY 744 / Title Area 36 / body 708 / FOOTER 126입니다. 다른 화면 크기나 모드에서는 원형 sizing·constraints를 따르고 과거 실측 숫자로 강제 고정하지 않습니다.

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
  - *(동일 레이어 반복 예외: `Title / Text` + `Title / Text`처럼 같은 레이어를 열거하면 **`Title / Text Group`**으로 묶습니다. 서로 다른 콘텐츠를 결합하는 `Title / Contents` 공식과 구분합니다.)*

#### 2. 단수 및 복수 컴포넌트 오토레이아웃 네이밍
- **동일 컴포넌트·레이어 반복 열거 시 (2026-10-23 재확정)**: 동일한 컴포넌트 또는 같은 역할·명칭의 레이어가 2개 이상 연속 반복되면 반복 항목들을 하나의 Auto Layout으로 묶고 **`[명칭] Group`**으로 명명합니다. InputField뿐 아니라 일반 레이어·조합 레이어에도 적용하며, 반복 자식은 원래 명칭과 원형 연결을 유지하고 순번을 붙이지 않습니다. 서로 다른 역할의 항목이나 별도 정의된 Container 1·2 등의 구조는 이 규칙만으로 합치거나 바꾸지 않습니다.
  - 예시: `InputField Group` (복수의 InputField), `Accordion Group` (복수의 Accordion), `Radio Group` (복수의 Radio), `TextList Group`, `Table Group`, `Account Group`, `Consent Group`, `Card Group`, `Data Block Group` 등
- **실제 그룹핑 검수**: 이름만 확인하지 않고 반복 항목이 실제 Group의 자식인지 확인합니다. 연속 InputField는 `Container > InputField Group > InputField`로 구성하고 내부 gap24px를 적용합니다. Container의 페이지 패딩은 유지하고 Group에 중복 패딩을 추가하지 않습니다. 단일 InputField의 배치용 래퍼에는 기존 단수 규칙대로 Group을 붙이지 않습니다. 문의정보 입력2182:19277의 InputField5개는 문서에 있던 규칙을 제작에서 누락한 교정 대상입니다.
- **Group 내부 반복 자식의 레이어명 (2026-10-19 사용자 승인)**: `[레이어명] Group` 안에 반복되는 자식은 모두 원래 레이어명을 사용하며 숫자 순번을 붙이지 않습니다. 예를 들어 `Data Block Group`의 자식은 모두 `Data Block`, `Text Box Group`의 자식은 모두 `Text Box`, `InputField Group`의 자식은 모두 `InputField`로 명명합니다. `Container 1`, `Container 2`처럼 별도로 정의된 페이지 Container 순번 규칙은 예외로 유지하며, 컴포넌트 원형 명칭도 유지합니다.
- **단수 컴포넌트 래핑 시 (2026-10-20 사용자 재확정)**: 단일 컴포넌트를 패딩·정렬·배치 등 필요에 의해 오토레이아웃으로 감싸도 반복 그룹이 아니므로 `Group`을 붙이지 않고 해당 **`[컴포넌트명]` 단독**으로 명명합니다. Full-Width 화면의 좌우 패딩뿐 아니라 일반 화면·바텀시트의 단일 래퍼에도 동일하게 적용합니다. `Group`은 같은 컴포넌트가 복수로 반복될 때만 사용합니다.
  - 예시: 단일 InputField를 감쌀 경우 -> **`InputField`**, 단일 Accordion을 감쌀 경우 -> **`Accordion`**
  - [여권만료일 입력 2141:10091](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2141-10091)처럼 단일 InputField를 감싸는 오토레이아웃은 **`InputField > InputField`**(바깥 Auto Layout / 안쪽 원본 컴포넌트)로 명명합니다. 이 경우 `InputField Group`은 잘못된 이름이며, 이름 교정 시 기존 계층·패딩·크기·컴포넌트 속성은 유지합니다.

#### 3. 버튼 영역 오토레이아웃 규칙 (`Button Area`)
- `## BODY` 영역 내에서 `BoxButton`, `Pagination / Basic` (더보기) 또는 기타 일반 버튼 컴포넌트가 배치될 경우:
  - 오토레이아웃 프레임명: **`Button Area`**
  - 간격: Auto Layout **`gap: 0px`** 지정
  - 정렬: 기획서 와이어프레임에 따라 **`align center`** 또는 **`align right`**로 정렬 속성 설정

#### 4. 체크박스 및 라디오 컴포넌트 규칙
- **CheckBox**: 항상 오토레이아웃 프레임 **`CheckBox`** (Auto Layout **`gap: 0px`**)로 감쌉니다. (종속 하위 항목은 **`CheckSub`** 유지)
- **Radio**: **`Radio` 컴포넌트는 개별 오토레이아웃으로 감싸지 않고 컴포넌트 원형 그대로 열거**하며, 이들을 감싸는 상위 **`Radio Group`의 내부 간격은 Auto Layout `gap: 20px` (`2xl` 토큰)**을 적용합니다.
- **선택 그룹 공통**: `Radio Group`과 `Checkbox Group`(`CheckBox Group`)의 반복 항목 gap은 **20px (`spacing/2xl`)**이며 Grid는 행·열 gap 모두 20px입니다. 개별 컴포넌트 원형 내부 간격과 단일 CheckBox 래퍼 gap 0은 유지합니다.

#### 5. 타이틀과 일반 텍스트 결합 규칙
- **일반 텍스트 공통 래핑 (2026-10-19 사용자 교정)**: 타이틀과의 결합 여부와 관계없이, Slot·Container에 배치하는 일반 본문은 **`Text`**라는 Vertical Auto Layout 프레임으로 감쌉니다. gap과 padding은 0, 가로 Fill·세로 Hug로 설정하고 내부 텍스트도 가로 Fill·세로 Hug 및 자동 높이로 구성합니다. 바텀시트의 단일 본문 블록은 **`Slot > Container > Text > Content`** 구조를 적용합니다. `Content`는 편집 가능한 텍스트 레이어이며, 일반 텍스트를 Container의 직계 자식으로 두지 않습니다. 기존 DS 컴포넌트 내부의 원형 계층과 불릿 TextList 사용 규칙은 유지합니다.
- **본문과 제목 역할 구분 (2026-10-21)**: 위 일반 Text 래핑 규칙은 제목 컴포넌트를 일반 본문으로 대체하라는 뜻이 아닙니다. 본문 섹션 제목은 실제 `Title / Section`을 사용하고, 설명·안내 본문만 `Text > Content`로 구성합니다. `재외국민이란?`, `재외국민 등록방법(1가지 선택)`을 일반 Text로 만든 기존 제작 방식은 잘못된 매핑입니다.
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
  - **Infobox / Card 내부 단일 항목 텍스트 규칙 (2026-10-21 재확정)**: 항목이 단 1개인 경우, 기획서상 불릿으로 표기되어 있거나 기존 화면에 `TextList / Unordered` 하나로 들어가 있더라도 불릿 없는 일반 `Text > Content`로 구성합니다. 타이포그래피 스타일은 **`Dynamic/Body/xs∙14∙Light`**, 컬러는 **`text/neutral/tertiary`**를 적용합니다. 문구·줄바꿈·변수 연결은 보존합니다. 복수 항목의 불릿 및 인포박스 밖 `Title / Section` 다음 단일 TextList 유지 예외와 혼동하지 않습니다.
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
|버튼형 선택지|디자인 시스템의 `GridButton` 인스턴스|모바일 주민등록증·운전면허증 등 선택지를 버튼으로 열거하고 선택하는 UI|
|동작·복합 카드|디자인 시스템의 `Card / Surface` 인스턴스|이체, 상세 이동, 정보와 동작을 결합한 카드. 버튼형 선택지는 GridButton 규칙 우선|
|사실 데이터 표시|직접 구성한 Auto Layout 프레임 `Data Block`|이름, 전화번호, 부모님 기본정보, 거래내역, 계좌정보, 금액|
|설명·안내·주의·상태 전달|직접 구성한 Auto Layout 프레임 `Text Box`|이용 안내, 유의사항, 한국어 상담센터 안내 등 기존 Infobox로 정의되지 않은 안내 박스|

기존 `Infobox / Basic`, `Infobox / Solid`, `Infobox / Card`, `Infobox / FullWidth`의 용도에 해당하면 해당 컴포넌트와 전용 규칙을 우선 적용합니다. `Text Box`를 이유로 기존 Infobox를 일괄 대체하지 않습니다.

#### 0. 선택지 버튼 UI: `GridButton` (2026-10-20 사용자 승인)
- **적용 조건**: [신분증 촬영_모바일 2074:1554](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2074-1554)처럼 복수의 선택지를 버튼 형태로 제시하고 사용자가 선택하는 UI는 실제 **`GridButton`** 컴포넌트로 구성합니다. 이 패턴은 일반적인 Card / Surface의 선택·동작 판정 규칙보다 우선하며, Card들을 나란히 놓아 대체하지 않습니다. 셀렉트 바텀시트의 List·계좌 선택 등 별도로 정한 전용 패턴은 해당 규칙을 유지합니다.
- **계층**: **`GridButton > Slot > Grid > Item / Vertical`** 등 원형 아이템 인스턴스 구조를 유지합니다. 컴포넌트를 detach하거나 Slot 밖에 별도 Grid를 만들어 흉내 내지 않습니다. 원형 컴포넌트와 반복 아이템의 이름에 임의 순번을 붙이지 않습니다.
- **기획별 Grid 수정**: **Slot 안의 `Grid` 오토레이아웃**에서 행·열 수, 아이템 수·배치 순서, 열 너비와 간격을 기획에 맞춰 조정합니다. 기준 화면의 1행 2열을 모든 화면에 고정 적용하지 않습니다. 실제 `layoutMode: GRID`를 유지하며, 행 자동 확장(`gridAutoTracks: ROWS`)을 쓰는 경우 열 수와 아이템 수에 따라 행 수가 결정되도록 합니다.
- **현재 승인 예시**: `GridButton (variant: primary, type: grid)` / Grid **1행 2열**, 동일한 Fill 열 2개, 가로 Fill·세로 Hug, 행·열 gap **8px (`spacing/md`)**, 선택지 순서는 모바일 주민등록증 → 모바일 운전면허증입니다. 이 수치는 현재 기획의 예시이며 다른 기획에서는 Grid 구성을 다시 맞춥니다.
- **상태·내용**: 기획의 기본 선택 여부, disabled/pressed/selected 상태, 레이블·보조 레이블·아이콘을 원형의 공개 속성으로 매핑합니다. 현재 예시는 `Item / Vertical (variant: primary, selected: false)` 2개이며 기획대로 초기 CTA 비활성을 유지합니다. 서체·변수·아이콘 컴포넌트 연결을 보존합니다.
- **조합 네이밍**: 하단 별도 Button Area와 묶는 경우 상위 래퍼는 **`GridButton / Button Area`**로 명명합니다. 내부 GridButton과 Slot·Grid·아이템의 원형 이름은 유지합니다.

#### 1. 액션 포함형 카드: `Card / Surface`
- **적용 조건**: 위 GridButton 버튼형 선택지에 해당하지 않는 박스에서 **이체·상세 이동 버튼, 체크박스·라디오 등 복합 선택 요소가 있거나 박스 전체가 이동·선택의 동작 대상**인 경우 사용합니다. 푸터 버튼 유무만으로 판단하지 않습니다. 상품 선택, 계좌 선택, 항목 선택 등이 이에 해당합니다.
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

- **단일 항목 Data Block 전용 구조 (2026-10-20 사용자 승인)**:
  - 적용 조건은 **박스 안의 라벨·값 쌍이 하나인 경우**입니다. Data Block 자체의 개수가 하나라는 뜻과 구분합니다. [고객정보 제공 안내 1147:62](https://www.figma.com/design/KFlklMvGmg0MXGfAXvpprn/?node-id=1147-62)의 `고객정보 제공내역` 아래 **`제공회사 / KB국민은행`** 박스(`1148:3021`)를 기준으로 합니다.
  - **`Data Block > DataList`**로 직접 배치하며, 단일 DataList를 `DataList Group`으로 감싸지 않습니다. DataList는 실제 인스턴스 **`layout: split`, `size: 14`, `hasDivider: false`**를 사용하고 원형 `Slot > Label, Data` 계층을 유지합니다.
  - Data Block은 Vertical Auto Layout / 가로 Fill·세로 Hug / padding 20px (`spacing/2xl`) / radius 20px (`radius/2xl`) / gap 16px (`spacing/xl`)입니다. 기본 외형은 참조의 **`surface/neutral/tertiary-muted` + `strokes: []`**로 적용합니다. 단일 자식의 gap을 여백이나 빈 프레임으로 구현하지 않습니다.
  - DataList는 가로 Fill·세로 Hug, Slot은 Horizontal / gap 12px (`spacing/lg`)입니다. Label은 좌측 정렬·가로 Hug·14px Light·`text/neutral/tertiary`, Data는 남는 폭 Fill·우측 정렬·14px Medium·`text/neutral/primary`입니다. 원본 Text Style과 서체·색상 변수 연결을 유지합니다.
  - 섹션 제목이 있으면 참조처럼 **Data Block 바깥의 형제 `Title / Section`**으로 두고 제목↔박스 gap 16px를 적용합니다. 박스 안에 임의의 Title이나 Divider를 추가하지 않습니다. 참조 폭 350px에서 박스 높이는 60px이나 **높이 Fixed 60px로 고정하지 않고 Hug**를 유지합니다.
  - 이 단일 항목 구조는 일반 Data Block의 복수 DataList 그룹 규칙보다 우선합니다. 복수 항목은 기존 `DataList Group`을 유지하고, 별도로 정의된 완료 화면의 `Title / DataList Group` 구조에는 일괄 적용하지 않습니다.

#### 3. 설명·안내형 박스: `Text Box`
- **적용 조건**: 데이터의 조회·대조보다 설명, 이용 안내, 주의, 상태 전달이 주목적이며 기존 Infobox 용도에 해당하지 않는 박스입니다. 한국어 상담센터처럼 전화번호·이메일이 포함되어도 안내 문맥이 주목적이면 `Text Box`로 분류합니다. 단순 연락처 텍스트의 존재를 버튼이나 선택 동작으로 간주하지 않습니다.
- **구성**: `Card / Surface`를 사용하거나 분리(detach)하지 않고 Auto Layout 프레임으로 직접 만듭니다. 레이어명은 단일·복수 모두 `Text Box`이며, 반복 목록은 `Text Box Group`으로 묶고 내부 자식에 순번을 붙이지 않습니다.
- **참조 예시의 기본 구조**: Flow `vertical`, 패딩 **20px (`spacing/2xl`)**, 내부 간격 **16px (`spacing/xl`)**, 라운드 **14px (`radius/lg`)**. 필요에 따라 원본 `Title / Section`, `TextList / Unordered`, `Divider / Horizontal` 등을 조합합니다. Data Block의 DataList 구조나 20px 라운드를 일괄 적용하지 않습니다.

#### 4. 아웃라인 / 회색 배경 스타일의 선택
- **2026-10-21 우선 적용**: 회색 Infobox / Card와 솔리드 Data Block이 같은 화면에서 연속되어 배경이 반복·중첩되면, 사용자 수정 기준 `2158:8074`처럼 Data Block을 아웃라인형으로 적용합니다. 아래 선택 재량보다 이 구체적 상황 규칙이 우선합니다.
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
    - `Infobox / Card` 다음 콘텐츠와의 외부 간격은 단수·복수 `TextList`를 포함하여 **`gap: 24px` (`spacing/3xl`)** 적용. 카드 내부 간격과 카드 앞쪽 간격은 별도 규칙을 유지
  - **Input & TextList 조합 패턴**:
    - **InputField Group 다음 일반 TextList 노출**: `InputField Group`과 `TextList`를 그룹핑하고 둘 사이 간격은 Auto Layout **`gap: 24px` (`3xl` 토큰)** 적용
    - **특정 InputField의 부가설명 성격 TextList**: 불릿 리스트 형태로 추가 설명이 들어갈 때는 해당 `InputField`와 `TextList`를 별도로 묶어 그룹핑하고 Auto Layout **`gap: 12px` (`lg` 토큰)** 적용
    - *(참고: 불릿이 아닌 단순 문장형 부연 설명은 `InputField` 내부의 `hasFooter: True` 및 `Item / Footer / hint`를 사용합니다.)*
  - **TextList (size: 14, depth: 1) 상호 결합 패턴**:
    - `TextList (size: 14, depth: 1)` 및 `TextList` 컴포넌트들이 오토레이아웃으로 함께 묶일 때 내부 Auto Layout **`gap: 8px` (`md` 토큰)** 적용
  - **Title / Element + Radio Group / CheckBox Group 조합 패턴**:
    - **Title / Element와 Radio Group 사이 간격**: Auto Layout **`gap: 16px` (`xl` 토큰)** 적용
    - **Radio Group 내부 구조**: `Radio` 컴포넌트는 오토레이아웃으로 감싸지 않고 원형 그대로 열거하며, 내부 간격은 Auto Layout **`gap: 20px` (`2xl` 토큰)** 적용
    - **Checkbox Group 내부 구조**: `Checkbox Group`(`CheckBox Group`)의 항목 간 Auto Layout **`gap: 20px` (`spacing/2xl`)** 적용. 개별 CheckBox 원형 내부와 단일 래퍼 gap 0은 유지
    - **CheckBox 그리드 레이아웃**:
      - Flow: **`grid`** (기획서에 따라 `3*1`, `2*auto` 등 설정)
      - 간격: **`gap between columns: 20px` (`2xl`)**, **`gap between rows: 20px` (`2xl`)** 적용
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
      2. `Image Area`는 [승인 참조 10580:10543](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=10580-10543)를 따릅니다. Vertical Auto Layout, 가로 Fill·세로 Hug, 내부 gap 0, **padding 40px 0 (`spacing/6xl`)**입니다. 내부 `ImageContainer`는 **ratio 2:1 / 가로 Fill / 세로 Fixed**이며 콘텐츠 폭 350px일 때 **350×175px**, 전체 Image Area는 **350×255px**입니다. 임의의 96×96 정사각형으로 축소하지 않습니다. **더미 그래픽과 “더미이미지” 라벨이 포함된 승인 원본 Image Area 전체를 가져와 재사용합니다.** 크기·패딩만 본떠 빈 ImageContainer로 대체하거나 그래픽·라벨을 생략하지 않습니다. 앞으로 별도 지시가 없는 안내 화면의 Image Area도 이 원본을 기본으로 사용합니다. **Pretendard 텍스트 유지 최종 교정**: [최신 승인 버전 67:1947](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=67-1947)의 Image Area(`67:2127`)를 재사용합니다. “더미이미지” 라벨은 **편집 가능한 TEXT / Pretendard SemiBold**로 유지하며 원본 fontFamily 변수 alias·크기·행간·자간·색상·테두리·위치를 보존합니다. 폰트를 깨거나 SVG·벡터·이미지로 바꾸지 않고 임의 대체 폰트도 쓰지 않습니다. 기존 outline SVG 대체 예외는 폐기합니다. 이는 기존 이미지 영역만 표시 규칙의 명시적 예외이며, 임의의 새 이미지 생성·외부 이미지 사용을 허용하는 뜻은 아닙니다.
      3. `Image Area` 또는 단독 `ImageContainer` 다음에 `ProgressStep`, `Infobox / Card` 등 콘텐츠가 이어지면 종류와 무관하게 **기본 외부 gap 24px (`spacing/3xl`)**을 적용합니다. Image Area가 있으면 래퍼 바깥 경계, 단독 구성은 ImageContainer 경계를 기준으로 하며 내부와 외부에 중복 적용하지 않습니다. 내부 패딩 40px와 외부 후속 gap 24px를 구분합니다.
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
    - **승인된 하단 구성 필수 재사용 (2026-10-20)**: [신분증 확인 2075:2064](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2075-2064)의 하단 전용 컨테이너 `2071:4202`처럼 구성합니다. **외부 Divider(10px, tertiary, full) → Accordion**, 컨테이너 gap·padding 0, 가로 Full Width, 본문과의 간격 32px이며 하단 버튼 위에 배치합니다. Accordion만 단독으로 본문 끝에 붙이지 않습니다.
    - **Accordion 속성**: `type: basic`, `variant: standard`, `size: medium`, `hasPrefix: true`, Prefix의 아이콘은 **`solid-info-circle`**, `hasDivider: false`, `expanded: true`로 설정합니다. 원형 제목·화살표·슬롯 계층을 유지합니다. 본문 `TextList / Unordered`는 size 14, Slot-contents gap 8px를 유지하며 불릿을 일반 텍스트로 바꾸지 않습니다.
    - **내부 Divider 숨김**: 알려드립니다 내부에 위치하는 Accordion은 **`hasDivider: false`를 적용하며, Accordion 내부의 divider는 항상 숨김(비노출)** 처리합니다.
    - **오토레이아웃 해제 및 속성**: `Accordion`을 별도의 오토레이아웃 프레임으로 다시 감싸지 않고(오토레이아웃 해제/단일 컴포넌트 직접 배치), `Accordion` 컴포넌트 자체의 수평 크기는 **`width: fill`**로 설정합니다.
    - 이 Container의 Auto Layout **`gap: 0px`**을 적용합니다.

---

## 4. 약관 화면 전용 패턴 — v0.95 ConsentGroup

### A. 승인된 6가지 경우와 화면 외곽 구조

| 경우 | 최신 라이브러리 참조 | 적용 기준 |
| --- | --- | --- |
| Depth 1+2 | [31061:78151](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78151) | 단일 상위 항목과 하위 항목이 있는 ConsentGroup을 기획에 맞게 조합 |
| Depth 1+2+3 | [31061:78179](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78179) | 3d-group·3d, 직접 설명(description), 보조 레이블(hasSubLabel) 분기 |
| Depth 1+2+3+4 초기 레이블 | [31061:78292](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78292) | 뎁스별 기본 이름과 Slot·반복 구조를 확인하는 원형 |
| Depth 1+2+3+4 실제 문구 예시 | [31061:78209](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78209) | 긴 문구 줄바꿈, 체크·라디오 상태, 4d Grid와 설명 목록의 조합 |
| 약관 BottomSheet | [31061:78333](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78333) | BottomSheet Slot의 안내문과 ConsentGroup 조합 |
| TextList(16) + 확인 동의 | [31061:78354](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78354) | Title / Section + TextList Group + 별도 ConsentFinal |

- 6개 참조는 경우별 **구조**입니다. 더미 문구·항목 수·순서·선택 상태·높이를 제품 화면에 고정 복사하지 않습니다. 실제 기획에 따라 해당 경우를 선택하고 현재 라이브러리에서 컴포넌트를 import합니다.
- 일반 약관 동의 화면은 아트보드 직계 `## HEADER / ## BODY / ## FOOTER`를 유지합니다. BODY는 Vertical / padding 24px 20px 32px / gap 24px입니다. Container 1에는 Title / Page, Container 2에는 반복 ConsentGroup을 gap 12px로 배치하고 Container 패딩은 0입니다. 짧은 콘텐츠는 844px 아트보드와 BODY Fill, 긴 콘텐츠는 아트보드·BODY Hug로 확장합니다. 참조의 881/1863/2185px를 고정 높이로 재사용하지 않습니다.
- 일반 약관 참조의 AppBar는 sub / 뒤로가기 true / 취소 TextButton true / hasTitle false입니다. TextList 확인형은 실제 AppBar 제목이 있는 참조처럼 구성합니다. 모든 유형에 제목·취소·아이콘을 일괄 고정하지 않고 기획과 대응 참조를 따릅니다.

### B. 실제 컴포넌트와 Slot 계층

```text
Container 2 (gap 12px)
└─ ConsentGroup (실제 인스턴스, 필요한 수만큼 반복)
   └─ Container (원형 좌우 padding 20px, gap 0)
      ├─ Item / Consent (variant: 1d)
      └─ Slot (gap 0, padding-bottom 8px)
         ├─ Divider > Divider / Horizontal (필요한 경우)
         ├─ Item / Consent (variant: 2d)
         ├─ Item / Consent (variant: 3d-group)
         │  └─ Slot-Depth-3 > GridContainer > Item / Consent (3d)
         ├─ Item / Consent (variant: 4d-group)
         │  └─ Slot-Depth-4 > GridContainer > Item / Consent (4d)
         └─ Item / Consent (description / textList, 기획에 있을 때)
```

- **`ConsentGroup`**, **`Item / Consent`**, **`ConsentFinal`**은 이름 그대로 실제 라이브러리 인스턴스를 사용합니다. 외형만 비슷한 일반 프레임, 구형 Consent solid/basic 및 `Depth 1~4` 프레임·수동 Outline Container 조합으로 대신하지 않습니다. ConsentGroup을 `Consent Group`으로 이름만 바꾸거나 detach하지 않습니다. 원형 내부 Container의 라운드(현재 14px)·border/neutral/secondary-muted·stroke/md 및 변수 연결을 상속합니다.
- ConsentGroup의 최상위 1d 항목은 원형 Container에 있으며 하위 항목은 해당 **Slot**에 넣습니다. 하위 항목이 없는 그룹에 Divider·빈 항목·여백을 임의 추가하지 않습니다. 하위가 있으면 참조의 `Divider` 래퍼(하단 padding 12px)와 실제 1px secondary Divider를 유지하고, 종전 tertiary Divider·추가 외부 gap을 강제하지 않습니다.
- 뎁스는 Item / Consent의 공개 **`variant`**로 지정합니다. `hasSubLabel`, `hasSuffix`, Prefix·Suffix의 공개 속성과 내부 실제 컴포넌트 연결을 유지하며 기획에 없는 보조 설명·이동 화살표는 숨깁니다. 문구만 해당 Label에 매핑하고 원형 텍스트 스타일·크기·Weight·색상·변수를 보존합니다.

| Item / Consent variant | 역할 및 원형 레이아웃 |
| --- | --- |
| `1d` | 상위 약관. 상하 padding 16px, gap 8px, Prefix check-large. 보조 문구는 hasSubLabel true로 원형 SubLabel 사용 |
| `2d` | 하위 약관. 상하 padding 12px, gap 8px, Prefix check-small. 상세 이동이 있으면 Suffix pageIndicator |
| `3d-group` | 동의항목 소제목 + 하위 체크. padding 0 0 12px 32px, Top 상하 12px, Slot-Depth-3 안 GridContainer에 3d 항목 배치. 참조 펼침 Suffix는 up |
| `3d` | 하위 체크 항목. 상하 padding 4px, gap 8px, Prefix check-small. 참조의 hasSuffix false 보존 |
| `4d-group` | 추가 선택 소제목 + 선택 항목. padding 0 0 12px 32px, Top 상하 6px, Slot-Depth-4 안 GridContainer에 4d 항목 배치 |
| `4d` | 4단계 선택. 상하 padding 4px, gap 8px. Prefix는 기획에 따라 radio 또는 check-small로 실제 원형을 선택 |
| `description` | 그룹에 직접 노출되는 설명. 원형 14px Light, padding-bottom 12px를 유지하고 별도 Text·Infobox로 임의 치환하지 않음 |
| `textList` | 약관 그룹 하단 부가 안내. 원형 Divider 래퍼 상하 8px, Container 상하 12px, Slot-TextList gap 8px 및 실제 TextList / Unordered size 14 유지 |

- **Grid 분기**: Slot-Depth-3의 체크 목록은 참조처럼 GridContainer Vertical / gap 0입니다. Slot-Depth-4는 짧은 항목에 GridContainer GRID / 2열 균등 FLEX / 행 Hug / 행·열 gap 0을 사용하며, 4항목은 2×2, 2항목은 1×2입니다. 행 수는 기획 항목 수에 맞추고 긴 항목은 대응 참조의 줄바꿈·배치를 유지합니다. 이름이 GridContainer라도 실제 flow를 확인합니다. 일반 Radio Group·Checkbox Group의 gap 20px를 이 원형 Slot 목록에 덮어쓰지 않습니다.
- 원형 내부 padding으로 들여쓰기를 구현하므로 예전 `Depth 3 padding 4px 20px 12px`·Consent Area padding-left 20px·수동 Outline Container를 추가하여 중복 들여쓰기하지 않습니다. 그룹 내부 gap 0, 그룹 간 gap 12px, BODY gap 24px를 구분합니다.

### C. 약관 BottomSheet와 TextList 확인형
- **BottomSheet**: 제목 `약관동의` 및 닫기 표시, handle 비노출 / hasStickyButton true / hasScrollDim false를 대응 참조에서 유지합니다. Slot은 Fill·Hug / padding 0 20px 20px / gap 20px이며, Container 1 안내문(16px Light) → Container 2 ConsentGroup(gap 12px) 순서입니다. StickyButton은 elevated / hasCTA true / hasSubButton false / hasScrollDim false, iOS HomeIndicator는 아트보드 하단 형제로 둡니다. 최소 콘텐츠 Slot Fill 등 별도 명시 조건은 해당 경우에만 적용합니다.
- **TextList 확인형**: Container 1 Title / Page(기획에 있는 Description), Container 2 `Title / Section → TextList Group` gap 16px, 목록 내부 gap 8px / TextList / Unordered size 16·bullet·depth 1, Container 3 **`ConsentFinal (variant: outline)`** 순서입니다. 원형 내부 Item / Consent(1d)는 hasSuffix false이며 확인 문구·체크 상태를 기획에 맞춥니다. 일반 약관 묶음인 ConsentGroup이나 구형 Consent로 대체하지 않습니다. ConsentFinal의 다른 variant(muted)는 기획·대응 원형에 맞을 때만 사용합니다.
- **검수**: 실제 최신 component key·Slot 부모·뎁스 variant, checkbox/radio와 선택 상태, hasSubLabel/hasSuffix·펼침 상태, 문구 줄바꿈·서체·변수, 그룹/항목 간격 및 Grid flow를 원형과 대조합니다. 공개 속성 전환을 유지하고 검수 뒤 기획 상태로 복원합니다. 참조의 더미 문구·디스크립션·상태를 임의 노출하지 않습니다.

---

## 5. 피드백 / Empty State 화면 전용 패턴 (Feedback Layout Rules)

**추가 Feedback 래퍼·패딩의 적용 범위 (2026-10-22 사용자 교정, 우선 적용)**:
- `Feedback`이라는 Auto Layout 프레임으로 실제 Feedback 인스턴스를 한 번 더 감싸 상하 24px 패딩을 주는 패턴은 **아래에서 정의한 데이터 없음(Empty State)의 해당 상황에만** 적용합니다. 컴포넌트 이름이 Feedback이라는 이유로 일반 안내·발급불가·오류·완료 화면에 일괄 적용하지 않습니다.
- [발급불가 안내 2130:4205](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2130-4205)는 데이터 없음 케이스가 아니므로 **`## BODY > Container > Feedback`(실제 인스턴스)**로 구성합니다. `Container > Feedback` 프레임 > `Feedback` 인스턴스 구조와 추가 상하 24px 패딩을 제거합니다. Container 패딩은 0이며 기존 원형 Feedback의 내부 패딩·간격은 바꾸지 않습니다.
- 이 화면의 좌우 여백 20px는 `## BODY`에 두고 Feedback 폭 350px를 유지합니다. BODY의 해당 화면용 상단 패딩(이 화면 40px)과 추가 Feedback 래퍼의 24px는 별개입니다. 래퍼 제거 시 기존 본문/제목·hasSubText·variant·아이콘·버튼·스타일·변수를 보존합니다. 사용자나 기획에 별도 명시된 래퍼가 있다면 해당 지시를 우선합니다.

**Feedback 제목·보조 안내 분리 (2026-10-22 사용자 교정)**:
- `Feedback > Title+error_text`에서 핵심 결과·제한 안내는 원본 `title`에, 뒤따르는 설명·해결 방법·다음 행동 안내는 해당 그룹의 원본 **`Text`**에 매핑합니다. 문구가 같은 기획 화면에 있다고 해서 모두 제목에 합치거나 빈 줄만 추가해 구분하지 않습니다. 기획과 사용자 지시의 제목/본문 위계를 유지합니다.
- [발급불가 안내 2130:4205](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2130-4205)의 `1회용 신청번호가 없으면\n가까운 지점에 방문해서 신청해주세요.`는 **`Title+error_text > Text`**에 넣고 공개 속성 **`hasSubText: true`**로 노출합니다. `title`에는 `만 14세 미만 고객은\n1회용 신청번호를 발급한 후\n신청할 수 있습니다`만 유지하며 보조 안내를 중복하지 않습니다.
- 동명의 `csInfomation > Text`나 Feedback 바깥 일반 Text로 잘못 매핑하지 않습니다. `Title+error_text`의 직계 자식 여부·실제 문구·가시성·공개 속성 연결을 검수하고 title/Text 각각의 원본 Text Style·변수·색상·원형 간격을 보존합니다. 주 제목의 굵기·크기를 보조 안내에 복제하지 않으며 문장 내 임의 강조·링크도 추가하지 않습니다.

**데이터 없음 아이콘 필수 (2026-10-21)**: 데이터가 없는 Feedback은 항상 `status-nodata`를 사용합니다. 검색을 연상시키는 `status-noResult` 돋보기로 대체하지 않으며, 아래 패턴별 크기·컨테이너·간격은 그대로 적용합니다. 승인 기준은 `zNwpdAWcBMOM5ExkiBUoGn / 2150:14233`입니다.
'조회할 계좌가 없습니다', '내역이 없습니다' 등 데이터 부재(Empty State) 화면의 상황별 오토레이아웃 규칙입니다. 아래의 추가 래퍼·패딩을 데이터 없음이 아닌 일반 안내·오류·완료 화면에 확대 적용하지 않습니다.

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

- **최종 사용자 교정 (2026-10-19)**: `Title / Section`과 `List Group`을 감싸는 오토레이아웃 프레임은 **`Title / List Group`**으로 명명합니다. 래퍼를 `List`라고 부르지 않으며, 실제 `List` 컴포넌트 인스턴스의 고유 이름은 그대로 유지합니다.
- **`Container 2`, `Container 3` 이상**: `Title / List Group`의 **padding-top 24px (`spacing/3xl`)**, 그 안의 `List Group`의 **gap 0px**을 적용합니다. `Title / List Group` 자체의 Title↔List Group gap은 기존 **16px (`spacing/xl`)**을 유지합니다. 철회된 내부 List Group gap 24px를 적용하지 않습니다. `Container 1`의 패딩·내부 목록 gap은 기존 규칙을 유지합니다.

### A. Body 패딩 및 간격 기본 규칙
- 링크 리스트가 열거되는 화면의 `## BODY`는 상단 패딩을 **`padding-top: 16px` (`xl` 토큰)**으로 적용합니다.
- **`## BODY` 내부 간격**: 링크 리스트만 열거되는 화면의 경우 `## BODY`의 간격은 Auto Layout **`gap: 0px`**을 적용합니다.
- `## BODY`의 좌우 패딩은 Full-Width Divider 등이 포함되므로 **`0px`**로 설정합니다.

### B. 단일 기본 원형 구조
- `Container [순번]` 내부에 **`Title / List Group`** 오토레이아웃 프레임을 배치:
  - 프레임 속성: Auto Layout **`gap: 16px` (`xl` 토큰)**, **`padding: 20px 20px 16px`**
- **`Title / List Group` 프레임 내부 구조**:
  1. 상단에 **`Title / Section`** 배치
  2. 하단에 **`List Group`** 오토레이아웃 프레임 (기본 Auto Layout **`gap: 4px` (`xs` 토큰)**; `Container 2` 이상에서는 **gap 0px**) 배치
  3. `List Group` 내부에 **`List`** 컴포넌트들을 순차 배치하고, 각 `List` 컴포넌트 사이마다 **`Divider / Horizontal (thickness: 1px, variant: tertiary, length: full)`**을 삽입
  4. **마지막 `List` 컴포넌트 하단에는 Divider를 생략**

### C. 복수 열거(누적) 시 Container별 패딩 및 Divider 규칙
링크 리스트 블록이 2개 이상 누적되어 쌓일 때의 순서별 규칙입니다.
- **첫 번째 `Container 1`**:
  - 내부 `Title / List Group` 프레임 속성: Auto Layout **`gap: 16px` (`xl`)**, **`padding: 0px 20px 16px`**
- **두 번째 및 중간 `Container [순번]`**:
  - `Container [순번]` 자체 속성: Auto Layout **`gap: 0px`**
  - 상단에 **`Divider / Horizontal (thickness: 10px, variant: tertiary, length: full)`** 배치
  - 그 아래에 `Title / List Group` 프레임 배치: Auto Layout **`gap: 16px` (`xl`)**, **`padding: 24px 20px 16px`**
  - 내부 `List Group`은 **gap 0px**로 설정합니다.
- **마지막 `Container [순번]`**:
  - 상단에 **`Divider / Horizontal (thickness: 10px, variant: tertiary, length: full)`** 배치
  - 그 아래에 `Title / List Group` 프레임 배치: Auto Layout **`gap: 16px` (`xl`)**, **`padding: 24px 20px 0px`**
  - 내부 `List Group`은 **gap 0px**로 설정합니다.

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
- **키패드 화면 상단 패딩**: `2071:3356` 기준으로 **`## BODY`의 `padding-top: 24px` (`spacing/3xl`)**를 적용합니다. Keypad 컴포넌트 내부 패딩이나 BottomSheet Slot 패딩과 구분하며 Container에 중복 적용하지 않습니다.
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
- **`Checkbox Group` (`CheckBox Group`) 내부 간격**: Auto Layout **`gap: 20px` (`2xl`)** 적용. Grid의 행·열 gap도 모두 20px이며 개별 CheckBox 원형 내부 간격은 보존
- **`Title / Section`과 `SelectButton` (Description 노출 시) 사이 간격**: 내부 Auto Layout **`gap: 24px` (`3xl`)** 적용
- **`Title / Section`과 `Infobox / Card` 사이 간격**: 내부 Auto Layout **`gap: 16px` (`xl`)** 적용
- **`Infobox / Card` 다음 콘텐츠와의 외부 간격**: `TextList`를 포함해 **`gap: 24px` (`3xl`)** 적용. 카드 내부 Slot/TextList 간격과 구분
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
  - Grid 적용 시: **`gap between columns: 20px` (`2xl`)**, **`gap between rows: 20px` (`2xl`)** 적용
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
  - `Image Area` 내부 패딩: **40px 0 (`spacing/6xl`)**, Vertical / Fill·Hug / gap 0. 내부 `ImageContainer`는 **ratio 2:1 / Fill·Fixed**로 콘텐츠 폭 350px 기준 350×175px, 전체 영역 350×255px. **원본 더미 그래픽과 편집 가능한 Pretendard SemiBold TEXT 라벨을 함께 보존**
  - `Image Area` 또는 단독 `ImageContainer` → 후속 콘텐츠(`ProgressStep`, `Infobox / Card` 등): **기본 외부 gap 24px (`spacing/3xl`)**. 래퍼가 있으면 Image Area 바깥 경계부터 측정하며 내부와 외부에 중복 적용하지 않음
  - `ProgressStep`과 `Infobox / Card` 간격: Auto Layout **`gap: 24px` (`3xl`)** 적용
- **Infobox / FullWidth 최상단 배치 시 하단 간격**: Auto Layout **`gap: 24px` (`3xl`)** 적용
- **약관 UI 간격 (v0.95 우선)**: BODY gap 24px, 반복 ConsentGroup 사이 12px, ConsentGroup 내부 Container·Slot gap 0px 및 Slot padding-bottom 8px를 유지합니다. Item / Consent의 1d/2d/3d/4d·group variant별 원형 padding과 Slot 구조는 §4를 따릅니다. 종전 Depth 프레임·수동 Outline Container 간격 규칙은 새 약관 구조에 적용하지 않습니다.
- **데이터 없음(Empty State) 피드백 화면 흐름 패딩 및 간격** (일반 안내·발급불가·오류·완료 화면에는 아래 추가 래퍼 패딩을 일괄 적용하지 않음):
  - 단독 피드백 화면: `Container [순번]`에 **`padding: 24px 0` (`3xl`)** 적용
  - Tab 직후 피드백 화면: `Container [순번]`에 **`padding-top: 40px` (`6xl`)** 적용, 내부 `Feedback` 프레임에 **`padding: 24px 0` (`3xl`)** 적용
  - `Tab - Infobox FullWidth` Container와 `InputField` 간격: Auto Layout **`gap: 24px` (`3xl`)**
  - `InputField`와 `Feedback (padding: 24px 0)` 간격: Auto Layout **`gap: 32px` (`5xl`)**
  - `Group` Container와 `Feedback (padding: 24px 0)` 간격: Auto Layout **`gap: 32px` (`5xl`)**
  - `Filter Group`과 `Feedback` 간격: Auto Layout **`gap: 16px` (`xl`)**
- **링크 리스트 그룹 간격**:
  - `Title / List Group` 내부 Title↔List Group Auto Layout **`gap: 16px` (`xl`)** 적용
  - `Container 1`의 `List Group` 내부는 **gap 4px (`spacing/xs`)**, `Container 2` 이상은 **gap 0px** 적용
  - `Container 2` 이상 `Title / List Group`의 **padding-top 24px (`spacing/3xl`)** 적용
  - Divider(10px) 포함 Container 내부 Auto Layout **`gap: 0px`** 적용
- **Card / Surface 및 Data Block 간 간격**: 내부 Auto Layout **`gap: 12px` (`lg`)** 적용
- **선택형 바텀시트 List 간 간격**: `Container 1` 내부 Auto Layout **`gap: 8px` (`md`)** 적용 (List 자체 좌우 패딩: 0px)
- **셀렉트 바텀시트 List 높이**: 체크마크 노출·비노출 모두 **48px / 세로 Fixed**. 비노출 시 46px Hug로 축소하지 않습니다. 항목 간 gap과 List 자체 높이를 별도로 검수합니다.
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
  - **최종 승인 기준 (2026-10-20)**: `2075:2064` 하단처럼 `hasPrefix: true` + `solid-info-circle`, `expanded: true`, 본문 TextList size 14 / Slot-contents gap 8px를 적용합니다. 외부 10px Divider와 내부 Divider 비노출을 구분합니다.
  - 그룹핑 간격: Auto Layout **`gap: 0px`**

---

## 8. Workflow & Processing Order (작업 지침)
1. **Figma 링크 분석 및 화면 식별/네이밍**:
   - 사용자가 전달한 Figma 와이어프레임 링크(또는 JSON/구조)에서 화면 흐름을 파악하고 일반/완료/바텀시트/Dialog/풀팝업/약관상세(PDF)/피드백/링크 리스트 화면 여부를 판별합니다.
   - 템플릿 선택 전에 페이지 형태와 사용자 지시로 화면 유형을 확인합니다. 일반 화면은 아트보드 직계 `## HEADER` / `## BODY` / `## FOOTER`가 기본이며, 풀팝업 명시 근거가 있을 때만 Popup을 사용합니다. iOS·인증·X 버튼·기존 Popup 템플릿만으로 분류하지 않고, 제작 후에도 실제 루트 계층을 대조합니다.
   - 링크된 화면과 주변 기획 영역의 페이지 ID를 함께 읽고 해당 화면과 연결합니다. 기획서 내 중괄호(`{ ... }`) 표기 명칭을 기반으로, ID가 있으면 **`실제페이지ID_화면명`**(예: `F730_화면명`), ID가 공란이면 **`화면ID_화면명`**으로 아트보드 레이어명을 확정합니다. 미확인 ID는 공란으로 처리하거나 추정하지 않습니다.
2. **아트보드 및 루트 프레임 세팅**:
   - **일반 및 완료 화면**: 가로 `390px` 기준 프레임 생성 후 `## HEADER`, `## BODY`, `## FOOTER` 3단 구조 세팅 (콘텐츠 양에 따라 Fill / Hug 적용). `## FOOTER` 내 `HomeIndicator`는 **`os: iOS`** Property를 적용합니다.
   - **바텀시트 화면**: 가로 `390px * 844px` 프레임에 배경 **`background/neutral/white`** 지정 후 `Dimmed` 배경(Absolute) -> `BottomSheet` -> `StatusBar`(Absolute, iOS/light) -> `HomeIndicator` (Property: **`os: iOS`**) 구조로 세팅.
   - **Dialog 화면**: 가로 `390px * 844px` 프레임에 배경 **`background/neutral/white`** 지정 후 `Dimmed` 배경(Absolute) -> `Dialog`(화면 정중앙 배치) -> `StatusBar`(Absolute, iOS/light) -> `HomeIndicator` (Property: **`os: iOS`**) 구조로 세팅.
   - **풀팝업 화면**: 배경 **`background/neutral/white`**, `StatusBar` (Absolute) -> `Popup` > `Slot` > `Header` (`AppBar`) + `Body` (`Container [순번]`) + `Footer` (`HomeIndicator: os iOS`) 구조로 세팅.
   - **약관 상세 화면 (PDF, v0.95)**: 아트보드 직계 StatusBar(Auto) + `Popup > Slot > ## HEADER / ## BODY / ## FOOTER`와 직계 Pagination / Carousel(Absolute) 구조를 사용합니다. §2.G 및 승인 참조31888:30615를 따릅니다.
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
   - `Checkbox Group`(`CheckBox Group`) 내부 반복 항목도 gap 20px이며 Grid의 행·열 gap 모두 spacing/2xl=20px를 적용합니다. 개별 Radio·CheckBox 내부 간격과 단일 CheckBox 래퍼 gap 0은 변경하지 않습니다.
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
     - `Title / Element` 필수 항목은 **`optional: false` 및 optional 래퍼 비노출**. 필수가 아닌 항목은 **`optional: true` 및 원형 `(선택)` 문구·색상·서체·스타일·변수 그대로** 노출. `(필수)` 표기나 색상 재정의를 추가하지 않습니다.
     - 단순 문장형 부연 설명/안내 문구는 `InputField`의 **`hasFooter: True`** 및 **`Item / Footer / hint`**에 적용
   - `SelectButton`과 `Title / Section (Description 노출)` 조합 시 `gap: 24px`를 적용합니다.
   - `Title / Section` 다음 `Infobox / Card` 조합 시 gap 16px를 유지하고, `Infobox / Card` 다음 콘텐츠와의 외부 gap은 TextList를 포함해 24px를 적용합니다. 카드 내부 간격과 혼동하지 않습니다.
   - 문장 내 강조·링크는 기획 또는 사용자 지시에서 명시된 구간을 빠짐없이 반영합니다. 강조 굵기는 동일 텍스트 크기·계열의 Medium 스타일/medium 변수로만 매핑하고 Bold·Semibold·크기 확대로 대신하지 않습니다. 단순 메뉴명·대괄호는 주변 본문 스타일을 유지하며, 기획에 없는 강조 굵기·강조색·밑줄·링크 동작을 추가하지 않습니다. 굵기·색상·밑줄·링크 유무를 각각 독립적으로 대조합니다.
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
     - **버튼형 선택지**: `GridButton` 실제 인스턴스를 우선 사용하고 Slot 내부 Grid의 행·열·아이템 수와 순서를 기획에 맞게 조정합니다. `2074:1554`의 1행 2열을 전역 고정하지 않습니다.
     - **액션 포함형**: `Card / Surface` 사용 (버튼/액션이 들어갈 때만 한정). 푸터 버튼형의 예시는 `Header (badge)` + `Body` 내 `Groups (gap: 16px)` > `Group (Card / Body / Group-A: titleMedium)` + `Group (vertical, gap: 12px, Card / Body / Group-C: textList)` + `Footer (Card / Footer / Button: buttonGroup)`. 상세 이동·선택형에 이 Footer 구조를 강제하지 않고 원본 variant/공개 속성·Slot을 따릅니다.
     - **액션 미포함형 (정보성 카드)**: **`Data Block`** 오토레이아웃 프레임(`border: stroke/md`, `border-color: border/neutral/secondary-muted`, `radius: 20px`, `padding: 20px`, `gap: 16px`) 구축. 상단에 `Title` 오토레이아웃 프레임 내 타이틀(`font-size/body/md`, `text/neutral/primary`) 배치 + 하단에 `DataList Group` 오토레이아웃 프레임(`gap: 12px`) 내 `DataList (layout: split, size: 14, hasDivider: false)` 배치
     - **동작 판정**: Footer 버튼 외에 상세 이동·이체·체크·라디오·박스 전체 선택도 Card에 해당합니다. 외부 형제 `Button Area`의 버튼만으로 Data Block을 Card로 바꾸지 않습니다. 상태 Label만 있는 경우도 자동으로 Card에 해당하지 않습니다.
     - **설명·안내형**: 기존 Infobox로 정의되지 않은 설명·주의·상태 메시지는 **`Text Box`**로 직접 구성합니다. 참조 패딩 20px, 내부 gap 16px, 라운드 14px를 각각 DS 토큰으로 연결합니다.
     - **스타일 선택**: 아웃라인 경계가 반복·중첩되면 `surface/neutral/tertiary-muted` + border 제거 형태를 우선 고려합니다. 역할과 스타일을 혼동하지 않고 주변 위계·밀도·가독성으로 선택합니다. Data Block의 승인된 부모님 기본정보 패턴은 내부 gap 20px를 적용합니다.
   - **링크 리스트 패턴**: 래퍼 이름은 `Title / List Group`이며 실제 `List` 컴포넌트 이름과 구분합니다. 단일 원형은 padding 20px 20px 16px / 목록 gap 4px, 누적형 첫 번째는 padding 0px 20px 16px / 목록 gap 4px입니다. Container 2 이상은 10px Divider 아래 래퍼 padding-top 24px, 내부 List Group gap 0px를 적용합니다(중간 padding 24px 20px 16px / 마지막 24px 20px 0px). Title↔목록 gap 16px는 유지합니다.
   - `TextList` 적용 시 위치에 따라 Property `size: 14` 또는 `size: 16`을 분기 적용합니다.
   - `List` 컴포넌트가 `Container` 내부로 들어갈 때 자체 좌우 패딩을 `0px`로 조정합니다.
   - **약관 UI (v0.95)**: §4의 ConsentGroup과 Item / Consent(1d·2d·3d-group·3d·4d-group·4d·description·textList), 각 Slot·GridContainer 및 TextList 확인형의 ConsentFinal을 실제 원형으로 적용합니다. 구형 Consent/Depth 프레임·수동 Outline Container로 재구성하지 않습니다.
   - **피드백(Empty State) UI**:
     - 먼저 실제 데이터 없음 케이스인지 판별합니다. 데이터 없음이 아닌 일반 안내·발급불가·오류·완료 화면은 추가 Feedback 프레임과 상하 24px 패딩 없이 Container에 실제 Feedback 인스턴스를 직접 배치합니다. 원형 내부와 BODY의 해당 화면 패딩은 보존합니다.
     - 단독형: `## BODY`의 `padding-top: 40px`, `Container [순번]` 패딩 `padding: 24px 0` 매핑
     - Tab 직후형: `## BODY`의 `padding-top: 0px`, `Container [순번]`에 `padding-top: 40px` 부여 후 내부 `Feedback` 오토레이아웃 프레임에 `padding: 24px 0` 매핑
     - 인풋/그룹 직후형: `Feedback` 오토레이아웃 프레임으로 한 번 더 감싸고 `padding: 24px 0`, 상단과의 간격 `gap: 32px` 매핑
     - Filter 결합형: Filter Area `0 20px`, 간격 `gap: 16px` 매핑
     - Card 피드백형: Card `padding: 48px 0`, `radius: 16px`, 테두리/배경 매핑
   - **완료 화면**: `Container 1`의 `Feedback` 다음에 `Container 2`를 배치합니다. Container 2는 `Title / DataList Group`들을 **gap 32px**로 열거하며, 각 그룹은 `Title` + `DataList Group`의 **gap 16px** 구조입니다. Title은 Vertical Auto Layout으로 `Title / Element` + `Divider / Horizontal (thickness: 1px, variant: primary, length: full)`을 **gap 12px**로 묶고, DataList Group은 `DataList (layout: split, size: 14, hasDivider: false)`를 **gap 12px**로 묶습니다. Container와 하위 그룹의 패딩은 0이며, BODY 패딩과 40px 간격을 중복 적용하지 않습니다.
   - `Title / Page` → `Image Area` gap 0px, `Image Area` 또는 단독 `ImageContainer` → 후속 콘텐츠 기본 외부 gap 24px를 검수합니다. 래퍼가 있으면 Image Area 바깥 경계부터 측정하고 내부·외부 gap 중복이 없는지 확인합니다. 승인 참조 `10580:10543`처럼 Image Area padding 40px 0, 내부 이미지 ratio 2:1 / Fill·Fixed(폭 350px 기준 350×175px), 전체 영역 높이 255px와 **원본 더미 그래픽·“더미이미지” 라벨의 실제 포함 여부**를 확인합니다. 빈 이미지 영역만 배치하거나 라벨이 편집 가능한 Pretendard TEXT 대신 SVG·벡터·이미지인 경우 실패입니다.
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
