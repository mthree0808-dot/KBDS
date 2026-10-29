# MO Figma 디자인 하네스

## 알려드립니다 항상 펼침 (2026-10-29 사용자 확정)

- **‘알려드립니다’ Accordion은 제작·수정 후 항상 `expanded: true`로 펼쳐 본문을 노출합니다.** 기획서의 기본값이 접힘이거나 원형·이전 제작본이 접혀 있어도 이 사용자 확정 규칙을 우선 적용합니다.
- 완료 검수에서 실제 인스턴스의 `expanded` 값과 본문 가시성·줄바꿈·높이·잘림 여부를 확인합니다. 검수 중 상태를 전환했다면 마지막에는 반드시 펼침으로 복원하고 상위 Auto Layout·화면 높이를 반영합니다. 기존 전폭 Container·10px 외부 Divider·`hasDivider: false`·본문 크기·간격과 원형 화살표·공개 옵션 연결은 보존합니다.
- 적용 대상은 **‘알려드립니다’**이며 다른 용도의 Accordion은 각 기획·사용자 규칙을 따릅니다. 이번 요청은 공유 MD 갱신이며 기존 Figma 화면 전체를 일괄 수정했다는 의미가 아닙니다.

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
- **크기 모드·주변 영역**: 두 블록과 Text 래퍼는 가로 Fill·세로 Hug, 번호 Text는 가로 Fill·내용에 따른 높이 및 자연스러운 줄바꿈을 사용합니다. 참조의 280px 본문 폭에서 번호가 두 줄인 것을 고정 높이44px나 강제 개행으로 복제하지 않습니다. Dialog Slot → 별도 자세히보기 Accordion → ButtonGroup의 원형 관계와 간격은 유지합니다. 이 참조의 대표전화 블록 아래 Accordion과의 간격은 **20px(`spacing/2xl`)**이며 일반 Dialog의 제목/Description 마침표·HomeIndicator Fill 예외는 그대로 적용합니다. 참조의 다른 레이어 누락이나 문구를 규칙으로 상속하지 않습니다.
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

이 폴더에서 디자인 요청을 받으면 아래 문서를 순서대로 읽고 실행한다. 새 작업/새 대화에서도 생략하지 않는다.

1. `docs/sources/designer-ui-rules.md` — 사용자가 제공한 디자이너 원문 전체
2. `docs/designer-rules.md` — 실행 규칙, 적용 우선순위, 상황별 검수표
3. `docs/design-rules.md` — 실제 Figma에서 관측한 근거와 예외
4. `docs/workflow.md` — 분석·제작·검증 절차

원문은 보존하고, 해석·예외·변경 이력은 별도 문서에 기록한다. 상세 규칙을 요약본만 읽고 추정하지 않는다.
사용자가 명시적으로 규칙 문서의 수정을 요청한 경우에는 `docs/sources/designer-ui-rules.md`에도 승인 내용을 반영하고 실행 규칙·근거·절차 문서와 함께 일치시킨다.
원본: `09eGMNTNnkE0CTxPdr7lnk`, 템플릿 페이지: `10552:10031`.
사용자는 특히 **템플릿과 다른 배치·폰트·간격**을 실패로 본다.

## 절대 조건

- 2026-10-28 선택 UI 역할 매핑: 기획 segmented_control 명칭을 복제하지 않는다. 승인3205:38245처럼 조회기간 프리셋은 SegmentedControl을 유지하고 정렬순서(최신순/과거순)는 SelectButton(word/single)이다. 승인3205:38078의 이름/계좌번호 표시(보임/일부가림)도 같은 SelectButton을 사용한다. 이 두 항목 패턴은 root·slot Fill/Hug, slot Horizontal·원형 Wrap·gap8, 두 Item / Word / Single 모두 가로Fill/세로Hug로 균등하게 채운다. 부모만 Fill·Item Hug 또는 고정171px는 실패다. 원형44px/Hug·Label/문구Hug·스타일·변수·공개옵션을 보존하고 선택값은 기획을 따른다. 역할별 컴포넌트·실제 Item resizing·균등 폭·선택 상태를 검수한다.

- 2026-10-29 공통 속도 개선: 이 저장소를 참조하는 모든 작업자·AI는 [공통 실행 기준](docs/sources/designer-ui-rules.md#figma-작업-속도와-필수-검수-2026-10-29-공통-실행-기준)을 기본 적용한다. 단순 Dialog 1분 안팎·일반 단일 화면3분 이내를 목표로 하며 기획/원본 확인·도구 대기·필수 검수를 실제 시간에 포함한다. 한 요청의 화면·케이스·위치를 먼저 묶고, 필요한 최신 원형·공개 속성·Slot·스타일/토큰은 자산별 한 번 확인한 뒤 같은 묶음에서 재사용한다. 원본 변경·문맥 전환·새 자산·오류/불일치/누락 범위만 다시 확인한다. 독립 조회와 import는 묶고 검증된 스크립트에 기획 데이터를 매핑하여 같은 유형을 일괄 제작한다. optional·tooltip·prefix/suffix·아이콘·선택/비활성 상태는 제작 시점에 설정하고 원형 동작·변수·CTA Hug를 보존한다. 네 가지 레이어 검사와 필수 구조·서체·화면 검수는 제작에 결합하며 통과 후 변경 없으면 반복 조회·검사·캡처하지 않는다. 실제 수정은 영향 범위만 재검수한다. 3분 초과 시 원인·남은 작업을 짧게 알리고, 별도 요청 없는 정형 보고서·추가 파일은 생략한다. 구형 캐시/주변 화면 복제와 미검증 PASS는 금지한다.

- 2026-10-28 암호화 증명서 완료: 승인3105:17567처럼 Large Feedback의 안내 Text와 열람비밀번호 카드를 분리한다. Card / Surface(lightGray/basic) > Slot > DataList Group에 개인/생년월일6자리·사업자/사업자번호10자리를 split14/gap12로 배치하고 증명서 보기(tertiary/medium)는 카드 밖 Slot-buttonGroup에 둔다. hasErrorCode는 카드 가시성 제어이므로 true이며 오류 문자열을 넣지 않는다. 안내 Text에 비밀번호 규칙을 합치거나 카드를 일반 Data Block 아웃라인으로 바꾸지 않는다. 후속 데이터 D19 구분선을 유지하고 카드·버튼의 실제 부모를 검수한다.
- 2026-10-28 공유 방법 선택 공통: 승인3138:31620처럼 BottomSheet > Slot > GridButton(secondary/grid) > Slot > Grid(1행3열·균등 열·gap8·항목높이121)를 사용한다. 카카오톡/문자메시지/더보기 순서와 최신 solid-kakaotalk/solid-message/line-ellipsis-horizontal 아이콘(IconContainer36)을 적용한다. Item / Vertical secondary·hasSubLabel false·미선택·활성, StickyButton 비노출, Slot Fill·BottomSheet211px·AUTO/HomeIndicator Fill 노출을 지킨다. primary 테두리형·기본 ICON·제작 주석 노출을 금지하고 최종 화면에서 검사한다.

- 2026-10-28 완료 데이터의 제목 비노출: 제목이 없는 완료 데이터에서는 `Title / Element`만 숨기고 `Title` Auto Layout 래퍼와 `Divider / Horizontal(thickness:1px,variant:primary,length:full)`은 반드시 노출한다. Title 전체 숨김·생략은 금지한다. Title은 Divider 높이만 Hug하며 빈 제목 공간이나 잔여 12px 간격을 남기지 않는다. Divider↔DataList Group 16px(`spacing/xl`), 목록 내부 12px(`spacing/lg`)를 유지한다. 상단 Divider의 실제 노출을 검수한다. 승인 참조 `3138:30128`, 교정 산출물 `3168:18258`.

- 2026-10-28 라디오 선택형 Card: 승인552:13664처럼 Card / Surface > Slot > Body > Groups + Card / Header / Affix > Item / Radio 구조를 사용한다. 노출 Affix는 variant radio·AUTO·visible true, Body Horizontal·gap12·MIN/MIN, Groups Fill/Hug, Affix24×24 Fixed다. 원형 기본 숨김 Affix는 노출하지 않아 카드당 실제 Affix1개를 유지한다. Card select/disabled와 Radio 상태를 기획과 대조하며 이 지정 패턴을 GridButton·일반 Radio·SelectButton으로 임의 대체하지 않는다.

- 2026-10-28 전폭 헤더 후속 UI: 3138:27761처럼 헤더 직후 StepIndicator·Tab이 오면 BODY 좌우·상단0, 하단32 / Container 1 padding0·Fill / 컴포넌트 전폭390을 유지한다. 후속 독립 콘텐츠 Container 2 이상에만 좌우20을 적용하고 직후 gap24를 유지한다. Data Block은 단일·복수 모두 아웃라인(fill quaternary-muted / border secondary-muted / stroke/md / padding·radius20)이며 회색 무테 재량은 Text Box에만 유지한다. 원형 내부 패딩·별도 확정 복합 패턴·문구·숫자 서체·연결은 보존한다.

- 2026-10-28 사용자 지정 컴포넌트 교정: 발급정보 3142:17373·3142:17946의 발급 언어·주민등록번호 뒷자리 표기 선택은 SelectButton(word/single)이다. 기획 설명에 라디오라고 적혀 있거나 Slot 옵션 문제가 있어도 지정 컴포넌트를 임의로 Radio로 바꾸지 않는다.

- 2026-10-28 오버레이 배경: 바텀시트·다이얼로그·입력용 키패드 시트에서는 기획에 뒤 화면이 보여도 Dimmed 아래에 Popup·일반 화면·복제 프레임·스크린샷을 깔지 않는다. 배경은 루트 background/neutral/white와 Dimmed만 사용하며 이전 배경 Popup Fill·clip 래퍼 지시는 철회한다. 실제 전경으로 요청된 풀팝업/키패드·패턴 Popup은 이 규칙의 배경 화면과 구분한다.

- 2026-10-28 HomeIndicator 배경 Fill: Dialog에서는 background/neutral/elevated Fill의 눈(visible)을 반드시 끄고, Dialog 외 화면에서는 켠다. 원형이 숨김이어도 사용자 승인 참조 bDKgQrkt0oHMJ1EbPUQTp8 / 49:21704처럼 산출물 Paint만 visible true로 교정한다. 변수·모드·색상·opacity·인스턴스 연결·os iOS·내부 막대·원형 높이·AUTO를 유지한다. 레이어 visible만으로 판정하지 않고 Fill 자체의 가시성과 하단 배경을 검수한다.

- 2026-10-27 바텀시트 배치: 화면 레벨에서 Absolute(position)는 Dimmed와 StatusBar에만 사용한다. BottomSheet와 HomeIndicator는 Vertical Auto Layout의 Auto 자식으로 두고 하단 정렬·gap 0으로 연속 배치한다. 문자 키패드가 있으면 BottomSheet → Keypad → HomeIndicator도 Auto로 이어 붙인다. 좌표 고정으로 외형만 맞추지 않고 실제 layoutPositioning, 높이 변경 시 재배치와 하단 안전영역을 검수한다.

- 2026-10-27 Dialog Title 마침표: Slot에서 Item / Slot의 Title만 노출되면 기획의 유무와 관계없이 Title 문장 끝에 마침표를 적용하고 중복하지 않는다. Title과 Description이 함께 노출되면 Title의 문장 종결용 마침표를 제거한다. 숨김·빈 더미 Description은 제외하며 실제 노출 구성으로 판단한다. Description·버튼명·숫자의 소수점·원형 스타일·변수·계층·연결은 보존하고 Description 노출 변경 후 재검수한다.
- 2026-10-27 Popup 레이어명 최종 원복: Popup > Slot 내부 3단 영역은 Header, Body, Footer로 명명한다. 약관 상세(PDF)·키패드·패턴·일반 풀팝업 모두 적용하고 종전 ## HEADER/## BODY/## FOOTER로 변경하라는 지시는 철회한다. 일반·완료 화면 아트보드 직계의 ## HEADER/## BODY/## FOOTER는 유지하며 Popup 내부 명칭 외 구조·속성·배치는 변경하지 않는다.
- 2026-10-28 문자·숫자 서체 최종 기준: 하나의 Text에 문자와 숫자가 섞이면 전체 KBFG Text다. 실제 별도 Text로 분리된 숫자는 Pretendard, 문자는 KBFG Text이며 숫자 전용 텍스트·입력값·Table 숫자 전용 셀도 Pretendard다. DataList 데이터(값) Text는 숫자만이면 Pretendard, 혼용이면 KBFG Text다. 항목명과 별도 값 Text는 각각 판정하고 숫자 서식 구분자·소수점은 숫자와 같은 서체를 사용한다. 종전 동일 Text 내 구간별 서체 분리 지시는 철회하며 서체 적용을 위한 임의 레이어 분할은 금지한다. 최신 역할·크기·굵기별 스타일·변수와 다른 타이포그래피 속성·크기 모드·인스턴스 연결·공개 옵션 및 별도 승인 서체 예외를 보존하고 실제 Text 경계·family·스타일·변수와 Table/DataList 분기를 검수한다.
- 2026-10-29 약관 재확인: Templates 페이지10552:10031에서 실제 유형을 확인한다. 하위 동의가 있는 기본 참조는31061:78124이며 78292/78209의1~4뎁스·긴 문구·Grid,78333의BottomSheet를 역할별로 적용한다. 종전78151은 현재 상품설명서1d 단일 항목이므로 하위 목록 기준으로 사용하지 않는다. 하위 항목이 있는 ConsentGroup은 Slot 첫 자식에 Divider Auto Layout(gap0/padding-bottom12px·spacing/lg) > Divider / Horizontal(secondary/1px/Fill)을 반드시 유지·복원한다. 더미 항목 교체 시 필수 Divider까지 지우고 체크 항목만 채우는 것은 실패다. 하위 없는 그룹에는 선을 추가하지 않는다. native1d/2d 및3d/4d·서체/변수·상태·Prefix/Suffix·그룹12px·실제 줄바꿈을 원형과 대조하고 인스턴스 사용만으로 PASS 처리하지 않는다. 78124의 선택 완료 상태는 예시이며 미선택 기획은 false를 유지한다. 일반 BODY와 전폭 StepIndicator 작성 단계의 외곽 구조를 구분한다. PDF31888:30615의 Popup 내부 Header/Body/Footer, 별도78179·78354 유형도 해당 역할에만 유지한다. 원형 라이브러리는 읽기 전용이며 원문§2.G·§4 및 2026-10-29 약관 교정 절을 따른다.
- 모든 컴포넌트는 지정 MO 라이브러리 `09eGMNTNnkE0CTxPdr7lnk`의 현재 원형·공개 속성·Slot·텍스트 스타일/변수 연결을 직접 확인하고 import한 새 인스턴스로 제작한다. 주변 화면·기획안·이전 산출물의 컴포넌트나 override를 복제하여 원형으로 삼지 않는다. 기획은 내용·순서·상태·행동의 기준이며 승인 예시는 명시된 배치·위계·간격의 근거다. 검증된 스크립트·캐시는 탐색과 절차만 재사용하며 최신 원형 조회를 대신하지 않는다. 원형 내부 Hug/Fill/Fixed와 속성 전환을 유지하고 Slot·텍스트 구간까지 검수한다. 원본 확인이나 전환 검수에 실패하면 주변 화면으로 추정 대체하거나 정상 완료로 보고하지 않는다.
- 디자인 시스템과 해당 화면에 맞는 템플릿을 실제로 읽은 후 제작한다. `knowledge/`는 시점별 캐시다. 매 작업에서 사용할 원본 노드와 토큰을 다시 조회한다.
- 원본 라이브러리와 기획서는 읽기 전용으로 취급한다. 사용자가 지정한 산출물 URL의 범위만 수정한다.
- 컴포넌트 인스턴스와 원본의 토큰·스타일만 사용한다. 컴포넌트 조합은 허용한다. 신규 컴포넌트/토큰, detach, 임의 폰트·색상·간격, 외부 아이콘은 금지한다.
- 박스는 역할로 구분한다. 이체·상세 이동·체크/라디오·상품/계좌/항목 선택처럼 박스 내부 또는 박스 전체에 동작이 있으면 `Card / Surface`, 사실 데이터 표시만 하면 `Data Block`, 기존 Infobox에 해당하지 않는 설명·안내·주의·상태 전달은 `Text Box`를 쓴다. 박스 바깥 형제 `Button Area`의 버튼만으로 Data Block을 Card로 바꾸지 않는다.
- `Data Block`과 `Text Box`는 승인된 예시와 DS 토큰·스타일·하위 컴포넌트를 사용한 Auto Layout 프레임으로 직접 구성할 수 있다. 이는 신규 라이브러리 컴포넌트 생성이나 detach 허용이 아니다. 콘텐츠 박스 이름과 내부 패딩은 페이지 `Container [순번]` 규칙과 구분한다.
- Data Block은 최신 사용자 지시에 따라 아웃라인형으로 제작한다. Text Box의 아웃라인형과 `surface/neutral/tertiary-muted` 회색 배경·무테형은 주변 위계·밀도와 테두리 중첩을 보고 선택한다. 역할명은 유지하며, `Card / Surface`의 스타일 선택은 원본 공개 속성 범위에 한정한다. 상세 기준과 승인 예시는 원문 Box UI Rules 및 `docs/designer-rules.md` D28~D32를 따른다.
- 디자이너의 명시 규칙을 기본으로 적용하고 템플릿에서 구조·역할별 근거를 확인한다. 두 자료가 다르면 `docs/designer-rules.md`의 우선순위와 차이 기록 절차를 따른다. 전체 화면에 단일 gap을 적용하지 않는다. 문구 길이에 맞추려고 폰트를 줄이거나 문구를 생략하지 않는다.
- 상단 Feedback + 후속 데이터가 있는 완료 화면은 승인 예시 `2668:26353`과 D18·D19를 따른다. BODY padding `40px 20px 32px` / gap 40px, Container 2의 반복 `Title / DataList Group` 사이 32px, 각 그룹 내부 `Title`↔`DataList Group` 16px, Title 내부와 DataList 목록 내부 각각 12px를 구분한다. Title은 Vertical Auto Layout으로 `Title / Element`와 `Divider / Horizontal (thickness: 1px, variant: primary, length: full)`을 감싼다. Container·하위 그룹 패딩은 0이며 Title 내부 Divider 때문에 BODY 좌우 20px를 제거하지 않는다.
- 토큰 미연결 원본 수치는 자동으로 토큰으로 승격하지 않는다. 원본 컴포넌트 내부는 상속하되 새 컨테이너에 재사용하려면 검증 가능한 템플릿 근거와 미연결 사실을 기록한다. 엄격한 토큰 전용 조건을 충족하지 못하면 해당 부분을 차단한다.
- 일반 이미지는 영역만 표시한다. 단, 사용자 승인 원본 `09eGMNTNnkE0CTxPdr7lnk / 10580:10543`의 Image Area는 더미 그래픽과 “더미이미지” 라벨을 포함한 전체 구성을 앞으로 기본 재사용한다. 빈 ImageContainer로 대체하거나 라벨을 생략하지 않는다. 최신 재사용 참조는 `0P0j17OPstNhC3LWjBdBGy / 67:1947`의 Image Area `67:2127`이며 라벨은 편집 가능한 TEXT / Pretendard SemiBold와 원본 fontFamily 변수를 보존한다. 폰트 outline·SVG·벡터·이미지 변환과 대체 폰트를 금지한다. 원본 아이콘의 키와 출처를 확인한다. 현재 아이콘 페이지는 Graphic 라이브러리 이동 안내다. 이동 링크와 실제 사용 인스턴스를 추적한다.
- wireframe → requirement → template/reference → component/token → output node의 연결 근거를 제작 호출의 반환값·검수 결과에 남긴다. 사용자가 보고서를 요청한 경우에만 별도 추적표 파일로 정리한다.
- 기획서/산출물 URL이 없으면 하네스 분석·유지보수는 진행하되 실제 화면 제작을 완료했다고 보고하지 않는다.
- 템플릿 스크린샷과 최종 산출물 스크린샷을 직접 비교한다. 구조 검사 통과만으로 시각 품질 통과를 선언하지 않는다.
- 알 수 없는 값, 누락 증거, 실패한 검사, 미검사는 PASS가 아니다. 오류를 숨기거나 임의 대체하지 말고 해결하거나 남은 제한으로 짧게 알린다. 별도 리포트는 요청한 경우에 작성한다.
- 모든 Figma 변경 전에 설치된 figma-use 및 화면 제작 시 figma-generate-design 스킬을 읽는다. 도구 지원 여부는 실제 API 정의로 확인한다.
- 디자이너 규칙의 적용 여부, Component Properties, 토큰 key, 실제 결과 노드와 검사 근거는 필수 검수에서 확인한다. 사용자가 정형 검증 보고서를 요청한 경우 `designer-review.md` 양식으로 기록한다. 해당 규칙에 FAIL/미검증이 있으면 CLI PASS만으로 완료 처리하지 않는다.

- 링크 목록의 제목·목록 래퍼 이름은 `Title / List Group`이다. Container 2 이상에서는 이 래퍼 padding-top 24px(`spacing/3xl`), 내부 `List Group` gap 0px를 적용한다. 래퍼 자체 gap 16px와 Container 1 기존 값은 유지하고, 실제 List 컴포넌트 이름은 변경하지 않는다. 내부 목록 gap 24px는 철회된 값이다.

## 실행

`node src/cli.mjs help`로 명령을 확인한다. 별도 패키지 설치와 API 토큰은 필요 없다.
Figma 연결은 Codex Figma MCP를 이용한다. 로컬 CLI 자체는 Figma에 접속하지 않는다.
수집 스크립트 생성 → MCP 실행 → 결과 JSON 저장 → 계획 검사 → 제작 → 실제 노드 재수집 → 검증·리포트 순서다.
