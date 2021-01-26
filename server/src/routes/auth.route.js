module.exports = (app) => {
    const authController = require("../controllers/auth.controller.js");
    const { authMiddleware, validate } = require("../middleware");

    app.post(
        "/api/login",
        authMiddleware.login,
        validate,
        authController.login
    );
};
