const { UserModel } = require("../models");
const { promisePool } = require("../../config/mysql2.config");
const moment = require("moment");
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = async (req, res) => {
    try {
        const body = req.body;
        let hashedPassword = await bcrypt.hash(body.password, 10);
        req.body.password = hashedPassword;

        const createdUser = await UserModel.create(
            new UserModel(req.body),
            promisePool
        );
        if (createdUser.error)
            return res.status(500).send({ error: "Database error!" });

        res.status(201).send({ message: "User has been created." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Database error!" });
    }
};

exports.update = async (req, res) => {
    try {
        let user = new UserModel(req.body);
        const id = req.params.id;

        let data = UserModel.updateById(id, user, promisePool);

        if (password) {
        }
    } catch (error) {}
};

// Retrieve all Users from the database.
exports.getAll = async (req, res) => {
    try {
        const users = await UserModel.getAll(promisePool);
        if (users.error) return res.sendStatus(500);

        if (users.length > 0) {
            res.status(200).send({
                data: users,
                message: "Data fetch success.",
            });
        } else {
            res.status(204).send({ message: "No data found!" });
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

// Find a single User with a userId or userEmail
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const email = req.params.email;
        let user = {};

        if (id) {
            user = await UserModel.findWhere("id = ?", [id], promisePool);
        } else if (email) {
            user = await UserModel.findWhere("email = ?", [email], promisePool);
        }

        if (user.error) return res.sendStatus(500);

        if (user.length > 0) {
            res.status(200).send({ data: user });
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

// Retrieve paginated of all Users from the database
exports.paginateAll = async (req, res) => {
    const connection = await promisePool.connection();

    try {
        const limit = req.query.page_size ? req.query.page_size : 25;
        const page = req.query.page ? req.query.page : 1;
        const offset = (page - 1) * limit;

        let queryReq = {
            limit: limit,
            page: page,
            offset: offset,
        };

        const users = await UserModel.pagination(queryReq, connection);

        if (users.error) {
            await connection.release();
            return res.sendStatus(500);
        }

        if (users.data.length > 0) {
            if (users.pagination) {
                res.status(200).send(users);
            } else {
                res.status(206).send(users);
            }
        } else {
            res.status(204).send({ message: "No data found!" });
        }
    } catch (error) {
        res.sendStatus(500);
    } finally {
        await connection.release();
    }
};
