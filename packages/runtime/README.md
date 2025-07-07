# @connext/runtime

> Runtime y sistema de componentes para ConnextJS

## 📦 Instalación

```bash
npm install @connext/runtime
# o
pnpm add @connext/runtime
# o
yarn add @connext/runtime
```

## 🚀 Uso Básico

### Inicialización de Componente

```typescript
import { ConnextComponent } from '@connext/runtime';
import { render } from './App.cnx';

// Crear instancia del componente
const app = new ConnextComponent({
  target: document.getElementById('app'),
  render: render
});
```

### Router

```typescript
import { ConnextRouter } from '@connext/runtime';
import { render as Home } from './pages/Home.cnx';
import { render as About } from './pages/About.cnx';

const router = new ConnextRouter();

// Definir rutas
router.route('/', () => {
  const component = new ConnextComponent({
    target: document.getElementById('app'),
    render: Home
  });
});

router.route('/about', () => {
  const component = new ConnextComponent({
    target: document.getElementById('app'),
    render: About
  });
});

// Iniciar router
router.start();
```

## 🏗️ Arquitectura

### ConnextComponent

La clase principal para manejar componentes:

```typescript
class ConnextComponent {
  constructor(options: ComponentOptions)
  destroy(): void
  update(props?: any): void
}

interface ComponentOptions {
  target: HTMLElement;     // Elemento DOM donde renderizar
  render: RenderFunction;  // Función de renderizado del componente
  props?: any;            // Props iniciales
}
```

### ConnextRouter

Sistema de enrutamiento SPA:

```typescript
class ConnextRouter {
  route(path: string, handler: RouteHandler): void
  navigate(path: string): void
  start(): void
  stop(): void
}

type RouteHandler = (params?: RouteParams) => void;
```

## 🔄 Sistema Reactivo

### Variables Reactivas

Las variables en ConnextJS son automáticamente reactivas:

```javascript
// En el componente .cnx
<script>
  let count = 0;        // Variable reactiva
  let name = 'World';   // Variable reactiva
  
  // Cuando cambian, la UI se actualiza automáticamente
  function increment() {
    count++; // Trigger re-render
  }
</script>
```

### Computed Values

```javascript
<script>
  let firstName = 'John';
  let lastName = 'Doe';
  
  // Computed value usando $:
  $: fullName = `${firstName} ${lastName}`;
  
  // Computed con lógica compleja
  $: greeting = {
    if (fullName.length > 10) {
      return `Hello, ${firstName}!`;
    }
    return `Hello, ${fullName}!`;
  };
</script>
```

### Watchers

```javascript
<script>
  let count = 0;
  
  // Watcher que se ejecuta cuando count cambia
  $: {
    if (count > 10) {
      console.log('Count is getting high!');
    }
  }
  
  // Watcher con dependencias específicas
  $: console.log(`Count changed to: ${count}`);
</script>
```

## 🎯 Event Handling

### Event Listeners

```html
<template>
  <!-- Click events -->
  <button on:click="{handleClick}">Click me</button>
  <button on:click="{() => count++}">Increment</button>
  
  <!-- Input events -->
  <input on:input="{handleInput}" value="{text}">
  <input on:change="{handleChange}">
  
  <!-- Form events -->
  <form on:submit="{handleSubmit}">
    <input type="text" required>
    <button type="submit">Submit</button>
  </form>
  
  <!-- Keyboard events -->
  <input on:keydown="{handleKeyDown}">
  <input on:keyup="{handleKeyUp}">
  
  <!-- Mouse events -->
  <div on:mouseenter="{handleMouseEnter}">
    <div on:mouseleave="{handleMouseLeave}">
      Hover me
    </div>
  </div>
</template>

<script>
  let text = '';
  
  function handleClick(event) {
    console.log('Button clicked!', event);
  }
  
  function handleInput(event) {
    text = event.target.value;
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted!');
  }
  
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      console.log('Enter pressed!');
    }
  }
</script>
```

### Event Modifiers

```html
<template>
  <!-- Prevent default -->
  <form on:submit|preventDefault="{handleSubmit}">
    <!-- contenido -->
  </form>
  
  <!-- Stop propagation -->
  <div on:click="{handleOuterClick}">
    <button on:click|stopPropagation="{handleInnerClick}">
      Click me
    </button>
  </div>
  
  <!-- Once -->
  <button on:click|once="{handleOnce}">Click once</button>
  
  <!-- Passive -->
  <div on:scroll|passive="{handleScroll}">Scrollable content</div>
</template>
```

## 🎨 Lifecycle

### Component Lifecycle

```javascript
<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from '@connext/runtime';
  
  // Se ejecuta después de que el componente se monta
  onMount(() => {
    console.log('Component mounted');
    
    // Cleanup function
    return () => {
      console.log('Cleanup on unmount');
    };
  });
  
  // Se ejecuta antes de que el componente se destruya
  onDestroy(() => {
    console.log('Component will be destroyed');
  });
  
  // Se ejecuta antes de cada actualización
  beforeUpdate(() => {
    console.log('Component will update');
  });
  
  // Se ejecuta después de cada actualización
  afterUpdate(() => {
    console.log('Component updated');
  });
</script>
```

## 🔗 Component Communication

### Props

```javascript
// Parent.cnx
<template>
  <ChildComponent name="{userName}" age="{userAge}" />
</template>

<script>
  import ChildComponent from './ChildComponent.cnx';
  
  let userName = 'John';
  let userAge = 25;
</script>
```

```javascript
// ChildComponent.cnx
<template>
  <div>
    <h2>Hello {name}!</h2>
    <p>You are {age} years old.</p>
  </div>
</template>

<script>
  // Props se declaran como variables
  export let name;
  export let age;
  
  // Props con valores por defecto
  export let theme = 'light';
  export let showAge = true;
</script>
```

### Events (Custom Events)

```javascript
// Child.cnx
<template>
  <button on:click="{sendMessage}">Send Message</button>
</template>

<script>
  import { createEventDispatcher } from '@connext/runtime';
  
  const dispatch = createEventDispatcher();
  
  function sendMessage() {
    dispatch('message', {
      text: 'Hello from child!',
      timestamp: Date.now()
    });
  }
</script>
```

```javascript
// Parent.cnx
<template>
  <Child on:message="{handleMessage}" />
</template>

<script>
  import Child from './Child.cnx';
  
  function handleMessage(event) {
    console.log('Received:', event.detail);
  }
</script>
```

### Stores (Global State)

```typescript
// stores.ts
import { writable, readable, derived } from '@connext/runtime';

// Writable store
export const count = writable(0);

// Readable store
export const time = readable(new Date(), (set) => {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);
  
  return () => clearInterval(interval);
});

// Derived store
export const doubled = derived(count, $count => $count * 2);

// Custom store
function createCounter() {
  const { subscribe, set, update } = writable(0);
  
  return {
    subscribe,
    increment: () => update(n => n + 1),
    decrement: () => update(n => n - 1),
    reset: () => set(0)
  };
}

export const counter = createCounter();
```

```javascript
// Component.cnx
<template>
  <div>
    <p>Count: {$count}</p>
    <p>Doubled: {$doubled}</p>
    <p>Time: {$time}</p>
    
    <button on:click="{counter.increment}">+</button>
    <button on:click="{counter.decrement}">-</button>
    <button on:click="{counter.reset}">Reset</button>
  </div>
</template>

<script>
  import { count, doubled, time, counter } from './stores.js';
  
  // Los stores se auto-suscriben con el prefijo $
</script>
```

## 🎭 Animations

### Transitions

```javascript
<template>
  {#if visible}
    <div transition:fade="{{duration: 300}}">
      Fade in/out
    </div>
  {/if}
  
  {#if showSlide}
    <div transition:slide="{{duration: 500, easing: 'ease-out'}}">
      Slide in/out
    </div>
  {/if}
</template>

<script>
  import { fade, slide } from '@connext/runtime/transitions';
  
  let visible = false;
  let showSlide = false;
</script>
```

### Custom Transitions

```typescript
// transitions.ts
import { TransitionConfig } from '@connext/runtime';

export function customFade(node: Element, params: any): TransitionConfig {
  return {
    duration: params.duration || 300,
    css: (t: number) => `opacity: ${t}`
  };
}

export function bounce(node: Element, params: any): TransitionConfig {
  return {
    duration: params.duration || 600,
    css: (t: number) => {
      const eased = elasticOut(t);
      return `transform: scale(${eased})`;
    }
  };
}

function elasticOut(t: number): number {
  return Math.sin(-13 * (t + 1) * Math.PI / 2) * Math.pow(2, -10 * t) + 1;
}
```

## 🔧 API Reference

### ConnextComponent

```typescript
class ConnextComponent {
  constructor(options: ComponentOptions)
  
  // Métodos públicos
  destroy(): void
  update(props?: Record<string, any>): void
  
  // Propiedades
  readonly target: HTMLElement
  readonly destroyed: boolean
}

interface ComponentOptions {
  target: HTMLElement;
  render: RenderFunction;
  props?: Record<string, any>;
  hydrate?: boolean;
}

type RenderFunction = (target: HTMLElement) => void;
```

### ConnextRouter

```typescript
class ConnextRouter {
  constructor(options?: RouterOptions)
  
  // Métodos de enrutamiento
  route(path: string, handler: RouteHandler): void
  navigate(path: string, options?: NavigateOptions): void
  back(): void
  forward(): void
  
  // Control del router
  start(): void
  stop(): void
  
  // Estado
  readonly currentPath: string
  readonly isActive: boolean
}

interface RouterOptions {
  base?: string;
  hash?: boolean;
  fallback?: string;
}

interface NavigateOptions {
  replace?: boolean;
  state?: any;
}

type RouteHandler = (params: RouteParams) => void;
type RouteParams = Record<string, string>;
```

### Stores

```typescript
// Writable Store
interface Writable<T> {
  subscribe(subscriber: Subscriber<T>): Unsubscriber;
  set(value: T): void;
  update(updater: Updater<T>): void;
}

// Readable Store
interface Readable<T> {
  subscribe(subscriber: Subscriber<T>): Unsubscriber;
}

// Derived Store
function derived<T, S>(
  stores: Readable<T> | Readable<T>[],
  fn: (values: T) => S,
  initial?: S
): Readable<S>;

type Subscriber<T> = (value: T) => void;
type Unsubscriber = () => void;
type Updater<T> = (value: T) => T;
```

### Lifecycle Functions

```typescript
function onMount(fn: () => void | (() => void)): void;
function onDestroy(fn: () => void): void;
function beforeUpdate(fn: () => void): void;
function afterUpdate(fn: () => void): void;

// Context
function setContext<T>(key: any, context: T): void;
function getContext<T>(key: any): T;
function hasContext(key: any): boolean;
```

## 🎯 Ejemplos Avanzados

### Todo App

```javascript
// TodoApp.cnx
<template>
  <div class="todo-app">
    <h1>Todo List</h1>
    
    <form on:submit|preventDefault="{addTodo}">
      <input 
        bind:value="{newTodo}" 
        placeholder="Add a todo..."
        required
      >
      <button type="submit">Add</button>
    </form>
    
    <ul class="todo-list">
      {#each todos as todo (todo.id)}
        <li class="todo-item {todo.completed ? 'completed' : ''}">
          <input 
            type="checkbox" 
            bind:checked="{todo.completed}"
          >
          <span class="todo-text">{todo.text}</span>
          <button on:click="{() => removeTodo(todo.id)}">×</button>
        </li>
      {/each}
    </ul>
    
    <div class="todo-stats">
      <span>{remainingCount} remaining</span>
      <button on:click="{clearCompleted}">Clear completed</button>
    </div>
  </div>
</template>

<script>
  let newTodo = '';
  let todos = [];
  let nextId = 1;
  
  $: remainingCount = todos.filter(t => !t.completed).length;
  
  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, {
        id: nextId++,
        text: newTodo.trim(),
        completed: false
      }];
      newTodo = '';
    }
  }
  
  function removeTodo(id) {
    todos = todos.filter(t => t.id !== id);
  }
  
  function clearCompleted() {
    todos = todos.filter(t => !t.completed);
  }
</script>

<style>
  .todo-app {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .todo-list {
    list-style: none;
    padding: 0;
  }
  
  .todo-item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .todo-item.completed .todo-text {
    text-decoration: line-through;
    opacity: 0.6;
  }
  
  .todo-stats {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
</style>
```

## 🔗 Enlaces

- [Documentación Principal](../../README.md)
- [Compiler Package](../compiler/README.md)
- [Error Handler Package](../error-handler/README.md)
- [Ejemplos](../../examples)

## 📄 Licencia

MIT - ver [LICENSE](../../LICENSE) para más detalles.