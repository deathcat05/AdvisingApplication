const dbConnection = require('../../../database/mySQLconnect');
const Authorize = require('../../../app/Authorize.js');
const Create = require('../../../app/Controllers/Create');
const Login = require('../../../app/Controllers/Login')

const CreateController = new Create();
const LoginController = new Login();

const router = require('koa-router')({
    prefix: '/v1'
});

function foo(ctx) {
  return new Promise((resolve, reject) => {

    let { advisor } = ctx.params 
    console.log(`Advisor: ${advisor}`)
    // console.log(ctx.params)
    //return resolve();
    // const sql = `
    //   SELECT * FROM AdvisingSession
    //   WHERE advisor_id = ?
    //   LIMIT 100`
    console.log("starting")
    const sql = `
      SELECT * from AdvisingSession 
      WHERE advisor_id = ?`;
    dbConnection.query({ sql, values: [ advisor ] }, (err, result) => {
      console.log("inside")
      if (err) {
          console.log("err")
          console.log(err)
          return reject()
      }
      ctx.body = result;
      return resolve()
    })
  });
}

router
  .get('/', ctx => ctx.body = 'Hello Thomas')
  .post('/createBlock', CreateController.blockHandler)
  .post('/createAdvisor', CreateController.createAdvisor)
  .post('/createAdvisee', CreateController.createAdvisee)
  .post('/loginAdvisee', LoginController.loginAdvisee)
  .post('/loginAdvisor', LoginController.loginAdvisor)
  .get('/advisingSession/:advisor', foo)


module.exports = router
