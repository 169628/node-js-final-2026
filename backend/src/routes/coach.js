const router = require("express").Router();
const coachController = require("../controllers/coachController");

router.get("/", coachController.getCoaches);
router.get("/:coachId/courses", coachController.getCoachCourses);
router.get("/:coachId", coachController.getCoach);

module.exports = router;
