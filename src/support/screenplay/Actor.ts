/**
 * Actor - Represents a user performing actions in the system
 * 
 * In Screenplay Pattern, an Actor is the entity that performs Tasks and asks Questions.
 * The Actor has Abilities (like browsing the web) and can Remember information.
 */

import { Page } from '@playwright/test';
import { Memory } from './Memory';

export class Actor {
  private memory: Memory;

  constructor(
    public readonly name: string,
    public readonly page: Page
  ) {
    this.memory = new Memory();
  }

  /**
   * Remember a piece of information for later
   * 
   * Example:
   * actor.remember('userEmail', 'test@example.com');
   */
  remember<T>(key: string, value: T): void {
    this.memory.remember(key, value);
  }

  /**
   * Recall previously remembered information
   * 
   * Example:
   * const email = actor.recall<string>('userEmail');
   */
  recall<T>(key: string): T | undefined {
    return this.memory.recall<T>(key);
  }

  /**
   * Recall information, throwing error if not found
   * 
   * Example:
   * const email = actor.recallOrThrow<string>('userEmail');
   */
  recallOrThrow<T>(key: string): T {
    return this.memory.recallOrThrow<T>(key);
  }

  /**
   * Check if something has been remembered
   */
  hasRemembered(key: string): boolean {
    return this.memory.has(key);
  }

  /**
   * Forget a piece of information
   */
  forget(key: string): void {
    this.memory.forget(key);
  }

  /**
   * Forget all remembered information (typically used in After hooks)
   */
  forgetAll(): void {
    this.memory.forgetAll();
  }

  /**
   * Get the Actor's memory object directly (for advanced usage)
   */
  getMemory(): Memory {
    return this.memory;
  }
}
