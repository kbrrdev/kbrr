const BaseModel = require("./base.model");
const { orderByToObject } = require("../helper");

const table = "rates";

const select = [
    "id",
    "day_type",
    "holiday_type",
    "time_type",
    "abbreviation",
    "rate",
    "created_by",
    "created_on",
    "updated_by",
    "updated_on",
];

const softDelete = true;

const Rate = function (data) {
    this.day_type = data.day_type;
    this.holiday_type = data.holiday_type;
    this.time_type = data.time_type;
    this.abbreviation = data.abbreviation;
    this.rate = data.rate;
};

Rate.create = async (values, pool) => {
    let data = {
        table,
        values,
        pool,
    };

    return await BaseModel.create(data);
};

Rate.updateById = async (id, values, pool) => {
    let data = {
        table,
        where: { id },
        values,
        pool,
    };

    return await BaseModel.update(data, softDelete);
};

Rate.get = async (pagination, orderBy, pool) => {
    orderBy = orderByToObject(orderBy, ["id", "holiday_type"]);

    let data = {
        select,
        table,
        orderBy,
        pagination,
        pool,
    };

    return await BaseModel.get(data, softDelete);
};

Rate.findById = async (id, pool) => {
    let data = {
        select,
        table,
        where: { id },
        pool,
    };

    return await BaseModel.find(data, softDelete);
};

Rate.delete = async (id, pool) => {
    let data = {
        table,
        where: { id },
        pool,
    };

    return await BaseModel.delete(data, softDelete);
};

module.exports = Rate;
