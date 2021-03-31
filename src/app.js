const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
var cors = require('koa2-cors');
const routes = require('./handle/index.js')

const port = 3002
new Koa()
  .use(cors())
  .use(serve("./static"))
  // .use(bodyParser())
  .use(routes.routes())
  .use(routes.allowedMethods())
  // .use(async function (ctx, next) {
  //   if (ctx.req.method.toLowerCase() === 'get' && !path.extname(ctx.req.url)) {
  //     const file = await readFile(index);
  //     ctx.status = 200;
  //     ctx.set('content-type', 'text/html')
  //     ctx.body = file.toString();
  //   }
  //   next();
  // })
  .listen(port);