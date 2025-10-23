import { expect } from '@playwright/test';

export class AssertionHelper {
  static async assertElementVisible(element: any, errorMessage?: string): Promise<void> {
    await expect(element).toBeVisible({ timeout: 10000 });
  }

  static async assertElementNotVisible(element: any, errorMessage?: string): Promise<void> {
    await expect(element).not.toBeVisible();
  }

  static async assertElementEnabled(element: any, errorMessage?: string): Promise<void> {
    await expect(element).toBeEnabled();
  }

  static async assertElementDisabled(element: any, errorMessage?: string): Promise<void> {
    await expect(element).toBeDisabled();
  }

  static async assertTextEquals(element: any, expectedText: string): Promise<void> {
    await expect(element).toHaveText(expectedText);
  }

  static async assertTextContains(element: any, expectedText: string): Promise<void> {
    await expect(element).toContainText(expectedText);
  }

  static async assertValueEquals(element: any, expectedValue: string): Promise<void> {
    await expect(element).toHaveValue(expectedValue);
  }

  static async assertURLContains(page: any, expectedURL: string): Promise<void> {
    await expect(page).toHaveURL(new RegExp(expectedURL));
  }

  static async assertURLEquals(page: any, expectedURL: string): Promise<void> {
    await expect(page).toHaveURL(expectedURL);
  }

  static async assertTitleContains(page: any, expectedTitle: string): Promise<void> {
    await expect(page).toHaveTitle(new RegExp(expectedTitle));
  }

  static async assertChecked(element: any): Promise<void> {
    await expect(element).toBeChecked();
  }

  static async assertNotChecked(element: any): Promise<void> {
    await expect(element).not.toBeChecked();
  }

  static async assertElementCount(elements: any, expectedCount: number): Promise<void> {
    await expect(elements).toHaveCount(expectedCount);
  }
}
