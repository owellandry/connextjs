# @connext/vite-plugin

> Plugin oficial de Vite para ConnextJS - Integración perfecta con el ecosistema Vite

## 📦 Instalación

```bash
npm install --save-dev @connext/vite-plugin
# o
pnpm add -D @connext/vite-plugin
# o
yarn add --dev @connext/vite-plugin
```

## 🚀 Uso Básico

### Configuración Mínima

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';

export default defineConfig({
  plugins: [connext()]
});
```

### Configuración con TypeScript

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';

export default defineConfig({
  plugins: [
    connext({
      // Opciones del plugin
      sourcemap: true,
      minify: false
    })
  ]
});
```

## ⚙️ Opciones de Configuración

### Opciones Básicas

```typescript
interface ConnextPluginOptions {
  // Compilación
  sourcemap?: boolean;           // Generar sourcemaps (default: true en dev)
  minify?: boolean;              // Minificar código (default: false en dev)
  
  // Archivos
  include?: string | string[];   // Patrones de archivos a incluir
  exclude?: string | string[];   // Patrones de archivos a excluir
  
  // Desarrollo
  hmr?: boolean;                 // Hot Module Replacement (default: true)
  devtools?: boolean;            // Habilitar devtools (default: true en dev)
  
  // Compilador
  compiler?: CompilerOptions;    // Opciones del compilador ConnextJS
  
  // Transformaciones
  transforms?: Transform[];      // Transformaciones personalizadas
}
```

### Configuración Completa

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';

export default defineConfig({
  plugins: [
    connext({
      // Configuración de archivos
      include: ['src/**/*.cnx'],
      exclude: ['src/**/*.test.cnx'],
      
      // Configuración de desarrollo
      hmr: true,
      devtools: true,
      sourcemap: true,
      
      // Configuración del compilador
      compiler: {
        target: 'es2018',
        format: 'esm',
        sourcemap: true,
        minify: false
      },
      
      // Transformaciones personalizadas
      transforms: [
        {
          test: /\.cnx$/,
          transform: (code, id) => {
            // Transformación personalizada
            return {
              code: transformedCode,
              map: sourceMap
            };
          }
        }
      ]
    })
  ],
  
  // Configuración adicional de Vite
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  
  server: {
    port: 3000,
    open: true
  }
});
```

## 🔧 Características

### 🔥 Hot Module Replacement (HMR)

El plugin proporciona HMR completo para archivos `.cnx`:

```javascript
// Automático - no requiere configuración
// Los cambios en .cnx se reflejan instantáneamente

// Para HMR personalizado:
if (import.meta.hot) {
  import.meta.hot.accept('./App.cnx', (newModule) => {
    // Lógica personalizada de HMR
  });
}
```

### 📍 Source Maps

Soporte completo para source maps:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    connext({
      sourcemap: true  // Habilita source maps
    })
  ],
  
  build: {
    sourcemap: true  // También para build de producción
  }
});
```

### 🎯 Resolución de Módulos

Resolución automática de archivos `.cnx`:

```typescript
// Importaciones automáticas
import App from './App.cnx';           // ✅ Funciona
import Button from './Button';          // ✅ Resuelve a Button.cnx
import Card from '@/components/Card';   // ✅ Con alias configurado
```

### 🔄 Transformaciones

Sistema de transformaciones extensible:

```typescript
// Transformación personalizada
const customTransform = {
  test: /\.cnx$/,
  transform(code: string, id: string) {
    // Procesar código antes de la compilación
    const processedCode = preprocessCode(code);
    
    return {
      code: processedCode,
      map: generateSourceMap(code, processedCode)
    };
  }
};

// Usar en configuración
connext({
  transforms: [customTransform]
});
```

## 🎨 Integración con CSS

### CSS Modules

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [connext()],
  
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
});
```

```html
<!-- App.cnx -->
<template>
  <div class="{styles.container}">
    <h1 class="{styles.title}">Hello World</h1>
  </div>
</template>

<script>
  import styles from './App.module.css';
</script>

<style module>
  .container {
    padding: 2rem;
  }
  
  .title {
    color: blue;
  }
</style>
```

### PostCSS

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [connext()],
  
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  }
});
```

### Sass/SCSS

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [connext()],
  
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
});
```

## 🔌 Integración con Otros Plugins

### Con Vue DevTools

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';
import { vueDevtools } from '@vue/devtools';

export default defineConfig({
  plugins: [
    connext({
      devtools: true
    }),
    vueDevtools()
  ]
});
```

### Con ESLint

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    connext(),
    eslint({
      include: ['src/**/*.cnx', 'src/**/*.ts']
    })
  ]
});
```

### Con PWA

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    connext(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,cnx}']
      }
    })
  ]
});
```

## 🧪 Testing

### Con Vitest

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';

export default defineConfig({
  plugins: [connext()],
  
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts']
  }
});
```

```typescript
// tests/setup.ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/dom';
import matchers from '@testing-library/jest-dom/matchers';

// Extender expect con matchers de testing-library
expect.extend(matchers);

// Limpiar después de cada test
afterEach(() => {
  cleanup();
});
```

### Test de Componentes

```typescript
// tests/App.test.ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/dom';
import App from '../src/App.cnx';

describe('App Component', () => {
  it('should render correctly', () => {
    render(App);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
```

## 🚀 Optimización para Producción

### Code Splitting

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [connext()],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['@connext/runtime'],
          components: ['src/components/index.ts']
        }
      }
    }
  }
});
```

### Tree Shaking

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    connext({
      compiler: {
        treeShaking: true
      }
    })
  ],
  
  build: {
    rollupOptions: {
      treeshake: true
    }
  }
});
```

### Minificación

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    connext({
      minify: true  // En producción
    })
  ],
  
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
```

## 🔍 Debugging

### Debug Mode

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    connext({
      debug: process.env.NODE_ENV === 'development'
    })
  ]
});
```

### Logs Detallados

```bash
# Habilitar logs del plugin
DEBUG=vite:connext npm run dev

# Logs del compilador
DEBUG=connext:compiler npm run dev

# Todos los logs
DEBUG=* npm run dev
```

### Source Maps en Producción

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    connext({
      sourcemap: true
    })
  ],
  
  build: {
    sourcemap: 'hidden'  // Source maps sin exponer
  }
});
```

## 📊 Performance

### Cache de Compilación

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    connext({
      cache: {
        enabled: true,
        directory: 'node_modules/.cache/connext'
      }
    })
  ]
});
```

### Compilación Paralela

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    connext({
      parallel: true,
      workers: 4  // Número de workers
    })
  ]
});
```

### Lazy Loading

```typescript
// Componentes lazy
const LazyComponent = () => import('./LazyComponent.cnx');

// Router con lazy loading
const routes = [
  {
    path: '/lazy',
    component: () => import('./pages/LazyPage.cnx')
  }
];
```

## 🔧 API Reference

### Plugin Options

```typescript
interface ConnextPluginOptions {
  // Archivos
  include?: string | string[];
  exclude?: string | string[];
  
  // Compilación
  sourcemap?: boolean;
  minify?: boolean;
  target?: string;
  format?: 'esm' | 'cjs' | 'iife';
  
  // Desarrollo
  hmr?: boolean;
  devtools?: boolean;
  debug?: boolean;
  
  // Performance
  cache?: CacheOptions;
  parallel?: boolean;
  workers?: number;
  
  // Transformaciones
  transforms?: Transform[];
  
  // Compilador
  compiler?: CompilerOptions;
}

interface CacheOptions {
  enabled?: boolean;
  directory?: string;
  maxAge?: number;
}

interface Transform {
  test: RegExp;
  transform: (code: string, id: string) => TransformResult;
}

interface TransformResult {
  code: string;
  map?: string | object;
}
```

### Hooks del Plugin

```typescript
// Plugin personalizado que extiende ConnextJS
function customConnextPlugin() {
  return {
    name: 'custom-connext',
    
    // Hook antes de la compilación
    'connext:before-compile'(code: string, id: string) {
      // Procesar código antes de compilar
      return processCode(code);
    },
    
    // Hook después de la compilación
    'connext:after-compile'(result: CompileResult, id: string) {
      // Procesar resultado de compilación
      return processResult(result);
    },
    
    // Hook de transformación
    'connext:transform'(code: string, id: string) {
      // Transformar código
      return transformCode(code);
    }
  };
}
```

## 📚 Ejemplos

### Proyecto Básico

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';

export default defineConfig({
  plugins: [connext()],
  
  server: {
    port: 3000
  }
});
```

### Proyecto con TypeScript

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';

export default defineConfig({
  plugins: [
    connext({
      compiler: {
        typescript: true
      }
    })
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
```

### Proyecto con Tailwind

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';

export default defineConfig({
  plugins: [connext()],
  
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  }
});
```

### Proyecto Empresarial

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    connext({
      sourcemap: true,
      devtools: true,
      cache: {
        enabled: true
      },
      parallel: true
    }),
    eslint(),
    VitePWA({
      registerType: 'autoUpdate'
    })
  ],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['@connext/runtime'],
          ui: ['src/components/ui/index.ts']
        }
      }
    }
  },
  
  server: {
    port: 3000,
    open: true
  }
});
```

## 🔗 Integración con Frameworks

### Con Nuxt.js

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    plugins: [
      connext({
        ssr: true
      })
    ]
  }
});
```

### Con SvelteKit

```typescript
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import connext from '@connext/vite-plugin';

export default defineConfig({
  plugins: [
    sveltekit(),
    connext()
  ]
});
```

### Con Astro

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import connext from '@connext/vite-plugin';

export default defineConfig({
  vite: {
    plugins: [connext()]
  }
});
```

## 🔗 Enlaces

- [Documentación Principal](../../README.md)
- [Compiler Package](../compiler/README.md)
- [Runtime Package](../runtime/README.md)
- [CLI Package](../cli/README.md)
- [Vite Documentation](https://vitejs.dev)

## 📄 Licencia

MIT - ver [LICENSE](../../LICENSE) para más detalles.