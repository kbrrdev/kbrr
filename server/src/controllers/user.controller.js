const UserModel = require("../models/user.model");
const { promisePool } = require("../../config/mysql2.config");
const bcrypt = require("bcrypt");

// Create and Save a new UserModel
const createUser = async (req, res) => {
    try {
        const userModel = new UserModel();

        let values = req.body;
        let hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;

        const data = await userModel.create({
            values,
            promisePool,
        });

        res.status(data.status).send({ message: "test" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Database error!" });
    }
};

const updateUser = async (req, res) => {
    try {
        const userModel = new UserModel();
        const id = req.params.id;
        const values = req.body;

        let data = userModel.update({ id, values, promisePool });
        res.status(204);
        if (password) {
            console.log("test");
        }
    } catch (error) {}
};

const findUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = new UserModel({});

        const data = await user.find({
            select: [
                "id",
                "email",
                "first_name",
                "last_name",
                "created_by",
                "created_on",
                "updated_by",
                "updated_on",
            ],
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

const getUsers = async (req, res) => {
    const connection = await promisePool.getConnection();
    try {
        const user = new UserModel();
        let pagination = req.query;
        let orderBy = orderByQueryToObject(req.query.order_by, user.fillable); // ?order_by=id-asc;order-desc

        const result = await user.get({
            select: [
                "id",
                "email",
                "first_name",
                "last_name",
                "created_by",
                "created_on",
                "updated_by",
                "updated_on",
            ],
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
    createUser,
    updateUser,
    findUser,
    getUsers,
};
