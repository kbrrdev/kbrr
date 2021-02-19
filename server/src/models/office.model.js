const BaseModel = require("./base.model");

const table = "offices";

const fillable = [
    "company_id",
    "name",
    "description",
    "created_by",
    "updated_by",
];

const softDelete = true;

class Office extends BaseModel {
    constructor() {
        super(table, fillable, softDelete);
    }
}

module.exports = Office;
