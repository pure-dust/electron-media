export function routerResponse(option: ResponseMiddle = {}) {
  return async function (ctx: any, next: any) {
    ctx.success = function (data: any) {
      ctx.type = option.type || 'json';
      ctx.body = {
        code: option.successCode || 200,
        msg: option.successMsg || 'success',
        data: data,
      };
    };
    ctx.fail = function (msg: string, code: number) {
      ctx.type = option.type || 'json';
      ctx.body = {
        code: code || option.failCode || 400,
        msg: msg || option.errorMsg || 'fail',
      };
    };
    await next();
  };
}

interface ResponseMiddle {
  type?: string;
  successCode?: number;
  failCode?: number;
  successMsg?: string;
  errorMsg?: string;
}
