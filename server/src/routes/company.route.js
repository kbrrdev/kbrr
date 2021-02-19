const express = require("express");
const companyController = require("../controllers/company.controller");
const router = express.Router();
const formidable = require("formidable");

router.route("/").get(companyController.getCompanies);
router
    .route("/:id/")
    .get(companyController.findCompany)
    .put((req, res, next) => {
        const form = formidable({ multiples: true });

        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            res.json({ fields, files });
        });
    }, companyController.updateCompany);

module.exports = router;
