import Koa from 'koa';
import { green } from 'chalk';

import router from './routes/index';
import { routerResponse } from './middleWare';

const app = new Koa();

app.use(routerResponse());
app.use(router.routes());
app.use(router.allowedMethods());


app.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(green(`[electron:server] running on port ${process.env.SERVER_PORT || 500}`));
});
