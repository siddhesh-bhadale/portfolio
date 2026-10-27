/**
 * Join class names, dropping anything falsy.
 * Small enough not to warrant a dependency.
 */
export function cn(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(' ');
}
