const express = require("express");
const assetController = require("../controllers/asset.controller");
const router = express.Router();

router
    .route("/")
    .post(assetController.createAsset)
    .get(assetController.getAssets);

module.exports = router;
