# 작업 실행 절차

## 0. 필수 기본 자료 읽기

매 작업에서 `docs/sources/designer-ui-rules.md` 원문 전체 → `docs/designer-rules.md` → `docs/design-rules.md`를 읽습니다. 디자이너 문서의 일반/완료/바텀시트 구분, 이름, 구조, 상황별 간격·속성·텍스트 규칙을 계획의 기준으로 삼습니다. 원문의 예시 URL은 사용하지 않습니다. 실제 Figma 원본을 확인하는 절차는 그대로 유지합니다.

`runs/<run-id>/designer-review.md`에 읽은 자료와 원문 해시를 기록하고 D01~D27 적용표를 작성합니다. 파일 생성 전 입력이 없으면 해당 계획을 대기 상태로 설명하고 이번 작업의 가능한 분석을 진행합니다.

## 1. 입력과 범위

기획서와 산출물의 node-id 포함 URL을 파싱합니다. 페이지 URL이면 하위 화면 목록부터 읽고 화면 범위를 확정합니다. 라이브러리와 기획서는 수정하지 않습니다. 산출물 노드가 기획서의 하위인지도 Figma 계층에서 확인합니다. 현재 파일 키가 같은 두 URL도 자동으로 안전하다고 보지 않습니다.

`node src/cli.mjs init <run-id> <wireframe-url> <target-url>`로 작업 폴더를 만듭니다. 아직 URL이 없으면 사용 가능한 분석·정비를 진행하고, 실제 제작은 입력이 제공된 이후 시작합니다.

## 2. 원본 재조회와 기획 해석

`knowledge/registry.json` 및 `knowledge/templates.json`에서 후보를 찾고 이번 작업에 사용할 원본 노드·키·속성 정의를 다시 조회합니다. 캐시는 자동 갱신되지 않습니다. 원본과 다른 값은 캐시를 업데이트하고 계획 해시도 다시 생성합니다. 잘린 JSON은 폐기하고 페이지 크기를 줄여 재조회합니다.

각 화면의 문구, 순서, 선택 상태, 필수/선택, 버튼, 오류·빈 상태, 이미지 영역, 보조 설명을 requirement로 만듭니다. 각각 기획서 sourceNodeId를 기록합니다. 기획서에서 쓰인 mainComponent key를 먼저 사용합니다. 이름이 같거나 비슷한 모양만으로 매핑하지 않습니다. 사용된 원본 컴포넌트 정의가 변경됐다면 변경을 보고합니다.

화면 제작에는 설치된 figma-use와 figma-generate-design 스킬을 적용합니다. 현재 프로젝트의 Code Connect가 없으면 없음으로 기록하고 기존 화면/기획서 인스턴스에서 매핑합니다. 마지막에 원본 라이브러리로 제한한 검색을 사용합니다.

## 3. 템플릿 선택과 측정

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

receipt의 rootId와 pageId로 실제 산출물을 전체 재수집합니다. 계획 자체를 산출물 증거로 재사용하지 않습니다. `actual.json`을 만들고 다음을 직접 확인합니다.

- 계층, component/variant key, 토큰 연결, style key, 실제 폰트·행간·자간, 모드
- 기획의 모든 문구/상태/화면과 디자인의 대응
- 템플릿 대비 역할별 여백, 본문 밀도, HEADER/BODY/FOOTER 배치
- 실제 이미지 없는 영역 표시와 DS 아이콘 출처
- 긴 한국어 문구의 줄바꿈, 잘림, 겹침, 비정상 크기, 스크롤/하단 버튼

템플릿과 산출물 PNG를 저장하고 **직접 열어 비교**합니다. `visual.json` 각 항목의 PASS/FAIL과 관찰 근거, 검수자, 두 PNG 경로, 현재 actual/reference 해시를 기록합니다. 숫자 검사만으로 visual PASS를 작성하면 안 됩니다. 시각 수정 뒤에는 다시 actual과 PNG를 수집하고 해시를 갱신합니다. 변하지 않은 결과를 반복 캡처할 필요는 없습니다.

```powershell
node src/cli.mjs verify runs/task-001/plan.json runs/task-001/reference.json runs/task-001/actual.json runs/task-001/receipt.json runs/task-001/visual.json runs/task-001/report.md
```

자동 검사는 전체 디자인 적합성을 증명하지 않습니다. 픽셀 차이 점수나 범용 겹침 판정기를 제공하지 않으며 스크린샷을 확인한 사람/에이전트의 시각 검수가 필수입니다. visual 기록은 자기 선언 가능한 증거이므로 검수자의 책임과 PNG를 함께 보존합니다.

## 7. 리포트와 완료

리포트에는 요구사항 매핑, 템플릿/컴포넌트 선택 이유, 토큰·폰트 사용 근거, 출력 링크/ID, 실행 오류·수정 내역, 남은 차이, 미검증 사항을 담습니다. CLI의 기본 report에 실제 작업의 오류 이력과 수정 전후 설명을 추가합니다.

완료 조건은 요구사항 누락 없음, 정책 위반 없음, 원본 근거 확보, 현재 결과 시각 검수 통과입니다. 하나라도 남으면 BLOCKED 또는 REVIEW_REQUIRED로 전달하고 이유를 명시합니다. 런타임 예외로 verify 자체가 실패해도 오류 리포트를 별도 작성합니다.

추가 완료 조건: `designer-review.md`의 적용 규칙 모두 PASS, 비적용 규칙의 이유 기록, 미지원/충돌의 해결 근거 확보. 최종 리포트에 이 문서를 연결합니다. 기존 CLI PASS만으로 디자이너 규칙까지 통과했다고 보고하지 않습니다.
