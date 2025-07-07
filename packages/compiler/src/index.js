"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = compile;
const promises_1 = __importDefault(require("node:fs/promises"));
const magic_string_1 = __importDefault(require("magic-string"));
/**
 * Compila un archivo .cnx ⇒ JS string (sin CSS ni reactividad aún)
 */
async function compile(file) {
    const code = await promises_1.default.readFile(file, "utf8");
    const s = new magic_string_1.default(code);
    // quita tags <script> y <template> muy naïf:
    const template = code.match(/<template>([\s\S]*?)<\/template>/)?.[1] ?? "";
    const script = code.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";
    // output trivial: exporta función render()
    const output = `
    ${script}
    export function render(target) {
      target.innerHTML = \`${template}\`;
    }
  `;
    return { code: output, map: s.generateMap({ hires: true }) };
}
