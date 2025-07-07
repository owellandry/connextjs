/**
 * Compila un archivo .cnx ⇒ JS string con soporte completo para CSS, eventos y reactividad
 */
export declare function compile(file: string, content?: string): Promise<{
    code: string;
    map: import("magic-string").SourceMap;
}>;
