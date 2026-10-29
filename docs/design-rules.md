# 실측 디자인 규칙

## 숫자 전용 대표전화의 Pretendard 필수 적용 (2026-10-29 사용자 교정)

- **대표전화·전화번호가 숫자와 번호 구분 기호만으로 이루어진 독립 Text이면 반드시 `Pretendard`를 적용합니다.** 예: `1588-9999`, `1588-9999, 1599-9999, 1644-9999`. 하이픈(`-`)·쉼표(`,`)·공백·전화번호 표기용 괄호·국가번호의 `+`는 숫자 서식의 일부이며 문자·숫자 혼용으로 판정하는 근거가 아닙니다.
- 종전 **‘Dialog 대표전화는 KBFG Text를 우선한다’는 예외는 삭제**합니다. 참고 화면의 KBFG 서체를 복제하거나 대표전화라는 역할을 근거로 이 숫자 규칙을 우회하지 않습니다. 대표전화 제목은 별도 문자 Text이므로 KBFG Text를 유지하며, 숫자만 있는 번호 Text는 Pretendard로 각각 판정합니다.
- `대표전화 1588-9999`처럼 문자와 숫자가 실제 하나의 Text에 섞인 경우는 기존 원칙대로 전체 KBFG Text입니다. Pretendard 적용을 위해 혼용 Text를 임의로 분할하지 않습니다. 이미 제목·번호가 분리된 구조를 하나의 혼용 Text로 합쳐 숫자 서체 적용을 피하지 않습니다.
- 최신 라이브러리에서 해당 숫자 역할·크기·굵기에 대응하는 Text Style·fontFamily 변수를 사용합니다. 번호의 크기·행간·자간·색상·밑줄·원문·자연 줄바꿈·Hug/Fill과 `Title / Text` 구조, 8px/16px/4px/20px 간격 및 컴포넌트 연결은 보존합니다. Pretendard Variable이나 다른 서체로 임의 대체하지 않습니다.
- 완료 검수에서 실제 번호 Text의 **font family가 `Pretendard`인지**, 숫자용 스타일·변수 연결과 하이픈·쉼표가 있는 번호 전체에 동일하게 적용됐는지 확인합니다. KBFG로 남아 있으면 실패입니다. 이 MD 갱신만으로 기존 Figma 화면을 수정했다고 보고하지 않습니다.

## 더보기 간격·Dialog 문장부호 최종 기준 (2026-10-29 사용자 변경)

- **상위 목록 그룹 → 더보기 `Button Area` 간격은 항상 20px(`spacing/2xl`)**입니다. `Card Group / Button Area`, `Data Block Group / Button Area` 및 같은 역할의 목록·더보기 조합에 적용하며, 실제 두 형제 블록을 감싸는 Auto Layout의 gap에 연결합니다. 더보기는 `Button Area > Pagination / Basic` 등 원형 구조를 유지하고, 목록 내부 항목 간격이나 더보기 컴포넌트 자체의 패딩으로 20px를 대체·중복 가산하지 않습니다. 지정 화면 `2484:33969`의 `Card Group / Button Area`(`2484:33982`)도 이 기준을 적용합니다.
- **Dialog Title의 마침표는 기획 원문 그대로 유지합니다.** Title 단독인지 Title·Description 조합인지에 따라 마침표를 자동 추가하거나 제거하던 종전 공통 규정은 삭제합니다. 기획에 마침표가 있으면 유지하고 없으면 추가하지 않으며, Description 노출을 바꾸어도 제목의 문장부호를 별도로 정규화하지 않습니다. 문구·숫자의 소수점·기타 문장부호도 원문과 대조합니다.
- 완료 검수에서는 목록 하단 → 더보기 영역 상단의 실제 20px 및 토큰 연결, 실제 자식 구성에 맞는 부모 명칭, Dialog 원문과 마침표 일치를 확인합니다. 원형 컴포넌트·서체 변수·공개 옵션·HomeIndicator의 Dialog Fill 숨김 규칙은 유지합니다.

## 기획에 명시된 배지 보존 (2026-10-29 사용자 확정)

- **기획에 배지로 표시된 상태·짧은 강조 정보는 최신 라이브러리의 실제 `Badge` 인스턴스로 유지합니다.** 일반 Text, 임의 색상 문구, 수제 둥근 프레임이나 `Label`로 임의 대체하지 않습니다. 이번 제출현황의 ‘처리중’·‘처리완료’도 배지로 표시합니다. 배지에 없던 상태·문구·동작을 추측해 추가하지 않습니다.
- 기준은 [배지 Usage 6261:123851](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=6261-123851)입니다. 이 영역에는 `Badge / Default`와 `Label / Default`가 함께 있으므로 예시의 실제 컴포넌트와 정보 역할을 구분합니다. Badge의 NEW·추천·투자상품 등 짧은 강조, Label의 위험도·가입조건·상품 카테고리·유형·테마·유효기간 등 분류·보조 정보 예시를 구분하고, 모두 Badge 또는 모두 Label로 일괄 변환하지 않습니다. 사용자가 배지로 지정한 이번 상태 표시는 그 지시를 우선합니다.
- `Badge / Default`의 공개 `variant`·`tone`을 사용해 기획의 문구와 강조 위계에 맞춥니다. 이번 상태 배지는 `variant: character`, 처리중 `tone: blueTint`, 처리완료 `tone: brandAltMuted`로 적용했습니다. 이 두 색을 모든 업무 상태의 고정 색으로 일반화하지 않습니다. Dot·Number·Account 등 다른 Badge 유형은 해당 의미가 기획에 있을 때 선택합니다.
- 원형의 서체·크기·내부 패딩·라운드·색상 변수와 가로·세로 Hug를 유지합니다. detach·도형 재제작이나 내부 스타일 override로 variant 동작을 막지 않습니다. 짧은 배지 문구에 고정 폭을 주지 않고 공개 옵션을 바꿔도 원본 동작이 유지되어야 합니다.
- 검수에서 기획의 배지 개수·문구·상태별 노출과 실제 Badge 인스턴스, variant/tone, Hug·줄바꿈·주변 간격·부모 명칭을 확인합니다. 배지를 넣었다는 이유로 액션 없는 데이터를 Card로 변경하지 않으며, Card/Data Block 판단과 반복 그룹 규칙은 그대로 적용합니다.

## 알려드립니다 항상 펼침 (2026-10-29 사용자 확정)

- **‘알려드립니다’ Accordion은 제작·수정 후 항상 `expanded: true`로 펼쳐 본문을 노출합니다.** 기획서의 기본값이 접힘이거나 원형·이전 제작본이 접혀 있어도 이 사용자 확정 규칙을 우선 적용합니다.
- 완료 검수에서 실제 인스턴스의 `expanded` 값과 본문 가시성·줄바꿈·높이·잘림 여부를 확인합니다. 검수 중 상태를 전환했다면 마지막에는 반드시 펼침으로 복원하고 상위 Auto Layout·화면 높이를 반영합니다. 기존 전폭 Container·10px 외부 Divider·`hasDivider: false`·본문 크기·간격과 원형 화살표·공개 옵션 연결은 보존합니다.
- 적용 대상은 **‘알려드립니다’**이며 다른 용도의 Accordion은 각 기획·사용자 규칙을 따릅니다. 이번 요청은 공유 MD 갱신이며 기존 Figma 화면 전체를 일괄 수정했다는 의미가 아닙니다.

## 약관 참조 재확인·Slot 구분선 보존 (2026-10-29 사용자 교정)

- **현재 참조를 역할로 구분**: 약관 템플릿 탐색 시작점은 [Templates 페이지 10552:10031](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=10552-10031)이며 페이지 자체를 개별 화면으로 복제하지 않습니다. 상위·하위 동의 목록의 기본 참조는 [Depth 1+2 31061:78124](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78124)입니다. [78292 초기 레이블](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78292)·[78209 실제 문구](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78209)는 1~4뎁스·긴 문구·체크/라디오·Grid의 기준, [78333 BottomSheet](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78333)는 시트의 기준입니다. 필요한 사례의 실제 자식·속성·간격을 확인하고 최신 라이브러리 원형을 import합니다.
- **종전 참조 오분류 교정**: 2026-10-29 재확인 시 `31061:78151`은 프레임 이름이 “Depth 1+2”여도 실제로는 `Item / Consent(1d)`의 “상품설명서”만 있는 단일 항목 사례입니다. 이를 하위 동의가 있는 화면의 기준으로 사용하지 않습니다. 하위가 없는 경우에는 Divider·빈 목록을 추가하지 않습니다. 종전 `78179`(1+2+3)·`78354`(TextList16+ConsentFinal) 등 별도 유형은 해당 역할에만 유지하며 일반 동의 목록과 혼용하지 않습니다.
- **하위 항목이 있는 ConsentGroup의 필수 구조**: `ConsentGroup > Container > Item / Consent(1d)` 다음 `Slot`의 첫 자식은 `Divider` Vertical Auto Layout이며 그 안에 실제 `Divider / Horizontal(variant: secondary, thickness: 1px)`를 둡니다. `Divider` 래퍼는 가로 Fill·세로 Hug·gap0·padding 0 0 12px 0(`spacing/lg`), 선은 내부 폭 Fill·높이1px입니다. 그 뒤에 기획에 맞는 `Item / Consent(2d / 3d-group / 4d-group / description / textList)`를 배치합니다. 이 구분선은 상위 선택과 하위 목록 사이의 구조 요소이며 기획에 상세 이동 화살표가 없다는 이유로 제거하지 않습니다.
- **Slot 교체 시 구조 보존**: 문구·항목을 교체할 때 더미 콘텐츠만 선별하여 제거하고 필수 `Divider` 래퍼·선과 원형 계층은 보존합니다. 콘텐츠용 Slot을 재구성해야 한다면 위 필수 구조를 먼저 복원한 뒤 항목을 넣습니다. Slot을 비우고 체크 항목만 추가한 상태, Divider 누락·중복, 빈 프레임이나 외부 gap으로 12px를 대신한 상태는 실패입니다. 일반 콘텐츠용 Slot 편집은 허용하되 variant 자동 타입 전환의 원형 연결을 끊지 않습니다.
- **위계·서체·간격**: 1d는 원형 16px Bold·상하16px·check-large, 2d는 16px Medium·상하12px·check-small, 내부 Slot gap0·하단8px와 Container 좌우20px를 유지합니다. 3d/4d는 대응 원형의 32px 들여쓰기·하단12px·Grid 분기·각 Text Style/변수를 그대로 따릅니다. 반복 ConsentGroup은 실제 `[명칭] Group` Auto Layout으로 묶고 그룹 사이12px를 적용합니다. 원형 padding에 추가 들여쓰기를 중복하지 않습니다.
- **상태와 역할은 실제 기획 우선**: `78124`의 전체 선택 상태를 모든 화면의 초기값으로 복사하지 않습니다. 기획이 미선택이면 1d·각 하위 Item / Box를 checked false로 두고, 비활성·indeterminate와 구분합니다. 상세 이동이 없으면 hasSuffix false, 설명이 없으면 hasSubLabel false입니다. 개별 선택 문장은 해당 동의 뎁스로, 직접 설명은 description으로, 별도 본문+확인형은 TextList16+ConsentFinal로 매핑합니다. 긴 문장이라는 이유만으로 타입이나 Weight를 임의 변경하지 않습니다.
- **화면 외곽과 원형은 구분**: 일반 약관은 승인 참조의 BODY padding24/20/32/20·gap24 및 Title / Page를 적용합니다. 기획에 명시된 전폭 StepIndicator가 있는 작성 단계는 별도 전폭 규칙(BODY 상단·좌우0, 하단32 / Container 1 전폭 / 후속 본문 Container 좌우20)을 유지하고, 일반 참조에 없다는 이유로 단계를 제거하거나 제목을 중복 추가하지 않습니다. BottomSheet·TextList 확인형·PDF 상세 역시 각 대응 구조를 따릅니다.
- **완료 판정**: 현재 component key뿐 아니라 각 Slot 첫 Divider의 존재·secondary/1px·Fill·하단12px 토큰, 항목 개수·문구·실제 뎁스·Prefix/Suffix·선택 상태·그룹12px·서체/변수·긴 문구 줄바꿈을 함께 확인합니다. native 인스턴스를 사용했다는 사실만으로 통과시키지 않습니다. 구조를 고친 뒤 부모 명칭·실제 높이를 다시 확인하고 최종 화면을 직접 검수합니다. 이번 교정 대상 `bDKgQrkt0oHMJ1EbPUQTp8 / 3346:1492`는 두 그룹의 구분선 누락을 복원한 사례이며 기획의 6개 하위 문구·미선택·CTA는 유지합니다.

## StepIndicator → Infobox / Solid → Feedback 간격 (2026-10-28 사용자 확정)

- 승인 참조는 [원천징수영수증 계좌 없음 3272:24337](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3272-24337)입니다. **StepIndicator 아래에 Infobox / Solid, 그 아래에 Feedback이 이어지는 흐름에서는 두 구간의 외부 Auto Layout gap을 모두24px(`spacing/3xl`)로 적용합니다.** StepIndicator → Infobox / Solid와 Infobox / Solid → Feedback 각각에 적용하며 일반 BODY/인포박스 후속 간격32px를 상속하지 않습니다.
- 컴포넌트가 Container 또는 별도 래퍼로 묶여 있어도 해당 두 블록을 직접 배치하는 부모의 itemSpacing에24px 토큰을 연결합니다. Empty State 규칙에 따라 `Feedback` Auto Layout이 실제 Feedback 인스턴스를 감싸는 경우 **Infobox / Solid → Feedback 래퍼 사이 gap이24px**이며, 래퍼 내부의 상하24px 패딩은 별도 계층입니다. 승인된 데이터 없음 패딩을 외부 gap과 혼동해 삭제하거나, 외부 gap24px를 만들려고 패딩·빈 프레임으로 대신하지 않습니다.
- 적용 범위는 위 조합의 두 구간입니다. Feedback 뒤 후속 콘텐츠의 외부 gap40px, 알려드립니다의 전폭10px Divider + Accordion(hasDivider:false) 구조, 원형 내부 간격·서체·아이콘 및 사용자 편집 상태는 유지합니다. 이 사례를 모든 Infobox나 모든 Feedback 앞뒤 간격의 일괄24px 변경으로 확대하지 않습니다.
- 완료 검수에서 부모 itemSpacing과 `spacing/3xl` 연결, StepIndicator→후속 블록24px 및 Infobox→Feedback(해당 래퍼)24px를 실측하고, 외부 gap과 Empty State 내부 패딩을 구분합니다. 기존 사용자 수정 구조가 이미24px이면 유지하고 관련 없는 레이어를 재구성하지 않습니다.

## 대표전화가 포함된 Dialog의 구조·서체·간격 (2026-10-28 사용자 확정)

- 승인 참조는 [대표전화 포함 Dialog 3138:28871](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3138-28871)입니다. **설명과 대표전화를 하나의 Description 문장으로 합치거나 동일한 14px Light 본문으로 처리하지 않습니다.** 대표전화가 기획에 있는 경우에만 아래 독립 블록으로 구성하고 실제 번호·문구는 해당 기획을 따릅니다.
- **구조**: `Dialog > Slot` 안에 상단 제목·설명 블록과 대표전화 블록을 형제로 배치합니다. 대표전화 블록은 `Title / Text` Vertical Auto Layout이며, `Title / Element`(“대표전화”)와 `Text` Auto Layout(gap0) > 번호 Text로 구성합니다. 대표전화 제목을 번호와 같은 Text에 합치거나 Description 타입을 추가하여 대체하지 않습니다. Dialog와 하위 컴포넌트는 최신 라이브러리에서 새 인스턴스로 가져오며 승인 화면의 override를 복제하지 않습니다.
- **위쪽 간격**: 상단 설명의 끝 → 대표전화 블록의 시작은 **16px(`spacing/xl`)**입니다. 실제 Slot의 두 블록 사이 itemSpacing으로 연결하며 padding·빈 프레임을 중복 가산하지 않습니다. **대표전화 제목 → 번호 Text는 4px(`spacing/xs`)**로 연결합니다. 일반 제목 뒤16px·반복 그룹24px 규칙을 이 승인된 전화 블록 내부에 적용하지 않습니다.
- **상단 제목·설명 그룹핑 필수**: 대표전화가 노출되는 이 Dialog에서는 **대표전화 위의 `Title`과 설명 `Text`도 실제 하나의 Vertical Auto Layout `Title / Text`로 묶습니다.** 이 상단 그룹 내부 gap은 **8px(`spacing/md`)**입니다. 따라서 `Dialog > Slot`의 직계 자식은 **상단 `Title / Text`(Title + Text)**와 **하단 `Title / Text`(대표전화 Title / Element + 번호 Text)**인 두 형제 블록이며, 두 그룹 사이 gap은16px입니다. Title·Text·대표전화를 Slot에 평탄하게 세 항목으로 나열하거나, 대표전화 블록만 그룹핑한 상태는 실패입니다. 각 원형 컴포넌트·텍스트 스타일과 변수 연결은 보존하고 완료 검수에서 상단의 실제 그룹핑·부모 명칭·8px/16px/4px 계층을 함께 확인합니다.
- **대표전화 제목**: 최신 `Title / Element`의 **KBFG Text / 14px / Medium / line-height20px**, 색상 **`text/neutral/primary`**를 유지합니다. optional·tooltip·suffix는 false입니다. 대응 Text Style은 `Dynamic/Body/sm∙14∙Medium`(key `87439f01ad7a7fbf6b1556036328a19d5f0ef75c`)이며 medium 변수 연결을 유지합니다.
- **전화번호 (2026-10-29 교정)**: 숫자와 번호 구분 기호만 있는 번호 Text는 **Pretendard / 16px / line-height22px**, 색상 **`text/neutral/secondary`**, 밑줄 없음으로 적용합니다. 굵기와 서체 연결은 해당 역할에 대응하는 최신 라이브러리 숫자용 Text Style·변수를 사용하며, KBFG Text 스타일(`Dynamic/Body/md∙16∙Bold`)을 번호의 기준으로 재사용하지 않습니다. 하이픈·쉼표·공백은 숫자 서식이므로 Pretendard 판정을 바꾸지 않습니다. 대표전화에 KBFG를 우선하던 예외는 삭제하며, 번호를 이유로 링크·전화 연결 동작을 임의 추가하지 않습니다.
- **크기 모드·주변 영역**: 두 블록과 Text 래퍼는 가로 Fill·세로 Hug, 번호 Text는 가로 Fill·내용에 따른 높이 및 자연스러운 줄바꿈을 사용합니다. 참조의 280px 본문 폭에서 번호가 두 줄인 것을 고정 높이44px나 강제 개행으로 복제하지 않습니다. Dialog Slot → 별도 자세히보기 Accordion → ButtonGroup의 원형 관계와 간격은 유지합니다. 이 참조의 대표전화 블록 아래 Accordion과의 간격은 **20px(`spacing/2xl`)**이며 Dialog 제목·설명의 문장부호는 기획 원문을 따르고 HomeIndicator Fill 숨김 예외는 유지합니다. 참조의 다른 레이어 누락이나 문구를 규칙으로 상속하지 않습니다.
- **완료 검수**: 설명→대표전화16px, 제목→번호4px, 번호→후속 Accordion20px의 실질 간격과 토큰, Title / Element 인스턴스·옵션, 제목14 KBFG Medium/primary·번호16 Pretendard/secondary의 숫자용 Text Style·변수, Fill/Hug·줄바꿈·실제 번호·부모 명칭을 확인합니다. 대표전화 문구를 설명에 이어 붙이거나 상단 설명 스타일을 번호에 그대로 사용하는 것은 실패입니다. 이번 요청은 MD 규칙 갱신이며 기존 Figma 화면의 일괄 수정 완료를 의미하지 않습니다.

## 긴 문장 선택의 sentence SelectButton·링크 primary/medium (2026-10-28 사용자 확정)

- **긴 문장의 선택 항목은 SelectButton(type: sentence)**을 사용합니다. 승인 사례는 [발급서류 선택 635:31188](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=635-31188)의 “직불카드 사용금액확인서 / 현금카드 사용금액확인서”입니다. 기존 기획·화면이 Radio로 표현돼 있어도 이와 같은 문장형 서류·항목 단일 선택은 **SelectButton(type: sentence, variant: single)와 Item / Sentence / Single**로 매핑합니다. 사용자 지정 이전 Radio 사례 링크는 3205:54840입니다.
- 문구가 간결한 항목은 기존 word 타입을 유지합니다. sentence 항목에 word용 한 행 균등 배치나 고정 폭·높이를 강제하지 않으며, 승인 사례와 최신 원형의 세로 배열·항목 가로 Fill/세로 Hug·줄바꿈·padding·Label/문구 크기 모드를 보존합니다. 설명이 없는 항목은 hasSubLabel false로 두고 문구·순서·선택/비활성 상태는 기획을 따릅니다. 이 규칙을 모든 Radio나 라디오 선택형 Card의 일괄 교체로 확대하지 않습니다. 별도 지정된 Card 선택 패턴은 유지합니다.
- **기획 또는 사용자 지시로 링크로 확정된 구간의 색상은 `text/neutral/primary`, 굵기는 동일 텍스트 크기·계열의 원본 Medium Text Style 및 `medium` 변수**를 사용합니다. 사용자 지정 링크 사례는 [3205:54857](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3205-54857)입니다. 종전 인라인 링크의 `text/neutral/secondary` 색상 지시는 primary로 대체합니다. 고정 색상·fontWeight, Bold/Semibold, 글자 크기 확대로 표현하지 않습니다.
- 링크 구간 외 본문의 스타일·변수를 보존합니다. 기존 인라인 링크의 Underline·Offset25% 규칙은 유지하며, 이 색상·굵기 교정을 이유로 기획에 없는 강조·밑줄·링크 URL·이동 동작을 추가하지 않습니다. 일반 메뉴명·대괄호만 보고 링크를 만들지 않고, 실제 URL·연결이 주어진 경우에만 그 값을 연결합니다. 모든 TextButton의 variant를 일괄 primary로 바꾸라는 규칙이 아닙니다.
- **완료 검수**: 실제 SelectButton type/variant와 내부 Sentence 아이템 타입·문구·선택 상태·Fill/Hug·긴 문구 줄바꿈·공개 옵션 연결을 확인합니다. 링크는 해당 구간의 primary 색상 변수·Medium 스타일/medium alias 연결, 동일 글자 크기, 밑줄과 실제 연결 유무 및 일반 본문 보존을 확인합니다. 직접 명시된 사용자 규칙을 우선하며 참조 화면을 조회했다는 이유만으로 원형 검수나 기존 화면 일괄 수정을 완료했다고 보고하지 않습니다.

## 바텀시트의 섹션 제목·텍스트 단락 간격 예외 (2026-10-28 사용자 확정)

- 승인 기준은 최신 MO 라이브러리 v0.95.4의 [단락 케이스 31034:86654](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31034-86654)입니다. **바텀시트 본문에 `Title / Section`과 텍스트 콘텐츠를 조합하는 경우**, 아래 12px/20px 규칙을 일반 제목·반복 그룹 간격보다 우선 적용합니다.
- **각 그룹 내부의 `Title / Section` → 텍스트 콘텐츠 gap은 12px(`spacing/lg`)**입니다. 일반 Text, Text Group, TextList Group 및 Text·TextList가 조합된 텍스트 콘텐츠에 적용하며, 일반 화면의 제목 후속 gap16px(`spacing/xl`)를 이 패턴에 상속하지 않습니다.
- **이러한 제목·본문 그룹 사이의 gap은 20px(`spacing/2xl`)**입니다. 이 그룹들을 직접 담는 BottomSheet Slot 또는 실제 부모 Auto Layout의 itemSpacing에 20px 토큰을 연결합니다. 일반 반복 제목·본문 그룹 사이 기본24px를 이 패턴에 적용하지 않습니다. 참조에서는 Slot의 세 Container 사이20px, 각 Container 내부 제목→본문12px입니다.
- **적용 범위를 구분합니다.** 바텀시트가 아닌 일반 화면은 기존 제목→콘텐츠16px·반복 제목/본문 그룹 사이24px를 유지합니다. TextList Group 내부 개별 항목 사이8px 등 하위 간격, 바텀시트 헤더·CTA와의 원형 간격, 별도 명시된 선택·약관 등 다른 패턴의 규칙은 이 예외로 일괄 변경하지 않습니다. 제목 컴포넌트 내부 gap8px를 제목과 외부 본문 사이12px와 혼동하지 않습니다.
- **구조·검수**: 실제 자식 구성에 따라 Text는 Text Auto Layout, 복수 Text는 Text Group, 복수 TextList는 TextList Group으로 구성하고, 혼합·상위 래퍼는 기존 명명 공식을 적용합니다. 참조의 일반 Group 명칭이나 예시 문구를 그대로 복제하지 않습니다. 필수 검수에서 바텀시트/일반 화면 분기를 먼저 판정한 뒤 해당 부모의 실제 itemSpacing·토큰과 실질 간격12px/20px, 하위 항목 간격 보존을 확인합니다. padding이나 빈 프레임으로 간격을 중복 가산하지 않습니다.

## 레이어 구조 자동 검수와 단일 화면 3분 목표 (2026-10-28 사용자 확정)

모든 제작 AI와 작업자는 다음 네 검사를 제작·수정 과정의 완료 조건으로 적용합니다. 기존 명명 규칙을 바꾸는 것이 아니라 실제 자식 구성에 맞게 적용됐는지를 검사하는 절차입니다.

1. **동일 항목 반복**: 실제 자식 유형·역할·개수를 확인합니다. 동일 항목이 복수로 연속 반복되면 하나의 Auto Layout으로 묶였는지와 `[명칭] Group`인지 검사합니다. 복수 Text는 `Text Group`, 복수 TextList 컴포넌트는 `TextList Group`입니다. 단수에 Group을 붙이거나 이름만 Group으로 바꾸고 실제로 묶지 않으면 실패입니다. 원형 컴포넌트 명칭과 별도 Container 순번 규칙은 유지합니다.
2. **Text·TextList 혼합**: Text와 복수 TextList가 함께 있으면 TextList들을 실제 `TextList Group`으로 먼저 묶고, Text와 그 그룹의 부모를 `Text / TextList Group`으로 명명합니다. 여기에 Title이 결합된 상위는 `Title / Contents`입니다. 텍스트만 있는 곳이나 혼합 본문 전체에 `TextList Group`을 일괄 적용하지 않습니다. 다른 조합도 실제 구성과 기존 복합 명명 공식을 대조합니다.
3. **구조 변경 후 부모 재검사**: 자식 추가·삭제·재배치·그룹핑·컴포넌트 교체 후 해당 래퍼와 영향을 받는 상위 부모의 이름을 다시 판정합니다. 예를 들어 본문이 Text / TextList 혼합으로 바뀌었다면 과거의 `Title / TextList Group`을 남기지 않습니다. 문구·서체/변수·컴포넌트 연결·기획 순서·해당 계층의 간격도 보존됐는지 확인합니다.
4. **불일치 수정 후 재검사**: 불일치가 있으면 구조와 명칭을 수정한 뒤 영향을 받은 범위와 상위 부모를 다시 검사하고 통과한 경우에만 완료 보고합니다. 변경 ID와 실제 부모·자식 구성, 검사 결과를 제작 호출에서 함께 반환합니다. 미검사·실패·도구 제한은 PASS로 처리하지 않으며, 문서에 검사를 기재한 것만으로 실행한 것으로 간주하지 않습니다.

**시간 목표는 단일 화면 3분 이내로 유지합니다.** 네 검사는 가능한 한 같은 제작 스크립트·호출 안에서 이미 읽거나 생성한 노드 정보를 사용해 묶어서 수행합니다. 검수만을 위한 반복 전체 조회를 추가하지 않고, 불일치·변경·미확인 범위만 재조회·재검사합니다. 최신 라이브러리 확인과 필수 구조·서체·화면 검수는 생략하지 않으며, 통과 후 변경이 없으면 반복하지 않습니다. 3분을 넘으면 지연 원인과 남은 작업을 짧게 알리고 작업을 이어갑니다. 3분은 목표이며 품질 검사 생략이나 완료 시간 보장을 뜻하지 않습니다. 별도 요청 없는 추가 보고서는 작성하지 않습니다.

## 중첩 제목 그룹 명명과 아코디언 제목 위계 (2026-10-28 사용자 교정)

- 승인 기준은 [주택자금대출 납입연도 선택 3205:51104](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3205-51104)입니다. `Container 1` 안에서 두 개 이상의 `Title / Accordion Group`처럼 완성된 제목·콘텐츠 조합 그룹을 다시 감싸는 상위 래퍼는 **`Title / Contents`**로 명명합니다. `Title / Accordion Group > Title / Accordion Group`처럼 상·하위 역할을 같은 조합명으로 중첩하지 않습니다. 하위의 각 실제 제목·아코디언 조합은 `Title / Accordion Group`을 유지합니다. 직접 자식이 두 개라는 이유로 상위 래퍼도 같은 이름을 붙이지 않으며, 기존 3개 이상 요소의 Contents 규칙과 별도로 이 복합 위계에도 Contents를 적용합니다. 단순 동일 컴포넌트 반복의 `[명칭] Group` 규칙은 유지합니다.
- **반복 `Title / TextList Group` 사이 간격은 24px(`spacing/3xl`)**입니다. 아코디언 `Slot-contents`가 이 그룹들을 직접 담으면 Slot의 실제 itemSpacing을 24px 토큰으로 연결합니다. 원형 Slot의 기본 8px를 상속해 서로 다른 제목·본문 블록을 붙이지 않습니다. 개별 `Title / TextList Group` 내부의 제목→본문 16px와 `TextList Group` 내부 항목 간격 8px는 별도 계층이며 그대로 유지합니다.
- 상위에 `Title / Section`이 있으면 아코디언 내부의 **소득공제 대상·소득공제 한도 등 한 단계 아래 소제목은 최신 `Title / Element` 인스턴스**로 적용합니다. 이 사례의 바깥 “장기주택저당차입금 이자상환증명서”, “주택자금 상환증명서(전세자금대출)”는 `Title / Section`을 유지합니다. 내부 제목까지 같은 Section으로 만들거나 일반 Text의 크기·굵기만 임의 조정하지 않습니다. Element의 원형 스타일·변수·Hug/Fill·공개 속성을 보존하고 기획에 없는 optional·tooltip·suffix는 비노출합니다.
- 완료 검수에서 실제 부모·자식 명칭, 반복 그룹 사이 24px와 내부 16px/8px의 구분, 바깥 Section/안쪽 Element 인스턴스·서체 변수 연결, 전체 본문의 보존 및 줄바꿈을 확인합니다. 원본 라이브러리와 기획서는 수정하지 않습니다.

## 선택 UI 역할·균등 Fill 승인 실측 — 2026-10-28

사용자는 기존3211:19156의 정렬순서 SegmentedControl과3211:20711의 작은 Hug 항목을 잘못된 UI로 지적하고, 승인3205:38245·3205:38078을 제시했다. 정렬순서는 기획에서 segmented_control로 표기했지만 실제 DS 매핑은 SelectButton이어야 한다. 이번 요청은 MD 갱신이며 승인 화면과 기존 산출물을 변경한 기록이 아니다.

3205:38245의 SelectButton3205:38489는 word/single·hasTitle true·350×72px, slot Horizontal·Fill/Hug·Wrap WRAP·gap8px다. 최신순/과거순 Item은 각각171×44px·Fill/Hug이며 최신순만 selected true다. 같은 화면의 조회기간 프리셋은 SegmentedControl3205:38266을 유지하고 있다.

3205:38078의 SelectButton3205:38509(이름 표시)·3205:38532(계좌번호 표시)도 word/single·350×72px이며 각 slot/Item의 크기 모드는 위와 같다. 두 Item의171px는 균등 Fill의 계산 결과이며 고정 폭이 아니다. 관측 선택값은 이름=일부가림, 계좌번호=보임이지만 다른 기획의 초기값으로 일반화하지 않는다. 최신 라이브러리 인스턴스를 가져온 뒤 이 승인 범위의 resizing만 적용하고 내부 Label/문구 Hug와 연결을 유지한다.

## 정렬순서·정보 표시방법의 SelectButton 매핑과 균등 Fill (2026-10-28 사용자 교정)

- **기획의 컴포넌트 명칭을 그대로 복제하지 않는다.** 기획은 항목·순서·문구·선택 상태·동작의 근거이고, 실제 UI 컴포넌트는 사용자 승인 패턴과 최신 MO 라이브러리의 역할을 기준으로 매핑한다. 기획에서 `segmented_control`로 그렸다는 이유만으로 정렬순서를 SegmentedControl로 제작하지 않는다.
- **정렬순서**: [승인 화면 3205:38245](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3205-38245)처럼 **SelectButton(type: word, variant: single, hasTitle: true)**을 사용한다. 제목은 “정렬순서”, 항목은 “최신순 / 과거순”이다. 기본값은 기획의 최신순 선택을 따르며 별도 지정된 초기 상태가 있으면 이를 우선한다.
- **조회기간과 구분**: 같은 화면의 “1개월 / 3개월 / 6개월 / 직접 입력” 조회기간 프리셋은 **SegmentedControl을 유지**한다. 이 교정을 모든 SegmentedControl의 일괄 교체로 해석하지 않는다. 조회기간·정렬순서가 같은 시각 형태로 그려졌더라도 역할별로 분리 매핑한다.
- **이름·계좌번호 표시**: [승인 화면 3205:38078](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3205-38078)처럼 “이름 표시”, “계좌번호 표시”의 “보임 / 일부가림”을 각각 SelectButton(word/single)으로 구성한다. 이와 같은 두 항목 단일 선택 UI는 아래 균등 Fill 패턴을 적용한다. 선택 상태는 기획을 따르고 승인 예시의 선택값을 다른 화면의 고정 기본값으로 복사하지 않는다.
- **실제 Auto Layout 필수값**: SelectButton 가로 Fill·세로 Hug → 내부 `slot` Horizontal, 가로 Fill·세로 Hug, 원형 Wrap 유지, gap8px(`spacing/md`) → 두 `Item / Word / Single` 모두 **가로 Fill·세로 Hug**. 좌우가 한 행에서 같은 폭으로 콘텐츠 영역을 채워야 한다. 부모만 Fill이고 개별 Item이 Hug인 작은 칩 형태는 실패다.
- 승인 예시의 콘텐츠350px에서 두 Item은 각각171px, 사이 gap8px, 원형 높이44px/Hug, SelectButton 전체 높이72px다. **171px·44px를 고정값으로 입력하는 지시가 아니다.** 폭은 `(부모 폭 - gap) / 2`로 계산되도록 Item Fill을 사용하며 원형 높이·내부 Label/문구 Hug·서체/변수·선택 스타일을 유지한다. 이번 Fill 조정은 사용자 승인 범위의 레이아웃 커스텀이고 detach나 시각 재현을 위한 프레임 교체를 허용하지 않는다.
- 복수 SelectButton은 `SelectButton Group`으로 묶고 기존 그룹 gap24px(`spacing/3xl`)를 유지한다. 제목은 원형 `Title / Element`를 사용하며 기획에 없는 optional·tooltip·suffix를 노출하지 않는다.
- **제작 전 분기와 완료 검수**: 조회기간 프리셋=SegmentedControl, 정렬순서·이름 표시·계좌번호 표시=SelectButton인지 먼저 확인한다. 실제 root type/variant, Item의 Fill/Hug, 항목 수·순서·선택 상태, 실측 균등 폭·gap8px, 한 행 배치와 문구 Hug를 최종 화면과 대조한다. 정렬순서의 SegmentedControl 잔존, Item Hug, 고정171px, 선택값 임의 변경은 실패다. 원형 공개 옵션 전환 검수도 별도로 유지하고 Slot 편집에 따른 자동 타입 전환 제한은 숨기거나 해결됐다고 보고하지 않는다.

## Figma 작업 속도와 필수 검수 (2026-10-29 공통 실행 기준)

이 절은 이 저장소의 MD를 공유하는 모든 작업자와 AI에 동일하게 적용합니다. 필수 디자인 규칙과 네 가지 레이어 검사는 유지하며, 아래 절차를 기본값으로 실행합니다. 다른 절의 원본 재조회·기록 지시도 이 작업 묶음과 보고 범위에 맞춰 적용합니다.

- **시간 목표**: 단순 다이얼로그는 1분 안팎, 일반 단일 화면은 3분 이내 완료를 목표로 합니다. 기획·원본 확인, 도구 대기, 제작과 필수 검수를 포함한 실제 작업 시간을 기준으로 하며 준비 시간을 제외해 달성한 것으로 보고하지 않습니다. 보장 시간이 아니며 3분을 넘기면 지연 원인과 남은 작업을 짧게 알리고 계속 진행합니다.
- **작업 묶음과 요구사항 먼저 확정**: 한 요청의 기획 URL·페이지 ID·제작 대상·배치 위치·케이스 수를 한 번에 정리하고, 이어지는 기획 프레임은 같은 화면의 콘텐츠로 연결합니다. 화면별 문구·순서·필수/선택·선택/비활성·오류 상태는 각각 매핑합니다. 같은 디자인 시스템과 공통 원형을 사용하는 여러 화면을 하나의 작업 묶음으로 처리하되 개별 화면의 내용·상태 검수를 생략하지 않습니다.
- **최신 원본은 묶음당 필요한 자산별 한 번 확인**: 지정 라이브러리의 현재 component key, 필요한 공개 속성·옵션, 실제 Slot과 편집 가능 범위, 하위 타입 전환, Text Style·variable key와 연결을 제작 전에 함께 확인합니다. 이번 묶음에서 직접 확인한 매핑·스타일·토큰은 여러 화면과 인스턴스에 재사용하고 같은 원본을 화면마다 다시 조회하지 않습니다. 새 작업 묶음, 원본 변경, 다른 파일/페이지 문맥, 새로 필요한 자산, 오류·불일치·누락이 있으면 해당 범위만 다시 확인합니다. 오래된 캐시나 주변 화면 복제를 최신 확인으로 대신하지 않습니다.
- **독립 조회·가져오기 묶기**: 기획·배치 위치·필요 원본처럼 서로 독립인 조회와 컴포넌트·스타일·토큰 import는 도구가 지원하는 범위에서 묶어 실행하고 모든 결과를 확인합니다. 필요한 노드·속성만 좁혀 읽고, 이미 읽은 공통 문서와 확인한 매핑의 전체 재조회·대량 출력·출력 잘림을 줄입니다. 의존하는 작업과 같은 노드를 수정하는 작업은 순차 실행합니다. 이 절은 별도 sub-agent 사용을 요구하지 않습니다.
- **검증된 스크립트에 데이터 매핑**: KBDS의 검증된 제작 스크립트·구조·상황별 검수 절차를 우선 재사용하고 현재 기획의 문구·항목 수·상태·위치만 매핑합니다. 같은 유형의 여러 화면은 복구 가능한 범위에서 한 제작 호출로 구성합니다. 컴포넌트는 확인한 최신 라이브러리에서 import한 새 인스턴스로 사용하며 원형의 variant·Slot·변수·Hug/Fill/Fixed 연결을 보존합니다. 캐시 재사용을 이유로 구형 화면의 override를 복제하지 않습니다.
- **기본 옵션을 제작 시점에 처리**: 기획의 제목·설명·optional·tooltip·prefix/suffix·아이콘·버튼 및 선택/비활성 상태를 제작 전에 결정하고 인스턴스 생성과 함께 반영합니다. 공개 속성을 우선 사용하며, 콘텐츠용 Slot에 독립 삽입된 더미·TooltipButton은 원형에서 허용한 Slot 편집 범위로 정리합니다. variant가 하위 타입을 자동 전환하는 연결은 끊지 않습니다. CTA Label 문구 Hug 등 원형 규칙을 유지하고, 변경할 Text의 현재 폰트를 먼저 불러오되 무관한 폰트 조회·설치·업로드는 반복하지 않습니다.
- **네 검사와 필수 검수를 제작에 결합**: ① 동일 항목의 실제 그룹핑과 `[명칭] Group`, ② Text·TextList 혼합의 각 그룹과 복합 부모 명칭, ③ 구조 변경 후 부모 이름, ④ 불일치 수정 후 해당 범위 재검사를 유지합니다. 제작 호출에서 변경 ID와 실제 구조·간격·서체·변수·Hug/Fill/Fixed·공개 옵션 및 필요한 상태 전환을 함께 확인합니다. 마지막에 각 완성 화면의 전체 스크린샷을 확인하며, 해당 화면의 수정 뒤에는 영향을 받은 화면만 다시 확인합니다. 통과 후 변경이 없으면 반복 검사·반복 캡처하지 않습니다. 공통 원형 확인 재사용과 개별 화면 시각 검수는 구분합니다.
- **단순 수정·오류는 해당 범위만**: 문구·데이터·속성 수정은 대상 노드와 영향을 받는 부모·레이아웃만 처리합니다. 전체 화면 분석·전체 라이브러리 탐색을 처음부터 다시 시작하지 않습니다. 도구 오류 시 반환된 롤백·재시도 조건을 따르고, 같은 API/속성 오류가 반복되면 정확한 정의와 매핑을 확인하여 공통 스크립트를 고칩니다. 추정 수정과 불필요한 중간 확인 호출을 반복하지 않습니다.
- **보고 최소화와 완료 기준**: 별도 요청이 없으면 정형 보고서·규칙별 적용표·추가 설명 파일을 생성하지 않고 제작 호출의 반환값과 실제 속성·화면 검수 결과를 근거로 완료를 판정합니다. 완료 결과·작업 링크·실제 남은 제한만 짧게 전달합니다. 사용자가 보고서나 하네스 검증 산출물을 요청한 경우에만 아래 파일별 기록 양식을 작성합니다. 속도 목표를 이유로 요구사항·최신 원본 확인·필수 검수를 생략하거나 미검증을 PASS로 보고하지 않습니다.

## 완료 안내·공유 바텀시트 승인 실측 — 2026-10-28

열람비밀번호 참조3105:17567의 Feedback3105:17616은 Large·높이378px이며 안내 Text40px, 별도 Card / Surface92px(padding20/radius16/lightGray), Card Slot의 DataList Group 두 줄(gap12), 외부 Slot-buttonGroup의 tertiary/medium 버튼으로 구성되어 있었다. 3176:21254의 Feedback3176:21303을 같은 구조로 교정했다. 원래 안내 Text에 합쳐진 비밀번호 두 줄을 카드의 개인/사업자 DataList로 옮겼고, 후속 데이터·구분선·버튼은 유지했다. 최종 스크린샷을 확인했다.

공유 참조3138:31620은 secondary GridButton, 1행3열·gap8·높이121px, secondary Item / Vertical과36px 공유 아이콘이다. BottomSheet211px·Slot Fill146px, HomeIndicator AUTO/Fill 노출이었다. 3176:20994도 현재 라이브러리의 새 secondary Grid와 항목·아이콘으로 교체하고 높이121px를 맞췄다. 원본 solid-message에 포함된 제작 주석 “삭제”는 산출물에서 숨겼다. 레이어명·문구·아이콘별 가시성은 별개로 검사한다.

현재 원본 key: Grid secondary 0530e8418043a151e5186a0396abb9631dc27625, Item secondary 354213b43192415da6bb527e97dd588f194875ff, solid-kakaotalk 5cc4fe8ca9547931c18c1659a5f4c7f397dddc6f, solid-message d822eedfe2465e2dbadce24a6cc7d5e3c775d15b, line-ellipsis-horizontal 3fcb5d5c2f0aa2847d37795946e4af6f93cf8597. 이 key는 탐색 기록이며 향후 최신 라이브러리 확인을 대신하지 않는다.

### 암호화 증명서 완료 화면의 열람비밀번호 안내 (2026-10-28 사용자 확정)

- 승인 참조: [3105:17567](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3105-17567), 적용 화면 [3176:21254](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3176-21254).
- 암호화된 증명서 발급 완료에서 열람비밀번호 안내가 있으면 **Large Feedback의 안내문과 비밀번호 데이터를 분리**한다. `Title+error_text > Text`에는 “발급받은 증명서를 확인할 수 있어요. / 확인 시 아래 열람비밀번호를 확인해주세요.” 안내만 둔다. 개인·사업자의 비밀번호 규칙을 이 Text에 이어 붙이지 않는다.
- Feedback 내부의 원형 `Card / Surface(type: lightGray, variant: basic)`를 노출하고 `Slot > DataList Group > DataList` 두 줄로 `개인 / 생년월일 6자리`, `사업자 / 사업자번호 10자리`를 표시한다. 실제 항목·값은 기획을 우선한다. 원형 카드 padding20px·radius16px·회색 무테를 유지한다. 이 지정 Feedback 내부 Card는 일반 Data Block의 아웃라인 규칙으로 임의 변환하지 않는다.
- DataList는 `layout: split, size: 14, hasDivider: false`, 목록 gap12px(`spacing/lg`), Label Hug·Data Fill/우측 정렬이다. 불필요한 suffix·tooltip은 숨기고 원형 KBFG Text 스타일·변수를 보존한다. “생년월일 6자리”처럼 문자와 숫자가 하나의 Text에 섞이면 전체 KBFG Text를 쓴다.
- `증명서 보기`는 **Card Slot 안에 넣지 않고**, Feedback의 형제 `Slot-buttonGroup`에 `BoxButton(variant: tertiary, size: medium)`으로 둔다. Label/버튼명은 원형 Hug를 유지한다. 순서는 **아이콘 → 제목·안내문 → 비밀번호 카드 → 증명서 보기**이며 Feedback Large의 원형 간격을 따른다.
- 실제 공개 속성 `hasErrorCode`가 이 Card의 가시성을 제어하므로 이 패턴에서는 `true`로 설정한다. 속성 이름만 보고 오류 코드 문자열을 넣거나 카드를 숨기지 않는다. `hasSubText`, `hasButton`도 true다. 후속 증명서 데이터는 기존 D19의 상단 primary Divider·16px/12px 간격을 유지한다.
- **실패 조건**: 비밀번호 규칙을 안내 Text에 합침, 카드 누락, 버튼을 Card Slot 안으로 이동, 임의 Infobox로 대체, 기본 오류 코드·더미 문구 노출, 후속 데이터 Divider 누락. 실제 구조와 최종 화면에서 검수한다.

### 공유 방법 선택 바텀시트 공통 패턴 (2026-10-28 사용자 확정)

- 모든 공유 방법 선택 바텀시트는 [승인 화면 3138:31620](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3138-31620)을 따른다. 적용 화면은 [3176:20994](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3176-20994)다. 승인 예시는 구조·배치 기준이며 컴포넌트와 아이콘은 현재 MO 라이브러리에서 직접 확인해 새 인스턴스로 가져온다.
- `BottomSheet(hasStickyButton: false, hasScrollDim: false) > Slot > GridButton(variant: secondary, type: grid) > Slot > Grid > Item / Vertical` 구조를 사용한다. primary의 테두리형 GridButton이나 기본 ICON 더미로 대체하지 않는다. 시트 제목 “공유 방법 선택”·닫기 버튼은 노출하고 Handle·하단 StickyButton은 숨긴다.
- Grid는 **1행 × 3열**, 열 균등 Fill, 행·열 gap8px(`spacing/md`), 콘텐츠 폭350px다. 항목은 **카카오톡 → 문자메시지 → 더보기** 순서이며 승인 예시처럼 높이121px를 적용한다. 각 `Item / Vertical`은 `variant: secondary, hasIcon: true, hasSubLabel: false, selected: false, disabled: false`이며 원형 서체·토큰·연결을 보존한다.
- 각 항목의 `IconContainer(size: 36)` 공개 instance-swap에 최신 원본 **solid-kakaotalk / solid-message / line-ellipsis-horizontal**을 각각 연결한다. 임의 그림·기본 ICON·잘못된 기관 심볼을 사용하지 않는다. 아이콘 안의 제작 주석·더미 텍스트는 화면 콘텐츠로 노출하지 않는다.
- 승인 규격390×844에서 BottomSheet 높이211px, Slot 높이 Fill, 내부 좌우·하단 padding20px를 유지한다. BottomSheet와 HomeIndicator는 Auto Layout의 AUTO 흐름으로 하단 연속 배치(gap0)하고, HomeIndicator elevated 배경 Fill은 노출한다. Absolute는 화면 레벨 Dimmed·StatusBar에만 적용한다. Dimmed 밑에 이전 화면·Popup을 깔지 않는다.
- **필수 검수**: secondary 원형, 3개 문구·순서, 실제 공유 아이콘과36px 크기, 단일 행·균등 열·gap8px·높이121px, subLabel/StickyButton 비노출, Slot Fill, AUTO·HomeIndicator Fill 및 기본 ICON·주석 노출0개를 최종 화면과 대조한다. 공유 주의 다이얼로그는 공유 방법 시트와 별도 화면으로 분리한다.



## 라디오 선택형 Card의 Body Affix 승인 — 2026-10-28

사용자 지정 bDKgQrkt0oHMJ1EbPUQTp8 / 552:13664를 읽기 전용으로 확인했다. 선택 Card2367:21103과 미선택 Card3138:28701 모두 Slot > Body의 직계 자식이 Groups와 Card / Header / Affix다. Body Horizontal·gap12·MIN/MIN·Fill/Hug, Groups Fill/Hug, Affix24×24 Fixed·AUTO·visible true다. Affix variant radio의 원형 key는 a4b2f2201f7cfd3ef54a0d9dd3154c3f19554790이며 내부 Item / Radio checked는 각각 true/false였다.

Card 직계의 기본 Affix는 ABSOLUTE·visible false로 유지되어 있다. 실제 노출 대상은 Body 안 Affix이며, 원형 기본 숨김 노드까지 일괄 노출하지 않는다. 향후 해당 Card 라디오 선택 패턴은 Body의 일반 흐름·노출 Affix1개·기획 상태 대응을 적용한다. 이 기록은 참조 확인과 규칙 갱신이며 승인 화면을 수정한 기록이 아니다.

## 전폭 StepIndicator·Tab 및 아웃라인 Data Block 승인 — 2026-10-28

사용자가 bDKgQrkt0oHMJ1EbPUQTp8 / 3138:27761을 승인 기준으로 지정했다. 실제 ## BODY 3138:27765는 padding0/0/32/0·gap24·폭390, Container 1 3138:27766은 padding0·폭390으로 StepIndicator 3138:27769를 감싼다. Container 2 3138:27770은 좌우20px·폭390, Data Block 3138:27771은 폭350·padding/radius20px다.

아웃라인 토큰은 fill surface/neutral/quaternary-muted(key13df17658e86efada0d0c1ba4402b88616a0efe1), border border/neutral/secondary-muted(key6f13cf9a41a7a40246b281a5b4a8270690e2226e), 네 변 stroke/md(key74a325f74c4c0478bb096db37a311858ac4c6b7e)다. 최신 제작본 3157:18116도 BODY 좌우0·전폭 Step390·후속 Container 좌우20·Data Block350 아웃라인으로 교정하고 화면을 확인했다. 이전 Data Block 회색 무테 관측은 이력이며 향후 기본 제작 지침으로 사용하지 않는다. Text Box·Card의 별도 스타일 범위는 유지한다.

## Dialog HomeIndicator 및 발급정보 교정 — 2026-10-28

사용자 최종 지시에 따라 bDKgQrkt0oHMJ1EbPUQTp8 / 3141:17347의 HomeIndicator 3141:17383은 elevated 배경 Paint visible false로 교정했다. 레이어와 내부 막대는 노출하고 변수·AUTO·크기는 보존했다. 앞선 일괄 Fill 노출 규칙의 Dialog 예외이며 일반·바텀시트는 true를 유지한다.

같은 파일 3142:17373·3142:17946의 네 Radio 조합은 최신 원형 key 826009ba1e4d4596eea115a3d7b410a2a55513e0의 SelectButton word/single 인스턴스 3147:17723·17796·17885·17940으로 교체했다. 한글은 한글 선택/표기여부 미선택, 영어는 영어·표기 안 함 선택이며 CTA 상태와 원래 문구를 유지했다. 이전 Radio 대체 제작은 승인 기준이 아니다.

## Dimmed 아래 배경 Popup 제거 — 2026-10-28

사용자는 bDKgQrkt0oHMJ1EbPUQTp8 / 3089:16173처럼 기획의 뒤 화면을 재현한 Popup을 제거하고 Dimmed만 배경으로 사용하도록 확정했다. 해당 화면의 배경 Popup 3089:16174를 제거했다. Dimmed·StatusBar는 ABSOLUTE, BottomSheet 3089:16619와 HomeIndicator 3089:16844는 AUTO로 교정했으며 기존 시트 y367/높이443·하단 안전영역과 전경 내용은 유지했다. HomeIndicator elevated Fill도 노출하고 최종 화면에 배경 Popup이 0개인 것을 확인했다.

이전 배경 Popup 또는 Fill·clip 래퍼 보존 기록은 당시 이력이며 이후 제작 기준이 아니다. 앞으로 바텀시트·다이얼로그·입력용 키패드 시트에서는 기획의 배경 화면을 재현하지 않는다. 실제 전경으로 명시된 풀팝업은 이 배경 제거 대상과 구분한다.

## HomeIndicator elevated Fill 노출 교정 — 2026-10-28

사용자 승인 참조 bDKgQrkt0oHMJ1EbPUQTp8 / 49:21704의 HomeIndicator는 background/neutral/elevated Fill visible true였다. 변수 key는 7c14df9dfaf712b02335c5846362892232fa14c4이며 현재 iOS 원형 key 7d9c0061e2c21c860f10b00b001d863e2ba92647의 해당 Paint는 visible false로 관측됐다. 원형 가시성 상속에 대한 사용자 승인 예외로 산출물 Paint만 노출한다.

요청 화면 3113:17785·3113:18332·3113:18621의 HomeIndicator 3113:18330·3113:18619·3113:19714 및 세 번째 화면 배경 Popup 내부 HomeIndicator를 같은 토큰의 Fill visible true로 교정했다. 변수·내부 막대·os iOS·AUTO·크기는 유지했고 세 화면 하단 배경을 스크린샷으로 확인했다. 향후 원형 숨김을 그대로 상속하거나 레이어 가시성만 검사하지 않는다.

## 바텀시트 배치 교정 — 2026-10-27

사용자는 Dimmed·StatusBar만 position(Absolute)이고 BottomSheet·HomeIndicator는 Auto Layout 흐름이어야 한다고 확정했다. 직전 산출물 bDKgQrkt0oHMJ1EbPUQTp8 / 3113:17785·3113:18332·3113:18621에서 BottomSheet와 HomeIndicator가 모두 ABSOLUTE인 오류를 확인했다. 화면 레벨 좌표로 외형을 맞추면서 컴포넌트의 흐름 배치를 놓친 제작 오류이며 승인 패턴으로 재사용하지 않는다. Vertical Auto Layout 하단 정렬·gap 0과 AUTO 자식으로 교정하고, 문자 키패드도 AUTO로 이어 붙인다. 원형 내부 계층·서체·변수와 최소 높이 규칙은 유지한다.

## Popup 내부 레이어명 원복 승인 — 2026-10-27

Popup > Slot 내부 3단 영역은 `Header`, `Body`, `Footer`로 명명합니다. 약관 상세(PDF)·키패드·패턴·일반 풀팝업에 동일하게 적용합니다. 종전 `## HEADER`, `## BODY`, `## FOOTER`로 변경하라는 지시는 철회되었으며 해당 Popup 내부 영역은 원복합니다. 일반·완료 화면의 아트보드 직계 `## HEADER`, `## BODY`, `## FOOTER`는 유지합니다. 명칭 외 Slot 계층·컴포넌트 연결·공개 속성·Fill/Hug/Absolute·패딩·간격과 하위 `Title Area`, `body`는 보존합니다. 아래 v0.95 관측 표의 `##` 표기는 당시 관측 이력이며 현재 산출물 명명 기준은 이 최신 사용자 지시입니다. 이번 MD 갱신은 Figma 라이브러리나 기존 화면을 수정한 기록이 아닙니다.


## 문자·숫자 서체 기준 최종 명확화 — 2026-10-28

사용자는 ① 하나의 Text에 문자·숫자가 함께 있으면 KBFG, ② 숫자와 문자가 별도 Text이면 숫자 Pretendard/문자 KBFG, ③ Table의 숫자 전용 셀은 Pretendard, ④ DataList 데이터가 숫자만이면 Pretendard/혼용이면 KBFG로 최종 확정했다. 제품 서체의 문서 표기는 KBFG Text다. 종전 2026-10-27 문서의 동일 Text 내 구간별 서체 분리 허용은 철회한다.

판정은 실제 레이어 경계와 값의 내용으로 하며 `123,000원` 한 Text는 KBFG Text, `123,000`과 `원` 별도 Text는 각각 Pretendard와 KBFG Text다. 숫자 값의 자릿수 구분자·소수점 등은 숫자 서체를 유지한다. 항목명과 별도 DataList 값은 각각 판정하고, 서체 적용을 위해 혼용 Text를 임의로 쪼개지 않는다. 기존 스타일·변수·크기·굵기·레이아웃·인스턴스 연결과 별도 승인 서체 예외는 유지한다. 이번 작업은 MD 갱신이며 Figma 화면을 일괄 수정한 기록은 아니다.

## v0.95 약관 상세·동의 레이아웃 관측 — 2026-10-27

사용자 지정 라이브러리 `09eGMNTNnkE0CTxPdr7lnk`의 Templates(작성중) 페이지 `10552:10031`에서 아래 7개 노드의 실제 계층·속성·크기·화면을 읽기 전용으로 확인했습니다. 이 7개는 사용자가 직접 승인한 최신 약관 기준이며, 과거 상세/Consent 기록을 새 제작의 기본으로 사용하지 않습니다. 세부 실행 규칙은 원문 §2.G·§4를 따릅니다.

| 참조 | 관측 |
| --- | --- |
| [31888:30615](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31888-30615) | 390×844, StatusBar Auto44, Popup Fill390×800, Slot내 ## HEADER56/## BODY Fill744/## FOOTER Absolute126, 아트보드직계Pagination Absolute x143.5/y686 |
| [31061:78124](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78124) | Depth1+2, BODY Fill/padding24/20/32/20/gap24, ConsentGroup 반복gap12. Slot 첫 Divider는 secondary/1px/Fill + 래퍼 하단12px |
| [31061:78151](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78151) | 현재 상품설명서1d 한 항목만 노출, 하위 목록·Divider 없음. 이름만 보고1+2로 분류하지 않음 |
| [31061:78179](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78179) | Depth1+2+3, 3d-group Slot-Depth-3의Vertical GridContainer/3d, description와hasSubLabel true 분기 |
| [31061:78292](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78292) | Depth1~4 초기레이블. 원형Slot/항목variant/그룹내순서를확인하는기준 |
| [31061:78209](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78209) | 긴문구/체크/라디오/4d-group. 4d GridContainer2열FLEX, 행Hug, 행·열gap0, 4개2×2/2개1×2, 그룹하단textList size14 |
| [31061:78333](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78333) | 약관동의BS, Slot gap20/padding0/20/20/20, ConsentGroup gap12, elevated StickyButton/외부iOS HomeIndicator |
| [31061:78354](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=31061-78354) | Title/Section→TextListGroup16px, size16/bullet/depth1목록gap8, 별도ConsentFinal outline/hasSuffix false |

현재 실제 원형 key:

| 컴포넌트 | key |
| --- | --- |
| Popup | `1a3d4fb4905fcd7965a48b908bff097c7db5dc76` |
| Pagination / Carousel black·medium | `6955cc776fae1a9f38a3e93e8ecabfe286a4db6c` |
| ConsentGroup (단일컴포넌트, Slot공개) | `3e734ffbcf9495c4b93f0cf5ecaf1c2b368c2063` |
| Item / Consent set | `e18b01671966d25d4d96d6b3d2484f990a2dc7fe` |
| Item / Consent 1d / 2d | `6496a1d3f06ba209cd782b2c11083e895e14c609` / `a74ee42ace75cc01015fc5a1fbf2ae23fdb24287` |
| Item / Consent 3d-group / 3d | `d6538a2ef603acb50d5dbecfcf4638bafa990b20` / `6b4292485405d45ac581450fde1049e17f086f54` |
| Item / Consent 4d-group / 4d | `abee473e01d486c0b794a8a17357381a84751e0d` / `d97b6bd74b0eb3f3a6e8b18800cc28a8152bbd47` |
| Item / Consent description / textList | `12d5f235b1c5b9768340adb114a319959d406565` / `c5125fd24a5180ae3ed2cdaef685b7895208fb48` |
| ConsentFinal set / outline | `5cc4f1a21b5f1d232d64c7bd33876f141b352044` / `068b1bc091f43d5b08e2ed250834cede68f204cd` |

ConsentGroup 자체는 fill/stroke가 없고 내부 Container가 좌우20px·radius14px·border/neutral/secondary-muted·stroke/md를 가집니다. 바깥에 구형 Outline Container를 추가하지 않습니다. Item / Consent variant는1d/2d/3d/4d/description/textList/3d-group/4d-group, 공개 boolean은hasSubLabel/hasSuffix, 공개 Slot은Slot-Depth-3/Slot-Depth-4/Slot-TextList입니다. variant마다 노출되는 Slot이 같다고 가정하지 않고 해당 variant의 실제 Slot을 사용합니다.

페이지 제목은 v0.95 참조에서 KBFG Text Medium 24px / 행간 34px, Text Style key `e305f8192953c305c51725efea442cd9183bcc57`, font-size/title/3xl key `d8bbf61377b02c0f276485f4dd71849defff2fa6`, line-height/title/3xl key `22879a5990b1c5f93501cb922e6ff269717d22aa`였습니다. font-weight/medium 연결을 보존하고 과거 22px/31px 관측값으로 덮어쓰지 않습니다. 새 제작 때 현재 라이브러리와 모드를 재확인합니다.

## 최신 라이브러리 직접 적용과 Title / Page 교정 이력 — 2026-10-23

사용자 확정에 따라 모든 컴포넌트는 MO 라이브러리 `09eGMNTNnkE0CTxPdr7lnk`의 현재 원형에서 import한 새 인스턴스를 사용합니다. 주변 화면과 과거 산출물은 컴포넌트 스타일·변수·override의 기준이 아닙니다. 아래 과거 산출물 복제·clone 기록은 당시의 관측 이력이며 앞으로의 컴포넌트 취득 절차로 사용하지 않습니다. 명시 승인된 배치·간격·그룹 패턴과 Data Block 등 직접 구성 예외는 유지하되, 하위 컴포넌트·토큰은 최신 원본에서 확인합니다.

라이브러리 C04. Data Display(`41:15109`)의 Title / Page set key는 `d3d20cc2ce86dc116973192a882d92e65fbcca23`, left variant는 `b5120eca8d05e42c7630eda45e476bd175d2944c`입니다. 원본 Slot의 페이지 제목은 Item / Label(page), key `4342531bb89cdf2bc0824e692ffcd7f87511c8cd`이며, 당시 관측한 제목은 KBFG Text Medium / 22px / 행간31px / Text Style key `a4d970f16ce5404c28e6e948667b88b96aa5cbec`입니다. font-weight/medium key는 `40167791d3f8a1ec1a4c60518753b3bde64b15c8`입니다. 고정 수치를 재입력하는 대신 원형 스타일과 변수 연결을 유지합니다.

작업본 `KFlklMvGmg0MXGfAXvpprn / 1367:7933`에는 기획안의 Bold 일반 Text와 굵기 변수가 남아 있었고, Title / Page가 같은 component key를 가리켜도 Slot 내용은 원본과 달랐습니다. 실제 Item / Label(page)를 import하여 교체했고 Medium 스타일·변수와 편집 가능한 문구를 확인했습니다. 이후 `1376:8065`, `1381:7773`도 원본 인스턴스에서 제작했습니다. 이 화면들은 새 작업의 원형 복제 대상이 아니라 교정 이력입니다. 모든 컴포넌트에서 mainComponent key 확인만으로 끝내지 않고 Slot·텍스트 스타일/변수·크기 모드·공개 속성 연결까지 대조합니다.

2026-10-23 반복 그룹 누락 교정: 기존 원문은 반복 컴포넌트의 Group 명명과 연속 InputField Group/gap24px를 이미 규정했습니다. 문의정보 입력2182:19277은 Container2182:19285의 직계 자식으로 InputField5개를 열거해 제작에서 누락했습니다. 페이지 Container와 좌우20px 패딩을 유지하면서 그 안에 InputField Group을 추가하는 구조로 교정합니다. 일반/조합 레이어의 동일 역할·명칭 반복에도 [명칭] Group을 명시하며 자식 순번 금지·단수 래퍼 예외·별도 Container 번호 규칙은 유지합니다.

## 인포박스 Slot 버튼 오배치 교정 (2026-10-23)

작업2180:8644는 hasButton false 상태에서 Slot-Contents 안 TextList Group 다음에 TextButton 앱 알림 설정을 직접 넣었습니다. 승인 라이브러리25386:80100은 hasButton true로 원형 Button Area를 노출하며 Slot-Contents의 직계 형제입니다. 참조는 기본 BoxButton 자리에 실제 TextButton(원형 key b6a8096e03e888ef8969ad417c39bf9356c84bd1)을 적용한 구성입니다. 원형 Button Area에서 이 TextButton을 사용하고 Slot의 기존 버튼을 제거하며, 본문2항목과 버튼 문구·기획에 없는 제목/아이콘 비노출을 유지합니다. Button Area는 Horizontal/우측 MAX·CENTER/Fill·Hug/gap12/padding-top4이며 Slot gap8입니다.

## Feedback과 하단 안내 사이40px 교정 (2026-10-23)

사용자 기준은 재외국민 비대상 안내2157:9320입니다. 기존 BODY2157:9324의 itemSpacing32px를40px로 바꾸고 spacing/6xl(key 5bc593ee6f05df006566535e37f5fce0ed3a085b)에 연결했습니다. Container 1(2157:9544) 안 실제 Feedback2157:9662의 하단과 후속 Container 2(2157:9795)의 상단 사이 실제 간격40px를 확인했으며 화면390×844를 유지했습니다. 이 사용자 확정은 Feedback 다음의 독립 본문·설명·목록에도 적용하며, 완료 화면의 후속 데이터 전용40px와 별도로 일반 안내 화면에서도 준수합니다. 내부 Feedback 간격이나 앞쪽 Chip → Feedback24px는 그대로 유지합니다.

## 항목에 포함된 스위치 medium — 사용자 확정 (2026-10-23)

사용자는 빠른 로그인 항목에 스위치가 포함된2347:15715를 기준으로 이러한 스위치의 공개 속성 size: medium을 지정했습니다. 이는 사용자 지시의 문서화이며 화면 속성을 실측하거나 수정했다는 기록은 아닙니다. 원본 인스턴스와 size 속성으로 적용하고 기획의 켜짐·꺼짐·비활성 상태 및 항목의 기존 구조·간격은 유지합니다.

## 키패드·패턴 Popup 및 제목 승계 — 사용자 확정 (2026-10-23)

사용자는 키패드나 패턴을 그리는 화면을 앞으로 Popup 틀로 만들도록 명시했습니다. 이는 종전 일반 인증·PIN 화면만으로 Popup을 추정하지 않는 규칙의 사용자 승인 예외입니다. 기준2380:12952는 실제 Popup과 AppBar(sub)의 hasTitle true를 사용하고 Label > 타이틀에 KB국민인증서 발급을 표시합니다. 제목 출처는 이전 화면 AppBar이며 본문 안내·아트보드명·페이지 ID가 아닙니다. 기준 문구를 모든 흐름에 고정하지 않고 기존 원형 서체·변수·공개 속성과 본문·키패드·패턴 컴포넌트를 유지합니다.

## 섹션 제목 16px·반복 제목 목록 그룹 24px — 사용자 확정 (2026-10-22)

사용자는 Title / Section 다음 콘텐츠 간격16px와 반복 Title / TextList Group 사이 기본24px를 구분해 확정했습니다. 전자칩 태그 2153:8503의 일반 텍스트를 제목 컴포넌트로 교체하면서 기존 gap8px를 남긴 것은 검수 누락이며, 상위 Title / Contents의16px도 반복 그룹 간격의 근거가 아닙니다. 수정 대상은 2153:8642·2153:8741의 itemSpacing16px(spacing/xl, key dd4b6787bca3ceba45b9b41a16963083cacea533), 2153:8641의 itemSpacing24px(spacing/3xl, key fb23d20e74566ea2a3280e9e3ca48e40122b6d95)입니다. 내부 TextList Group 항목 gap8px는 유지합니다.

## 일반 발급불가 안내의 추가 Feedback 래퍼 제거 (2026-10-22)

사용자는 [발급불가 안내 2130:4205](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2130-4205)가 데이터 없음 화면이 아니므로 Feedback을 다시 Feedback 프레임으로 감싸 패딩을 주지 않도록 교정했습니다. 수정 전 `## BODY`(`2130:4209`, padding 40/0/32/0) > `Container`(`2130:4210`, padding 0) > `Feedback` 프레임(`2130:4211`, padding 24/20/24/20) > Feedback 인스턴스(`2130:4212`)였습니다.

추가 프레임 `2130:4211`을 제거하고 기존 인스턴스 `2130:4212`를 Container의 직접 자식으로 옮겼습니다. 좌우 여백은 BODY로 옮겨 padding 40/20/32/20, Container padding 0과 Feedback 폭 350px를 유지했습니다. 전후 Component Properties 및 전체 텍스트·스타일·변수 동일성을 확인했습니다. 원형 Feedback 내부 간격과 앞서 분리한 Title+error_text의 title/Text는 유지했습니다. 이 변경은 Empty State 전용 추가 래퍼·패딩을 일반 안내에 잘못 확대 적용한 것을 교정한 것이며, BODY의 별도 상단 40px까지 없애는 지시는 아닙니다.

## Feedback의 보조 안내는 Title+error_text > Text — 사용자 교정 (2026-10-22)

대상 [발급불가 안내 2130:4205](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2130-4205)의 Feedback은 `2130:4212`, 내부 제목 그룹은 `I2130:4212;434:31639`입니다. 수정 전에는 주 제목과 `1회용 신청번호가 없으면\n가까운 지점에 방문해서 신청해주세요.`를 모두 title에 합쳤고 hasSubText false로 보조 Text를 숨긴 상태였습니다.

사용자 지시에 따라 title(`I2130:4212;434:31641`)에는 `만 14세 미만 고객은\n1회용 신청번호를 발급한 후\n신청할 수 있습니다`만 남기고, 보조 문구는 직계 Text(`I2130:4212;434:31642`)로 분리해 hasSubText true로 노출했습니다. title의 원본 22 Bold 스타일과 Text의 14 Light 스타일 key `b9f5d92dffa67d9779e50c32f2c9f732a727fe8a`, 변수·색상·Feedback large·버튼은 유지했습니다. 수정 후 title 높이 93px, 보조 Text 높이 40px로 확인하고 시각 검수했습니다. 이 원형 제목의 Bold는 문장 내 강조를 Medium으로 매핑하는 규칙과 구분합니다.

향후 핵심 결과와 보조 설명·해결 방법을 제목/본문으로 구분하고, csInfomation 아래의 동명 Text와 혼동하지 않습니다. 문구가 한 기획 화면에 있다는 이유로 모두 title에 합치지 않으며 Title+error_text의 실제 직계 자식·가시성·공개 속성·원본 스타일을 대조합니다.

## Image Area·ImageContainer 후속 콘텐츠 기본 gap 24px — 사용자 확정 (2026-10-22)

사용자는 Image Area(ImageContainer) 다음 콘텐츠와의 기본 gap을 24px로 재확정했습니다. 기존 Image Area 후속 규칙에 단독 ImageContainer 구성도 명시하며 `spacing/3xl`(key `fb23d20e74566ea2a3280e9e3ca48e40122b6d95`)을 사용합니다. 래퍼가 있으면 Image Area 바깥 경계부터, 단독 구성은 ImageContainer 경계부터 다음 콘텐츠까지 측정하고 내부·외부에 각각 24px를 더하지 않습니다. 별도 사용자 간격 지시를 우선하며 기존 내부 패딩·이미지 크기·더미 그래픽·편집 가능한 라벨·Title / Page → Image Area gap 0px는 유지합니다. 이번 변경은 사용자 규칙의 문서화이며 화면 수정이나 새 실측을 의미하지 않습니다.

## 키패드 화면 BODY padding-top 24px — 사용자 확정 (2026-10-22)

사용자는 [키패드 화면 2071:3356](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2071-3356)의 `## BODY` 상단 패딩을 24px로 지정했습니다. 키패드 화면의 BODY paddingTop에 `spacing/3xl`(key `fb23d20e74566ea2a3280e9e3ca48e40122b6d95`)을 연결하고 템플릿에 다른 상단 값이 있으면 이 최신 지시를 우선합니다. Container에 상단 패딩을 중복 추가하지 않으며 Keypad 원형의 내부 패딩·variant·숫자 배치, HEADER·FOOTER, BODY의 다른 속성은 유지합니다. BottomSheet Slot 패딩 변경 지시와 구분합니다. 이는 사용자 지정 규칙의 문서화이며 이번 작업에서 Figma 값을 측정하거나 화면을 수정했다는 의미는 아닙니다.

## 기획 강조 보존 및 동일 크기 Medium — 사용자 명확화 (2026-10-21)

사용자는 이전 지적이 기획에 없는 링크·Bold의 임의 추가에 관한 것이며, 기획에 있는 텍스트 강조는 그대로 반영해야 한다고 명확히 했습니다. 강조 구간과 링크 유무를 기획대로 보존하되 본문 강조 굵기는 동일 텍스트 크기·계열의 원본 Medium Text Style과 연결된 medium 변수로만 매핑합니다. 기획에 Bold로 표현된 강조도 14 Light → 14 Medium, 16 Light → 16 Medium처럼 처리하며 Bold·Semibold·크기 확대·고정 fontWeight로 바꾸지 않습니다. 굵기만 표시됐다면 색상·밑줄·링크를 추가하지 않고 각각 기획상 명시 여부를 따로 확인합니다.

종전 인라인 링크 스타일의 Bold 지정도 이 최신 Medium 기준으로 교정합니다. DS 제목·CTA 등의 원형 Weight 전체를 바꾸는 규칙은 아닙니다. 앞 절의 실제 작업본에서 관측한 14 Bold 기록은 과거 오류 관측값으로 유지하며 향후 권장 스타일로 해석하지 않습니다. 이번 변경은 문서 갱신이며 화면 수정 완료를 의미하지 않습니다.

## Infobox 후속 24px·선택 그룹 20px·임의 인라인 링크 교정 (2026-10-21)

사용자 확정: Infobox / Card 다음 콘텐츠와의 외부 간격은 spacing/3xl=24px(key `fb23d20e74566ea2a3280e9e3ca48e40122b6d95`)입니다. 단수·복수 TextList 등 콘텐츠 종류에 관계없이 적용하고 카드 내부 Slot·TextList 간격이나 카드 앞쪽 간격과 구분합니다. 종전 Card → TextList 12px보다 이 최신 규칙을 우선합니다. Radio Group 및 Checkbox Group(CheckBox Group)의 항목 gap은 spacing/2xl=20px(key `5491ce4ce8c48cc4a679f8cedc426cb96bb9a141`)이며 Grid 행·열 모두 20px입니다. 개별 컴포넌트 내부와 단일 CheckBox 래퍼 gap 0은 유지합니다.

조회한 [통지방법 변경 1151:257](https://www.figma.com/design/KFlklMvGmg0MXGfAXvpprn/?node-id=1151-257)의 Radio Group `1152:648`은 gap 16px였습니다. 인포박스 문장 `I1152:572;902:52528;1152:610;1026:36811`에서 `[고객정보조회(개인정보열람)]` 구간만 14 Bold(`b0999af182e5ce7eb9ea259cac7dfb02a47f9920`) / text/neutral/secondary / UNDERLINE이며 주변은 14 Light(`b9f5d92dffa67d9779e50c32f2c9f732a727fe8a`) / text/neutral/tertiary / 밑줄 없음이었습니다. 해당 구간의 실제 hyperlink 값은 null이므로 URL이 연결된 링크라고 보고하지 않습니다.

사용자는 기획에 해당 강조·링크가 없다고 확인했습니다. 링크로 명시되지 않은 메뉴명에 인라인 링크 표현 규칙을 적용한 매핑 오류이며, 메뉴명·대괄호만으로 강조나 이동 기능을 추가하지 않습니다. 일반 본문과 동일한 원본 스타일·색상·변수를 유지해야 합니다. 이번 작업은 MD 갱신과 화면 읽기이며 해당 Figma 화면을 수정했다는 의미는 아닙니다.

## 일반 화면의 Popup 래퍼 오적용 — 사용자 교정 (2026-10-21)

사용자는 [인증 요청(iOS) 2027:732](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2027-732)를 Popup으로 감싼 제작을 지적하고 [휴대폰 인증 2025:6834](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2025-6834)처럼 최상위 HEADER·BODY·FOOTER로 구성하도록 확정했습니다. 조회한 기존 작업본은 직계 `StatusBar` + `Popup`(`2027:744`) > `Slot` > `Header`, `Body`, `Footer` 구조였으며, 비교 기준은 직계 `## HEADER`(`2025:6835`), `## BODY`(`2025:6838`), `## FOOTER`(`2025:6878`) 구조였습니다.

일반 화면에 풀팝업 제작 규칙을 적용하고 루트 계층 검수에서 걸러내지 못한 오류입니다. 일반 화면은 최상위 3단 구조가 기본이며, Popup은 기획의 페이지 형태 또는 사용자 명시 지시에서 풀팝업임이 확인된 경우에만 사용합니다. iOS·인증/PIN·닫기(X) 버튼·기존 제작본의 Popup은 분류 근거가 아닙니다. 템플릿 재사용 전 화면 유형과 계층을 확인하고 완료 전 실제 직계 자식·Vertical Auto Layout·StatusBar의 HEADER 소속을 검사합니다. 이 기록은 사용자 승인 규칙과 기존 구조 관측의 문서화이며, 해당 화면을 수정했다는 의미는 아닙니다.

## 항목 선택 바텀시트 기본 체크마크 (2026-10-21)

사용자 확정: [계좌번호 선택 2230:10109](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2230-10109), BottomSheet `2230:10111`을 기준으로 합니다. 체크마크로 선택을 표시하는 List형 바텀시트에서는 **기획에서 지정한 초기 선택 항목·선택 순서가 우선**이며, 별도 지정이 없으면 **화면에서 위에서 두 번째 List**를 기본 선택으로 표시합니다. `눌러서 선택`처럼 안내 문구인 List도 노출 순서에 포함하고, 실제 데이터 항목만 세거나 순서를 바꾸지 않습니다.

선택 List의 `hasSuffix: true`와 `Slot-Suffix > Item / Suffix`의 `variant: checkMark`를 원본 공개 속성으로 설정합니다. 일반 단일 선택의 다른 항목은 `hasSuffix: false`입니다. 기획에 복수 선택이 명시되면 그 상태를 보존합니다. 체크 노출·비노출 모두 List 높이 48px / 세로 Fixed를 유지하며 문구·순서·서체·변수·우측 프로퍼티 패널 편집 연결을 보존합니다. 계좌 선택 전용 패턴에도 이 선택 우선순위를 적용합니다.

참조 화면은 조회 시점에 이미 두 번째 List만 hasSuffix true / Item / Suffix checkMark였으며, 5개 List가 모두 높이 48px / Fixed였습니다. 이번 규칙 반영을 위해 해당 화면을 다시 수정하지 않았습니다.

## Chip 직후 콘텐츠 간격 — 사용자 확정 (2026-10-21)

사용자 최종 교정: [2180:10209](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2180-10209)처럼 Chip / Basic 다음에 Feedback 또는 Feedback 래퍼가 놓이면 부모 Auto Layout의 itemSpacing은 **24px / spacing/3xl**(key `fb23d20e74566ea2a3280e9e3ca48e40122b6d95`)을 연결합니다. 종전 Feedback까지 포함했던 8px 지정은 이 경우에 한해 대체합니다. Data Block Group·목록·일반 본문 등 그 밖의 다음 콘텐츠와의 gap은 **8px / spacing/md**(key `05c59452624fbed61e5be4c26c8a03c54be6dcad`)를 유지합니다. 이는 사용자 지정 규칙이며 새 실측 결과나 화면 수정 완료를 뜻하지 않습니다. Chip 원형 내부 패딩, Data Block Group 반복 박스 gap 12px, Feedback 내부 패딩은 별도로 유지하며 빈 프레임·중복 padding-top으로 외부 간격을 추가하지 않습니다.

## 인포박스 단일 안내·본문 섹션 제목 사용자 교정 (2026-10-21)

사용자는 [발급폐기내역조회 2158:10984](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2158-10984)의 인포박스 내부에 단일 TextList / Unordered를 넣은 제작을 교정했습니다. 단일 안내는 불릿 없는 일반 Text > Content로 구성하고, Infobox / Card의 기존 14 Light / text/neutral/tertiary 및 Text Style·변수 연결을 유지합니다. 일반 본문에서 Title / Section 다음에 오는 단일 TextList의 불릿을 유지하는 별도 규칙에는 적용하지 않습니다.

[재외국민 비대상 안내 2157:9320](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2157-9320)의 재외국민이란?·재외국민 등록방법(1가지 선택)을 일반 Text로 만든 것은 섹션 제목 역할을 놓친 매핑 오류입니다. 실제 Title / Section 인스턴스와 원형 스타일·변수·속성을 사용하며, 아래 설명과 목록을 각각 일반 Text / TextList로 구분합니다. 단순히 같은 서체를 적용한 것은 컴포넌트 사용의 대체 근거가 아닙니다. 이번 요청은 MD 갱신이며 문서 반영을 실제 화면 수정 완료로 기록하지 않습니다.

## Chip 스와이프·아웃라인 Data Block·status-nodata 승인 (2026-10-21)

사용자가 구분한 이전 제작본은 `2150:13784`, 직접 수정한 기준은 [2158:8074](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2158-8074)입니다. 기준 Chip `2158:8561`은 single / extended false / hasControl false, 390×68px, clipsContent true입니다. Slot은 Horizontal / NO_WRAP이고 우측 ControlContainer는 노출되지 않습니다. 이전 제작본은 extended true의 WRAP·확장 화살표를 사용하여 가로 스와이프 기획을 바꾼 오류입니다. 이후 가로 스와이프 기획은 한 줄과 화살표 비노출을 유지합니다. 참조의 overflowDirection은 NONE으로 관측됐으므로 이 읽기만으로 실제 프로토타입 스와이프 동작을 검증했다고 기록하지 않습니다.

기준 Data Block `2158:8723`, `2158:8825`는 Fill `surface/neutral/quaternary-muted` key `13df17658e86efada0d0c1ba4402b88616a0efe1`, Border `border/neutral/secondary-muted` key `6f13cf9a41a7a40246b281a5b4a8270690e2226e`, 네 변 stroke/md key `74a325f74c4c0478bb096db37a311858ac4c6b7e`에 연결된 아웃라인입니다. padding·radius 20px, 박스 gap 16px, 내부 DataList Group gap 12px입니다. 이 수정의 핵심은 상단 회색 Infobox / Card와 반복되는 솔리드 배경을 피하는 것이며, 기존 문구·건수·DataList 구조·스타일은 유지합니다.

빈 상태 기준 [2150:14233](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2150-14233)의 Feedback `2150:14249`는 medium이며 내부 status-nodata 원본 component key는 `3404f84bcb3791ea34d4eef41ad5735df48dfe24`입니다. 현재 읽은 `2158:8919`의 Feedback `2158:9460`에도 같은 status-nodata가 연결되어 있습니다. 이전 제작의 status-noResult 돋보기 선택은 잘못된 근거이며, 향후 데이터가 없는 상태는 항상 status-nodata를 사용합니다. 문구·Feedback 크기·패턴별 간격은 별도로 유지합니다. 이번 요청은 MD 갱신이며 참조 화면은 읽기만 했습니다. Chip의 variant 전환 미해결 기록은 이 스타일 교정과 구분합니다.

## 작업자 프로퍼티 패널 편집 가능성 — 사용자 확정 (2026-10-21)

사용자는 이후 작업자가 우측 프로퍼티 패널에서 variant 등 원본 옵션을 바꿔도 정상 반영되는 산출물을 요청했습니다. 이는 Chip만의 교정이 아닌 전체 컴포넌트 전달 조건입니다. 실제 인스턴스·공개 옵션·내부 연결을 유지하고, 실제 콘텐츠 적용 후 유효한 옵션 조합의 양방향 전환에서 실제 내부 타입과 시각 상태·배치·문구·선택 상태·서체·변수를 원본 규칙과 대조합니다. 아래 Chip 실패 기록은 여전히 미해결이며 이 규칙 추가가 화면 동작 복구의 근거는 아닙니다. 원본 미지원 동작이나 Slot/도구 제약은 구분하여 알리고 정상 동작으로 보고하지 않습니다.

## Chip Slot override와 동작 보존 검증 (2026-10-21)

대상 `zNwpdAWcBMOM5ExkiBUoGn / 2158:8074`의 Chip `2158:8561`은 Slot을 비운 뒤 SolidChip 3개를 넣은 상태입니다. 원본 MO `09eGMNTNnkE0CTxPdr7lnk / 1027:61807`은 single에 SolidChip, multiple에 LineChip을 정의합니다. 새 원본 인스턴스를 아무 수정 없이 multiple로 바꾸면 LineChip으로 전환됐지만, 작업본의 맞춤 Slot은 SolidChip으로 유지돼 실패했습니다.

별도 임시 인스턴스에서 기본 아이템의 문구만 변경, selected만 변경, 마지막 항목 visible만 변경하는 세 경우를 분리해 검사했습니다. 현재 도구 경로에서는 세 경우 모두 multiple 전환 뒤 Slot 내부 SolidChip이 유지됐습니다. 임시 인스턴스는 모두 삭제했고 이 시험으로 실제 화면의 동작을 복구했다고 처리하지 않았습니다. 따라서 '새 인스턴스에 기본 아이템만 수정하면 해결된다'는 가정은 채택하지 않습니다. 이 결과만으로 Figma 전체의 동작이나 원본 라이브러리 변경 필요성까지 단정하지 않습니다. 실제 문구·상태를 적용한 인스턴스의 왕복 전환이 통과해야 원본 동작 보존 PASS입니다.

## 단일 InputField 오토레이아웃 명명 재확정 (2026-10-20)

승인 교정 화면 `zNwpdAWcBMOM5ExkiBUoGn / 2141:10091`에서 단일 입력을 감싼 프레임 `I2141:10093;752:55797;2141:10499`를 `InputField Group`에서 `InputField`로 수정했습니다. Vertical Auto Layout / 390×86px / 단일 자식 InputField 인스턴스 `I2141:10093;752:55797;2141:10534`와 기존 위치·패딩·크기·계층은 유지했습니다. 필요에 의해 단일 컴포넌트를 감싼 래퍼는 컴포넌트와 같은 이름을 쓰며, Group은 복수 반복에만 사용합니다. Full-Width·일반 화면·바텀시트에 같은 규칙을 적용합니다.

## 은행·증권사 선택 공통 화면 최종 기준 (2026-10-20)

사용자 최종 참조는 [2101:12453](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2101-12453)입니다. 390×844 화면의 BottomSheet `2101:12482`는 현재 높이 766px / hasScrollDim true / hasStickyButton true이며, StickyButton은 CTA·SubButton false / ScrollDim true입니다. Slot은 Fill·Hug / padding 0,0,20,0 / gap 24px이고, Tab(1depth, extendable false) → GridButton(secondary/grid, 좌우 padding 20px) 순서입니다.

내부 실제 Grid `I2101:12482;2554:147808;2101:12481;2597:176253;2101:12462`의 레이어명은 현재 Container 1이지만 layoutMode는 GRID입니다. 3열 FLEX 1·1·1 / 6행 HUG / 행·열 gap 8px / 18개 아이템입니다. Item / Vertical은 secondary, padding 16px, gap 12px, Fill·Fill, hasIcon true / hasSubLabel false이며 현재 셀은 약 111.33×100px입니다. IconContainer size 36에 기관별 원본 심볼이 연결되어 있고 Label·문구는 Hug·Hug입니다. 향후 동일 유형은 이 전체 구성과 속성을 통일하여 사용하며 기획에 맞춰 항목·순서·상태·행 수를 바꿉니다. 현재 6행·18개를 다른 목록에 강제하지 않습니다. 종전 아래 `2109:3661`의 기관별 원본 key 근거는 계속 유효하되 화면 패턴의 최종 기준은 `2101:12453`입니다.

## CTA Label Hug·기관별 심볼 확정 (2026-10-20)

CTA 원본 BoxButton(primary/large) key `fa61e02668d4cdbaa3804bebdf3b37cdef9b274d`의 Label은 Hug·Hug, 내부 `버튼명` TEXT도 Hug·Hug / WIDTH_AND_HEIGHT입니다. 원형 기본 문구의 측정 폭 49px는 Fixed 지시가 아닙니다. 승인 교정 `0P0j17OPstNhC3LWjBdBGy / 72:8029`의 ‘확인’은 고정폭 49 + HEIGHT override를 제거한 뒤 원형 Hug / WIDTH_AND_HEIGHT / 자연 폭 33px로 복원했습니다. ‘다시 촬영’은 원형 Hug에서 자연 폭 71px입니다. 33·49·71px를 제작 스크립트의 고정 width로 사용하지 않고 문구만 바꿉니다. 공통 본문 텍스트 처리에서 CTA 내부 Label/버튼명은 제외합니다.

은행 선택 승인 화면 `zNwpdAWcBMOM5ExkiBUoGn / 2109:3661`은 GridButton > Slot > Grid > Item / Vertical > IconContainer(size 36)를 유지합니다. 3행 3열·행/열 gap 8px, 기획의 ‘산업’ 중복을 보존하고 IconContainer 공개 속성 `icon#1029:35`만 해당 기관의 원본 심볼로 매핑했습니다. 원본 위치는 MO 파일 `09eGMNTNnkE0CTxPdr7lnk` / F07. System Icon `1:672` / 04 로고 `18273:39357`, description `logo/bg/bank/`입니다.

|항목|원본 심볼|component key|
|---|---|---|
|KB국민|004-국민은행-bg|`969c6fc330be845f0281651764a1cdce2a699646`|
|기업|003-기업은행-bg|`1044fcdde2ac6d7659d7fa8e82984c5c710607c4`|
|농협|011-농협-bg|`ad1c6471517df99d7d7158e8213e24856592cd3f`|
|산업(두 항목)|002-산업은행-bg|`199d229be1be231878c49fdd3c6d8f0d35291d81`|
|신한|088-신한은행-bg|`83421380f7b611c5e27c06706fb7af90c1fdb304`|
|우리|020-우리은행-bg|`d4b484b9f650e51ff418efd88559dff8f6898664`|
|우체국|071-우정사업본부-bg|`2da6044e20079ff5fee0736aad13e3b2ce65ec7b`|
|하나|081-하나은행-bg|`680b8b7b88a4c678eabaf84243f1c2c3680a7dc5`|

향후 은행·증권사 선택에서도 각 기관명과 원본 심볼의 실제 key를 대조합니다. 위 최종 승인 `2101:12453`의 3열·size 36과 전체 화면 패턴을 통일 적용하며, 목록과 행 수·선택 상태는 기획에 따릅니다. 증권사에는 해당 증권사의 원본을 확인하여 적용합니다. 기본 ICON이나 다른 기관 로고를 추정 대체로 사용하지 않습니다.

## 선택형 버튼 GridButton 승인 (2026-10-20)

기준 [신분증 촬영_모바일 2074:1554](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2074-1554)의 GridButton `2071:4500`은 실제 primary/grid 인스턴스(key `e48a66fa51b31fd8e86b1703a35f07c07e3373e0`)입니다. 계층은 GridButton > Slot > Grid > Item / Vertical이며, Grid `I2071:4500;2597:176342;2071:4497`은 layoutMode GRID / 1행 2열 / gridAutoTracks ROWS / 가로 Fill·세로 Hug / 행·열 gap 8px입니다. 두 열은 각각 FLEX 1, 행은 HUG입니다. 현재 350px 폭에서 아이템은 각각 171×121px입니다.

아이템 원형 key는 `291367f54029e6b11c4ca9550c83816ca72bffe1`, 속성은 variant primary / selected false / hasIcon true / hasSubLabel false입니다. 아이콘 영역은 36px이며, 사용자 지정 모바일 주민등록증·모바일 운전면허증의 아이콘과 레이블을 보존했습니다. 기존 상위 래퍼 `2074:1878`만 GridButton / Button Area로 정리했습니다.

같은 유형은 실제 GridButton을 사용하며 Slot 안 Grid의 행·열·아이템 수와 배치 순서를 기획에 맞게 수정합니다. 현재 1행 2열, 171×121px를 다른 기획에 고정 적용하지 않습니다. 선택·비활성 상태와 폰트·변수 연결은 원형을 유지하고 Card / Surface를 병렬 배치하여 대신하지 않습니다. 셀렉트 바텀시트 List 등 별도 전용 패턴은 유지합니다.

## InputField 필수·선택 및 하단 알려드립니다 최종 교정 (2026-10-20)

사용자 지정 [신분증 확인 2075:2064](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2075-2064)의 이름·주민등록번호·면허번호·발급일은 모두 필수입니다. 네 InputField의 Title / Element에서 optional 속성을 false로 설정하여 optional 프레임 전체를 숨겼습니다. 기존 `(필수)`와 강조색·서체 재정의는 원형의 `(선택)` 및 Text Style·색상 변수로 복원했습니다. 앞으로 필수는 optional 래퍼 비노출, 필수가 아닌 항목은 기본 `(선택)`과 원형 색상·서체·스타일·변수를 그대로 노출합니다. 필수 상태를 표시하려고 텍스트나 색상을 바꾸지 않습니다.

하단 알려드립니다의 승인된 원형은 전용 컨테이너 `2071:4202`(Full Width 390 / gap·padding 0) > 외부 Divider `2071:4203`(10px / tertiary / full, key `d1a200f3e40be0db71dc5873437dedd977d1b3e7`) → Accordion `2071:4207`(key `b92f854c8b1436c0fba64b704ae991e7d68028e3`)입니다. Accordion은 basic / standard / medium / expanded true / hasPrefix true / hasDivider false이며 Prefix는 solid-info-circle(key `c6afd5f6833dcfcd9bf15b7a9181e72c24beb700`)입니다. 본문 TextList / Unordered는 size 14, Slot-contents gap 8px입니다. 본문과의 간격은 32px, 위치는 하단 버튼 위이며 이 구성을 알려드립니다 노출 화면에 재사용합니다. 알려드립니다는 기획에서 기본 접힘으로 표시했더라도 expanded true로 항상 펼쳐 완료하며 실제 본문 노출·높이를 검수합니다. 내부 1px Divider 비노출과 외부 10px Divider 노출을 구분하고 Accordion만 단독 배치하지 않습니다. 이 화면의 사용자가 변경한 72×72 이미지 영역은 보존했습니다.

## 단일 항목 Data Block 승인 (2026-10-20)

기준은 [그룹 내 고객정보 제공 안내 1147:62](https://www.figma.com/design/KFlklMvGmg0MXGfAXvpprn/?node-id=1147-62)의 고객정보 제공내역입니다. `Container 2 (1148:2995)`의 형제 `Title / Section (1148:2996)` → `Data Block (1148:3021)` 사이 gap은 16px입니다. 박스는 Vertical / Fill·Hug / padding 20 / radius 20 / gap 16, Fill `surface/neutral/tertiary-muted` key `59093c4bcca6ee8f9e5f9af90d27f568edcef5b5`, strokes는 빈 배열입니다. 단일 자식은 `DataList (1148:3023)`이며 중간 `DataList Group`과 박스 내부 Title은 없습니다.

DataList 원형 key는 `689423c84906f367c21aa49c4bc1f8315ed8afa1`, 속성은 split / 14 / hasDivider false입니다. 가로 Fill·세로 Hug이며 원형 Slot은 Horizontal / gap 12입니다. Label은 가로 Hug / 좌측 정렬 / 14 Light style key `b9f5d92dffa67d9779e50c32f2c9f732a727fe8a` / `text/neutral/tertiary`; Data는 남는 폭 Fill / 우측 정렬 / 14 Medium style key `87439f01ad7a7fbf6b1556036328a19d5f0ef75c` / `text/neutral/primary`입니다. 참조의 350×60px 박스 안 DataList는 310×20px이며, 이 높이를 Fixed로 강제하지 않고 박스·DataList의 Hug를 유지합니다. 원본 인스턴스와 Slot 계층·서체·색상 변수 연결을 보존합니다.

박스 내부 라벨·값 쌍이 하나일 때 이 구조를 재사용합니다. 여러 항목을 담은 단일 박스는 이 예외에 해당하지 않으며 기존 DataList Group을 유지합니다. 완료 화면의 별도 Title / DataList Group 패턴도 일괄 변경하지 않습니다.

## 셀렉트 바텀시트 List 높이 통일 (2026-10-20)

사용자 확정: 체크마크가 보이는 List는 48px, 보이지 않는 List는 46px로 달라지던 상태를 **모두 48px / 세로 Fixed**(`layoutSizingVertical: FIXED`)로 통일합니다. `hasSuffix`는 체크마크 노출만 제어하고 비노출 상태에서도 높이를 유지합니다. 선택 전후 항목 위치와 목록 높이가 달라지지 않는지 검수합니다. 실제 List 인스턴스와 내부 계층·서체·변수 연결은 보존하며, 아이콘과 부연 문구가 있는 도움말/이용 방법 선택 List의 별도 높이에는 일괄 적용하지 않습니다.

## InputField 보조 버튼·도움말 선택 목록 승인 (2026-10-19)

InputField 뒤에 해결방법 등의 보조 버튼이 오는 패턴은 [2025:6834](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2025-6834)의 조합 `2025:7406`을 기준으로 합니다. `InputField / Button Area`는 Vertical / Fill·Hug / gap 12px이며 자식은 InputField → Button Area입니다. Button Area는 gap 0 / 우측 정렬 / Fill·Hug, TextButton은 `secondary / xsmall` / prefix false / suffix true / underline false / Hug·Hug입니다. 2026-10-20 최종 교정 참조는 [2025:7407](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2025-7407)의 TextButton `2025:7417`이며, 실제 secondary/xsmall 원형 key는 `b6a8096e03e888ef8969ad417c39bf9356c84bd1`, 버튼 높이는 17px입니다. Title과 조합 간격은 24px입니다. 이 조합 구조의 적용 화면은 인증번호 입력 `2050:1586`입니다. 2026-10-20 확정 규칙은 인풋 조합 및 박스 아래 별도 TextButton의 variant를 모두 secondary로 지정합니다. 종전 primary 지정은 철회하고 기존 크기·간격·정렬은 유지합니다. 박스 아래 버튼에도 InputField 조합의 12px 간격이나 xsmall 크기를 일괄 복제하지 않으며, InputField 내부 버튼·독립 CTA는 이 교정 대상과 구분합니다.

도움말 기획 `CdyCQv4aFslTl7MGoQxmU9 / 4469:44517`은 [고객정보 관리 185:14891](https://www.figma.com/design/KFlklMvGmg0MXGfAXvpprn/?node-id=185-14891)의 테두리 없는 List 구성으로 매핑합니다. Slot padding 0/0/20/0, Container padding 0/20/0/20, List Group gap 0, List padding 12/0/12/0입니다. List key는 `4e49c191a8a8b7aa357c533168784411107b1e9d`, Prefix는 기본 `Item / Prefix (bgIcon)` key `79287fcb98e330378785cba4e19e9e83a7475478`(아이콘 48×48, 래퍼 폭 52), Suffix는 pageIndicator key `e53ffc35cc7fc4c362102ceb06618845712183ce`입니다. 주 문구 16 Bold style key `c0b7c927f31310c8297f679419d5a38377fc74db`, 부연 문구 14 Light key `b9f5d92dffa67d9779e50c32f2c9f732a727fe8a`를 사용합니다. 최종 아이콘은 작업자가 지정하므로 기본 인스턴스를 유지합니다. 적용 화면 `2050:2207`은 기획의 본문 안내를 Text로 보존하고 목록과 gap 16px로 묶었습니다.

## 페이지 ID에 따른 이름 규칙 확정 (2026-10-19)

사용자 지시로 기획서의 페이지 ID가 있으면 `실제페이지ID_화면명`(예: `F730_화면명`)으로 명명합니다. ID가 공란이면 기존 `화면ID_화면명`을 유지합니다. 링크된 프레임 내부뿐 아니라 주변 ID 영역도 읽고 해당 화면과 연결하며, ID 미확인 상태를 공란으로 단정하거나 임의 ID를 만들지 않습니다. 접두어는 `페이지 ID` 필드만 기준으로 하며 요구사항 ID나 화면명·상위 프레임명·주석의 `730MF`·`750MF` 등을 ID로 사용하지 않습니다. `-`는 공란으로 처리하고 `F730`은 형식 예시입니다. 이 규칙은 앞으로의 제작·계획·검수에 적용하며, 아래 과거 산출물 이름은 당시 기록으로 보존합니다.

## 인증서관리 링크 목록 최종 교정 (2026-10-19)

작업 파일 `zNwpdAWcBMOM5ExkiBUoGn`, 페이지 `1:278`, 일반 `2006:46` / 비로그인 `2006:2031` / 빠른 로그인·자동로그인 `2006:2415`에 반영했습니다. 제목과 목록을 감싼 여섯 래퍼 `2006:914`, `2006:1765`, `2006:2086`, `2006:2280`, `2006:2470`, `2006:2664`의 최종 이름은 `Title / List Group`입니다. 실제 `List` 인스턴스 이름·계층은 유지합니다.

Container 2의 래퍼 `2006:1765`, `2006:2280`, `2006:2664`는 padding-top 24px이며 `spacing/3xl` key `fb23d20e74566ea2a3280e9e3ca48e40122b6d95`를 연결했습니다. 내부 List Group `2006:1792`, `2006:2307`, `2006:2691`의 itemSpacing은 0px로 설정하고 이전 gap 변수 연결은 해제했습니다. Container 3 이상에도 같은 규칙을 적용합니다. 래퍼의 Title↔목록 gap 16px와 Container 1의 기존 패딩·목록 gap은 유지합니다. 내부 목록 gap 24px는 철회된 중간 지시이며 최종값이 아닙니다. 변경 후 세 화면은 390×844 / BODY Fill로 검수했습니다.

## PDF 약관 상세 과거 교정 이력 (2026-10-19, 새 제작은2026-10-27 v0.95 기준 우선)

원본 `0P0j17OPstNhC3LWjBdBGy / 72:9033` → 작업본 `82:1994`. Container 1 `82:2355`는 Title Area `72:9038`의 속성·변수와 일치하며 Horizontal / padding 12,20,0,20 / gap 16 / Fill·Hug / 높이 36입니다. Container 2 `82:2373`는 body `72:9045`의 속성·변수와 일치하며 Vertical / 양 축 center / padding·gap 12 / Fill·Fill입니다. BODY `82:1998`의 세로 Fill과 FOOTER `82:2012`의 원본 Absolute / Fixed 390·Hug를 함께 적용한 뒤 실제 높이는 BODY 744, Container 2 708, FOOTER 126으로 확인했습니다. 레이어명·계층을 보존했습니다.

Pagination `86:2136`은 key `6955cc776fae1a9f38a3e93e8ecabfe286a4db6c`의 실제 인스턴스입니다. 기존 SVG Frame `82:2376`은 제거했습니다. 원본 인스턴스를 clone한 뒤 `group`/`ungroup`으로 같은 파일 내 대상 부모에 옮겨 Pretendard SemiBold를 포함한 원본 서체·변수를 보존했습니다. 텍스트 수정이나 폰트 대체 없이 이동했으며, 임시 Group은 제거했습니다. 당시에는 해당 복제 경로를 사용했습니다. 새 제작은 최신 라이브러리에서 import한 실제 인스턴스를 사용하며, 과거 복제 경로를 기본으로 재사용하지 않습니다. Pagination을 벡터로 대체하지 않습니다. 원본에 없는 size 14 아이콘을 추정하지 않고 실제 템플릿의 size 24를 사용합니다.

## Title / Page 이후 Image Area 교정 (2026-10-19)

사용자 승인 참조: [MO Image Area 10580:10543](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=10580-10543). 부모 Container 1의 직계 자식은 Title / Page → Image Area이며 gap 0입니다. Image Area는 Vertical, Fill·Hug, padding 40/0/40/0, gap 0, 350×255px입니다. 내부 ImageContainer는 ratio 2:1, Fill·Fixed, 350×175px이며 원형 key는 `a680e6cb6e2aa701a6c19e00aadf45b42d947ec4`입니다. 상하 패딩은 `spacing/6xl` key `5bc593ee6f05df006566535e37f5fce0ed3a085b`입니다. **사용자 재교정: 원본 더미 그래픽과 “더미이미지” 라벨을 포함한 Image Area 전체를 재사용합니다.** 앞서 라벨과 그래픽을 생략하던 해석은 폐기합니다. 원본 이미지 hash `b1f2e8f30a4712713e5005c50b82808ca63b2cfb`와 크롭 변환을 그대로 보존합니다. 더미 라벨은 원형의 위치·크기·외형을 유지합니다. **최신 승인 버전**은 [67:1947](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=67-1947)의 Image Area `67:2127`입니다. 라벨 `98:2116`은 편집 가능한 TEXT / Pretendard SemiBold / 크기 21px / x130, y113 / 91×29px이며 원본 fontFamily 변수 key `6df184c7178de2fefb24f1c7673bb5bfb99eea9b`를 유지합니다. 원본 Text Style ID는 비어 있으므로 임의 스타일을 만들지 않고 원본 속성과 변수 연결을 보존합니다. 과거 outline SVG `78:1416`은 제거되었으며 최신 재사용 기준에서 제외합니다. 제품 본문 서체·스타일·변수 규칙은 유지합니다.

적용 화면 [얼굴확인 안내 67:1947](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=67-1947): Container 1 > Title / Page, Image Area로 병합하고, 다음 Container 2 > Infobox / Card와 실제 간격 24px를 적용합니다. 후속 gap은 `spacing/3xl` key `fb23d20e74566ea2a3280e9e3ca48e40122b6d95`입니다. 이 0/24px 규칙은 일반 BODY gap보다 우선합니다.

## 최소 바텀시트·완료 Feedback 크기 갱신 (2026-10-19)

사용자 지정 `0P0j17OPstNhC3LWjBdBGy / 44:898`에서 BottomSheet 높이·minHeight 211px, Slot 세로 Fill·높이 82px를 확인했습니다. 최소 콘텐츠에 의해 남는 높이는 Slot이 흡수하며 내부 본문은 Hug로 유지합니다. `47:972`는 사용자 교정에 따라 Feedback Large로 지정합니다. 실제 공개 속성은 `varient: large`, 원형 key는 `3cb5580a388f0ea35f0840f442f932ceba856ad6`입니다. 완료 화면은 항상 Large를 사용하며, 외국인 안내의 경고 상태와 문구·버튼은 유지합니다.

## 생체정보 바텀시트 텍스트·계층 교정 (2026-10-19)

사용자 지정 산출물 `0P0j17OPstNhC3LWjBdBGy / 44:899, 44:900`의 단일 Slot Container는 `Container`로 명명하고 일반 본문을 `Text` Auto Layout으로 감쌉니다. 구조는 `Slot > Container > Text > Content`, Text gap·padding 0 및 Fill/Hug입니다.

원본 MO 라이브러리에서 재확인한 `Dynamic/Body/md∙16∙Light` key는 `161acb8a632b6627494a8a2b575e49ed8a12f3a6`, 동일 계열 Medium key는 `1c8368513c856adb717a8f46922bc5f4a800bb66`입니다. 두 스타일 모두 KBFG Text, 기본 크기 16px·행간 22px이며 fontFamily·fontSize·fontWeight·lineHeight·letterSpacing이 원본 변수에 연결됩니다. 직접 fontName을 바꾼 강조 구간에서 style 및 fontWeight alias가 누락되어, 구간별 원본 Medium 스타일 적용으로 복원했습니다. 새 제작에도 구간별 스타일·변수 연결 검수를 적용합니다.

## Tab 후속 간격·조회 내역 승인 갱신 (2026-10-19)

일반 콘텐츠의 Tab 직후 간격은 `spacing/3xl`=24px(key `fb23d20e74566ea2a3280e9e3ca48e40122b6d95`)입니다. BODY 기본 32px보다 우선합니다. 사용자 교정에 따라 `## BODY > Container 1 > Tab, Infobox / Card`로 구성하며 두 컴포넌트는 Container 1의 직계 자식입니다. 외부 `Tab / Infobox` 래퍼와 각 컴포넌트의 별도 Container를 만들지 않습니다. 이 화면에서 Container 1 gap 24px, Tab 폭 390px, Infobox 폭 350px·x=20px를 실측했습니다. 다음 독립 본문 블록은 형제 Container 2로 명명합니다.

사용자 지정 [아웃라인 Data Block](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=4-979)과 [회색 무테 Data Block](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=4-994)을 직접 재조회했습니다. 두 박스 모두 Vertical, padding 20px, radius 20px, Title↔목록 gap 16px, 목록 gap 12px입니다. 각각 `spacing/2xl`, `radius/2xl`, `spacing/xl`, `spacing/lg`에 연결되어 있습니다. outline fill은 `surface/neutral/quaternary-muted`, stroke는 `border/neutral/secondary-muted` + `stroke/md`; 무테 fill은 `surface/neutral/tertiary-muted`, strokes는 빈 배열입니다.

고객명~인증완료 등 건별 사실 데이터는 기획서의 평면 목록 대신 이 Data Block을 우선합니다. 제목이 없는 내역은 Title을 숨기며, 복수 박스 gap은 12px입니다. 완료 화면과 특수 Feedback 구조는 원문의 별도 규칙을 유지합니다.

확인일: 2026-09-28. 아래 값은 확인한 템플릿의 근거이며 모든 화면에 무조건 적용하는 전역 규칙이 아닙니다.

디자이너 문서 추가 이후의 규범은 `docs/designer-rules.md` 및 연결된 원문을 함께 따릅니다. 이 문서는 과거 실측 기록을 보존합니다. 명시된 제작 규칙과 다른 관측값(예: StepIndicator wrapper)을 그대로 복제하지 않습니다.

## 원본

- [MO 디자인 시스템](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/)
- [실제 템플릿 페이지](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=10552-10031)
- [헤더와 타이틀](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=10638-16306)
- [정보 안내](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=10580-10339)
- [카드 선택](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=14048-33663)
- [원본이 안내한 Graphic System Icon](https://www.figma.com/design/hYI7T4WKSW85FRe1c72qqk/?node-id=1160-458)

## 레이아웃

|역할|관측값|근거|
|---|---|---|
|기준 화면 폭|390|대표 화면 3개|
|기본 화면 높이|844|10638:16306; 긴 콘텐츠의 높이는 증가|
|HEADER|100 = StatusBar 44 + AppBar 56|10638:16307~16309|
|본문 좌우|20 / spacing/2xl|10638:16311, 10580:10346, 14048:33668|
|타이틀 위|24 / spacing/3xl|동일 컨테이너 paddingTop|
|BODY 하단|32 / spacing/5xl|10638:16310, 10580:10343, 14048:33667|
|카드 목록 간격|12 / spacing/lg|14048:33677|
|FOOTER|98 = StickyButton 64 + HomeIndicator 34|10638:16319~16321|
|버튼 영역 좌우 / 하단|20 / 8|I10638:16320;752:69280|

HEADER·BODY·FOOTER를 독립 컨테이너로 유지합니다. BODY의 남은 높이 처리와 FOOTER 위치는 원본 sizing mode를 확인합니다. 긴 콘텐츠를 844에 억지로 축소하지 않습니다. 화면 폭 390을 다른 기기에도 무조건 적용하지 않으며 새로운 기준 폭은 기획서와 대응 템플릿으로 정합니다.

## 타이포그래피

헤더와 타이틀의 Light / Default 예시에서 직접 확인했습니다.

|역할|서체|크기 / 행간|스타일|
|---|---|---|---|
|AppBar 타이틀|KBFG Text Medium|15 / 21|Dynamic/Body/sm∙15∙Medium|
|서브타이틀|KBFG Text Bold|15 / 21|Dynamic/Body/sm∙15∙Bold|
|페이지 타이틀|KBFG Text Bold|22 / 31|Dynamic/Title/3xl∙22∙Bold|
|설명|KBFG Text Light|15 / 21|Dynamic/Body/sm∙15∙Light|
|하단 버튼|KBFG Text Bold|18 / 25|Dynamic/Title/xl∙18∙Bold|

숫자용 스타일에는 Pretendard가 있습니다. 전체 본문을 Pretendard로 통일하지 않습니다. OS 상태바의 SF Pro Text는 원본 시스템 컴포넌트 내부 예외이며 제품 본문 서체가 아닙니다. 스타일 이름만 복사하지 말고 style key를 import하고 연결합니다. Large 모드에서는 같은 스타일의 변수 해석이 달라질 수 있으므로 Default의 실측 픽셀값을 덮어쓰지 않습니다.

## 모드

Color: Light / Dark. Type: Default / Large. 템플릿은 라이트·다크·큰글씨 영역이 구분되어 있습니다. 모드 이름을 명시하고 root에 적용하며 원본과 산출물의 해석 모드가 같은지 확인합니다. 큰글씨에서 높이 증가·줄바꿈이 일어나므로 기본 모드 스크린샷으로 대체 검수하지 않습니다.

## 발견된 불일치와 처리

- Foundations와 T01~T04 일부 페이지는 비어 있습니다. 페이지 이름을 근거로 규칙을 추정하지 않습니다.
- `10638:16311` gap=10, `10580:10346`, `10580:10427` gap=9는 변수 연결이 없습니다. 단일 자식에서는 gap이 화면에 영향을 주지 않을 수 있지만 새 자식 추가 시 의미가 생깁니다. 자동 컴파일은 차단합니다. 활성 간격이 필요한 새 조합은 동일 역할의 토큰 연결 예시를 찾아 사용합니다.
- 원본에는 로컬 목록에서 빠진 변수 ID와 remote alias가 있습니다. 로컬 변수 목록에 없다는 이유로 새 토큰을 만들지 않습니다. 참조 ID → 실제 key → 원본 승인 범위를 재검증합니다.
- 아이콘은 2026-09-28 Graphic 라이브러리로 이동했다는 원본 하이퍼링크를 확인했습니다. 새 아이콘은 해당 System Icon 키를 사용합니다. 기존 컴포넌트의 이전 아이콘 의존성이 남아 있으면 출처 확인 후 별도 기록하며 임의 교체하지 않습니다.
- 카드 예시 PNG의 실제 상품 이미지는 배치 참고용입니다. 산출물은 사용자 지시에 따라 이미지 영역만 표시하되, 승인된 Image Area `10580:10543`는 더미 그래픽·라벨을 포함해 재사용하는 예외입니다.

이 목록의 예외는 사용자의 토큰 전용 조건을 완화하는 승인이 아닙니다.

## 박스 UI 승인 예시와 실측 (2026-10-15)

사용자가 지정한 아래 네 화면을 읽기 전용으로 조회하고 박스 스크린샷과 토큰 연결을 확인했습니다. 2026-09-28 템플릿과 구분되는 후속 승인 사례입니다. 역할·스타일 선택의 규범은 [원문 Box UI Rules](sources/designer-ui-rules.md)와 [D28~D32](designer-rules.md)를 따릅니다.

|화면 / 실제 박스|역할·동작 경계|관측한 형태|
|---|---|---|
|[계좌 선택](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2659-18345) / `2659:18395`, `2661:26306`|`Card / Surface` 인스턴스. 상세 이동과 이체 동작의 예시|원본 Slot·Affix 구조 유지. 패딩 20, 라운드 20. border `border/neutral/primary-muted`는 Card 원형 값이므로 Data Block의 border로 일괄 덮어쓰지 않음|
|[고객정보 확인](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2659-18558) / `2659:18577`|`Data Block` 프레임. 부모님 기본정보 표시. 수정 버튼은 박스 밖 형제 `Button Area`|Vertical, 패딩 20, 라운드 20, 타이틀↔DataList Group gap 20, DataList Group 내부 gap 12. Fill `surface/neutral/quaternary-muted`, border `border/neutral/secondary-muted` + `stroke/md`|
|[상담센터 안내 — 아웃라인](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2659-18992) / `2659:19033`|`Text Box` 프레임. 연락처를 포함하나 주목적은 설명·안내|Vertical, 패딩 20, gap 16, 라운드 14. Fill `surface/neutral/quaternary-muted`, border `border/neutral/secondary-muted`. 원본 strokeWeight 1은 관측되나 박스의 strokeWeight 변수 연결은 미관측이므로, 새 제작에서는 원문이 지정한 `stroke/md`를 명시적으로 연결|
|[상담센터 안내 — 회색 무테](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2659-19168) / `2659:19188`|`Text Box` 유지. 같은 화면의 부모님 기본정보 아웃라인 Data Block과 테두리 반복을 완화|패딩 20, gap 16, 라운드 14 유지. Fill `surface/neutral/tertiary-muted`, 외곽 `strokes: []`. 내부 Divider는 유지|

Data Block의 기존 기본 gap 16px와 위 부모님 기본정보 패턴의 20px는 구분합니다. 이 승인 패턴을 재사용할 때 20px를 적용하며 모든 Data Block의 간격을 일괄 변경하지 않습니다. 박스 색상이나 라운드만 보고 역할을 추정하지 않고, 안내 속 전화번호를 사실 데이터 박스로 오분류하지 않습니다.

### 확인한 변수 key

아래는 실제 조회한 연결 key입니다. 새 작업에서는 원본의 현재 정의와 모드를 다시 확인한 뒤 재사용합니다. 색상은 Light/Dark 모드별 alias로 연결되어 있어 관측된 흰색·회색 RGB를 고정하지 않습니다.

|토큰|key|관측값 / 용도|
|---|---|---|
|`surface/neutral/quaternary-muted`|`13df17658e86efada0d0c1ba4402b88616a0efe1`|아웃라인 박스 및 Card의 Fill|
|`surface/neutral/tertiary-muted`|`59093c4bcca6ee8f9e5f9af90d27f568edcef5b5`|회색 배경·무테형 Fill|
|`border/neutral/secondary-muted`|`6f13cf9a41a7a40246b281a5b4a8270690e2226e`|Data Block / Text Box 아웃라인|
|`border/neutral/primary-muted`|`7ceda77ef3991dd62dd315060ac6d2fafb56834e`|참조 Card의 아웃라인|
|`stroke/md`|`74a325f74c4c0478bb096db37a311858ac4c6b7e`|1px|
|`spacing/2xl`|`5491ce4ce8c48cc4a679f8cedc426cb96bb9a141`|20px 패딩 / 승인 Data Block 예시 gap|
|`spacing/xl`|`dd4b6787bca3ceba45b9b41a16963083cacea533`|16px Text Box gap|
|`spacing/lg`|`466bd0e6b2233083a08d900e3be39f48196d1bee`|12px DataList Group gap|
|`radius/2xl`|`775b8dad73eda0c378c4bd9850b4c459c9187b9c`|20px Data Block / Card 라운드|
|`radius/lg`|`b9d31e7e721799056c4f83449ff084a697ebe489`|14px Text Box 라운드|

## 제목 없는 완료 데이터 구분선 교정 (2026-10-28)

승인 근거: [3138:30128](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3138-30128). 이 화면의 `Title`(`3138:30149`)은 제목 텍스트 없이 primary Divider(`3138:30150`)만 노출하는 높이 1px의 Vertical Auto Layout이며, 다음 DataList Group과 gap 16px, 목록 내부 gap 12px다. 제목 비노출을 Title 전체 생략으로 해석하여 상단 구분선이 빠진 제작 오류를 교정했다.

제목이 없는 완료 데이터에서는 `Title / Element`만 숨기고 `Title` Auto Layout 래퍼와 `Divider / Horizontal(thickness:1px,variant:primary,length:full)`은 반드시 노출한다. Title 전체 숨김·생략은 금지한다. Title은 Divider 높이만 Hug하며 빈 제목 공간이나 잔여 12px 간격을 남기지 않는다. Divider↔DataList Group 16px(`spacing/xl`), 목록 내부 12px(`spacing/lg`)를 유지한다. 일반 Data Block의 제목 비노출과 구분하며 D19에 우선 적용한다.

교정 산출물 [3168:18258](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3168-18258)에 `Title`(`3172:17274`)과 최신 라이브러리 Divider 인스턴스(`3172:17275`, key `f5e601b7152ef36e3e90e841d5d896cce328dc8d`)를 복원했다. 구조·16px 간격·10개 데이터 보존 및 최종 스크린샷을 확인했다.

## 완료 화면 갱신 실측 (2026-10-15)

근거: [완료 화면 `2668:26353`](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2668-26353), `0:1` 페이지. 프레임 이름은 `화면ID_[증명서 진위 확인_서비스 안내]`이며 표시 문구는 발급신청 취소 완료입니다. 화면명만으로 추정하지 않고 실제 BODY와 반복 그룹을 조회하고 스크린샷을 확인했습니다. 아래 값은 상단 Feedback + 후속 데이터가 있는 완료 화면의 승인 패턴으로 D18·D19에 반영하며, 일반 화면·Empty State·Data Block 수치를 일괄 대체하지 않습니다.

|역할 / 노드|확인한 구조·값|
|---|---|
|`## BODY` / `2668:26357`|Vertical, padding 상/우/하/좌 **40/20/32/20px**, gap **40px**, 가로 정렬 CENTER, 폭 390, 높이 646/FILL|
|`Container 1` / `2668:26358`|Feedback wrapper, Horizontal Auto Layout, padding 0, gap 0. 원본 Feedback의 폭·중앙 배치를 유지하며 BODY 상단 패딩을 Container에 다시 더하지 않음|
|`Container 2` / `2668:26367`|Vertical, padding 0, 가로 FILL(350px)/세로 HUG. 반복 `Title / DataList Group` 2개 사이 gap **32px**|
|`Title / DataList Group` / `2668:26368`, `2668:26375`|Vertical, padding 0, 가로 FILL/세로 HUG. 자식은 `Title` → `DataList Group`, 사이 gap **16px**|
|`Title` / `2668:26369`, `2668:26376`|별도 Vertical Auto Layout, padding 0, 가로 FILL/세로 HUG. `Title / Element` → `Divider / Horizontal`, 내부 gap **12px**|
|Title 안의 Divider / `2668:26371`, `2668:26378`|실제 Component Properties `thickness:1px`, **`variant:primary`**, `length:full`. full은 350px 콘텐츠 폭이며 이 구분선 때문에 BODY 좌우 패딩을 제거하지 않음|
|`DataList Group` / `2668:26372`, `2668:26379`|Vertical, padding 0, 가로 FILL/세로 HUG, 내부 gap **12px**. 두 그룹에 각각 DataList 2개와 1개가 있으며 모두 `layout:split`, `size:14`, `hasDivider:false`|
|`Title / Element` / `2668:26370`, `2668:26377`|원형 서체 `KBFG Text Medium`, 텍스트 스타일 key `87439f01ad7a7fbf6b1556036328a19d5f0ef75c`. 임의 Bold로 변경하지 않음|

BODY 패딩의 CSS 단축 표기는 `padding: 40px 20px 32px`입니다.

### 완료 화면에서 확인한 간격 변수 key

|토큰|key|적용 위치|
|---|---|---|
|`spacing/6xl` = 40px|`5bc593ee6f05df006566535e37f5fce0ed3a085b`|BODY padding-top 및 Container 1↔2 gap|
|`spacing/2xl` = 20px|`5491ce4ce8c48cc4a679f8cedc426cb96bb9a141`|BODY 좌우 패딩|
|`spacing/5xl` = 32px|`840e7bd3a0d91d1161f8dcbd3c3299310e014cac`|BODY padding-bottom 및 Container 2 내 반복 그룹 gap|
|`spacing/xl` = 16px|`dd4b6787bca3ceba45b9b41a16963083cacea533`|각 `Title / DataList Group`의 Title↔DataList Group gap|
|`spacing/lg` = 12px|`466bd0e6b2233083a08d900e3be39f48196d1bee`|Title 내부 및 DataList 목록 내부 gap|

추가 원형 key: `Title / Element`는 `4fa94105877b4e3dad3e36f52b5be749deb2ce68`, 승인 Divider variant는 `f5e601b7152ef36e3e90e841d5d896cce328dc8d`입니다. 과거 문서의 완료 Divider `tone:quaternary`, 데이터 영역 전체 gap 12px, 후속 그룹 padding-top 24px는 이 승인 패턴에 적용하지 않습니다. 새 제작 시 현재 원본과 모드를 다시 확인하여 key를 연결합니다.
