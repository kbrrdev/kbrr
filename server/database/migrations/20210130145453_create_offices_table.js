exports.up = function (knex) {
    return knex.schema.createTable("offices", function (table) {
        table.increments();
        table.integer("company_id").unsigned();
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.string("created_by");
        table.datetime("created_on");
        table.string("updated_by");
        table.datetime("updated_on");
        table.string("deleted_by");
        table.datetime("deleted_on");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("offices");
};
