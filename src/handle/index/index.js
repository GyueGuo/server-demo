const fs = require('fs');
const path = require('path');
const Router = require('@koa/router');

const router = new Router();

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
router.get('/', async function (ctx, next) {
  console.log(ctx.req.url);
  if (!path.extname(ctx.req.url)) {
    const file = await readFile(index);
    ctx.status = 200;
    ctx.set('content-type', 'text/html')
    ctx.body = file.toString();
  }
  next();
});

module.exports = router;