# @connext/error-handler

> Sistema avanzado de manejo de errores para ConnextJS con overlay inteligente y debugging mejorado

## 📦 Instalación

```bash
npm install @connext/error-handler
# o
pnpm add @connext/error-handler
# o
yarn add @connext/error-handler
```

## 🚀 Uso Básico

### Inicialización Automática

El error handler se inicializa automáticamente cuando se importa el runtime:

```typescript
import { ConnextComponent } from '@connext/runtime';
// Error handler se inicializa automáticamente
```

### Uso Manual

```typescript
import { errorHandler, reportCompileError } from '@connext/error-handler';

// Reportar error manualmente
errorHandler.reportError(
  'Error message',
  '/path/to/file.cnx',
  'Error Context'
);

// Reportar error de compilación
reportCompileError({
  message: 'Syntax error in template',
  file: '/src/App.cnx',
  line: 15,
  column: 8
});
```

## ✨ Características

### 🎯 Error Overlay Inteligente

- **Overlay visual** que aparece automáticamente cuando ocurre un error
- **Consejos específicos** basados en el tipo de error
- **Información detallada** del archivo, línea y contexto
- **Stack trace** completo para debugging
- **Botón de cierre** para ocultar el overlay

### 🧠 Consejos Inteligentes

El sistema proporciona consejos específicos según el tipo de error:

#### Module Not Found
```
💡 Consejo: Verifica que el archivo existe y la ruta es correcta.
Revisa también que las extensiones de archivo coincidan.
```

#### Syntax Error
```
💡 Consejo: Revisa la sintaxis cerca de la línea indicada.
Verifica que las llaves, paréntesis y comillas estén balanceadas.
```

#### Undefined Variable
```
💡 Consejo: Asegúrate de que la variable esté declarada en el script.
Verifica que el nombre de la variable sea correcto.
```

#### Template Error
```
💡 Consejo: Verifica que las interpolaciones {variable} sean válidas.
Asegúrate de que las variables existan en el contexto del componente.
```

### 📊 Logging Estructurado

- **Agrupación de mensajes** en consola
- **Información contextual** detallada
- **Timestamps** para tracking temporal
- **Niveles de severidad** (error, warning, info)

## 🎨 Interfaz Visual

### Error Overlay

El overlay aparece automáticamente con:

- **Fondo semi-transparente** que cubre toda la pantalla
- **Panel central** con información del error
- **Diseño responsive** que se adapta a diferentes tamaños
- **Animaciones suaves** para mejor UX

### Estilos Personalizables

```css
/* Variables CSS para personalización */
:root {
  --connext-error-bg: rgba(0, 0, 0, 0.8);
  --connext-error-panel-bg: #1a1a1a;
  --connext-error-text: #ffffff;
  --connext-error-accent: #ff6b6b;
  --connext-error-border: #333333;
}
```

## 🔧 API Reference

### ConnextErrorHandler

```typescript
class ConnextErrorHandler {
  constructor()
  
  // Métodos principales
  reportError(message: string, file?: string, context?: string): void
  showOverlay(): void
  hideOverlay(): void
  
  // Configuración
  setConfig(config: ErrorHandlerConfig): void
  
  // Estado
  readonly isVisible: boolean
  readonly errorCount: number
}

interface ErrorHandlerConfig {
  showOverlay?: boolean;
  logToConsole?: boolean;
  maxErrors?: number;
  autoHide?: boolean;
  autoHideDelay?: number;
}
```

### Funciones Utilitarias

```typescript
// Reportar error de compilación
function reportCompileError(error: CompileError): void

// Obtener instancia global
function getErrorHandler(): ConnextErrorHandler

// Configurar handler global
function configureErrorHandler(config: ErrorHandlerConfig): void

interface CompileError {
  message: string;
  file: string;
  line?: number;
  column?: number;
  stack?: string;
}
```

## ⚙️ Configuración

### Configuración Básica

```typescript
import { configureErrorHandler } from '@connext/error-handler';

configureErrorHandler({
  showOverlay: true,        // Mostrar overlay visual
  logToConsole: true,       // Log en consola
  maxErrors: 10,            // Máximo de errores a mostrar
  autoHide: false,          // Auto-ocultar overlay
  autoHideDelay: 5000       // Delay para auto-ocultar (ms)
});
```

### Configuración Avanzada

```typescript
import { errorHandler } from '@connext/error-handler';

// Configurar manualmente
errorHandler.setConfig({
  showOverlay: process.env.NODE_ENV === 'development',
  logToConsole: true,
  maxErrors: 50,
  autoHide: true,
  autoHideDelay: 3000
});

// Escuchar eventos de error
window.addEventListener('connext:error', (event) => {
  console.log('Error detectado:', event.detail);
});
```

## 🎯 Integración

### Con Vite

El error handler se integra automáticamente con Vite:

```typescript
// vite.config.js
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';

export default defineConfig({
  plugins: [connext()],
  // Error handler se configura automáticamente
});
```

### Con Webpack

```javascript
// webpack.config.js
const ConnextErrorHandlerPlugin = require('@connext/error-handler/webpack');

module.exports = {
  plugins: [
    new ConnextErrorHandlerPlugin({
      showOverlay: true,
      logToConsole: true
    })
  ]
};
```

### Con Otros Build Tools

```typescript
// Inicialización manual
import '@connext/error-handler/init';

// O configuración personalizada
import { errorHandler } from '@connext/error-handler';

if (typeof window !== 'undefined') {
  window.connextErrorHandler = errorHandler;
}
```

## 🐛 Tipos de Errores Soportados

### Errores de Compilación

```typescript
// Errores de sintaxis en .cnx
reportCompileError({
  message: 'Unexpected token in template',
  file: '/src/App.cnx',
  line: 15,
  column: 8
});
```

### Errores de Runtime

```typescript
// Errores durante la ejecución
errorHandler.reportError(
  'Cannot read property of undefined',
  '/src/Component.cnx',
  'Event Handler'
);
```

### Errores de Template

```typescript
// Errores en renderizado de template
errorHandler.reportError(
  'Variable "count" is not defined',
  '/src/Counter.cnx',
  'Template Rendering'
);
```

### Errores de Navegación

```typescript
// Errores en el router
errorHandler.reportError(
  'Route handler failed',
  '/src/router.js',
  'Navigation'
);
```

## 🎨 Personalización

### Temas Personalizados

```css
/* Tema oscuro */
.connext-error-overlay.dark {
  --connext-error-bg: rgba(0, 0, 0, 0.9);
  --connext-error-panel-bg: #1e1e1e;
  --connext-error-text: #ffffff;
  --connext-error-accent: #ff4757;
}

/* Tema claro */
.connext-error-overlay.light {
  --connext-error-bg: rgba(255, 255, 255, 0.9);
  --connext-error-panel-bg: #ffffff;
  --connext-error-text: #333333;
  --connext-error-accent: #e74c3c;
}
```

### Overlay Personalizado

```typescript
import { errorHandler } from '@connext/error-handler';

// Crear overlay personalizado
class CustomErrorOverlay {
  show(error: ErrorInfo) {
    // Implementación personalizada
  }
  
  hide() {
    // Implementación personalizada
  }
}

// Reemplazar overlay por defecto
errorHandler.setOverlay(new CustomErrorOverlay());
```

## 📊 Métricas y Analytics

### Tracking de Errores

```typescript
import { errorHandler } from '@connext/error-handler';

// Escuchar todos los errores
window.addEventListener('connext:error', (event) => {
  const { message, file, context, timestamp } = event.detail;
  
  // Enviar a servicio de analytics
  analytics.track('error', {
    message,
    file,
    context,
    timestamp,
    userAgent: navigator.userAgent,
    url: window.location.href
  });
});
```

### Estadísticas de Errores

```typescript
// Obtener estadísticas
const stats = errorHandler.getStats();
console.log({
  totalErrors: stats.total,
  errorsByType: stats.byType,
  errorsByFile: stats.byFile,
  recentErrors: stats.recent
});
```

## 🧪 Testing

### Simular Errores

```typescript
import { errorHandler } from '@connext/error-handler';

// En tests
describe('Error Handler', () => {
  it('should show overlay on error', () => {
    errorHandler.reportError('Test error', 'test.cnx', 'Test');
    expect(errorHandler.isVisible).toBe(true);
  });
  
  it('should hide overlay when closed', () => {
    errorHandler.hideOverlay();
    expect(errorHandler.isVisible).toBe(false);
  });
});
```

### Mocking

```typescript
// Mock para tests
jest.mock('@connext/error-handler', () => ({
  errorHandler: {
    reportError: jest.fn(),
    showOverlay: jest.fn(),
    hideOverlay: jest.fn(),
    isVisible: false
  }
}));
```

## 🔍 Debugging

### Debug Mode

```typescript
// Habilitar modo debug
process.env.CONNEXT_DEBUG = 'true';

// O programáticamente
errorHandler.setConfig({ debug: true });
```

### Logs Detallados

```typescript
// Habilitar logs detallados
errorHandler.setConfig({
  logToConsole: true,
  verboseLogging: true
});
```

## 📚 Ejemplos

### Manejo de Errores Personalizado

```typescript
// ErrorBoundary.cnx
<template>
  {#if hasError}
    <div class="error-boundary">
      <h2>Oops! Algo salió mal</h2>
      <p>{errorMessage}</p>
      <button on:click="{retry}">Reintentar</button>
    </div>
  {:else}
    <slot></slot>
  {/if}
</template>

<script>
  import { errorHandler } from '@connext/error-handler';
  
  let hasError = false;
  let errorMessage = '';
  
  // Escuchar errores
  window.addEventListener('connext:error', handleError);
  
  function handleError(event) {
    hasError = true;
    errorMessage = event.detail.message;
    
    // Log adicional
    console.error('Error capturado por boundary:', event.detail);
  }
  
  function retry() {
    hasError = false;
    errorMessage = '';
    window.location.reload();
  }
  
  // Cleanup
  onDestroy(() => {
    window.removeEventListener('connext:error', handleError);
  });
</script>

<style>
  .error-boundary {
    padding: 2rem;
    text-align: center;
    border: 2px solid #ff6b6b;
    border-radius: 8px;
    background: #fff5f5;
    color: #c53030;
  }
</style>
```

### Logger Personalizado

```typescript
// logger.ts
import { errorHandler } from '@connext/error-handler';

class CustomLogger {
  private errors: ErrorLog[] = [];
  
  constructor() {
    window.addEventListener('connext:error', this.logError.bind(this));
  }
  
  private logError(event: CustomEvent) {
    const error: ErrorLog = {
      ...event.detail,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    this.errors.push(error);
    this.sendToServer(error);
  }
  
  private async sendToServer(error: ErrorLog) {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error)
      });
    } catch (e) {
      console.warn('Failed to send error to server:', e);
    }
  }
  
  getErrors(): ErrorLog[] {
    return [...this.errors];
  }
  
  clearErrors(): void {
    this.errors = [];
  }
  
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

interface ErrorLog {
  id: string;
  message: string;
  file?: string;
  context?: string;
  timestamp: string;
  userAgent: string;
  url: string;
}

export const logger = new CustomLogger();
```

## 🔗 Enlaces

- [Documentación Principal](../../README.md)
- [Runtime Package](../runtime/README.md)
- [Compiler Package](../compiler/README.md)
- [Ejemplos](../../examples)

## 📄 Licencia

MIT - ver [LICENSE](../../LICENSE) para más detalles.