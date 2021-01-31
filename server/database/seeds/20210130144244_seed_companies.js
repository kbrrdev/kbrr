const moment = require("moment");

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    return knex("companies")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("companies").insert([
                {
                    id: 1,
                    name: "development",
                    logo: "",
                    trade_name: "dev",
                    organization_type: "private",
                    country: "philippines",
                    province: "rizal",
                    city: "cainta",
                    address: "cheverton loop, filinvest east",
                    zipcode: "1900",
                    email: "kbrobles.dev@gmail.com",
                    telephone: "123-6548",
                    telephone_extension: "",
                    fax: "",
                    mobile: "09123456789",
                    website: "",
                    business_category: "regular",
                    rdo: "123",
                    hdmf: "123456789123",
                    tin: "123456789",
                    sss: "12123456789",
                    created_by: "system",
                    created_on: moment().format("YYYY-MM-DD HH:mm:ss"),
                },
            ]);
        });
};
