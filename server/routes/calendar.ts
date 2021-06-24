import express from 'express';
const router = express.Router();
import controller from '../controller';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json(controller.calendar.getDate(req.query));
});

export default router;
