/**
 * `assertNever`가 exhaustive check 실패 시 던지는 에러.
 *
 * 발생 원인은 항상 둘 중 하나다:
 * - 최근 추가된 enum/union 값에 대한 분기 처리가 누락됨(컴파일 타임에 잡혔어야 할 실수)
 * - 타입 체크를 우회한 외부 입력(as 단언, API 응답 파싱 등)이 실제로 들어옴
 *
 * `label`, `value`로 개별 필드에 접근할 수 있고, `message`는 사람이 로그에서
 * 바로 읽을 수 있는 문자열로 자동 조합된다.
 */
export declare class UnhandledCaseError extends Error {
    readonly label: string;
    readonly value: unknown;
    constructor(label: string, value: unknown);
}
