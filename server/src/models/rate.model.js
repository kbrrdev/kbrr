const BaseModel = require("./base.model");

const table = "rates";

const fillable = [
    "day_type",
    "holiday_type",
    "time_type",
    "abbreviation",
    "rate",
    "created_by",
    "updated_by",
];

const softDelete = true;

class Rate extends BaseModel {
    constructor() {
        super(table, fillable, softDelete);
    }
}

module.exports = Rate;
