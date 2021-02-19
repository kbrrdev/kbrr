const Office = require("../models/office.model");
const { promisePool } = require("../../config/mysql2.config");
const { orderByQueryToObject } = require("../helper");

const findOffice = async (req, res) => {
    try {
        const id = req.params.id;

        let office = new Office({});

        const data = await office.find({
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

const getOffices = async (req, res) => {
    const connection = await promisePool.getConnection();
    try {
        let office = new Office();
        let pagination = req.query;
        let orderBy = orderByQueryToObject(req.query.order_by, office.fillable);
        // ?order_by=id-asc;order-desc
        let search = req.query.search;
        let whereLike = {};

        if (search) {
            whereLike = {
                name: `%${search}%`,
                description: `%${search}%`,
            };
        }

        const result = await office.get({
            select: ["*"],
            pagination,
            orderBy,
            whereLike,
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

const createOffice = async (req, res) => {
    try {
        let office = new Office();
        let values = req.body;

        const result = await office.create({ values, promisePool });

        let status = result.status;
        delete result.status;

        res.status(status).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error!", status: 500 });
    }
};

const updateOffice = async (req, res) => {
    try {
        let office = new Office();
        let values = req.body;
        let id = req.params.id;

        const result = await office.update({
            values,
            where: { id },
            promisePool,
        });

        let status = result.status;
        delete result.status;

        res.status(status).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error!", status: 500 });
    }
};

const deleteOffice = async (req, res) => {
    try {
        let office = new Office();
        let id = req.params.id;

        const result = await office.delete({
            where: { id },
            promisePool,
        });

        let status = result.status;
        delete result.status;

        res.status(status).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error!", status: 500 });
    }
};

module.exports = {
    findOffice,
    getOffices,
    createOffice,
    updateOffice,
    deleteOffice,
};
