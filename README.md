# @felix_ys/ts-utils

여러 프로젝트에서 공유하는 프레임워크 무관 TypeScript 유틸리티 모음.

## 설치

GitHub 저장소를 직접 참조한다(현재 npm 레지스트리에 publish하지 않음).

```bash
npm install github:felix-y-s/ts-utils
```

특정 버전/커밋을 고정하려면 `#태그명` 또는 `#커밋해시`를 붙인다.

```json
{
  "dependencies": {
    "@felix_ys/ts-utils": "github:felix-y-s/ts-utils#v0.1.0"
  }
}
```

## 사용

```typescript
import { assertNever, assertDefined, withRetry } from '@felix_ys/ts-utils';
```

### assertNever

enum/union 타입의 모든 케이스를 빠짐없이 분기 처리했는지 컴파일 타임에 검증한다.

```typescript
enum Status { SUCCEEDED = 'SUCCEEDED', FAILED = 'FAILED' }

function handle(status: Status) {
  if (status === Status.SUCCEEDED) return '성공';
  if (status === Status.FAILED) return '실패';
  return assertNever(status, 'handle/status');
}
```

호출되면 `UnhandledCaseError`(`Error` 상속)를 던진다. `label`, `value` 필드로
개별 접근이 가능해, 도메인 로깅/모니터링에서 구조화된 정보로 활용할 수 있다.

```typescript
import { assertNever, UnhandledCaseError } from '@felix_ys/ts-utils';

try {
  return assertNever(status, 'handle/status');
} catch (error) {
  if (error instanceof UnhandledCaseError) {
    logger.error('처리 안 된 상태값', { label: error.label, value: error.value });
  }
  throw error; // 도메인 에러로 감싸지 않고 그대로 재던지는 것을 권장
}
```

### assertDefined

값이 null이 아님을 단언하고, 이후 코드에서 타입을 좁힌다.

```typescript
const user = users.find((u) => u.id === id);
assertDefined(user, `사용자를 찾을 수 없습니다: ${id}`);
// 이 지점부터 user는 User 타입으로 좁혀짐
```

### withRetry

실패 시 지수 백오프로 재시도하는 템플릿 함수.

```typescript
const result = await withRetry(() => fetchSomething(), {
  maxRetries: 3,
  delayMs: 500,
});
```

반환값 기준으로 성공 여부를 직접 판정하려면 `isSuccess`를 넘긴다(예외가 없어도
재시도하고 싶을 때, 예: 폴링).

```typescript
const result = await withRetry(() => pollJobStatus(jobId), {
  maxRetries: 5,
  delayMs: 1000,
  isSuccess: (r) => r.status === 'DONE',
});
```

**옵션(`RetryOptions`)**

| 옵션 | 기본값 | 설명 |
|---|---|---|
| `maxRetries` | `3` | 최대 재시도 횟수(최초 시도 제외) |
| `delayMs` | `500` | 재시도 기본 대기시간(ms). 지수 백오프로 `delayMs * attempt`만큼 대기(1차 재시도 `delayMs`, 2차 `delayMs * 2`, ...) |
| `isSuccess` | `() => true` | 반환값으로 성공 여부를 판정하는 함수. 생략하면 예외 없이 반환되면 성공으로 간주 |

모든 재시도가 소진되면 마지막 에러(또는 `isSuccess`가 계속 실패였을 경우 재시도 초과 에러)를 던진다.

## 개발

```bash
npm install
npm run build   # src -> dist 컴파일
```

새 함수를 추가하면 `src/index.ts`에 export를 등록하고, 버전을 올린 뒤(`package.json`의 `version`) 커밋 태그를 남긴다.
