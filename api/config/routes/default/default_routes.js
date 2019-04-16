const Authorize = require('../../../app/Authorize.js');
const Create = require('../../../app/Controllers/Create');
const Login = require('../../../app/Controllers/Login')

const CreateController = new Create();
const LoginController = new Login();

const router = require('koa-router')({
    prefix: '/v1'
});

router
  .get('/', ctx => ctx.body = 'Hello Thomas')
  .post('/createBlock', CreateController.blockHandler)
  .post('/createAdvisor', CreateController.createAdvisor)
  .post('/createAdvisee', CreateController.createAdvisee)
  .post('/loginAdvisee', LoginController.loginAdvisee)
  .post('/loginAdvisor', LoginController.loginAdvisor)


module.exports = router
