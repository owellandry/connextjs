import "./index.css";
import { createImageOptimizer } from "connextjs/image";

// Inicializar optimizador de imágenes
const imageOptimizer = createImageOptimizer();

const app = document.getElementById("app")!;

let count = 0;

app.innerHTML = `
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">ConnextJS</h1>
      <p class="text-gray-600 mb-6 text-center">¡Framework completo con optimizaciones automáticas!</p>
      <div class="text-center mb-4">
        <button id="counter-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
          Contador: <span id="count">0</span>
        </button>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-500">✅ Build con ofuscación automática</p>
        <p class="text-sm text-gray-500">✅ Optimización de imágenes</p>
      </div>
    </div>
  </div>
`;

const btn = document.getElementById('counter-btn');
const countSpan = document.getElementById('count');

btn?.addEventListener('click', () => {
  count++;
  if (countSpan) countSpan.textContent = count.toString();
});

// Ejemplo de optimización de imagen
const optimizeExampleImage = async () => {
  // Las imágenes se optimizan automáticamente durante el build
  console.log('🖼️ Imágenes optimizadas automáticamente');
};