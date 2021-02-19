const BaseModel = require("./base.model");

const table = "companies";

const fillable = [
    "name",
    "logo",
    "trade_name",
    "organization_type",
    "country",
    "province",
    "city",
    "address",
    "zipcode",
    "email",
    "telephone",
    "telephone_extension",
    "fax",
    "mobile",
    "website",
    "business_category",
    "rdo",
    "hdmf",
    "tin",
    "sss",
    "created_by",
    "updated_by",
];

const softDelete = true;

class Company extends BaseModel {
    constructor() {
        super(table, fillable, softDelete);
    }
}

module.exports = Company;
