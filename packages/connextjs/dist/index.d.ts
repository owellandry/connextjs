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
export * from '@connextjs/runtime';
export * from '@connextjs/compiler';
export * from '@connextjs/error-handler';
export * from '@connextjs/doom';
export * from '@connextjs/dev-server';
export * from '@connextjs/vite-plugin';
export declare const version = "0.0.1";
export declare const framework: {
    name: string;
    version: string;
    description: string;
};
export declare function createConnextApp(config?: any): {
    framework: {
        name: string;
        version: string;
        description: string;
    };
    config: any;
};
declare const _default: {
    version: string;
    framework: {
        name: string;
        version: string;
        description: string;
    };
    createConnextApp: typeof createConnextApp;
};
export default _default;
