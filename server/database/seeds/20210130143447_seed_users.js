const moment = require("moment");
const bcrypt = require("bcrypt");

let password = "qweasd";

exports.seed = async function (knex) {
    let hashedPassword = await bcrypt.hash(password, 10);
    // Deletes ALL existing entries
    return knex("users")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("users").insert([
                {
                    id: 1,
                    email: "dev@kbrr.com",
                    password: hashedPassword,
                    first_name: "kbrr",
                    last_name: "dev",
                    user_role_id: 0,
                    type: "developer",
                    company_id: 1,
                    created_by: "system",
                    created_on: moment().format("YYYY-MM-DD HH:mm:ss"),
                },
            ]);
        });
};
