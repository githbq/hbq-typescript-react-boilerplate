/**
 * 手动埋点
 * @param eventName
 * @param params
 * @returns
 */
export const track = (eventName: string, params: object) => {};

/**
 * 曝光埋点
 * @param dom
 * @param actionName
 * @param params
 */
export const autoShow = (dom: HTMLElement, actionName: string, params: object) => {};
