const Authorize = require('../../../app/Authorize.js');
const Create = require('../../../app/Controllers/Create');

const CreateController = new Create();

const router = require('koa-router')({
    prefix: '/v1'
});

router
  .get('/', ctx => ctx.body = 'Hello Thomas')
  .post('/createBlock', CreateController.blockHandler)
  .post('/createAdvisor', CreateController.createAdvisor)
  .post('/createAdvisee', CreateController.createAdvisee)


module.exports = router
