// Módulo específico para optimización de imágenes
export { ImageOptimizer, createImageOptimizer, imageOptimizerPlugin } from './image-optimizer.js';
// Configuraciones predefinidas para imágenes
export const imagePresets = {
    web: {
        quality: 85,
        webp: true,
        formats: ['jpeg', 'png', 'webp']
    },
    mobile: {
        quality: 75,
        webp: true,
        formats: ['webp']
    },
    print: {
        quality: 95,
        webp: false,
        formats: ['jpeg', 'png']
    },
    thumbnail: {
        quality: 70,
        webp: true,
        formats: ['webp']
    }
};
// Función helper para optimización rápida
export async function optimizeImages(inputDir, outputDir, preset = 'web') {
    const { createImageOptimizer } = await import('./image-optimizer.js');
    const presetConfig = { ...imagePresets[preset] };
    const optimizer = createImageOptimizer(presetConfig);
    return optimizer.optimizeDirectory(inputDir, outputDir);
}
