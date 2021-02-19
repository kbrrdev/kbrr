const express = require("express");
const officeController = require("../controllers/office.controller");
const router = express.Router();

router
    .route("/")
    .get(officeController.getOffices)
    .post(officeController.createOffice);

router
    .route("/:id/")
    .get(officeController.findOffice)
    .put(officeController.updateOffice)
    .delete(officeController.deleteOffice);

module.exports = router;
