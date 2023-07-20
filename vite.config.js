import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import webfontDownload from 'vite-plugin-webfont-dl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    webfontDownload()
  ],
  // Add this after installing `autoprefixer` and `postcss`
  // css: {
  //   postcss: {
  //     plugins: [autoprefixer],
  //   },
  // },
})
