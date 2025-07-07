"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connext;
const compiler_1 = require("@connext/compiler");
function connext() {
    return {
        name: "vite-plugin-connext",
        enforce: "pre",
        async transform(code, id) {
            if (!id.endsWith(".cnx"))
                return;
            const { code: js, map } = await (0, compiler_1.compile)(id, code);
            return { code: js, map };
        }
    };
}
