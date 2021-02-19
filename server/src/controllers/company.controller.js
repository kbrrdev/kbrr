const CompanyModel = require("../models/company.model");
const { promisePool } = require("../../config/mysql2.config");
const { orderByQueryToObject } = require("../helper");
const formidable = require("formidable");

const findCompany = async (req, res) => {
    try {
        const id = req.params.id;

        const companyModel = new CompanyModel();

        const data = await companyModel.find({
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

const getCompanies = async (req, res) => {
    const connection = await promisePool.getConnection();
    try {
        const companyModel = new CompanyModel();
        let pagination = req.query;
        let orderBy = orderByQueryToObject(
            req.query.order_by,
            company.fillable
        ); // ?order_by=id-asc;order-desc

        const result = await companyModel.get({
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

const updateCompany = async (req, res) => {
    try {
        let companyModel = new CompanyModel();
        let values = req.body;
        let id = req.params.id;

        const result = await companyModel.update({
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

module.exports = {
    findCompany,
    getCompanies,
    updateCompany,
};
