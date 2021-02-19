const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

// router.route("/register/").get(authController.findRate);
router.route("/login/").post(authController.login);
router.route("/logout/").post(authController.logout);
router.route("/refresh-token/").post(authController.refreshToken);
// router.route("/forgot-password/").get(authController.findRate);
// router.route("/reset-password/").get(authController.findRate);

module.exports = router;
