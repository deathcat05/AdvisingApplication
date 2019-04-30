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


appRouter.post('/advisingSession/approve', AdvisingController.genericUpdatePassQuery.bind({
    query: `UPDATE AdvisingSession SET approved = true WHERE advisor_id = ? AND lookup_key = ?`,
    filler: ['advisor_id', 'lookup_key']
}))

appRouter.post('/advisingSession/book', AdvisingController.genericUpdatePassQuery.bind({
  query: `UPDATE AdvisingSession SET student_id = ?, booked = true WHERE  advisor_id = ? AND lookup_key = ?;`,
  filler: ['student_id', 'advisor_id', 'lookup_key']
}))

appRouter.put('/advisingSession/comments', AdvisingController.genericUpdatePassQuery.bind({
  query: `UPDATE AdvisingSession SET comments = ? where advisor_id = ? AND lookup_key = ?`,
  filler: ['comments', 'advisor_id', 'lookup_key']
}))

//add time heuristic later
appRouter.get('/advisingSession/pending/:id', AdvisingController.genericSelect.bind({
  query: `SELECT * from AdvisingSession WHERE student_id = ? and booked = true AND approved = false`,
  url_param: ['id']
}))



appRouter
  .post('/createBlock', CreateController.blockHandler)
  .post('/createAdvisor', CreateController.createAdvisor)
  .post('/createAdvisee', CreateController.createAdvisee)
  .post('/loginAdvisee', LoginController.loginAdvisee)
  .post('/loginAdvisor', LoginController.loginAdvisor)
  .get('/advisingSession/:advisor', AdvisingController.advisorSession)

module.exports = appRouter