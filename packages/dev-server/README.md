# @connext/dev-server

> Servidor de desarrollo optimizado para ConnextJS con Hot Module Replacement y debugging avanzado

## 📦 Instalación

```bash
npm install --save-dev @connext/dev-server
# o
pnpm add -D @connext/dev-server
# o
yarn add --dev @connext/dev-server
```

## 🚀 Uso Básico

### Inicio Rápido

```javascript
// server.js
import { createDevServer } from '@connext/dev-server';

const server = await createDevServer({
  root: './src',
  port: 3000
});

await server.listen();
console.log('Servidor iniciado en http://localhost:3000');
```

### Con CLI

```bash
# Usar directamente
npx @connext/dev-server

# Con opciones
npx @connext/dev-server --port 8080 --host 0.0.0.0

# Con archivo de configuración
npx @connext/dev-server --config dev-server.config.js
```

### Integración con npm scripts

```json
{
  "scripts": {
    "dev": "@connext/dev-server",
    "dev:debug": "@connext/dev-server --debug",
    "dev:https": "@connext/dev-server --https"
  }
}
```

## ⚙️ Configuración

### Opciones Básicas

```typescript
interface DevServerOptions {
  // Servidor
  port?: number;                 // Puerto (default: 3000)
  host?: string;                 // Host (default: 'localhost')
  https?: boolean | HttpsOptions; // HTTPS (default: false)
  open?: boolean | string;       // Abrir navegador (default: false)
  
  // Archivos
  root?: string;                 // Directorio raíz (default: process.cwd())
  publicDir?: string;            // Directorio público (default: 'public')
  
  // Desarrollo
  hmr?: boolean | HMROptions;    // Hot Module Replacement (default: true)
  cors?: boolean | CorsOptions;  // CORS (default: true)
  
  // Proxy
  proxy?: Record<string, ProxyOptions>; // Configuración de proxy
  
  // Middleware
  middleware?: Middleware[];     // Middleware personalizado
}
```

### Configuración Completa

```javascript
// dev-server.config.js
export default {
  // Configuración del servidor
  port: 3000,
  host: 'localhost',
  https: false,
  open: true,
  
  // Directorios
  root: './src',
  publicDir: './public',
  
  // Hot Module Replacement
  hmr: {
    enabled: true,
    port: 24678,
    overlay: true
  },
  
  // CORS
  cors: {
    origin: true,
    credentials: true
  },
  
  // Proxy para API
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  },
  
  // Middleware personalizado
  middleware: [
    {
      path: '/health',
      handler: (req, res) => {
        res.json({ status: 'ok', timestamp: Date.now() });
      }
    }
  ],
  
  // Configuración del compilador
  compiler: {
    sourcemap: true,
    minify: false,
    target: 'es2018'
  },
  
  // Configuración de archivos estáticos
  static: {
    directory: './assets',
    prefix: '/assets',
    maxAge: 3600
  }
};
```

## 🔥 Hot Module Replacement (HMR)

### Configuración HMR

```javascript
// Configuración básica
const server = await createDevServer({
  hmr: true  // HMR habilitado
});

// Configuración avanzada
const server = await createDevServer({
  hmr: {
    enabled: true,
    port: 24678,           // Puerto del WebSocket
    overlay: true,         // Overlay de errores
    timeout: 30000,        // Timeout de conexión
    clientLog: 'info'      // Nivel de log del cliente
  }
});
```

### API de HMR

```javascript
// En el cliente
if (import.meta.hot) {
  // Aceptar actualizaciones del módulo actual
  import.meta.hot.accept();
  
  // Aceptar actualizaciones de dependencias
  import.meta.hot.accept('./dependency.cnx', (newModule) => {
    // Manejar actualización
    updateComponent(newModule.default);
  });
  
  // Invalidar módulo
  import.meta.hot.invalidate();
  
  // Datos persistentes entre recargas
  if (import.meta.hot.data.count) {
    count = import.meta.hot.data.count;
  }
  
  import.meta.hot.dispose((data) => {
    data.count = count;
  });
}
```

### HMR para Componentes ConnextJS

```javascript
// Automático para archivos .cnx
// El servidor detecta cambios y actualiza automáticamente

// HMR personalizado para stores
if (import.meta.hot) {
  import.meta.hot.accept('./store.ts', (newStore) => {
    // Preservar estado del store
    const currentState = store.getState();
    store.replaceReducer(newStore.reducer);
    store.dispatch({ type: '@@HMR_UPDATE', state: currentState });
  });
}
```

## 🌐 Proxy y API

### Configuración de Proxy

```javascript
// Proxy simple
const server = await createDevServer({
  proxy: {
    '/api': 'http://localhost:8080'
  }
});

// Proxy avanzado
const server = await createDevServer({
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
      configure: (proxy, options) => {
        proxy.on('error', (err, req, res) => {
          console.log('Proxy error:', err);
        });
      }
    },
    
    '/ws': {
      target: 'ws://localhost:8080',
      ws: true
    }
  }
});
```

### Mock API

```javascript
// Middleware para mock API
const server = await createDevServer({
  middleware: [
    {
      path: '/api/users',
      method: 'GET',
      handler: (req, res) => {
        res.json([
          { id: 1, name: 'Juan' },
          { id: 2, name: 'María' }
        ]);
      }
    },
    
    {
      path: '/api/users/:id',
      method: 'GET',
      handler: (req, res) => {
        const { id } = req.params;
        res.json({ id: parseInt(id), name: `Usuario ${id}` });
      }
    }
  ]
});
```

## 🔒 HTTPS y Seguridad

### Configuración HTTPS

```javascript
// HTTPS básico (certificado auto-generado)
const server = await createDevServer({
  https: true
});

// HTTPS con certificados personalizados
const server = await createDevServer({
  https: {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
  }
});

// HTTPS con mkcert
const server = await createDevServer({
  https: {
    mkcert: true  // Usa mkcert si está disponible
  }
});
```

### Headers de Seguridad

```javascript
const server = await createDevServer({
  middleware: [
    {
      path: '*',
      handler: (req, res, next) => {
        // Headers de seguridad
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
      }
    }
  ]
});
```

## 📁 Archivos Estáticos

### Configuración de Archivos Estáticos

```javascript
const server = await createDevServer({
  static: [
    {
      directory: './public',
      prefix: '/',
      maxAge: 0  // Sin cache en desarrollo
    },
    {
      directory: './assets',
      prefix: '/assets',
      maxAge: 3600,
      index: false
    }
  ]
});
```

### Middleware de Archivos

```javascript
// Middleware personalizado para archivos
const server = await createDevServer({
  middleware: [
    {
      path: '/uploads/*',
      handler: express.static('./uploads', {
        maxAge: '1d',
        etag: true
      })
    }
  ]
});
```

## 🔧 Middleware Personalizado

### Middleware Básico

```javascript
const server = await createDevServer({
  middleware: [
    // Logger personalizado
    {
      path: '*',
      handler: (req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
      }
    },
    
    // Autenticación mock
    {
      path: '/api/protected/*',
      handler: (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ error: 'No token' });
        }
        next();
      }
    }
  ]
});
```

### Middleware Avanzado

```javascript
// Middleware con configuración
function createAuthMiddleware(options = {}) {
  return {
    path: options.path || '/api/protected/*',
    handler: (req, res, next) => {
      // Lógica de autenticación
      const isValid = validateToken(req.headers.authorization);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      next();
    }
  };
}

const server = await createDevServer({
  middleware: [
    createAuthMiddleware({ path: '/api/admin/*' })
  ]
});
```

## 📊 Logging y Debugging

### Configuración de Logs

```javascript
const server = await createDevServer({
  logging: {
    level: 'info',        // 'error' | 'warn' | 'info' | 'debug'
    format: 'pretty',     // 'pretty' | 'json' | 'simple'
    file: './logs/dev.log'
  }
});
```

### Debug Mode

```javascript
// Habilitar debug
const server = await createDevServer({
  debug: true,
  logging: {
    level: 'debug'
  }
});

// O con variable de entorno
process.env.DEBUG = 'connext:*';
```

### Logs Personalizados

```javascript
import { logger } from '@connext/dev-server';

// Usar logger interno
logger.info('Servidor iniciado');
logger.error('Error en compilación', { file: 'App.cnx' });
logger.debug('HMR update', { modules: ['./Component.cnx'] });
```

## 🎯 Performance

### Cache de Compilación

```javascript
const server = await createDevServer({
  cache: {
    enabled: true,
    directory: './node_modules/.cache/connext',
    maxAge: 24 * 60 * 60 * 1000  // 24 horas
  }
});
```

### Compilación Paralela

```javascript
const server = await createDevServer({
  compiler: {
    parallel: true,
    workers: 4  // Número de workers
  }
});
```

### Optimizaciones

```javascript
const server = await createDevServer({
  optimizations: {
    // Pre-bundling de dependencias
    prebundle: {
      enabled: true,
      include: ['lodash', 'axios'],
      exclude: ['@connext/runtime']
    },
    
    // Lazy compilation
    lazyCompilation: {
      enabled: true,
      entries: ['src/pages/**/*.cnx']
    }
  }
});
```

## 🧪 Testing

### Configuración para Tests

```javascript
// test-server.js
import { createDevServer } from '@connext/dev-server';

export async function createTestServer() {
  return await createDevServer({
    port: 0,  // Puerto aleatorio
    open: false,
    hmr: false,
    logging: { level: 'error' }
  });
}
```

### Tests de Integración

```javascript
// tests/server.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createTestServer } from './test-server.js';

describe('Dev Server', () => {
  let server;
  let baseURL;
  
  beforeAll(async () => {
    server = await createTestServer();
    await server.listen();
    baseURL = `http://localhost:${server.config.port}`;
  });
  
  afterAll(async () => {
    await server.close();
  });
  
  it('should serve static files', async () => {
    const response = await fetch(`${baseURL}/index.html`);
    expect(response.status).toBe(200);
  });
  
  it('should compile .cnx files', async () => {
    const response = await fetch(`${baseURL}/src/App.cnx`);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('javascript');
  });
});
```

## 🔌 Plugins

### Plugin System

```javascript
// Plugin personalizado
function createCustomPlugin(options = {}) {
  return {
    name: 'custom-plugin',
    
    // Hook de configuración
    configResolved(config) {
      console.log('Configuración resuelta:', config);
    },
    
    // Hook de servidor
    configureServer(server) {
      server.middlewares.use('/custom', (req, res, next) => {
        res.json({ message: 'Custom endpoint' });
      });
    },
    
    // Hook de HMR
    handleHotUpdate(ctx) {
      if (ctx.file.endsWith('.custom')) {
        // Manejar actualización personalizada
        ctx.server.ws.send({
          type: 'custom-update',
          data: { file: ctx.file }
        });
      }
    }
  };
}

// Usar plugin
const server = await createDevServer({
  plugins: [
    createCustomPlugin({ option: 'value' })
  ]
});
```

### Plugins Oficiales

```javascript
import { createDevServer } from '@connext/dev-server';
import { mockApiPlugin } from '@connext/dev-server/plugins';
import { proxyPlugin } from '@connext/dev-server/plugins';

const server = await createDevServer({
  plugins: [
    mockApiPlugin({
      routes: './mocks/api.js'
    }),
    proxyPlugin({
      '/api': 'http://localhost:8080'
    })
  ]
});
```

## 📚 API Reference

### createDevServer(options)

```typescript
function createDevServer(options?: DevServerOptions): Promise<DevServer>

interface DevServer {
  // Métodos principales
  listen(port?: number): Promise<void>;
  close(): Promise<void>;
  restart(): Promise<void>;
  
  // Configuración
  config: ResolvedConfig;
  
  // WebSocket para HMR
  ws: WebSocketServer;
  
  // Middleware
  middlewares: Connect.Server;
  
  // HTTP server
  httpServer: http.Server | https.Server;
}
```

### Eventos del Servidor

```javascript
const server = await createDevServer();

// Eventos disponibles
server.on('listening', () => {
  console.log('Servidor escuchando');
});

server.on('error', (error) => {
  console.error('Error del servidor:', error);
});

server.on('file-change', (file) => {
  console.log('Archivo cambiado:', file);
});

server.on('hmr-update', (update) => {
  console.log('Actualización HMR:', update);
});
```

## 📚 Ejemplos

### Servidor Básico

```javascript
// basic-server.js
import { createDevServer } from '@connext/dev-server';

const server = await createDevServer({
  port: 3000,
  root: './src',
  open: true
});

await server.listen();
```

### Servidor con API Mock

```javascript
// api-server.js
import { createDevServer } from '@connext/dev-server';

const server = await createDevServer({
  port: 3000,
  middleware: [
    {
      path: '/api/users',
      handler: (req, res) => {
        res.json([
          { id: 1, name: 'Juan', email: 'juan@example.com' },
          { id: 2, name: 'María', email: 'maria@example.com' }
        ]);
      }
    }
  ]
});

await server.listen();
```

### Servidor con Proxy

```javascript
// proxy-server.js
import { createDevServer } from '@connext/dev-server';

const server = await createDevServer({
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
});

await server.listen();
```

### Servidor HTTPS

```javascript
// https-server.js
import { createDevServer } from '@connext/dev-server';
import fs from 'fs';

const server = await createDevServer({
  port: 3000,
  https: {
    key: fs.readFileSync('./certs/localhost-key.pem'),
    cert: fs.readFileSync('./certs/localhost.pem')
  }
});

await server.listen();
console.log('Servidor HTTPS iniciado en https://localhost:3000');
```

## 🔗 Enlaces

- [Documentación Principal](../../README.md)
- [CLI Package](../cli/README.md)
- [Vite Plugin](../vite-plugin/README.md)
- [Compiler Package](../compiler/README.md)

## 📄 Licencia

MIT - ver [LICENSE](../../LICENSE) para más detalles.