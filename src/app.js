const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routes = require('./handle/index.js')

const port = 3002
new Koa()
  .use(bodyParser())
  .use(routes.routes())
  .use(routes.allowedMethods())
  .use(async (ctx, next) => {
    if (ctx.status === 404 && ctx.method === 'GET') {
      ctx.redirect('/')
    }
    next();
  })
  .listen(port);