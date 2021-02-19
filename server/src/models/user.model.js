const BaseModel = require("./base.model");

const table = "users";

const fillable = [
    "email",
    "password",
    "first_name",
    "last_name",
    "user_role_id",
    "type",
    "token",
    "company_id",
    "created_by",
    "updated_by",
];

const softDelete = true;

class User extends BaseModel {
    constructor() {
        super(table, fillable, softDelete);
    }
}

module.exports = User;
