import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';

function getHtmlEntries() {
  const entries = fs.readdirSync(__dirname, { withFileTypes: true });

  const htmlFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => entry.name);

  return htmlFiles.reduce((acc, fileName) => {
    const key = path.parse(fileName).name;
    acc[key] = path.resolve(__dirname, fileName);
    return acc;
  }, {});
}

async function copyDirectory(src, dest) {
  await fsp.mkdir(dest, { recursive: true });
  const entries = await fsp.readdir(src, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fsp.copyFile(srcPath, destPath);
    }
  }));
}

function copyPartialsPlugin() {
  const partialsDir = path.resolve(__dirname, 'partials');
  const distDir = path.resolve(__dirname, 'dist/partials');

  return {
    name: 'copy-partials-to-dist',
    apply: 'build',
    async closeBundle() {
      try {
        await copyDirectory(partialsDir, distDir);
      } catch (error) {
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }
    },
  };
}

export default defineConfig({
  root: '',
  base: './',
  build: {
    outDir: path.resolve(__dirname, './dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlEntries(),
    },
  },
  server: {
    cors: true,
    strictPort: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './assets/src'),
    },
  },
  plugins: [copyPartialsPlugin()],
});
