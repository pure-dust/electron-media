import Router from 'koa-router';
const router = new Router();

const files = require.context('.', false, /\.ts$/);
interface RouterObj {
  [key: string]: Router;
}
const modules: RouterObj = {};

files.keys().forEach((key) => {
  if (key === './index.ts') return;
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default;
});

for (const key in modules) {
  router.use(`/${key}`, modules[key].routes(), modules[key].allowedMethods());
}

export default router;
