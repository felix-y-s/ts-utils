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
 * @example
 * // 예외가 나면 최대 3회까지, 시도 간격 500ms * 시도횟수로 재시도
 * const data = await withRetry(() => fetchFromApi());
 *
 * @example
 * // 예외 없이도 반환값 기준으로 성공 여부 판정, 옵션 커스터마이징
 * const result = await withRetry(() => pollJobStatus(jobId), {
 *   maxRetries: 5,
 *   delayMs: 1000, // 1차 대기 1000ms, 2차 2000ms, 3차 3000ms ...
 *   isSuccess: (r) => r.status === 'DONE',
 * });
 */
export declare function withRetry<T>(fn: () => Promise<T>, options?: RetryOptions<T>): Promise<T>;
export {};
