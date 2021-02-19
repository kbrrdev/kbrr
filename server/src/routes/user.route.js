const express = require("express");
const userController = require("../controllers/user.controller");
const {
    validate,
    paginationMiddleware,
} = require("../middlewares/utils.middleware");
const userMiddleware = require("../middlewares/user.middleware");

const router = express.Router();

router
    .route("/")
    .get(paginationMiddleware, validate, userController.getUsers)
    .post(userMiddleware.createUser, validate, userController.createUser);

router
    .route("/:id/")
    .get(userMiddleware.findUser, validate, userController.findUser)
    .put(userMiddleware.updateUser, validate, userController.updateUser);

module.exports = router;
