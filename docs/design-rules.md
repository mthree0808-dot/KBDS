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

## 박스 UI 승인 예시와 실측 (2026-10-15)

사용자가 지정한 아래 네 화면을 읽기 전용으로 조회하고 박스 스크린샷과 토큰 연결을 확인했습니다. 2026-09-28 템플릿과 구분되는 후속 승인 사례입니다. 역할·스타일 선택의 규범은 [원문 Box UI Rules](sources/designer-ui-rules.md)와 [D28~D32](designer-rules.md)를 따릅니다.

|화면 / 실제 박스|역할·동작 경계|관측한 형태|
|---|---|---|
|[계좌 선택](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2659-18345) / `2659:18395`, `2661:26306`|`Card / Surface` 인스턴스. 상세 이동과 이체 동작의 예시|원본 Slot·Affix 구조 유지. 패딩 20, 라운드 20. border `border/neutral/primary-muted`는 Card 원형 값이므로 Data Block의 border로 일괄 덮어쓰지 않음|
|[고객정보 확인](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2659-18558) / `2659:18577`|`Data Block` 프레임. 부모님 기본정보 표시. 수정 버튼은 박스 밖 형제 `Button Area`|Vertical, 패딩 20, 라운드 20, 타이틀↔DataList Group gap 20, DataList Group 내부 gap 12. Fill `surface/neutral/quaternary-muted`, border `border/neutral/secondary-muted` + `stroke/md`|
|[상담센터 안내 — 아웃라인](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2659-18992) / `2659:19033`|`Text Box` 프레임. 연락처를 포함하나 주목적은 설명·안내|Vertical, 패딩 20, gap 16, 라운드 14. Fill `surface/neutral/quaternary-muted`, border `border/neutral/secondary-muted`. 원본 strokeWeight 1은 관측되나 박스의 strokeWeight 변수 연결은 미관측이므로, 새 제작에서는 원문이 지정한 `stroke/md`를 명시적으로 연결|
|[상담센터 안내 — 회색 무테](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2659-19168) / `2659:19188`|`Text Box` 유지. 같은 화면의 부모님 기본정보 아웃라인 Data Block과 테두리 반복을 완화|패딩 20, gap 16, 라운드 14 유지. Fill `surface/neutral/tertiary-muted`, 외곽 `strokes: []`. 내부 Divider는 유지|

Data Block의 기존 기본 gap 16px와 위 부모님 기본정보 패턴의 20px는 구분합니다. 이 승인 패턴을 재사용할 때 20px를 적용하며 모든 Data Block의 간격을 일괄 변경하지 않습니다. 박스 색상이나 라운드만 보고 역할을 추정하지 않고, 안내 속 전화번호를 사실 데이터 박스로 오분류하지 않습니다.

### 확인한 변수 key

아래는 실제 조회한 연결 key입니다. 새 작업에서는 원본의 현재 정의와 모드를 다시 확인한 뒤 재사용합니다. 색상은 Light/Dark 모드별 alias로 연결되어 있어 관측된 흰색·회색 RGB를 고정하지 않습니다.

|토큰|key|관측값 / 용도|
|---|---|---|
|`surface/neutral/quaternary-muted`|`13df17658e86efada0d0c1ba4402b88616a0efe1`|아웃라인 박스 및 Card의 Fill|
|`surface/neutral/tertiary-muted`|`59093c4bcca6ee8f9e5f9af90d27f568edcef5b5`|회색 배경·무테형 Fill|
|`border/neutral/secondary-muted`|`6f13cf9a41a7a40246b281a5b4a8270690e2226e`|Data Block / Text Box 아웃라인|
|`border/neutral/primary-muted`|`7ceda77ef3991dd62dd315060ac6d2fafb56834e`|참조 Card의 아웃라인|
|`stroke/md`|`74a325f74c4c0478bb096db37a311858ac4c6b7e`|1px|
|`spacing/2xl`|`5491ce4ce8c48cc4a679f8cedc426cb96bb9a141`|20px 패딩 / 승인 Data Block 예시 gap|
|`spacing/xl`|`dd4b6787bca3ceba45b9b41a16963083cacea533`|16px Text Box gap|
|`spacing/lg`|`466bd0e6b2233083a08d900e3be39f48196d1bee`|12px DataList Group gap|
|`radius/2xl`|`775b8dad73eda0c378c4bd9850b4c459c9187b9c`|20px Data Block / Card 라운드|
|`radius/lg`|`b9d31e7e721799056c4f83449ff084a697ebe489`|14px Text Box 라운드|
