#!/usr/bin/env node
import { program } from "commander";
import fsExtra from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import ora from "ora";
const { copy, writeFile, readFile } = fsExtra;
program
    .name("create-connext")
    .description("Crear una nueva aplicación ConnextJS")
    .argument("<dir>", "nombre del proyecto")
    .option("-p, --port <port>", "puerto del servidor de desarrollo", "3000")
    .action(async (dir, options) => {
    try {
        console.log(chalk.blue(`\n🚀 Creando proyecto ConnextJS en ./${dir}...\n`));
        const spinner = ora("Copiando archivos...").start();
        // Obtener la ruta del directorio actual usando una ruta relativa
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const tpl = path.join(__dirname, "../../templates/basic");
        // Copiar template
        await copy(tpl, dir);
        spinner.text = "Generando archivos";
        // Crear main.ts sin dependencias de ConnextJS
        const mainTsContent = `import "./index.css";

// Aplicación simple sin dependencias externas
const app = document.getElementById("app")!;

let count = 0;

// Crear el HTML de la aplicación
app.innerHTML = \`
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">ConnextJS</h1>
      <p class="text-gray-600 mb-6 text-center">¡Tu aplicación está funcionando!</p>
      <div class="text-center">
        <button id="counter-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
          Contador: <span id="count">0</span>
        </button>
      </div>
    </div>
  </div>
\`;

// Agregar funcionalidad del contador
const btn = document.getElementById('counter-btn');
const countSpan = document.getElementById('count');

btn?.addEventListener('click', () => {
  count++;
  if (countSpan) countSpan.textContent = count.toString();
});`;
        await writeFile(path.join(dir, 'src/main.ts'), mainTsContent);
        // Verificar y corregir index.html si es necesario
        const indexHtmlPath = path.join(dir, 'index.html');
        let indexContent = await readFile(indexHtmlPath, 'utf8');
        // Asegurar que el script apunte a la ruta correcta
        if (!indexContent.includes('src="/src/main.ts"')) {
            indexContent = indexContent.replace('src="/src/main.ts"', 'src="/src/main.ts"');
            await writeFile(indexHtmlPath, indexContent);
        }
        // Crear vite.config.js personalizado
        const viteConfig = `import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: ${options.port},
    host: 'localhost',
    open: true
  }
});`;
        await writeFile(path.join(dir, 'vite.config.js'), viteConfig);
        spinner.succeed("Proyecto creado");
        console.log(chalk.green(`✨ Proyecto creado exitosamente en ./${dir}`));
        console.log(chalk.cyan(`\n📦 Próximos pasos:`));
        console.log(chalk.white(`   cd ${dir}`));
        console.log(chalk.white(`   pnpm install`));
        console.log(chalk.white(`   pnpm run dev`));
        console.log(chalk.cyan(`\n🌐 El servidor estará disponible en:`));
        console.log(chalk.white(`   http://localhost:${options.port}/\n`));
    }
    catch (error) {
        console.error(chalk.red(`\n❌ Error creando el proyecto: ${error}\n`));
        process.exit(1);
    }
});
program.parse();
