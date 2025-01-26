const express = require("express");
const controller = require("../controller/controller");
const router = express.Router();


router.get("/", controller.redirectToLogin);
router.post("/login", controller.login);


router.get("/dashboard", controller.isAuthenticated, controller.dashboard);
router.get("/situationData", controller.getSituationData);

router.get("/getData/:type", controller.getData);
router.get("/getNames", controller.getNames);
router.get("/getSalesData", controller.getSalesData);
router.get("/getEvData", controller.getEvData); 
router.get("/getEvNameData", controller.getEvNameData); 
router.get("/getFactories", controller.getFactories);
router.get("/getProd", controller.getProd); 

module.exports = router;
