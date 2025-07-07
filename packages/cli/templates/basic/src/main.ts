import "./index.css";
import { ConnextComponent } from "@connext/runtime";

// Crear instancia del componente simple
const app = document.getElementById("app")!;

// Crear un componente básico
const component = new ConnextComponent(app, {
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">ConnextJS</h1>
        <p class="text-gray-600 mb-6 text-center">¡Tu aplicación está funcionando!</p>
        <div class="text-center">
          <button id="counter-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
            Contador: <span id="count">0</span>
          </button>
        </div>
      </div>
    </div>
  `,
  data: {
    count: 0
  },
  mounted() {
    const btn = this.element.querySelector('#counter-btn');
    const countSpan = this.element.querySelector('#count');
    
    btn?.addEventListener('click', () => {
      this.data.count++;
      if (countSpan) countSpan.textContent = this.data.count.toString();
    });
  }
});

component.mount();