const { RateModel, PaginationModel } = require("../models");
const { promisePool } = require("../../config/mysql2.config");
const { connection } = require("../../config/db.config");

exports.find = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await RateModel.findById(id, promisePool);
        if (data.error) return res.status(500).send({ error: "Server error!" });

        if (data.length > 0) {
            res.status(200).send({ data });
        } else {
            res.status(202).send({ message: "No data found!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error!" });
    }
};

exports.get = async (req, res) => {
    const connection = await promisePool.getConnection();
    try {
        const orderBy = req.query.order_by;

        const result = await RateModel.get(
            new PaginationModel(req.query),
            orderBy,
            connection
        );

        res.status(result.status).send(result);
    } catch (error) {
        res.status(500).send({ error: "Server error!", status: 500 });
    } finally {
        console.log("Thread id: " + connection.threadId);
        await connection.release();
    }
};
