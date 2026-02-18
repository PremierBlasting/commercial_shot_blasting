import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const PUBLIC_DIR = './client/public';
const SIZES = [640, 1024, 1920]; // Mobile, tablet, desktop
const QUALITY = 80;

async function generateResponsiveSizes(inputPath) {
  const filename = path.basename(inputPath, '.webp');
  const dirname = path.dirname(inputPath);
  
  console.log(`Processing: ${inputPath}`);
  
  // Get original image dimensions
  const metadata = await sharp(inputPath).metadata();
  console.log(`  Original size: ${metadata.width}x${metadata.height}`);
  
  for (const width of SIZES) {
    // Skip if target width is larger than original
    if (width >= metadata.width) {
      console.log(`  Skipping ${width}w (larger than original)`);
      continue;
    }
    
    const outputPath = path.join(dirname, `${filename}-${width}w.webp`);
    
    // Check if already exists
    try {
      await fs.access(outputPath);
      console.log(`  Skipping ${width}w (already exists)`);
      continue;
    } catch (e) {
      // File doesn't exist, continue with generation
    }
    
    await sharp(inputPath)
      .resize(width, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const stats = await fs.stat(outputPath);
    console.log(`  Generated ${width}w: ${(stats.size / 1024).toFixed(0)}KB`);
  }
}

async function main() {
  console.log('Generating responsive image sizes for hero carousel...\n');
  
  // Get all hero carousel images
  const files = await fs.readdir(PUBLIC_DIR);
  const heroImages = files.filter(f => 
    f.startsWith('hero-carousel-') && 
    f.endsWith('.webp') && 
    !f.includes('-640w') && 
    !f.includes('-1024w') && 
    !f.includes('-1920w')
  );
  
  console.log(`Found ${heroImages.length} hero carousel images\n`);
  
  for (const image of heroImages) {
    await generateResponsiveSizes(path.join(PUBLIC_DIR, image));
    console.log('');
  }
  
  // Also generate for operator images used in hero
  const operatorImages = ['operator-blasting-gate.webp', 'operator-warehouse-interior.webp'];
  for (const image of operatorImages) {
    const imagePath = path.join(PUBLIC_DIR, image);
    try {
      await fs.access(imagePath);
      await generateResponsiveSizes(imagePath);
      console.log('');
    } catch (e) {
      console.log(`Skipping ${image} (not found)`);
    }
  }
  
  console.log('Done!');
}

main().catch(console.error);
