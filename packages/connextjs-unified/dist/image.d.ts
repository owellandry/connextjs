export { ImageOptimizer, createImageOptimizer, imageOptimizerPlugin, type ImageOptimizerOptions } from './image-optimizer.js';
export declare const imagePresets: {
    web: {
        quality: number;
        webp: boolean;
        formats: readonly ["jpeg", "png", "webp"];
    };
    mobile: {
        quality: number;
        webp: boolean;
        formats: readonly ["webp"];
    };
    print: {
        quality: number;
        webp: boolean;
        formats: readonly ["jpeg", "png"];
    };
    thumbnail: {
        quality: number;
        webp: boolean;
        formats: readonly ["webp"];
    };
};
export declare function optimizeImages(inputDir: string, outputDir?: string, preset?: keyof typeof imagePresets): Promise<{
    totalOriginalSize: number;
    totalOptimizedSize: number;
    totalSavings: number;
    processedFiles: number;
}>;
