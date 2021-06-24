const files = require.context('.', false, /\.js$/);
interface ServiceType {
  [key: string]: any;
}

const modules: ServiceType = {};

files.keys().forEach((key) => {
  if (key === './index.ts') return;
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default;
});

export default modules;
