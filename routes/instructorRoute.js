const router = require("express").Router();

const {
    getGradesForSpecificCourse,
    getMyCourses,
    getMyTasks,
    mySchedule
} = require("../controllers/instructorController");

const { auth, allowedTo } = require("../controllers/authController");

router.post("/courseGrades", auth, allowedTo("instructor"), getGradesForSpecificCourse);

router.get("/MyCourses", auth, allowedTo("instructor"), getMyCourses);

router.get("/MyTasks", auth, allowedTo("instructor"), getMyTasks);

router.get("/mySchedule", auth, allowedTo("instructor"), mySchedule);




module.exports = router;
