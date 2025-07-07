#!/usr/bin/env node
import { program } from "commander";
import fsExtra from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import ora from "ora";
import { execSync } from "child_process";
import { createImageOptimizer } from "../image-optimizer.js";
import { createObfuscatedBuild } from "../build-optimizer.js";

const { copy, writeFile, readFile, ensureDir } = fsExtra;

program
  .name("create-connext-app")
  .description("Crear una nueva aplicación ConnextJS con todas las herramientas integradas")
  .argument("<dir>", "nombre del proyecto")
  .option("-p, --port <port>", "puerto del servidor de desarrollo", "3000")
  .option("--no-install", "no instalar dependencias automáticamente")
  .option("--npm", "usar npm en lugar de pnpm")
  .action(async (dir, options) => {
    try {
      console.log(chalk.blue(`\n🚀 Creando proyecto ConnextJS en ./${dir}...\n`));

      const spinner = ora("Creando estructura del proyecto...").start();

      // Crear directorio del proyecto
      await ensureDir(dir);

      // Crear estructura básica
      await createProjectStructure(dir, options);
      
      spinner.text = "Configurando optimizaciones...";
      
      // Configurar optimizador de imágenes
      await createImageOptimizer(dir);
      
      // Configurar build con ofuscación
      await createObfuscatedBuild(dir);
      
      spinner.succeed("Proyecto creado exitosamente");
      
      // Navegar al directorio automáticamente
      process.chdir(dir);
      console.log(chalk.green(`📁 Navegando a ${dir}...`));
      
      // Instalar dependencias automáticamente
      if (options.install !== false) {
        const packageManager = options.npm ? 'npm' : 'pnpm';
        const installSpinner = ora(`Instalando dependencias con ${packageManager}...`).start();
        
        try {
          if (packageManager === 'pnpm') {
            // Verificar si pnpm está disponible
            try {
              execSync('pnpm --version', { stdio: 'ignore' });
            } catch {
              console.log(chalk.yellow('\n⚠️  pnpm no está instalado, usando npm...'));
              execSync('npm install', { stdio: 'inherit' });
              installSpinner.succeed('Dependencias instaladas con npm');
            }
            execSync('pnpm install', { stdio: 'inherit' });
            installSpinner.succeed('Dependencias instaladas con pnpm');
          } else {
            execSync('npm install', { stdio: 'inherit' });
            installSpinner.succeed('Dependencias instaladas con npm');
          }
        } catch (error) {
          installSpinner.fail('Error instalando dependencias');
          console.log(chalk.red(`Error: ${error}`));
        }
      }
      
      console.log(chalk.green(`\n✨ ¡Proyecto ${dir} creado exitosamente!\n`));
      console.log(chalk.cyan(`🎯 Características incluidas:`));
      console.log(chalk.white(`   ✅ Ofuscación automática en build`));
      console.log(chalk.white(`   ✅ Optimización automática de imágenes`));
      console.log(chalk.white(`   ✅ Configuración para Vercel`));
      console.log(chalk.white(`   ✅ TypeScript y Tailwind CSS`));
      
      console.log(chalk.cyan(`\n🚀 Comandos disponibles:`));
      console.log(chalk.white(`   npm run dev     - Servidor de desarrollo`));
      console.log(chalk.white(`   npm run build   - Build optimizado y ofuscado`));
      console.log(chalk.white(`   npm run preview - Vista previa del build`));
      
      console.log(chalk.cyan(`\n🌐 El servidor estará disponible en:`));
      console.log(chalk.white(`   http://localhost:${options.port}/`));
      
      if (options.install !== false) {
        console.log(chalk.cyan(`\n🎉 ¡Todo listo! Ejecuta:`));
        console.log(chalk.white(`   npm run dev`));
      } else {
        console.log(chalk.cyan(`\n📦 Próximos pasos:`));
        console.log(chalk.white(`   cd ${dir}`));
        console.log(chalk.white(`   pnpm install  # o npm install`));
        console.log(chalk.white(`   npm run dev`));
      }
      
    } catch (error) {
      console.error(chalk.red(`\n❌ Error creando el proyecto: ${error}\n`));
      process.exit(1);
    }
  });

async function createProjectStructure(dir: string, options: any) {
  // Crear package.json
  const packageJson = {
    "name": path.basename(dir),
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "connext build",
      "preview": "vite preview",
      "optimize-images": "connext optimize-images"
    },
    "dependencies": {
      "sharp": "^0.33.0",
      "imagemin": "^8.0.1",
      "imagemin-mozjpeg": "^10.0.0",
      "imagemin-pngquant": "^9.0.2",
      "imagemin-webp": "^8.0.0"
    },
    "devDependencies": {
      "vite": "^7.0.0",
      "typescript": "^5.8.3",
      "tailwindcss": "^3.4.0",
      "autoprefixer": "^10.4.0",
      "postcss": "^8.4.0",
      "@rollup/pluginutils": "^5.0.0",
      "terser": "^5.24.0"
    }
  };
  
  await writeFile(path.join(dir, 'package.json'), JSON.stringify(packageJson, null, 2));
  
  // Crear index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ConnextJS App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>`;
  
  await writeFile(path.join(dir, 'index.html'), indexHtml);
  
  // Crear estructura src/
  await ensureDir(path.join(dir, 'src'));
  await ensureDir(path.join(dir, 'public'));
  await ensureDir(path.join(dir, 'src/assets/images'));
  await ensureDir(path.join(dir, 'utils'));
  
  // Copiar archivos de utilidades
  await copyUtilityFiles(dir);
  
  // Crear main.ts
  const mainTs = `import "./index.css";
import { createImageOptimizer } from "./utils/image-optimizer.js";

// Inicializar optimizador de imágenes
const imageOptimizer = createImageOptimizer();

const app = document.getElementById("app")!;

let count = 0;

app.innerHTML = \`
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">ConnextJS</h1>
      <p class="text-gray-600 mb-6 text-center">¡Framework completo con optimizaciones automáticas!</p>
      <div class="text-center mb-4">
        <button id="counter-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
          Contador: <span id="count">0</span>
        </button>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-500">✅ Build con ofuscación automática</p>
        <p class="text-sm text-gray-500">✅ Optimización de imágenes</p>
      </div>
    </div>
  </div>
\`;

const btn = document.getElementById('counter-btn');
const countSpan = document.getElementById('count');

btn?.addEventListener('click', () => {
  count++;
  if (countSpan) countSpan.textContent = count.toString();
});

// Ejemplo de optimización de imagen
const optimizeExampleImage = async () => {
  // Las imágenes se optimizan automáticamente durante el build
  console.log('🖼️ Imágenes optimizadas automáticamente');
};`;
  
  await writeFile(path.join(dir, 'src/main.ts'), mainTs);
  
  // Crear CSS
  const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;
  
  await writeFile(path.join(dir, 'src/index.css'), indexCss);
  
  // Crear configuraciones
  await createConfigurations(dir, options);
}

async function createConfigurations(dir: string, options: any) {
  // Vite config con ofuscación
  const viteConfig = `import { defineConfig } from 'vite';
import { obfuscatorPlugin } from './utils/obfuscator-plugin.js';

export default defineConfig({
  plugins: [
    // Ofuscación automática en build
    obfuscatorPlugin({
      enabled: true,
      dropConsole: true,
      dropDebugger: true
    })
  ],
  server: {
    port: ${options.port},
    host: 'localhost',
    open: true
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});`;
  
  await writeFile(path.join(dir, 'vite.config.js'), viteConfig);
  
  // Tailwind config
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,cnx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
  
  await writeFile(path.join(dir, 'tailwind.config.js'), tailwindConfig);
  
  // PostCSS config
  const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
  
  await writeFile(path.join(dir, 'postcss.config.js'), postcssConfig);
  
  // Vercel config
  const vercelConfig = {
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "installCommand": "npm install --legacy-peer-deps",
    "framework": "vite",
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  };
  
  await writeFile(path.join(dir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2));
  
  // .gitignore
  const gitignore = `node_modules
dist
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store`;
  
  await writeFile(path.join(dir, '.gitignore'), gitignore);
}

async function copyUtilityFiles(dir: string) {
  // Crear image-optimizer.js
  const imageOptimizerContent = `// Optimizador de imágenes local
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
        const webpPath = outputPath.replace(/\\.(jpg|jpeg|png)$/i, '.webp');
        await this.generateWebp(inputPath, webpPath);
      }
    } catch (error) {
      console.error(\`Error optimizando \${inputPath}:\`, error);
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
`;
  
  await writeFile(path.join(dir, 'utils/image-optimizer.js'), imageOptimizerContent);
  
  // Crear obfuscator-plugin.js
  const obfuscatorContent = `// Plugin de ofuscación para Vite
import { createFilter } from '@rollup/pluginutils';
import { minify } from 'terser';

export function obfuscatorPlugin(options = {}) {
  const filter = createFilter(
    options.include || ['**/*.js', '**/*.ts'],
    options.exclude || ['node_modules/**']
  );

  return {
    name: 'obfuscator',
    apply: 'build',
    generateBundle: {
      order: 'post',
      async handler(opts, bundle) {
        if (!options.enabled) return;

        for (const [fileName, chunk] of Object.entries(bundle)) {
          if (chunk.type === 'chunk' && filter(fileName)) {
            try {
              const result = await minify(chunk.code, {
                compress: {
                  drop_console: options.dropConsole !== false,
                  drop_debugger: options.dropDebugger !== false,
                  pure_funcs: ['console.log', 'console.info', 'console.debug'],
                  ...options.compress
                },
                mangle: {
                  safari10: true,
                  ...options.mangle
                },
                format: {
                  comments: false,
                  ...options.format
                },
                ...options.terserOptions
              });

              if (result.code) {
                chunk.code = result.code;
              }
            } catch (error) {
              console.warn(\`Error ofuscando \${fileName}:\`, error);
            }
          }
        }
      }
    }
  };
}
`;
  
  await writeFile(path.join(dir, 'utils/obfuscator-plugin.js'), obfuscatorContent);
}

program.parse();