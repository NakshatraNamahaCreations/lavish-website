import { defineConfig, splitVendorChunkPlugin  } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
   build: {
    sourcemap: false,
    cssCodeSplit: true,
    minify: "esbuild",
  },
})
