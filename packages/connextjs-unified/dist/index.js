// Exportar todas las funcionalidades de ConnextJS
// Runtime y core
export * from '@connextjs/runtime';
export * from '@connextjs/dev-server';
export * from '@connextjs/vite-plugin';
export * from '@connextjs/compiler';
export * from '@connextjs/error-handler';
// Optimizadores de imagen
export { ImageOptimizer, createImageOptimizer, imageOptimizerPlugin } from './image-optimizer.js';
// Importar para uso interno
import { imageOptimizerPlugin } from './image-optimizer.js';
// Optimizadores de build
export { BuildOptimizer } from './build-optimizer.js';
// Función helper para crear optimizador de build
export function createBuildOptimizer(options) {
    const { BuildOptimizer } = require('./build-optimizer.js');
    return new BuildOptimizer(options);
}
// Plugin de ofuscación
export function obfuscatorPlugin(options) {
    const optimizer = createBuildOptimizer(options);
    return optimizer.createVitePlugin();
}
// Función para build ofuscado
export async function createObfuscatedBuild(options) {
    const { execSync } = await import('child_process');
    let command = 'connext build';
    if (options?.noObfuscate)
        command += ' --no-obfuscate';
    if (options?.sourcemap)
        command += ' --sourcemap';
    execSync(command, { stdio: 'inherit' });
}
// Utilidades y helpers
export const ConnextJS = {
    version: '0.1.0',
    name: 'ConnextJS Unified',
    description: 'Framework completo con optimizaciones automáticas',
    // Métodos de conveniencia
    createProject: async (name, options) => {
        const { execSync } = await import('child_process');
        let command = `npx create-connext-app ${name}`;
        if (options?.npm)
            command += ' --npm';
        if (options?.noInstall)
            command += ' --no-install';
        execSync(command, { stdio: 'inherit' });
    },
    optimizeImages: async (inputDir, outputDir, options) => {
        const { createImageOptimizer } = await import('./image-optimizer.js');
        const optimizer = createImageOptimizer(options);
        return optimizer.optimizeDirectory(inputDir, outputDir);
    },
    buildOptimized: async (options) => {
        const { execSync } = await import('child_process');
        let command = 'connext build';
        if (options?.noObfuscate)
            command += ' --no-obfuscate';
        if (options?.noOptimizeImages)
            command += ' --no-optimize-images';
        if (options?.sourcemap)
            command += ' --sourcemap';
        execSync(command, { stdio: 'inherit' });
    }
};
// Configuraciones predefinidas
export const presets = {
    // Preset para desarrollo
    development: {
        imageOptimizer: {
            quality: 90,
            webp: false,
            formats: ['jpeg', 'png']
        },
        buildOptimizer: {
            obfuscation: {
                enabled: false
            },
            minification: {
                enabled: false,
                dropConsole: false
            },
            sourceMaps: true
        }
    },
    // Preset para producción
    production: {
        imageOptimizer: {
            quality: 85,
            webp: true,
            formats: ['jpeg', 'png', 'webp']
        },
        buildOptimizer: {
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
        }
    },
    // Preset para máxima optimización
    aggressive: {
        imageOptimizer: {
            quality: 75,
            webp: true,
            formats: ['webp']
        },
        buildOptimizer: {
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
    }
};
// Plugin para Vite que combina todas las optimizaciones
export function connextPlugin(options) {
    const preset = options?.preset || 'production';
    const config = presets[preset];
    return [
        // Plugin de optimización de imágenes
        imageOptimizerPlugin({
            ...config.imageOptimizer,
            ...options?.imageOptimizer
        }),
        // Plugin de optimización de build
        obfuscatorPlugin({
            ...config.buildOptimizer,
            ...options?.buildOptimizer
        })
    ];
}
// Función helper para configuración rápida de Vite
export function defineConnextConfig(userConfig) {
    return {
        plugins: [
            ...connextPlugin(userConfig?.connext),
            ...(userConfig?.plugins || [])
        ],
        server: {
            port: 3000,
            host: 'localhost',
            open: true,
            ...userConfig?.server
        },
        build: {
            minify: 'terser',
            sourcemap: false,
            ...userConfig?.build
        },
        ...userConfig
    };
}
// Exportar como default también
export default ConnextJS;
