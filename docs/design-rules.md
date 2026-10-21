# 실측 디자인 규칙

## 작업자 프로퍼티 패널 편집 가능성 — 사용자 확정 (2026-10-21)

사용자는 이후 작업자가 우측 프로퍼티 패널에서 variant 등 원본 옵션을 바꿔도 정상 반영되는 산출물을 요청했습니다. 이는 Chip만의 교정이 아닌 전체 컴포넌트 전달 조건입니다. 실제 인스턴스·공개 옵션·내부 연결을 유지하고, 실제 콘텐츠 적용 후 유효한 옵션 조합의 양방향 전환에서 실제 내부 타입과 시각 상태·배치·문구·선택 상태·서체·변수를 원본 규칙과 대조합니다. 아래 Chip 실패 기록은 여전히 미해결이며 이 규칙 추가가 화면 동작 복구의 근거는 아닙니다. 원본 미지원 동작이나 Slot/도구 제약은 구분하여 알리고 정상 동작으로 보고하지 않습니다.

## Chip Slot override와 동작 보존 검증 (2026-10-21)

대상 `zNwpdAWcBMOM5ExkiBUoGn / 2158:8074`의 Chip `2158:8561`은 Slot을 비운 뒤 SolidChip 3개를 넣은 상태입니다. 원본 MO `09eGMNTNnkE0CTxPdr7lnk / 1027:61807`은 single에 SolidChip, multiple에 LineChip을 정의합니다. 새 원본 인스턴스를 아무 수정 없이 multiple로 바꾸면 LineChip으로 전환됐지만, 작업본의 맞춤 Slot은 SolidChip으로 유지돼 실패했습니다.

별도 임시 인스턴스에서 기본 아이템의 문구만 변경, selected만 변경, 마지막 항목 visible만 변경하는 세 경우를 분리해 검사했습니다. 현재 도구 경로에서는 세 경우 모두 multiple 전환 뒤 Slot 내부 SolidChip이 유지됐습니다. 임시 인스턴스는 모두 삭제했고 이 시험으로 실제 화면의 동작을 복구했다고 처리하지 않았습니다. 따라서 '새 인스턴스에 기본 아이템만 수정하면 해결된다'는 가정은 채택하지 않습니다. 이 결과만으로 Figma 전체의 동작이나 원본 라이브러리 변경 필요성까지 단정하지 않습니다. 실제 문구·상태를 적용한 인스턴스의 왕복 전환이 통과해야 원본 동작 보존 PASS입니다.

## 단일 InputField 오토레이아웃 명명 재확정 (2026-10-20)

승인 교정 화면 `zNwpdAWcBMOM5ExkiBUoGn / 2141:10091`에서 단일 입력을 감싼 프레임 `I2141:10093;752:55797;2141:10499`를 `InputField Group`에서 `InputField`로 수정했습니다. Vertical Auto Layout / 390×86px / 단일 자식 InputField 인스턴스 `I2141:10093;752:55797;2141:10534`와 기존 위치·패딩·크기·계층은 유지했습니다. 필요에 의해 단일 컴포넌트를 감싼 래퍼는 컴포넌트와 같은 이름을 쓰며, Group은 복수 반복에만 사용합니다. Full-Width·일반 화면·바텀시트에 같은 규칙을 적용합니다.

## 은행·증권사 선택 공통 화면 최종 기준 (2026-10-20)

사용자 최종 참조는 [2101:12453](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2101-12453)입니다. 390×844 화면의 BottomSheet `2101:12482`는 현재 높이 766px / hasScrollDim true / hasStickyButton true이며, StickyButton은 CTA·SubButton false / ScrollDim true입니다. Slot은 Fill·Hug / padding 0,0,20,0 / gap 24px이고, Tab(1depth, extendable false) → GridButton(secondary/grid, 좌우 padding 20px) 순서입니다.

내부 실제 Grid `I2101:12482;2554:147808;2101:12481;2597:176253;2101:12462`의 레이어명은 현재 Container 1이지만 layoutMode는 GRID입니다. 3열 FLEX 1·1·1 / 6행 HUG / 행·열 gap 8px / 18개 아이템입니다. Item / Vertical은 secondary, padding 16px, gap 12px, Fill·Fill, hasIcon true / hasSubLabel false이며 현재 셀은 약 111.33×100px입니다. IconContainer size 36에 기관별 원본 심볼이 연결되어 있고 Label·문구는 Hug·Hug입니다. 향후 동일 유형은 이 전체 구성과 속성을 통일하여 사용하며 기획에 맞춰 항목·순서·상태·행 수를 바꿉니다. 현재 6행·18개를 다른 목록에 강제하지 않습니다. 종전 아래 `2109:3661`의 기관별 원본 key 근거는 계속 유효하되 화면 패턴의 최종 기준은 `2101:12453`입니다.

## CTA Label Hug·기관별 심볼 확정 (2026-10-20)

CTA 원본 BoxButton(primary/large) key `fa61e02668d4cdbaa3804bebdf3b37cdef9b274d`의 Label은 Hug·Hug, 내부 `버튼명` TEXT도 Hug·Hug / WIDTH_AND_HEIGHT입니다. 원형 기본 문구의 측정 폭 49px는 Fixed 지시가 아닙니다. 승인 교정 `0P0j17OPstNhC3LWjBdBGy / 72:8029`의 ‘확인’은 고정폭 49 + HEIGHT override를 제거한 뒤 원형 Hug / WIDTH_AND_HEIGHT / 자연 폭 33px로 복원했습니다. ‘다시 촬영’은 원형 Hug에서 자연 폭 71px입니다. 33·49·71px를 제작 스크립트의 고정 width로 사용하지 않고 문구만 바꿉니다. 공통 본문 텍스트 처리에서 CTA 내부 Label/버튼명은 제외합니다.

은행 선택 승인 화면 `zNwpdAWcBMOM5ExkiBUoGn / 2109:3661`은 GridButton > Slot > Grid > Item / Vertical > IconContainer(size 36)를 유지합니다. 3행 3열·행/열 gap 8px, 기획의 ‘산업’ 중복을 보존하고 IconContainer 공개 속성 `icon#1029:35`만 해당 기관의 원본 심볼로 매핑했습니다. 원본 위치는 MO 파일 `09eGMNTNnkE0CTxPdr7lnk` / F07. System Icon `1:672` / 04 로고 `18273:39357`, description `logo/bg/bank/`입니다.

|항목|원본 심볼|component key|
|---|---|---|
|KB국민|004-국민은행-bg|`969c6fc330be845f0281651764a1cdce2a699646`|
|기업|003-기업은행-bg|`1044fcdde2ac6d7659d7fa8e82984c5c710607c4`|
|농협|011-농협-bg|`ad1c6471517df99d7d7158e8213e24856592cd3f`|
|산업(두 항목)|002-산업은행-bg|`199d229be1be231878c49fdd3c6d8f0d35291d81`|
|신한|088-신한은행-bg|`83421380f7b611c5e27c06706fb7af90c1fdb304`|
|우리|020-우리은행-bg|`d4b484b9f650e51ff418efd88559dff8f6898664`|
|우체국|071-우정사업본부-bg|`2da6044e20079ff5fee0736aad13e3b2ce65ec7b`|
|하나|081-하나은행-bg|`680b8b7b88a4c678eabaf84243f1c2c3680a7dc5`|

향후 은행·증권사 선택에서도 각 기관명과 원본 심볼의 실제 key를 대조합니다. 위 최종 승인 `2101:12453`의 3열·size 36과 전체 화면 패턴을 통일 적용하며, 목록과 행 수·선택 상태는 기획에 따릅니다. 증권사에는 해당 증권사의 원본을 확인하여 적용합니다. 기본 ICON이나 다른 기관 로고를 추정 대체로 사용하지 않습니다.

## 선택형 버튼 GridButton 승인 (2026-10-20)

기준 [신분증 촬영_모바일 2074:1554](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2074-1554)의 GridButton `2071:4500`은 실제 primary/grid 인스턴스(key `e48a66fa51b31fd8e86b1703a35f07c07e3373e0`)입니다. 계층은 GridButton > Slot > Grid > Item / Vertical이며, Grid `I2071:4500;2597:176342;2071:4497`은 layoutMode GRID / 1행 2열 / gridAutoTracks ROWS / 가로 Fill·세로 Hug / 행·열 gap 8px입니다. 두 열은 각각 FLEX 1, 행은 HUG입니다. 현재 350px 폭에서 아이템은 각각 171×121px입니다.

아이템 원형 key는 `291367f54029e6b11c4ca9550c83816ca72bffe1`, 속성은 variant primary / selected false / hasIcon true / hasSubLabel false입니다. 아이콘 영역은 36px이며, 사용자 지정 모바일 주민등록증·모바일 운전면허증의 아이콘과 레이블을 보존했습니다. 기존 상위 래퍼 `2074:1878`만 GridButton / Button Area로 정리했습니다.

같은 유형은 실제 GridButton을 사용하며 Slot 안 Grid의 행·열·아이템 수와 배치 순서를 기획에 맞게 수정합니다. 현재 1행 2열, 171×121px를 다른 기획에 고정 적용하지 않습니다. 선택·비활성 상태와 폰트·변수 연결은 원형을 유지하고 Card / Surface를 병렬 배치하여 대신하지 않습니다. 셀렉트 바텀시트 List 등 별도 전용 패턴은 유지합니다.

## InputField 필수·선택 및 하단 알려드립니다 최종 교정 (2026-10-20)

사용자 지정 [신분증 확인 2075:2064](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2075-2064)의 이름·주민등록번호·면허번호·발급일은 모두 필수입니다. 네 InputField의 Title / Element에서 optional 속성을 false로 설정하여 optional 프레임 전체를 숨겼습니다. 기존 `(필수)`와 강조색·서체 재정의는 원형의 `(선택)` 및 Text Style·색상 변수로 복원했습니다. 앞으로 필수는 optional 래퍼 비노출, 필수가 아닌 항목은 기본 `(선택)`과 원형 색상·서체·스타일·변수를 그대로 노출합니다. 필수 상태를 표시하려고 텍스트나 색상을 바꾸지 않습니다.

하단 알려드립니다의 승인된 원형은 전용 컨테이너 `2071:4202`(Full Width 390 / gap·padding 0) > 외부 Divider `2071:4203`(10px / tertiary / full, key `d1a200f3e40be0db71dc5873437dedd977d1b3e7`) → Accordion `2071:4207`(key `b92f854c8b1436c0fba64b704ae991e7d68028e3`)입니다. Accordion은 basic / standard / medium / expanded true / hasPrefix true / hasDivider false이며 Prefix는 solid-info-circle(key `c6afd5f6833dcfcd9bf15b7a9181e72c24beb700`)입니다. 본문 TextList / Unordered는 size 14, Slot-contents gap 8px입니다. 본문과의 간격은 32px, 위치는 하단 버튼 위이며 이 구성을 알려드립니다 노출 화면에 재사용합니다. 내부 1px Divider 비노출과 외부 10px Divider 노출을 구분하고 Accordion만 단독 배치하지 않습니다. 이 화면의 사용자가 변경한 72×72 이미지 영역은 보존했습니다.

## 단일 항목 Data Block 승인 (2026-10-20)

기준은 [그룹 내 고객정보 제공 안내 1147:62](https://www.figma.com/design/KFlklMvGmg0MXGfAXvpprn/?node-id=1147-62)의 고객정보 제공내역입니다. `Container 2 (1148:2995)`의 형제 `Title / Section (1148:2996)` → `Data Block (1148:3021)` 사이 gap은 16px입니다. 박스는 Vertical / Fill·Hug / padding 20 / radius 20 / gap 16, Fill `surface/neutral/tertiary-muted` key `59093c4bcca6ee8f9e5f9af90d27f568edcef5b5`, strokes는 빈 배열입니다. 단일 자식은 `DataList (1148:3023)`이며 중간 `DataList Group`과 박스 내부 Title은 없습니다.

DataList 원형 key는 `689423c84906f367c21aa49c4bc1f8315ed8afa1`, 속성은 split / 14 / hasDivider false입니다. 가로 Fill·세로 Hug이며 원형 Slot은 Horizontal / gap 12입니다. Label은 가로 Hug / 좌측 정렬 / 14 Light style key `b9f5d92dffa67d9779e50c32f2c9f732a727fe8a` / `text/neutral/tertiary`; Data는 남는 폭 Fill / 우측 정렬 / 14 Medium style key `87439f01ad7a7fbf6b1556036328a19d5f0ef75c` / `text/neutral/primary`입니다. 참조의 350×60px 박스 안 DataList는 310×20px이며, 이 높이를 Fixed로 강제하지 않고 박스·DataList의 Hug를 유지합니다. 원본 인스턴스와 Slot 계층·서체·색상 변수 연결을 보존합니다.

박스 내부 라벨·값 쌍이 하나일 때 이 구조를 재사용합니다. 여러 항목을 담은 단일 박스는 이 예외에 해당하지 않으며 기존 DataList Group을 유지합니다. 완료 화면의 별도 Title / DataList Group 패턴도 일괄 변경하지 않습니다.

## 셀렉트 바텀시트 List 높이 통일 (2026-10-20)

사용자 확정: 체크마크가 보이는 List는 48px, 보이지 않는 List는 46px로 달라지던 상태를 **모두 48px / 세로 Fixed**(`layoutSizingVertical: FIXED`)로 통일합니다. `hasSuffix`는 체크마크 노출만 제어하고 비노출 상태에서도 높이를 유지합니다. 선택 전후 항목 위치와 목록 높이가 달라지지 않는지 검수합니다. 실제 List 인스턴스와 내부 계층·서체·변수 연결은 보존하며, 아이콘과 부연 문구가 있는 도움말/이용 방법 선택 List의 별도 높이에는 일괄 적용하지 않습니다.

## InputField 보조 버튼·도움말 선택 목록 승인 (2026-10-19)

InputField 뒤에 해결방법 등의 보조 버튼이 오는 패턴은 [2025:6834](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2025-6834)의 조합 `2025:7406`을 기준으로 합니다. `InputField / Button Area`는 Vertical / Fill·Hug / gap 12px이며 자식은 InputField → Button Area입니다. Button Area는 gap 0 / 우측 정렬 / Fill·Hug, TextButton은 `secondary / xsmall` / prefix false / suffix true / underline false / Hug·Hug입니다. 2026-10-20 최종 교정 참조는 [2025:7407](https://www.figma.com/design/zNwpdAWcBMOM5ExkiBUoGn/?node-id=2025-7407)의 TextButton `2025:7417`이며, 실제 secondary/xsmall 원형 key는 `b6a8096e03e888ef8969ad417c39bf9356c84bd1`, 버튼 높이는 17px입니다. Title과 조합 간격은 24px입니다. 이 조합 구조의 적용 화면은 인증번호 입력 `2050:1586`입니다. 2026-10-20 확정 규칙은 인풋 조합 및 박스 아래 별도 TextButton의 variant를 모두 secondary로 지정합니다. 종전 primary 지정은 철회하고 기존 크기·간격·정렬은 유지합니다. 박스 아래 버튼에도 InputField 조합의 12px 간격이나 xsmall 크기를 일괄 복제하지 않으며, InputField 내부 버튼·독립 CTA는 이 교정 대상과 구분합니다.

도움말 기획 `CdyCQv4aFslTl7MGoQxmU9 / 4469:44517`은 [고객정보 관리 185:14891](https://www.figma.com/design/KFlklMvGmg0MXGfAXvpprn/?node-id=185-14891)의 테두리 없는 List 구성으로 매핑합니다. Slot padding 0/0/20/0, Container padding 0/20/0/20, List Group gap 0, List padding 12/0/12/0입니다. List key는 `4e49c191a8a8b7aa357c533168784411107b1e9d`, Prefix는 기본 `Item / Prefix (bgIcon)` key `79287fcb98e330378785cba4e19e9e83a7475478`(아이콘 48×48, 래퍼 폭 52), Suffix는 pageIndicator key `e53ffc35cc7fc4c362102ceb06618845712183ce`입니다. 주 문구 16 Bold style key `c0b7c927f31310c8297f679419d5a38377fc74db`, 부연 문구 14 Light key `b9f5d92dffa67d9779e50c32f2c9f732a727fe8a`를 사용합니다. 최종 아이콘은 작업자가 지정하므로 기본 인스턴스를 유지합니다. 적용 화면 `2050:2207`은 기획의 본문 안내를 Text로 보존하고 목록과 gap 16px로 묶었습니다.

## 페이지 ID에 따른 이름 규칙 확정 (2026-10-19)

사용자 지시로 기획서의 페이지 ID가 있으면 `실제페이지ID_화면명`(예: `F730_화면명`)으로 명명합니다. ID가 공란이면 기존 `화면ID_화면명`을 유지합니다. 링크된 프레임 내부뿐 아니라 주변 ID 영역도 읽고 해당 화면과 연결하며, ID 미확인 상태를 공란으로 단정하거나 임의 ID를 만들지 않습니다. 접두어는 `페이지 ID` 필드만 기준으로 하며 요구사항 ID나 화면명·상위 프레임명·주석의 `730MF`·`750MF` 등을 ID로 사용하지 않습니다. `-`는 공란으로 처리하고 `F730`은 형식 예시입니다. 이 규칙은 앞으로의 제작·계획·검수에 적용하며, 아래 과거 산출물 이름은 당시 기록으로 보존합니다.

## 인증서관리 링크 목록 최종 교정 (2026-10-19)

작업 파일 `zNwpdAWcBMOM5ExkiBUoGn`, 페이지 `1:278`, 일반 `2006:46` / 비로그인 `2006:2031` / 빠른 로그인·자동로그인 `2006:2415`에 반영했습니다. 제목과 목록을 감싼 여섯 래퍼 `2006:914`, `2006:1765`, `2006:2086`, `2006:2280`, `2006:2470`, `2006:2664`의 최종 이름은 `Title / List Group`입니다. 실제 `List` 인스턴스 이름·계층은 유지합니다.

Container 2의 래퍼 `2006:1765`, `2006:2280`, `2006:2664`는 padding-top 24px이며 `spacing/3xl` key `fb23d20e74566ea2a3280e9e3ca48e40122b6d95`를 연결했습니다. 내부 List Group `2006:1792`, `2006:2307`, `2006:2691`의 itemSpacing은 0px로 설정하고 이전 gap 변수 연결은 해제했습니다. Container 3 이상에도 같은 규칙을 적용합니다. 래퍼의 Title↔목록 gap 16px와 Container 1의 기존 패딩·목록 gap은 유지합니다. 내부 목록 gap 24px는 철회된 중간 지시이며 최종값이 아닙니다. 변경 후 세 화면은 390×844 / BODY Fill로 검수했습니다.

## PDF 약관 상세 최종 교정 (2026-10-19)

원본 `0P0j17OPstNhC3LWjBdBGy / 72:9033` → 작업본 `82:1994`. Container 1 `82:2355`는 Title Area `72:9038`의 속성·변수와 일치하며 Horizontal / padding 12,20,0,20 / gap 16 / Fill·Hug / 높이 36입니다. Container 2 `82:2373`는 body `72:9045`의 속성·변수와 일치하며 Vertical / 양 축 center / padding·gap 12 / Fill·Fill입니다. BODY `82:1998`의 세로 Fill과 FOOTER `82:2012`의 원본 Absolute / Fixed 390·Hug를 함께 적용한 뒤 실제 높이는 BODY 744, Container 2 708, FOOTER 126으로 확인했습니다. 레이어명·계층을 보존했습니다.

Pagination `86:2136`은 key `6955cc776fae1a9f38a3e93e8ecabfe286a4db6c`의 실제 인스턴스입니다. 기존 SVG Frame `82:2376`은 제거했습니다. 원본 인스턴스를 clone한 뒤 `group`/`ungroup`으로 같은 파일 내 대상 부모에 옮겨 Pretendard SemiBold를 포함한 원본 서체·변수를 보존했습니다. 텍스트 수정이나 폰트 대체 없이 이동했으며, 임시 Group은 제거했습니다. 향후 이 경로 또는 검증된 인스턴스 복제를 우선하고 Pagination을 벡터로 대체하지 않습니다. 원본에 없는 size 14 아이콘을 추정하지 않고 실제 템플릿의 size 24를 사용합니다.

## Title / Page 이후 Image Area 교정 (2026-10-19)

사용자 승인 참조: [MO Image Area 10580:10543](https://www.figma.com/design/09eGMNTNnkE0CTxPdr7lnk/?node-id=10580-10543). 부모 Container 1의 직계 자식은 Title / Page → Image Area이며 gap 0입니다. Image Area는 Vertical, Fill·Hug, padding 40/0/40/0, gap 0, 350×255px입니다. 내부 ImageContainer는 ratio 2:1, Fill·Fixed, 350×175px이며 원형 key는 `a680e6cb6e2aa701a6c19e00aadf45b42d947ec4`입니다. 상하 패딩은 `spacing/6xl` key `5bc593ee6f05df006566535e37f5fce0ed3a085b`입니다. **사용자 재교정: 원본 더미 그래픽과 “더미이미지” 라벨을 포함한 Image Area 전체를 재사용합니다.** 앞서 라벨과 그래픽을 생략하던 해석은 폐기합니다. 원본 이미지 hash `b1f2e8f30a4712713e5005c50b82808ca63b2cfb`와 크롭 변환을 그대로 보존합니다. 더미 라벨은 원형의 위치·크기·외형을 유지합니다. **최신 승인 버전**은 [67:1947](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=67-1947)의 Image Area `67:2127`입니다. 라벨 `98:2116`은 편집 가능한 TEXT / Pretendard SemiBold / 크기 21px / x130, y113 / 91×29px이며 원본 fontFamily 변수 key `6df184c7178de2fefb24f1c7673bb5bfb99eea9b`를 유지합니다. 원본 Text Style ID는 비어 있으므로 임의 스타일을 만들지 않고 원본 속성과 변수 연결을 보존합니다. 과거 outline SVG `78:1416`은 제거되었으며 최신 재사용 기준에서 제외합니다. 제품 본문 서체·스타일·변수 규칙은 유지합니다.

적용 화면 [얼굴확인 안내 67:1947](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=67-1947): Container 1 > Title / Page, Image Area로 병합하고, 다음 Container 2 > Infobox / Card와 실제 간격 24px를 적용합니다. 후속 gap은 `spacing/3xl` key `fb23d20e74566ea2a3280e9e3ca48e40122b6d95`입니다. 이 0/24px 규칙은 일반 BODY gap보다 우선합니다.

## 최소 바텀시트·완료 Feedback 크기 갱신 (2026-10-19)

사용자 지정 `0P0j17OPstNhC3LWjBdBGy / 44:898`에서 BottomSheet 높이·minHeight 211px, Slot 세로 Fill·높이 82px를 확인했습니다. 최소 콘텐츠에 의해 남는 높이는 Slot이 흡수하며 내부 본문은 Hug로 유지합니다. `47:972`는 사용자 교정에 따라 Feedback Large로 지정합니다. 실제 공개 속성은 `varient: large`, 원형 key는 `3cb5580a388f0ea35f0840f442f932ceba856ad6`입니다. 완료 화면은 항상 Large를 사용하며, 외국인 안내의 경고 상태와 문구·버튼은 유지합니다.

## 생체정보 바텀시트 텍스트·계층 교정 (2026-10-19)

사용자 지정 산출물 `0P0j17OPstNhC3LWjBdBGy / 44:899, 44:900`의 단일 Slot Container는 `Container`로 명명하고 일반 본문을 `Text` Auto Layout으로 감쌉니다. 구조는 `Slot > Container > Text > Content`, Text gap·padding 0 및 Fill/Hug입니다.

원본 MO 라이브러리에서 재확인한 `Dynamic/Body/md∙16∙Light` key는 `161acb8a632b6627494a8a2b575e49ed8a12f3a6`, 동일 계열 Medium key는 `1c8368513c856adb717a8f46922bc5f4a800bb66`입니다. 두 스타일 모두 KBFG Text, 기본 크기 16px·행간 22px이며 fontFamily·fontSize·fontWeight·lineHeight·letterSpacing이 원본 변수에 연결됩니다. 직접 fontName을 바꾼 강조 구간에서 style 및 fontWeight alias가 누락되어, 구간별 원본 Medium 스타일 적용으로 복원했습니다. 새 제작에도 구간별 스타일·변수 연결 검수를 적용합니다.

## Tab 후속 간격·조회 내역 승인 갱신 (2026-10-19)

일반 콘텐츠의 Tab 직후 간격은 `spacing/3xl`=24px(key `fb23d20e74566ea2a3280e9e3ca48e40122b6d95`)입니다. BODY 기본 32px보다 우선합니다. 사용자 교정에 따라 `## BODY > Container 1 > Tab, Infobox / Card`로 구성하며 두 컴포넌트는 Container 1의 직계 자식입니다. 외부 `Tab / Infobox` 래퍼와 각 컴포넌트의 별도 Container를 만들지 않습니다. 이 화면에서 Container 1 gap 24px, Tab 폭 390px, Infobox 폭 350px·x=20px를 실측했습니다. 다음 독립 본문 블록은 형제 Container 2로 명명합니다.

사용자 지정 [아웃라인 Data Block](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=4-979)과 [회색 무테 Data Block](https://www.figma.com/design/0P0j17OPstNhC3LWjBdBGy/?node-id=4-994)을 직접 재조회했습니다. 두 박스 모두 Vertical, padding 20px, radius 20px, Title↔목록 gap 16px, 목록 gap 12px입니다. 각각 `spacing/2xl`, `radius/2xl`, `spacing/xl`, `spacing/lg`에 연결되어 있습니다. outline fill은 `surface/neutral/quaternary-muted`, stroke는 `border/neutral/secondary-muted` + `stroke/md`; 무테 fill은 `surface/neutral/tertiary-muted`, strokes는 빈 배열입니다.

고객명~인증완료 등 건별 사실 데이터는 기획서의 평면 목록 대신 이 Data Block을 우선합니다. 제목이 없는 내역은 Title을 숨기며, 복수 박스 gap은 12px입니다. 완료 화면과 특수 Feedback 구조는 원문의 별도 규칙을 유지합니다.

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
- 카드 예시 PNG의 실제 상품 이미지는 배치 참고용입니다. 산출물은 사용자 지시에 따라 이미지 영역만 표시하되, 승인된 Image Area `10580:10543`는 더미 그래픽·라벨을 포함해 재사용하는 예외입니다.

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

## 완료 화면 갱신 실측 (2026-10-15)

근거: [완료 화면 `2668:26353`](https://www.figma.com/design/bDKgQrkt0oHMJ1EbPUQTp8/?node-id=2668-26353), `0:1` 페이지. 프레임 이름은 `화면ID_[증명서 진위 확인_서비스 안내]`이며 표시 문구는 발급신청 취소 완료입니다. 화면명만으로 추정하지 않고 실제 BODY와 반복 그룹을 조회하고 스크린샷을 확인했습니다. 아래 값은 상단 Feedback + 후속 데이터가 있는 완료 화면의 승인 패턴으로 D18·D19에 반영하며, 일반 화면·Empty State·Data Block 수치를 일괄 대체하지 않습니다.

|역할 / 노드|확인한 구조·값|
|---|---|
|`## BODY` / `2668:26357`|Vertical, padding 상/우/하/좌 **40/20/32/20px**, gap **40px**, 가로 정렬 CENTER, 폭 390, 높이 646/FILL|
|`Container 1` / `2668:26358`|Feedback wrapper, Horizontal Auto Layout, padding 0, gap 0. 원본 Feedback의 폭·중앙 배치를 유지하며 BODY 상단 패딩을 Container에 다시 더하지 않음|
|`Container 2` / `2668:26367`|Vertical, padding 0, 가로 FILL(350px)/세로 HUG. 반복 `Title / DataList Group` 2개 사이 gap **32px**|
|`Title / DataList Group` / `2668:26368`, `2668:26375`|Vertical, padding 0, 가로 FILL/세로 HUG. 자식은 `Title` → `DataList Group`, 사이 gap **16px**|
|`Title` / `2668:26369`, `2668:26376`|별도 Vertical Auto Layout, padding 0, 가로 FILL/세로 HUG. `Title / Element` → `Divider / Horizontal`, 내부 gap **12px**|
|Title 안의 Divider / `2668:26371`, `2668:26378`|실제 Component Properties `thickness:1px`, **`variant:primary`**, `length:full`. full은 350px 콘텐츠 폭이며 이 구분선 때문에 BODY 좌우 패딩을 제거하지 않음|
|`DataList Group` / `2668:26372`, `2668:26379`|Vertical, padding 0, 가로 FILL/세로 HUG, 내부 gap **12px**. 두 그룹에 각각 DataList 2개와 1개가 있으며 모두 `layout:split`, `size:14`, `hasDivider:false`|
|`Title / Element` / `2668:26370`, `2668:26377`|원형 서체 `KBFG Text Medium`, 텍스트 스타일 key `87439f01ad7a7fbf6b1556036328a19d5f0ef75c`. 임의 Bold로 변경하지 않음|

BODY 패딩의 CSS 단축 표기는 `padding: 40px 20px 32px`입니다.

### 완료 화면에서 확인한 간격 변수 key

|토큰|key|적용 위치|
|---|---|---|
|`spacing/6xl` = 40px|`5bc593ee6f05df006566535e37f5fce0ed3a085b`|BODY padding-top 및 Container 1↔2 gap|
|`spacing/2xl` = 20px|`5491ce4ce8c48cc4a679f8cedc426cb96bb9a141`|BODY 좌우 패딩|
|`spacing/5xl` = 32px|`840e7bd3a0d91d1161f8dcbd3c3299310e014cac`|BODY padding-bottom 및 Container 2 내 반복 그룹 gap|
|`spacing/xl` = 16px|`dd4b6787bca3ceba45b9b41a16963083cacea533`|각 `Title / DataList Group`의 Title↔DataList Group gap|
|`spacing/lg` = 12px|`466bd0e6b2233083a08d900e3be39f48196d1bee`|Title 내부 및 DataList 목록 내부 gap|

추가 원형 key: `Title / Element`는 `4fa94105877b4e3dad3e36f52b5be749deb2ce68`, 승인 Divider variant는 `f5e601b7152ef36e3e90e841d5d896cce328dc8d`입니다. 과거 문서의 완료 Divider `tone:quaternary`, 데이터 영역 전체 gap 12px, 후속 그룹 padding-top 24px는 이 승인 패턴에 적용하지 않습니다. 새 제작 시 현재 원본과 모드를 다시 확인하여 key를 연결합니다.
