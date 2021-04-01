const fs = require('fs');
const http = require('http');
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
router.post('/api/wx/priceDic/', async function (ctx,next) {
  const r = http.request({
    host: 'www.tongchengby.vip',
    path: '/wx/getPriceDic',
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    }
  }, (res) => {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      ctx.body = data;
      next()
    });
  });
  r.write(JSON.stringify({ id: 1 }));
  r.end();
});

module.exports = router;