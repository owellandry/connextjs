# ConnextJS 🚀

> Un framework JavaScript moderno y reactivo para construir aplicaciones web con componentes declarativos

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## ✨ Características

- **🎯 Componentes Declarativos**: Sintaxis simple con archivos `.cnx`
- **⚡ Desarrollo Rápido**: Hot reload con Vite
- **🔄 Reactividad**: Sistema reactivo integrado
- **🎨 CSS Modular**: Estilos encapsulados por componente
- **🛠️ TypeScript**: Soporte completo para TypeScript
- **🚨 Manejo de Errores**: Sistema avanzado de debugging
- **📦 Modular**: Arquitectura de paquetes independientes

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar ConnextJS CLI
npm install -g @connext/cli

# Crear nuevo proyecto
connext create mi-app
cd mi-app

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm run dev
```

### Tu Primer Componente

Crea un archivo `App.cnx`:

```html
<template>
  <div class="container">
    <h1>¡Hola {nombre}!</h1>
    <button on:click="{incrementar}">Contador: {contador}</button>
  </div>
</template>

<script>
  let nombre = 'ConnextJS';
  let contador = 0;
  
  function incrementar() {
    contador++;
  }
</script>

<style>
  .container {
    padding: 2rem;
    text-align: center;
  }
  
  button {
    background: #007acc;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
```

## 📦 Arquitectura

ConnextJS está construido como un monorepo con los siguientes paquetes:

### Core Packages

- **[@connext/compiler](./packages/compiler)** - Compilador de archivos `.cnx` a JavaScript
- **[@connext/runtime](./packages/runtime)** - Runtime y sistema de componentes
- **[@connext/error-handler](./packages/error-handler)** - Sistema avanzado de manejo de errores

### Development Tools

- **[@connext/cli](./packages/cli)** - Herramientas de línea de comandos
- **[@connext/dev-server](./packages/dev-server)** - Servidor de desarrollo
- **[@connext/vite-plugin](./packages/vite-plugin)** - Plugin para Vite

## 🛠️ Desarrollo

### Requisitos

- Node.js 18+
- pnpm 8+

### Configuración del Entorno

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/connextjs.git
cd connextjs

# Instalar dependencias
pnpm install

# Construir todos los paquetes
pnpm run build

# Ejecutar tests
pnpm run test
```

### Scripts Disponibles

```bash
pnpm run build        # Construir todos los paquetes
pnpm run dev          # Modo desarrollo con watch
pnpm run test         # Ejecutar tests
pnpm run lint         # Linter
pnpm run clean        # Limpiar builds
```

## 📚 Documentación

- [Guía de Inicio](./docs/getting-started.md)
- [API Reference](./docs/api.md)
- [Ejemplos](./examples)
- [Contribuir](./CONTRIBUTING.md)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee nuestra [guía de contribución](./CONTRIBUTING.md) para más detalles.

### Proceso de Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](./LICENSE) para más detalles.

## 🙏 Agradecimientos

- Inspirado por Vue.js y Svelte
- Construido con Vite y TypeScript
- Comunidad open source

## 📞 Soporte

- 📧 Email: support@connextjs.dev
- 💬 Discord: [ConnextJS Community](https://discord.gg/connextjs)
- 🐛 Issues: [GitHub Issues](https://github.com/owellandry/connextjs/issues)

---

<p align="center">
  Hecho con ❤️ por el equipo de ConnextJS
</p>