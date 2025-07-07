#!/usr/bin/env node
import { program } from "commander";
import fsExtra from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
const { copy, writeFile } = fsExtra;
program
    .name("create-connext")
    .description("Crear una nueva aplicación ConnextJS")
    .argument("<dir>", "nombre del proyecto")
    .option("-p, --port <port>", "puerto del servidor de desarrollo", "3000")
    .action(async (dir, options) => {
    try {
        console.log(chalk.blue(`\n🚀 Creando proyecto ConnextJS en ./${dir}...\n`));
        // Obtener la ruta del directorio actual usando una ruta relativa
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const tpl = path.join(__dirname, "../../templates/basic");
        // Copiar template
        await copy(tpl, dir);
        // Crear vite.config.js personalizado
        const viteConfig = `import { createConnextConfig } from '@connext/dev-server';

export default createConnextConfig({
  port: ${options.port},
  host: 'localhost',
  open: true
});`;
        await writeFile(path.join(dir, 'vite.config.js'), viteConfig);
        console.log(chalk.green(`✨ Proyecto creado exitosamente en ./${dir}`));
        console.log(chalk.cyan(`\n📦 Instalar dependencias:`));
        console.log(chalk.white(`   cd ${dir} && npm install`));
        console.log(chalk.cyan(`\n🚀 Iniciar servidor de desarrollo:`));
        console.log(chalk.white(`   npm run dev`));
        console.log(chalk.cyan(`\n🌐 El servidor estará disponible en:`));
        console.log(chalk.white(`   http://localhost:${options.port}/\n`));
    }
    catch (error) {
        console.error(chalk.red(`\n❌ Error creando el proyecto: ${error}\n`));
        process.exit(1);
    }
});
program.parse();
