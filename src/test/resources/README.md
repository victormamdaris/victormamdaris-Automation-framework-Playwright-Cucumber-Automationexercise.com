# Resources Directory

This folder contains static resources needed for test execution - files, images, documents, and other assets.

## Purpose

Store various resources such as:
- **Upload files** - Documents, images, PDFs for upload testing
- **Test assets** - Images, videos, audio files
- **Templates** - HTML, email, or configuration templates
- **Certificates** - SSL certificates for testing
- **Mock files** - Sample files for different scenarios

## Structure

```
resources/
├── images/
│   ├── test-avatar.jpg
│   ├── test-banner.png
│   └── sample-photo.jpeg
├── documents/
│   ├── test-document.pdf
│   ├── sample-invoice.pdf
│   └── terms-conditions.docx
├── files/
│   ├── test-file.txt
│   ├── sample-data.csv
│   └── upload-test.xlsx
├── templates/
│   ├── email-template.html
│   └── report-template.html
└── certificates/
    └── test-cert.pem
```

## Example Usage

### File Upload Testing

```typescript
import { ContactPage } from '@pages/ui/contact/contact.page';
import path from 'path';

// Upload a test file
const filePath = path.join(process.cwd(), 'src/test/resources/files/test-file.txt');
await contactPage.uploadFile(filePath);
```

### Image Upload

```typescript
const imagePath = path.join(
  process.cwd(), 
  'src/test/resources/images/test-avatar.jpg'
);
await profilePage.uploadProfilePicture(imagePath);
```

### Working with Different File Types

```typescript
// PDF upload
const pdfPath = 'src/test/resources/documents/test-document.pdf';

// CSV data import
const csvPath = 'src/test/resources/files/sample-data.csv';

// Image upload
const imgPath = 'src/test/resources/images/test-banner.png';
```

## Creating Test Files Programmatically

```typescript
import { FileHelper } from '@helpers/file-helper';
import fs from 'fs';
import path from 'path';

// Create a test file
const filePath = path.join(process.cwd(), 'src/test/resources/files/generated-file.txt');
await FileHelper.writeFile(filePath, 'This is test content');

// Verify file exists
const exists = await FileHelper.fileExists(filePath);
```

## Best Practices

1. **Use Small Files** - Keep test files small to avoid repository bloat
2. **Use Realistic Files** - Test with file types used in production
3. **Organize by Type** - Group similar resources together
4. **Document Purpose** - Add README in subfolders if needed
5. **Version Control** - Commit resources needed for tests
6. **Clean Up** - Remove unused resources regularly

## Common Test Scenarios

### Contact Form File Upload
```feature
Scenario: Submit contact form with attachment
  When I attach a file to the form
  And I submit the contact form
  Then I should see success message
```

### Profile Picture Upload
```feature
Scenario: Update profile picture
  When I upload a profile picture "test-avatar.jpg"
  Then I should see the updated profile picture
```

### Document Verification
```feature
Scenario: Upload identity document
  When I upload document "test-document.pdf"
  Then the document should be accepted
```

## File Size Limits

Consider creating files of different sizes to test:
- Small files (< 1MB)
- Medium files (1-10MB)
- Large files (10MB+)
- Maximum allowed size
- Over-limit files (for error testing)

## Supported Formats

Document the formats your application supports and keep test files for each:
- Images: JPG, PNG, GIF, SVG
- Documents: PDF, DOC, DOCX, TXT
- Data: CSV, XLSX, JSON, XML
- Archives: ZIP, RAR, TAR

