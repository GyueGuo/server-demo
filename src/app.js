const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
var cors = require('koa2-cors');
const routes = require('./handle/index.js')
const fs = require('fs');

// const router = new Router();

const index = path.resolve(path.join('src', 'template', 'index.html'));

function readFile (url) {
  return new Promise((success) => {
    const doc = fs.readFile(url, {encoding: 'utf8'}, (err, data) => {
      if (err) {
        success('')
        return
      }
      success(data)
    })
  })
}

// module.exports = router;
const port = 3002
// console.log(path.resolve("./static"))
new Koa()
  .use(cors())
  .use(serve("./static"))
  // .use(bodyParser())
  // .use(routes.routes())
  // .use(routes.allowedMethods())
  // .use(async (ctx, next) => {
  //   if (ctx.status === 404 && ctx.method === 'GET') {
  //     ctx.redirect('/')
  //   }
  //   next();
  // })
  .use(async function (ctx, next) {
    console.log(ctx.req.url);
    if (ctx.req.method.toLowerCase() === 'get' && !path.extname(ctx.req.url)) {
      const file = await readFile(index);
      ctx.status = 200;
      ctx.set('content-type', 'text/html')
      ctx.body = file.toString();
    }
    next();
  })
  .listen(port);