const Router = require('@koa/router');

const deploy = require('./deploy/index');
const index = require('./index/index');

const router = new Router();

router
  .use(deploy.routes(), deploy.allowedMethods())
  .use(index.routes(), index.allowedMethods())

module.exports = router;