/**
 * As we are not delimiting numbers, this approach can only support a maximum
 * grid of 36x36.
 */
export const encodeNumber = (n: number) => Math.round(n).toString(36);
