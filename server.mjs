import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to set COOP and COEP headers
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Serve the main index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve SDK folder statically
app.use(
  '/sdk',
  express.static(path.join(__dirname, 'sdk'), {
    setHeaders: (res, filePath) => {
      // These headers are required for SharedArrayBuffer to work.
      res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');

      if (filePath.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      if (filePath.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm');
      }
    },
  }),
);

// Optional: catch-all 404
app.use((req, res) => {
  res.status(404).send('Not found');
});

// Load the trusted certificate
const options = {
  key: fs.readFileSync(path.join(__dirname, '..', 'certs', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '..', 'certs', 'cert.pem')),
};

// Create HTTPS server
https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at https://localhost:${PORT}`);
  console.log(`Access on local network: https://<your-ip-address>:${PORT}`);
});
