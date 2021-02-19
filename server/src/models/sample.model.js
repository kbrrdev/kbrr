const BaseModel = require("./base.model");

const table = "sample";

const fillable = ["name", "first_name", "last_name"];

const softDelete = true;

class Sample extends BaseModel {
    constructor() {
        super(table, fillable, softDelete);
    }
}

module.exports = Sample;
