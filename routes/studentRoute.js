const router = require('express').Router()

const {getMySchedule, addCourseToMyList, getMyCourses} = require('../controllers/studentController')

const {auth, allowedTo} = require('../controllers/authController')

router.get('/MySchedule', auth, allowedTo('student'), getMySchedule)

router.get('/MyCourses', auth, allowedTo('student'), getMyCourses)

router.post('/addMyCourse', auth, allowedTo('student'), addCourseToMyList)

module.exports = router