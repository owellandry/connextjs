"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnextConfig = createConnextConfig;
exports.startDevServer = startDevServer;
const vite_1 = require("vite");
const vite_plugin_1 = __importDefault(require("@connext/vite-plugin"));
/**
 * Configuración por defecto de Vite para proyectos ConnextJS
 */
function createConnextConfig(options = {}) {
    const { port = 3000, host = 'localhost', open = true } = options;
    return (0, vite_1.defineConfig)({
        plugins: [(0, vite_plugin_1.default)()],
        server: {
            port,
            host,
            open
        },
        build: {
            outDir: 'dist',
            sourcemap: true
        }
    });
}
/**
 * Inicia el servidor de desarrollo de ConnextJS
 */
async function startDevServer(options = {}) {
    const config = createConnextConfig(options);
    const server = await (0, vite_1.createServer)(config);
    await server.listen();
    const { port = 3000, host = 'localhost' } = options;
    console.log(`\n🚀 ConnextJS dev server running at http://${host}:${port}/\n`);
    return server;
}
/**
 * Configuración por defecto exportada
 */
exports.default = createConnextConfig();
