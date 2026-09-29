import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static assets from the compiled 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for all other routing requests to support client-side React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`PLEX server is running on port ${port}`);
  console.log(`Point your domain or IP address to http://localhost:${port}`);
});
