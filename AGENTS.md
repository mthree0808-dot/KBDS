# MO Figma 디자인 하네스

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

- 2026-10-28 속도 개선: 단순 Dialog 1분 안팎·일반 단일 화면3분 이내를 목표로 한다. 검증된 제작 스크립트와 키 매핑을 재사용하고 독립 기획/위치/원본 조회는 병렬로 묶는다. 필요한 최신 원형 확인은 유지하되 같은 작업의 불필요한 재조회를 하지 않는다. 단순 수정은 대상 범위만 처리한다. 제작 중 구조·서체·속성 검수와 마지막 스크린샷 검수를 결합하고 통과 후 변경이 없으면 반복하지 않는다. 오류·수정 부분은 재검수하며 미검증 PASS는 금지한다. 3분 초과 시 원인·남은 작업을 짧게 알리고 별도 요청 없으면 추가 보고서는 생략한다.

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
- 2026-10-27 v0.95 약관 갱신: 사용자 지정 상세31888:30615와 약관6개 사례31061:78151/78179/78292/78209/78333/78354를 승인 기준으로 적용한다. PDF 상세는 StatusBar(Auto) + Popup > Slot > Header/Body/Footer + 아트보드 직계Pagination(Absolute)이다. 일반 동의는 최신 ConsentGroup·Item / Consent의 뎁스variant/Slot·ConsentFinal로 구성하고 구형 Consent/Depth 프레임·수동 Outline Container를 새 제작에 쓰지 않는다. 자세한 분기·간격은 원문§2.G·§4를 따른다. 원형 라이브러리는 읽기 전용이며 산출물에만 적용한다.
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
- wireframe → requirement → template/reference → component/token → output node의 추적표를 남긴다.
- 기획서/산출물 URL이 없으면 하네스 분석·유지보수는 진행하되 실제 화면 제작을 완료했다고 보고하지 않는다.
- 템플릿 스크린샷과 최종 산출물 스크린샷을 직접 비교한다. 구조 검사 통과만으로 시각 품질 통과를 선언하지 않는다.
- 알 수 없는 값, 누락 증거, 실패한 검사, 미검사는 PASS가 아니다. 오류를 숨기거나 임의 대체하지 말고 리포트에 남긴다.
- 모든 Figma 변경 전에 설치된 figma-use 및 화면 제작 시 figma-generate-design 스킬을 읽는다. 도구 지원 여부는 실제 API 정의로 확인한다.
- 디자이너 규칙의 상황별 적용/비적용, Component Properties, 토큰 key, 실제 결과 노드와 검사 근거를 작업별 `designer-review.md`에 기록한다. 해당 규칙에 FAIL/미검증이 있으면 CLI PASS만으로 완료 처리하지 않는다.

- 링크 목록의 제목·목록 래퍼 이름은 `Title / List Group`이다. Container 2 이상에서는 이 래퍼 padding-top 24px(`spacing/3xl`), 내부 `List Group` gap 0px를 적용한다. 래퍼 자체 gap 16px와 Container 1 기존 값은 유지하고, 실제 List 컴포넌트 이름은 변경하지 않는다. 내부 목록 gap 24px는 철회된 값이다.

## 실행

`node src/cli.mjs help`로 명령을 확인한다. 별도 패키지 설치와 API 토큰은 필요 없다.
Figma 연결은 Codex Figma MCP를 이용한다. 로컬 CLI 자체는 Figma에 접속하지 않는다.
수집 스크립트 생성 → MCP 실행 → 결과 JSON 저장 → 계획 검사 → 제작 → 실제 노드 재수집 → 검증·리포트 순서다.
