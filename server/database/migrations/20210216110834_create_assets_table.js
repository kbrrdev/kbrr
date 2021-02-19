exports.up = function (knex) {
    return knex.schema.createTable("assets", function (table) {
        table.increments();
        table.integer("company_id").unsigned();
        table.string("name");
        table.string("path");
        table.string("created_by");
        table.datetime("created_on");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("assets");
};
