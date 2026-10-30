# 작업 실행 절차

## 고객확인 등록 안내의 불릿·복합 구조·옵션 대조 (2026-10-30 사용자 교정)

- **승인 근거·적용 범위**: [고객확인 등록 승인 화면 3478:41680](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3478-41680)을 해당 유형의 기준으로 사용합니다. [오류 제작본 3521:2924](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3521-2924)의 일반 Text 변환·임의 Container 분할·제목 및 버튼 옵션·StickyButton 기본값을 재사용하지 않습니다. 아래 수치는 이 승인 패턴의 명시적 예외이며, 다른 화면의 일반 TextList 간격·Title 원형·서비스 바로가기 secondary/small 규칙을 전역 변경하지 않습니다. 해당 고객확인 등록 패턴에서는 이 최신 교정을 우선합니다.
- **기획의 표현도 요구사항**: 문구만 추출하여 맞추면 완료가 아닙니다. 기획의 불릿·번호·항목 경계·순서·강조·링크 여부와 각 문장의 역할을 함께 매핑합니다. “고객님의 안전한 금융거래를 위해 고객님의 정보를 1년 또는 3년마다 재확인하고 있어요.”와 “영업점 방문 전 간편하게 등록해주세요.”는 각각 최신 라이브러리의 실제 `TextList / Unordered(size: 16)` 인스턴스로 배치합니다. 일반 Text나 문자열 앞에 직접 입력한 불릿으로 대신하지 않습니다. 기존 인포박스 단일 항목의 불릿 생략 예외를 인포박스 밖 일반 본문에 적용하지 않습니다.
- **실제 복합 계층**: `## BODY > Container 1` 안에 `StepIndicator`와 `Title / Contents`를 함께 배치합니다. `Title / Contents`의 자식은 `Title / Page`와 `TextList Group / Button Area`이며, 후자의 자식은 실제 복수 TextList를 묶은 `TextList Group`과 `Button Area`입니다. 알려드립니다는 BODY의 형제 `Container 2`로 분리합니다. 불릿 두 개를 Text Group으로 만들거나, Step·제목/본문을 임의로 독립 Container들로 분할하지 않습니다. 자식 구성을 바꾼 뒤 영향을 받는 부모 명칭도 재판정합니다.
- **계층별 간격·폭**: BODY는 padding0/0/32/0, gap32px(`spacing/5xl`)입니다. Container 1은 전폭·padding0·gap24px(`spacing/3xl`)이며, StepIndicator → Title / Contents 사이24px를 적용합니다. Title / Contents는 좌우padding20px·gap24px이고 내부 콘텐츠 폭은350px입니다. 이 패턴의 TextList Group 내부 두 항목 사이는12px(`spacing/lg`), TextList Group → Button Area 사이는12px입니다. Container 1 → 알려드립니다 Container 2 사이는32px이며 BODY 전체에24px를 넣어 이 구간까지 줄이지 않습니다. 각 부모의 실제 itemSpacing·padding과 실질 경계를 대조합니다.
- **제목의 실제 스타일·줄바꿈**: Title / Page라는 이름이나 component key 일치만으로 통과하지 않습니다. 이 승인 화면의 제목은 KBFG Text Medium22px·행간31px, 원본 Text Style key `a4d970f16ce5404c28e6e948667b88b96aa5cbec` 기준입니다. “부모님의 고객확인(CDD/EDD)정보를” 뒤에서 줄바꿈하여 “등록해주세요”를 두 번째 줄에 배치합니다. 최신 라이브러리의 대응 Text Style·변수 연결로 매핑하고 fontSize/fontWeight 직접 덮어쓰기로 외형만 맞추지 않습니다. 승인본의 제목을 임의24px로 바꾸거나 “정보를” 앞에서 개행하지 않습니다. 이22px 지정을 모든 Title / Page에 일괄 적용하지 않습니다.
- **바로가기 공개 옵션**: 이 패턴의 “고객확인제도(CDD/EDD) 바로가기”는 우측 정렬의 실제 `TextButton(variant: primary, size: xsmall, underline: false, hasPrefix: false, hasSuffix: true)`와 우측 chevron을 사용합니다. 본문 독립 서비스 버튼의 일반 secondary/small 규칙보다 이 사용자 지정 예외가 우선합니다. 승인본 텍스트는12px Medium이며 버튼과 Label 문구는 Hug를 유지합니다. size 이름이나 화면상 색상만 추정하지 않고 실제 componentProperties와 텍스트 스타일을 확인합니다.
- **알려드립니다·푸터 옵션**: 알려드립니다는 기존 전폭10px Divider + Accordion(hasDivider:false, expanded:true), TextList14·항목gap8px 구조를 유지합니다. 승인본의 정보 Prefix는20px이며 임의24px로 확대하지 않습니다. 하단은 `StickyButton(variant: elevated, hasScrollDim: false)` + HomeIndicator로 구성합니다. white 원형의 기본 ScrollDim28px를 남겨 푸터 높이126px로 만들지 않습니다. 이 패턴의 StickyButton64px + HomeIndicator34px = FOOTER98px를 대조하고 HomeIndicator의 배경 Fill 노출·원형 높이·AUTO 및 CTA Label Hug를 보존합니다.
- **완료 판정 강화**: 제작 전 `기획 노드의 표현/역할 → 승인 근거 → 요구 속성 → 실제 결과 노드`를 대응시키고, 제작 후 ① 두 불릿 원문·개수·컴포넌트, ② 복합 부모/자식 구조·명칭, ③ 24/12/32px의 적용 계층·실측·토큰, ④ 제목 크기/굵기/스타일/변수·줄바꿈, ⑤ TextButton variant/size/밑줄/아이콘·Hug, ⑥ StickyButton variant/ScrollDim·푸터 높이·HomeIndicator Fill을 승인본과 직접 대조합니다. placeholder 없음·텍스트 일치·같은 key·전체 스크린샷 중 일부만 검사하고 “검수 완료”로 보고하지 않습니다. 불일치는 수정 후 해당 범위와 부모를 재검사합니다. 기본 제작 스크립트·캐시의 값은 이번 요구값과 다르면 교정하며, 3분 목표를 위해 이 대조를 생략하지 않습니다.
- 이번 변경은 공유 MD의 제작·검수 기준 갱신입니다. MD 갱신만으로 기존 Figma 화면을 수정했다고 보고하지 않습니다.

## 단순 서비스 진입 링크 목록의 Card 매핑 (2026-10-30 사용자 확정)

- **적용 조건·우선순위**: [기획 5749:143981](https://www.figma.com/design/cLQlbxcEeZPBxBFz9c1rJk/?node-id=5749-143981)처럼 서비스명과 이동 화살표를 세로로 나열하고 각 항목이 해당 서비스·조회 화면으로 진입하는 단순 링크 목록은 [승인 화면 598:30627](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=598-30627)의 **`Card / Surface` 패턴**을 적용합니다. 이 유형을 일반 버튼형 선택지로 해석해 GridButton으로 바꾸거나, List·BoxButton·수동 프레임으로 외형만 만들지 않습니다. 인라인 링크·일반 메뉴 List 전체에 확대하지 않으며, 선택 바텀시트·은행/증권사 선택·라디오 Card 등 별도 전용 패턴도 유지합니다.
- **컴포넌트·옵션**: 지정 최신 라이브러리의 실제 `Card / Surface`를 새 인스턴스로 가져옵니다. 승인 사례의 공개 속성은 **`type: outline`, `variant: select`, `select: false`, `disabled: false`**입니다. 개별 기획의 비활성·상태가 있으면 그 값을 우선하며, 이동 링크라는 이유로 radio/check 상태를 추가하지 않습니다. 현재 참조의 원형 key `87e4f7ed5b778f83141856fd287deba5faa31b66`은 탐색 근거이며 이후 최신 원형 확인을 대신하지 않습니다.
- **Slot 내부 구조**: `Card / Surface > Slot > Body`를 사용합니다. `Body`는 Horizontal / 가로 Fill·세로 Hug / gap12px(`spacing/lg`) / 좌측·세로 가운데 정렬이며, 직계 자식은 `Logo`·`Groups`·`Card / Header / Affix`입니다. `Logo > Card / Body / Logo(variant: bgIcon)`는 승인 사례의 48px 원형 영역을 유지하고, `Groups > Group > Card / Body / Group-A(variant: title, size: 16)`에 항목명을 넣습니다. Groups는 가로 Fill·세로 Hug로 남은 폭을 사용합니다. 우측 Affix는 **`variant: pageIndicator` / 24px 원형 / visible true / AUTO**로 Body 안에 배치하며, 숨겨진 Absolute Affix를 중복 노출하지 않습니다.
- **내용·심볼**: 문구·항목 수·순서·이동 목적은 해당 기획대로 유지합니다. 승인 예시는 ‘은행에 서류 제출’의 `style-bankbook-won`, ‘제출 내역 조회’의 `style-phone-check`입니다. 이 두 심볼과 문구를 다른 서비스에 그대로 복사하지 않고, 기획·승인 맥락에 맞는 최신 라이브러리 원본 심볼을 연결합니다. 임의 그림이나 기본 ICON 더미로 대신하지 않습니다. 하위 컴포넌트의 서체·색상·변수·내부 Hug와 공개 옵션을 보존합니다.
- **그룹·간격**: 복수 카드는 실제 Vertical Auto Layout **`Card Group`**, 내부 반복 항목명은 모두 **`Card / Surface`**로 유지합니다. **카드 사이 gap12px(`spacing/lg`), Title / Page → Card Group gap24px(`spacing/3xl`)**를 적용합니다. 카드 자체 padding20px(`spacing/2xl`)와 내부 Body gap12px를 외부 간격과 구분합니다. 단일 페이지 컨테이너는 `Container`, 복수는 기존 순번 규칙을 따릅니다. 콘텐츠 폭에 맞게 Card Group·Card를 가로 Fill·세로 Hug로 배치하고 승인 사례의 실측350×88px를 모든 항목의 고정 폭·높이로 강제하지 않습니다.
- **완료 검수**: 서비스 진입 링크 역할, 실제 Card / Surface와 위 공개 속성, Slot/Body의 Logo·Groups·pageIndicator 구조 및 AUTO, 원문·심볼·순서, 실제 Card Group과 부모 명칭, 12px/24px 계층별 간격·토큰, 서체/변수·Hug/Fill·편집 옵션의 원본 동작을 대조합니다. 승인 화면은 현재 Card 패턴이며 과거 GridButton 제작 기록을 근거로 되돌리지 않습니다. 이번 MD 업데이트만으로 기존 Figma 화면을 수정했다고 보고하지 않습니다.

## 본문 서비스 바로가기 TextButton의 우측 배치 (2026-10-29 사용자 교정)

- **‘KB스타클럽 서비스 바로가기’처럼 본문 안내·설명 아래 별도 `Button Area`에 배치하는 서비스 바로가기·보조 TextButton은 우측 정렬, `variant: secondary`, `size: small`을 적용합니다.** 기획서가 좌측 정렬로 표현되어 있어도 이 사용자 확정 배치 기준을 우선합니다. 승인 적용 화면은 [KB스타클럽 등급 3411:3607](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3411-3607)입니다.
- `Button Area`는 가로 Fill·세로 Hug·gap0으로 만들고 실제 오른쪽 끝에 버튼을 배치합니다. Vertical Auto Layout이면 `counterAxisAlignItems: MAX`, Horizontal이면 `primaryAxisAlignItems: MAX`로 가로 우측 정렬하며 교차 축은 가운데 정렬합니다. 버튼은 가로·세로 Hug, Label 안 버튼명은 WIDTH_AND_HEIGHT·가로 Hug를 유지하고 좌표·고정 폭·빈 프레임으로 우측 정렬을 대신하지 않습니다.
- 최신 라이브러리의 실제 TextButton 인스턴스와 공개 variant/size를 사용합니다. 문구·이동 목적과 기획에 있는 우측 화살표는 보존하고, Prefix·Suffix·밑줄·아이콘은 해당 기획과 원형 용도에 맞춥니다. 별도 사용자 지정 예외가 없는 이 유형의 이전 xsmall 지정은 small로 변경하며 버튼 크기 변경만을 이유로 기존 외부 간격을 바꾸지 않습니다. 단, 고객확인 등록 승인 화면 `3478:41680`은 최신 교정 절의 primary/xsmall·밑줄 비노출 예외를 우선합니다. Infobox / Card 등 다른 컴포넌트에 내장된 전용 버튼 영역과 독립 CTA·AppBar·인라인 링크에는 이 본문 독립 버튼 규칙을 일괄 적용하지 않습니다.
- 완료 검수에서 실제 variant가 secondary·size가 small인지, Button Area 오른쪽 경계와 버튼 오른쪽 경계가 일치하는지, 부모 명칭·문구·화살표·Hug·자연 너비 및 원본 연결을 확인합니다.

## Infobox 후속 Tab은 2depth (2026-10-29 사용자 교정)

- **Infobox 다음에 Tab이 배치되는 화면은 `Tab`의 `variant: 2depth`를 사용합니다.** `Infobox / FullWidth` 다음에 항목 탐색 탭이 이어지는 금융거래종합보고서 화면도 이 기준에 해당합니다. 승인 적용 화면은 [KB스타클럽 등급 3411:3607](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3411-3607)입니다.
- 최신 라이브러리의 실제 2depth Tab 원형을 import하고, 내부 `Item / Tab`도 실제 2depth로 연결된 기본 구성을 사용합니다. 이전 1depth Slot 항목을 그대로 옮겨 외곽 variant만 바꾸는 방식은 피합니다. 항목 문구·개수·기획의 선택 상태·탐색 순서와 필요한 extendable 설정은 유지하며, 공개 옵션·원본 연결을 보존합니다.
- Infobox 다음 탭의 외부 간격과 Tab 다음 일반 콘텐츠 간격은 각각 기존 **24px(`spacing/3xl`)**를 유지합니다. Tab은 가로 Fill이며 2depth 원형의 내부 패딩·간격·서체·선택/비선택 스타일을 사용합니다. 1depth의 밑줄이나 색상·내부 레이아웃을 override로 남기지 않습니다.
- 완료 검수에서 실제 앞선 형제가 Infobox인지, 외곽 Tab과 하위 Item / Tab의 variant가 모두 2depth인지, 항목·선택 상태·24px 간격과 부모 레이어명이 실제 구조에 맞는지 확인합니다. 이 규칙은 Infobox 뒤에 오는 탭의 판정 기준이며 다른 화면의 탭 유형은 해당 기획과 별도 사용자 규칙을 따릅니다.

## 숫자 전용 대표전화의 Pretendard 필수 적용 (2026-10-29 사용자 교정)

- **대표전화·전화번호가 숫자와 번호 구분 기호만으로 이루어진 독립 Text이면 반드시 `Pretendard`를 적용합니다.** 예: `1588-9999`, `1588-9999, 1599-9999, 1644-9999`. 하이픈(`-`)·쉼표(`,`)·공백·전화번호 표기용 괄호·국가번호의 `+`는 숫자 서식의 일부이며 문자·숫자 혼용으로 판정하는 근거가 아닙니다.
- 종전 **‘Dialog 대표전화는 KBFG Text를 우선한다’는 예외는 삭제**합니다. 참고 화면의 KBFG 서체를 복제하거나 대표전화라는 역할을 근거로 이 숫자 규칙을 우회하지 않습니다. 대표전화 제목은 별도 문자 Text이므로 KBFG Text를 유지하며, 숫자만 있는 번호 Text는 Pretendard로 각각 판정합니다.
- `대표전화 1588-9999`처럼 문자와 숫자가 실제 하나의 Text에 섞인 경우는 기존 원칙대로 전체 KBFG Text입니다. Pretendard 적용을 위해 혼용 Text를 임의로 분할하지 않습니다. 이미 제목·번호가 분리된 구조를 하나의 혼용 Text로 합쳐 숫자 서체 적용을 피하지 않습니다.
- 최신 라이브러리에서 해당 숫자 역할·크기·굵기에 대응하는 Text Style·fontFamily 변수를 사용합니다. **대표전화 번호 Text의 색상은 `text/neutral/primary` 변수를 연결합니다.** 종전 secondary 지시는 이 최신 기준으로 변경합니다. 번호의 크기·행간·자간·밑줄·원문·자연 줄바꿈·Hug/Fill과 `Title / Text` 구조, 8px/16px/4px/20px 간격 및 컴포넌트 연결은 보존합니다. Pretendard Variable이나 다른 서체로 임의 대체하지 않습니다.
- 완료 검수에서 실제 번호 Text의 **font family가 `Pretendard`인지**, 숫자용 스타일·변수 연결과 하이픈·쉼표가 있는 번호 전체에 동일하게 적용됐는지 확인합니다. KBFG로 남아 있으면 실패입니다. 이 MD 갱신만으로 기존 Figma 화면을 수정했다고 보고하지 않습니다.

## 더보기 간격·Dialog 문장부호 최종 기준 (2026-10-29 사용자 변경)

- **상위 목록 그룹 → 더보기 `Button Area` 간격은 항상 20px(`spacing/2xl`)**입니다. `Card Group / Button Area`, `Data Block Group / Button Area` 및 같은 역할의 목록·더보기 조합에 적용하며, 실제 두 형제 블록을 감싸는 Auto Layout의 gap에 연결합니다. 더보기는 `Button Area > Pagination / Basic` 등 원형 구조를 유지하고, 목록 내부 항목 간격이나 더보기 컴포넌트 자체의 패딩으로 20px를 대체·중복 가산하지 않습니다. 지정 화면 `2484:33969`의 `Card Group / Button Area`(`2484:33982`)도 이 기준을 적용합니다.
- **Dialog Title의 마침표는 기획 원문 그대로 유지합니다.** Title 단독인지 Title·Description 조합인지에 따라 마침표를 자동 추가하거나 제거하던 종전 공통 규정은 삭제합니다. 기획에 마침표가 있으면 유지하고 없으면 추가하지 않으며, Description 노출을 바꾸어도 제목의 문장부호를 별도로 정규화하지 않습니다. 문구·숫자의 소수점·기타 문장부호도 원문과 대조합니다.
- 완료 검수에서는 목록 하단 → 더보기 영역 상단의 실제 20px 및 토큰 연결, 실제 자식 구성에 맞는 부모 명칭, Dialog 원문과 마침표 일치를 확인합니다. 원형 컴포넌트·서체 변수·공개 옵션·HomeIndicator의 Dialog Fill 숨김 규칙은 유지합니다.

## 뱃지·라벨 용도별 선택 기준 (2026-10-29 사용자 재정의)

**기획의 정보 역할을 먼저 판정한 뒤 최신 라이브러리의 실제 `Badge / Default` 또는 `Label / Default`를 선택합니다.** 짧은 문구를 둘러싼 외형이나 ‘뱃지’라는 통칭만 보고 두 컴포넌트를 혼용하지 않습니다. 아래 6개 Usage와 [승인 적용 화면 3386:36770](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3386-36770)을 이후 화면 제작의 기준으로 사용합니다. 종전 포괄 참조 `6261:123851`보다 이번 개별 용도 정의와 사용자 지정 사례를 우선합니다.

| 정보 역할·참조 | 실제 컴포넌트·variant | tone·문구 적용 기준 |
|---|---|---|
| [위험도 6261:129012](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=6261-129012) | `Label / Default`, `solid` | 고위험 red·중위험 celery·저위험 cyan. 세분화 예시는 매우높은위험 red·높은위험 orange·다소높은위험 yellow·보통위험 celery·낮은위험 cyan·매우낮은위험/초저위험 blue. 단계 체계·문구는 해당 기획을 따르며 없는 단계를 만들지 않습니다. |
| [가입조건 6261:128988](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=6261-128988) | `Label / Default`, `tint` | 안정추구형 이상 가입 cyan·안정형 이상 가입 blue·위험중립형 이상 가입 green·적극투자형 이상 가입 orange·공격투자형만 가입 red. 청약철회기간 미적용·청약철회제외 신청시에만 가능은 darkGray입니다. |
| [펀드 내 구분 6261:130820](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=6261-130820) | `Badge / Default`, `character` | NEW red 또는 redTint, 추천 blue 또는 blueTint, 투자상품·외화펀드·역외펀드 brandAltMuted. 두 tone 예시가 있는 경우 해당 기획·승인 사용 맥락에 맞추고 단어만으로 임의의 다른 색을 만들지 않습니다. |
| [상품 카테고리 6261:130167](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=6261-130167) | `Label / Default`, `line` | 입출금 blue·예금/적금 green·청약 orange·대출 red·펀드/신탁/ISA indigo·퇴직연금 seaform·보험 cyan·외화예금 olive·골드/실버 yellow. `seaform`은 라이브러리의 실제 공개 tone 이름을 사용합니다. |
| [상품유형·그 외 6261:129317](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=6261-129317) | `Label / Default`, `tint`, `darkGray` | 투자상품 상단의 계열사·ETF_주식형·적립식·채권혼합·채권·재간접·실물·기타·TDF·주식형·주식혼합형·채권혼합형·MMF 등. ‘1년제’는 퇴직연금 운용상품 미리보기의 원리금보장형, KB라이프생명·보험차익비과세는 보험상품 하단, ‘2025.09.05 까지’는 ISA 상품바구니 유효기간 예시입니다. 제한된 사용 맥락을 다른 화면에 일괄 확대하지 않습니다. |
| [상품 테마 6261:130427](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=6261-130427) | `Label / Default`, `tint`, `darkGray` | 국내 지수 추종형·해외 지수 추종형·주식테마형·주식 섹터형·채권 혼합형·기타 등 테마를 표시합니다. 예시 문구를 신규 화면에 임의 추가하지 않습니다. |

### 승인 수신거래현황 화면의 적용

- [3386:36770](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3386-36770)의 계좌 분류는 **입출금 `Label / Default(line, blue)`, 적립식 `Label / Default(line, green)`**입니다. 이 화면의 ‘적립식’은 수신계좌 분류로 사용자 승인된 line/green 사례이며, 투자상품 상단의 상품유형 ‘적립식’ tint/darkGray와 구분합니다. 같은 단어라도 실제 정보 역할과 승인 맥락을 먼저 확인합니다.
- Data Block 안에서 라벨은 `Label` Auto Layout으로 묶고 계좌 제목·데이터보다 위에 배치합니다. 승인 구조는 `Data Block > Label > Label / Default`, 그다음 `Title / DataList Group`, 필요한 경우 `Card / Footer / Accordian`입니다. **이 Data Block의 직계 블록 사이 gap은 16px(`spacing/xl`), Label 래퍼 내부 gap은 0**입니다. 라벨을 DataList의 Label Text나 계좌 제목으로 합치지 않습니다.
- 가로 Hug와 원형 높이·서체·내부 패딩·라운드·색상 변수 및 공개 variant/tone 연결을 유지합니다. 조회한 Label 사례의 원형 높이는 20px이며, 이 실측을 다른 Badge 유형 전체의 고정 높이로 강제하지 않습니다. 47px 등 현재 문구의 실측 너비를 고정값으로 복제하지 않습니다.
- 반복 항목은 실제로 묶고 복수 Label은 `Label Group`, 복수 Badge는 `Badge Group`으로 명명합니다. 단일 라벨을 정렬하기 위한 래퍼는 `Label`이며, 구조 변경 후 상위 복합 명칭도 재검사합니다. 라벨이 추가되었다는 이유만으로 액션 없는 Data Block을 Card로 바꾸지 않습니다.

### 공통 제작·검수

- 기획·사용자 지시의 배지/라벨 문구·개수·노출·의미를 보존하고, 위 역할에 맞는 최신 라이브러리 원형을 import합니다. 일반 Text·수제 도형·임의 컬러 문구로 대체하거나 주변 화면의 변형 인스턴스를 복제하지 않습니다. 상태 표시 등 이번 표 밖의 용도는 해당 기획과 별도 사용자 승인 기준을 따릅니다. 기존 제출현황의 처리중 Badge(character/blueTint)·처리완료 Badge(character/brandAltMuted)는 해당 업무 승인 사례이며 모든 상태에 고정 적용하는 규칙이 아닙니다.
- 공개 `variant`·`tone`으로 설정하고 원본 서체·토큰·자연 너비를 보존합니다. detach, 고정 폭, 내부 색상·스타일 override로 우측 프로퍼티 패널의 타입 전환을 막지 않습니다. Dot·Number·Account 등 Badge의 다른 유형도 실제 의미가 기획에 있을 때 사용합니다.
- 완료 전에 **역할 → 실제 Badge/Label 컴포넌트 → variant/tone → 원문·노출 → 자연 너비·주변 간격 → 실제 그룹·부모 이름**을 함께 대조합니다. 변경한 공개 옵션의 원본 동작도 확인하고 불일치가 있으면 수정 후 해당 범위만 재검사합니다. 이 문서 업데이트는 승인 참조를 이후 제작 기준으로 명시하는 작업이며 기존 Figma 화면 전체를 수정했다는 의미는 아닙니다.

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
- **전화번호 (2026-10-29 교정)**: 숫자와 번호 구분 기호만 있는 번호 Text는 **Pretendard / 16px / line-height22px**, 색상 **`text/neutral/primary`**, 밑줄 없음으로 적용합니다. 굵기와 서체 연결은 해당 역할에 대응하는 최신 라이브러리 숫자용 Text Style·변수를 사용하며, KBFG Text 스타일(`Dynamic/Body/md∙16∙Bold`)을 번호의 기준으로 재사용하지 않습니다. 하이픈·쉼표·공백은 숫자 서식이므로 Pretendard 판정을 바꾸지 않습니다. 대표전화에 KBFG를 우선하던 예외는 삭제하며, 번호를 이유로 링크·전화 연결 동작을 임의 추가하지 않습니다.
- **크기 모드·주변 영역**: 두 블록과 Text 래퍼는 가로 Fill·세로 Hug, 번호 Text는 가로 Fill·내용에 따른 높이 및 자연스러운 줄바꿈을 사용합니다. 참조의 280px 본문 폭에서 번호가 두 줄인 것을 고정 높이44px나 강제 개행으로 복제하지 않습니다. Dialog Slot → 별도 자세히보기 Accordion → ButtonGroup의 원형 관계와 간격은 유지합니다. 이 참조의 대표전화 블록 아래 Accordion과의 간격은 **20px(`spacing/2xl`)**이며 Dialog 제목·설명의 문장부호는 기획 원문을 따르고 HomeIndicator Fill 숨김 예외는 유지합니다. 참조의 다른 레이어 누락이나 문구를 규칙으로 상속하지 않습니다.
- **완료 검수**: 설명→대표전화16px, 제목→번호4px, 번호→후속 Accordion20px의 실질 간격과 토큰, Title / Element 인스턴스·옵션, 제목14 KBFG Medium/primary·번호16 Pretendard/primary의 숫자용 Text Style·변수, Fill/Hug·줄바꿈·실제 번호·부모 명칭을 확인합니다. 대표전화 문구를 설명에 이어 붙이거나 상단 설명 스타일을 번호에 그대로 사용하는 것은 실패입니다. 이번 요청은 MD 규칙 갱신이며 기존 Figma 화면의 일괄 수정 완료를 의미하지 않습니다.

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
- **제작 전 적용 규칙 확정 (2026-10-30 실행 강화)**: 제작을 시작하기 전에 이번 화면에 해당하는 MD 규칙·예외·승인 참조를 골라, 기획의 요구값 → 적용 규칙/참조 → 확인할 실제 결과 속성으로 연결합니다. 최신 사용자 지시와 역할별 예외를 먼저 판정하며, 읽었다는 사실이나 이전 대화 요약만으로 적용 완료로 간주하지 않습니다. 이 매핑은 작업 중 사용할 상태·제작 스크립트의 입력으로 유지하고 별도 보고서 작성은 요구하지 않습니다.
- **최신 원본은 묶음당 필요한 자산별 한 번 확인**: 지정 라이브러리의 현재 component key, 필요한 공개 속성·옵션, 실제 Slot과 편집 가능 범위, 하위 타입 전환, Text Style·variable key와 연결을 제작 전에 함께 확인합니다. 이번 묶음에서 직접 확인한 매핑·스타일·토큰은 여러 화면과 인스턴스에 재사용하고 같은 원본을 화면마다 다시 조회하지 않습니다. 새 작업 묶음, 원본 변경, 다른 파일/페이지 문맥, 새로 필요한 자산, 오류·불일치·누락이 있으면 해당 범위만 다시 확인합니다. 오래된 캐시나 주변 화면 복제를 최신 확인으로 대신하지 않습니다.
- **제작 중 승인 구성 보존 (2026-10-30 실행 강화)**: 컴포넌트는 최신 지정 라이브러리에서 가져오고, 사용자가 전체 구성을 재사용하도록 지정한 이미지·콘텐츠 자산은 승인 참조의 실제 구성까지 보존합니다. 더미이미지의 현재 승인 참조는 [Image Area 3478:12649](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=3478-12649)입니다. 그래픽·이미지 Fill/크롭, 편집 가능한 “더미이미지” 라벨, Pretendard SemiBold·원본 fontFamily 변수 alias, 크기·행간·색상·외곽선·위치·Absolute와 부모 패딩을 함께 재사용합니다. 같은 ImageContainer key를 썼다는 이유로 빈 기본 이미지나 임의 라벨 조합으로 대체하지 않습니다. 승인된 전체 이미지 자산 재사용은 일반 UI를 주변 화면의 override로 복제하는 근거로 확대하지 않습니다.
- **독립 조회·가져오기 묶기**: 기획·배치 위치·필요 원본처럼 서로 독립인 조회와 컴포넌트·스타일·토큰 import는 도구가 지원하는 범위에서 묶어 실행하고 모든 결과를 확인합니다. 필요한 노드·속성만 좁혀 읽고, 이미 읽은 공통 문서와 확인한 매핑의 전체 재조회·대량 출력·출력 잘림을 줄입니다. 의존하는 작업과 같은 노드를 수정하는 작업은 순차 실행합니다. 이 절은 별도 sub-agent 사용을 요구하지 않습니다.
- **검증된 스크립트에 데이터 매핑**: KBDS의 검증된 제작 스크립트·구조·상황별 검수 절차를 우선 재사용하고 현재 기획의 문구·항목 수·상태·위치만 매핑합니다. 같은 유형의 여러 화면은 복구 가능한 범위에서 한 제작 호출로 구성합니다. 컴포넌트는 확인한 최신 라이브러리에서 import한 새 인스턴스로 사용하며 원형의 variant·Slot·변수·Hug/Fill/Fixed 연결을 보존합니다. 캐시 재사용을 이유로 구형 화면의 override를 복제하지 않습니다.
- **기본 옵션을 제작 시점에 처리**: 기획의 제목·설명·optional·tooltip·prefix/suffix·아이콘·버튼 및 선택/비활성 상태를 제작 전에 결정하고 인스턴스 생성과 함께 반영합니다. 공개 속성을 우선 사용하며, 콘텐츠용 Slot에 독립 삽입된 더미·TooltipButton은 원형에서 허용한 Slot 편집 범위로 정리합니다. variant가 하위 타입을 자동 전환하는 연결은 끊지 않습니다. CTA Label 문구 Hug 등 원형 규칙을 유지하고, 변경할 Text의 현재 폰트를 먼저 불러오되 무관한 폰트 조회·설치·업로드는 반복하지 않습니다.
- **네 검사와 필수 검수를 제작에 결합**: ① 동일 항목의 실제 그룹핑과 `[명칭] Group`, ② Text·TextList 혼합의 각 그룹과 복합 부모 명칭, ③ 구조 변경 후 부모 이름, ④ 불일치 수정 후 해당 범위 재검사를 유지합니다. 제작 호출에서 변경 ID와 실제 구조·간격·서체·변수·Hug/Fill/Fixed·공개 옵션 및 필요한 상태 전환을 함께 확인합니다. 마지막에 각 완성 화면의 전체 스크린샷을 확인하며, 해당 화면의 수정 뒤에는 영향을 받은 화면만 다시 확인합니다. 통과 후 변경이 없으면 반복 검사·반복 캡처하지 않습니다. 공통 원형 확인 재사용과 개별 화면 시각 검수는 구분합니다.
- **완료 전 요구값과 실제 결과 대조 (2026-10-30 실행 강화)**: 위에서 확정한 매핑의 각 항목을 실제 산출물에서 확인합니다. 기획 문구·순서·케이스·상태, 레이어명·부모/자식 구조, 계층별 실측 gap/padding, 실제 그래픽·크롭·라벨, 서체 family뿐 아니라 역할별 크기·굵기·Text Style/variable key·연결, Hug/Fill/Fixed와 공개 variant·size·가시성·instance-swap의 원본 동작을 대조합니다. 같은 component key, 폰트 계열 또는 스크린샷 한 가지만 일치한 것은 전체 통과의 근거가 아닙니다. 승인 참조가 있는 부분은 참조와 산출물의 실제 속성 및 화면을 직접 비교합니다. 불일치는 수정 후 영향을 받은 범위·상위 부모·화면을 재검사하며, 미검사·불일치가 남아 있으면 정상 완료로 보고하지 않습니다.
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



## 라디오 선택형 Card 제작·검수 — 2026-10-28

1. 552:13664처럼 Card 설명과 라디오 선택이 결합된 유형인지 구분한다. 사용자 지정 Card 패턴은 Card / Surface와 Card / Header / Affix(radio)를 최신 라이브러리에서 가져오며 GridButton·일반 Radio·입력 폼 SelectButton으로 임의 대체하지 않는다.
2. Slot > Body를 Horizontal·Fill/Hug·gap12(spacing/lg)·MIN/MIN으로 구성하고 Groups(Fill/Hug) 다음에 Affix(24×24 Fixed)를 둔다. Affix의 원형 명칭과 variant radio를 유지하며 visible true·layoutPositioning AUTO로 설정한다.
3. 참조처럼 원형 직계의 기본 숨김 Affix는 숨겨 두고 Body에 실제 노출되는 Affix는1개만 둔다. Position 해제 여부를 속성으로 검사하며 좌표만 맞춘 Absolute 배치는 통과시키지 않는다.
4. Card select/disabled와 내부 Item / Radio checked/disabled/invalid를 기획에 맞추고 선택·미선택 모두 같은 Body 구조인지 확인한다. 문구·원형 서체·변수·컴포넌트 연결과 공개 옵션을 보존하며 최종 부모·가시성·노출 수·상태를 대조한다.

## 헤더 직후 전폭 컴포넌트·Data Block — 2026-10-28

승인 참조 bDKgQrkt0oHMJ1EbPUQTp8 / 3138:27761을 따른다. 헤더 밑 StepIndicator·Tab 등 전폭 컴포넌트가 있으면 BODY padding은 0/0/32/0, Container 1은 padding0·Fill이며 그 안의 컴포넌트도 화면 폭390px를 채운다. 후속 독립 콘텐츠는 형제 Container 2 이상에서 좌우20px를 적용해 콘텐츠350px를 유지한다. 직후 gap24px와 컴포넌트 자체 내부 패딩은 보존하고 외부 여백을 중복하지 않는다. 별도 확정된 Tab+Infobox 동일 Container 복합 패턴의 계층은 유지하면서 전폭과 콘텐츠 폭을 보장한다.

Data Block은 단일·복수 항목 모두 아웃라인으로 제작한다. Fill surface/neutral/quaternary-muted, Border border/neutral/secondary-muted + stroke/md, padding·radius20px를 적용한다. 종전 Data Block 회색 무테 재량은 대체하며 Text Box·Card의 별도 스타일 규칙은 유지한다. DataList Group gap12, 단일 DataList 직접 구조, 문구·숫자 서체·컴포넌트 연결은 보존한다. 최종 부모별 패딩·실제 폭·간격·네 변 stroke 토큰을 검수한다.

## Dialog 예외·지정 컴포넌트 확인 — 2026-10-28

HomeIndicator Fill 검수 전에 화면 유형을 판별한다. Dialog는 elevated Paint visible false, Dialog 외 화면은 true를 확인하고 레이어·내부 막대·변수 연결·원형 크기·배치는 보존한다. 발급정보 3142:17373·3142:17946의 언어·주민등록번호 표기 선택은 SelectButton word/single을 사용한다. 사용자 지정 컴포넌트를 기획 용어나 Slot 문제를 이유로 Radio로 임의 대체하지 않으며 문구·초기 선택·CTA 상태를 함께 검수한다.

## 오버레이 배경 제작·검수 — 2026-10-28

1. 기획에 보이는 뒤 화면과 실제 전경 BottomSheet/Dialog/입력 키패드를 구분한다. 배경은 루트 background/neutral/white + Dimmed만 구성하고 Popup·일반 화면·스크린샷을 복제하지 않는다.
2. 기존 작업본에 재현 배경 Popup·프레임·이미지·Fill/clip 래퍼가 있으면 배경 역할임을 확인한 뒤 제거한다. 숨김으로 남기지 않는다. 실제 전경 풀팝업·키패드/패턴 Popup까지 삭제하지 않는다. 전경 문구·컴포넌트·입력 상태는 보존한다.
3. 바텀시트의 Dimmed·StatusBar만 ABSOLUTE, BottomSheet·HomeIndicator·필요한 키패드는 AUTO로 유지하고 HomeIndicator elevated Fill을 노출한다. 최종 배경 재현 레이어 0개, Dimmed 뒤 이전 화면 비침 없음, 전경 잘림·겹침 없음을 검수한다.

## HomeIndicator Fill 제작·검수 — 2026-10-28

1. HomeIndicator의 background/neutral/elevated Paint와 변수 연결을 확인한다. 사용자 승인 참조는 bDKgQrkt0oHMJ1EbPUQTp8 / 49:21704다.
2. 먼저 Dialog 여부를 판별한다. Dialog는 해당 배경 Paint visible false, Dialog 외 화면은 visible true로 교정한다. 레이어와 내부 막대는 계속 노출한다. 원형이 숨김이어도 사용자 승인 규칙을 우선하고 라이브러리 원본은 수정하지 않는다. 변수·모드·색상·opacity·컴포넌트 연결·os iOS·내부 막대·원형 높이·AUTO는 보존한다.
3. 레이어 visible와 Fill visible를 구분하여 확인하고 토큰명·key 및 최종 하단 배경을 시각 검수한다. Dialog에서는 해당 Fill이 숨김인지 검사하며, Dialog 외 화면에서 Dimmed가 비쳐 보이거나 고정 흰색·추가 사각형으로 대신한 것은 통과시키지 않는다.

## 바텀시트 배치 제작·검수 — 2026-10-27

1. 바텀시트 화면 루트를 Vertical Auto Layout, 하단 정렬(MAX), gap·하단 padding 0으로 구성한다. Dimmed와 StatusBar만 화면 레벨 ABSOLUTE로 둔다.
2. BottomSheet와 HomeIndicator는 layoutPositioning AUTO, 가로 Fill로 배치한다. BottomSheet Hug 및 유형별 최소/고정 높이, HomeIndicator 원형 높이·iOS 속성을 보존한다. 문자 키패드가 있으면 BottomSheet → Keypad(Item / Pad) → HomeIndicator 순서 모두 AUTO로 두고 배경 Popup·Fill/clip 래퍼는 추가하지 않고 루트 배경과 Dimmed만 배치한다. 원형 내부 position은 일괄 변경하지 않는다.
3. 완료 전에 화면 레벨 ABSOLUTE 자식 목록이 Dimmed·StatusBar뿐인지 검사한다. BottomSheet·HomeIndicator·키패드가 AUTO인지, 두 컴포넌트 사이와 안전영역에 틈·겹침이 없는지 확인한다. 좌표만 같은 화면은 PASS가 아니며 실제 속성과 콘텐츠 높이 변경 시 흐름 배치를 검수한다.

## Popup 내부 레이어명 적용·검수 — 2026-10-27

Popup > Slot 내부 3단 영역은 `Header`, `Body`, `Footer`로 명명합니다. 약관 상세(PDF)·키패드·패턴·일반 풀팝업에 동일하게 적용합니다. 종전 `## HEADER`, `## BODY`, `## FOOTER`로 변경하라는 지시는 철회되었으며 해당 Popup 내부 영역은 원복합니다. 일반·완료 화면의 아트보드 직계 `## HEADER`, `## BODY`, `## FOOTER`는 유지합니다. 명칭 외 Slot 계층·컴포넌트 연결·공개 속성·Fill/Hug/Absolute·패딩·간격과 하위 `Title Area`, `body`는 보존합니다. 제작·수정 시 Popup 내부 영역에만 이름 매핑을 적용하고 최종 실제 3개 영역의 명칭·부모와 보존 속성을 대조합니다. MD 갱신과 기존 화면 수정 완료는 별도로 구분합니다.


## 문자·숫자 데이터 서체 적용·검수 — 2026-10-28

1. 의미상 데이터가 아니라 실제 Text 레이어 경계를 읽는다. 문자·숫자가 같은 Text에 섞이면 전체 KBFG Text, 실제 별도 Text로 분리되면 숫자 Text는 Pretendard·문자 Text는 KBFG Text로 계획한다. 혼용 Text의 숫자 구간만 서체를 바꾸거나 서체 적용을 위해 레이어를 임의 분할하지 않는다.
2. Table의 숫자 전용 셀은 Pretendard다. DataList는 데이터(값) Text가 숫자만이면 Pretendard, 문자·숫자 혼용이면 KBFG Text다. 항목명 Text와 별도 값 Text를 합쳐 혼용으로 판정하지 않는다. 숫자 서식의 구분자·소수점은 숫자와 같은 서체다.
3. 최신 라이브러리의 역할·크기·굵기에 맞는 Text Style·fontFamily 변수를 적용한다. 서체 로드 후 수정하고 크기·굵기·행간·자간·색상·Hug/Fill·인스턴스 연결·공개 옵션과 별도 승인 서체 예외는 유지한다. Pretendard Variable로 대체하지 않는다.
4. 최종 검수는 `123,000원`처럼 하나의 혼용 Text가 KBFG Text인지, 별도 `123,000`과 `원` Text가 Pretendard/KBFG Text인지 확인한다. Table 숫자 셀과 DataList 숫자 값·혼용 값의 실제 family·style/variable 연결도 대조하고 입력·variant 전환 후 내용을 다시 분류한다. MD 갱신만으로 기존 화면 수정을 완료했다고 보고하지 않는다.

## v0.95 약관 제작·검수 절차 — 2026-10-27

1. 약관 상세(PDF)인지 일반 약관 동의·BottomSheet·TextList 확인형인지 먼저 나눕니다. 원문§2.G와§4의 사용자 승인7개 참조를 현재 라이브러리에서 직접 조회합니다. Templates(작성중) 페이지에 있어도 이번에 지정된 참조는 적용합니다. 과거 제작본을 원형으로 복제하지 않습니다.
2. PDF 상세는31888:30615의 Popup을 import하고 Slot 안 3단 레이어명은 Header/Body/Footer로 유지하고, 이전에 ## HEADER/## BODY/## FOOTER로 변경한 경우 Header/Body/Footer로 원복합니다. StatusBar는 아트보드 직계Auto44px, Popup은Fill, Pagination은 아트보드 직계Absolute입니다. BODY·body Fill 및Footer Absolute를 유지하고 일반 화면3단 구조나 키패드의StatusBar Absolute 규칙을 덮어쓰지 않습니다. 라이브러리 원본은 수정하지 않습니다.
3. 약관 동의는31061:78124/78179/78292/78209 중 기획에 맞는 경우를 선택하고 ConsentGroup과 Item / Consent를 현재 원형에서 import합니다. 뎁스는1d·2d·3d-group·3d·4d-group·4d, 직접 설명은description, 부가 목록은textList로 매핑합니다. 구형 Consent solid/basic·Depth 프레임·수동 Outline Container는 새 구성에서 사용하지 않습니다. 실제 Slot/Slot-Depth-3/Slot-Depth-4/Slot-TextList 안에 항목을 배치하고 native Prefix/Suffix의 체크·라디오·화살표·가시성 연결을 유지합니다.
4. 일반 동의 BODY는padding24/20/32/20·gap24, 반복 ConsentGroup은gap12, 원형 내부 Slot은gap0·하단padding8을 대조합니다. 3d-group/4d-group의 들여쓰기32px와하단12px를 추가 래퍼로 중복하지 않습니다. GridContainer는3d의Vertical 또는4d의2열FLEX/행Hug/행·열gap0 분기를 기획에 맞게 사용합니다. 일반 Radio/Checkbox Group gap20은 이 원형 목록에 일괄 적용하지 않습니다.
5. BottomSheet는31061:78333을 기준으로Slot padding0/20/20/20·gap20, 안내문→ConsentGroup 목록(gap12), elevated StickyButton·외부HomeIndicator를 검수합니다. TextList 확인형은31061:78354를 기준으로Title/Section→TextListGroup gap16, size16목록 gap8, 별도ConsentFinal(outline)을 사용합니다. 그룹 하단textList variant의목록은size14입니다. 하위 항목이 있으면 Slot 첫 Divider 래퍼와 secondary/1px 선·하단12px를 반드시 유지하고 더미 제거 후 구조 누락을 검사합니다. 78151은 현재 1d 단일 항목이므로 하위 목록 유형과 구분합니다.
6. 문구·개수·순서·선택/미선택·펼침·hasSubLabel/hasSuffix를 적용하고 현재 라이브러리의실제 key·Slot 계층·변수·서체·크기 모드·공개 속성 전환을 대조합니다. 제목의과거22px 대신v0.95 Default24px Medium/행간34px 원형을 유지합니다. 긴 문구의줄바꿈과가독성을 검수하고 참조의고정 항목 수·높이를 강제하지 않습니다.

## 최신 라이브러리에서 직접 가져오는 제작 절차 — 2026-10-23

모든 컴포넌트에 적용합니다. 주변 화면·과거 제작본·기획안 인스턴스를 복제하여 원형으로 삼지 않습니다. 기획에서 문구·순서·상태·필수/선택·행동·유형을 추출한 뒤 지정 MO 라이브러리의 현재 component key·공개 속성·Slot 내용·Text Style key·variable key를 직접 확인하고, import한 원형의 새 인스턴스로 제작합니다. 캐시와 스크립트는 탐색·절차만 재사용합니다. 승인 예시의 구성·위계·간격과 직접 구성 박스 예외는 유지하되 컴포넌트의 취득 출처로 대신하지 않습니다.

Slot의 일반 Text까지 기획에서 복사하지 않습니다. Title / Page는 라이브러리의 Item / Label(page)과 원본 Medium 스타일·변수를 사용하며, 다른 컴포넌트는 각각의 원형 스타일을 따릅니다. 본문용 Fill/자동 높이/Hug 처리를 전체 인스턴스에 일괄 적용하지 않고 원형 모드를 보존합니다. 명시된 사용자 교정만 해당 범위에 적용합니다. 원본을 확인할 수 없거나 로컬 원형이 최신 정의와 다르면 주변 화면으로 우회하지 않고 확인되지 않은 부분을 알립니다.

최종 검수는 실제 인스턴스·Slot 계층·텍스트 구간 style/variable key·Hug/Fill/Fixed·문구/상태를 원본과 대조하고 화면 잘림·겹침을 확인합니다. 공개 variant·size·선택·가시성·instance-swap 전환을 보존하며, 원본이 지원하는 옵션의 검수 실패·미검증은 정상 완료로 처리하지 않습니다.

2026-10-23 반복 그룹 최종 검수: 같은 컴포넌트나 같은 역할·명칭의 레이어가2개 이상 연속 열거되는지 확인하고, 실제 [명칭] Group Auto Layout 아래 반복 항목이 모여 있는지 검사합니다. 이름만 Group으로 바꾸거나 Container에 직접 열거한 것은 통과시키지 않습니다. InputField는 gap24px, 기존 Container 페이지 패딩을 유지하며 단일 래퍼 Group 금지·반복 자식 원래 이름·별도 Container 번호 예외를 함께 대조합니다. 기준2182:19277은5개 InputField입니다.

## Infobox 버튼 구조 검수 (2026-10-23)

인포박스에 버튼이 있으면 hasButton true와 원형 Button Area를 먼저 사용합니다. Slot-Contents 안 버튼 개수0, 원형 Button Area가 Slot의 형제인지, 실제 TextButton secondary/xsmall·우측 line-chevron-right·Hug·문구 WIDTH_AND_HEIGHT인지 검사합니다. 라이브러리25386:80100의 Button Area 우측 정렬·padding-top4/gap12와 Slot gap8을 대조하고 기존 본문·목록·버튼명 및 제목/아이콘 노출 상태를 보존합니다. Slot 안에 별도 버튼 영역을 만들어 흉내 내지 않습니다.

## Feedback 후속 블록 간격 검수 (2026-10-23)

Feedback 다음에 별도 본문·설명·목록 등 콘텐츠 블록이 있으면 외부 간격을 spacing/6xl40px로 계획합니다. 기준2157:9320처럼 Container 1의 Feedback과 Container 2가 이어질 때 부모 BODY gap을40px로 설정하고 실제 Feedback 하단과 다음 콘텐츠 상단 사이40px를 검수합니다. 일반 BODY32px를 그대로 상속하지 않으며 래퍼 padding·빈 프레임으로 중복 여백을 만들지 않습니다. Feedback 내부 간격·BODY 상단·Chip → Feedback24px·후속 섹션 내부16px/반복 그룹24px는 별도로 보존합니다.

## 항목 스위치 크기 검수 (2026-10-23)

빠른 로그인처럼 항목에 스위치를 조합하는 경우 size: medium으로 계획합니다. 최종 실제 인스턴스의 공개 size 속성값이 medium인지 확인하고, 단순 너비·높이 override로 대신하지 않았는지 검사합니다. 기획의 on/off·disabled 상태와 항목 레이블·간격·서체·변수를 유지합니다. 사용자 기준은2347:15715입니다.

## 키패드·패턴 Popup 제작 및 제목 검수 (2026-10-23)

키패드·패턴 입력 화면이면 사용자 확정 Popup 예외로 분류합니다. 실제 Popup 원형의 Slot에 Header / Body / Footer를 구성하고 StatusBar는 최상단 Absolute로 유지합니다. AppBar는 sub / hasTitle true, Label > 타이틀은 연결된 이전 화면 AppBar의 실제 문구를 읽어 적용합니다. 기준2380:12952의 KB국민인증서 발급은 해당 흐름의 값이며 고정 기본값이 아닙니다. KB 로고 비노출·닫기 버튼·키패드 Body 상단24px·원형 컴포넌트 연결·폰트·변수·입력 상태와 최종 화면을 검수합니다. 이전 제목을 확인하지 못했으면 임의 추정하지 않습니다.

## 섹션 제목·반복 제목 목록 간격 검수 (2026-10-22)

Title / Section → 다음 콘텐츠 외부 gap16px, 반복 Title / TextList Group 사이 기본gap24px, TextList Group 내부 항목gap8px를 서로 다른 계층으로 계획·검수합니다. 부모가 Title / Contents라는 이름이어도 반복되는 제목·목록 그룹이면 그룹 사이24px를 적용합니다. 기준2153:8503의2153:8642·2153:8741은 spacing/xl16px, 2153:8641은 spacing/3xl24px로 검수하고 높이를 다시 계산합니다. 기존 제작본의8px·16px를 근거 확인 없이 상속하지 않습니다.

## 0. 필수 기본 자료 읽기

작업 묶음의 시작에 `docs/sources/designer-ui-rules.md` 최신 원문 전체를 한 번 읽고, `docs/designer-rules.md`와 `docs/design-rules.md`에서 해당 화면에 필요한 실행 규칙·측정 근거를 확인합니다. 같은 묶음에서 변경 없이 이미 확인한 공통 문서·중복 정의를 화면마다 다시 읽지 않습니다. 디자이너 문서의 일반/완료/바텀시트 구분, 이름, 구조, 상황별 간격·속성·텍스트 규칙을 계획의 기준으로 삼습니다. 자리표시자 URL은 사용하지 않으며, 원문에 명시된 실제 디자인 시스템 URL과 사용자 승인 Figma 예시는 조회 근거로 사용합니다. 실제 Figma 원본을 확인하는 절차는 그대로 유지합니다.

사용자가 정형 검증 보고서를 요청한 경우 `runs/<run-id>/designer-review.md`에 읽은 자료와 원문 해시를 기록하고 D01~D32 적용표를 작성합니다. 기본 제작에서는 적용 규칙과 실제 검사 근거를 제작 호출의 반환값·검수 결과로 확인하며 별도 적용표 파일을 만들지 않습니다. 파일 생성 전 입력이 없으면 해당 계획을 대기 상태로 설명하고 이번 작업의 가능한 분석을 진행합니다.

## 1. 입력과 범위

기획서와 산출물의 node-id 포함 URL을 파싱합니다. 페이지 URL이면 하위 화면 목록부터 읽고 화면 범위를 확정합니다. 라이브러리와 기획서는 수정하지 않습니다. 산출물 노드가 기획서의 하위인지도 Figma 계층에서 확인합니다. 현재 파일 키가 같은 두 URL도 자동으로 안전하다고 보지 않습니다.

`node src/cli.mjs init <run-id> <wireframe-url> <target-url>`로 작업 폴더를 만듭니다. 아직 URL이 없으면 사용 가능한 분석·정비를 진행하고, 실제 제작은 입력이 제공된 이후 시작합니다.

## 2. 원본 재조회와 기획 해석

`knowledge/registry.json` 및 `knowledge/templates.json`에서 후보를 찾고 이번 작업에 사용할 원본 노드·키·속성 정의를 다시 조회합니다. 캐시는 자동 갱신되지 않습니다. 원본과 다른 값은 이번 작업의 매핑을 교정합니다. 캐시 정비나 하네스 실행도 요청된 경우에만 해당 캐시와 계획 해시를 함께 갱신합니다. 같은 묶음에서 확인한 원본은 변경·불일치가 없으면 화면별로 반복 조회하지 않습니다. 잘린 JSON은 폐기하고 페이지 크기를 줄여 재조회합니다.

각 화면의 문구, 순서, 선택 상태, 필수/선택, 버튼, 오류·빈 상태, 이미지 영역, 보조 설명을 requirement로 만듭니다. 각각 기획서 sourceNodeId를 기록합니다. 기획서의 mainComponent key는 필요한 역할을 식별하는 단서로만 사용하고 지정 라이브러리의 현재 정의와 대조합니다. 실제 제작에는 현재 라이브러리에서 import한 원형의 새 인스턴스를 사용하며 기획의 기존 override는 복제하지 않습니다. 이름이 같거나 비슷한 모양만으로 매핑하지 않습니다. 사용된 원본 컴포넌트 정의가 변경됐다면 변경을 보고합니다.

화면 내부만 읽고 끝내지 않고 주변 기획 영역의 페이지 ID와 화면 명칭을 확인하여 해당 화면에 연결합니다. 실제 ID가 있으면 `실제페이지ID_화면명`(예: `F730_화면명`), ID가 공란이면 기존 `화면ID_화면명`을 유지합니다. ID 영역 미확인·연결 불명확은 공란과 구분하며 임의 ID를 추정하지 않습니다. 접두어는 `페이지 ID` 필드만 기준으로 하며 요구사항 ID·상위 프레임명·화면명·흐름 주석의 숫자나 약어를 추출하여 대신 쓰지 않습니다. `-`는 공란으로 처리하고 `F730`은 형식 예시입니다. 제작 전 계획과 최종 아트보드 이름이 이 분기를 따르는지 대조합니다.

상단 Feedback + 후속 데이터가 있는 완료 화면은 원문 완료 화면 절과 D18·D19를 별도로 적용합니다. BODY padding `40px 20px 32px` / gap 40px → Container 2의 반복 `Title / DataList Group` 사이 32px → 각 그룹의 `Title`↔`DataList Group` 사이 16px → Title 내부 및 DataList 목록 내부 각각 12px로 계획합니다. Title은 Vertical Auto Layout 안에 `Title / Element`와 `Divider / Horizontal(thickness:1px,variant:primary,length:full)`을 배치합니다. Container·하위 그룹 패딩 0, BODY 좌우 20px를 유지하며, 이 내부 Divider를 페이지 Full-Width 요소로 잘못 판정하지 않습니다. 승인 기준은 `2668:26353`이며 일반 화면·Empty State와 구분합니다.

2026-10-20 단일 항목 Data Block: 박스 안 라벨·값 쌍이 하나면 `KFlklMvGmg0MXGfAXvpprn / 1147:62`의 제공회사/KB국민은행 박스 `1148:3021`처럼 `Data Block > DataList(split,14,hasDivider:false)`로 직접 구성합니다. 단일 DataList에 Group을 추가하지 않고, 패딩·라운드 20 / 아웃라인(2026-10-28 최신 지시) / Label 좌측·Data 우측 정렬 / Fill·Hug를 검수합니다. 섹션 Title은 박스 밖 형제, gap 16px입니다. 복수 항목과 완료 화면의 별도 그룹 구조는 유지합니다.

박스마다 D28~D32를 적용합니다. 기존 Infobox에 해당하는지 먼저 확인하고, 그 밖에는 단순 서비스 진입 링크 목록을 `598:30627`의 `Card / Surface` 전용 패턴으로 먼저 구분합니다. 나머지 버튼형 선택지는 `GridButton`, 그 밖의 내부/전체 동작이 있으면 `Card / Surface`, 사실 데이터 표시이면 `Data Block`, 설명·안내·주의·상태 전달이면 `Text Box`로 구분합니다. 박스 밖의 형제 `Button Area`는 내부 동작으로 세지 않습니다. Data Block은 아웃라인을 적용하며 Text Box만 아웃라인 또는 회색 배경·무테 형태를 고릅니다. 아웃라인의 반복·중첩, 정보 위계·밀도·가독성을 보고 선택하며, 매번 사용자 승인을 요청하지 않습니다.

화면 제작에는 설치된 figma-use와 figma-generate-design 스킬을 적용합니다. 현재 프로젝트의 Code Connect가 없으면 없음으로 기록하고 지정 원본 라이브러리의 현재 정의를 직접 조회하거나 해당 라이브러리로 제한한 검색으로 키를 찾습니다. 기존 화면/기획서 인스턴스는 역할을 식별하는 단서일 뿐이며 컴포넌트 취득과 스타일·변수의 기준으로 삼지 않습니다.

## 3. 템플릿 선택과 측정

2026-10-22 Feedback 래퍼 적용 판별: 화면이 실제 데이터 없음(Empty State)인지 먼저 확인합니다. 원문 §5의 해당 Empty State 패턴에만 추가 Feedback 프레임·상하 24px 패딩을 계획하며, 일반 안내·발급불가·오류·완료 화면에 일괄 적용하지 않습니다. `2130:4205`처럼 일반 안내는 Container > 실제 Feedback 인스턴스로 구성합니다. 제거하는 래퍼가 좌우 여백도 맡았다면 BODY의 해당 좌우 패딩으로 옮겨 콘텐츠 폭을 보존합니다. 원형 내부와 BODY 상단 패딩은 별도 유지하며 사용자/기획의 명시 예외는 우선합니다.

2026-10-22 Feedback 문구 매핑: 기획의 핵심 결과·제한과 보조 설명·해결 방법·다음 행동을 구분합니다. 전자는 Feedback > Title+error_text > title, 후자는 같은 그룹의 Text에 매핑하고 hasSubText true로 노출합니다. `2130:4205`의 `1회용 신청번호가 없으면\n가까운 지점에 방문해서 신청해주세요.`는 Text입니다. 제목에 빈 줄을 넣어 합치거나 Feedback 밖 본문·csInfomation의 동명 Text로 대체하지 않습니다.

2026-10-22 이미지 후속 간격 계획: Image Area 또는 단독 ImageContainer 다음 콘텐츠와의 기본 외부 gap을 spacing/3xl=24px로 계획합니다. 별도 사용자 지시는 우선하며, 래퍼가 있으면 Image Area 바깥 경계부터 측정합니다. 내부 이미지와 래퍼 바깥에 각각 gap을 추가하지 않고 내부 패딩·이미지 크기·Title / Page → Image Area gap 0px는 유지합니다.

2026-10-22 키패드 화면 계획: 사용자 기준 `2071:3356`에 따라 `## BODY` 자체의 padding-top을 spacing/3xl=24px로 계획합니다. 키패드 템플릿에 다른 값이 있더라도 최신 24px 지시를 우선하고 Container padding-top·빈 프레임으로 대체하거나 중복하지 않습니다. Keypad 내부·BottomSheet Slot 및 HEADER·FOOTER, BODY의 나머지 속성은 해당 규칙을 유지합니다.

2026-10-21 강조 보존·Medium 매핑: 기획에 있는 강조 구간과 링크는 누락하지 않고 반영합니다. 본문 강조 굵기는 동일 텍스트 크기·계열의 Medium 스타일과 연결된 medium 변수로만 매핑하며 Bold·Semibold·크기 확대·고정 fontWeight로 대신하지 않습니다. 링크 굵기도 종전 Bold 대신 Medium을 적용합니다. 굵기·색상·밑줄·링크 유무를 각각 대조하여, 굵기만 강조된 구간에 다른 표현을 추가하지 않습니다. 기획에 없는 표현의 추가 금지와 기획에 있는 표현의 보존을 함께 지킵니다.

2026-10-21 간격·인라인 표현 계획: Infobox / Card 다음 콘텐츠의 외부 gap은 종류와 관계없이 spacing/3xl=24px로 계획합니다. 카드 내부 간격 및 카드 앞쪽 간격은 보존하며 종전 Card → TextList 12px를 재사용하지 않습니다. Radio Group과 Checkbox Group(CheckBox Group)의 반복 항목 gap은 spacing/2xl=20px이고 Grid 행·열도 모두 20px입니다. 개별 컴포넌트 내부·단일 CheckBox 래퍼 gap 0·Title / Element ↔ 그룹 gap 16px는 별도 유지합니다. 메뉴명·대괄호만으로 강조·링크를 추정하지 않고 기획 또는 사용자 지시의 명시 구간에만 적용합니다. 링크 판별과 링크 스타일 적용을 분리합니다.

2026-10-21 화면 유형과 루트 구조를 먼저 판별합니다. 일반 화면은 `2025:6834`처럼 아트보드 직계 `## HEADER` / `## BODY` / `## FOOTER`를 기본으로 계획하고, 기획의 페이지 형태 또는 사용자 명시 지시로 풀팝업임이 확인될 때만 Popup 템플릿을 선택합니다. iOS·인증/PIN·X 버튼·기존 제작본의 Popup 사용만으로 분류하지 않습니다. 사용자 교정 대상 `2027:732`를 일반 인증 화면의 복제 원형으로 재사용하지 않습니다. 템플릿을 복제하기 전에 예정 유형과 실제 루트 계층을 대조합니다.

2026-10-21 Chip 직후 간격: 다음 콘텐츠의 역할부터 판별합니다. Chip / Basic 다음이 Feedback 또는 Feedback 래퍼이면 부모 Auto Layout gap을 spacing/3xl = 24px로 계획하며 승인 기준 `2180:10209`의 최신 예외를 우선합니다. Data Block Group·목록·일반 본문 등 그 밖의 다음 콘텐츠는 spacing/md = 8px를 유지합니다. Chip 내부 패딩과 후속 그룹 내부 간격·패딩을 함께 바꾸거나 빈 프레임·중복 padding-top을 추가하지 않습니다.

2026-10-21 본문 역할 매핑: 인포박스 안내의 논리적 항목 수를 확인합니다. 한 항목이면 기존 TextList / Unordered가 있어도 불릿 없는 Text Auto Layout > Content로 계획하고, Infobox / Card의 14 Light / text/neutral/tertiary 및 원형 스타일·변수를 유지합니다. 복수 항목 및 인포박스 밖 일반 본문의 단일 TextList는 해당 불릿 규칙을 유지합니다. 설명·목록을 대표하는 본문 섹션 제목은 실제 Title / Section으로 매핑합니다. 기준은 `2158:10984`의 단일 인포박스 안내와 `2157:9320`의 재외국민이란?·재외국민 등록방법(1가지 선택)입니다.

2026-10-21 Chip·Data Block·빈 상태 계획: 가로 스와이프 기획이면 `2158:8074`의 Chip / Basic처럼 한 줄 Horizontal·NO_WRAP, extended false / hasControl false, 우측 화살표 비노출로 계획합니다. 항목을 모두 보이게 하려고 확장형·줄바꿈·작은 폰트·문구 생략으로 바꾸지 않습니다. 상단 회색 Infobox / Card와 솔리드 Data Block 배경이 반복·중첩되면 같은 기준의 아웃라인 Data Block(fill quaternary-muted / border secondary-muted / stroke/md / padding·radius 20)을 사용합니다. 데이터 없음 Feedback의 아이콘은 `2150:14233`의 status-nodata(key `3404f84bcb3791ea34d4eef41ad5735df48dfe24`)를 지정하며 status-noResult 돋보기로 대신하지 않습니다. 기존 역할·문구·간격·스타일·변수 및 Empty State 크기를 보존합니다.

2026-10-20 단일 컴포넌트 래퍼 명명 검수: Auto Layout을 만들었다는 이유만으로 Group을 붙이지 않습니다. 단일 InputField의 패딩·정렬·배치용 래퍼는 `2141:10091`처럼 `InputField > InputField`로 명명하고, 같은 컴포넌트가 복수로 반복될 때만 `InputField Group`을 사용합니다. Full-Width·일반 화면·바텀시트를 동일하게 검사합니다. 명칭만 수정할 때는 자식 ID·계층·레이아웃·크기·간격을 전후 비교하여 보존합니다.

2026-10-20 은행·증권사 선택 최종 기준: 이 유형을 발견하면 `zNwpdAWcBMOM5ExkiBUoGn / 2101:12453`의 전체 패턴을 우선 재사용합니다. BottomSheet 제목·닫기·스크롤 딤과 CTA 없는 StickyButton, Slot의 1depth 은행/증권사 Tab → secondary/grid GridButton 순서 / gap 24 / 하단 padding 20, GridButton 좌우 padding 20을 대조합니다. 내부 Grid는 3열 균등 FLEX / 행·열 gap 8 / 행 높이 Hug, Item / Vertical은 secondary / padding 16 / gap 12 / hasIcon true / hasSubLabel false / Fill·Fill, IconContainer는 36px 및 기관별 원본 심볼을 유지합니다. 참조의 6행·18개는 현재 목록의 결과이므로 기획의 기관명·순서·중복·상태에 맞춰 행 수를 조정합니다. 실제 Grid는 참조에서 Container 1이라는 레이어명을 사용하므로 이름만으로 Grid를 찾지 않고 layoutMode GRID를 확인합니다. Tab↔Grid 24px, 아이템 Label·문구 Hug, 스크롤 딤, 기관별 심볼과 원본 스타일·변수를 최종 검수합니다. 일반 선택형 primary/grid 예시는 이 유형에 적용하지 않습니다.

2026-10-20 CTA 제작·검수: 원본 BoxButton의 Label과 버튼명은 Hug·Hug / 텍스트 WIDTH_AND_HEIGHT를 상속합니다. 버튼명을 편집할 때 현재 폰트를 로드한 뒤 characters만 변경하며 크기·width·textAutoResize를 다시 지정하지 않습니다. 공통 본문 자동 높이/Fill 처리 대상에서 CTA 텍스트를 제외합니다. 기존 잘못된 크기 override를 제거할 때 다른 상태·아이콘·문구·스타일·변수 override는 보존합니다. 실제 Resizing과 크기 override 유무를 검사하며 계산된 폭 49px를 고정 스펙으로 복제하지 않습니다. CTA 바깥 Fill과 내부 Label/문구 Hug를 각각 대조합니다.

2026-10-20 은행·증권사 선택 제작·검수: `2109:3661`처럼 GridButton 내부 IconContainer에 기관별 원본 심볼을 instance-swap으로 연결합니다. MO 원본 F07. System Icon(`1:672`) > 04 로고(`18273:39357`)에서 기관명·기관 코드·key를 확인하고 은행은 logo/bg/bank/ 원본을 매핑합니다. 증권사는 해당 증권사의 원본 심볼을 확인합니다. 항목 순서·중복·Grid·선택 상태·IconContainer 원형 크기를 보존하며 기본 ICON, 공통 아이콘, 다른 기관 심볼이 남지 않았는지 구조와 화면을 함께 검수합니다. 도움말 목록의 작업자 아이콘 지정 예외를 이 유형에 적용하지 않습니다. 확인하지 못한 기관은 추정 대체하지 않습니다.

2026-10-20 선택형 버튼 UI: 신분증 종류 선택 등 버튼형 선택지는 실제 GridButton을 우선합니다. 승인 화면 `zNwpdAWcBMOM5ExkiBUoGn / 2074:1554`의 GridButton > Slot > Grid 구조를 재사용하고 Slot 내부 Grid의 행·열·아이템 수·순서를 기획에 맞게 조정합니다. 1행 2열은 현재 예시이며 모든 화면에 고정 적용하지 않습니다. native selected/disabled 상태·레이블·아이콘·변수 연결과 Grid 내부 배치를 검수하며, 일반 Card / Surface 선택 판정보다 이 규칙을 우선합니다. 셀렉트 바텀시트 List 등 별도 전용 규칙은 유지합니다.

2026-10-20 필수·선택 및 알려드립니다 교정: InputField 필수 항목은 Title / Element의 optional false / optional 래퍼 비노출을 검수합니다. 필수가 아닌 항목은 optional true / 기본 `(선택)` 문구와 색상·서체·스타일·변수를 원형 그대로 보존합니다. 기존 `(필수)` 및 강조색 재정의는 원형으로 복원합니다. 알려드립니다는 `zNwpdAWcBMOM5ExkiBUoGn / 2075:2064` 하단처럼 전용 Container(gap·padding 0, Full Width) > 외부 10px tertiary full Divider → basic/standard/medium Accordion(hasPrefix true, solid-info-circle, hasDivider false, expanded true)으로 하단 버튼 위에 배치합니다. 상단 본문과 간격 32px, 내부 TextList size 14 / Slot gap 8px를 확인하며 Accordion만 단독 배치하지 않습니다. 알려드립니다는 기획·원형의 접힘 기본값보다 사용자 확정 펼침 규칙을 우선하여 expanded true·본문 노출 상태로 완료하고, 검수 후 접힌 상태로 남기지 않습니다.

2026-10-20 TextButton 최종 교정: 인풋 조합 및 박스 아래에 별도 배치하는 TextButton은 `zNwpdAWcBMOM5ExkiBUoGn / 2025:7407`의 `2025:7417`처럼 variant secondary로 계획·제작·검수합니다. 종전 인풋 조합의 primary 지정은 철회합니다. 크기·간격·정렬은 각 승인 패턴을 유지하며, InputField 내부 버튼과 독립 CTA에는 일괄 적용하지 않습니다.

2026-10-21 항목 선택 바텀시트 기본 선택: 기획에 명시된 초기 선택 항목·선택할 항목의 순서를 먼저 확인합니다. 지정이 없으면 화면에서 위에서 두 번째 List를 기본 선택으로 계획하며, 안내 List도 노출 순서에 포함하고 재정렬하지 않습니다. 기준은 `2230:10109 / 2230:10111`입니다. 선택 List의 hasSuffix true와 Slot-Suffix > Item / Suffix의 variant checkMark를 공개 속성으로 적용하고, 일반 단일 선택의 나머지는 hasSuffix false로 둡니다. 기획에 복수 선택이 명시되면 해당 상태를 따릅니다. 검수 시 실제 체크마크 위치·원본 인스턴스·프로퍼티 패널 편집 연결과 체크 유무 모두 48px / Fixed인지 확인합니다. 계좌 선택 전용 패턴에도 같은 선택 우선순위를 적용합니다.

2026-10-20 승인 규칙: 체크마크로 선택 상태를 표시하는 셀렉트 바텀시트의 List는 체크마크 노출 여부와 관계없이 높이 48px / 세로 Fixed로 계획·제작·검수합니다. 비노출 상태의 원형 Hug 높이 46px를 그대로 사용하지 않으며, 선택 전후의 List 높이와 항목 위치가 동일한지 확인합니다. 도움말·이용 방법 선택 List의 별도 높이에는 일괄 적용하지 않습니다.

2026-10-19 승인 패턴: InputField 뒤 보조 이동 버튼은 `zNwpdAWcBMOM5ExkiBUoGn / 2025:6834`의 `InputField / Button Area`(gap 12px)와 우측 정렬 Button Area / TextButton secondary·small·suffix true·underline false를 매핑합니다. 도움말·이용 방법 선택 바텀시트는 `KFlklMvGmg0MXGfAXvpprn / 185:14891`의 테두리 없는 List 패턴을 적용하고, 목록 gap 0·List padding 12/0·기본 Item / Prefix(bgIcon)·Suffix pageIndicator를 확인합니다. 기획 본문이 있으면 Text로 보존하고 목록과 gap 16px로 배치합니다. 아이콘은 작업자가 직접 지정하므로 기본 인스턴스만 두며, 전체 Card 패턴이나 일반 선택 바텀시트의 gap 8px를 이 경우에 적용하지 않습니다. 상세 수치와 키는 원문 및 실측 디자인 규칙을 따릅니다.

2026-10-19 승인 규칙: 일반 콘텐츠의 Tab 직후는 실제 간격 24px(`spacing/3xl`)로 계획·검수합니다. Tab + Infobox / Card는 `## BODY > Container 1 > Tab, Infobox / Card`로 구성하고 두 컴포넌트를 Container 1의 직계 자식으로 둡니다. `Tab / Infobox` 아래에 별도 Container들을 넣는 구조는 금지합니다. 해당 Container 내부 gap 24px와 BODY의 다른 구간 기본 gap 32px를 구분하며, 다음 독립 본문 블록은 형제 Container 2부터 이어갑니다. 고객명~인증완료 등 건별 조회 내역은 와이어프레임의 평면 DataList Group·상하 Divider 대신 승인 참조 `0P0j17OPstNhC3LWjBdBGy / 4:979, 4:994`의 Data Block으로 치환합니다. 문구·값·순서·건수는 유지하고 기획에 없는 Title·툴팁·아이콘은 숨깁니다. 박스 padding·radius 20px, 내부 목록 및 반복 박스 gap 12px의 DS 토큰 연결을 검수합니다. 완료 화면 D18·D19와 특수 Feedback 규칙은 유지합니다.

화면 목적과 모드가 같은 후보를 선택하고 선택 근거를 기록합니다. 공통·안내·약관·선택·바텀시트를 구분합니다. `진행중`은 확정 규칙으로 간주하지 않습니다. 대상 템플릿의 실제 프레임을 스크린샷으로 확인합니다.

수집 스크립트를 생성하고 Figma MCP로 실행합니다.

```powershell
node src/cli.mjs collect 09eGMNTNnkE0CTxPdr7lnk 10552:10031 10638:16306 0 2 runs/task-001/collect.js
```

`use_figma`에 파일 내용을 code로 전달하고 fileKey와 `skillNames: "figma-use"`를 지정합니다. 응답을 `reference-000.json`으로 저장합니다. `nextOffset`이 null이 될 때까지 계속합니다. 출력 제한에 걸리면 limit을 줄입니다. 매 페이지는 한 번만 전환합니다. 독립 페이지 요청은 병렬 도구 호출이 가능하며 sub-agent는 필요하지 않습니다.

```powershell
node src/cli.mjs merge runs/task-001/reference.json runs/task-001/reference-000.json runs/task-001/reference-002.json
node src/cli.mjs hash runs/task-001/reference.json
```

위 merge 예시에는 실제로 수집한 모든 chunk 파일을 전달해야 합니다. 누락이 있으면 실패합니다. reference는 한 root의 완전한 트리입니다. 여러 화면은 화면별 계획/실행으로 분리합니다.

수집기는 레이아웃 수치, sizing, 모드, mainComponent key, componentProperties, override, 텍스트 구간별 스타일, variable alias/key를 보존합니다. 변수를 조회할 수 없으면 unresolved로 남깁니다. 전체 레지스트리 검색 결과가 개별 컴포넌트의 모든 속성 정의를 대신하지는 않습니다.

## 4. 계획과 제작 전 검사

`plan.json`을 채웁니다. `docs/plan-format.md`를 따릅니다. 계획 노드마다 requirementIds, referenceId, reason이 필요합니다. 실제 source 재조회 증거를 저장하고 `preflight`에 기록합니다. registry/reference 해시를 채웁니다. 부모가 자식보다 앞에 오도록 작성합니다.

reason에는 적용한 디자이너 규칙 ID도 기록합니다. 템플릿과 다른 명시 규칙은 적용값·이유·검수 근거를 확인하고, 보고서 요청 시 `designer-review.md`에도 차이를 남깁니다. 기존 CLI는 디자이너 규칙 전체를 구현하지 않았으며, root 이름·상황별 sizing·바텀시트 Absolute·인라인 링크 등에 지원 차이가 있습니다. `docs/designer-rules.md`의 지원 표를 확인한 후 사용할 제작 경로를 정합니다. 지원하지 않는 규칙을 생략하여 일반 컴파일러에 맞추지 않습니다.

박스 계획의 reason에는 역할, 내부/외부 동작의 경계, 참조 노드, 스타일 선택 이유와 토큰 key를 연결합니다. `Data Block` / `Text Box`는 기존 Auto Layout·DS 토큰·하위 컴포넌트로 구성하고, Card의 detach나 신규 라이브러리 컴포넌트 생성으로 대신하지 않습니다. 원문의 기본 Data Block gap 16px와 부모님 기본정보 승인 예시의 20px를 혼동하지 않습니다. Data Block은 아웃라인 fill/border/stroke 토큰을 명시합니다. Text Box만 아웃라인 또는 `surface/neutral/tertiary-muted` + 외곽 border 제거를 선택합니다.

```powershell
node src/cli.mjs plan runs/task-001/plan.json runs/task-001/reference.json
node src/cli.mjs build runs/task-001/plan.json runs/task-001/reference.json runs/task-001/build.js
```

검사 오류가 있으면 그 부분을 수정하기 전 제작하지 않습니다. 원본에 없는 간격·스타일을 추정하여 검사기를 통과시키지 않습니다. missing component/token/font는 명시적 오류입니다.

## 5. Figma 제작

산출물 파일에서 읽기 전용 preflight로 대상 페이지, 자식, 기존 디자인, 라이브러리 import 가능성, 폰트를 확인합니다. `build.js`는 스크립트 생성 결과이며 자동 실행되지 않습니다. MCP를 통해 지정한 산출물 fileKey에만 실행합니다.

컴파일러는 입력 템플릿의 레이아웃과 정확한 variant key를 보존하는 제한된 경로입니다. 신규 run root를 추가하고 같은 run 이름이 있으면 덮어쓰지 않고 중단합니다. 타깃 parent가 자동 레이아웃이면 배치는 해당 부모가 결정하므로 별도 확인합니다. 모드·폰트 import 실패 시 대체 서체를 쓰지 않습니다.

중첩 TEXT override, SLOT, 이미지 포함 인스턴스, 혼합 스타일, 절대 배치는 일반 컴파일러가 완전히 재현하지 못합니다. 이 경우 Codex가 실제 componentProperties/slot API와 원본을 읽고 범위가 한정된 전용 MCP 스크립트를 작성합니다. 인스턴스 분리 없이 공개 속성과 slot을 사용하고 동일한 receipt/수집/검증 계약을 적용합니다. 구현할 수 없으면 해당 화면을 BLOCKED로 보고합니다. 컴파일러의 검사를 무효화하여 우회하지 않습니다.

반환된 receipt를 저장합니다. 성공은 `BUILT_REQUIRES_REVIEW`이며 최종 PASS가 아닙니다. `PARTIAL_FAILURE`면 영향 ID를 먼저 읽고 부분 생성 상태를 확인합니다. 사용자가 기존 작업을 보존하도록 요청한 경우 그대로 지킵니다. 이번 run에서 만든 노드만 안전하게 복구하고 실패 이력을 남깁니다. 실패한 명령을 무조건 반복하거나 파일 전체를 초기화하지 않습니다.

## 6. 실제 결과 검증과 시각 검수

2026-10-22 일반 Feedback 구조 검수: 데이터 없음이 아닌 안내·발급불가·오류·완료 화면에 추가 Feedback 프레임·상하 24px 패딩이 남지 않았는지 확인합니다. Container의 직접 자식이 실제 Feedback 인스턴스인지 대조하고 제거 전후 문구·Title+error_text·hasSubText·Component Properties·폭·원형 간격·스타일·변수를 보존합니다. 좌우 여백을 옮긴 경우 BODY 패딩과 실제 콘텐츠 폭을 검수하며 BODY의 별도 상단 패딩까지 제거하지 않습니다.

2026-10-22 Feedback 제목/본문 검수: Title+error_text의 직계 title/Text에 각 문구가 정확히 분리돼 있는지, 보조 안내가 제목에도 중복되지 않는지, hasSubText true와 실제 Text 노출이 연결되는지 확인합니다. 각 원본 Text Style·변수·색상·간격을 유지하고 핵심 제목의 굵기·크기를 보조 안내에 복제하지 않습니다. csInfomation의 동명 Text를 잘못 수정하지 않았는지 및 줄바꿈·클리핑을 시각 검수합니다.

2026-10-22 키패드 화면 검수: `## BODY.paddingTop`이 24px이고 spacing/3xl 변수에 연결돼 있는지 확인합니다. 하위 Container의 중복 상단 패딩이나 빈 프레임이 추가되지 않았는지 확인하고, Keypad 원형 내부와 BottomSheet Slot 패딩을 BODY 값으로 잘못 변경하지 않았는지 대조합니다.

2026-10-21 강조 검수: 기획의 강조·링크 구간이 모두 반영됐는지와 임의 추가가 없는지를 함께 확인합니다. 강조 전후 텍스트 크기·계열이 동일하고 해당 구간의 Medium Text Style key·medium 변수 alias가 연결돼 있는지 검사합니다. 본문 강조가 Bold·Semibold·고정 fontWeight·크기 확대이면 FAIL입니다. 굵기만 있는 강조에는 색상·밑줄·링크를 추가하지 않으며, DS 제목·CTA의 원형 Weight는 별도로 보존합니다.

2026-10-21 간격·임의 강조 검수: Infobox / Card 바깥의 다음 콘텐츠 경계 간격이 24px인지 확인하고 카드 내부 gap과 합산하지 않습니다. Radio Group 및 Checkbox Group의 실제 항목 gap 20px와 Grid 행·열 20px를 확인하며 개별 원형 내부까지 변경하지 않습니다. 기획과 대조해 문장 구간별 Text Style·Weight·색상·밑줄·hyperlink 및 이동 동작을 검사합니다. 기획에 없는 메뉴명 강조·링크 외형이 있으면 FAIL이며, `[고객정보조회(개인정보열람)]`처럼 URL 없는 Bold·밑줄도 허용 근거가 되지 않습니다. 문서 반영과 실제 화면 수정 여부를 구분하여 보고합니다.

2026-10-21 D03 루트 계층 검수: 일반 화면의 실제 직계 자식이 `## HEADER`, `## BODY`, `## FOOTER`이고 모두 Vertical Auto Layout인지, StatusBar가 HEADER 안에 있는지 확인합니다. 일반 화면에 `Popup > Slot > Header / Body / Footer`가 남으면 외형이 같아도 FAIL입니다. 풀팝업은 제작 전에 확인한 명시 근거와 Popup 계층을 대조하며, 화면 유형 미확인을 Popup 사용 근거로 처리하지 않습니다. 문서 갱신과 실제 화면 구조 수정은 별도로 완료 보고합니다.

2026-10-21 Chip 후속 간격 검수: Chip / Basic 직후가 Feedback 또는 Feedback 래퍼이면 부모 itemSpacing이 24px / spacing/3xl인지, 그 밖의 Data Block Group·목록·일반 콘텐츠이면 8px / spacing/md인지 확인합니다. 외부 gap과 Chip 내부 패딩·Data Block Group 내부 박스 간격·Feedback 내부 패딩을 구분하며, 인접 구간에 종전 값이나 추가 여백이 중복되지 않았는지 검사합니다.

2026-10-21 인포박스·섹션 제목 검수: 단일 인포박스 안내에 불필요한 bullet/TextList가 남지 않았는지, 일반 Text > Content의 Fill·Hug와 Text Style·색상·변수 연결이 보존되는지 확인합니다. 본문 섹션 제목은 일반 Text의 Weight나 Frame 이름이 아닌 실제 Title / Section 인스턴스·mainComponent key·공개 속성으로 검수합니다. 기획에 없는 SubTitle·Description·아이콘·suffix는 원형 노출 속성을 사용하고, 뒤따르는 설명·목록의 역할과 기존 간격을 유지합니다.

2026-10-21 최종 피드백 검수: Chip은 속성값만 보지 말고 실제 한 줄·우측 ControlContainer/화살표 비노출·기획의 항목 순서/선택 상태를 화면과 구조에서 확인합니다. 프로토타입 스와이프를 완료 보고한다면 실제 가로 스크롤 설정과 동작도 확인하며, overflow NONE인 참조의 외형만으로 상호작용 PASS를 선언하지 않습니다. Infobox / Card와 연속되는 Data Block은 회색 솔리드 중첩 여부 및 적용한 아웃라인 fill·border·stroke 토큰을 확인합니다. 데이터 없음 Feedback은 실제 내부 status-nodata의 component key를 확인하고 돋보기·검색 아이콘이 아닌지 검수합니다. variant 편집 가능성 검수는 별도로 유지합니다.

2026-10-21 작업자 편집 완료 조건: 최종 인스턴스에 실제 문구·항목·상태를 넣은 뒤 우측 프로퍼티 패널에 공개된 variant·size·선택/비활성·가시성·instance-swap 등 해당 컴포넌트 옵션의 유효한 조합을 양방향 전환하여 검수합니다. 속성 값뿐 아니라 실제 내부 타입·시각 상태·배치·문구·상태·스타일·변수가 원본 규칙대로 바뀌는지 확인하고 원본이 의도한 상태 변화와 제작 오류를 구분합니다. 원본 인스턴스와 내부 연결을 보존하고 검수 후 기획 상태로 복원합니다. Slot/도구 제약으로 전환이 실패하면 해당 옵션과 영향을 명시하며 정상 완료로 처리하지 않습니다. 원본 미지원 동작은 보장하지 않습니다. 이 완료 조건은 Chip 외 모든 전달 컴포넌트에도 적용합니다.

2026-10-21 원본 동작 회귀 검수: 부모 variant가 내부 타입을 바꾸는 컴포넌트는 화면용 문구·항목 수·선택 상태를 모두 적용한 임시 인스턴스에서 실제 전환을 시험합니다. Chip은 single → multiple → single 및 사용하는 extended 상태를 왕복하고 내부 SolidChip/LineChip의 component key·문구·상태·서체·변수·배치를 비교합니다. 원본 무수정 대조군과 수정본을 구분하며, 실패 시 문구 변경·nested 속성·가시성·Slot 교체를 나눠 원인을 좁힙니다. 임시 검증 노드는 제거하고 실제 화면은 기획 상태를 보존합니다. 바깥 variant만 바뀌는 것은 PASS가 아니며, 기본 아이템 편집만으로 해결됐다고 추정하지 않습니다. 원본 라이브러리 수정 필요성은 별도 근거 없이 단정하지 않고, 화면 동작 실패는 문서 보완과 구분하여 남깁니다.

링크 리스트 화면은 제목·목록 래퍼 이름이 `Title / List Group`인지 확인합니다. 실제 List 인스턴스는 이름을 바꾸지 않습니다. Container 2 이상에서 래퍼 padding-top 24px 및 spacing/3xl alias, 내부 List Group gap 0px와 이전 gap 변수 해제를 각각 검수합니다. Title↔목록 gap 16px 및 Container 1의 기존 값은 유지합니다. 목록 gap 24px를 최종 규칙으로 오인하지 않습니다. 내용 높이를 다시 계산해 844px 내에서는 화면 Fixed 844 / BODY Fill, 초과하면 Hug를 적용하고 화면을 확인합니다.

PDF 약관 상세 검수는 최신 승인 원본09eGMNTNnkE0CTxPdr7lnk / 31888:30615와 원문§2.G를 기준으로 합니다. Popup과Slot 내부 Header/Body/Footer 명칭·부모를 확인하고, 아트보드 직계 StatusBar Auto44px·Pagination Absolute, Popup Fill800px, HEADER56px, BODY Fill744px, Title Area36px, body Fill708px, FOOTER Absolute/Hug126px를390×844 기준으로 대조합니다. 원형constraints·변수·모드를 유지하고Pagination은최신 라이브러리의 실제 인스턴스를import합니다. 종전72:9033의직계3단·Container1/2 명명 유지 및이전 화면 인스턴스 복제 경로는 새 제작에 사용하지 않습니다.

Image Area는 승인 원본 `10580:10543`에서 더미 그래픽과 “더미이미지” 라벨까지 가져와 적용합니다. 그래픽의 원본 이미지 hash·크롭 변환과 라벨의 위치·외형을 비교합니다. 빈 플레이스홀더만 있거나 라벨이 빠지면 실패입니다. 현재 승인 참조 `bDKgQrkt0oHMJ1EbPUQTp8 / 3478:12649`의 Image Area 전체를 재사용하고(이전 승인본 `0P0j17OPstNhC3LWjBdBGy / 67:2127`의 후속 적용본) 라벨 type TEXT / Pretendard SemiBold / 원본 fontFamily alias를 확인합니다. 이미 올바른 원본은 다시 만들지 않습니다. 원본 프레임·텍스트를 복제하여 속성과 연결을 보존하고 같은 파일 내 이동에는 필요 시 검증된 group/ungroup 경로를 사용합니다. 폰트 로드 실패를 이유로 outline SVG·벡터·이미지나 다른 폰트로 바꾸지 않습니다. 편집 가능성을 보존할 수 없으면 완료로 보고하지 않고 제한을 알립니다.

Title / Page 이후 Image Area는 동일 Container의 직계 자식인지와 실제 경계 간격 0px를 확인합니다. 승인 참조 `10580:10543`의 Vertical / Fill·Hug / padding 40px 0 / gap 0 및 ImageContainer ratio 2:1 / Fill·Fixed(350×175px), 전체 영역 350×255px를 대조합니다. Image Area 또는 단독 ImageContainer 다음 콘텐츠는 종류와 무관하게 기본 외부 간격 24px 및 `spacing/3xl` 연결을 검사합니다. 래퍼가 있으면 Image Area 바깥 경계부터 측정하며 사용자가 별도 지정한 간격은 해당 지시를 따릅니다. 내부·외부에 gap을 중복 적용하거나 내부 패딩을 외부 gap으로 대체하거나 별도 빈 Container로 간격을 만들지 않습니다.

최소 높이가 적용되는 짧은 콘텐츠 바텀시트에서는 Slot의 `layoutSizingVertical`이 FILL인지, 내부 Container·Text는 Hug인지, 버튼 아래에 불필요한 잔여 공간이 없는지 검수합니다. 완료 화면의 Feedback은 실제 공개 속성 `varient: large`와 Large component key를 확인합니다. 이전 Medium 인스턴스의 내부 size override가 남아 있으면 Large 원형과 대조해 복원하되, 상태 아이콘·문구·버튼 override는 유지합니다. 완료 화면이 아닌 Empty State에는 기존 상황별 규칙을 적용합니다.

각 Slot을 독립 범위로 보아 Container가 하나이면 순번 없는 `Container`인지 확인합니다. 일반 본문은 `Container > Text(Vertical Auto Layout, gap·padding 0, Fill/Hug) > Content`로 감쌉니다. 텍스트 강조를 직접 fontName/fontWeight 변경으로 구현하지 않고 원본 Text Style key를 구간별 적용합니다. 최종 `getStyledTextSegments`에서 모든 구간의 style key와 fontFamily·fontSize·fontWeight·lineHeight·letterSpacing alias를 해당 원본 스타일과 비교하고 색상 변수도 검사합니다. 폰트가 같아 보여도 연결이 끊긴 구간은 통과시키지 않습니다.

레이어명 검수 시 `[레이어명] Group` 내부의 반복 자식에는 순번을 붙이지 않았는지 확인합니다. `Data Block Group` 안의 자식은 모두 `Data Block`이어야 합니다. `Container 1`, `Container 2` 등 별도 정의된 페이지 Container의 순번은 유지합니다.

receipt의 rootId와 pageId로 실제 산출물을 전체 재수집합니다. 계획 자체를 산출물 증거로 재사용하지 않습니다. `actual.json`을 만들고 다음을 직접 확인합니다.

- 계층, component/variant key, 토큰 연결, style key, 실제 폰트·행간·자간, 모드
- 기획의 모든 문구/상태/화면과 디자인의 대응
- 템플릿 대비 역할별 여백, 본문 밀도, HEADER/BODY/FOOTER 배치
- 제목 없는 완료 데이터(D19): 제목이 없는 완료 데이터에서는 `Title / Element`만 숨기고 `Title` Auto Layout 래퍼와 `Divider / Horizontal(thickness:1px,variant:primary,length:full)`은 반드시 노출한다. Title 전체 숨김·생략은 금지한다. Title은 Divider 높이만 Hug하며 빈 제목 공간이나 잔여 12px 간격을 남기지 않는다. Divider↔DataList Group 16px(`spacing/xl`), 목록 내부 12px(`spacing/lg`)를 유지한다. 승인 참조 `3138:30128`과 최종 스크린샷을 비교해 상단 Divider가 실제 보이는지 확인한다. Title 전체 숨김·누락 또는 Divider↔첫 데이터 16px 누락 시 완료 처리하지 않는다. 일반 Data Block의 제목 숨김 규칙을 이 분기에 적용하지 않는다.
- 완료 화면 D18·D19: BODY 패딩의 상/우/하/좌와 계층별 gap 40/32/16/12, `Title`의 실제 Vertical Auto Layout 및 `Title / Element`→primary Divider 순서, DataList의 `hasDivider:false`, 하위 프레임 패딩 0과 토큰 연결. 이전 quaternary Divider나 그룹별 padding-top 24px가 남아 있지 않은지 확인
- 일반 이미지는 영역만 표시하되, 승인 Image Area의 더미 그래픽·라벨 전체 포함 여부와 DS 아이콘 출처
- 긴 한국어 문구의 줄바꿈, 잘림, 겹침, 비정상 크기, 스크롤/하단 버튼
- D28~D32: Card/Data Block/Text Box의 역할과 실제 동작 경계, 박스 명칭, 실제 fill/border·패딩·라운드·gap 토큰, 테두리 중첩 완화와 영역 구분·가독성. Data Block은 아웃라인 및 네 변 stroke를 필수 검사하며, Text Box에서 회색 무테를 선택한 경우 외곽 border 제거와 내부 Divider를 구분

템플릿과 산출물 PNG를 저장하고 **직접 열어 비교**합니다. `visual.json` 각 항목의 PASS/FAIL과 관찰 근거, 검수자, 두 PNG 경로, 현재 actual/reference 해시를 기록합니다. 숫자 검사만으로 visual PASS를 작성하면 안 됩니다. 시각 수정 뒤에는 다시 actual과 PNG를 수집하고 해시를 갱신합니다. 변하지 않은 결과를 반복 캡처할 필요는 없습니다.

```powershell
node src/cli.mjs verify runs/task-001/plan.json runs/task-001/reference.json runs/task-001/actual.json runs/task-001/receipt.json runs/task-001/visual.json runs/task-001/report.md
```

자동 검사는 전체 디자인 적합성을 증명하지 않습니다. 픽셀 차이 점수나 범용 겹침 판정기를 제공하지 않으며 스크린샷을 확인한 사람/에이전트의 시각 검수가 필수입니다. visual 기록은 자기 선언 가능한 증거이므로 검수자의 책임과 PNG를 함께 보존합니다.

## 7. 리포트와 완료

사용자가 정형 보고서·하네스 검증 산출물을 요청한 경우 이 절의 리포트를 작성합니다. 기본 제작은 위 공통 실행 기준에 따라 별도 파일 없이 검사 근거와 결과 링크로 완료를 알립니다. 요청된 리포트에는 요구사항 매핑, 템플릿/컴포넌트 선택 이유, 토큰·폰트 사용 근거, 출력 링크/ID, 실행 오류·수정 내역, 남은 차이, 미검증 사항을 담습니다. CLI의 기본 report에 실제 작업의 오류 이력과 수정 전후 설명을 추가합니다.

완료 조건은 요구사항 누락 없음, 정책 위반 없음, 원본 근거 확보, 현재 결과 시각 검수 통과입니다. 하나라도 남으면 BLOCKED 또는 REVIEW_REQUIRED로 전달하고 이유를 명시합니다. 런타임 예외로 verify 자체가 실패하면 원인과 미검증 범위를 알리고, 보고서가 요청된 경우 오류 리포트에도 남깁니다.

추가 완료 조건은 적용 규칙의 실제 검사 통과, 비적용 판단 근거와 미지원/충돌의 해결 근거 확보입니다. 보고서 요청 시 이 근거를 `designer-review.md`에 기록하고 최종 리포트에 연결합니다. 기존 CLI PASS만으로 디자이너 규칙까지 통과했다고 보고하지 않습니다.
