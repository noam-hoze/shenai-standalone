import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
    server: { https: true },
    plugins: [
        react(),
        mkcert(),
        {
            name: "cross-origin-isolation",
            configureServer: (server) => {
                server.middlewares.use((req, res, next) => {
                    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
                    res.setHeader(
                        "Cross-Origin-Embedder-Policy",
                        "require-corp"
                    );
                    next();
                });
            },
        },
    ],
});
