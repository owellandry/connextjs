import type { Plugin } from 'vite';
export interface ImageOptimizerOptions {
    quality?: number;
    progressive?: boolean;
    webp?: boolean;
    outputDir?: string;
    formats?: readonly ('jpeg' | 'png' | 'webp')[];
}
export declare class ImageOptimizer {
    private options;
    constructor(options?: ImageOptimizerOptions);
    optimizeImage(inputPath: string, outputPath?: string): Promise<{
        originalSize: number;
        optimizedSize: number;
        savings: number;
        outputPath: string;
    }>;
    optimizeDirectory(inputDir: string, outputDir?: string): Promise<{
        totalOriginalSize: number;
        totalOptimizedSize: number;
        totalSavings: number;
        processedFiles: number;
    }>;
    private findImageFiles;
    private generateOutputPath;
    private changeExtension;
    private formatBytes;
    createVitePlugin(): Plugin;
}
export declare function createImageOptimizer(options?: ImageOptimizerOptions): ImageOptimizer;
export declare function imageOptimizerPlugin(options?: ImageOptimizerOptions): Plugin;
