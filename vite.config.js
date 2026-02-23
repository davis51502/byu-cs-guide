import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Change `base` to match your GitHub repo name exactly.
// e.g. if your repo is github.com/jdoe/byu-cs-guide, set: base: '/byu-cs-guide/'
export default defineConfig({
  plugins: [react()],
  base: '/byu-cs-guide/',
})
