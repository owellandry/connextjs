# @connextjs/connextjs

**ConnextJS Framework Completo** - El paquete principal que incluye todos los módulos de ConnextJS.

## 🚀 Instalación

```bash
npm install @connextjs/connextjs
# o
pnpm add @connextjs/connextjs
# o
yarn add @connextjs/connextjs
```

## 📦 ¿Qué incluye?

Este paquete es una conveniencia que incluye todos los módulos de ConnextJS:

- **@connextjs/runtime** - Sistema de ejecución principal
- **@connextjs/compiler** - Compilador de archivos `.cnx` a JavaScript
- **@connextjs/error-handler** - Sistema avanzado de manejo de errores
- **@connextjs/doom** - Utilidad para manejar estados reactivos
- **@connextjs/dev-server** - Servidor de desarrollo optimizado
- **@connextjs/vite-plugin** - Plugin oficial para Vite

## 🎯 Uso

```typescript
import { createConnextApp, framework } from '@connextjs/connextjs';

// Crear una nueva aplicación ConnextJS
const app = createConnextApp({
  // tu configuración aquí
});

console.log(`Usando ${framework.name} v${framework.version}`);
```

### Importar módulos específicos

```typescript
// Importar todo desde el paquete principal
import * as ConnextJS from '@connextjs/connextjs';

// O importar módulos específicos
import { 
  // desde runtime
  someRuntimeFunction,
  // desde compiler
  compile,
  // desde error-handler
  ErrorHandler,
  // desde doom
  createState,
  // etc.
} from '@connextjs/connextjs';
```

## 🔧 Instalación Individual

Si prefieres instalar solo los módulos que necesitas:

```bash
# Solo el runtime
npm install @connextjs/runtime

# Solo el compilador
npm install @connextjs/compiler

# Solo el manejo de errores
npm install @connextjs/error-handler

# Solo doom (estados reactivos)
npm install @connextjs/doom

# Solo el servidor de desarrollo
npm install @connextjs/dev-server

# Solo el plugin de Vite
npm install @connextjs/vite-plugin
```

## 🚀 Crear un nuevo proyecto

Para crear un nuevo proyecto ConnextJS:

```bash
npx @connextjs/create-connext mi-proyecto
cd mi-proyecto
npm install
npm run dev
```

## 📚 Documentación

Para más información sobre cada módulo, consulta la documentación individual de cada paquete.

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee nuestras [guías de contribución](../../CONTRIBUTING.md).

## 📄 Licencia

MIT - ver [LICENSE](../../LICENSE) para más detalles.