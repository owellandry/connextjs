# Guía de Contribución

¡Gracias por tu interés en contribuir a ConnextJS! 🎉

Esta guía te ayudará a entender cómo puedes contribuir al proyecto de manera efectiva.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Features](#solicitar-features)

## 📜 Código de Conducta

Este proyecto adhiere al [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). Al participar, se espera que mantengas este código.

## 🤝 ¿Cómo puedo contribuir?

Hay muchas formas de contribuir a ConnextJS:

- 🐛 **Reportar bugs**
- 💡 **Sugerir nuevas funcionalidades**
- 📝 **Mejorar documentación**
- 🔧 **Corregir bugs**
- ✨ **Implementar nuevas funcionalidades**
- 🧪 **Escribir tests**
- 📖 **Crear ejemplos**

## 🛠️ Configuración del Entorno

### Requisitos

- Node.js 18 o superior
- pnpm 8 o superior
- Git

### Configuración Inicial

```bash
# 1. Fork el repositorio en GitHub

# 2. Clonar tu fork
git clone https://github.com/TU_USUARIO/connextjs.git
cd connextjs

# 3. Agregar el repositorio original como upstream
git remote add upstream https://github.com/ORIGINAL_OWNER/connextjs.git

# 4. Instalar dependencias
pnpm install

# 5. Construir el proyecto
pnpm run build

# 6. Ejecutar tests para verificar que todo funciona
pnpm run test
```

## 🔄 Proceso de Desarrollo

### 1. Crear una rama

```bash
# Actualizar main
git checkout main
git pull upstream main

# Crear nueva rama
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
```

### 2. Realizar cambios

- Haz tus cambios siguiendo los [estándares de código](#estándares-de-código)
- Agrega tests si es necesario
- Actualiza documentación si es relevante

### 3. Verificar cambios

```bash
# Ejecutar linter
pnpm run lint

# Ejecutar tests
pnpm run test

# Construir proyecto
pnpm run build
```

### 4. Commit y push

```bash
# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar nueva funcionalidad X"

# Push a tu fork
git push origin feature/nombre-descriptivo
```

## 📏 Estándares de Código

### Convenciones de Naming

- **Archivos**: kebab-case (`error-handler.ts`)
- **Directorios**: kebab-case (`error-handler/`)
- **Variables/Funciones**: camelCase (`errorHandler`)
- **Clases**: PascalCase (`ErrorHandler`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_RETRIES`)

### Estilo de Código

- Usar TypeScript para todo el código
- Seguir las reglas de ESLint configuradas
- Usar Prettier para formateo
- Máximo 100 caracteres por línea
- Usar comillas simples para strings
- Punto y coma al final de statements

### Estructura de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan lógica)
- `refactor`: Refactoring de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

**Ejemplos:**
```
feat(compiler): agregar soporte para async/await
fix(runtime): corregir memory leak en componentes
docs(readme): actualizar guía de instalación
```

## 🔍 Proceso de Pull Request

### Antes de crear el PR

- [ ] Tests pasan
- [ ] Linter pasa
- [ ] Build exitoso
- [ ] Documentación actualizada
- [ ] Changelog actualizado (si aplica)

### Crear el Pull Request

1. Ve a GitHub y crea un Pull Request
2. Usa el template proporcionado
3. Describe claramente los cambios
4. Referencia issues relacionados
5. Agrega screenshots si hay cambios visuales

### Template de PR

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## ¿Cómo se ha probado?
Describe las pruebas realizadas.

## Checklist
- [ ] Mi código sigue los estándares del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código en áreas difíciles de entender
- [ ] He actualizado la documentación correspondiente
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He agregado tests que prueban mi fix/feature
- [ ] Tests nuevos y existentes pasan localmente
```

## 🐛 Reportar Bugs

Antes de reportar un bug:

1. **Busca** en issues existentes
2. **Reproduce** el bug en la última versión
3. **Prepara** información detallada

### Template de Bug Report

```markdown
**Descripción del Bug**
Descripción clara y concisa del bug.

**Pasos para Reproducir**
1. Ve a '...'
2. Haz click en '...'
3. Scroll hasta '...'
4. Ver error

**Comportamiento Esperado**
Descripción de lo que esperabas que pasara.

**Screenshots**
Si aplica, agrega screenshots.

**Entorno:**
- OS: [e.g. Windows 11]
- Node.js: [e.g. 18.17.0]
- ConnextJS: [e.g. 0.1.0]
- Browser: [e.g. Chrome 120]

**Contexto Adicional**
Cualquier otra información relevante.
```

## 💡 Solicitar Features

### Template de Feature Request

```markdown
**¿Tu feature request está relacionado con un problema?**
Descripción clara del problema.

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que pase.

**Describe alternativas que has considerado**
Descripción de soluciones alternativas.

**Contexto Adicional**
Cualquier otra información relevante.
```

## 📚 Recursos Útiles

- [Documentación del Proyecto](./README.md)
- [API Reference](./docs/api.md)
- [Ejemplos](./examples)
- [Arquitectura](./docs/architecture.md)

## 🆘 ¿Necesitas Ayuda?

- 💬 [Discord Community](https://discord.gg/connextjs)
- 📧 Email: contributors@connextjs.dev
- 🐛 [GitHub Issues](https://github.com/tu-usuario/connextjs/issues)

---

¡Gracias por contribuir a ConnextJS! 🚀