module.exports = (app) => {
    const rateController = require("../controllers/rate.controller.js");

    app.get("/api/rates/:id/", rateController.find);
    app.get("/api/rates/", rateController.get);
};
