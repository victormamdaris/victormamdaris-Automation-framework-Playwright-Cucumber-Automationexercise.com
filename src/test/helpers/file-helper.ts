import * as fs from 'fs';
import * as path from 'path';

export class FileHelper {
  static async createDirectory(dirPath: string): Promise<void> {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  static async readJsonFile(filePath: string): Promise<any> {
    const fullPath = path.resolve(filePath);
    const data = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(data);
  }

  static async writeJsonFile(filePath: string, data: any): Promise<void> {
    const fullPath = path.resolve(filePath);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  }

  static generateRandomEmail(): string {
    const timestamp = Date.now();
    return `test_${timestamp}@automation.com`;
  }

  static generateRandomString(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  static generateRandomNumber(min: number = 1000, max: number = 9999): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  static getCurrentTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }
}
