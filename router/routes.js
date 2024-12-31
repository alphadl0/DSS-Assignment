const express = require("express");
const controller = require("../controller/controller");
const router = express.Router();

// Public routes
router.get("/", controller.redirectToLogin);
router.post("/login", controller.login);

// Protected routes
router.get("/dashboard", controller.isAuthenticated, controller.dashboard);
router.get("/getData/:type", controller.getData);

router.get("/situationData", controller.getSituationData);
router.get("/getNames", controller.getNames); // Fetch distinct names for dropdown
router.get("/getSalesData", controller.getSalesData); // Fetch sales data for selected name
router.get("/getEvData", controller.getEvData); // Fetch EV data for selected name
router.get("/getEvNameData", controller.getEvNameData); // Fetch EV data for selected name")
router.get("/getFactories", controller.getFactories); // Fetch factory data for selected name
router.get("/getProd", controller.getProd); // Fetch production data for selected name

module.exports = router;
