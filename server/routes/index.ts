import { Express } from 'express';

const files = require.context('.', false, /\.js$/);
const modules = {};

files.keys().forEach((key) => {
  if (key === './index.js') return;
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default (app: Express) => {
  for (const key in modules) {
    app.use(`/${key}`, modules[key]);
  }
};
