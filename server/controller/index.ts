const files = require.context('.', false, /\.js$/);
interface ControllerType {
  [key: string]: any;
}

const modules: ControllerType = {};

files.keys().forEach((key) => {
  if (key === './index.ts') return;
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default;
});

export default modules;
