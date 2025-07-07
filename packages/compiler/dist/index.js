"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = compile;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const magic_string_1 = __importDefault(require("magic-string"));
const readFile = (0, util_1.promisify)(fs_1.default.readFile);
/**
 * Compila un archivo .cnx ⇒ JS string con soporte completo para CSS, eventos y reactividad
 */
async function compile(file, content) {
    const code = content || await readFile(file, "utf8");
    const s = new magic_string_1.default(code);
    // Extraer las tres secciones principales
    const template = code.match(/<template>([\s\S]*?)<\/template>/)?.[1] ?? "";
    const script = code.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";
    const style = code.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
    // Procesar eventos en el template (on:click, etc.)
    let processedTemplate = template.replace(/on:(\w+)="{([^}]+)}"/g, (match, event, handler) => {
        return `data-event-${event}="${handler}"`;
    });
    // Procesar interpolaciones {variable}
    processedTemplate = processedTemplate.replace(/{([^}]+)}/g, (match, expr) => {
        return `\${${expr}}`;
    });
    // Extraer imports del script
    const imports = [];
    const scriptLines = script.split('\n');
    let cleanScript = '';
    for (const line of scriptLines) {
        if (line.trim().startsWith('import ')) {
            imports.push(line.trim());
        }
        else {
            cleanScript += line + '\n';
        }
    }
    // Generar código JavaScript con soporte completo y contexto reactivo
    const output = `
    ${imports.join('\n')}
    
    // Crear contexto reactivo para el componente
    function createComponent() {
      try {
        ${cleanScript}
        
        // Crear un estilo para el componente si no existe
        if (!document.querySelector('style[data-connext-component]')) {
          const styleElement = document.createElement('style');
          styleElement.setAttribute('data-connext-component', 'true');
          styleElement.textContent = \`${style.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
          document.head.appendChild(styleElement);
        }
        
        // Función para actualizar la UI basada en el estado
        function updateUI(target) {
          try {
            // Renderizar el template con las variables actuales
            target.innerHTML = \`${processedTemplate.replace(/`/g, '\\`')}\`;
            
            // Agregar event listeners
            const elements = target.querySelectorAll('[data-event-click]');
            elements.forEach(el => {
              const handler = el.getAttribute('data-event-click');
              el.removeAttribute('data-event-click');
              el.addEventListener('click', () => {
                try {
                  // Ejecutar el handler en el contexto del componente
                  eval(handler);
                  updateUI(target); // Re-renderizar después del evento
                } catch (e) {
                  console.error('Error ejecutando handler:', handler, e);
                  // Reportar error al error handler si está disponible
                  if (window.connextErrorHandler) {
                    window.connextErrorHandler.reportError(
                      \`Error en event handler: \${e.message}\`,
                      '${file}',
                      'Event Handler'
                    );
                  }
                }
              });
            });
          } catch (e) {
            console.error('Error renderizando template:', e);
            if (window.connextErrorHandler) {
              window.connextErrorHandler.reportError(
                \`Error renderizando template: \${e.message}\`,
                '${file}',
                'Template Rendering'
              );
            }
          }
        }
        
        return { updateUI };
      } catch (e) {
        console.error('Error en script del componente:', e);
        if (window.connextErrorHandler) {
          window.connextErrorHandler.reportError(
            \`Error en script del componente: \${e.message}\`,
            '${file}',
            'Component Script'
          );
        }
        return { updateUI: () => {} };
      }
    }
    
    export function render(target) {
      try {
        const component = createComponent();
        component.updateUI(target);
      } catch (e) {
        console.error('Error inicializando componente:', e);
        if (window.connextErrorHandler) {
          window.connextErrorHandler.reportError(
            \`Error inicializando componente: \${e.message}\`,
            '${file}',
            'Component Initialization'
          );
        }
      }
    }
  `;
    return { code: output, map: s.generateMap({ hires: true }) };
}
