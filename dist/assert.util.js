"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertDefined = assertDefined;
exports.assertNever = assertNever;
const unhandled_case_error_1 = require("./unhandled-case.error");
/**
 * 값이 null이 아님을 단언한다.
 * @param value 검사할 값
 * @param message 값이 null일 때 던질 에러 메시지
 * @throws Error value가 null인 경우
 * @example
 * function getUser(id: string) {
 *   const user = users.find((u) => u.id === id); // User | undefined
 *   assertDefined(user, `사용자를 찾을 수 없습니다: ${id}`);
 *   return user; // 이 지점부터 타입이 User로 좁혀짐
 * }
 */
function assertDefined(value, message) {
    if (value === null)
        throw new Error(message);
}
/**
 * enum/union 타입의 모든 케이스를 빠짐없이 분기 처리했는지 검증한다.
 *
 * 컴파일 타임: 값을 처리하는 분기를 빠뜨리면 이 함수를 호출하는 지점에서
 * 타입 에러가 발생한다 - `value`의 타입이 `never`로 좁혀지지 않았다는 뜻.
 *
 * 런타임: 타입 체크를 우회해(as 단언, 외부 API 응답 파싱 등) 정의되지
 * 않은 값이 실제로 들어오면 즉시 예외를 발생시킨다.
 *
 * @param value 모든 case를 거치고 남은, 이론상 존재할 수 없는 값
 * @param label 어느 exhaustive check에서 발생했는지 식별하기 위한 라벨(에러 메시지에 포함)
 * @throws UnhandledCaseError 항상 던진다 - 정상적으로 도달해서는 안 되는 코드 경로.
 *   `error.label`, `error.value`로 개별 필드에 접근 가능
 * @example
 * enum Status { SUCCEEDED = 'SUCCEEDED', FAILED = 'FAILED' }
 *
 * function handle(status: Status) {
 *   if (status === Status.SUCCEEDED) return '성공';
 *   if (status === Status.FAILED) return '실패';
 *   // 이후 Status에 새 값이 추가되면 아래 줄에서 컴파일 에러 발생
 *   return assertNever(status, 'handle/status');
 * }
 *
 * @example
 * // 호출부에서 구조화된 필드를 활용해 로깅하기
 * try {
 *   return assertNever(status, 'handle/status');
 * } catch (error) {
 *   if (error instanceof UnhandledCaseError) {
 *     logger.error('처리 안 된 상태값', { label: error.label, value: error.value });
 *   }
 *   throw error;
 * }
 */
function assertNever(value, label) {
    throw new unhandled_case_error_1.UnhandledCaseError(label, value);
}
