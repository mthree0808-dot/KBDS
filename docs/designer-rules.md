# 디자이너 규칙의 적용과 검수

원본: [UI Design & Code Generation Rules](sources/designer-ui-rules.md). 사용자 제공 문서를 내용 변경 없이 보존했습니다. 이 문서는 실행을 위한 색인·해석이며 원문 전체 읽기를 대체하지 않습니다.

## 적용 우선순위와 출처

1. 사용자의 해당 작업 명시 지시 및 기존 제약(주어진 컴포넌트·토큰만 사용, 이미지는 영역만, DS 아이콘 사용).
2. 디자이너 원문의 상황별 명시 규칙. 일반 규칙보다 완료·빈 상태·바텀시트 등 구체적 규칙을 우선합니다.
3. Figma 템플릿 실측값: 문서에 없는 배치·서체·컴포넌트 사용 맥락을 보완합니다.

Figma의 실제 component key, Component Properties 정의, variable/style key는 구현 가능 여부의 기준입니다. 문서의 속성/토큰이 없거나 의미가 다르면 이름을 추측하거나 새로 만들지 말고 원본을 재조회합니다. 그래도 해결되지 않으면 해당 부분을 차단하고 차이를 보고합니다. 동일한 의미로 매핑되는 경우 정확한 실제 키와 근거를 남깁니다.

원문의 `https://your-design-system-link.com`은 자리표시자입니다. 조회 대상으로 사용하지 않습니다. 실제 기준은 MO 파일 `09eGMNTNnkE0CTxPdr7lnk`와 그 파일이 연결한 Graphic 라이브러리입니다. 문서 제목에 Code Generation이 있어도 별도 요청 없이 앱 코드를 생성하지 않습니다. 신규 스타일을 먼저 확인하라는 문장은 신규 스타일 생성 허가가 아닙니다.

## 화면과 구조 — 원문 §2, §5

|규칙 ID|적용 상황|필수 확인|
|---|---|---|
|D01|화면 이름|기획서 `{…}` 명칭으로 `화면ID_명칭`. 원문의 전제처럼 ID가 비어 있으면 `화면ID`를 그대로 사용하고 임의 ID를 만들지 않음. 실제 ID가 있으면 그것을 사용하고 매핑 기록|
|D02|일반/완료 화면|폭 390, Vertical. 내용이 844 이내이면 화면 높이 Fixed 844 + BODY Fill. 초과하면 화면 높이 Hug + BODY Hug|
|D03|일반/완료 루트|직계 자식 `## HEADER`, `## BODY`, `## FOOTER`, 모두 Vertical Auto Layout|
|D04|HEADER / FOOTER|HEADER: StatusBar → AppBar. FOOTER: CTA 있으면 StickyButton → HomeIndicator, 없으면 HomeIndicator만|
|D05|BODY|padding-bottom `spacing/5xl`=32. StepIndicator는 BODY 최상단 직접 자식, Container 없음. HEADER 직후 Infobox / FullWidth도 BODY 직접 자식|
|D06|바텀시트|390×844 Auto Layout. Dimmed(전체 크기, Absolute, `background/overlay/dimmed`) → BottomSheet → StatusBar(Absolute, iOS/light, 최상단) → HomeIndicator(최하단)|
|D07|선택 바텀시트|BottomSheet > Item / BottomSheet > Slot > Container 1 > List. gap `md`=8, 기획 항목 1:1 순서 보존. 선택 항목 hasSuffix=true, Slot-Suffix > Item / Suffix의 variant=checkMark|

StepIndicator와 FullWidth가 동시에 있을 때의 서로 간 순서는 원문에 명확하지 않습니다. 해당 와이어프레임/대응 템플릿으로 확인하고 그래도 충돌하면 그 화면의 순서를 확인받습니다. 독립 배치는 wrapper 제외를 뜻하며 원본 컴포넌트 내부 Auto Layout을 해제하라는 뜻이 아닙니다. Absolute는 문서에 명시된 바텀시트 오버레이에 한정하며 다른 화면으로 확대하지 않습니다.

## 컨테이너·간격·속성 — 원문 §3, §4

간격 이름은 실제 `spacing/<이름>` 변수 key로 매핑합니다. 0만 토큰 없이 허용합니다. 섹션 간격은 wrapper의 padding-top으로 적용하고 margin이나 BODY 공통 gap으로 대체하지 않습니다. 내부 목록 gap은 아래의 명시적 규칙을 사용합니다. Container 좌우는 기본 `2xl`=20, 아래 패딩은 0 또는 컴포넌트 규격을 유지하며 BODY의 32는 별도입니다. BODY의 wrapper는 위에서부터 `Container 1`, `Container 2` …로 명명합니다.

|규칙 ID|상황|설정|
|---|---|---|
|D08|HEADER 다음 Title / Page, 데이터 Box, Title+Inputs|Container padding-top `3xl`=24|
|D09|HEADER 다음 검색 인풋|padding-top 0|
|D10|HEADER 다음 Infobox / FullWidth|wrapper 없음, 위 간격 0. 다음 Container padding-top `5xl`=32|
|D11|연속 InputField|하나의 Container, gap `2xl`=20|
|D12|SegmentedControl + InputField(date-date)|두 요소를 Auto Layout `Group`으로 묶음|
|D13|연속 Card / Surface|하나의 Container, gap `lg`=12|
|D14|일반 수평 DataList|layout=split, size=14. 위/아래 Divider / Horizontal(thickness=1px, tone=tertiaryMuted, length=full), 전체 Container gap `xl`=16|
|D15|DataList 직후 공지|TextList / Unordered, Container padding-top `lg`=12|
|D16|Form 도중 Accordion|Container padding-top `2xl`=20|
|D17|TextList size|Infobox / Card·Card·알려드립니다 Accordion 내부는 14, 일반 본문은 16|
|D18|완료 화면 Feedback|BODY 최상단 Container 1, 좌우 `2xl`=20, 위 `6xl`=40. Item / Feedback 아이콘 status-circleCheck|
|D19|완료 화면 DataList|선택적 Title / Element → Divider(1px, quaternary, full) → DataList(split,14). Container 내부 gap `lg`=12, 후속 동일 그룹 padding-top `3xl`=24|
|D20|Title / Page 직후 단일 공지|Infobox / Solid(size=medium,status=warning,hasSuffix=true). Container 위 `5xl`=32, 다음 Container 위 `3xl`=24|
|D21|하단 공지 카드|Infobox / Card, Container 위 `5xl`=32. Title Area·Slot-Contents·Button Area를 기획에 따라 노출하고 Slot-Contents에 내용 배치|
|D22|하단 알려드립니다|Divider(10px,tertiaryMuted,full) + Accordion(type=basic,variant=standard,size=medium,hasPrefix=true, Item / Prefix Icon=solid-info-circle). 묶은 Container 위 `5xl`=32|
|D23|Title / Page 다음 Empty State|Feedback variant=small, Container 위 `7xl`=48|
|D24|알아두세요 Box|DS의 라운드/배경 유지. 내부 타이틀↔불릿 목록 간격 `lg`=12, 목록 항목 gap `md`=8|

간격 스케일: 3xs=1, 2xs=2, xs=4, sm=6, md=8, lg=12, xl=16, 2xl=20, 3xl=24, 4xl=28, 5xl=32, 6xl=40, 7xl=48, 8xl=80. Divider의 10px는 컴포넌트 thickness 명세이며 spacing=10 토큰을 만들라는 뜻이 아닙니다. FullWidth 및 전체 폭 Divider의 wrapper 좌우 패딩은 실제 대응 템플릿과 컴포넌트 폭 규칙을 함께 확인합니다.

## 텍스트 — 원문 §1

|규칙 ID|상황|설정|
|---|---|---|
|D25|상태/피드백 의미 강조|적합한 `text/status/*` 변수|
|D26|일반 강조|적합한 `text/accent/*` 변수|
|D27|문장 내 링크|링크 구간만 `text/neutral/secondary` + 동일 폰트 계열 Bold Text Style + Underline + Offset 25%|

실제 폰트·텍스트 스타일 key와 구간별 스타일을 확인합니다. 링크 때문에 문장 전체를 굵게 하거나 밑줄을 적용하지 않습니다. 25%를 25px로 바꾸지 않습니다. underline offset API 지원이 없으면 검수 완료로 선언하지 말고 미지원 사실을 기록합니다.

## 기존 기록과의 차이 / 실행기 지원 범위

|차이|현재 적용|
|---|---|
|실측 정보 안내에서 StepIndicator에 Container가 있었음|D05의 독립 배치 적용, 실측 JSON은 수정하지 않음|
|기존 생성기 root 이름은 MO/runId|D01이 산출물 화면 이름 기준. runId는 receipt로 추적. 현재 생성기를 그대로 실행하면 이름 규칙을 만족하지 않음|
|기존 검증기는 참조 값과의 일치를 요구|문서에 따른 변경을 원본 snapshot에 덮어쓰지 않음. 변경 의도·규칙 ID·노드 ID를 기록하고 전용 구현/검증 필요|
|기존 생성기/검증기의 Absolute 제한|D06은 허용된 디자인 패턴. 현재 일반 컴파일러가 지원하지 않으므로 전용 제작·검증 필요|
|기존 수집기는 underline offset을 수집하지 않음|D27은 추가 API 조회 또는 Figma 인스펙터 근거 필요. 기존 수집 결과만으로 PASS 금지|
|SLOT·중첩 속성과 상황별 간격|명시 규칙은 필수. 현재 CLI가 모든 규칙을 자동 판정하지 않으므로 작업별 추가 검수 필수|

위 표는 디자인 규칙을 완화하지 않습니다. 문서 반영과 자동 생성기 기능 구현은 구분합니다. 이번 추가는 기본 지침·검수 절차 반영이며, 모든 규칙이 CLI에 자동 구현되었다고 보고하지 않습니다. 기존 검사 실패를 무시하거나 PASS로 고쳐 적지 않습니다. 지원하지 않는 경로는 구현·검증을 완료하기 전 REVIEW_REQUIRED/BLOCKED로 남깁니다.

## 작업별 필수 기록

`runs/<run-id>/designer-review.md`를 만들고 원문 파일 해시, 읽은 문서, 화면 분류, 이름, 각 D01~D27의 적용 여부를 기록합니다. 각 행은 `규칙 ID | 적용/비적용 및 이유 | 기획 노드 | 결과 노드 | 실제 속성·토큰 key | 검사 근거 | PASS/FAIL/NOT_RUN` 형식으로 작성합니다. 적용 규칙은 실측/속성 조회/스크린샷 등 해당 규칙을 검증할 수 있는 증거가 있어야 PASS입니다. 비적용 규칙은 이유를 적고 N/A로 남깁니다.

디자이너 문서와 템플릿의 차이는 `원문 규칙 → 관측값 → 적용값 → 이유 → 구현/검증 상태`로 기록합니다. 최종 리포트에 이 파일을 연결하고 FAIL/NOT_RUN, 미지원 API, 미해결 매핑을 포함합니다.
