# MO Figma 디자인 하네스

기획서 Figma URL과 산출물 Figma URL을 받아, 기존 디자인 시스템과 템플릿의 배치·폰트·간격을 근거로 디자인하는 **Codex + Figma MCP 작업 시스템**입니다.

이 폴더를 열고 다음처럼 요청하면 됩니다.

```text
기획서: https://www.figma.com/design/…?node-id=…
산출물: https://www.figma.com/design/…?node-id=…
이 하네스로 디자인하고 검증 리포트까지 작성해줘.
```

`AGENTS.md`가 작업 규칙을 전달하고 `docs/workflow.md`가 분석 → 계획 → 제작 → 검증 → 리포트 순서를 정합니다. CLI는 Figma를 직접 호출하지 않으며, Codex가 연결된 Figma MCP로 스크립트를 실행합니다. 별도 API 토큰이나 npm 패키지 설치는 필요 없습니다.

디자이너 제공 문서는 `docs/sources/designer-ui-rules.md`에 원문 그대로 보존했습니다. 매 작업에서 원문과 `docs/designer-rules.md`를 먼저 읽도록 연결했습니다. 상황별 규칙 D01~D27의 적용 및 검수 결과는 작업 폴더의 `designer-review.md`에 남깁니다. 새 문서의 모든 규칙이 기존 CLI에 자동 구현된 것은 아니며, 지원 차이와 추가 검수 항목은 실행 규칙에 명시했습니다.

## 이번에 반영한 핵심

- 이름이나 비슷한 모양이 아닌 **원본 component key / variable key / style key**를 기록합니다.
- 템플릿의 HEADER / BODY / FOOTER와 역할별 여백을 먼저 선택합니다.
- 기획 요구사항, 참조 노드, 선택 근거, 제작 노드를 연결합니다.
- 이미지 사용, 외부 컴포넌트, 토큰 연결 누락, 간격 변경, 기획 누락을 검사합니다.
- 구조 검사와 스크린샷 시각 검수를 모두 요구합니다. 미검수는 통과가 아닙니다.
- 오류·부분 성공·미지원 구조를 숨기지 않고 리포트에 기록합니다.

## 파일

|경로|역할|
|---|---|
|`AGENTS.md`|이 폴더의 디자인 작업 규칙|
|`docs/sources/designer-ui-rules.md`|사용자가 제공한 디자이너 원문, 변경 없이 보존|
|`docs/designer-rules.md`|필수 실행 규칙·우선순위·상황별 검수·지원 차이|
|`docs/workflow.md`|작업별 실행 절차와 복구 규칙|
|`docs/design-rules.md`|실측한 배치·폰트·간격과 예외|
|`knowledge/registry.json`|원본 변수 584개, 텍스트 스타일 114개, 컴포넌트/세트 1,273개|
|`knowledge/templates.json`|화면 유형·모드별 실제 템플릿 노드 목록|
|`knowledge/reference-header.json`|대표 템플릿 42개 노드의 전체 수집 결과|
|`knowledge/screenshots/`|직접 확인한 대표 템플릿 PNG 3개|
|`src/`|수집·계획 검사·제작 스크립트 생성·산출물 검사·리포트 CLI|
|`test/`|위반·누락·잘림·변경을 차단하는 회귀 테스트|
|`reports/setup-report.md`|이번 구축의 근거·오류·검증 범위|
|`runs/<run-id>/`|개별 디자인 작업의 계획·증거·리포트|

## 명령

Node.js 22 이상이 필요합니다. 이 환경에서는 PowerShell의 npm.ps1 실행이 제한되어 있으므로 `node` 명령을 그대로 사용하면 됩니다.

```powershell
node --test
node src/cli.mjs help
node src/cli.mjs catalog "Title / Page"
node src/cli.mjs catalog "spacing/"
node src/cli.mjs init task-001 "기획서 노드 URL" "산출물 페이지 또는 프레임 URL"
```

컴파일러는 참조 자동 레이아웃, 기존 인스턴스, 단일 스타일 텍스트를 지원합니다. SLOT 편집, 복잡한 중첩 override, 절대 배치, 혼합 스타일, 이미지 포함 인스턴스는 별도 MCP 작업과 같은 수준의 검증이 필요합니다. 모호한 구조를 자동으로 비슷하게 그리는 기능은 제공하지 않습니다.

현재 원본 읽기와 수집기는 실제 Figma에서 확인했고, 로컬 회귀 테스트를 통과했습니다. **기획서와 산출물 URL이 아직 없어 실제 화면 제작의 종단간 검증은 미실행**입니다. 전체 템플릿을 모두 깊이 분석한 것은 아니며, 작업마다 선택한 화면을 다시 수집합니다.
