const BaseModel = require("./base.model");

const table = "assets";

const fillable = ["company_id", "name", "path", "created_by"];

const softDelete = true;

class Asset extends BaseModel {
    constructor() {
        super(table, fillable, softDelete);
    }
}

module.exports = Asset;
