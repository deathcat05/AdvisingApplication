const dbConnection = require('../../../database/mySQLconnect');
const Authorize = require('../../../app/Authorize.js');
const Create = require('../../../app/Controllers/Create');
const Login = require('../../../app/Controllers/Login')
const AdvController = require('../../../app/Controllers/AdvisingController.js')

const AdvisingController = new AdvController()

const CreateController = new Create();
const LoginController = new Login();

const appRouter = require('koa-router')({
    prefix: '/v1'
});

appRouter
  .post('/createBlock', CreateController.blockHandler)
  .post('/createAdvisor', CreateController.createAdvisor)
  .post('/createAdvisee', CreateController.createAdvisee)
  .post('/loginAdvisee', LoginController.loginAdvisee)
  .post('/loginAdvisor', LoginController.loginAdvisor)
  .get('/advisingSession/:advisor', AdvisingController.advisorSession)
  .post('/advisingSession/book', AdvisingController.book)

module.exports = appRouter