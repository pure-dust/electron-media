import Koa from 'koa';
import { green } from 'chalk';
import router from './routes/index';
const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());

// app.use(async (ctx) => {
//   ctx.body = 'hello koa2';
// });

app.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(green(`[electron:server] running on port ${process.env.SERVER_PORT || 500}`));
});
