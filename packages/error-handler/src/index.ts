export interface ErrorInfo {
  message: string;
  file?: string;
  line?: number;
  column?: number;
  stack?: string;
}

export class ConnextErrorHandler {
  private overlay: HTMLElement | null = null;
  private isVisible = false;

  constructor() {
    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers() {
    // Capturar errores de JavaScript
    window.addEventListener('error', (event) => {
      const errorInfo = {
        message: event.message,
        file: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack
      };
      
      // Mejorar logging en consola
      console.group('🚨 ConnextJS Error Detected');
      console.error('Message:', errorInfo.message);
      if (errorInfo.file) {
        console.error('File:', `${errorInfo.file}:${errorInfo.line}:${errorInfo.column}`);
      }
      if (errorInfo.stack) {
        console.error('Stack Trace:', errorInfo.stack);
      }
      console.groupEnd();
      
      this.showError(errorInfo);
    });

    // Capturar promesas rechazadas
    window.addEventListener('unhandledrejection', (event) => {
      const errorInfo = {
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack
      };
      
      // Mejorar logging en consola
      console.group('🚨 ConnextJS Unhandled Promise Rejection');
      console.error('Reason:', event.reason);
      if (errorInfo.stack) {
        console.error('Stack Trace:', errorInfo.stack);
      }
      console.groupEnd();
      
      this.showError(errorInfo);
    });

    // Capturar errores de compilación de ConnextJS
    window.addEventListener('connext:compile-error', (event: any) => {
      const errorInfo = {
        message: event.detail.message,
        file: event.detail.file,
        line: event.detail.line,
        stack: event.detail.stack
      };
      
      // Mejorar logging en consola
      console.group('🚨 ConnextJS Compilation Error');
      console.error('Message:', errorInfo.message);
      if (errorInfo.file) {
        console.error('File:', `${errorInfo.file}:${errorInfo.line}`);
      }
      if (errorInfo.stack) {
        console.error('Stack Trace:', errorInfo.stack);
      }
      console.groupEnd();
      
      this.showError(errorInfo);
    });
  }

  public reportError(error: Error | string, context?: string) {
    const errorInfo: ErrorInfo = {
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'object' ? error.stack : undefined
    };

    // Logging mejorado en consola
    console.group(`🚨 ConnextJS Error${context ? ` (${context})` : ''}`);
    console.error('Message:', errorInfo.message);
    if (errorInfo.stack) {
      console.error('Stack Trace:', errorInfo.stack);
    }
    if (context) {
      console.error('Context:', context);
    }
    console.groupEnd();

    this.showError(errorInfo);
  }

  public showError(errorInfo: ErrorInfo) {
    if (this.isVisible) {
      this.hideError();
    }

    this.createOverlay(errorInfo);
    this.isVisible = true;
  }

  public hideError() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
    this.isVisible = false;
  }

  private createOverlay(errorInfo: ErrorInfo) {
    this.overlay = document.createElement('div');
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      color: #fff;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 14px;
      line-height: 1.5;
      z-index: 999999;
      padding: 20px;
      box-sizing: border-box;
      overflow: auto;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
      max-width: 800px;
      margin: 0 auto;
      background: #1a1a1a;
      border: 1px solid #ff6b6b;
      border-radius: 8px;
      padding: 20px;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #333;
    `;

    const title = document.createElement('h2');
    title.textContent = 'ConnextJS Error';
    title.style.cssText = `
      margin: 0;
      color: #ff6b6b;
      font-size: 18px;
    `;

    const closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    closeButton.style.cssText = `
      background: none;
      border: none;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 4px;
    `;
    closeButton.addEventListener('click', () => this.hideError());
    closeButton.addEventListener('mouseenter', () => {
      closeButton.style.background = '#333';
    });
    closeButton.addEventListener('mouseleave', () => {
      closeButton.style.background = 'none';
    });

    header.appendChild(title);
    header.appendChild(closeButton);

    const errorMessage = document.createElement('div');
    errorMessage.style.cssText = `
      background: #2a1f1f;
      border: 1px solid #ff6b6b;
      border-radius: 4px;
      padding: 15px;
      margin-bottom: 15px;
    `;
    errorMessage.textContent = errorInfo.message;

    const fileInfo = document.createElement('div');
    if (errorInfo.file) {
      fileInfo.style.cssText = `
        color: #ffd93d;
        margin-bottom: 15px;
        font-weight: bold;
      `;
      fileInfo.textContent = `File: ${errorInfo.file}${errorInfo.line ? `:${errorInfo.line}` : ''}${errorInfo.column ? `:${errorInfo.column}` : ''}`;
    }

    const stackTrace = document.createElement('pre');
    if (errorInfo.stack) {
      stackTrace.style.cssText = `
        background: #0f0f0f;
        border: 1px solid #333;
        border-radius: 4px;
        padding: 15px;
        overflow: auto;
        white-space: pre-wrap;
        color: #ccc;
        font-size: 12px;
      `;
      stackTrace.textContent = errorInfo.stack;
    }

    const instructions = document.createElement('div');
    instructions.style.cssText = `
      margin-top: 20px;
      padding: 15px;
      background: #1a2332;
      border: 1px solid #4a90e2;
      border-radius: 4px;
      color: #4a90e2;
    `;
    
    // Generar consejos específicos basados en el tipo de error
    let specificTips = '';
    const message = errorInfo.message.toLowerCase();
    
    if (message.includes('cannot find module') || message.includes('module not found')) {
      specificTips = `
        <strong>🔍 Error de módulo:</strong><br>
        • Verifica que el archivo o paquete exista<br>
        • Revisa la ruta de importación<br>
        • Ejecuta <code>pnpm install</code> si es un paquete externo<br>
      `;
    } else if (message.includes('unexpected token') || message.includes('syntax error')) {
      specificTips = `
        <strong>📝 Error de sintaxis:</strong><br>
        • Revisa paréntesis, llaves y corchetes<br>
        • Verifica comas y punto y comas<br>
        • Asegúrate de cerrar todas las etiquetas<br>
      `;
    } else if (message.includes('is not defined') || message.includes('undefined')) {
      specificTips = `
        <strong>🔧 Variable no definida:</strong><br>
        • Declara la variable antes de usarla<br>
        • Verifica el scope de la variable<br>
        • Revisa las importaciones necesarias<br>
      `;
    } else {
      specificTips = `
        <strong>💡 Consejos generales:</strong><br>
        • Revisa el archivo y línea indicados arriba<br>
        • Verifica la sintaxis y las variables utilizadas<br>
        • Asegúrate de que todas las importaciones sean correctas<br>
      `;
    }
    
    instructions.innerHTML = `
      ${specificTips}
      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #333; color: #888;">
        <strong>🎯 Acciones:</strong><br>
        • Presiona <kbd style="background: #333; padding: 2px 6px; border-radius: 3px;">Esc</kbd> o haz clic en ✕ para cerrar<br>
        • Revisa la consola del navegador para más detalles<br>
        • El error se mostrará automáticamente cuando se corrija
      </div>
    `;

    content.appendChild(header);
    content.appendChild(errorMessage);
    if (errorInfo.file) content.appendChild(fileInfo);
    if (errorInfo.stack) content.appendChild(stackTrace);
    content.appendChild(instructions);

    this.overlay.appendChild(content);
    document.body.appendChild(this.overlay);

    // Cerrar con Escape
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.hideError();
        document.removeEventListener('keydown', handleKeydown);
      }
    };
    document.addEventListener('keydown', handleKeydown);
  }


}

// Instancia global del manejador de errores
export const errorHandler = new ConnextErrorHandler();

// Función helper para reportar errores desde el compilador
export function reportCompileError(message: string, file: string, line?: number) {
  const event = new CustomEvent('connext:compile-error', {
    detail: { message, file, line }
  });
  window.dispatchEvent(event);
}