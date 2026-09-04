interface RetryOptions<T> {
    /** 최대 재시도 횟수 (기본 3회) */
    maxRetries?: number;
    /** 재시도 기본 대기시간 ms - 지수 백오프 적용: delayMs * attempt (기본 500ms) */
    delayMs?: number;
    /** 반환값 기준 성공 판별 함수 - 생략 시 예외가 없으면 성공으로 간주 */
    isSuccess?: (result: T) => boolean;
}
/**
 * 실패 시 지수 백오프로 재시도하는 템플릿 함수
 * @param fn 실행할 비동기 함수
 * @param options 재시도 옵션
 * @returns 성공한 경우 fn의 반환값
 * @throws 모든 재시도 소진 시 마지막 예외 또는 재시도 초과 에러
 */
export declare function withRetry<T>(fn: () => Promise<T>, options?: RetryOptions<T>): Promise<T>;
export {};
