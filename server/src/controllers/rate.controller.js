const RateModel = require("../models/rate.model");
const { promisePool } = require("../../config/mysql2.config");
const { orderByQueryToObject } = require("../helper");

const findRate = async (req, res) => {
    try {
        const id = req.params.id;

        let rateModel = new RateModel();

        const data = await rateModel.find({
            select: ["*"],
            where: { id },
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

const getRates = async (req, res) => {
    const connection = await promisePool.getConnection();
    try {
        let rateModel = new RateModel();
        let pagination = req.query;

        const result = await rateModel.get({
            select: ["*"],
            pagination,
            orderBy: { id: "asc" },
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
    findRate,
    getRates,
};
