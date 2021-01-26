const { UserModel } = require("../models");
const pool = require("../../config/db.config");
const moment = require("moment");
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = async (req, res) => {
    try {
        const body = req.body;
        let hashedPassword = await bcrypt.hash(body.password, 10);

        let user = {
            username: body.username,
            password: hashedPassword,
            email: body.email,
            first_name: body.first_name,
            last_name: body.last_name,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        const createdUser = await UserModel.create(user, pool);

        if (!createdUser.error) {
            res.sendStatus(201);
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

// Retrieve all Users from the database.
exports.getAll = async (req, res) => {
    try {
        const users = await UserModel.getAll(pool);

        if (!users.error && users.length > 0) {
            res.status(200).send({ data: users });
        } else if (!users.error && users.length <= 0) {
            res.sendStatus(204);
        } else {
            res.sendStatus(500);
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
            user = await UserModel.findById(id, pool);
        } else if (email) {
            user = await UserModel.findByEmail(email, pool);
        }

        if (!user.error && user.length > 0) {
            res.status(200).send({ data: user });
        } else if (!user.error && user.length < 0) {
            res.sendStatus(204);
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

// Retrieve paginated of all Users from the database
exports.paginateAll = async (req, res) => {
    const connection = await pool.connection();

    try {
        const limit = req.query.limit ? req.query.limit : 25;
        const page = req.query.page ? req.query.page : 1;
        const offset = (page - 1) * limit;

        let queryReq = {
            limit: limit,
            page: page,
            offset: offset,
        };

        const users = await UserModel.pagination(queryReq, connection);

        if (!users.error) {
            if (users.data.length > 0) {
                if (users.pagination) {
                    res.status(200).send(users);
                } else {
                    res.status(206).send(users);
                }
            } else if (users.data.length <= 0) {
                res.sendStatus(204);
            }

            res.status(status).send(users);
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        res.sendStatus(500);
    } finally {
        await connection.release();
    }
};
