# 실측 디자인 규칙

확인일: 2026-09-28. 아래 값은 확인한 템플릿의 근거이며 모든 화면에 무조건 적용하는 전역 규칙이 아닙니다.

디자이너 문서 추가 이후의 규범은 `docs/designer-rules.md` 및 연결된 원문을 함께 따릅니다. 이 문서는 과거 실측 기록을 보존합니다. 명시된 제작 규칙과 다른 관측값(예: StepIndicator wrapper)을 그대로 복제하지 않습니다.

## 원본

- [MO 디자인 시스템](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/)
- [실제 템플릿 페이지](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=10552-10031)
- [헤더와 타이틀](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=10638-16306)
- [정보 안내](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=10580-10339)
- [카드 선택](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=14048-33663)
- [원본이 안내한 Graphic System Icon](https://www.figma.com/design/hYI7T4WKSW85FRe1c72qqk/?node-id=1160-458)

## 레이아웃

|역할|관측값|근거|
|---|---|---|
|기준 화면 폭|390|대표 화면 3개|
|기본 화면 높이|844|10638:16306; 긴 콘텐츠의 높이는 증가|
|HEADER|100 = StatusBar 44 + AppBar 56|10638:16307~16309|
|본문 좌우|20 / spacing/2xl|10638:16311, 10580:10346, 14048:33668|
|타이틀 위|24 / spacing/3xl|동일 컨테이너 paddingTop|
|BODY 하단|32 / spacing/5xl|10638:16310, 10580:10343, 14048:33667|
|카드 목록 간격|12 / spacing/lg|14048:33677|
|FOOTER|98 = StickyButton 64 + HomeIndicator 34|10638:16319~16321|
|버튼 영역 좌우 / 하단|20 / 8|I10638:16320;752:69280|

HEADER·BODY·FOOTER를 독립 컨테이너로 유지합니다. BODY의 남은 높이 처리와 FOOTER 위치는 원본 sizing mode를 확인합니다. 긴 콘텐츠를 844에 억지로 축소하지 않습니다. 화면 폭 390을 다른 기기에도 무조건 적용하지 않으며 새로운 기준 폭은 기획서와 대응 템플릿으로 정합니다.

## 타이포그래피

헤더와 타이틀의 Light / Default 예시에서 직접 확인했습니다.

|역할|서체|크기 / 행간|스타일|
|---|---|---|---|
|AppBar 타이틀|KBFG Text Medium|15 / 21|Dynamic/Body/sm∙15∙Medium|
|서브타이틀|KBFG Text Bold|15 / 21|Dynamic/Body/sm∙15∙Bold|
|페이지 타이틀|KBFG Text Bold|22 / 31|Dynamic/Title/3xl∙22∙Bold|
|설명|KBFG Text Light|15 / 21|Dynamic/Body/sm∙15∙Light|
|하단 버튼|KBFG Text Bold|18 / 25|Dynamic/Title/xl∙18∙Bold|

숫자용 스타일에는 Pretendard가 있습니다. 전체 본문을 Pretendard로 통일하지 않습니다. OS 상태바의 SF Pro Text는 원본 시스템 컴포넌트 내부 예외이며 제품 본문 서체가 아닙니다. 스타일 이름만 복사하지 말고 style key를 import하고 연결합니다. Large 모드에서는 같은 스타일의 변수 해석이 달라질 수 있으므로 Default의 실측 픽셀값을 덮어쓰지 않습니다.

## 모드

Color: Light / Dark. Type: Default / Large. 템플릿은 라이트·다크·큰글씨 영역이 구분되어 있습니다. 모드 이름을 명시하고 root에 적용하며 원본과 산출물의 해석 모드가 같은지 확인합니다. 큰글씨에서 높이 증가·줄바꿈이 일어나므로 기본 모드 스크린샷으로 대체 검수하지 않습니다.

## 발견된 불일치와 처리

- Foundations와 T01~T04 일부 페이지는 비어 있습니다. 페이지 이름을 근거로 규칙을 추정하지 않습니다.
- `10638:16311` gap=10, `10580:10346`, `10580:10427` gap=9는 변수 연결이 없습니다. 단일 자식에서는 gap이 화면에 영향을 주지 않을 수 있지만 새 자식 추가 시 의미가 생깁니다. 자동 컴파일은 차단합니다. 활성 간격이 필요한 새 조합은 동일 역할의 토큰 연결 예시를 찾아 사용합니다.
- 원본에는 로컬 목록에서 빠진 변수 ID와 remote alias가 있습니다. 로컬 변수 목록에 없다는 이유로 새 토큰을 만들지 않습니다. 참조 ID → 실제 key → 원본 승인 범위를 재검증합니다.
- 아이콘은 2026-09-28 Graphic 라이브러리로 이동했다는 원본 하이퍼링크를 확인했습니다. 새 아이콘은 해당 System Icon 키를 사용합니다. 기존 컴포넌트의 이전 아이콘 의존성이 남아 있으면 출처 확인 후 별도 기록하며 임의 교체하지 않습니다.
- 카드 예시 PNG의 실제 상품 이미지는 배치 참고용입니다. 산출물은 사용자 지시에 따라 이미지 영역만 표시합니다.

이 목록의 예외는 사용자의 토큰 전용 조건을 완화하는 승인이 아닙니다.
