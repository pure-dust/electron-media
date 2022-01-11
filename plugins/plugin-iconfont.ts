import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import http from '../src/request';

let iconList: string[] = [];
let mode;
let root = resolve(__dirname, '../src/render/assets/iconfont');

function createDir() {
  mkdirSync(root, {
    recursive: true,
  });
}

function downloadFile(url: string, path: string) {
  http
    .download('https:' + url)
    .then((res) => {
      writeFileSync(path, res.data as unknown as string);
    })
    .catch((err) => {
      console.log('err', err);
    });
}

export default function viteIconPlugin() {
  return {
    name: 'vite-iconfont-plugin',
    config(resolvedConfig, { command }) {
      iconList = Array.from(new Set(resolvedConfig.iconfont || []));
      mode = command;
      if (mode !== 'serve') {
        let entry = resolvedConfig.root + '\\main.ts';
        let content = readFileSync(entry).toString();
        createDir();
        iconList.forEach((path) => {
          let fileName = path.split('/').splice(-1)[0];
          let filePath = resolve(root, fileName);
          downloadFile(path, filePath);
          content = `import '@/assets/iconfont/${fileName}';\n` + content;
        });
        writeFileSync(entry, content);
      }
    },
    transformIndexHtml() {
      if (mode === 'serve') {
        return iconList.map((url) => ({
          tag: 'script',
          attrs: {
            src: url,
          },
        }));
      } else {
        return [];
      }
    },
  };
}
