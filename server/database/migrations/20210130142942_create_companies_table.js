exports.up = function (knex) {
    return knex.schema.createTable("companies", function (table) {
        table.increments();
        table.string("name").notNullable();
        table.string("logo");
        table.string("trade_name");
        table.string("organization_type"); // private, government, non-profit
        table.string("country");
        table.string("province");
        table.string("city");
        table.string("address");
        table.string("zip_code");
        table.string("email");
        table.string("telephone");
        table.string("telephone_extension");
        table.string("fax");
        table.string("mobile");
        table.string("website");
        table.string("business_category"); // regular, household
        table.string("rdo");
        table.string("hdmf");
        table.string("tin");
        table.string("sss");
        table.string("philhealth");
        table.string("created_by");
        table.datetime("created_on");
        table.string("updated_by");
        table.datetime("updated_on");
        table.datetime("deleted_on");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("companies");
};
