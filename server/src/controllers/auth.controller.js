const { UserModel } = require("../models");
const { promisePool } = require("../../config/mysql2.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        let user = await UserModel.findByUsername(username, promisePool);
        if (user.error) return res.sendStatus(500);

        if (user.length == 1) {
            user = user[0];

            if (await bcrypt.compare(password, user.password)) {
                const accessToken = generateAccessToken({ name: username });
                const refreshToken = generateRefreshToken({ name: username });

                res.status(200).send({
                    message: "Login successful",
                    accessToken,
                    refreshToken,
                });
            } else {
                res.sendStatus(400);
            }
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

exports.token = async (req, res) => {
    try {
        const refreshToken = req.body.token;
        if (!refreshToken) return res.sendStatus(401);

        const user = await UserModel.findByToken(refreshToken, promisePool);
        if (user.error) return res.sendStatus(500);

        if (user.length > 0) {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, _user) => {
                    if (err) return res.sendStatus(403);

                    user = user[0];
                    const accessToken = generateAccessToken({
                        name: user.username,
                    });

                    res.status(200).send({
                        accessToken,
                        refreshToken,
                        ok: true,
                    });
                }
            );
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
