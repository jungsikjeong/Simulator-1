const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');

async function optimizeImage(filePath) {
    const ext = path.extname(filePath);
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

    const outputPath = filePath.replace(ext, '.webp');

    try {
        await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(outputPath);

        console.log(`Optimized: ${filePath} -> ${outputPath}`);
    } catch (error) {
        console.error(`Error optimizing ${filePath}:`, error);
    }
}

async function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            await processDirectory(filePath);
        } else {
            await optimizeImage(filePath);
        }
    }
}

processDirectory(PUBLIC_DIR)
    .then(() => console.log('Image optimization complete!'))
    .catch(console.error); 