# ConnextJS - Framework Completo

🚀 **ConnextJS** es un framework completo que incluye todas las herramientas necesarias para desarrollo web moderno con optimizaciones automáticas.

## ✨ Características Principales

- 🔒 **Ofuscación automática** en build/deploy
- 🖼️ **Optimización automática de imágenes** (reduce peso manteniendo calidad)
- 📦 **Paquete unificado** con todas las herramientas
- 🚀 **CLI mejorado** con navegación e instalación automática
- ⚡ **Configuración cero** para empezar rápidamente
- 🎯 **TypeScript y Tailwind CSS** incluidos
- 🌐 **Configuración automática para Vercel**

## 🚀 Instalación Global

```bash
# Instalar globalmente
npm install -g connextjs
# o
pnpm add -g connextjs
```

## 📦 Crear Nuevo Proyecto

```bash
# Crear proyecto con navegación e instalación automática
npx create-connext-app mi-app

# El CLI automáticamente:
# 1. Crea el proyecto
# 2. Navega al directorio (cd mi-app)
# 3. Instala dependencias (pnpm install)
# 4. ¡Listo para usar!
```

### Opciones del CLI

```bash
# Usar npm en lugar de pnpm
npx create-connext-app mi-app --npm

# No instalar dependencias automáticamente
npx create-connext-app mi-app --no-install

# Especificar puerto personalizado
npx create-connext-app mi-app --port 8080
```

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
connext dev              # Servidor de desarrollo
connext dev --port 8080  # Puerto personalizado

# Build optimizado (con ofuscación automática)
connext build            # Build completo optimizado
connext build --no-obfuscate        # Sin ofuscación
connext build --no-optimize-images  # Sin optimización de imágenes
connext build --sourcemap          # Con source maps

# Optimización de imágenes
connext optimize-images              # Optimizar todas las imágenes
connext optimize-images -q 75       # Calidad específica
connext optimize-images --webp       # Generar versiones WebP

# Vista previa
connext preview          # Vista previa del build

# Información
connext info            # Información del proyecto
```

## 🖼️ Optimización Automática de Imágenes

Las imágenes se optimizan automáticamente durante el build:

- **Reduce peso**: De megas a kilobytes
- **Mantiene calidad**: Optimización inteligente
- **Múltiples formatos**: JPEG, PNG, WebP
- **Automático**: Sin configuración adicional

```typescript
// Usar en tu código
import { optimizeImages } from 'connextjs/image';

// Optimizar directorio de imágenes
await optimizeImages('src/assets/images', 'dist/images');
```

## 🔒 Ofuscación Automática

El código se ofusca automáticamente en cada build:

- **Siempre activa**: Por defecto en build/deploy
- **Protección avanzada**: Control flow flattening, dead code injection
- **Minificación**: Código comprimido al máximo
- **Sin console.log**: Removidos automáticamente

```typescript
// Configuración personalizada
import { obfuscatorPlugin } from 'connextjs/build';

export default {
  plugins: [
    obfuscatorPlugin({
      obfuscation: {
        enabled: true,
        compact: true,
        stringArray: true
      }
    })
  ]
};
```

## ⚡ Uso Rápido

### 1. Crear proyecto
```bash
npx create-connext-app mi-app
# Automáticamente navega e instala dependencias
```

### 2. Desarrollar
```bash
connext dev
# Servidor en http://localhost:3000
```

### 3. Build optimizado
```bash
connext build
# Build con ofuscación + optimización de imágenes
```

### 4. Desplegar
```bash
# El proyecto incluye configuración automática para Vercel
# Solo conecta tu repositorio a Vercel
```

## 📁 Estructura del Proyecto

```
mi-app/
├── src/
│   ├── main.ts          # Punto de entrada
│   ├── index.css        # Estilos con Tailwind
│   └── assets/
│       └── images/      # Imágenes (se optimizan automáticamente)
├── public/              # Archivos estáticos
├── dist/                # Build optimizado
├── package.json         # Dependencias
├── vite.config.js       # Configuración con optimizaciones
├── tailwind.config.js   # Configuración de Tailwind
└── vercel.json          # Configuración para Vercel
```

## 🎯 Presets de Optimización

```typescript
import { connextPlugin } from 'connextjs';

// Desarrollo (sin ofuscación)
connextPlugin({ preset: 'development' })

// Producción (ofuscación estándar)
connextPlugin({ preset: 'production' })

// Máxima seguridad (ofuscación agresiva)
connextPlugin({ preset: 'aggressive' })
```

## 🌐 Despliegue en Vercel

El proyecto incluye configuración automática:

1. **Conecta** tu repositorio a Vercel
2. **Automático**: Vercel detecta la configuración
3. **Listo**: Deploy optimizado con ofuscación

## 📊 Beneficios

- ✅ **Código protegido** con ofuscación automática
- ✅ **Imágenes optimizadas** automáticamente
- ✅ **Setup instantáneo** con un comando
- ✅ **TypeScript + Tailwind** preconfigurados
- ✅ **Deploy fácil** en Vercel
- ✅ **Performance máximo** out-of-the-box

## 🔧 API Programática

```typescript
import ConnextJS from 'connextjs';

// Crear proyecto programáticamente
await ConnextJS.createProject('mi-app', { npm: true });

// Optimizar imágenes
await ConnextJS.optimizeImages('src/images', 'dist/images');

// Build optimizado
await ConnextJS.buildOptimized({ sourcemap: true });
```

## 📝 Licencia

MIT © ConnextJS Team

---

**¿Necesitas ayuda?** 
- 📖 [Documentación completa](https://connextjs.dev)
- 💬 [Discord Community](https://discord.gg/connextjs)
- 🐛 [Reportar issues](https://github.com/connextjs/connextjs/issues)