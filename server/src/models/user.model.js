const BaseModel = require("./base.model");

const table = "users";

const select = [
    "email",
    "first_name",
    "last_name",
    "user_rold_id",
    "type",
    "company_id",
    "created_by",
    "created_on",
    "updated_by",
    "updated_on",
];

const softDelete = true;

const User = function (data) {
    this.email = data.email;
    this.password = data.password;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.user_role_id = data.user_role_id;
    this.type = data.type;
    this.company_id = data.company_id;
};

User.create = async (values, pool) => {
    try {
        let data = {
            table,
            values,
            pool,
        };

        return await BaseModel.create(data);
    } catch (error) {
        console.log("create user ", error);
        return { error: true };
    }
};

User.updateById = async (id, values, pool) => {
    try {
        let data = {
            table,
            where: { id },
            values,
            pool,
        };

        return await BaseModel.update(data, softDelete);
    } catch (error) {
        console.log("update user ", error);
        return { error: true };
    }
};

User.delete = async (id, pool) => {
    try {
        let data = {
            table,
            where: { id },
            pool,
        };

        return BaseModel.delete(data, softDelete);
    } catch (error) {
        console.log("create user ", error);
        return { error: true };
    }
};

User.get = async (pagination, pool) => {
    try {
        let data = {
            table,
            pagination,
            pool,
        };

        return await BaseModel.get(data, softDelete);
    } catch (error) {
        console.log("create user ", error);
        return { error: true };
    }
};

User.findById = async (id, pool) => {
    try {
        let data = {
            select,
            table,
            where: { id },
            pool,
        };

        return await BaseModel.find(data, softDelete);
    } catch (error) {
        return { error: true };
    }
};

module.exports = User;
