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

module.exports = router;
