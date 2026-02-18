import fs from 'fs/promises';
import path from 'path';

const PUBLIC_DIR = './client/public';
const SRC_DIR = './client/src';

async function getWebPFiles(dir) {
  const webpFiles = new Set();
  
  async function scanDir(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await scanDir(fullPath);
      } else if (entry.name.endsWith('.webp')) {
        // Get the relative path from public dir
        const relativePath = '/' + fullPath.replace(PUBLIC_DIR + '/', '').replace('.webp', '');
        webpFiles.add(relativePath);
      }
    }
  }
  
  await scanDir(dir);
  return webpFiles;
}

async function getTsxFiles(dir) {
  const files = [];
  
  async function scanDir(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await scanDir(fullPath);
      } else if (entry.name.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }
  
  await scanDir(dir);
  return files;
}

async function updateImageReferences(filePath, webpFiles) {
  let content = await fs.readFile(filePath, 'utf-8');
  let modified = false;
  const originalContent = content;
  
  // Replace image references
  const patterns = [
    // src="/path/to/image.jpg"
    /(src=["'])([^"']+)\.(jpg|jpeg|png)(["'])/gi,
    // beforeImage="/path/to/image.jpg"
    /(beforeImage=["'])([^"']+)\.(jpg|jpeg|png)(["'])/gi,
    // afterImage="/path/to/image.jpg"
    /(afterImage=["'])([^"']+)\.(jpg|jpeg|png)(["'])/gi,
    // bg-[url('/path/to/image.jpg')]
    /(bg-\[url\(['"])([^"']+)\.(jpg|jpeg|png)(['"]\)\])/gi,
    // image: "/path/to/image.jpg"
    /(image:\s*["'])([^"']+)\.(jpg|jpeg|png)(["'])/gi,
  ];
  
  for (const pattern of patterns) {
    content = content.replace(pattern, (match, prefix, basePath, ext, suffix) => {
      // Normalize the path for checking
      const normalizedPath = basePath.startsWith('/') ? basePath : `/${basePath}`;
      
      // Check if WebP version exists
      if (webpFiles.has(normalizedPath)) {
        return `${prefix}${basePath}.webp${suffix}`;
      }
      return match;
    });
  }
  
  if (content !== originalContent) {
    await fs.writeFile(filePath, content);
    console.log(`Updated: ${filePath}`);
    return true;
  }
  return false;
}

async function main() {
  console.log('Getting list of WebP files...');
  const webpFiles = await getWebPFiles(PUBLIC_DIR);
  console.log(`Found ${webpFiles.size} WebP files\n`);
  
  console.log('Updating image references in TSX files...');
  const tsxFiles = await getTsxFiles(SRC_DIR);
  
  let updatedCount = 0;
  for (const file of tsxFiles) {
    const updated = await updateImageReferences(file, webpFiles);
    if (updated) updatedCount++;
  }
  
  console.log(`\nTotal files updated: ${updatedCount}`);
}

main().catch(console.error);
