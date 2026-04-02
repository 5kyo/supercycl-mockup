# Toast

사용자에게 일시적인 피드백 메시지를 표시한다. 자동으로 3초 후 사라진다.

---

## 사용 시점

- 주문 체결 성공/실패 알림
- 설정 변경 완료 알림
- 네트워크 에러 등 시스템 상태 알림
- 사용자 액션의 결과를 비방해적으로 전달할 때

---

## 기본 사용법

```tsx
import { Toast } from '@components';

<Toast
  message="주문이 체결되었습니다"
  variant="success"
  isVisible={showToast}
  onDismiss={() => setShowToast(false)}
/>
```

---

## 변형 (Variants)

### default

기본 스타일, 보더 색상 변경 없음.

```tsx
<Toast message="알림 메시지" isVisible={true} onDismiss={handleDismiss} />
```

### success

녹색 보더 + 체크 아이콘. 성공적인 액션 완료 시 사용한다.

```tsx
<Toast message="주문이 체결되었습니다" variant="success" isVisible={true} onDismiss={handleDismiss} />
```

### error

빨간 보더 + X 아이콘. 에러 발생 시 사용한다.

```tsx
<Toast message="주문 실패: 잔고 부족" variant="error" isVisible={true} onDismiss={handleDismiss} />
```

### warning

노란 보더 + 경고 아이콘. 주의가 필요한 상태를 알린다.

```tsx
<Toast message="슬리피지 5% 이상" variant="warning" isVisible={true} onDismiss={handleDismiss} />
```

---

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `message` | `string` | (필수) | 표시할 메시지 |
| `variant` | `'default' \| 'success' \| 'error' \| 'warning'` | `'default'` | 변형 (보더 색상 + 아이콘) |
| `icon` | `ReactNode` | variant별 기본 아이콘 | 커스텀 아이콘 |
| `duration` | `number` | `3000` (ms) | 자동 사라짐 시간 |
| `isVisible` | `boolean` | (필수) | 표시 여부 |
| `onDismiss` | `() => void` | (필수) | 사라질 때 콜백 |
| `style` | `CSSProperties` | `undefined` | 스타일 오버라이드 |

---

## 기본 아이콘

| Variant | 아이콘 | 유니코드 |
|---------|--------|---------|
| `default` | (없음) | -- |
| `success` | checkmark | U+2713 |
| `error` | X mark | U+2717 |
| `warning` | warning sign | U+26A0 |

커스텀 아이콘을 전달하면 기본 아이콘을 대체한다.

```tsx
<Toast
  message="복사됨"
  icon={<CopyIcon />}
  isVisible={true}
  onDismiss={handleDismiss}
/>
```

---

## 스타일 사양

| 속성 | 토큰 | 실제 값 |
|------|------|---------|
| 배경 | `--c-toast-bg` | #242424 |
| 보더 | `--c-toast-border` | 1px solid #2c2c2c |
| 라디우스 | `--c-toast-radius` | 10px |
| 패딩 | `--c-toast-padding` | 12px 20px |
| 최대 너비 | `--c-toast-max-width` | 360px |
| z-index | `--c-toast-z` | 200 |
| 폰트 크기 | `--c-toast-font-size` | 13px |
| 폰트 굵기 | `--c-toast-font-weight` | 500 |
| 하단 위치 | `--c-toast-bottom` | 80px |
| 자동 사라짐 | `--c-toast-dismiss` | 3000ms |
| 그림자 | `--s-elevation-toast` | 0 2px 8px rgba(0,0,0,0.4) |

---

## 합성 패턴

### AppContext와 연동

```tsx
// AppContext에서 toast 상태 관리
const { state, dispatch } = useApp();

// 토스트 표시
dispatch({ type: 'SHOW_TOAST', payload: { message: '주문 완료', variant: 'success' } });

// 최상위 레이아웃에서 렌더링
<Toast
  message={state.toast.message}
  variant={state.toast.variant}
  isVisible={state.toast.isVisible}
  onDismiss={() => dispatch({ type: 'DISMISS_TOAST' })}
/>
```

### 지속 시간 커스텀

```tsx
// 에러는 더 오래 표시
<Toast
  message="네트워크 오류가 발생했습니다"
  variant="error"
  duration={5000}
  isVisible={true}
  onDismiss={handleDismiss}
/>
```

---

## 접근성

| 항목 | 구현 상태 | 설명 |
|------|----------|------|
| role="status" | PASS | 올바르게 설정됨 |
| aria-live="polite" | PASS | 스크린리더가 현재 읽기 완료 후 안내 |
| aria-atomic="true" | PASS | 전체 토스트 내용을 읽어줌 |
| 텍스트 대비 | PASS | #ffffff on #242424 = 15.52:1 |
| 아이콘 숨김 | PASS | `aria-hidden="true"` |
| error 변형 live region | **P1** | error 시 `aria-live="assertive"` + `role="alert"` 권장 |

### 스크린리더 동작

- `role="status"` + `aria-live="polite"`: 스크린리더가 현재 읽기를 마친 후 토스트 메시지를 안내한다.
- `aria-atomic="true"`: 토스트가 변경될 때 전체 내용을 다시 읽어준다.
- **권장**: error 변형은 `role="alert"` + `aria-live="assertive"`로 즉시 안내해야 한다.

---

## Do / Don't

### DO

- variant를 메시지 성격에 맞게 사용한다 (성공 -> success, 에러 -> error)
- 메시지는 간결하게 작성한다 (한 줄)
- 에러 메시지에는 원인 또는 해결 방법을 포함한다
- AppContext 등 전역 상태와 연동하여 앱 전체에서 일관되게 사용한다

```tsx
// DO: 구체적 에러 메시지
<Toast message="주문 실패: 잔고가 부족합니다" variant="error" ... />
```

### DON'T

- 중요한 정보를 Toast로만 전달하지 않는다 (자동으로 사라지므로)
- 여러 Toast를 동시에 표시하지 않는다
- 너무 긴 메시지를 Toast에 넣지 않는다
- 사용자 액션이 필요한 정보에 Toast를 사용하지 않는다 (Modal 사용)

```tsx
// DON'T: 긴 메시지
<Toast message="네트워크 연결에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해주세요. 문제가 지속되면 고객센터에 문의해주세요." ... />

// DON'T: 액션이 필요한 내용
<Toast message="세션이 만료되었습니다. 다시 로그인하세요" ... />
// -> Modal 사용
```
