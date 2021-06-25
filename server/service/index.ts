const files = require.context('.', false, /\.ts$/);

interface ServiceItem {
  [key: string]: Function;
}

interface Service {
  [key: string]: ServiceItem;
}

const modules: Service = {};

files.keys().forEach((key) => {
  if (key === './index.ts') return;
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default;
});

export default modules;
