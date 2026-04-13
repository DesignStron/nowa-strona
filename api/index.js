import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
  // Handle API routes
  if (req.url.startsWith('/api/')) {
    res.status(404).json({ error: 'API endpoint not found' });
    return;
  }

  // Serve static files for all other routes
  const staticPath = path.resolve(__dirname, '..', 'dist', 'public');
  const indexPath = path.join(staticPath, 'index.html');
  
  // Check if index.html exists
  if (!fs.existsSync(indexPath)) {
    res.status(404).send('Application not built');
    return;
  }
  
  // Set proper headers
  res.setHeader('Content-Type', 'text/html');
  
  // Read and send index.html
  try {
    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    res.send(htmlContent);
  } catch (err) {
    res.status(500).send('Error serving the application');
  }
}
