/**
 * Creates a unique email address for testing purposes.
 * @returns A string with the random email address. E.g., “test-user-1665857432123@example.com”
 */
export function createRandomEmail(prefix: string = 'test-user'): string {
  const timestamp = Date.now();
  return `${prefix}-${timestamp}@example.com`;
}