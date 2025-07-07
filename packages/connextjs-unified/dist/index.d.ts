export * from '@connextjs/runtime';
export * from '@connextjs/dev-server';
export * from '@connextjs/vite-plugin';
export * from '@connextjs/compiler';
export * from '@connextjs/error-handler';
export { ImageOptimizer, createImageOptimizer, imageOptimizerPlugin, type ImageOptimizerOptions } from './image-optimizer.js';
export { BuildOptimizer, type BuildOptimizerOptions } from './build-optimizer.js';
export declare function createBuildOptimizer(options?: any): any;
export declare function obfuscatorPlugin(options?: any): any;
export declare function createObfuscatedBuild(options?: any): Promise<void>;
export declare const ConnextJS: {
    version: string;
    name: string;
    description: string;
    createProject: (name: string, options?: any) => Promise<void>;
    optimizeImages: (inputDir: string, outputDir?: string, options?: any) => Promise<{
        totalOriginalSize: number;
        totalOptimizedSize: number;
        totalSavings: number;
        processedFiles: number;
    }>;
    buildOptimized: (options?: any) => Promise<void>;
};
export declare const presets: {
    development: {
        imageOptimizer: {
            quality: number;
            webp: boolean;
            formats: readonly ["jpeg", "png"];
        };
        buildOptimizer: {
            obfuscation: {
                enabled: boolean;
            };
            minification: {
                enabled: boolean;
                dropConsole: boolean;
            };
            sourceMaps: boolean;
        };
    };
    production: {
        imageOptimizer: {
            quality: number;
            webp: boolean;
            formats: readonly ["jpeg", "png", "webp"];
        };
        buildOptimizer: {
            obfuscation: {
                enabled: boolean;
                compact: boolean;
                controlFlowFlattening: boolean;
                deadCodeInjection: boolean;
                stringArray: boolean;
                rotateStringArray: boolean;
            };
            minification: {
                enabled: boolean;
                dropConsole: boolean;
                dropDebugger: boolean;
            };
            sourceMaps: boolean;
        };
    };
    aggressive: {
        imageOptimizer: {
            quality: number;
            webp: boolean;
            formats: readonly ["webp"];
        };
        buildOptimizer: {
            obfuscation: {
                enabled: boolean;
                compact: boolean;
                controlFlowFlattening: boolean;
                deadCodeInjection: boolean;
                stringArray: boolean;
                rotateStringArray: boolean;
                stringArrayThreshold: number;
                unicodeEscapeSequence: boolean;
            };
            minification: {
                enabled: boolean;
                dropConsole: boolean;
                dropDebugger: boolean;
                keepFnames: boolean;
            };
            sourceMaps: boolean;
        };
    };
};
export declare function connextPlugin(options?: {
    preset?: 'development' | 'production' | 'aggressive';
    imageOptimizer?: any;
    buildOptimizer?: any;
}): any[];
export declare function defineConnextConfig(userConfig?: any): any;
export default ConnextJS;
