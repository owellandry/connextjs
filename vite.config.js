import { defineConfig } from "vite";
import connext from "@connext/vite-plugin";

export default defineConfig({
  plugins: [connext()]
});
