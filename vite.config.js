import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";

const isCodeSandbox =
  "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;

export default {
  plugins: [react(), glsl()],
  root: "src/",
  publicDir: "../public/",
  base: "./",
  server: {
    host: true,
    open: !isCodeSandbox, // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      // Ajoutez vos règles de chargement ici
      // Assurez-vous de remplacer `zcv.wasm` par le modèle de fichier que vous souhaitez charger avec file-loader
      plugins: [
        {
          name: "adjust-vite-plugin-wasm-loader",
          config: () => ({
            // Règles de chargement spécifiques
            module: {
              rules: [
                {
                  test: /zcv\.wasm$/, // Modèle de fichier à charger
                  type: "javascript/auto",
                  loader: "file-loader",
                },
              ],
            },
          }),
        },
      ],
    },
  },
};
