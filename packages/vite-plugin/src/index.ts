import { compile } from "@connext/compiler";
import type { Plugin } from "vite";

export default function connext(): Plugin {
  return {
    name: "vite-plugin-connext",
    enforce: "pre" as const,
    async transform(code: string, id: string) {
      if (!id.endsWith(".cnx")) return;
      const { code: js, map } = await compile(id, code);
      return { code: js, map };
    }
  };
}
