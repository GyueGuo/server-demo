const fs = require('fs');
const path = require('path');
const Router = require('@koa/router');

const router = new Router();

const basePath = path.resolve(path.join('src', 'template', '$$.html'));

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
router.get('/record-list', async function (ctx, next) {
  const file = await readFile(basePath.replace(/[$]{2}/, 'record-list'));
  ctx.status = 200;
  ctx.set('content-type', 'text/html')
  ctx.body = file.toString();
  next();
}).get('/record-detail', async function (ctx, next) {
  const file = await readFile(basePath.replace(/[$]{2}/, 'record-detail'));
  ctx.status = 200;
  ctx.set('content-type', 'text/html')
  ctx.body = file.toString();
  next();
}).get('/error', async function (ctx, next) {
  const file = await readFile(basePath.replace(/[$]{2}/, 'error'));
  ctx.status = 200;
  ctx.set('content-type', 'text/html')
  ctx.body = file.toString();
  next();
}).get('/agreement', async function (ctx, next) {
  const file = await readFile(basePath.replace(/[$]{2}/, 'agreement'));
  ctx.status = 200;
  ctx.set('content-type', 'text/html')
  ctx.body = file.toString();
  next();
}).get('/pay', async function (ctx, next) {
  const file = await readFile(basePath.replace(/[$]{2}/, 'pay'));
  ctx.status = 200;
  ctx.set('content-type', 'text/html')
  ctx.body = file.toString();
  next();
}).get('/video', async function (ctx, next) {
  const file = await readFile(basePath.replace(/[$]{2}/, 'video'));
  ctx.status = 200;
  ctx.set('content-type', 'text/html')
  ctx.body = file.toString();
  next();
}).get('/', async function (ctx, next) {
  if (ctx.req.url === '/') {
    const file = await readFile(basePath.replace(/[$]{2}/, 'index'));
    ctx.status = 200;
    ctx.set('content-type', 'text/html')
    ctx.body = file.toString();
  }
  next();
});
module.exports = router;