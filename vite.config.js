// import path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   optimizeDeps: {
//     // Pre-bundling dependencies to avoid runtime issues
//     include: ["react", "react-dom"],
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: (id) => {
//           if (id.includes("node_modules")) {
//             if (id.includes("react")) {
//               return "react-vendor"; // Group React-related libraries
//             }
//             if (id.includes("lodash")) {
//               return "lodash-vendor"; // Group Lodash-related libraries
//             }
//             return "vendor"; // Group all other third-party libraries
//           }
//         },
//       },
//     },
//     chunkSizeWarningLimit: 2000, // Adjusted chunk size limit
//     sourcemap: true, // Enable source maps
//     commonjsOptions: {
//       transformMixedEsModules: true, // Handle mixed ES modules
//     },
//   },
// });

/* eslint-disable no-undef */
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});