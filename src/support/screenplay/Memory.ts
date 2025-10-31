/**
 * Memory - Screenplay Pattern implementation for state management
 * 
 * Allows actors to Remember and Recall information during test execution.
 * This replaces ad-hoc storage in testData or global variables.
 */

export class Memory {
  private storage: Map<string, any> = new Map();

  /**
   * Remember a value for later recall
   * @param key - The key to store the value under
   * @param value - The value to remember
   */
  remember<T>(key: string, value: T): void {
    this.storage.set(key, value);
  }

  /**
   * Recall a previously remembered value
   * @param key - The key of the value to recall
   * @returns The remembered value, or undefined if not found
   */
  recall<T>(key: string): T | undefined {
    return this.storage.get(key);
  }

  /**
   * Recall a value, throwing an error if not found
   * @param key - The key of the value to recall
   * @returns The remembered value
   * @throws Error if the value was not remembered
   */
  recallOrThrow<T>(key: string): T {
    const value = this.recall<T>(key);
    if (value === undefined) {
      throw new Error(`Cannot recall "${key}" - it was never remembered`);
    }
    return value;
  }

  /**
   * Check if a value has been remembered
   * @param key - The key to check
   * @returns true if the value exists
   */
  has(key: string): boolean {
    return this.storage.has(key);
  }

  /**
   * Forget a remembered value
   * @param key - The key to forget
   */
  forget(key: string): void {
    this.storage.delete(key);
  }

  /**
   * Forget all remembered values
   */
  forgetAll(): void {
    this.storage.clear();
  }

  /**
   * Get all remembered keys
   * @returns Array of all keys
   */
  keys(): string[] {
    return Array.from(this.storage.keys());
  }
}

/**
 * Predefined memory keys for common test data
 * Use these constants instead of string literals for type safety
 */
export const MemoryKeys = {
  // User data
  CREATED_USER: 'createdUser',
  CREATED_USER_EMAIL: 'createdUserEmail',
  CREATED_USER_PASSWORD: 'createdUserPassword',
  SIGNUP_NAME: 'signupName',
  SIGNUP_EMAIL: 'signupEmail',
  EXISTING_EMAIL: 'existingEmail',
  
  // Product data
  PRODUCT_NAME: 'productName',
  PRODUCT_PRICE: 'productPrice',
  FIRST_PRODUCT_NAME: 'firstProductName',
  FIRST_PRODUCT_PRICE: 'firstProductPrice',
  
  // Cart data
  CART_TOTAL: 'cartTotal',
  
  // Search data
  SEARCH_PHRASE: 'searchPhrase',
  
  // Contact data
  CONTACT_DATA: 'contactData',
  
  // Generic
  CURRENT_PAGE_URL: 'currentPageUrl',
  COMPLETE_USER_DATA: 'completeUserData',
} as const;

export type MemoryKey = typeof MemoryKeys[keyof typeof MemoryKeys];
