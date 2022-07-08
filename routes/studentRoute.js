const router = require('express').Router()

const {getMySchedule} = require('../controllers/studentController')

const {auth, allowedTo} = require('../controllers/authController')

router.get('/MySchedule', auth, allowedTo('student'), getMySchedule)


module.exports = router