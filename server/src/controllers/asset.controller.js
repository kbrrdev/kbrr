const AssetModel = require("../models/asset.model");
const { promisePool } = require("../../config/mysql2.config");
const { orderByQueryToObject } = require("../helper");
const path = require("path");
const moment = require("moment");

const createAsset = async (req, res) => {
    try {
        const assetModel = new AssetModel();
        const file = req.files.file;
        const fileName = `${moment().unix()}-${file.name}`;
        const filePath = "/uploads/";
        let values = req.body,
            error;

        await file.mv(
            path.join(__dirname, `../../public${filePath}`, fileName),
            (err) => {
                error = err;
            }
        );

        if (error)
            return res.status(400).send({ message: "Error. try again later!" });

        values = Object.assign({}, values, { path: `${filePath}${fileName}` });

        const data = await assetModel.create({
            values,
            promisePool,
        });

        let status = data.status;
        delete data.status;

        res.status(status).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error!" });
    }
};

const getAssets = async (req, res) => {
    const connection = await promisePool.getConnection();
    try {
        const assetModel = new AssetModel();
        let pagination = req.query;
        let orderBy = orderByQueryToObject(req.query.order_by, asset.fillable); // ?order_by=id-asc;order-desc

        const result = await assetModel.get({
            select: ["*"],
            pagination,
            orderBy,
            promisePool: connection,
        });

        let status = result.status;
        delete result.status;

        res.status(status).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error!", status: 500 });
    } finally {
        console.log("Thread id: " + connection.threadId);
        connection.release();
    }
};

module.exports = {
    createAsset,
    getAssets,
};
