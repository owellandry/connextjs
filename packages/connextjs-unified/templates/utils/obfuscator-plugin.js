// Plugin de ofuscación para Vite
import { createFilter } from '@rollup/pluginutils';
import { minify } from 'terser';

export function obfuscatorPlugin(options = {}) {
  const filter = createFilter(
    options.include || ['**/*.js', '**/*.ts'],
    options.exclude || ['node_modules/**']
  );

  return {
    name: 'obfuscator',
    apply: 'build',
    generateBundle: {
      order: 'post',
      async handler(opts, bundle) {
        if (!options.enabled) return;

        for (const [fileName, chunk] of Object.entries(bundle)) {
          if (chunk.type === 'chunk' && filter(fileName)) {
            try {
              const result = await minify(chunk.code, {
                compress: {
                  drop_console: options.dropConsole !== false,
                  drop_debugger: options.dropDebugger !== false,
                  pure_funcs: ['console.log', 'console.info', 'console.debug'],
                  ...options.compress
                },
                mangle: {
                  safari10: true,
                  ...options.mangle
                },
                format: {
                  comments: false,
                  ...options.format
                },
                ...options.terserOptions
              });

              if (result.code) {
                chunk.code = result.code;
              }
            } catch (error) {
              console.warn(`Error ofuscando ${fileName}:`, error);
            }
          }
        }
      }
    }
  };
}