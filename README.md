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

## 개발

```bash
npm install
npm run build   # src -> dist 컴파일
```

새 함수를 추가하면 `src/index.ts`에 export를 등록하고, 버전을 올린 뒤(`package.json`의 `version`) 커밋 태그를 남긴다.
