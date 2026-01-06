/**
 * Retries an asynchronous action (such as a click) a maximum number of times.
 * @param action The asynchronous function containing the Playwright action (e.g., () => locator.click()) 
 * @param maxAttempts The maximum number of times the action will be attempted (default: 3). 
 * @param delayMs The wait time between attempts in milliseconds (default: 500). 
 */

export async function retryAction<T>(
    action: () => Promise<T>, 
    maxAttempts: number = 3,
    delayMs: number = 500
): Promise<T> {
    let lastError: any;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await action();
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
            if (attempt < maxAttempts) {
                await new Promise(res => setTimeout(res, delayMs));
            }
        }
    }
    console.error(`Action failed after ${maxAttempts} attempts:`, lastError);
    throw lastError;
}