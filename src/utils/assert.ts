export function assertPresent<T>(val: T | null | undefined, msg: string): asserts val is T {
  if (val === null || val === undefined) throw new Error(msg);
}
