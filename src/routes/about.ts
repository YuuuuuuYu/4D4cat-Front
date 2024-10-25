import express from 'express';
import path from 'path';
import fs from 'fs';
import { marked } from 'marked';

const router = express.Router();

router.get('/', (req, res) => {
  const markdownPath = path.resolve(__dirname, 'public/about.md');
  fs.readFile(markdownPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading about.md:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    const htmlContent = marked(data);
    res.render('about', { content: htmlContent });
  });
});

export default router;
