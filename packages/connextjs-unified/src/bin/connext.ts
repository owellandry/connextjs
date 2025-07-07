#!/usr/bin/env node
import { program } from "commander";
import chalk from "chalk";
import ora from "ora";
import { execSync } from "child_process";
import { ImageOptimizer } from "../image-optimizer.js";
import { BuildOptimizer } from "../build-optimizer.js";
import fs from "fs-extra";
import path from "path";

program
  .name("connext")
  .description("CLI de ConnextJS con herramientas de optimización integradas")
  .version("0.1.0");

// Comando para build optimizado
program
  .command("build")
  .description("Construir aplicación con ofuscación automática")
  .option("--no-obfuscate", "deshabilitar ofuscación")
  .option("--no-optimize-images", "deshabilitar optimización de imágenes")
  .option("--sourcemap", "generar source maps")
  .action(async (options) => {
    try {
      console.log(chalk.blue("\n🚀 Iniciando build optimizado de ConnextJS...\n"));
      
      const spinner = ora("Preparando build...").start();
      
      // Verificar que estamos en un proyecto ConnextJS
      const packageJsonPath = "package.json";
      if (!await fs.pathExists(packageJsonPath)) {
        spinner.fail("No se encontró package.json");
        console.error(chalk.red("❌ Este comando debe ejecutarse en la raíz de un proyecto ConnextJS"));
        process.exit(1);
      }
      
      const packageJson = await fs.readJson(packageJsonPath);
      if (!packageJson.dependencies?.connextjs && !packageJson.devDependencies?.connextjs) {
        spinner.fail("No es un proyecto ConnextJS");
        console.error(chalk.red("❌ Este no parece ser un proyecto ConnextJS"));
        process.exit(1);
      }
      
      spinner.text = "Optimizando imágenes...";
      
      // Optimizar imágenes si está habilitado
      if (options.optimizeImages !== false) {
        const imageOptimizer = new ImageOptimizer({
          quality: 85,
          webp: true,
          outputDir: "dist/assets/images"
        });
        
        // Optimizar imágenes en public/
        if (await fs.pathExists("public")) {
          await imageOptimizer.optimizeDirectory("public", "dist");
        }
        
        // Optimizar imágenes en src/assets/
        if (await fs.pathExists("src/assets")) {
          await imageOptimizer.optimizeDirectory("src/assets", "dist/assets");
        }
      }
      
      spinner.text = "Ejecutando build con Vite...";
      
      // Ejecutar build de Vite
      const buildCommand = "vite build";
      execSync(buildCommand, { stdio: "inherit" });
      
      spinner.text = "Aplicando ofuscación adicional...";
      
      // Aplicar ofuscación adicional si está habilitada
      if (options.obfuscate !== false) {
        const buildOptimizer = new BuildOptimizer({
          obfuscation: {
            enabled: true,
            compact: true,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            stringArray: true,
            rotateStringArray: true
          },
          sourceMaps: options.sourcemap || false
        });
        
        if (await fs.pathExists("dist")) {
          await buildOptimizer.optimizeDirectory("dist");
        }
      }
      
      spinner.succeed("Build completado exitosamente");
      
      console.log(chalk.green("\n✨ ¡Build optimizado completado!"));
      console.log(chalk.cyan("📊 Características aplicadas:"));
      
      if (options.obfuscate !== false) {
        console.log(chalk.white("   ✅ Código ofuscado y protegido"));
      }
      
      if (options.optimizeImages !== false) {
        console.log(chalk.white("   ✅ Imágenes optimizadas automáticamente"));
      }
      
      console.log(chalk.white("   ✅ Código minificado"));
      console.log(chalk.white("   ✅ Console.log removidos"));
      console.log(chalk.white("   ✅ Listo para producción"));
      
      console.log(chalk.cyan("\n🚀 Para desplegar:"));
      console.log(chalk.white("   - Sube la carpeta 'dist' a tu servidor"));
      console.log(chalk.white("   - O conecta tu repo a Vercel/Netlify"));
      
    } catch (error) {
      console.error(chalk.red(`\n❌ Error durante el build: ${error}\n`));
      process.exit(1);
    }
  });

// Comando para optimizar imágenes
program
  .command("optimize-images")
  .description("Optimizar todas las imágenes del proyecto")
  .option("-i, --input <dir>", "directorio de entrada", "src/assets/images")
  .option("-o, --output <dir>", "directorio de salida", "src/assets/images/optimized")
  .option("-q, --quality <number>", "calidad de compresión (1-100)", "85")
  .option("--webp", "generar versiones WebP")
  .action(async (options) => {
    try {
      console.log(chalk.blue("\n🖼️  Optimizando imágenes...\n"));
      
      const imageOptimizer = new ImageOptimizer({
        quality: parseInt(options.quality),
        webp: options.webp,
        outputDir: options.output
      });
      
      if (!await fs.pathExists(options.input)) {
        console.error(chalk.red(`❌ El directorio ${options.input} no existe`));
        process.exit(1);
      }
      
      const result = await imageOptimizer.optimizeDirectory(options.input, options.output);
      
      console.log(chalk.green("\n✨ ¡Optimización completada!"));
      console.log(chalk.cyan(`📁 Archivos procesados: ${result.processedFiles}`));
      console.log(chalk.cyan(`💾 Espacio ahorrado: ${result.totalSavings.toFixed(1)}%`));
      
    } catch (error) {
      console.error(chalk.red(`\n❌ Error optimizando imágenes: ${error}\n`));
      process.exit(1);
    }
  });

// Comando para desarrollo
program
  .command("dev")
  .description("Iniciar servidor de desarrollo")
  .option("-p, --port <port>", "puerto del servidor", "3000")
  .option("--host <host>", "host del servidor", "localhost")
  .option("--open", "abrir navegador automáticamente")
  .action(async (options) => {
    try {
      console.log(chalk.blue(`\n🚀 Iniciando servidor de desarrollo en http://${options.host}:${options.port}\n`));
      
      const devCommand = `vite --port ${options.port} --host ${options.host}${options.open ? ' --open' : ''}`;
      execSync(devCommand, { stdio: "inherit" });
      
    } catch (error) {
      console.error(chalk.red(`\n❌ Error iniciando servidor: ${error}\n`));
      process.exit(1);
    }
  });

// Comando para preview
program
  .command("preview")
  .description("Vista previa del build")
  .option("-p, --port <port>", "puerto del servidor", "4173")
  .option("--host <host>", "host del servidor", "localhost")
  .action(async (options) => {
    try {
      console.log(chalk.blue(`\n👀 Iniciando vista previa en http://${options.host}:${options.port}\n`));
      
      if (!await fs.pathExists("dist")) {
        console.error(chalk.red("❌ No se encontró la carpeta 'dist'. Ejecuta 'connext build' primero."));
        process.exit(1);
      }
      
      const previewCommand = `vite preview --port ${options.port} --host ${options.host}`;
      execSync(previewCommand, { stdio: "inherit" });
      
    } catch (error) {
      console.error(chalk.red(`\n❌ Error en vista previa: ${error}\n`));
      process.exit(1);
    }
  });

// Comando de información
program
  .command("info")
  .description("Mostrar información del proyecto ConnextJS")
  .action(async () => {
    try {
      console.log(chalk.blue("\n📋 Información del proyecto ConnextJS\n"));
      
      // Leer package.json
      if (await fs.pathExists("package.json")) {
        const packageJson = await fs.readJson("package.json");
        
        console.log(chalk.cyan("📦 Proyecto:"));
        console.log(chalk.white(`   Nombre: ${packageJson.name || 'N/A'}`));
        console.log(chalk.white(`   Versión: ${packageJson.version || 'N/A'}`));
        
        if (packageJson.dependencies?.connextjs || packageJson.devDependencies?.connextjs) {
          console.log(chalk.green("   ✅ Proyecto ConnextJS detectado"));
        } else {
          console.log(chalk.yellow("   ⚠️  No parece ser un proyecto ConnextJS"));
        }
        
        console.log(chalk.cyan("\n🛠️  Dependencias ConnextJS:"));
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        
        Object.keys(deps)
          .filter(dep => dep.includes('connext'))
          .forEach(dep => {
            console.log(chalk.white(`   ${dep}: ${deps[dep]}`));
          });
      }
      
      // Verificar archivos de configuración
      console.log(chalk.cyan("\n⚙️  Configuración:"));
      
      const configFiles = [
        { file: "vite.config.js", name: "Vite" },
        { file: "tailwind.config.js", name: "Tailwind CSS" },
        { file: "vercel.json", name: "Vercel" },
        { file: "tsconfig.json", name: "TypeScript" }
      ];
      
      for (const config of configFiles) {
        const exists = await fs.pathExists(config.file);
        const status = exists ? chalk.green("✅") : chalk.red("❌");
        console.log(chalk.white(`   ${status} ${config.name}: ${config.file}`));
      }
      
      // Verificar directorios
      console.log(chalk.cyan("\n📁 Estructura:"));
      
      const directories = [
        { dir: "src", name: "Código fuente" },
        { dir: "public", name: "Archivos públicos" },
        { dir: "dist", name: "Build" },
        { dir: "src/assets/images", name: "Imágenes" }
      ];
      
      for (const directory of directories) {
        const exists = await fs.pathExists(directory.dir);
        const status = exists ? chalk.green("✅") : chalk.gray("⚪");
        console.log(chalk.white(`   ${status} ${directory.name}: ${directory.dir}`));
      }
      
      console.log(chalk.cyan("\n🚀 Comandos disponibles:"));
      console.log(chalk.white("   connext dev              - Servidor de desarrollo"));
      console.log(chalk.white("   connext build            - Build optimizado con ofuscación"));
      console.log(chalk.white("   connext preview          - Vista previa del build"));
      console.log(chalk.white("   connext optimize-images  - Optimizar imágenes"));
      console.log(chalk.white("   connext info             - Esta información"));
      
    } catch (error) {
      console.error(chalk.red(`\n❌ Error obteniendo información: ${error}\n`));
      process.exit(1);
    }
  });

program.parse();