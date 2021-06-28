"use strict";
exports.__esModule = true;
var koa_1 = require("koa");
var chalk_1 = require("chalk");
var index_1 = require("./routes/index");
var middleWare_1 = require("./middleWare");
var app = new koa_1["default"]();
app.use(middleWare_1.routerResponse());
app.use(index_1["default"].routes());
app.use(index_1["default"].allowedMethods());
// app.use(async (ctx) => {
//   ctx.body = 'hello koa2';
// });
app.listen(process.env.SERVER_PORT || 5000, function () {
    console.log(chalk_1.green("[electron:server] running on port " + (process.env.SERVER_PORT || 500)));
});
