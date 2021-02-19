const UserModel = require("../models/user.model");
const { promisePool } = require("../../config/mysql2.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
require("dotenv").config();

const login = async (req, res) => {
    const connection = await promisePool.getConnection();
    try {
        const email = req.body.email,
            password = req.body.password,
            userModel = new UserModel();

        let userResponse = await userModel.find({
            select: ["*"],
            where: { email },
            promisePool: connection,
        });

        if (userResponse.status !== 200)
            return res.status(400).send({
                message: "Not found!",
            });

        let isBcryptValid = await bcrypt.compare(
            password,
            userResponse.data.password
        );

        if (!isBcryptValid)
            return res.status(400).send({ message: "Not found!" });

        const accessToken = generateAccessToken({
            name: userResponse.data.email,
        });

        const refreshToken = generateRefreshToken({
            name: userResponse.data.email,
        });

        await userModel.update({
            values: { token: refreshToken },
            where: { id: userResponse.data.id },
            promisePool: connection,
        });

        let { data } = await userModel.find({
            select: [
                "id",
                "company_id",
                "email",
                "first_name",
                "last_name",
                "type",
            ],
            where: { id: userResponse.data.id },
            promisePool: connection,
        });

        data = {
            ...data,
            accessToken,
            refreshToken,
        };

        res.status(200).send({
            data,
            message: "Login successful.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error!" });
    } finally {
        console.log("Thread id: " + connection.threadId);
        connection.release();
    }
};

const logout = async (req, res) => {
    try {
        const id = req.body.id;
        const userModel = new UserModel();

        const refreshToken = generateRefreshToken({
            name: moment(),
        });

        await userModel.update({
            values: { token: refreshToken },
            where: { id },
            promisePool,
        });

        res.status(200).send({
            message: "Logout successful.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error!" });
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.token;
        if (!refreshToken) return res.sendStatus(401);
        const userModel = new UserModel();

        const userResponse = await userModel.find({
            where: { token: refreshToken },
            promisePool,
        });

        if (userResponse.status == 200) {
            jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET,
                (err, response) => {
                    if (!err) {
                        const accessToken = generateAccessToken({
                            name: userResponse.data.email,
                        });

                        res.status(200).send({
                            message: "Token refresh success.",
                            accessToken,
                        });
                    } else {
                        res.status(403).send("Forbidden");
                    }
                }
            );
        } else {
            res.status(403).send("Forbidden");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error!" });
    }
};

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m",
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET);
};

module.exports = {
    login,
    logout,
    refreshToken,
};
