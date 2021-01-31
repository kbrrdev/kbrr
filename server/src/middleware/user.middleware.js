const { body } = require("express-validator");
const User = require("../models/user.model.js");
const { promisePool } = require("../../config/mysql2.config");

exports.create = [
    body("username")
        .trim()
        .isLength({ min: 5, max: 50 })
        .withMessage("Username should be at least 5 to 50 chars long.")
        .isAlphanumeric()
        .withMessage("Username only accepts alphanumeric characters")
        .custom(async (value) => {
            user = await User.findByUsername(value, promisePool);

            if (!user.error && user.data.length > 0) {
                return Promise.reject();
            }
        })
        .withMessage("Username already in use."),
    body("password")
        .trim()
        .isLength({ min: 8, max: 50 })
        .withMessage("Password should be at least 8 to 50 chars long.")
        .isStrongPassword()
        .withMessage(
            "Password should contain at least 1 uppercase, 1 lowercase, 1 numeric, and 1 special character."
        ),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required!")
        .normalizeEmail()
        .toLowerCase()
        .custom(async (value) => {
            user = await User.findByEmail(value, promisePool);

            if (!user.error && user.data.length > 0) {
                return Promise.reject();
            }
        })
        .withMessage("Email already in use."),
    body("first_name").trim().notEmpty().withMessage("First name is required!"),
    body("last_name").trim().notEmpty().withMessage("Last name is required!"),
];
