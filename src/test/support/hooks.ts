import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { CustomWorld } from './custom-world';
import { BrowserManager } from '@core/browser-manager';
import { FileHelper } from '@helpers/file-helper';

BeforeAll(async function () {
  await FileHelper.createDirectory('screenshots');
  await FileHelper.createDirectory('videos');
  await FileHelper.createDirectory('reports');
});

Before(async function (this: CustomWorld, { pickle }) {
  const isApiTest = pickle.tags.some(tag => tag.name === '@api');
  
  if (isApiTest) {
    await this.initApiOnly();
  } else {
    await this.init();
  }
});

After(async function (this: CustomWorld, { result, pickle }) {
  if (result?.status === Status.FAILED) {
    const timestamp = FileHelper.getCurrentTimestamp();
    const screenshotName = `${pickle.name.replace(/\s+/g, '_')}_${timestamp}`;
    
    try {
      // Take screenshot BEFORE cleanup
      if (this.page && !this.page.isClosed()) {
        await this.page.screenshot({ 
          path: `screenshots/${screenshotName}.png`,
          fullPage: true 
        });
      }
    } catch (error) {
      console.error('Failed to take screenshot:', error);
    }

    // Save video on failure if recording is enabled
    try {
      if (this.page && !this.page.isClosed()) {
        const video = this.page.video();
        if (video) {
          const videoName = `${pickle.name.replace(/\s+/g, '_')}_${timestamp}`;
          await this.page.close(); // Close page to finish video recording
          await video.saveAs(`videos/${videoName}.webm`);
          console.log(`📹 Video saved: videos/${videoName}.webm`);
        }
      }
    } catch (error) {
      console.error('Failed to save video:', error);
    }
  }

  // Clear browser storage for UI tests to reset cart and session
  const isUiTest = pickle.tags.some(tag => tag.name === '@ui');
  if (isUiTest && this.page && !this.page.isClosed()) {
    try {
      await this.page.evaluate('localStorage.clear(); sessionStorage.clear();');
    } catch (error) {
      // Ignore errors if page is already closed
    }
  }

  await this.cleanup();
});

AfterAll(async function () {
  // Cleanup completed
});
