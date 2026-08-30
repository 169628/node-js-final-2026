const router = require("express").Router();
const creditPackageController = require("../controllers/creditPackageController");

const isAuth = require("../middlewares/isAuth")

router.get("/", creditPackageController.getCreditPackages);
router.post("/", creditPackageController.createCreditPackage);
router.post("/:creditPackageId", isAuth, creditPackageController.purchaseCreditPackage);
router.delete("/:creditPackageId", creditPackageController.deleteCreditPackage);

module.exports = router;
