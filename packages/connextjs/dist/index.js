/**
 * ConnextJS - Framework completo para desarrollo web moderno
 *
 * Este paquete principal incluye todos los módulos de ConnextJS:
 * - Runtime: Sistema de ejecución principal
 * - Compiler: Compilador de archivos .cnx
 * - Error Handler: Sistema de manejo de errores
 * - Doom: Utilidad para estados reactivos
 * - Dev Server: Servidor de desarrollo
 * - Vite Plugin: Plugin para Vite
 */
// Re-exportar runtime (módulo principal)
export * from '@connextjs/runtime';
// Re-exportar compiler
export * from '@connextjs/compiler';
// Re-exportar error handler
export * from '@connextjs/error-handler';
// Re-exportar doom
export * from '@connextjs/doom';
// Re-exportar dev server
export * from '@connextjs/dev-server';
// Re-exportar vite plugin
export * from '@connextjs/vite-plugin';
// Exportar versión del framework
export const version = '0.0.1';
// Exportar información del framework
export const framework = {
    name: 'ConnextJS',
    version: '0.0.1',
    description: 'Framework completo para desarrollo web moderno'
};
// Exportar función de inicialización
export function createConnextApp(config) {
    console.log('🚀 Iniciando aplicación ConnextJS v' + version);
    return {
        framework,
        config
    };
}
// Export por defecto
export default {
    version,
    framework,
    createConnextApp
};
