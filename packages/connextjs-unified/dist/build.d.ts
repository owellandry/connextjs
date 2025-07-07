export { BuildOptimizer, createBuildOptimizer, obfuscatorPlugin, createObfuscatedBuild, type BuildOptimizerOptions } from './build-optimizer.js';
export declare const buildPresets: {
    development: {
        obfuscation: {
            enabled: boolean;
        };
        minification: {
            enabled: boolean;
            dropConsole: boolean;
            dropDebugger: boolean;
        };
        sourceMaps: boolean;
    };
    staging: {
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
    production: {
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
    secure: {
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
export declare function buildOptimized(preset?: keyof typeof buildPresets, customOptions?: any): Promise<import("./build-optimizer.js").BuildOptimizer>;
export declare function createBuildPlugin(preset?: keyof typeof buildPresets): any;
