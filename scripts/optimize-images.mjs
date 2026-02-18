import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const PUBLIC_DIR = './client/public';
const IMAGES_DIR = './client/public/images';

// Quality settings for WebP
const WEBP_QUALITY = 80;
const MAX_WIDTH = 1920;

async function convertToWebP(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    return null;
  }

  const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Skip if WebP already exists and is newer
  try {
    const inputStat = await fs.stat(inputPath);
    const outputStat = await fs.stat(outputPath);
    if (outputStat.mtime > inputStat.mtime) {
      console.log(`Skipping (already converted): ${inputPath}`);
      return null;
    }
  } catch (e) {
    // Output doesn't exist, continue with conversion
  }

  try {
    const inputStats = await fs.stat(inputPath);
    const inputSize = inputStats.size;

    await sharp(inputPath)
      .resize(MAX_WIDTH, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    const outputStats = await fs.stat(outputPath);
    const outputSize = outputStats.size;
    const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);

    console.log(`Converted: ${inputPath} -> ${outputPath}`);
    console.log(`  Size: ${(inputSize / 1024 / 1024).toFixed(2)}MB -> ${(outputSize / 1024).toFixed(0)}KB (${savings}% smaller)`);
    
    return { inputPath, outputPath, inputSize, outputSize };
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir) {
  const results = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const subResults = await processDirectory(fullPath);
        results.push(...subResults);
      } else if (entry.isFile()) {
        const result = await convertToWebP(fullPath);
        if (result) results.push(result);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error.message);
  }
  
  return results;
}

async function main() {
  console.log('Starting image optimization...\n');
  
  // Process public directory
  const publicResults = await processDirectory(PUBLIC_DIR);
  
  console.log('\n=== Summary ===');
  console.log(`Total images converted: ${publicResults.length}`);
  
  if (publicResults.length > 0) {
    const totalInputSize = publicResults.reduce((sum, r) => sum + r.inputSize, 0);
    const totalOutputSize = publicResults.reduce((sum, r) => sum + r.outputSize, 0);
    const totalSavings = ((totalInputSize - totalOutputSize) / totalInputSize * 100).toFixed(1);
    
    console.log(`Total size before: ${(totalInputSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Total size after: ${(totalOutputSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Total savings: ${totalSavings}%`);
  }
}

main().catch(console.error);
