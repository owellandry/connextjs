import sharp from 'sharp';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import type { Plugin } from 'vite';

export interface ImageOptimizerOptions {
  quality?: number;
  progressive?: boolean;
  webp?: boolean;
  outputDir?: string;
  formats?: readonly ('jpeg' | 'png' | 'webp')[];
}

export class ImageOptimizer {
  private options: Required<ImageOptimizerOptions>;

  constructor(options: ImageOptimizerOptions = {}) {
    this.options = {
      quality: options.quality || 85,
      progressive: options.progressive !== false,
      webp: options.webp !== false,
      outputDir: options.outputDir || 'dist/assets/images',
      formats: options.formats || ['jpeg', 'png', 'webp']
    };
  }

  async optimizeImage(inputPath: string, outputPath?: string): Promise<{
    originalSize: number;
    optimizedSize: number;
    savings: number;
    outputPath: string;
  }> {
    const stats = await fs.stat(inputPath);
    const originalSize = stats.size;
    
    const finalOutputPath = outputPath || this.generateOutputPath(inputPath);
    await fs.ensureDir(path.dirname(finalOutputPath));

    // Usar Sharp para optimización básica
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    let optimizedBuffer: Buffer;
    
    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      optimizedBuffer = await image
        .jpeg({ 
          quality: this.options.quality, 
          progressive: this.options.progressive,
          mozjpeg: true
        })
        .toBuffer();
    } else if (metadata.format === 'png') {
      optimizedBuffer = await image
        .png({ 
          quality: this.options.quality,
          compressionLevel: 9,
          palette: true
        })
        .toBuffer();
    } else {
      // Para otros formatos, usar optimización básica
      optimizedBuffer = await image
        .toBuffer();
    }

    // Aplicar imagemin para optimización adicional
    const plugins = [];
    
    if (this.options.formats.includes('jpeg')) {
      plugins.push(imageminMozjpeg({ quality: this.options.quality }));
    }
    
    if (this.options.formats.includes('png')) {
      plugins.push(imageminPngquant({ 
        quality: [0.6, this.options.quality / 100],
        speed: 1
      }));
    }

    const optimizedFiles = await imagemin([optimizedBuffer], {
      plugins
    });

    const finalBuffer = optimizedFiles[0]?.data || optimizedBuffer;
    await fs.writeFile(finalOutputPath, finalBuffer);

    // Generar versión WebP si está habilitada
    if (this.options.webp && this.options.formats.includes('webp')) {
      const webpPath = this.changeExtension(finalOutputPath, '.webp');
      await sharp(inputPath)
        .webp({ quality: this.options.quality })
        .toFile(webpPath);
    }

    const optimizedSize = finalBuffer.length;
    const savings = ((originalSize - optimizedSize) / originalSize) * 100;

    return {
      originalSize,
      optimizedSize,
      savings,
      outputPath: finalOutputPath
    };
  }

  async optimizeDirectory(inputDir: string, outputDir?: string): Promise<{
    totalOriginalSize: number;
    totalOptimizedSize: number;
    totalSavings: number;
    processedFiles: number;
  }> {
    const spinner = ora('🖼️  Optimizando imágenes...').start();
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];
    const files = await this.findImageFiles(inputDir, imageExtensions);
    
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let processedFiles = 0;

    for (const file of files) {
      try {
        const relativePath = path.relative(inputDir, file);
        const outputPath = outputDir 
          ? path.join(outputDir, relativePath)
          : this.generateOutputPath(file);

        const result = await this.optimizeImage(file, outputPath);
        
        totalOriginalSize += result.originalSize;
        totalOptimizedSize += result.optimizedSize;
        processedFiles++;

        spinner.text = `Optimizando: ${path.basename(file)} (${result.savings.toFixed(1)}% reducido)`;
      } catch (error) {
        console.warn(chalk.yellow(`⚠️  No se pudo optimizar ${file}: ${error}`));
      }
    }

    const totalSavings = totalOriginalSize > 0 
      ? ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100 
      : 0;

    spinner.succeed(`✅ ${processedFiles} imágenes optimizadas`);
    
    console.log(chalk.green(`📊 Estadísticas de optimización:`));
    console.log(chalk.white(`   Tamaño original: ${this.formatBytes(totalOriginalSize)}`));
    console.log(chalk.white(`   Tamaño optimizado: ${this.formatBytes(totalOptimizedSize)}`));
    console.log(chalk.white(`   Ahorro total: ${totalSavings.toFixed(1)}%`));

    return {
      totalOriginalSize,
      totalOptimizedSize,
      totalSavings,
      processedFiles
    };
  }

  private async findImageFiles(dir: string, extensions: string[]): Promise<string[]> {
    const files: string[] = [];
    
    const items = await fs.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        const subFiles = await this.findImageFiles(fullPath, extensions);
        files.push(...subFiles);
      } else if (extensions.includes(path.extname(item.name).toLowerCase())) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  private generateOutputPath(inputPath: string): string {
    const ext = path.extname(inputPath);
    const name = path.basename(inputPath, ext);
    const dir = path.dirname(inputPath);
    
    return path.join(dir, `${name}.optimized${ext}`);
  }

  private changeExtension(filePath: string, newExt: string): string {
    const dir = path.dirname(filePath);
    const name = path.basename(filePath, path.extname(filePath));
    return path.join(dir, `${name}${newExt}`);
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Plugin para Vite
  createVitePlugin(): Plugin {
    const self = this;
    return {
      name: 'connext-image-optimizer',
      async buildStart() {
        console.log(chalk.blue('🖼️  Iniciando optimización de imágenes...'));
      },
      async generateBundle() {
        // Optimizar imágenes durante el build
        const publicDir = 'public';
        const srcImagesDir = 'src/assets/images';
        
        if (await fs.pathExists(publicDir)) {
          await self.optimizeDirectory(publicDir, 'dist');
        }
        
        if (await fs.pathExists(srcImagesDir)) {
          await self.optimizeDirectory(srcImagesDir, 'dist/assets/images');
        }
      }
    };
  }
}

// Función helper para crear el optimizador
export function createImageOptimizer(options?: ImageOptimizerOptions): ImageOptimizer {
  return new ImageOptimizer(options);
}

// Plugin para Vite
export function imageOptimizerPlugin(options?: ImageOptimizerOptions): Plugin {
  const optimizer = new ImageOptimizer(options);
  return optimizer.createVitePlugin();
}