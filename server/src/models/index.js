const UserModel = require("./user.model");
const BaseModel = require("./base.model");
const RateModel = require("./rate.model");

const PaginationModel = function (data) {
    this.page = data.page;
    this.page_size = data.page_size;
};

module.exports = {
    UserModel,
    BaseModel,
    RateModel,
    PaginationModel,
};
