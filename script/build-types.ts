import generateTypes from '../plugins/plugin-dts';

generateTypes({
  root: 'src/render/components',
  config: './tsconfig.json',
  outDir: './types-components',
}).then((r) => {});

generateTypes({
  root: 'src/render/utils',
  config: './tsconfig.json',
  outDir: './types-utils',
}).then((r) => {});
