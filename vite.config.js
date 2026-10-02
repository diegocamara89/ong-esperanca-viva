import { defineConfig } from 'vite';

// Configuração de build de produção: minificação de JS/CSS, hash nos
// arquivos (cache de longa duração) e saída enxuta em /dist.
export default defineConfig({
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    assetsInlineLimit: 0,
    sourcemap: false,
    reportCompressedSize: true,
  },
});
