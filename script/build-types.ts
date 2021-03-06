import generateTypes from '../plugins/plugin-dts';

generateTypes({
  root: 'src/render/components',
  config: './tsconfig.json',
  outDir: './types-components',
  type: ['vue'],
  suffix: 'src/render/components',
}).then((r) => {});

// generateTypes({
//   root: 'src/render/utils',
//   config: './tsconfig.json',
//   outDir: './types-utils',
//   type: ['ts']
// }).then((r) => {});
