# @connext/cli

> Herramienta de línea de comandos oficial para ConnextJS - Crea, desarrolla y construye aplicaciones ConnextJS

## 📦 Instalación

### Instalación Global

```bash
npm install -g @connext/cli
# o
pnpm add -g @connext/cli
# o
yarn global add @connext/cli
```

### Instalación Local

```bash
npm install --save-dev @connext/cli
# o
pnpm add -D @connext/cli
# o
yarn add --dev @connext/cli
```

## 🚀 Uso Rápido

### Crear Nuevo Proyecto

```bash
# Crear proyecto con template por defecto
connext create my-app

# Crear con template específico
connext create my-app --template typescript
connext create my-app --template tailwind
connext create my-app --template minimal

# Crear en directorio actual
connext create . --template basic
```

### Servidor de Desarrollo

```bash
# Iniciar servidor de desarrollo
connext dev

# Con puerto personalizado
connext dev --port 8080

# Con host personalizado
connext dev --host 0.0.0.0

# Modo verbose
connext dev --verbose
```

### Construcción para Producción

```bash
# Build básico
connext build

# Build con análisis de bundle
connext build --analyze

# Build con sourcemaps
connext build --sourcemap

# Build para directorio personalizado
connext build --outDir custom-dist
```

## 📋 Comandos Disponibles

### `connext create <name>`

Crea un nuevo proyecto ConnextJS.

```bash
connext create <project-name> [options]

Opciones:
  -t, --template <template>  Template a usar (default: "basic")
  -f, --force               Sobrescribir directorio existente
  -y, --yes                 Usar configuración por defecto
  --no-install              No instalar dependencias automáticamente
  --package-manager <pm>    Gestor de paquetes (npm|pnpm|yarn)
  -h, --help                Mostrar ayuda
```

**Templates Disponibles:**
- `basic` - Proyecto básico con componentes esenciales
- `typescript` - Proyecto con TypeScript configurado
- `tailwind` - Proyecto con Tailwind CSS
- `minimal` - Proyecto mínimo sin dependencias extras
- `full` - Proyecto completo con todas las características

### `connext dev`

Inicia el servidor de desarrollo.

```bash
connext dev [options]

Opciones:
  -p, --port <port>         Puerto del servidor (default: 3000)
  -h, --host <host>         Host del servidor (default: "localhost")
  -o, --open               Abrir navegador automáticamente
  --https                   Usar HTTPS
  --cors                    Habilitar CORS
  -v, --verbose             Modo verbose
  --help                    Mostrar ayuda
```

### `connext build`

Construye la aplicación para producción.

```bash
connext build [options]

Opciones:
  -o, --outDir <dir>        Directorio de salida (default: "dist")
  -w, --watch               Modo watch
  --analyze                 Analizar bundle
  --sourcemap               Generar sourcemaps
  --minify                  Minificar código (default: true)
  --target <target>         Target de build (es2015|es2018|esnext)
  -v, --verbose             Modo verbose
  --help                    Mostrar ayuda
```

### `connext preview`

Previsualiza la build de producción.

```bash
connext preview [options]

Opciones:
  -p, --port <port>         Puerto del servidor (default: 4173)
  -h, --host <host>         Host del servidor (default: "localhost")
  -o, --open               Abrir navegador automáticamente
  --https                   Usar HTTPS
  --help                    Mostrar ayuda
```

### `connext add <feature>`

Añade características al proyecto existente.

```bash
connext add <feature> [options]

Características disponibles:
  typescript               Añadir soporte para TypeScript
  tailwind                 Añadir Tailwind CSS
  router                   Añadir ConnextJS Router
  pwa                      Añadir soporte PWA
  testing                  Añadir configuración de testing
  eslint                   Añadir ESLint
  prettier                 Añadir Prettier

Opciones:
  -f, --force              Sobrescribir archivos existentes
  --no-install             No instalar dependencias
  --help                   Mostrar ayuda
```

### `connext info`

Muestra información del proyecto y entorno.

```bash
connext info [options]

Opciones:
  --json                   Salida en formato JSON
  --help                   Mostrar ayuda
```

### `connext upgrade`

Actualiza ConnextJS y sus dependencias.

```bash
connext upgrade [options]

Opciones:
  --latest                 Actualizar a la última versión
  --check                  Solo verificar actualizaciones
  --help                   Mostrar ayuda
```

## 🎯 Templates

### Template Basic

Proyecto básico con estructura mínima:

```
my-app/
├── src/
│   ├── App.cnx
│   ├── main.ts
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── vite.config.js
└── README.md
```

### Template TypeScript

Proyecto con TypeScript configurado:

```
my-app/
├── src/
│   ├── App.cnx
│   ├── main.ts
│   ├── types/
│   │   └── index.ts
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Template Tailwind

Proyecto con Tailwind CSS:

```
my-app/
├── src/
│   ├── App.cnx
│   ├── main.ts
│   ├── components/
│   │   └── Button.cnx
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

### Template Full

Proyecto completo con todas las características:

```
my-app/
├── src/
│   ├── components/
│   │   ├── Button.cnx
│   │   ├── Card.cnx
│   │   └── Layout.cnx
│   ├── pages/
│   │   ├── Home.cnx
│   │   ├── About.cnx
│   │   └── Contact.cnx
│   ├── stores/
│   │   └── app.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.cnx
│   ├── main.ts
│   └── index.css
├── public/
│   ├── index.html
│   └── favicon.ico
├── tests/
│   └── setup.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── .eslintrc.js
├── .prettierrc
└── README.md
```

## ⚙️ Configuración

### Archivo de Configuración

Crea un archivo `connext.config.js` en la raíz del proyecto:

```javascript
// connext.config.js
export default {
  // Configuración del servidor de desarrollo
  dev: {
    port: 3000,
    host: 'localhost',
    open: true,
    https: false
  },
  
  // Configuración de build
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    target: 'es2018'
  },
  
  // Configuración del compilador
  compiler: {
    sourcemap: true,
    minify: false
  },
  
  // Plugins personalizados
  plugins: [
    // Tus plugins aquí
  ]
};
```

### Variables de Entorno

El CLI respeta las siguientes variables de entorno:

```bash
# Puerto por defecto
PORT=3000

# Host por defecto
HOST=localhost

# Modo de desarrollo
NODE_ENV=development

# Directorio de trabajo
CONNEXT_CWD=/path/to/project

# Nivel de log
CONNEXT_LOG_LEVEL=info

# Deshabilitar telemetría
CONNEXT_TELEMETRY_DISABLED=true
```

## 🔧 Integración con IDEs

### VS Code

Crea `.vscode/settings.json`:

```json
{
  "connext.dev.autoStart": true,
  "connext.build.autoWatch": false,
  "connext.cli.defaultTemplate": "typescript"
}
```

### WebStorm

Configura Run Configuration:

```xml
<configuration name="ConnextJS Dev" type="js.build_tools.npm">
  <package-json value="$PROJECT_DIR$/package.json" />
  <command value="run" />
  <scripts>
    <script value="dev" />
  </scripts>
</configuration>
```

## 🧪 Scripts NPM

El CLI genera automáticamente estos scripts en `package.json`:

```json
{
  "scripts": {
    "dev": "connext dev",
    "build": "connext build",
    "preview": "connext preview",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.cnx",
    "format": "prettier --write src/**/*.{ts,cnx,css}"
  }
}
```

## 🔍 Debugging

### Modo Verbose

```bash
# Habilitar logs detallados
connext dev --verbose
connext build --verbose

# O con variable de entorno
DEBUG=connext:* connext dev
```

### Logs de Debug

```bash
# Ver logs del compilador
DEBUG=connext:compiler connext build

# Ver logs del servidor
DEBUG=connext:server connext dev

# Ver todos los logs
DEBUG=connext:* connext dev
```

## 📊 Análisis de Bundle

### Comando de Análisis

```bash
# Analizar bundle después del build
connext build --analyze

# Solo análisis sin build
connext analyze
```

### Reporte de Bundle

El análisis genera:

- **bundle-report.html** - Reporte visual interactivo
- **bundle-stats.json** - Estadísticas en JSON
- **bundle-sizes.txt** - Resumen de tamaños

## 🚀 Deployment

### Build para Producción

```bash
# Build optimizado
connext build --minify --sourcemap

# Build para diferentes targets
connext build --target es2015  # Compatibilidad amplia
connext build --target es2018  # Moderno (default)
connext build --target esnext  # Más moderno
```

### Configuración de Servidor

```bash
# Generar configuración para diferentes servidores
connext generate server-config --type nginx
connext generate server-config --type apache
connext generate server-config --type netlify
connext generate server-config --type vercel
```

## 🔄 Migración

### Desde Otros Frameworks

```bash
# Migrar desde Vue
connext migrate --from vue --to connext

# Migrar desde React
connext migrate --from react --to connext

# Migrar desde Svelte
connext migrate --from svelte --to connext
```

### Actualizar Proyecto Existente

```bash
# Actualizar a la última versión
connext upgrade --latest

# Actualizar solo dependencias de ConnextJS
connext upgrade --connext-only

# Verificar actualizaciones disponibles
connext upgrade --check
```

## 🧩 Plugins

### Plugins Oficiales

```bash
# Instalar plugin oficial
connext add plugin @connext/plugin-pwa
connext add plugin @connext/plugin-i18n
connext add plugin @connext/plugin-analytics
```

### Crear Plugin Personalizado

```bash
# Generar estructura de plugin
connext generate plugin my-plugin

# Estructura generada:
my-plugin/
├── src/
│   ├── index.ts
│   └── types.ts
├── package.json
├── README.md
└── tsconfig.json
```

## 📚 Ejemplos de Uso

### Proyecto Básico

```bash
# Crear proyecto
connext create my-blog --template basic
cd my-blog

# Instalar dependencias
npm install

# Iniciar desarrollo
connext dev

# Build para producción
connext build
```

### Proyecto con TypeScript

```bash
# Crear proyecto TypeScript
connext create my-app --template typescript
cd my-app

# Añadir características adicionales
connext add tailwind
connext add router
connext add testing

# Desarrollo
connext dev --port 8080
```

### Proyecto Empresarial

```bash
# Crear proyecto completo
connext create enterprise-app --template full
cd enterprise-app

# Configurar herramientas adicionales
connext add eslint
connext add prettier
connext add pwa

# Configurar CI/CD
connext generate github-actions
connext generate dockerfile

# Build con análisis
connext build --analyze --sourcemap
```

## 🔧 Troubleshooting

### Problemas Comunes

#### Puerto en Uso

```bash
# Error: Puerto 3000 en uso
# Solución: Usar puerto diferente
connext dev --port 3001

# O encontrar puerto libre automáticamente
connext dev --port auto
```

#### Problemas de Permisos

```bash
# Error: EACCES permission denied
# Solución: Usar npx en lugar de instalación global
npx @connext/cli create my-app
```

#### Build Fallido

```bash
# Error en build
# Solución: Limpiar cache y rebuilding
connext clean
connext build --verbose
```

### Comandos de Diagnóstico

```bash
# Información del sistema
connext info

# Verificar configuración
connext config --validate

# Limpiar cache
connext clean --all

# Verificar dependencias
connext doctor
```

## 📈 Performance

### Optimizaciones de Build

```bash
# Build con optimizaciones máximas
connext build \
  --minify \
  --tree-shake \
  --code-split \
  --compress

# Build paralelo (más rápido)
connext build --parallel

# Build incremental
connext build --incremental
```

### Cache de Desarrollo

```bash
# Habilitar cache persistente
connext dev --cache

# Limpiar cache
connext clean --cache

# Ver estadísticas de cache
connext cache --stats
```

## 🔗 Integración con CI/CD

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: connext build
      - run: connext test
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN connext build

EXPOSE 3000
CMD ["connext", "preview"]
```

## 📄 API Reference

### CLI API

```typescript
// Usar CLI programáticamente
import { ConnextCLI } from '@connext/cli';

const cli = new ConnextCLI();

// Crear proyecto
await cli.create('my-app', {
  template: 'typescript',
  install: true
});

// Iniciar dev server
await cli.dev({
  port: 3000,
  open: true
});

// Build proyecto
await cli.build({
  outDir: 'dist',
  minify: true
});
```

### Configuración TypeScript

```typescript
// connext.config.ts
import { defineConfig } from '@connext/cli';

export default defineConfig({
  dev: {
    port: 3000,
    host: 'localhost'
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

## 🔗 Enlaces

- [Documentación Principal](../../README.md)
- [Guía de Inicio Rápido](../../docs/quick-start.md)
- [Templates](../../templates)
- [Ejemplos](../../examples)
- [Plugins](../../plugins)

## 📄 Licencia

MIT - ver [LICENSE](../../LICENSE) para más detalles.