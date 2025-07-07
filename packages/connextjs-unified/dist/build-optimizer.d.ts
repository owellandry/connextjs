import type { Plugin } from 'vite';
export interface BuildOptimizerOptions {
    obfuscation?: {
        enabled?: boolean;
        compact?: boolean;
        controlFlowFlattening?: boolean;
        deadCodeInjection?: boolean;
        stringArray?: boolean;
        rotateStringArray?: boolean;
        stringArrayThreshold?: number;
        unicodeEscapeSequence?: boolean;
    };
    minification?: {
        enabled?: boolean;
        dropConsole?: boolean;
        dropDebugger?: boolean;
        keepFnames?: boolean;
    };
    sourceMaps?: boolean;
}
export declare class BuildOptimizer {
    private options;
    constructor(options?: BuildOptimizerOptions);
    createVitePlugin(): Plugin;
    optimizeFile(inputPath: string, outputPath?: string): Promise<{
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
    private findJSFiles;
    private generateOutputPath;
    private formatBytes;
}
export declare function createBuildOptimizer(options?: BuildOptimizerOptions): BuildOptimizer;
export declare function obfuscatorPlugin(options?: BuildOptimizerOptions): Plugin<any>;
export declare function createObfuscatedBuild(projectDir: string): Promise<void>;
