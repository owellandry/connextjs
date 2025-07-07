/**
 * Configuración por defecto de Vite para proyectos ConnextJS
 */
export declare function createConnextConfig(options?: {
    port?: number;
    host?: string;
    open?: boolean;
}): import("vite", { with: { "resolution-mode": "import" } }).UserConfig;
/**
 * Inicia el servidor de desarrollo de ConnextJS
 */
export declare function startDevServer(options?: {
    port?: number;
    host?: string;
    open?: boolean;
}): Promise<import("vite", { with: { "resolution-mode": "import" } }).ViteDevServer>;
/**
 * Configuración por defecto exportada
 */
declare const _default: import("vite", { with: { "resolution-mode": "import" } }).UserConfig;
export default _default;
