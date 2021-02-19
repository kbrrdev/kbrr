const express = require("express");
const rateController = require("../controllers/rate.controller");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth.middleware");

router.route("/").get(authenticateToken, rateController.getRates);
router.route("/:id/").get(rateController.findRate);

module.exports = router;
