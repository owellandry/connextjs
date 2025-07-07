// Módulo específico para optimización de imágenes
export {
  ImageOptimizer,
  createImageOptimizer,
  imageOptimizerPlugin,
  type ImageOptimizerOptions
} from './image-optimizer.js';

// Configuraciones predefinidas para imágenes
export const imagePresets = {
  web: {
    quality: 85,
    webp: true,
    formats: ['jpeg', 'png', 'webp'] as const
  },
  
  mobile: {
    quality: 75,
    webp: true,
    formats: ['webp'] as const
  },
  
  print: {
    quality: 95,
    webp: false,
    formats: ['jpeg', 'png'] as const
  },
  
  thumbnail: {
    quality: 70,
    webp: true,
    formats: ['webp'] as const
  }
};

// Función helper para optimización rápida
export async function optimizeImages(
  inputDir: string, 
  outputDir?: string, 
  preset: keyof typeof imagePresets = 'web'
) {
  const { createImageOptimizer } = await import('./image-optimizer.js');
  const presetConfig = { ...imagePresets[preset] };
  const optimizer = createImageOptimizer(presetConfig);
  return optimizer.optimizeDirectory(inputDir, outputDir);
}