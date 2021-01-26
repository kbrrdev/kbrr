const authMiddleware = require("./auth.middleware");
const userMiddleware = require("./user.middleware");

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let newErrors = errors.array().map((error) => ({
            msg: error.msg,
            param: error.param,
            location: error.location,
        }));

        return res.status(400).send({ errors: newErrors, ok: false });
    } else {
        next();
    }
};

const pagination = [
    query("limit")
        .optional()
        .trim()
        .toInt()
        .isNumeric()
        .withMessage("Only accepts integer"),
    query("page")
        .optional()
        .trim()
        .toInt()
        .isNumeric()
        .withMessage("Only accepts integer"),
];

module.exports = {
    authMiddleware,
    userMiddleware,
    validate,
    pagination,
};