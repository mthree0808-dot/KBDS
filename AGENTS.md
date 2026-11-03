# MO Figma 공통 제작·검수 지침

## 시작점과 우선순위

- 사용자 최신 지시를 우선한다. 디자인 규칙의 단일 기준은 `docs/sources/designer-ui-rules.md`이며, 작업 화면 유형에 해당하는 절과 승인 근거를 읽는다. `docs/history/`는 변경 이력 보존용이고 현재 실행 지침이 아니다.
- 상세 문서를 이 파일에 계속 복제하지 않는다. 이 파일은 16KiB 이내로 유지한다. 공통 검사 사용법·검사 범위는 `docs/screen-guard.md`, 실행 순서는 `docs/workflow.md`를 따른다.
- 원본 라이브러리 `09eGMNTNnkE0CTxPdr7lnk`와 기획서는 읽기 전용이다. 사용자가 지정한 작업 파일·범위만 수정한다. Figma 작업 전에 `figma-use`, 화면 제작 시 `figma-generate-design` 스킬을 읽는다.

## 제작과 속도

- 단일 화면은 3분 내 완료를 목표로 한다. 독립 조회·import는 묶고, 같은 작업에서 확인한 최신 자산과 제작 절차를 재사용한다. 통과 후 변경 없는 항목을 반복 조회·캡처하지 않는다. 3분을 넘으면 원인과 남은 작업을 짧게 알린다.
- 컴포넌트는 지정 MO 라이브러리의 현재 원형에서 직접 import한다. `knowledge/`는 시점별 캐시이며 원본 확인을 대체하지 않는다. 주변 화면·이전 제작본의 override를 새 컴포넌트 기준으로 복제하지 않는다.
- 기획의 원문·순서·불릿·번호·강조·링크·선택/비활성 상태를 확인한다. 페이지 ID 필드가 실제로 있을 때만 `실제페이지ID_화면명`, 공란이면 `화면ID_화면명`을 사용한다. 요구사항 ID나 흐름명을 페이지 ID로 추정하지 않는다.
- detach·새 라이브러리 컴포넌트/토큰·임의 색상/폰트/간격·이미지 평탄화를 금지한다. 승인된 Data Block/Text Box 구성과 편집 가능한 더미 Image Area는 상세 MD의 예외대로 적용한다. 공개 옵션과 원형의 Hug/Fill·variant 전환 동작을 보존한다.

## 필수: 제작 호출에 공통 검사를 포함

1. 일반 컴파일러 `build`는 기본으로 공통 검사를 포함한다. 복잡한 Slot·중첩 구성용 전용 스크립트도 반드시 `node src/cli.mjs guard-build <build.js> <file-key> <page-id> <output.js> [contract.json]`으로 감싼 뒤 실행한다.
2. 제작 함수는 실제 `rootId` 또는 `mapping[].id`를 반환한다. 반환된 화면들만 같은 MCP 호출에서 한 번씩 수집하고 `src/screen-guard.mjs`로 검사한다. 필수값마다 추가 MCP 호출을 만들지 않는다.
3. 기획 원문·선택한 최신 component key·공개 옵션·특정 레이아웃 요구는 `contract.checks`의 실제 경로로 명시한다. 경로/옵션 키를 추정하지 않는다. 자동 판정이 어려운 MD 규칙은 해당 작업의 필수 직접 검수 항목으로 남긴다.
4. `BLOCKED` / `BLOCKED_REQUIRES_FIX` 또는 오류가 있으면 완료 보고를 금지한다. 오류 노드와 영향받는 부모만 수정한 뒤 해당 화면을 재검사한다. `STRUCTURE_OK_REQUIRES_VISUAL_REVIEW` / `BUILT_REQUIRES_REVIEW`는 시각 검수 완료가 아니다.
5. 실제 스크린샷으로 문구·아이콘·줄바꿈·잘림·겹침·위계를 한 번 확인한다. 관련 수정이 없으면 반복하지 않는다. 일반 `verify`도 같은 공통 검사와 현재 구조/스크린샷 증거를 요구한다. 별도 보고서 파일은 요청이 있을 때만 작성한다.

## 누락을 막는 핵심 확인

- PDF: `Body > Title Area`와 `Body > body`는 각각 `background/neutral/light-gray` Fill을 연결·노출한다. 흰색 아트보드·PDF Document와 구분한다. BG 변수 key, Paint visible/opacity, 레이어 노출과 렌더까지 확인한다.
- CTA: Label 문구는 원형 가로 Hug / WIDTH_AND_HEIGHT를 유지한다. 고정폭 49px 등으로 덮어쓰지 않는다.
- 서체: 판정 단위는 실제 Text다. 숫자·숫자 서식만 있으면 Pretendard, 문자와 섞인 한 Text는 KBFG Text다. 하이픈이 있는 전화번호도 숫자다. 더미 라벨은 편집 가능한 Pretendard SemiBold를 보존한다.
- 반복 항목은 실제 `[명칭] Group`으로 묶는다. Text·TextList 혼합은 각각 묶고 `Text / TextList Group`, 그 위 제목은 `Title / Contents`로 재판정한다. 구조 변경 후 영향을 받는 부모도 검사한다. 원형 내부 레이어를 일괄 재명명하지 않는다.
- Title / Section 뒤16px(바텀시트 텍스트12px 예외), Title / TextList Group 간24px, Tab→Infobox / Card16px, 일반 Tab 후24px 등 해당 조합의 최신 간격을 구분한다. 숫자 값과 spacing 토큰을 같이 검사한다.
- Popup 내부는 Header/Body/Footer다. 일반 화면은 직계 ## HEADER/## BODY/## FOOTER를 기본으로 하며 사용자 승인 Footer 예외를 따른다. 하단 약관은 `Footer > ConsentFinal / StickyButton` 안에 `ConsentFinal` 래퍼(좌우20px) > 실제 ConsentFinal 인스턴스, 실제 StickyButton을 순서대로 배치한다. 그룹은 Vertical·Fill/Hug·AUTO·padding0·gap24이며 원문 「하단 고정 약관과 CTA의 복합 그룹」을 따른다. 참조4023:518에서는 이 그룹만 기준으로 삼고 다른 영역·문구·선택/버튼 상태는 기획대로 적용한다.
- 공통 오류·대표전화·응답코드 Dialog는 원문 「공통 오류·대표전화·자세히보기 Dialog 최종 틀」을 따른다. Dialog Area Fill/Fill·중앙 정렬·상단 HomeIndicator 높이 보정, 실제 Dialog Fixed320/Hug, Item Group(8)과 대표전화 Title / Text(4)의 Slot 간격16, Dialog 형제 간격20, 번호 Pretendard SemiBold16/primary, 펼친 solid/small Accordion을 적용한다. 승인 화면4029:1355 삭제 후에도 독립 명세를 쓰며 예시 문구·코드를 전역 복사하지 않는다.
- HomeIndicator elevated Fill은 Dialog에서만 숨기고 다른 화면에서는 노출한다. 바텀시트는 Dimmed·StatusBar만 Absolute, BottomSheet·HomeIndicator는 AUTO다. 오버레이 뒤의 이전 화면을 재현하지 않는다.
- 알려드립니다는 항상 펼친다. 긴 약관 전체 노출과 고정 PDF 뷰어는 별도 유형으로 구분하고 상세 MD의 높이·Pagination·Footer 규칙을 따른다.
- 긴 약관 PDF의 마지막 콘텐츠와 Footer는 실제 간격0px로 붙인다. PDF Document 하단 패딩은 Footer 높이−body 하단 패딩으로 계산한다(승인 예126−12=114px). 이전146px·추가32px 공백을 복제하지 않고 마지막 문구의 비가림도 확인한다.

## 규칙 변경 시 유지보수

- 새 사용자 규칙을 상세 MD에 반영하고, 기계적으로 판정 가능한 항목은 `knowledge/screen-rules.json` / `src/screen-guard.mjs`와 재발 방지 테스트를 함께 갱신한다. 문서만 바꾸고 자동 검사까지 구현했다고 보고하지 않는다.
- 코드 변경 후 `node --test`, `git diff --check`를 실행한다. 실패·미지원·미검사를 숨기지 않으며 문서의 지시, 자동 검사의 지원 범위, 실제 화면 수정 여부를 구분한다.
