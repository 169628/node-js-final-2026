const router = require("express").Router();
const adminController = require("../controllers/adminController");

const isAuth = require("../middlewares/isAuth")
const isCoach = require("../middlewares/isCoach")

router.post("/:userId", adminController.updateRole);
router.get("/",isAuth,isCoach,adminController.getProfile);
router.put("/",isAuth,isCoach,adminController.updateProfile);

module.exports = router;