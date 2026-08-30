const router = require("express").Router();
const courseController = require("../controllers/courseController");

const isAuth = require("../middlewares/isAuth")
const isCoach = require("../middlewares/isCoach")


router.post("/",isAuth,isCoach,courseController.createCourse);
router.get("/",isAuth,isCoach,courseController.getCourses);
router.get("/:courseId",isAuth,courseController.getCourse);
router.put("/:courseId",isAuth,courseController.updateCourse);

module.exports = router;