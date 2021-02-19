const { query, validationResult, checkSchema } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let newErrors = errors.array().map((error) => ({
            msg: error.msg,
            param: error.param,
            location: error.location,
        }));

        return res.status(400).send({ errors: newErrors });
    } else {
        next();
    }
};

const paginationMiddleware = checkSchema({
    page_size: {
        optional: true,
        trim: true,
        isInt: {
            errorMessage: "Invalid page size.",
        },
    },
    page: {
        optional: true,
        trim: true,
        isInt: {
            errorMessage: "Invalid page.",
        },
    },
});

module.exports = {
    validate,
    paginationMiddleware,
};
