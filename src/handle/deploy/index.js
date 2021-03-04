const fs = require('fs');
const path = require('path');
const Router = require('@koa/router');

const router = new Router();

const index = path.resolve(path.join('src', 'template', 'index.html'));
function write (html) {
  return new Promise((success) => {
    fs.writeFile(index, html, (err) => {
      const res = {
        success: true,
        data: null,
        message: '',
      };
      if (err) {
        res.success = false
        res.message = err
      }
      success(res)
    });
  });
}
router.post('/deploy', async function (ctx, next) {
  const { html = '' } = ctx.request.body;
  ctx.body = await write(html);
  ctx.status = 200
  next();
});

module.exports = router;