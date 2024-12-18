import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // Thư mục đầu ra sau khi build
    rollupOptions: {
      input: {
        popup: 'popup/index.html' // Điểm đầu vào là tệp popup/index.html
      }
    }
  }
});
