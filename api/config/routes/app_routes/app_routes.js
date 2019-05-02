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


// Approve Appointment 
appRouter.post('/advisingSession/approve', AdvisingController.genericUpdatePassQuery.bind({
    query: `UPDATE AdvisingSession SET approved = true WHERE advisor_id = ? AND lookup_key = ?`,
    filler: ['advisor_id', 'lookup_key']
}))

// Book Appointment
appRouter.post('/advisingSession/book', AdvisingController.genericUpdatePassQuery.bind({
  query: `UPDATE AdvisingSession SET student_id = ?, booked = true WHERE  advisor_id = ? AND lookup_key = ?;`,
  filler: ['student_id', 'advisor_id', 'lookup_key']
}))

// Leave Comment
appRouter.put('/advisingSession/comments', AdvisingController.genericUpdatePassQuery.bind({
  query: `UPDATE AdvisingSession SET comments = ? where advisor_id = ? AND lookup_key = ?`,
  filler: ['comments', 'advisor_id', 'lookup_key']
}))



//add time heuristic later
appRouter.get('/advisingSession/pending/:id', AdvisingController.genericSelect.bind({
  query: `SELECT * from AdvisingSession WHERE student_id = ? and booked = true AND approved = false`,
  url_param: ['id']
}))

appRouter.get('/foo/:id', AdvisingController.genericSelect.bind({
  query: `SELECT * from Advisor WHERE advisor_id = ?`,
  url_param: ['id']
}))

//upcoming that have been approved
appRouter.get('/advisingSession/upcoming/:id', AdvisingController.genericSelect.bind({
  query: `SELECT * from AdvisingSession WHERE advisor_id = ? and booked = true AND approved = true AND start_time > NOW()`,
  url_param: ['id']
}))

//past that have been approved
appRouter.get('/advisingSession/past/:id', AdvisingController.genericSelect.bind({
  query: `SELECT * from AdvisingSession WHERE advisor_id = ? and booked = true AND approved = true AND start_time < NOW()`,
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