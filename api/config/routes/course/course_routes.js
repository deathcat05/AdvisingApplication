const Course           = require('../../../app/Controllers/CourseController.js')
const CourseController = new Course()

const courseRouter = require('koa-router')({
  prefix: '/courses'
})

courseRouter.get('/', CourseController.genericAll.bind({
  "db_table": "course_catalog",
  "extra": "limit 100"
}))

courseRouter.get('/:term/:department/:catalog', CourseController.genericUnion.bind({
  "db_table": "course_base",
  "union": ["cb.term", "cb.department", "cb.catalog"]
}))


courseRouter.get('/:term/:department', CourseController.genericUnion.bind({
  "db_table": "course_base",
  "union": ["cb.term", "cb.department"]
}))




module.exports = courseRouter

