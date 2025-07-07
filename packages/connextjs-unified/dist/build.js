// Módulo específico para optimización de build
export { BuildOptimizer, createBuildOptimizer, obfuscatorPlugin, createObfuscatedBuild } from './build-optimizer.js';
// Configuraciones predefinidas para build
export const buildPresets = {
    development: {
        obfuscation: {
            enabled: false
        },
        minification: {
            enabled: false,
            dropConsole: false,
            dropDebugger: false
        },
        sourceMaps: true
    },
    staging: {
        obfuscation: {
            enabled: true,
            compact: true,
            controlFlowFlattening: false,
            deadCodeInjection: false,
            stringArray: true,
            rotateStringArray: false
        },
        minification: {
            enabled: true,
            dropConsole: false,
            dropDebugger: true
        },
        sourceMaps: true
    },
    production: {
        obfuscation: {
            enabled: true,
            compact: true,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            stringArray: true,
            rotateStringArray: true
        },
        minification: {
            enabled: true,
            dropConsole: true,
            dropDebugger: true
        },
        sourceMaps: false
    },
    secure: {
        obfuscation: {
            enabled: true,
            compact: true,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            stringArray: true,
            rotateStringArray: true,
            stringArrayThreshold: 0.9,
            unicodeEscapeSequence: true
        },
        minification: {
            enabled: true,
            dropConsole: true,
            dropDebugger: true,
            keepFnames: false
        },
        sourceMaps: false
    }
};
// Función helper para build optimizado
export async function buildOptimized(preset = 'production', customOptions) {
    const { createBuildOptimizer } = await import('./build-optimizer.js');
    const config = { ...buildPresets[preset], ...customOptions };
    const optimizer = createBuildOptimizer(config);
    return optimizer;
}
// Plugin de Vite con preset
export function createBuildPlugin(preset = 'production') {
    const { obfuscatorPlugin } = require('./build-optimizer.js');
    return obfuscatorPlugin(buildPresets[preset]);
}
