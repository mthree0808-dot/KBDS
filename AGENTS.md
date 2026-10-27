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

- 2026-10-27 Popup 레이어명 최종 원복: Popup > Slot 내부 3단 영역은 Header, Body, Footer로 명명한다. 약관 상세(PDF)·키패드·패턴·일반 풀팝업 모두 적용하고 종전 ## HEADER/## BODY/## FOOTER로 변경하라는 지시는 철회한다. 일반·완료 화면 아트보드 직계의 ## HEADER/## BODY/## FOOTER는 유지하며 Popup 내부 명칭 외 구조·속성·배치는 변경하지 않는다.
- 2026-10-27 문자·숫자 데이터 서체: 금액 입력 등 문자와 숫자가 명확히 분리되면 문자는 KBFG Text, 숫자는 Pretendard를 사용한다. 숫자 전용 텍스트·입력값도 Pretendard이며 숫자 구분자·소수점은 숫자와 같은 서체, 별도 단위·항목명은 KBFG Text다. 일반 문장 전체를 임의 전환하지 않는다. 이 범위는 원형 서체 상속의 사용자 승인 예외이며 최신 라이브러리의 역할·크기·굵기별 스타일·서체 변수를 적용하고 Pretendard Variable로 대신하지 않는다. 다른 타이포그래피 속성·크기 모드·인스턴스 연결·공개 옵션을 보존하고 구간별 서체·스타일·변수 및 입력/variant 전환 결과를 검수한다.
- 2026-10-27 v0.95 약관 갱신: 사용자 지정 상세31888:30615와 약관6개 사례31061:78151/78179/78292/78209/78333/78354를 승인 기준으로 적용한다. PDF 상세는 StatusBar(Auto) + Popup > Slot > Header/Body/Footer + 아트보드 직계Pagination(Absolute)이다. 일반 동의는 최신 ConsentGroup·Item / Consent의 뎁스variant/Slot·ConsentFinal로 구성하고 구형 Consent/Depth 프레임·수동 Outline Container를 새 제작에 쓰지 않는다. 자세한 분기·간격은 원문§2.G·§4를 따른다. 원형 라이브러리는 읽기 전용이며 산출물에만 적용한다.
- 모든 컴포넌트는 지정 MO 라이브러리 `09eGMNTNnkE0CTxPdr7lnk`의 현재 원형·공개 속성·Slot·텍스트 스타일/변수 연결을 직접 확인하고 import한 새 인스턴스로 제작한다. 주변 화면·기획안·이전 산출물의 컴포넌트나 override를 복제하여 원형으로 삼지 않는다. 기획은 내용·순서·상태·행동의 기준이며 승인 예시는 명시된 배치·위계·간격의 근거다. 검증된 스크립트·캐시는 탐색과 절차만 재사용하며 최신 원형 조회를 대신하지 않는다. 원형 내부 Hug/Fill/Fixed와 속성 전환을 유지하고 Slot·텍스트 구간까지 검수한다. 원본 확인이나 전환 검수에 실패하면 주변 화면으로 추정 대체하거나 정상 완료로 보고하지 않는다.
- 디자인 시스템과 해당 화면에 맞는 템플릿을 실제로 읽은 후 제작한다. `knowledge/`는 시점별 캐시다. 매 작업에서 사용할 원본 노드와 토큰을 다시 조회한다.
- 원본 라이브러리와 기획서는 읽기 전용으로 취급한다. 사용자가 지정한 산출물 URL의 범위만 수정한다.
- 컴포넌트 인스턴스와 원본의 토큰·스타일만 사용한다. 컴포넌트 조합은 허용한다. 신규 컴포넌트/토큰, detach, 임의 폰트·색상·간격, 외부 아이콘은 금지한다.
- 박스는 역할로 구분한다. 이체·상세 이동·체크/라디오·상품/계좌/항목 선택처럼 박스 내부 또는 박스 전체에 동작이 있으면 `Card / Surface`, 사실 데이터 표시만 하면 `Data Block`, 기존 Infobox에 해당하지 않는 설명·안내·주의·상태 전달은 `Text Box`를 쓴다. 박스 바깥 형제 `Button Area`의 버튼만으로 Data Block을 Card로 바꾸지 않는다.
- `Data Block`과 `Text Box`는 승인된 예시와 DS 토큰·스타일·하위 컴포넌트를 사용한 Auto Layout 프레임으로 직접 구성할 수 있다. 이는 신규 라이브러리 컴포넌트 생성이나 detach 허용이 아니다. 콘텐츠 박스 이름과 내부 패딩은 페이지 `Container [순번]` 규칙과 구분한다.
- 아웃라인형과 `surface/neutral/tertiary-muted` 회색 배경·무테형은 주변 위계·밀도와 테두리 중첩을 보고 유연하게 선택한다. 역할명은 유지하며, `Card / Surface`의 스타일 선택은 원본 공개 속성 범위에 한정한다. 상세 기준과 승인 예시는 원문 Box UI Rules 및 `docs/designer-rules.md` D28~D32를 따른다.
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
