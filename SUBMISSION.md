# 파치먼트 — 앱스토어 제출 체크리스트

> 코드/설정은 ready 상태. 아래 항목을 채우고 `eas build` → `eas submit` 순서로 진행.

---

## 0. 사전 준비 (계정·툴)

- [ ] **Apple Developer Program** 가입 ($99/년)
- [ ] **Google Play Console** 가입 (1회 $25)
- [ ] **EAS CLI**: `npm i -g eas-cli && eas login`
- [ ] 프로젝트 연결 확인: `eas whoami` → owner=`tersite`, projectId=`78a40f4d-…`

---

## 1. App Store Connect 사전 등록 (iOS)

1. https://appstoreconnect.apple.com → **My Apps → +** → New App
   - Platform: iOS
   - Name: 파치먼트 (Parchment)
   - Primary Language: 한국어
   - Bundle ID: `com.tersite.parchment` (Apple Developer 포털에서 미리 등록)
   - SKU: `parchment-ios`
2. 등록 완료 후 **App Store Connect App ID(ascAppId)** 를 `eas.json` → `submit.production.ios.ascAppId` 에 채우기
3. `eas.json` → `appleId`, `appleTeamId` 도 본인 값으로 교체

### Apple Sign-In 활성화
- Apple Developer 포털 → **Identifiers** → 앱 ID → Capabilities → **Sign in with Apple** 체크
- 또는 `eas build` 시 자동 처리되도록 `app.config.js`의 `ios.usesAppleSignIn: true` 유지 (이미 설정됨)

### Supabase Apple Provider 설정
- Supabase Dashboard → Auth → Providers → **Apple** 활성화
- Service ID, Team ID, Key ID, Private Key (.p8) 입력 — Apple Developer Account에서 발급
- Redirect URL: `https://qkvvwkimzdztalstfgol.supabase.co/auth/v1/callback`

---

## 2. Google Play Console 사전 등록 (Android)

1. https://play.google.com/console → **Create app**
   - 앱 이름: 파치먼트
   - 기본 언어: 한국어
   - 앱/게임: 앱
   - 무료/유료: 무료
   - 패키지명: `com.tersite.parchment`
2. **Service Account Key** 발급 후 JSON을 `viewer/google-service-account.json` 에 저장 (gitignore!)

---

## 3. 카카오 로그인 redirect URI 갱신
- https://developers.kakao.com/console → 앱 선택 → **카카오 로그인 → Redirect URI**
- 추가: `https://qkvvwkimzdztalstfgol.supabase.co/auth/v1/callback`

---

## 4. 앱 자산

### iOS
- [ ] **App Icon** 1024×1024 PNG (`assets/icon.png` — 이미 있음, 검증)
- [ ] **Screenshots** 6.7" iPhone (1290×2796) — 최소 3장, 권장 5장
- [ ] (선택) iPad 12.9" 스크린샷 — `supportsTablet: true`이라 필요할 수 있음
- [ ] **App Preview** 영상 (선택)

### Android
- [ ] **Adaptive Icon** 432×432 (`assets/adaptive-icon.png` — 이미 있음)
- [ ] **Feature Graphic** 1024×500 PNG
- [ ] **Phone Screenshots** 1080×1920 — 최소 2장
- [ ] (선택) 7"/10" 태블릿 스크린샷

---

## 5. 메타데이터 (App Store Connect / Play Console)

| 항목 | 한국어 | 영문 |
|---|---|---|
| 앱 이름 | 파치먼트 | Parchment |
| 부제 | 사람 없는 공간 | Curated Quiet Spaces |
| 설명 | (작성 필요) | (작성 필요) |
| 키워드 | 큐레이션, 카페, 여행, 공간, 미니멀 | curation, cafe, travel, hidden, minimal |
| 카테고리 | 라이프스타일 / 여행 | Lifestyle / Travel |
| 연령 등급 | 4+ | 4+ |
| 가격 | 무료 | Free |

### 필수 URL
- [ ] **Privacy Policy URL** — 현재 `viewer/PRIVACY.md` 작성됨. **GitHub Pages 또는 Notion에 호스팅** 후 URL 받아 App Store Connect / Play Console 입력
- [ ] **Support URL** — 이메일 페이지 또는 GitHub Issues
- [ ] **Marketing URL** (선택)

---

## 6. App Privacy (Apple — 필수)

App Store Connect → App Privacy → 다음 항목 신고:
- **Contact Info → Email Address**: 계정 식별 (Linked to user)
- **Identifiers → User ID**: 계정 식별 (Linked to user)
- **Location → Coarse Location**: 앱 기능 (Not linked to user, 광고/추적 X)
- **User Content → Photos** (리뷰 첨부 시): 앱 기능 (Linked to user)

---

## 7. 빌드 → 제출

```bash
cd viewer

# iOS production build
eas build -p ios --profile production

# Android production build
eas build -p android --profile production

# 빌드 완료 후 자동 제출
eas submit -p ios --latest
eas submit -p android --latest
```

빌드는 EAS 클라우드에서 ~15-30분, 제출 후 Apple 심사 보통 1-3일.

---

## 8. 출시 전 자가 점검

### 기능
- [ ] iOS 시뮬레이터에서 모든 탭 정상
- [ ] 실기기(iPhone)에서 카카오/Apple 로그인 모두 성공
- [ ] 위치 권한 거부 시에도 앱이 정상 동작
- [ ] 챗봇 응답 정상 (Edge Function 배포 + secrets 등록 완료)
- [ ] 지도 마커 탭 → 팝업 정상

### 안전
- [ ] `.env`가 `.gitignore`에 있고 커밋 안 됨
- [ ] OpenAI 키는 Supabase Edge Function secret에만 (클라이언트 X)
- [ ] Supabase RLS 활성화: `places`/`reviews`/`bookmarks`

### 디자인
- [ ] 다크 테마 일관성 (모든 탭)
- [ ] 햅틱 강도 차등 (Light/Medium/Heavy)
- [ ] 터치 타깃 ≥ 44px
- [ ] 접근성 라벨 (스크린리더 동작)

---

## 9. 알려진 TODO (출시 후 보강 가능)

- AboutScreen `PRIVACY_POLICY_URL` / `TERMS_URL` — GitHub Markdown raw 링크는 임시. 정식 호스팅 URL로 교체.
- 한·영 토글 시 일부 라벨이 영문 라벨이 없어 한국어 그대로 노출됨 (i18n 점진 도입 권장).
- iPad 레이아웃 (`supportsTablet: true`) 검증 안 됨 — Apple 심사에서 iPad에서 잘 동작하는지 확인 필수. 필요 시 false로 변경.
