import { defineConfig, createServer } from 'vite';
import connext from '@connext/vite-plugin';

/**
 * Configuración por defecto de Vite para proyectos ConnextJS
 */
export function createConnextConfig(options: {
  port?: number;
  host?: string;
  open?: boolean;
} = {}) {
  const { port = 3000, host = 'localhost', open = true } = options;
  
  return defineConfig({
    plugins: [connext()],
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
export async function startDevServer(options: {
  port?: number;
  host?: string;
  open?: boolean;
} = {}) {
  const config = createConnextConfig(options);
  const server = await createServer(config);
  await server.listen();
  
  const { port = 3000, host = 'localhost' } = options;
  console.log(`\n🚀 ConnextJS dev server running at http://${host}:${port}/\n`);
  
  return server;
}

/**
 * Configuración por defecto exportada
 */
export default createConnextConfig();