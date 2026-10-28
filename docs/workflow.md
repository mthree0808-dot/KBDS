# 작업 실행 절차

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

## Dialog Title 마침표 적용·검수 — 2026-10-27

Dialog의 실제 Slot에서 노출되는 Item / Slot 타입과 내용을 먼저 확인합니다. Title만 노출되면 기획의 마침표 유무와 관계없이 Title 문장 끝에 마침표(`.`)를 적용하며 중복하지 않습니다. Title과 Description이 함께 노출되면 Title의 문장 종결용 마침표를 제거합니다. 숨김·내용 없는 더미 Description으로 분기를 바꾸지 않습니다. Description 노출을 변경한 뒤에는 같은 조건으로 다시 검수하고, Description·버튼명·숫자의 소수점·스타일·변수·Slot 계층·공개 옵션과 인스턴스 연결은 보존합니다.

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
3. 약관 동의는31061:78151/78179/78292/78209 중 기획에 맞는 경우를 선택하고 ConsentGroup과 Item / Consent를 현재 원형에서 import합니다. 뎁스는1d·2d·3d-group·3d·4d-group·4d, 직접 설명은description, 부가 목록은textList로 매핑합니다. 구형 Consent solid/basic·Depth 프레임·수동 Outline Container는 새 구성에서 사용하지 않습니다. 실제 Slot/Slot-Depth-3/Slot-Depth-4/Slot-TextList 안에 항목을 배치하고 native Prefix/Suffix의 체크·라디오·화살표·가시성 연결을 유지합니다.
4. 일반 동의 BODY는padding24/20/32/20·gap24, 반복 ConsentGroup은gap12, 원형 내부 Slot은gap0·하단padding8을 대조합니다. 3d-group/4d-group의 들여쓰기32px와하단12px를 추가 래퍼로 중복하지 않습니다. GridContainer는3d의Vertical 또는4d의2열FLEX/행Hug/행·열gap0 분기를 기획에 맞게 사용합니다. 일반 Radio/Checkbox Group gap20은 이 원형 목록에 일괄 적용하지 않습니다.
5. BottomSheet는31061:78333을 기준으로Slot padding0/20/20/20·gap20, 안내문→ConsentGroup 목록(gap12), elevated StickyButton·외부HomeIndicator를 검수합니다. TextList 확인형은31061:78354를 기준으로Title/Section→TextListGroup gap16, size16목록 gap8, 별도ConsentFinal(outline)을 사용합니다. 그룹 하단textList variant의목록은size14입니다.
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

매 작업에서 `docs/sources/designer-ui-rules.md` 원문 전체 → `docs/designer-rules.md` → `docs/design-rules.md`를 읽습니다. 디자이너 문서의 일반/완료/바텀시트 구분, 이름, 구조, 상황별 간격·속성·텍스트 규칙을 계획의 기준으로 삼습니다. 자리표시자 URL은 사용하지 않으며, 원문에 명시된 실제 디자인 시스템 URL과 사용자 승인 Figma 예시는 조회 근거로 사용합니다. 실제 Figma 원본을 확인하는 절차는 그대로 유지합니다.

`runs/<run-id>/designer-review.md`에 읽은 자료와 원문 해시를 기록하고 D01~D32 적용표를 작성합니다. 파일 생성 전 입력이 없으면 해당 계획을 대기 상태로 설명하고 이번 작업의 가능한 분석을 진행합니다.

## 1. 입력과 범위

기획서와 산출물의 node-id 포함 URL을 파싱합니다. 페이지 URL이면 하위 화면 목록부터 읽고 화면 범위를 확정합니다. 라이브러리와 기획서는 수정하지 않습니다. 산출물 노드가 기획서의 하위인지도 Figma 계층에서 확인합니다. 현재 파일 키가 같은 두 URL도 자동으로 안전하다고 보지 않습니다.

`node src/cli.mjs init <run-id> <wireframe-url> <target-url>`로 작업 폴더를 만듭니다. 아직 URL이 없으면 사용 가능한 분석·정비를 진행하고, 실제 제작은 입력이 제공된 이후 시작합니다.

## 2. 원본 재조회와 기획 해석

`knowledge/registry.json` 및 `knowledge/templates.json`에서 후보를 찾고 이번 작업에 사용할 원본 노드·키·속성 정의를 다시 조회합니다. 캐시는 자동 갱신되지 않습니다. 원본과 다른 값은 캐시를 업데이트하고 계획 해시도 다시 생성합니다. 잘린 JSON은 폐기하고 페이지 크기를 줄여 재조회합니다.

각 화면의 문구, 순서, 선택 상태, 필수/선택, 버튼, 오류·빈 상태, 이미지 영역, 보조 설명을 requirement로 만듭니다. 각각 기획서 sourceNodeId를 기록합니다. 기획서의 mainComponent key는 필요한 역할을 식별하는 단서로만 사용하고 지정 라이브러리의 현재 정의와 대조합니다. 실제 제작에는 현재 라이브러리에서 import한 원형의 새 인스턴스를 사용하며 기획의 기존 override는 복제하지 않습니다. 이름이 같거나 비슷한 모양만으로 매핑하지 않습니다. 사용된 원본 컴포넌트 정의가 변경됐다면 변경을 보고합니다.

화면 내부만 읽고 끝내지 않고 주변 기획 영역의 페이지 ID와 화면 명칭을 확인하여 해당 화면에 연결합니다. 실제 ID가 있으면 `실제페이지ID_화면명`(예: `F730_화면명`), ID가 공란이면 기존 `화면ID_화면명`을 유지합니다. ID 영역 미확인·연결 불명확은 공란과 구분하며 임의 ID를 추정하지 않습니다. 접두어는 `페이지 ID` 필드만 기준으로 하며 요구사항 ID·상위 프레임명·화면명·흐름 주석의 숫자나 약어를 추출하여 대신 쓰지 않습니다. `-`는 공란으로 처리하고 `F730`은 형식 예시입니다. 제작 전 계획과 최종 아트보드 이름이 이 분기를 따르는지 대조합니다.

상단 Feedback + 후속 데이터가 있는 완료 화면은 원문 완료 화면 절과 D18·D19를 별도로 적용합니다. BODY padding `40px 20px 32px` / gap 40px → Container 2의 반복 `Title / DataList Group` 사이 32px → 각 그룹의 `Title`↔`DataList Group` 사이 16px → Title 내부 및 DataList 목록 내부 각각 12px로 계획합니다. Title은 Vertical Auto Layout 안에 `Title / Element`와 `Divider / Horizontal(thickness:1px,variant:primary,length:full)`을 배치합니다. Container·하위 그룹 패딩 0, BODY 좌우 20px를 유지하며, 이 내부 Divider를 페이지 Full-Width 요소로 잘못 판정하지 않습니다. 승인 기준은 `2668:26353`이며 일반 화면·Empty State와 구분합니다.

2026-10-20 단일 항목 Data Block: 박스 안 라벨·값 쌍이 하나면 `KFlklMvGmg0MXGfAXvpprn / 1147:62`의 제공회사/KB국민은행 박스 `1148:3021`처럼 `Data Block > DataList(split,14,hasDivider:false)`로 직접 구성합니다. 단일 DataList에 Group을 추가하지 않고, 패딩·라운드 20 / 아웃라인(2026-10-28 최신 지시) / Label 좌측·Data 우측 정렬 / Fill·Hug를 검수합니다. 섹션 Title은 박스 밖 형제, gap 16px입니다. 복수 항목과 완료 화면의 별도 그룹 구조는 유지합니다.

박스마다 D28~D32를 적용합니다. 기존 Infobox에 해당하는지 먼저 확인하고, 그 밖에는 버튼형 선택지를 `GridButton`으로 먼저 구분하고, 나머지 내부/전체 동작이 있으면 `Card / Surface`, 사실 데이터 표시이면 `Data Block`, 설명·안내·주의·상태 전달이면 `Text Box`로 구분합니다. 박스 밖의 형제 `Button Area`는 내부 동작으로 세지 않습니다. Data Block은 아웃라인을 적용하며 Text Box만 아웃라인 또는 회색 배경·무테 형태를 고릅니다. 아웃라인의 반복·중첩, 정보 위계·밀도·가독성을 보고 선택하며, 매번 사용자 승인을 요청하지 않습니다.

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

2026-10-20 필수·선택 및 알려드립니다 교정: InputField 필수 항목은 Title / Element의 optional false / optional 래퍼 비노출을 검수합니다. 필수가 아닌 항목은 optional true / 기본 `(선택)` 문구와 색상·서체·스타일·변수를 원형 그대로 보존합니다. 기존 `(필수)` 및 강조색 재정의는 원형으로 복원합니다. 알려드립니다는 `zNwpdAWcBMOM5ExkiBUoGn / 2075:2064` 하단처럼 전용 Container(gap·padding 0, Full Width) > 외부 10px tertiary full Divider → basic/standard/medium Accordion(hasPrefix true, solid-info-circle, hasDivider false, expanded true)으로 하단 버튼 위에 배치합니다. 상단 본문과 간격 32px, 내부 TextList size 14 / Slot gap 8px를 확인하며 Accordion만 단독 배치하지 않습니다.

2026-10-20 TextButton 최종 교정: 인풋 조합 및 박스 아래에 별도 배치하는 TextButton은 `zNwpdAWcBMOM5ExkiBUoGn / 2025:7407`의 `2025:7417`처럼 variant secondary로 계획·제작·검수합니다. 종전 인풋 조합의 primary 지정은 철회합니다. 크기·간격·정렬은 각 승인 패턴을 유지하며, InputField 내부 버튼과 독립 CTA에는 일괄 적용하지 않습니다.

2026-10-21 항목 선택 바텀시트 기본 선택: 기획에 명시된 초기 선택 항목·선택할 항목의 순서를 먼저 확인합니다. 지정이 없으면 화면에서 위에서 두 번째 List를 기본 선택으로 계획하며, 안내 List도 노출 순서에 포함하고 재정렬하지 않습니다. 기준은 `2230:10109 / 2230:10111`입니다. 선택 List의 hasSuffix true와 Slot-Suffix > Item / Suffix의 variant checkMark를 공개 속성으로 적용하고, 일반 단일 선택의 나머지는 hasSuffix false로 둡니다. 기획에 복수 선택이 명시되면 해당 상태를 따릅니다. 검수 시 실제 체크마크 위치·원본 인스턴스·프로퍼티 패널 편집 연결과 체크 유무 모두 48px / Fixed인지 확인합니다. 계좌 선택 전용 패턴에도 같은 선택 우선순위를 적용합니다.

2026-10-20 승인 규칙: 체크마크로 선택 상태를 표시하는 셀렉트 바텀시트의 List는 체크마크 노출 여부와 관계없이 높이 48px / 세로 Fixed로 계획·제작·검수합니다. 비노출 상태의 원형 Hug 높이 46px를 그대로 사용하지 않으며, 선택 전후의 List 높이와 항목 위치가 동일한지 확인합니다. 도움말·이용 방법 선택 List의 별도 높이에는 일괄 적용하지 않습니다.

2026-10-19 승인 패턴: InputField 뒤 보조 이동 버튼은 `zNwpdAWcBMOM5ExkiBUoGn / 2025:6834`의 `InputField / Button Area`(gap 12px)와 우측 정렬 Button Area / TextButton secondary·xsmall·suffix true·underline false를 매핑합니다. 도움말·이용 방법 선택 바텀시트는 `KFlklMvGmg0MXGfAXvpprn / 185:14891`의 테두리 없는 List 패턴을 적용하고, 목록 gap 0·List padding 12/0·기본 Item / Prefix(bgIcon)·Suffix pageIndicator를 확인합니다. 기획 본문이 있으면 Text로 보존하고 목록과 gap 16px로 배치합니다. 아이콘은 작업자가 직접 지정하므로 기본 인스턴스만 두며, 전체 Card 패턴이나 일반 선택 바텀시트의 gap 8px를 이 경우에 적용하지 않습니다. 상세 수치와 키는 원문 및 실측 디자인 규칙을 따릅니다.

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

reason에는 적용한 디자이너 규칙 ID도 기록합니다. 템플릿과 다른 명시 규칙은 `designer-review.md`에 차이를 남깁니다. 기존 CLI는 디자이너 규칙 전체를 구현하지 않았으며, root 이름·상황별 sizing·바텀시트 Absolute·인라인 링크 등에 지원 차이가 있습니다. `docs/designer-rules.md`의 지원 표를 확인한 후 사용할 제작 경로를 정합니다. 지원하지 않는 규칙을 생략하여 일반 컴파일러에 맞추지 않습니다.

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

Image Area는 승인 원본 `10580:10543`에서 더미 그래픽과 “더미이미지” 라벨까지 가져와 적용합니다. 그래픽의 원본 이미지 hash·크롭 변환과 라벨의 위치·외형을 비교합니다. 빈 플레이스홀더만 있거나 라벨이 빠지면 실패입니다. 최신 승인 참조 `0P0j17OPstNhC3LWjBdBGy / 67:1947`의 Image Area `67:2127`를 재사용하고 라벨 type TEXT / Pretendard SemiBold / 원본 fontFamily alias를 확인합니다. 이미 올바른 원본은 다시 만들지 않습니다. 원본 프레임·텍스트를 복제하여 속성과 연결을 보존하고 같은 파일 내 이동에는 필요 시 검증된 group/ungroup 경로를 사용합니다. 폰트 로드 실패를 이유로 outline SVG·벡터·이미지나 다른 폰트로 바꾸지 않습니다. 편집 가능성을 보존할 수 없으면 완료로 보고하지 않고 제한을 알립니다.

Title / Page 이후 Image Area는 동일 Container의 직계 자식인지와 실제 경계 간격 0px를 확인합니다. 승인 참조 `10580:10543`의 Vertical / Fill·Hug / padding 40px 0 / gap 0 및 ImageContainer ratio 2:1 / Fill·Fixed(350×175px), 전체 영역 350×255px를 대조합니다. Image Area 또는 단독 ImageContainer 다음 콘텐츠는 종류와 무관하게 기본 외부 간격 24px 및 `spacing/3xl` 연결을 검사합니다. 래퍼가 있으면 Image Area 바깥 경계부터 측정하며 사용자가 별도 지정한 간격은 해당 지시를 따릅니다. 내부·외부에 gap을 중복 적용하거나 내부 패딩을 외부 gap으로 대체하거나 별도 빈 Container로 간격을 만들지 않습니다.

최소 높이가 적용되는 짧은 콘텐츠 바텀시트에서는 Slot의 `layoutSizingVertical`이 FILL인지, 내부 Container·Text는 Hug인지, 버튼 아래에 불필요한 잔여 공간이 없는지 검수합니다. 완료 화면의 Feedback은 실제 공개 속성 `varient: large`와 Large component key를 확인합니다. 이전 Medium 인스턴스의 내부 size override가 남아 있으면 Large 원형과 대조해 복원하되, 상태 아이콘·문구·버튼 override는 유지합니다. 완료 화면이 아닌 Empty State에는 기존 상황별 규칙을 적용합니다.

각 Slot을 독립 범위로 보아 Container가 하나이면 순번 없는 `Container`인지 확인합니다. 일반 본문은 `Container > Text(Vertical Auto Layout, gap·padding 0, Fill/Hug) > Content`로 감쌉니다. 텍스트 강조를 직접 fontName/fontWeight 변경으로 구현하지 않고 원본 Text Style key를 구간별 적용합니다. 최종 `getStyledTextSegments`에서 모든 구간의 style key와 fontFamily·fontSize·fontWeight·lineHeight·letterSpacing alias를 해당 원본 스타일과 비교하고 색상 변수도 검사합니다. 폰트가 같아 보여도 연결이 끊긴 구간은 통과시키지 않습니다.

레이어명 검수 시 `[레이어명] Group` 내부의 반복 자식에는 순번을 붙이지 않았는지 확인합니다. `Data Block Group` 안의 자식은 모두 `Data Block`이어야 합니다. `Container 1`, `Container 2` 등 별도 정의된 페이지 Container의 순번은 유지합니다.

receipt의 rootId와 pageId로 실제 산출물을 전체 재수집합니다. 계획 자체를 산출물 증거로 재사용하지 않습니다. `actual.json`을 만들고 다음을 직접 확인합니다.

- 계층, component/variant key, 토큰 연결, style key, 실제 폰트·행간·자간, 모드
- 기획의 모든 문구/상태/화면과 디자인의 대응
- 템플릿 대비 역할별 여백, 본문 밀도, HEADER/BODY/FOOTER 배치
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

리포트에는 요구사항 매핑, 템플릿/컴포넌트 선택 이유, 토큰·폰트 사용 근거, 출력 링크/ID, 실행 오류·수정 내역, 남은 차이, 미검증 사항을 담습니다. CLI의 기본 report에 실제 작업의 오류 이력과 수정 전후 설명을 추가합니다.

완료 조건은 요구사항 누락 없음, 정책 위반 없음, 원본 근거 확보, 현재 결과 시각 검수 통과입니다. 하나라도 남으면 BLOCKED 또는 REVIEW_REQUIRED로 전달하고 이유를 명시합니다. 런타임 예외로 verify 자체가 실패해도 오류 리포트를 별도 작성합니다.

추가 완료 조건: `designer-review.md`의 적용 규칙 모두 PASS, 비적용 규칙의 이유 기록, 미지원/충돌의 해결 근거 확보. 최종 리포트에 이 문서를 연결합니다. 기존 CLI PASS만으로 디자이너 규칙까지 통과했다고 보고하지 않습니다.
