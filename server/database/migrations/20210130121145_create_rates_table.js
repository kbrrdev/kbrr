exports.up = function (knex) {
    return knex.schema.createTable("rates", function (table) {
        table.increments();
        table.string("day_type").notNullable();
        table.string("holiday_type").notNullable();
        table.string("time_type").notNullable();
        table.string("abbreviation").notNullable();
        table.decimal("rate", [13], [4]);
        table.string("created_by");
        table.datetime("created_on");
        table.string("updated_by");
        table.datetime("updated_on");
        table.datetime("deleted_on");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("rates");
};
