"use strict";
exports.__esModule = true;
var koa_router_1 = require("koa-router");
var router = new koa_router_1["default"]();
var files = require.context('.', false, /\.ts$/);
var modules = {};
files.keys().forEach(function (key) {
    if (key === './index.ts')
        return;
    modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key)["default"];
});
for (var key in modules) {
    router.use("/" + key, modules[key].routes(), modules[key].allowedMethods());
}
exports["default"] = router;
