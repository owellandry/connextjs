# @connext/compiler

> Compilador de archivos `.cnx` a JavaScript para ConnextJS

## 📦 Instalación

```bash
npm install @connext/compiler
# o
pnpm add @connext/compiler
# o
yarn add @connext/compiler
```

## 🚀 Uso

### API Básica

```typescript
import { compile } from '@connext/compiler';

// Compilar desde archivo
const result = await compile('./src/App.cnx');
console.log(result.code); // JavaScript generado
console.log(result.map);  // Source map

// Compilar desde contenido
const content = `
<template>
  <div>Hola {nombre}</div>
</template>

<script>
  let nombre = 'Mundo';
</script>
`;

const result = await compile('virtual.cnx', content);
```

### Integración con Build Tools

#### Vite

```typescript
// vite.config.js
import { defineConfig } from 'vite';
import connext from '@connext/vite-plugin';

export default defineConfig({
  plugins: [connext()]
});
```

#### Webpack

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.cnx$/,
        use: '@connext/webpack-loader'
      }
    ]
  }
};
```

## 📝 Sintaxis de Archivos .cnx

### Estructura Básica

```html
<template>
  <!-- HTML con interpolaciones -->
</template>

<script>
  // JavaScript/TypeScript
</script>

<style>
  /* CSS encapsulado */
</style>
```

### Template

#### Interpolación

```html
<template>
  <h1>Hola {nombre}</h1>
  <p>Tienes {edad} años</p>
  <div class="{claseActiva ? 'active' : ''}">Estado</div>
</template>
```

#### Event Handlers

```html
<template>
  <button on:click="{handleClick}">Click me</button>
  <input on:input="{handleInput}" value="{texto}">
  <form on:submit="{handleSubmit}">
    <!-- contenido -->
  </form>
</template>
```

#### Eventos Soportados

- `on:click` - Click del mouse
- `on:input` - Input de texto
- `on:change` - Cambio de valor
- `on:submit` - Envío de formulario
- `on:keydown` - Tecla presionada
- `on:keyup` - Tecla liberada
- `on:focus` - Elemento enfocado
- `on:blur` - Elemento desenfocado

### Script

```javascript
<script>
  // Variables reactivas
  let contador = 0;
  let nombre = 'ConnextJS';
  
  // Funciones
  function incrementar() {
    contador++;
  }
  
  function saludar(evento) {
    alert(`Hola ${nombre}!`);
  }
  
  // Imports
  import { utilidad } from './utils.js';
  import Component from './Component.cnx';
</script>
```

### Style

```css
<style>
  /* Estilos encapsulados al componente */
  .container {
    padding: 1rem;
    background: #f0f0f0;
  }
  
  button {
    background: var(--primary-color, #007acc);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    opacity: 0.8;
  }
  
  /* Animaciones */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }
</style>
```

## ⚙️ Opciones de Compilación

```typescript
interface CompileOptions {
  // Generar source maps
  sourcemap?: boolean;
  
  // Modo de desarrollo
  dev?: boolean;
  
  // Prefijo para clases CSS
  cssPrefix?: string;
  
  // Transformaciones personalizadas
  transforms?: Transform[];
}

const result = await compile('App.cnx', content, {
  sourcemap: true,
  dev: true,
  cssPrefix: 'cnx-'
});
```

## 🔧 API Avanzada

### Transformaciones Personalizadas

```typescript
import { Transform } from '@connext/compiler';

const customTransform: Transform = {
  name: 'custom-directive',
  transform(node, context) {
    // Lógica de transformación
    return transformedNode;
  }
};

const result = await compile('App.cnx', content, {
  transforms: [customTransform]
});
```

### Plugins

```typescript
import { Plugin } from '@connext/compiler';

const myPlugin: Plugin = {
  name: 'my-plugin',
  setup(build) {
    build.onResolve({ filter: /\.cnx$/ }, (args) => {
      // Lógica de resolución
    });
    
    build.onLoad({ filter: /\.cnx$/ }, (args) => {
      // Lógica de carga
    });
  }
};
```

## 🐛 Debugging

### Source Maps

El compilador genera source maps para facilitar el debugging:

```typescript
const result = await compile('App.cnx', content, {
  sourcemap: true
});

// Source map en formato estándar
console.log(result.map);
```

### Modo Desarrollo

```typescript
const result = await compile('App.cnx', content, {
  dev: true // Incluye información adicional para debugging
});
```

## 📊 Rendimiento

### Benchmarks

| Archivo | Tamaño | Tiempo de Compilación |
|---------|--------|----------------------|
| Pequeño (< 1KB) | 0.5KB | ~1ms |
| Mediano (1-10KB) | 5KB | ~5ms |
| Grande (> 10KB) | 50KB | ~20ms |

### Optimizaciones

- **Cache**: Los resultados se cachean automáticamente
- **Incremental**: Solo recompila archivos modificados
- **Paralelo**: Compilación paralela de múltiples archivos

## 🔍 Troubleshooting

### Errores Comunes

#### Error de Sintaxis

```
SyntaxError: Unexpected token in template
```

**Solución**: Verifica que las llaves `{}` estén balanceadas en las interpolaciones.

#### Variable No Definida

```
ReferenceError: variable is not defined
```

**Solución**: Asegúrate de que todas las variables usadas en el template estén definidas en el script.

#### CSS No Aplicado

**Solución**: Verifica que los estilos estén dentro de la sección `<style>` y que las clases coincidan.

### Debug Mode

```typescript
// Habilitar logs detallados
process.env.CONNEXT_DEBUG = 'true';

const result = await compile('App.cnx', content);
```

## 📚 Ejemplos

### Componente Contador

```html
<template>
  <div class="counter">
    <h2>Contador: {count}</h2>
    <button on:click="{increment}">+</button>
    <button on:click="{decrement}">-</button>
    <button on:click="{reset}">Reset</button>
  </div>
</template>

<script>
  let count = 0;
  
  function increment() {
    count++;
  }
  
  function decrement() {
    count--;
  }
  
  function reset() {
    count = 0;
  }
</script>

<style>
  .counter {
    text-align: center;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    background: #007acc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background: #005a9e;
  }
</style>
```

### Formulario de Contacto

```html
<template>
  <form class="contact-form" on:submit="{handleSubmit}">
    <h2>Contacto</h2>
    
    <div class="field">
      <label for="name">Nombre:</label>
      <input 
        id="name" 
        type="text" 
        value="{name}" 
        on:input="{handleNameInput}"
        required
      >
    </div>
    
    <div class="field">
      <label for="email">Email:</label>
      <input 
        id="email" 
        type="email" 
        value="{email}" 
        on:input="{handleEmailInput}"
        required
      >
    </div>
    
    <div class="field">
      <label for="message">Mensaje:</label>
      <textarea 
        id="message" 
        value="{message}" 
        on:input="{handleMessageInput}"
        required
      ></textarea>
    </div>
    
    <button type="submit" disabled="{!isValid}">Enviar</button>
    
    {#if submitted}
      <p class="success">¡Mensaje enviado correctamente!</p>
    {/if}
  </form>
</template>

<script>
  let name = '';
  let email = '';
  let message = '';
  let submitted = false;
  
  $: isValid = name.length > 0 && email.includes('@') && message.length > 10;
  
  function handleNameInput(event) {
    name = event.target.value;
  }
  
  function handleEmailInput(event) {
    email = event.target.value;
  }
  
  function handleMessageInput(event) {
    message = event.target.value;
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    
    if (isValid) {
      // Enviar datos
      console.log({ name, email, message });
      submitted = true;
      
      // Reset form
      setTimeout(() => {
        name = '';
        email = '';
        message = '';
        submitted = false;
      }, 3000);
    }
  }
</script>

<style>
  .contact-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .field {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  textarea {
    height: 100px;
    resize: vertical;
  }
  
  button {
    background: #007acc;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .success {
    color: green;
    margin-top: 1rem;
    font-weight: bold;
  }
</style>
```

## 🔗 Enlaces

- [Documentación Principal](../../README.md)
- [Runtime Package](../runtime/README.md)
- [Vite Plugin](../vite-plugin/README.md)
- [Ejemplos](../../examples)

## 📄 Licencia

MIT - ver [LICENSE](../../LICENSE) para más detalles.