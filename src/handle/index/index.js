const fs = require('fs');
const path = require('path');
const Router = require('@koa/router');

const router = new Router();

const index = path.resolve(path.join('src', 'template', 'index.html'));

function readFile (url) {
  return new Promise((success) => {
    const doc = fs.readFile(url, (err, data) => {
      if (err) {
        success('')
        return
      }
      success(data)
    })
  })
}
router.get('/', async function (ctx, next) {
  const file = await readFile(index);
  ctx.status = 200;
  ctx.set('content-type', 'text/html')
  ctx.body = file
  next();
});

module.exports = router;