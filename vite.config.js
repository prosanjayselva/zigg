// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base:"/zigg/"
// })


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   base: "/zigg/",
//   server: {
//     port: 5173,
//     strictPort: true
//   }
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react'; // or vue if using Vue

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: '../dist', // <-- output to root folder
//     emptyOutDir: true, // clean the folder before build
//   },
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'build'  // ⬅ THIS creates client/build/
  }
})





