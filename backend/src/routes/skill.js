const router = require("express").Router();
const skillController = require("../controllers/skillController");

router.get("/", skillController.getSkills);
router.post("/", skillController.createSkill);
router.delete("/:skillId", skillController.deleteSkill);

module.exports = router;