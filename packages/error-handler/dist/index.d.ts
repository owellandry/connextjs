export interface ErrorInfo {
    message: string;
    file?: string;
    line?: number;
    column?: number;
    stack?: string;
}
export declare class ConnextErrorHandler {
    private overlay;
    private isVisible;
    constructor();
    private setupGlobalErrorHandlers;
    reportError(error: Error | string, context?: string): void;
    showError(errorInfo: ErrorInfo): void;
    hideError(): void;
    private createOverlay;
}
export declare const errorHandler: ConnextErrorHandler;
export declare function reportCompileError(message: string, file: string, line?: number): void;
