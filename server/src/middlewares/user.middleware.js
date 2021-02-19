const { checkSchema } = require("express-validator");
const { User } = require("../models/user.model");
const { promisePool } = require("../../config/mysql2.config");

const createUser = checkSchema({
    email: {
        in: ["body"],
        trim: true,
        normalizeEmail: true,
        toLowerCase: true,
        isEmail: {
            bail: true,
            errorMessage: "Invalid email address.",
        },
        custom: {
            options: async (value, { req, location, path }) => {
                let user = new User();
                let userData = await user.find({
                    select: ["email"],
                    where: {
                        email: value,
                    },
                    promisePool,
                });

                if (userData.data.status == 200) {
                    return Promise.reject();
                }
            },
            errorMessage: "Email address already in use.",
        },
    },
    password: {
        in: ["body"],
        isLength: {
            options: { min: 8 },
            errorMessage: "Password should be at least 8 characters long.",
        },
        isStrongPassword: {
            errorMessage: "Password is not strong.",
        },
        custom: {
            options: async (value, { req, location, path }) => {
                if (value !== req.body.confirm_password) {
                    return Promise.reject();
                }
            },
            errorMessage: "Password don't match.",
        },
    },
    first_name: {
        in: ["body"],
        trim: true,
        escape: true,
        notEmpty: {
            errorMessage: "First name is required.",
        },
    },
    last_name: {
        in: ["body"],
        trim: true,
        escape: true,
        notEmpty: {
            errorMessage: "Last name is required.",
        },
    },
    user_role_id: {
        in: ["body"],
        trim: true,
        isInt: true,
        toInt: true,
        notEmpty: {
            errorMessage: "User role is required.",
        },
    },
    type: {
        in: ["body"],
        trim: true,
        escape: true,
        notEmpty: {
            errorMessage: "User type is required.",
        },
    },
});

const updateUser = checkSchema({
    email: {
        in: ["body"],
        trim: true,
        normalizeEmail: true,
        toLowerCase: true,
        isEmail: {
            bail: true,
            errorMessage: "Invalid email address.",
        },
        custom: {
            options: async (value, { req, location, path }) => {
                let user = new User();
                let userData = await user.find({
                    select: ["email"],
                    where: {
                        email: value,
                    },
                    promisePool,
                });

                if (userData.data.status == 200) {
                    return Promise.reject();
                }
            },
            errorMessage: "Email address already in use.",
        },
    },
    password: {
        in: ["body"],
        optional: true,
        isLength: {
            options: { min: 8 },
            errorMessage: "Password should be at least 8 characters long.",
        },
        isStrongPassword: {
            errorMessage: "Password is not strong.",
        },
        custom: {
            options: async (value, { req, location, path }) => {
                if (value !== req.body.confirm_password) {
                    return Promise.reject();
                }
            },
            errorMessage: "Password don't match.",
        },
    },
    first_name: {
        in: ["body"],
        trim: true,
        escape: true,
        optional: true,
        notEmpty: {
            errorMessage: "First name is required.",
        },
    },
    last_name: {
        in: ["body"],
        trim: true,
        escape: true,
        notEmpty: {
            errorMessage: "Last name is required.",
        },
    },
    user_role_id: {
        in: ["body"],
        trim: true,
        isInt: true,
        toInt: true,
        escape: true,
        notEmpty: {
            errorMessage: "User role is required.",
        },
    },
    type: {
        in: ["body"],
        trim: true,
        escape: true,
        notEmpty: {
            errorMessage: "User type is required.",
        },
    },
});

const findUser = checkSchema({
    id: {
        in: ["params"],
        isInt: true,
        toInt: true,
        notEmpty: {
            errorMessage: "User id is required.",
        },
    },
});

module.exports = {
    createUser,
    updateUser,
    findUser,
};
