const router = require("express").Router();
const courseController = require("../controllers/courseController");

const isAuth = require("../middlewares/isAuth")

router.get("/", courseController.getOpeningCourses);
router.post("/:courseId", isAuth, courseController.createBooking);
router.delete("/:courseId", isAuth, courseController.deleteBooking);

module.exports = router;
