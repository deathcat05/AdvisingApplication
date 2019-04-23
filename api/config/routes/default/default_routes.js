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

    const sql = `
      SELECT 
      a.first_name,
      a.last_name,
      a.email,
      a.lock_time,
      ab.session_length,
      ads.start_time,
      ads.approved,
      ads.booked,
      ads.lookup_key
      FROM Advisor a
      LEFT JOIN AdvisingBlock ab ON
        a.advisor_id = ab.advisor_id 
      LEFT JOIN AdvisingSession ads ON 
        ab.advisor_id = ads.advisor_id
      WHERE a.advisor_id = ? AND ads.start_time < NOW()
        ORDER BY ads.start_time ASC `;
    dbConnection.query({ sql, values: [ advisor ] }, (err, result) => {
      if (err) {
          console.log("err")
          console.log(err)
          return reject()
      }
      // console.log("result is")
      // console.log(result)
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

