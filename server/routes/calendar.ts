import Router from 'koa-router';
const router = new Router();
import controller from '../controller';

/* GET home page. */
router.get('/getDate', async (ctx) => {
  ctx.body = await controller.calendar.getDate(ctx.query);
});

export default router;
