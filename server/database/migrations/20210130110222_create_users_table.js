exports.up = function (knex) {
    return knex.schema.createTable("users", function (table) {
        table.increments();
        table.integer("company_id").unsigned();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.integer("user_role_id").unsigned();
        table.string("type").notNullable();
        table.string("created_by");
        table.datetime("created_on");
        table.string("updated_by");
        table.datetime("updated_on");
        table.string("deleted_by");
        table.datetime("deleted_on");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
