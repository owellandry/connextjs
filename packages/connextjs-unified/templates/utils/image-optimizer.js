// Optimizador de imágenes local
import sharp from 'sharp';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import { promises as fs } from 'fs';
import path from 'path';

export class ImageOptimizer {
  constructor(options = {}) {
    this.quality = options.quality || 85;
    this.formats = options.formats || ['webp', 'jpeg', 'png'];
    this.outputDir = options.outputDir || 'dist/assets';
  }

  async optimizeImage(inputPath, outputPath) {
    try {
      const ext = path.extname(inputPath).toLowerCase();
      
      if (['.jpg', '.jpeg'].includes(ext)) {
        await this.optimizeJpeg(inputPath, outputPath);
      } else if (ext === '.png') {
        await this.optimizePng(inputPath, outputPath);
      }
      
      // Generar versión WebP
      if (this.formats.includes('webp')) {
        const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        await this.generateWebp(inputPath, webpPath);
      }
    } catch (error) {
      console.error(`Error optimizando ${inputPath}:`, error);
    }
  }

  async optimizeJpeg(inputPath, outputPath) {
    const buffer = await imagemin([inputPath], {
      plugins: [
        imageminMozjpeg({ quality: this.quality })
      ]
    });
    await fs.writeFile(outputPath, buffer[0].data);
  }

  async optimizePng(inputPath, outputPath) {
    const buffer = await imagemin([inputPath], {
      plugins: [
        imageminPngquant({ quality: [0.6, this.quality / 100] })
      ]
    });
    await fs.writeFile(outputPath, buffer[0].data);
  }

  async generateWebp(inputPath, outputPath) {
    await sharp(inputPath)
      .webp({ quality: this.quality })
      .toFile(outputPath);
  }
}

export function createImageOptimizer(options) {
  return new ImageOptimizer(options);
}