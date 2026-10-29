# 디자이너 규칙의 적용과 검수

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
- **전화번호**: 승인 참조와 동일한 **KBFG Text / 16px / Bold / line-height22px**, 색상 **`text/neutral/secondary`**, 밑줄 없음으로 적용합니다. 대응 Text Style은 `Dynamic/Body/md∙16∙Bold`(key `c0b7c927f31310c8297f679419d5a38377fc74db`)이며 `font-weight/bold`·크기·행간·색상 변수 연결을 보존합니다. **이 사용자 지정 Dialog 대표전화 블록에 한정해 숫자 전용 Pretendard 및 일반 본문 강조 Medium 규칙보다 위 사양을 우선**하며 다른 숫자·DataList·일반 강조까지 KBFG/Bold로 확대하지 않습니다. 번호를 이유로 링크·전화 연결 동작을 임의 추가하지 않습니다.
- **크기 모드·주변 영역**: 두 블록과 Text 래퍼는 가로 Fill·세로 Hug, 번호 Text는 가로 Fill·내용에 따른 높이 및 자연스러운 줄바꿈을 사용합니다. 참조의 280px 본문 폭에서 번호가 두 줄인 것을 고정 높이44px나 강제 개행으로 복제하지 않습니다. Dialog Slot → 별도 자세히보기 Accordion → ButtonGroup의 원형 관계와 간격은 유지합니다. 이 참조의 대표전화 블록 아래 Accordion과의 간격은 **20px(`spacing/2xl`)**이며 Dialog 제목·설명의 문장부호는 기획 원문을 따르고 HomeIndicator Fill 숨김 예외는 유지합니다. 참조의 다른 레이어 누락이나 문구를 규칙으로 상속하지 않습니다.
- **완료 검수**: 설명→대표전화16px, 제목→번호4px, 번호→후속 Accordion20px의 실질 간격과 토큰, Title / Element 인스턴스·옵션, 제목14 Medium/primary·번호16 Bold/secondary의 Text Style·변수, Fill/Hug·줄바꿈·실제 번호·부모 명칭을 확인합니다. 대표전화 문구를 설명에 이어 붙이거나 상단 설명 스타일을 번호에 그대로 사용하는 것은 실패입니다. 이번 요청은 MD 규칙 갱신이며 기존 Figma 화면의 일괄 수정 완료를 의미하지 않습니다.

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



## 라디오 선택형 Card Affix — 2026-10-28

사용자 승인552:13664처럼 설명을 담은 Card를 라디오로 선택하면 Card / Surface > Slot > Body > Groups + Card / Header / Affix > Item / Radio를 사용한다. Affix는 variant radio·visible true·layoutPositioning AUTO로 Body에 두고 Absolute로 띄우지 않는다. Body Horizontal·Fill/Hug·gap12(spacing/lg)·MIN/MIN, Groups Fill/Hug, Affix24×24 Fixed와 원형 명칭을 유지한다.

원형 직계의 기본 숨김 Affix는 참조처럼 숨겨 두고 Body의 노출 Affix는 카드당1개만 둔다. 최신 라이브러리의 원형 인스턴스를 사용하며 detach·일반 Radio로 대체·라디오 직접 그리기는 금지한다. Card select/disabled와 내부 Radio checked/disabled/invalid는 기획 상태와 대조한다. 지정 Card 패턴을 GridButton으로 바꾸지 않으며 입력 폼 SelectButton 규칙과 구분한다. 선택·미선택의 실제 계층·AUTO·가시성·노출 수·상태·연결을 검수한다.

## 헤더 직후 전폭 컴포넌트·Data Block — 2026-10-28

승인 참조 bDKgQrkt0oHMJ1EbPUQTp8 / 3138:27761을 따른다. 헤더 밑 StepIndicator·Tab 등 전폭 컴포넌트가 있으면 BODY padding은 0/0/32/0, Container 1은 padding0·Fill이며 그 안의 컴포넌트도 화면 폭390px를 채운다. 후속 독립 콘텐츠는 형제 Container 2 이상에서 좌우20px를 적용해 콘텐츠350px를 유지한다. 직후 gap24px와 컴포넌트 자체 내부 패딩은 보존하고 외부 여백을 중복하지 않는다. 별도 확정된 Tab+Infobox 동일 Container 복합 패턴의 계층은 유지하면서 전폭과 콘텐츠 폭을 보장한다.

Data Block은 단일·복수 항목 모두 아웃라인으로 제작한다. Fill surface/neutral/quaternary-muted, Border border/neutral/secondary-muted + stroke/md, padding·radius20px를 적용한다. 종전 Data Block 회색 무테 재량은 대체하며 Text Box·Card의 별도 스타일 규칙은 유지한다. DataList Group gap12, 단일 DataList 직접 구조, 문구·숫자 서체·컴포넌트 연결은 보존한다. 최종 부모별 패딩·실제 폭·간격·네 변 stroke 토큰을 검수한다.

## Dialog 예외와 지정 SelectButton — 2026-10-28

Dialog HomeIndicator의 elevated 배경 Fill은 false이며 레이어·내부 막대·토큰·배치는 유지한다. 일반·바텀시트의 Fill true와 구분한다. 발급정보 3142:17373·3142:17946의 언어·주민등록번호 표기 선택은 실제 SelectButton word/single을 사용하고 Radio로 대체하지 않는다. 초기 선택·CTA 상태는 기획과 대조한다.

## 오버레이 배경 화면 재현 금지 — 2026-10-28

바텀시트·다이얼로그·입력용 키패드 시트의 배경은 루트 background/neutral/white + Dimmed만 사용한다. 기획에 뒤 화면이 보여도 Popup·일반 화면·복제 프레임·스크린샷·숨김 배경을 깔지 않는다. 이전 배경 Popup Fill·clip 래퍼 지시는 철회한다. 불필요한 배경은 제거하고 전경 시트/Dialog·입력 키패드·StatusBar·HomeIndicator는 보존한다. 실제 전경으로 지정된 풀팝업·키패드/패턴 Popup은 구분한다. 바텀시트 AUTO 흐름과 HomeIndicator elevated Fill 노출 규칙도 유지하며 최종 배경 화면 개수 0 및 화면에서 비침 없음을 검사한다.

## HomeIndicator 배경 Fill 가시성 — 2026-10-28

Dialog의 HomeIndicator는 background/neutral/elevated Fill을 반드시 visible false로 숨기고 레이어·내부 막대는 노출한다. Dialog 외 화면에서는 해당 Fill을 visible true로 노출한다. Dialog 외 화면은 원형이 해당 Paint를 숨겨도 사용자 승인 참조 bDKgQrkt0oHMJ1EbPUQTp8 / 49:21704에 따라 산출물 인스턴스의 Paint 가시성만 교정한다. 라이브러리 원본은 수정하지 않는다. 변수·모드·색상·opacity, 내부 막대·컴포넌트 연결·os iOS·원형 높이·AUTO를 유지하며 실제 Fill visible·토큰 연결·하단 배경을 검수한다. 레이어 visible만으로 통과시키거나 고정 흰색·추가 사각형으로 대체하지 않는다.

## 바텀시트 position 제한 — 2026-10-27

화면 레벨 Absolute는 Dimmed와 StatusBar만 허용한다. BottomSheet·HomeIndicator는 Vertical Auto Layout의 AUTO 자식으로 하단 정렬하고 gap 0으로 이어 붙인다. BottomSheet는 가로 Fill·세로 Hug(최소/고정 높이 예외 유지), HomeIndicator는 가로 Fill·원형 높이·iOS를 유지한다. 문자 입력에서는 BottomSheet → Keypad(Item / Pad) → HomeIndicator도 AUTO이며 배경 Popup·Fill/clip 래퍼는 추가하지 않고 루트 배경과 Dimmed만 사용한다. 원형 내부 position은 건드리지 않는다. 화면 레벨 Absolute 목록, 실제 AUTO 속성, 콘텐츠 높이 변경 시 재배치·안전영역을 검사하고 좌표 고정으로 대체하지 않는다.

## Popup 내부 레이어명 최종 규칙 — 2026-10-27

Popup > Slot 내부 3단 영역은 `Header`, `Body`, `Footer`로 명명합니다. 약관 상세(PDF)·키패드·패턴·일반 풀팝업에 동일하게 적용합니다. 종전 `## HEADER`, `## BODY`, `## FOOTER`로 변경하라는 지시는 철회되었으며 해당 Popup 내부 영역은 원복합니다. 일반·완료 화면의 아트보드 직계 `## HEADER`, `## BODY`, `## FOOTER`는 유지합니다. 명칭 외 Slot 계층·컴포넌트 연결·공개 속성·Fill/Hug/Absolute·패딩·간격과 하위 `Title Area`, `body`는 보존합니다.


## 문자·숫자 서체 판정 — 2026-10-28

판정 단위는 실제 Text 레이어다. 하나의 Text에 문자와 숫자가 섞이면 전체 KBFG Text이며 숫자 구간만 Pretendard로 바꾸지 않는다. 실제 별도 Text로 분리된 숫자는 Pretendard, 문자는 KBFG Text다. 숫자 전용 텍스트·입력값과 Table의 숫자 전용 셀도 Pretendard다. 숫자 값의 자릿수 구분자·소수점 등 서식 기호는 해당 숫자와 같은 서체를 쓴다.

DataList는 데이터(값) Text를 기준으로 숫자만이면 Pretendard, 문자·숫자가 섞이면 KBFG Text를 적용한다. 항목명 Text는 KBFG Text이며 별도 Text인 항목명과 값을 하나의 혼용 Text로 세지 않는다. `123,000원`이 한 Text이면 KBFG Text, `123,000`과 `원`이 별도 Text이면 각각 Pretendard/KBFG Text다. 종전 동일 Text 내 구간별 숫자 서체 분리 지시는 철회하며 서체 적용을 위한 임의 레이어 분할을 하지 않는다.

최신 라이브러리의 해당 역할·크기·굵기별 스타일·변수와 다른 타이포그래피 속성·Hug/Fill·인스턴스 연결·공개 옵션을 유지한다. Pretendard Variable로 대체하지 않으며 OS 상태바·승인 더미이미지 등 별도 예외는 보존한다. 실제 Text 경계·내용·family·style/variable 연결과 Table/DataList 분기를 검수한다. MD 갱신과 기존 화면 수정은 별도다.

## v0.95 약관 상세·동의 레이아웃 우선 적용 — 2026-10-27

원문 §2.G·§4의 이번 사용자 지정 7개 라이브러리 참조를 승인 기준으로 사용합니다. Templates(작성중)이라는 페이지명만으로 이 7개를 미확정 처리하지 않습니다. 다른 템플릿의 미확정 여부까지 일괄 변경하는 것은 아닙니다.

- 약관 상세31888:30615는 아트보드 직계 StatusBar(Auto,44px) + Popup(Fill) + Pagination/Carousel(Absolute)입니다. Popup > Slot 안의 3단 레이어명은 반드시 `Header / Body / Footer`입니다. 종전 아트보드 직계3단·Container1/2 유지 규칙은 이 PDF 유형에서 대체됩니다. BODY·body Fill, Footer Absolute, Pagination 실제 인스턴스와 부모·좌표·constraints를 원형과 대조합니다. PDF 상세 외의 일반 동의 화면까지 Popup으로 바꾸지 않습니다.
- 약관 동의는 ConsentGroup과 Item / Consent(1d,2d,3d-group,3d,4d-group,4d,description,textList)의 실제 인스턴스와 Slot을 사용합니다. 종전 Consent solid/basic·Depth 프레임·수동 Outline Container로 재구성하지 않습니다. BODY padding24/20/32/20·gap24, Container2의 반복 ConsentGroup gap12, 내부 Slot gap0·하단8과 variant별 원형 padding을 구분합니다. 3d/4d Slot의 GridContainer flow와0px 간격을 보존하며 일반 선택 그룹 gap20을 덮어쓰지 않습니다.
- 기본 상위·하위 동의 참조는31061:78124(1+2)이며,78151은 현재 상품설명서1d 단일 항목으로 구분합니다. Templates10552:10031에서78179(1+2+3),78292(초기 레이블1~4),78209(긴 문구·선택상태1~4),78333(BottomSheet),78354(TextList16+ConsentFinal)를 실제 역할과 대조합니다. 그룹 하단 안내는 Item / Consent(textList) 안 size14, 별도 본문 확인형은 size16과 ConsentFinal(outline)을 사용합니다. BS Slot gap20·padding0/20/20/20, 반복 ConsentGroup gap12를 대조합니다.
- v0.95 페이지 제목은 현재 Default에서24px Medium/행간34px입니다. Item / Label(page)의 실제 스타일·변수를 상속하고 과거22px/31px 수치로 덮어쓰지 않습니다. 기획의 필수/선택·문구·상태를 보존하고 공개 속성·Slot·Grid·서체·변수·잘림을 검수합니다. 이 갱신은 아래 과거 PDF/약관 기록보다 우선합니다.

## 모든 컴포넌트의 최신 라이브러리 직접 적용 — 2026-10-23

컴포넌트의 원형 기준은 MO 라이브러리 `09eGMNTNnkE0CTxPdr7lnk`의 현재 정의입니다. 주변 화면·기획안·이전 제작본의 인스턴스와 override를 복제하여 기준으로 삼지 않습니다. 기획에서는 문구·순서·상태·행동·유형을 읽고, 승인 예시는 명시된 구성·위계·간격의 근거로만 사용합니다. 모든 하위 컴포넌트까지 실제 원본 key·공개 속성·Slot·Text Style/변수 연결을 확인한 뒤 import한 원형에서 새 인스턴스로 제작합니다. 캐시와 스크립트는 탐색·절차 재사용에만 사용합니다.

Title / Page는 기획의 Bold Text를 복사하지 않고 실제 Item / Label(page)의 현재 원본 Medium 스타일(v0.95 Default 기준24px)·font-weight/medium을 유지합니다. 다른 컴포넌트는 각각의 원본 Weight를 따르며 일괄 Medium이나 일괄 Hug/Fill을 적용하지 않습니다. 필요 없는 더미 요소는 공개 속성으로 숨깁니다. 최종 원형 key·텍스트 구간 style/variable key·크기 모드·Slot·공개 옵션 전환과 화면 잘림을 검수하며, 기존 정상 전환 보장 규칙과 미검증/실패 시 완료 금지 규칙을 함께 적용합니다. 이 절은 과거 화면 재사용을 원형 근거로 삼는 해석보다 우선합니다.

2026-10-23 반복 그룹 재확정: 같은 컴포넌트 또는 같은 역할·명칭의 일반/조합 레이어가2개 이상 연속 반복되면 실제 Auto Layout으로 묶고 [명칭] Group으로 명명합니다. 반복 자식은 원래 명칭을 유지하고 순번을 붙이지 않습니다. 연속 InputField는 Container > InputField Group > InputField, 내부 gap24px이며 Container의 페이지 패딩과 단수 래퍼 예외는 유지합니다. 기존 명명 규칙이 있었으나2182:19277의5개 InputField 제작에 적용이 누락됐습니다.

## Infobox 버튼 원형 영역 — 2026-10-23

Infobox / Card의 버튼은 hasButton true로 노출한 원형 Button Area에 배치합니다. Slot-Contents는 본문만 담고 버튼을 넣지 않습니다. 기준25386:80100처럼 Button Area와 Slot-Contents는 직계 형제이며, TextButton은 secondary/xsmall·prefix false·suffix true(line-chevron-right)·underline false·Hug를 사용합니다. Button Area의 우측 정렬·상단4px·gap12px와 Slot gap8px를 유지하고 기존 제목·prefix·suffix 노출 및 안내·버튼 문구는 보존합니다.

## Feedback 후속 콘텐츠 외부 간격40px — 2026-10-23

Feedback 뒤에 별도의 본문·설명·목록 등 콘텐츠 블록이 이어지면 외부 간격은 spacing/6xl=40px입니다. 완료 화면에만 한정하지 않고 재외국민 비대상 안내2157:9320에도 적용하며 일반 BODY gap32px보다 우선합니다. Feedback 내부 간격·BODY 상단 패딩·앞쪽 Chip → Feedback24px 및 후속 섹션 내부16px/반복 그룹24px와 구분합니다. 실제 경계 간격을 확인하고 래퍼 padding으로 중복하지 않습니다.

## 설정 항목 스위치 size medium — 2026-10-23

빠른 로그인 기준2347:15715처럼 항목에 스위치를 조합하는 경우, 실제 스위치의 공개 속성 size를 medium으로 지정합니다. 인스턴스 너비·높이를 임의 수정하여 대신하지 않고, 기획의 on/off·disabled 상태와 기존 레이블·항목 구조·간격·원형 스타일·변수를 보존합니다.

## 키패드·패턴 입력 Popup과 AppBar 제목 — 2026-10-23

키패드·패턴 입력 화면은 사용자 확정 예외로 실제 Popup > Slot > Header / Body / Footer 구조를 기본 적용합니다. StatusBar는 최상단 Absolute, 보안 키패드 AppBar는 sub / hasTitle true / KB 로고 없음이며 Label 안 타이틀에 이전 화면의 실제 AppBar 제목을 이어받습니다. 승인 기준2380:12952는 KB국민인증서 발급이지만 전역 고정 문구가 아닙니다. 일반 인증 화면까지 일괄 Popup으로 바꾸지 않으며 기존 컴포넌트·변수·입력 상태와 Body 상단24px를 보존합니다.

## 섹션 제목과 반복 제목 목록의 간격 — 2026-10-22

Title / Section 다음 콘텐츠와의 외부 gap은 spacing/xl=16px입니다. 반복 Title / TextList Group 사이 기본 gap은 spacing/3xl=24px이며, 내부 TextList Group의 항목 gap 8px와 구분합니다. 기준 2153:8503에서 2153:8642·2153:8741은 각각16px, 상위 Title / Contents(2153:8641)는24px입니다. 이전 제작의 제목 뒤8px·반복 그룹 사이16px를 상속하지 않습니다.

원본: [UI Design & Code Generation Rules](sources/designer-ui-rules.md). 사용자 제공 원문과 사용자가 승인한 후속 개정을 반영합니다. 이 문서는 실행을 위한 색인·해석이며 원문 전체 읽기를 대체하지 않습니다.

## 적용 우선순위와 출처

1. 사용자의 해당 작업 명시 지시 및 기존 제약(주어진 컴포넌트·토큰만 사용, 이미지는 영역만(승인된 더미 Image Area 전체 재사용 예외), DS 아이콘 사용).
2. 디자이너 원문의 상황별 명시 규칙. 일반 규칙보다 완료·빈 상태·바텀시트 등 구체적 규칙을 우선합니다.
3. Figma 템플릿 실측값: 문서에 없는 배치·서체·컴포넌트 사용 맥락을 보완합니다.

Figma의 실제 component key, Component Properties 정의, variable/style key는 구현 가능 여부의 기준입니다. 문서의 속성/토큰이 없거나 의미가 다르면 이름을 추측하거나 새로 만들지 말고 원본을 재조회합니다. 그래도 해결되지 않으면 해당 부분을 차단하고 차이를 보고합니다. 동일한 의미로 매핑되는 경우 정확한 실제 키와 근거를 남깁니다.

`https://your-design-system-link.com` 같은 자리표시자 URL은 조회 대상으로 사용하지 않습니다. 실제 기준은 MO 파일 `09eGMNTNnkE0CTxPdr7lnk`와 그 파일이 연결한 Graphic 라이브러리이며, 사용자가 지정한 실제 Figma 예시는 역할·패턴의 승인 근거로 함께 확인합니다. 문서 제목에 Code Generation이 있어도 별도 요청 없이 앱 코드를 생성하지 않습니다. 신규 스타일을 먼저 확인하라는 문장은 신규 스타일 생성 허가가 아닙니다.

## 화면과 구조 — 원문 §2, §5

### 2026-10-19 승인 규칙 우선 적용
- 2026-10-22 일반 Feedback의 중복 래퍼 제거: Feedback Auto Layout 프레임을 한 번 더 만들고 상하 24px 패딩을 주는 패턴은 원문 §5의 해당 데이터 없음(Empty State) 상황에만 적용합니다. `2130:4205` 발급불가 안내는 `## BODY > Container > Feedback` 실제 인스턴스이며 추가 Feedback 프레임은 제거합니다. Container 패딩 0, BODY padding 40/20/32/20 및 Feedback 폭 350px를 유지하고 원형 내부·문구·hasSubText·variant·아이콘·버튼·변수를 보존합니다. 일반 안내·오류·완료 화면을 컴포넌트 이름만으로 Empty State로 분류하지 않습니다. 별도 명시된 사용자/기획 지시는 우선합니다.
- 2026-10-22 Feedback 제목/본문 위계: 핵심 결과·제한은 `Feedback > Title+error_text > title`, 보조 설명·해결 방법·다음 행동은 같은 그룹의 `Text`에 매핑하고 hasSubText true로 노출합니다. `2130:4205`의 `1회용 신청번호가 없으면\n가까운 지점에 방문해서 신청해주세요.`는 Text에 넣습니다. title에 전부 합치거나 빈 줄로 대신하거나 csInfomation의 동명 Text에 넣지 않습니다. 원본 스타일·변수·색상·간격 및 공개 가시성 연결을 보존하고 실제 직계 자식과 문구를 검수합니다.
- 2026-10-22 이미지 후속 간격 기본값: Image Area 또는 단독 ImageContainer 다음 콘텐츠는 종류와 무관하게 외부 gap spacing/3xl=24px를 적용하며 BODY 기본 32px보다 우선합니다. 사용자가 별도 명시한 간격이 있으면 그 지시를 따릅니다. 래퍼가 있으면 Image Area 바깥 경계부터, 단독이면 ImageContainer 경계부터 측정하고 이미지 내부와 외부에 24px를 중복 적용하지 않습니다. 기존 내부 패딩·이미지 크기·Title / Page → Image Area gap 0px와 승인된 더미 구성은 유지합니다.
- 2026-10-22 키패드 화면 상단 패딩: 사용자 기준 `zNwpdAWcBMOM5ExkiBUoGn / 2071:3356`처럼 키패드가 포함된 화면은 `## BODY` 자체에 padding-top `spacing/3xl`=24px를 적용합니다. 기존 키패드 템플릿의 다른 값보다 우선하며 Container에 같은 상단 패딩을 중복하지 않습니다. Keypad 내부·BottomSheet Slot·HEADER·FOOTER 및 BODY의 나머지 속성은 이 변경으로 수정하지 않습니다.
- 2026-10-21 강조 보존·Medium 최종 명확화: 기획에 없는 강조·링크만 추가 금지이며, 기획에 표시된 강조 구간과 링크는 반드시 반영합니다. 본문 강조 굵기는 동일 텍스트 크기·계열의 원본 Medium Text Style 및 연결된 medium 변수로만 변경합니다(14 Light → 14 Medium, 16 Light → 16 Medium). Bold로 표현된 기획도 동일 크기 Medium으로 매핑하며 Bold·Semibold·크기 확대·고정 fontWeight로 대신하지 않습니다. 굵기만 강조된 경우 색상·밑줄·링크를 추가하지 않습니다. 링크 굵기도 Medium으로 교정하며 제목·CTA 등 DS 원형 전체의 Weight를 일괄 변경하지 않습니다.
- 2026-10-21 간격 최종 교정: Infobox / Card 다음 콘텐츠와의 외부 간격은 종류와 무관하게 spacing/3xl=24px이며 종전 Card → TextList 12px와 BODY 기본 32px보다 우선합니다. 카드 내부 간격이나 카드 앞쪽 간격은 변경하지 않습니다. Radio Group과 Checkbox Group(CheckBox Group)의 반복 항목 gap은 spacing/2xl=20px이며 Grid 행·열도 모두 20px입니다. 개별 컴포넌트 내부, 단일 CheckBox 래퍼 gap 0, Title / Element ↔ 그룹 gap 16px는 유지합니다.
- 2026-10-21 기획에 없는 강조·링크 금지: 메뉴명·대괄호·다른 화면 언급만으로 Bold/Medium·강조색·밑줄·hyperlink·이동 동작을 추가하지 않습니다. 강조·링크 스타일 규칙은 기획 또는 사용자 지시에서 명시된 구간에만 적용합니다. `KFlklMvGmg0MXGfAXvpprn / 1151:257`의 `[고객정보조회(개인정보열람)]`는 사용자 확인에 따라 일반 본문과 동일한 스타일로 취급합니다. 링크 여부를 판단한 뒤 스타일을 선택하고, 구간별 원본 Text Style·Weight·색상·밑줄·실제 연결을 검수합니다.
- 2026-10-21 일반 화면의 Popup 오적용 방지: 일반 화면은 아트보드 직계 `## HEADER` / `## BODY` / `## FOOTER` 3단 구조를 기본으로 합니다. Popup은 기획 페이지 형태 또는 사용자 명시 지시로 풀팝업이 확인된 경우에만 사용합니다. iOS·인증/PIN·X 버튼·기존 템플릿의 Popup 사용은 분류 근거가 아닙니다. `2025:6834`를 일반 구조 기준으로 삼으며 `2027:732`의 Popup 래퍼는 사용자 교정 대상입니다. 템플릿 복제 전 유형·계층을 대조하고 최종 직계 자식·Vertical Auto Layout·StatusBar의 HEADER 소속을 검사합니다. 이번 문서 갱신을 화면 구조 수정 완료로 보고하지 않습니다.
- 2026-10-21 Chip 후속 간격 최종 교정: Chip / Basic 바로 다음이 Feedback 또는 Feedback 래퍼이면 부모 Auto Layout gap은 spacing/3xl = 24px입니다. 승인 기준은 `2180:10209`이며 종전 Feedback 포함 8px 지정보다 이 예외를 우선합니다. Data Block Group·목록·일반 콘텐츠와의 gap은 spacing/md = 8px를 유지합니다. Chip 내부 패딩, Data Block Group 내부 박스 간격, Feedback 내부 패딩은 별도로 유지하며 추가 빈 프레임·padding-top으로 외부 간격을 중복하지 않습니다.
- 2026-10-21 인포박스 단일 안내·섹션 제목 재확정: `2158:10984`처럼 인포박스 안 TextList / Unordered가 한 항목뿐이면 불릿 없는 `Text` Auto Layout > `Content`로 매핑합니다. Infobox / Card 본문은 14 Light / text/neutral/tertiary와 원본 변수·스타일을 유지합니다. 여러 줄·문장 수를 항목 수로 오해하지 않으며 복수 항목과 인포박스 밖 일반 본문의 단일 TextList 유지 규칙은 구분합니다. `2157:9320`의 재외국민이란?·재외국민 등록방법(1가지 선택)은 실제 Title / Section 인스턴스를 사용해야 하며 일반 Text의 Medium/Bold나 이름만 바꾼 Frame으로 대신하지 않습니다. 설명은 Text, 목록은 해당 TextList로 구성하고 제목의 원형·공개 속성·component key를 검수합니다.
- 2026-10-21 Chip·Data Block·빈 상태 최종 피드백: `2158:8074`처럼 가로 스와이프 기획의 Chip / Basic은 hasControl false / extended false / Slot Horizontal·NO_WRAP / 우측 화살표 실제 비노출로 구성합니다. 모든 항목 노출을 위한 확장·줄바꿈·축소·문구 생략은 금지하며 원본 variant·항목·선택 상태·연결은 유지합니다. 상단 회색 Infobox / Card와 솔리드 Data Block이 중첩되면 Data Block을 승인 수정본의 아웃라인(흰색 계열 fill + secondary-muted border + stroke/md, padding·radius 20)으로 적용합니다. D31 일반 선택 재량보다 이 상황 규칙을 우선합니다. 데이터가 없는 Feedback은 `2150:14233`의 status-nodata 원본을 필수 사용하며 status-noResult 돋보기로 대신하지 않습니다. Empty State의 기존 크기·문구·간격은 유지합니다.
- 2026-10-21 작업자 우측 패널 편집 보장: 모든 전달 컴포넌트는 실제 인스턴스·공개 속성·내부 연결을 유지하고, 원본이 제공하는 variant·size·선택/비활성·가시성·instance-swap 옵션이 실제 결과에 반영되는 것을 완료 조건으로 삼습니다. 문구·항목·상태를 적용한 뒤 유효한 조합을 양방향 전환하여 원본의 내부 타입·상태·배치·문구·스타일·변수 규칙을 대조합니다. 원본이 의도한 상태 변화는 허용하며 검수 뒤 기획 상태로 복원합니다. Slot/도구 제약으로 실패하면 영향 옵션과 제한을 명시하고 정상 완료로 처리하지 않습니다. 원본 미지원 동작은 보장 범위에 포함하지 않습니다.
- 2026-10-21 컴포넌트 동작 보존: 부모 variant가 내부 타입을 제어하는 컴포넌트는 Slot을 고정 타입으로 교체하여 연결을 끊지 않습니다. Chip은 실제 문구·항목·상태를 적용한 뒤 single → multiple → single에서 SolidChip ↔ LineChip의 실제 component key와 문구·상태 보존을 함께 검수합니다. extended 전환도 사용하는 범위에서 확인하고 기획 상태로 복원합니다. 기본 Slot 아이템을 수정하는 것만으로도 override가 생길 수 있어 단순 편집은 해결 근거가 아닙니다. 바깥 인스턴스·variant·외형만 정상인 것은 PASS가 아니며, 실패 시 현재 화면의 제한을 명시하고 원본 수정 필요성을 추정하지 않습니다.
- 2026-10-20 단일 컴포넌트 래퍼 명명 재확정: 패딩·정렬·배치 때문에 단일 InputField를 감싼 Auto Layout도 `InputField`로 명명합니다. 승인 화면 `2141:10091`의 구조는 `InputField`(Auto Layout) > `InputField`(원본 인스턴스)이며, 바깥을 `InputField Group`으로 부르지 않습니다. Full-Width에 한정하지 않고 일반 화면·바텀시트에도 적용하며 같은 컴포넌트가 복수로 반복될 때만 Group을 붙입니다. 명칭 교정 시 계층·간격·크기·속성은 보존합니다.
- 2026-10-20 은행·증권사 선택 최종 통일: `zNwpdAWcBMOM5ExkiBUoGn / 2101:12453`을 공통 화면 기준으로 우선 재사용합니다. BottomSheet(스크롤 딤 true, CTA 없는 StickyButton) > Slot(Tab → GridButton, gap 24 / 하단 padding 20) 구조와 1depth 은행·증권사 Tab을 유지합니다. GridButton은 secondary/grid / 좌우 padding 20, 내부 Grid는 3열 균등 FLEX / 행·열 gap 8 / 행 높이 Hug입니다. Item / Vertical은 secondary / padding 16 / gap 12 / hasIcon true / hasSubLabel false / 셀 Fill·Fill, IconContainer size 36과 기관별 원본 심볼을 사용합니다. 현재 18개·6행은 고정하지 않고 기획의 항목·순서·상태에 맞춰 행 수만 조정합니다. 일반 선택형 primary/grid 예시 및 기존 `2109:3661`보다 이 전체 패턴을 우선하며, Label·문구 Hug·원본 서체·변수·하단 스크롤 처리를 검수합니다.
- 2026-10-20 CTA 원형 보존: `BoxButton > Label > 버튼명`의 Label·텍스트는 원형 Hug·Hug, 텍스트 자동 크기는 WIDTH_AND_HEIGHT를 상속합니다. 문구만 바꾸고 resize·고정 width·HEIGHT·본문용 Fill/자동 높이 처리를 적용하지 않습니다. 잘못된 크기 override를 복원할 때 다른 상태·아이콘·서체·변수는 보존합니다. 폭 49px 같은 측정값 자체가 아니라 실제 Resizing·override와 문구 변경에 따른 자연 폭을 검수합니다. 바깥 CTA 버튼의 Fill과 내부 문구의 Hug를 혼동하지 않습니다.
- 2026-10-20 은행·증권사 선택: 승인 화면 `2109:3661`처럼 GridButton 내부 Item / Vertical의 IconContainer에 각 기관의 원본 심볼을 instance-swap으로 연결합니다. MO F07. System Icon > 04 로고의 기관명·기관 코드·key를 확인하며 기본 ICON·공통 아이콘으로 납품하지 않습니다. 항목명·순서·중복·상태·Grid 구성 및 IconContainer 크기를 유지합니다. 증권사도 해당 증권사의 심볼을 확인하며, 도움말 목록의 기본 아이콘 유지 예외를 적용하지 않습니다.
- 2026-10-20 선택형 버튼 UI: `2074:1554`처럼 선택지를 버튼으로 열거하는 화면은 Card / Surface 대신 실제 **GridButton**을 우선합니다. `GridButton > Slot > Grid > Item / Vertical` 원형을 유지하고 **Slot 안 Grid의 행·열·아이템 수·순서**를 기획에 맞춰 조정합니다. 현재 primary/grid, 1행 2열·균등 Fill·gap 8px는 예시이며 전역 고정하지 않습니다. 하단 Button Area 조합 래퍼는 `GridButton / Button Area`입니다. List 셀렉트 바텀시트 등 기존 전용 패턴은 유지합니다.
- 2026-10-20 필수/선택 최종 교정: 필수 InputField는 Title / Element의 `optional: false`로 optional 래퍼를 숨깁니다. 필수가 아닌 항목은 `optional: true`와 기본 `(선택)` 문구·색상·서체·스타일·변수를 그대로 유지합니다. 기존 `(필수)`·강조색 재정의는 원형으로 복원하며 표기 대신 래퍼 가시성만 제어합니다.
- 2026-10-20 최종 교정: [2025:7407](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2025-7407)의 하단 TextButton처럼 **인풋 조합 및 박스 아래에 별도 배치하는 TextButton의 variant는 secondary**입니다. 종전 인풋 조합의 primary 지정은 철회하며 기존 크기·간격·정렬은 유지합니다. InputField 내부 버튼과 독립 CTA까지 일괄 변경하지 않습니다.
- InputField 뒤 보조 이동 버튼은 [2025:6834](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2025-6834)의 `InputField / Button Area > InputField, Button Area` 구조로 묶고 gap 12px를 적용합니다. 상위 Title과의 간격은 24px입니다. Button Area는 Fill·Hug / gap 0 / 우측 정렬이며 TextButton은 실제 `secondary / xsmall`, prefix false / suffix true(우측 화살표) / underline false / Hug·Hug입니다. 내부 입력 버튼이나 독립 CTA까지 일반화하지 않습니다.
- 도움말·이용 방법 선택 바텀시트는 [185:14891](https://www.figma.com/design/KFlklMvGmg0MXGfAXvpprn/?node-id=185-14891)의 테두리 없는 List 패턴을 우선합니다. `Slot > Container > List Group > List`, 목록 gap 0, Slot padding 0/0/20/0, Container padding 0/20/0/20, List padding 12/0/12/0입니다. 본문 안내는 Text로 유지하고 목록과 gap 16px로 묶습니다. List의 Prefix는 기본 `Item / Prefix (bgIcon)`(아이콘 48×48, 래퍼 폭 52), Middle은 16 Bold + 필요 시 14 Light, Suffix는 pageIndicator입니다. 아이콘의 최종 선택·교체는 작업자 몫이므로 기본 인스턴스만 둡니다. D07의 일반 선택 목록 gap 8px나 Card 패턴보다 이 구체적 규칙이 우선합니다.
- 링크 목록의 제목·목록 래퍼는 `Title / List Group`으로 명명하고, 실제 `List` 인스턴스 이름은 유지합니다. Container 2 이상에서 래퍼 padding-top은 `spacing/3xl`=24px, 내부 `List Group` gap은 0px입니다. 래퍼 자체의 Title↔목록 gap 16px와 Container 1 기존 값은 유지합니다. 이전에 전달된 내부 목록 gap 24px는 철회되었습니다.
- PDF 약관 상세는2026-10-27 확정한v0.95 기준31888:30615와 원문§2.G를 적용합니다. StatusBar는 아트보드 직계Auto, 3단 영역은 Popup > Slot 안 Header / Body / Footer입니다. BODY·body Fill, Footer Absolute, 아트보드 직계 Pagination 실제 인스턴스·Absolute를 유지합니다. 종전72:9033의 직계3단·Container1/2 유지 규칙을 새 구조에 적용하지 않습니다.
- Image Area는 승인 원본 `10580:10543`의 **더미 그래픽과 “더미이미지” 라벨까지 포함한 전체 구성**을 기본 재사용합니다. 빈 ImageContainer로 바꾸거나 라벨을 생략하지 않습니다. 원본 이미지·크롭·레이어·외형을 보존하며 임의 새 이미지 생성은 하지 않습니다. 최신 승인 참조 `0P0j17OPstNhC3LWjBdBGy / 67:1947`의 Image Area `67:2127`처럼 라벨은 편집 가능한 TEXT / Pretendard SemiBold와 원본 fontFamily 변수 alias를 유지합니다. 폰트 outline·SVG·벡터·이미지 변환과 대체 폰트는 금지합니다. 기존 SVG 대체 예외는 폐기합니다.
- `Title / Page` → `Image Area`는 같은 Container의 직계 자식으로 gap 0px입니다. Image Area 다음 콘텐츠는 종류와 무관하게 `spacing/3xl`=24px입니다. [참조 10580:10543](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=10580-10543)의 Vertical / Fill·Hug / padding 40px 0 / gap 0을 적용합니다. ImageContainer는 ratio 2:1, Fill·Fixed(폭 350px 기준 350×175px), 전체 영역 350×255px입니다. 이미지 앞뒤 간격에 BODY 기본값을 일괄 적용하지 않습니다.
- 일반 콘텐츠의 Tab 직후 간격은 `spacing/3xl`=24px입니다. BODY 기본 32px보다 우선합니다. Tab + Infobox / Card는 `## BODY > Container 1 > Tab, Infobox / Card`로 구성하고 두 컴포넌트를 Container 1의 직계 자식으로 둡니다. `Tab / Infobox > Container 1, Container 2`와 각 컴포넌트의 별도 Container 래핑은 금지합니다. Container 1 내부 gap 24px로 제어하며 다음 독립 본문 블록은 형제 Container 2부터 이어갑니다. 일반 복합 그룹 네이밍보다 이 계층 규칙을 우선합니다. 특수 Feedback 패턴은 전용 규칙을 유지합니다.
- D29·D32: 고객명~인증완료 등 건별 조회 내역은 와이어프레임의 평면 DataList Group·상하 Divider 대신 `0P0j17OPstNhC3LWjBdBGy / 4:979, 4:994`의 Data Block으로 치환합니다. 이 경우 아래 D14보다 D29를 우선합니다. padding·radius 20px, 목록 gap 12px, Title이 있을 때 Title↔목록 gap 16px, 반복 박스 gap 12px를 DS 토큰으로 연결합니다. 기획에 없는 Title·툴팁·아이콘은 숨깁니다. 완료 화면 D18·D19는 유지합니다.

|규칙 ID|적용 상황|필수 확인|
|---|---|---|
|D01|화면 이름|화면 주변의 페이지 ID 영역까지 읽어 해당 화면과 연결. ID가 있으면 `실제페이지ID_화면명`(예: `F730_화면명`), 공란이면 기존 `화면ID_화면명` 유지. 기획서 `{…}` 명칭을 사용. 요구사항 ID·상위 프레임명·화면명·주석의 숫자/약어를 페이지 ID로 추정하지 않으며 `-`는 공란으로 처리. 미확인은 공란으로 단정하지 않고 명시|
|D02|일반/완료 화면|폭 390, Vertical. 내용이 844 이내이면 화면 높이 Fixed 844 + BODY Fill. 초과하면 화면 높이 Hug + BODY Hug|
|D03|일반/완료 루트 및 Popup 적용 판별|직계 자식 `## HEADER`, `## BODY`, `## FOOTER`, 모두 Vertical Auto Layout. 일반 화면 전체를 Popup으로 감싸면 FAIL. Popup은 기획 페이지 형태 또는 사용자 명시 지시에서 풀팝업이 확인된 경우만 허용하며 iOS·인증/PIN·X 버튼·기존 템플릿만으로 추정하지 않음. StatusBar는 일반 화면 HEADER 안에 배치|
|D04|HEADER / FOOTER|HEADER: StatusBar → AppBar. FOOTER: CTA 있으면 StickyButton → HomeIndicator, 없으면 HomeIndicator만|
|D05|BODY|padding-bottom `spacing/5xl`=32. 헤더 직후 StepIndicator·Tab은 padding0·Fill의 Container 1로 감싸 전폭390, BODY 좌우0, 후속 Container 좌우20을 적용한다. HEADER 직후 Infobox / FullWidth도 BODY 직접 자식|
|D06|바텀시트|390×844 Auto Layout. Dimmed(전체 크기, Absolute, `background/overlay/dimmed`) → BottomSheet → StatusBar(Absolute, iOS/light, 최상단) → HomeIndicator(최하단)|
|D07|선택 바텀시트|BottomSheet > Item / BottomSheet > Slot > Container 1 > List. gap `md`=8, 기획 항목 1:1 순서 보존. 기획에 명시된 초기 선택 항목·선택 순서를 우선하며, 미지정이면 화면에서 위에서 두 번째 List를 기본 선택(안내 List도 순서에 포함, 재정렬 금지). 선택 항목 hasSuffix=true, Slot-Suffix > Item / Suffix의 variant=checkMark를 공개 속성으로 설정. 일반 단일 선택의 나머지는 hasSuffix=false. 승인 기준 2230:10109 / 2230:10111. 체크마크 노출·비노출 모두 List 높이 48px / 세로 Fixed이며 비노출 시 46px Hug로 축소하지 않음(2026-10-20 확정). 도움말·이용 방법 선택 List의 별도 높이에는 일괄 적용하지 않음|

StepIndicator와 FullWidth가 동시에 있을 때의 서로 간 순서는 원문에 명확하지 않습니다. 해당 와이어프레임/대응 템플릿으로 확인하고 그래도 충돌하면 그 화면의 순서를 확인받습니다. 독립 배치는 wrapper 제외를 뜻하며 원본 컴포넌트 내부 Auto Layout을 해제하라는 뜻이 아닙니다. Absolute는 문서에 명시된 바텀시트 오버레이에 한정하며 다른 화면으로 확대하지 않습니다.

## 컨테이너·간격·속성 — 원문 §3, §4

2026-10-19 사용자 교정: 최소 높이가 적용되는 짧은 콘텐츠 BottomSheet는 Slot의 세로 Resizing을 Fill로 설정하여 남는 높이를 흡수합니다. 원형 minHeight를 유지하고 내부 Container·Text는 Hug로 둡니다. 완료 화면의 Feedback은 항상 Large(실제 공개 속성 `varient: large`)이며, 일반 피드백·Empty State 크기 규칙보다 우선합니다. 지정 화면 `44:898`의 Slot Fill, `47:972`의 Feedback Large를 적용·검수합니다. 상태 아이콘과 문구·버튼은 기획대로 보존하고 내부 크기·서체는 Large 원형을 따릅니다.

간격 이름은 실제 `spacing/<이름>` 변수 key로 매핑합니다. 0만 토큰 없이 허용합니다. 역할별 부모 오토레이아웃의 gap과 padding은 최신 원문의 해당 화면 규칙을 기준으로 배치합니다. 내부 목록 gap은 아래의 명시적 규칙을 사용합니다. BODY의 wrapper는 위에서부터 `Container 1`, `Container 2` …로 명명합니다. **완료 화면은 최신 D18·D19의 BODY 패딩과 계층별 gap 규칙을 우선 적용하며, Container padding-top으로 대체하거나 좌우 패딩을 중복 적용하지 않습니다.**

|규칙 ID|상황|설정|
|---|---|---|
|D08|HEADER 다음 Title / Page, 데이터 Box, Title+Inputs|Container padding-top `3xl`=24|
|D09|HEADER 다음 검색 인풋|padding-top 0|
|D10|HEADER 다음 Infobox / FullWidth|wrapper 없음, 위 간격 0. 다음 Container padding-top `5xl`=32|
|D11|연속 InputField|하나의 Container, gap `2xl`=20|
|D12|SegmentedControl + InputField(date-date)|두 요소를 Auto Layout `Group`으로 묶음|
|D13|연속 Card / Surface 또는 Data Block|각각 `Card Group` / `Data Block Group`, gap `lg`=12. Card 적용 여부는 D28~D32로 먼저 판단|
|D14|일반 수평 DataList|layout=split, size=14. 위/아래 Divider / Horizontal(thickness=1px, tone=tertiaryMuted, length=full), 전체 Container gap `xl`=16|
|D15|DataList 직후 공지|TextList / Unordered, Container padding-top `lg`=12|
|D16|Form 도중 Accordion|Container padding-top `2xl`=20|
|D17|TextList size|Infobox / Card·Card·알려드립니다 Accordion 내부는 14, 일반 본문은 16|
|D18|완료 화면 BODY·Feedback|상단 Feedback + 후속 데이터 패턴: BODY Vertical, padding `40px 20px 32px` (`6xl / 2xl / 5xl`), gap `6xl`=40, 가로 정렬 center. `Container 1` > Feedback, `Container 2` > 데이터 영역. 두 Container 패딩 0, 상단·좌우 여백 중복 금지. Feedback 아이콘 status-circleCheck 유지|
|D19|완료 화면 후속 데이터|Container 2 Vertical, padding 0, 가로 Fill/세로 Hug. 복수 `Title / DataList Group` 사이 gap `5xl`=32. 각 그룹은 `Title` → `DataList Group` 순서, gap `xl`=16. Title은 Vertical Auto Layout, padding 0, `Title / Element` → `Divider / Horizontal(thickness:1px,variant:primary,length:full)`, gap `lg`=12. DataList Group도 Vertical/padding 0, `DataList(split,14,hasDivider:false)` 사이 gap `lg`=12. full Divider는 350px 콘텐츠 폭이며 BODY 좌우 패딩 제거 금지 **2026-10-28 교정: 제목이 없으면 Title / Element만 숨기고 Title 래퍼와 primary Divider는 노출 유지. Title 전체 숨김·생략 금지, 빈 제목 공간 없이 Divider 높이만 Hug. Divider↔목록 16px·목록 내부 12px 및 실제 상단 Divider 노출 필수 검수.**|
|D20|Title / Page 직후 단일 공지|Infobox / Solid(size=medium,status=warning,hasSuffix=true). Container 위 `5xl`=32, 다음 Container 위 `3xl`=24|
|D21|하단 공지 카드|Infobox / Card, Container 위 `5xl`=32. Title Area·Slot-Contents·Button Area를 기획에 따라 노출하고 Slot-Contents에 내용 배치|
|D22|하단 알려드립니다|승인 기준 `2075:2064` 하단 `2071:4202` 재사용. 전용 Container(gap·padding 0, Full Width) > 외부 Divider(10px,tertiary,full) → Accordion(type=basic,variant=standard,size=medium,hasPrefix=true, Icon=solid-info-circle,hasDivider=false,expanded=true). 하단 버튼 위, 본문과 간격 `5xl`=32. 본문 TextList 14 / Slot gap 8. 기획 기본값이 접힘이어도 항상 expanded=true로 완료. Accordion만 단독 배치 금지|
|D23|Title / Page 다음 Empty State|Feedback variant=small, Container 위 `7xl`=48|
|D24|알아두세요 Box|기존 Infobox 용도라면 원본 DS 컴포넌트·전용 규칙 유지. 그 외 설명·안내 박스는 D30의 `Text Box`로 분류하고, 예시별 내부 구조·간격을 확인하여 과거 Box 수치를 일괄 적용하지 않음|

간격 스케일: 3xs=1, 2xs=2, xs=4, sm=6, md=8, lg=12, xl=16, 2xl=20, 3xl=24, 4xl=28, 5xl=32, 6xl=40, 7xl=48, 8xl=80. Divider의 10px는 컴포넌트 thickness 명세이며 spacing=10 토큰을 만들라는 뜻이 아닙니다. FullWidth 및 전체 폭 Divider의 wrapper 좌우 패딩은 실제 대응 템플릿과 컴포넌트 폭 규칙을 함께 확인합니다.

**D18·D19의 갱신 근거**: [완료 화면 `2668:26353`](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2668-26353), 2026-10-15 실측. BODY padding-top을 Container에 중복 배치하던 해석, 후속 그룹 padding-top 24px, 데이터 영역 전체 gap 12px 평탄화 및 완료 Divider의 quaternary 지정은 이 패턴에서 사용하지 않습니다. `Title` / `DataList Group` 내부 및 Container 2의 패딩은 모두 0입니다. 상세 노드·토큰 key는 [실측 기록](design-rules.md)의 완료 화면 갱신 절에 있습니다. 일반 화면·빈 상태·Data Block의 수치를 이 완료 패턴 값으로 일괄 변경하지 않습니다.

## 텍스트 — 원문 §1

2026-10-19 사용자 교정: 바텀시트 등 각 Slot의 Container가 하나이면 `Container`로 명명합니다. 일반 본문은 `Slot > Container > Text > Content` 구조이며 `Text`는 Vertical Auto Layout, gap·padding 0, 가로 Fill·세로 Hug입니다. 강조 구간은 원본 Medium Text Style의 key로 적용하고 직접 fontName/fontWeight를 덮어쓰지 않습니다. 모든 구간의 Text Style과 fontFamily·fontSize·fontWeight·lineHeight·letterSpacing 변수 alias, 색상 변수를 원본과 대조하며, 일부 구간의 연결 누락도 실패입니다.

|규칙 ID|상황|설정|
|---|---|---|
|D25|상태/피드백 의미 강조|적합한 `text/status/*` 변수|
|D26|일반 강조|적합한 `text/accent/*` 변수|
|D27|문장 내 링크|기획/사용자 지시에서 링크로 명시된 구간만 `text/neutral/primary` (2026-10-28 secondary 대체) + 동일 텍스트 크기·계열의 Medium Text Style/medium 변수 + Underline + Offset 25%. 종전 Bold 지정은 Medium으로 교정. 링크가 없는 구간에 임의 추가 금지|

실제 폰트·텍스트 스타일 key와 구간별 스타일을 확인합니다. 링크 때문에 문장 전체를 굵게 하거나 밑줄을 적용하지 않습니다. 25%를 25px로 바꾸지 않습니다. underline offset API 지원이 없으면 검수 완료로 선언하지 말고 미지원 사실을 기록합니다.

## 박스의 역할·스타일 — 원문 §3 Box UI Rules (2026-10-15)

이 절은 박스를 버튼 유무로만 이분화하거나 모든 안내 박스를 정보성 카드로 취급하던 해석보다 우선합니다. 최신 원문의 명시 규칙이 과거 색인·템플릿보다 우선하며, 역할 분류와 시각 스타일 선택은 별도로 검수합니다.

|규칙 ID|상황|필수 확인|
|---|---|---|
|D28|동작·선택 박스|버튼형 선택지는 GridButton 우선(2074:1554 및 Slot 내부 Grid 가변 적용). 그 밖의 복합 카드에는 `Card / Surface` 인스턴스. 이체·상세 이동·체크/라디오·상품/계좌/항목 선택 및 박스 전체 클릭 동작 포함. Footer 버튼이 없어도 해당. 상태 Label만으로 Card 판정 금지. 외부 형제 `Button Area`의 버튼은 박스 내부 동작으로 세지 않음|
|D29|사실 데이터 표시|`Data Block` Auto Layout 프레임 직접 구성. 이름·전화번호·거래내역·계좌정보·금액 등이 대상. 복수 항목의 대표 구조는 `Title` + `DataList Group` > `DataList(split,14,hasDivider:false)`. 단일 라벨·값 쌍은 승인 참조 `KFlklMvGmg0MXGfAXvpprn / 1147:62`의 `1148:3021`처럼 **`Data Block > DataList` 직접 배치**, 내부 Group·Title·Divider 없음. 패딩·라운드 20 / Fill·Hug / 아웃라인(2026-10-28), Label 14 Light 좌측·Data 14 Medium 우측. 섹션 Title은 박스 밖 형제, gap 16. 완료 화면 전용 그룹에는 일괄 적용하지 않음. Card를 detach하여 만들지 않음|
|D30|설명·안내·주의·상태 박스|기존 Infobox 용도는 해당 컴포넌트 유지. 그 밖은 `Text Box` Auto Layout으로 직접 구성. 상담센터 전화번호·이메일이 포함돼도 주목적이 안내이면 Text Box. 참조 패딩 `spacing/2xl`=20, gap `spacing/xl`=16, 라운드 `radius/lg`=14|
|D31|Data Block 아웃라인 / Text Box 스타일 선택|Data Block은 단일·복수 모두 아웃라인형으로 제작하며 회색 무테 재량을 적용하지 않음(2026-10-28). 아래 선택 재량은 Text Box에 한정. 직접 구성한 박스의 아웃라인은 `surface/neutral/quaternary-muted` + `stroke/md` + `border/neutral/secondary-muted`. 회색 배경은 `surface/neutral/tertiary-muted`, 외곽 `strokes: []`. 회색 Infobox / Card와 솔리드 Data Block 배경이 반복·중첩되는 경우는 사용자 수정본 `2158:8074`처럼 Data Block 아웃라인을 우선 적용. 그 밖에는 테두리 반복·중첩, 주·보조 위계, 밀도와 가독성으로 선택. 내부 Divider는 별도 판단. Card는 공개 속성이 지원하는 범위만 사용|
|D32|이름·간격·근거|박스 역할과 이름을 스타일 변경 후에도 유지. 반복 목록은 각 `… Group`으로 묶고 내부 자식은 모두 `Data Block` / `Text Box`처럼 원래 레이어명을 사용하며 순번을 붙이지 않음. 이 규칙은 모든 Group 내부 반복 자식에 적용하며 `Container 1`, `Container 2` 등 명시된 페이지 Container 순번은 예외로 유지. 박스 내부 패딩 보존. Data Block 기본 gap 16과 승인된 부모님 기본정보 예시 gap 20을 구분하고 실제 참조·토큰 key·선택 이유를 확인|

선택한 스타일의 이유는 기존 작업 기록에 한 줄로 남기며, 사용자에게 매번 선택 승인을 요청하지 않습니다. 새 토큰·서체·라이브러리 컴포넌트를 만드는 재량은 아닙니다. 네 가지 승인 예시와 실측값·키는 [실측 디자인 규칙](design-rules.md)의 2026-10-15 박스 UI 절을 참조합니다.

## 기존 기록과의 차이 / 실행기 지원 범위

|차이|현재 적용|
|---|---|
|실측 정보 안내에서 StepIndicator에 Container가 있었음|2026-10-28 최신 승인에 따라 padding0·전폭 Container 구조를 사용하며 종전 Container 제거 지시는 폐기. 시점별 실측 JSON은 보존|
|기존 생성기 root 이름은 MO/runId|D01이 산출물 화면 이름 기준. runId는 receipt로 추적. 현재 생성기를 그대로 실행하면 이름 규칙을 만족하지 않음|
|기존 검증기는 참조 값과의 일치를 요구|문서에 따른 변경을 원본 snapshot에 덮어쓰지 않음. 변경 의도·규칙 ID·노드 ID를 기록하고 전용 구현/검증 필요|
|기존 생성기/검증기의 Absolute 제한|D06은 허용된 디자인 패턴. 현재 일반 컴파일러가 지원하지 않으므로 전용 제작·검증 필요|
|기존 수집기는 underline offset을 수집하지 않음|D27은 추가 API 조회 또는 Figma 인스펙터 근거 필요. 기존 수집 결과만으로 PASS 금지|
|SLOT·중첩 속성과 상황별 간격|명시 규칙은 필수. 현재 CLI가 모든 규칙을 자동 판정하지 않으므로 작업별 추가 검수 필수|
|박스 역할 분류와 스타일 선택|D28~D32는 원문·계층·공개 속성·화면을 함께 확인. CLI가 동작 의미나 테두리 중첩을 자동 판정하지 않으므로 일반 CLI PASS로 대체하지 않음|

위 표는 디자인 규칙을 완화하지 않습니다. 문서 반영과 자동 생성기 기능 구현은 구분합니다. 이번 추가는 기본 지침·검수 절차 반영이며, 모든 규칙이 CLI에 자동 구현되었다고 보고하지 않습니다. 기존 검사 실패를 무시하거나 PASS로 고쳐 적지 않습니다. 지원하지 않는 경로는 구현·검증을 완료하기 전 REVIEW_REQUIRED/BLOCKED로 남깁니다.

## 작업별 필수 검수 근거와 요청 시 보고서

모든 작업에서 적용 규칙의 실제 속성·실측·화면 검사 근거를 확인합니다. 기본 제작은 제작 호출의 반환값·검수 결과로 이를 남기며 별도 보고서 파일을 만들지 않습니다. 사용자가 정형 보고서나 하네스 검증 산출물을 요청한 경우 `runs/<run-id>/designer-review.md`를 만들고 원문 파일 해시, 읽은 문서, 화면 분류, 이름, 각 D01~D32의 적용 여부를 기록합니다. 각 행은 `규칙 ID | 적용/비적용 및 이유 | 기획 노드 | 결과 노드 | 실제 속성·토큰 key | 검사 근거 | PASS/FAIL/NOT_RUN` 형식으로 작성합니다. 적용 규칙은 실측/속성 조회/스크린샷 등 해당 규칙을 검증할 수 있는 증거가 있어야 PASS입니다. 비적용 규칙은 이유를 적고 N/A로 남깁니다.

디자이너 문서와 템플릿의 차이는 `원문 규칙 → 관측값 → 적용값 → 이유 → 구현/검증 상태`로 기록합니다. 보고서가 요청되면 최종 리포트에 이 파일을 연결하고 FAIL/NOT_RUN, 미지원 API, 미해결 매핑을 포함합니다. 보고서 유무와 관계없이 미검증·실패 상태를 완료로 처리하지 않습니다.
