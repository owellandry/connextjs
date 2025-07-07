import { minify } from 'terser';
import obfuscator from 'rollup-plugin-obfuscator';
import type { Plugin } from 'vite';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

export interface BuildOptimizerOptions {
  obfuscation?: {
    enabled?: boolean;
    compact?: boolean;
    controlFlowFlattening?: boolean;
    deadCodeInjection?: boolean;
    stringArray?: boolean;
    rotateStringArray?: boolean;
    stringArrayThreshold?: number;
    unicodeEscapeSequence?: boolean;
  };
  minification?: {
    enabled?: boolean;
    dropConsole?: boolean;
    dropDebugger?: boolean;
    keepFnames?: boolean;
  };
  sourceMaps?: boolean;
}

export class BuildOptimizer {
  private options: Required<BuildOptimizerOptions>;

  constructor(options: BuildOptimizerOptions = {}) {
    this.options = {
      obfuscation: {
        enabled: options.obfuscation?.enabled !== false,
        compact: options.obfuscation?.compact !== false,
        controlFlowFlattening: options.obfuscation?.controlFlowFlattening !== false,
        deadCodeInjection: options.obfuscation?.deadCodeInjection !== false,
        stringArray: options.obfuscation?.stringArray !== false,
        rotateStringArray: options.obfuscation?.rotateStringArray !== false,
        stringArrayThreshold: options.obfuscation?.stringArrayThreshold || 0.75,
        unicodeEscapeSequence: options.obfuscation?.unicodeEscapeSequence !== false
      },
      minification: {
        enabled: options.minification?.enabled !== false,
        dropConsole: options.minification?.dropConsole !== false,
        dropDebugger: options.minification?.dropDebugger !== false,
        keepFnames: options.minification?.keepFnames || false
      },
      sourceMaps: options.sourceMaps || false
    };
  }

  // Plugin para Vite/Rollup
  createVitePlugin(): Plugin {
    const self = this;
    return {
      name: 'connext-build-optimizer',
      apply: 'build' as const,
      config(config: any) {
        // Configurar build optimizado
        config.build = config.build || {};
        config.build.minify = self.options.minification.enabled;
        config.build.sourcemap = self.options.sourceMaps;
        
        if (self.options.minification.enabled) {
          config.build.terserOptions = {
            compress: {
              drop_console: self.options.minification.dropConsole,
              drop_debugger: self.options.minification.dropDebugger,
              pure_funcs: ['console.log', 'console.info', 'console.debug'],
              passes: 2
            },
            mangle: {
              keep_fnames: self.options.minification.keepFnames,
              safari10: true
            },
            format: {
              comments: false
            }
          };
        }
        
        // Agregar plugins de optimización
        config.build.rollupOptions = config.build.rollupOptions || {};
        config.build.rollupOptions.plugins = config.build.rollupOptions.plugins || [];
        
        if (self.options.obfuscation.enabled) {
          config.build.rollupOptions.plugins.push(
            obfuscator({
              compact: self.options.obfuscation.compact,
              controlFlowFlattening: self.options.obfuscation.controlFlowFlattening,
              deadCodeInjection: self.options.obfuscation.deadCodeInjection,
              stringArray: self.options.obfuscation.stringArray,
              rotateStringArray: self.options.obfuscation.rotateStringArray,
              stringArrayThreshold: self.options.obfuscation.stringArrayThreshold,
              unicodeEscapeSequence: self.options.obfuscation.unicodeEscapeSequence,
              // Configuraciones adicionales para mejor ofuscación
              identifierNamesGenerator: 'hexadecimal',
              renameGlobals: false,
              selfDefending: true,
              splitStrings: true,
              splitStringsChunkLength: 10,
              transformObjectKeys: true
            })
          );
        }
      },
      buildStart() {
        console.log(chalk.blue('🔒 Iniciando build optimizado con ofuscación...'));
      },
      buildEnd() {
        console.log(chalk.green('✅ Build optimizado completado'));
      }
    };
  }

  // Optimizar archivos JavaScript existentes
  async optimizeFile(inputPath: string, outputPath?: string): Promise<{
    originalSize: number;
    optimizedSize: number;
    savings: number;
    outputPath: string;
  }> {
    const spinner = ora(`Optimizando ${path.basename(inputPath)}...`).start();
    
    try {
      const code = await fs.readFile(inputPath, 'utf8');
      const originalSize = Buffer.byteLength(code, 'utf8');
      
      let optimizedCode = code;
      
      // Aplicar minificación si está habilitada
      if (this.options.minification.enabled) {
        const terserResult = await minify(optimizedCode, {
          compress: {
            drop_console: this.options.minification.dropConsole,
            drop_debugger: this.options.minification.dropDebugger,
            pure_funcs: ['console.log', 'console.info', 'console.debug']
          },
          mangle: {
            keep_fnames: this.options.minification.keepFnames
          }
        });
        
        if (terserResult && typeof terserResult.code === 'string') {
          optimizedCode = terserResult.code;
        }
      }
      
      const finalOutputPath = outputPath || this.generateOutputPath(inputPath);
      await fs.ensureDir(path.dirname(finalOutputPath));
      await fs.writeFile(finalOutputPath, optimizedCode);
      
      const optimizedSize = Buffer.byteLength(optimizedCode, 'utf8');
      const savings = ((originalSize - optimizedSize) / originalSize) * 100;
      
      spinner.succeed(`Optimizado: ${path.basename(inputPath)} (${savings.toFixed(1)}% reducido)`);
      
      return {
        originalSize,
        optimizedSize,
        savings,
        outputPath: finalOutputPath
      };
    } catch (error) {
      spinner.fail(`Error optimizando ${path.basename(inputPath)}`);
      throw error;
    }
  }

  // Optimizar directorio completo
  async optimizeDirectory(inputDir: string, outputDir?: string): Promise<{
    totalOriginalSize: number;
    totalOptimizedSize: number;
    totalSavings: number;
    processedFiles: number;
  }> {
    const spinner = ora('🔒 Optimizando archivos JavaScript...').start();
    
    const jsExtensions = ['.js', '.mjs', '.ts'];
    const files = await this.findJSFiles(inputDir, jsExtensions);
    
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let processedFiles = 0;

    for (const file of files) {
      try {
        const relativePath = path.relative(inputDir, file);
        const outputPath = outputDir 
          ? path.join(outputDir, relativePath)
          : this.generateOutputPath(file);

        const result = await this.optimizeFile(file, outputPath);
        
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

    spinner.succeed(`✅ ${processedFiles} archivos optimizados`);
    
    console.log(chalk.green(`📊 Estadísticas de optimización:`));
    console.log(chalk.white(`   Tamaño original: ${this.formatBytes(totalOriginalSize)}`));
    console.log(chalk.white(`   Tamaño optimizado: ${this.formatBytes(totalOptimizedSize)}`));
    console.log(chalk.white(`   Ahorro total: ${totalSavings.toFixed(1)}%`));
    console.log(chalk.white(`   🔒 Código ofuscado y protegido`));

    return {
      totalOriginalSize,
      totalOptimizedSize,
      totalSavings,
      processedFiles
    };
  }

  private async findJSFiles(dir: string, extensions: string[]): Promise<string[]> {
    const files: string[] = [];
    
    const items = await fs.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
        const subFiles = await this.findJSFiles(fullPath, extensions);
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

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Función helper para crear el optimizador
export function createBuildOptimizer(options?: BuildOptimizerOptions): BuildOptimizer {
  return new BuildOptimizer(options);
}

// Plugin para Vite con ofuscación
export function obfuscatorPlugin(options?: BuildOptimizerOptions) {
  const optimizer = new BuildOptimizer(options);
  return optimizer.createVitePlugin();
}

// Función para crear configuración de build ofuscado
export async function createObfuscatedBuild(projectDir: string) {
  const viteConfigPath = path.join(projectDir, 'vite.config.js');
  
  const viteConfig = `import { defineConfig } from 'vite';
import { obfuscatorPlugin } from 'connextjs/build';
import { imageOptimizerPlugin } from 'connextjs/image';

export default defineConfig({
  plugins: [
    // Ofuscación automática en build
    obfuscatorPlugin({
      obfuscation: {
        enabled: true,
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        stringArray: true,
        rotateStringArray: true
      },
      minification: {
        enabled: true,
        dropConsole: true,
        dropDebugger: true
      }
    }),
    // Optimización automática de imágenes
    imageOptimizerPlugin({
      quality: 85,
      webp: true
    })
  ],
  server: {
    port: 3000,
    host: 'localhost',
    open: true
  },
  build: {
    minify: 'terser',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    }
  }
});`;
  
  await fs.writeFile(viteConfigPath, viteConfig);
}