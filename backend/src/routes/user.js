const router = require("express").Router();
const userController = require("../controllers/userController");

const isAuth = require("../middlewares/isAuth")

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/profile",isAuth,userController.getProfile);
router.put("/profile",isAuth,userController.updateName);
router.put("/password",isAuth,userController.updatePassword);
router.get("/credit-package",isAuth,userController.getCreditPurchases);
router.get("/courses",isAuth,userController.getCourseBookings);

module.exports = router;