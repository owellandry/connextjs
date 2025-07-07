import { defineConfig } from 'vite';
import { obfuscatorPlugin } from 'connextjs/build';
import { imageOptimizerPlugin } from 'connextjs/image';

export default defineConfig({
  plugins: [
    // Ofuscación automática en build
    obfuscatorPlugin({
      obfuscation: {
        enabled: true,
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        stringArray: true,
        rotateStringArray: true
      },
      minification: {
        enabled: true,
        dropConsole: true,
        dropDebugger: true
      }
    }),
    // Optimización automática de imágenes
    imageOptimizerPlugin({
      quality: 85,
      webp: true
    })
  ],
  server: {
    port: 3000,
    host: 'localhost',
    open: true
  },
  build: {
    minify: 'terser',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    }
  }
});