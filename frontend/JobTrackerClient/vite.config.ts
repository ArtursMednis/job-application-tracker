import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  build:{
    outDir: '../../backend/JobTracker/JobTracker.API/wwwroot',
    chunkSizeWarningLimit: 1024,
    emptyOutDir: true
  },
  plugins: [react()],
})
