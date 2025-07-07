/**
 * Compila un archivo .cnx ⇒ JS string (sin CSS ni reactividad aún)
 */
export declare function compile(file: string): Promise<{
    code: string;
    map: import("magic-string").SourceMap;
}>;
