const express = require("express");
const router = express.Router();
const routes = require("./routes");

// Attach route handlers
router.use("/", routes);

module.exports = router;
