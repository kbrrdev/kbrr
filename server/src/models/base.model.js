const moment = require("moment");
// constructor
const BaseModel = function () {
    this.fillable = "";
};

BaseModel.create = async ({ table, values, pool }) => {
    try {
        values.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
        const query = `INSERT INTO ?? SET ?`;
        const [result, resultFields] = await pool.query(query, [table, values]);
        return result;
    } catch (error) {
        console.log("create user ", error);
        return { error: true };
    }
};

BaseModel.update = async (
    { table, values, where, orWhere, pool },
    softDelete = false
) => {
    try {
        let data = fixData({ values, where, orWhere, softDelete });

        const query = `UPDATE ?? SET ${data.set} WHERE id IS NOT NULL ${data.where} ${data.orWhere} ${data.softDelete}`;

        const [result, resultFields] = await pool.query(query, [
            table,
            ...data.setValues,
            ...data.whereValues,
            ...data.orWhereValues,
        ]);

        return result;
    } catch (error) {
        console.log("create user ", error);
        return { error: true };
    }
};

BaseModel.delete = async (
    { table, where, orWhere, pool },
    softDelete = false
) => {
    try {
        const date = moment().format("YYYY-MM-DD HH:mm:ss");

        let data = fixData({ where, orWhere, softDelete });

        const query = `UPDATE ?? SET deleted_on = ${date} WHERE id IS NOT NULL ${data.where} ${data.orWhere} ${data.softDelete}`;
        const [result, resultFields] = await pool.query(query, [
            table,
            ...data.whereValues,
            ...data.orWhereValues,
        ]);

        return result;
    } catch (error) {
        console.log("create user ", error);
        return { error: true };
    }
};

BaseModel.permanentDelete = async (
    { table, where, orWhere, pool },
    softDelete = false
) => {
    try {
        let data = fixData({ where, orWhere, softDelete });

        const query = `DELETE FROM ?? WHERE id IS NOT NULL ${data.where} ${data.orWhere} ${data.softDelete}`;
        const [result, resultFields] = await pool.query(query, [
            table,
            ...data.whereValues,
            ...data.orWhereValues,
        ]);

        return result;
    } catch (error) {
        console.log("create user ", error);
        return { error: true };
    }
};

BaseModel.get = async (
    { select, table, where, orWhere, orderBy, pagination, pool },
    softDelete = false
) => {
    try {
        let totalPages, dataCount;

        let data = fixData({
            select,
            where,
            orWhere,
            orderBy,
            pagination,
            softDelete,
        });

        if (data.pagination) {
            const countQuery = `SELECT COUNT(*) AS count from ?? WHERE id IS NOT NULL ${data.where} ${data.orWhere} ${data.softDelete}`;
            const [counter, counterFields] = await pool.query(countQuery, [
                table,
                ...data.whereValues,
                ...data.orWhereValues,
            ]);
            dataCount = counter[0].count;
            totalPages = dataCount / data.paginationValues[0];
            if (totalPages % 1 == 0) {
                totalPages = parseInt(totalPages);
            } else {
                totalPages = parseInt(totalPages) + 1;
            }
        }

        const query = `SELECT ?? FROM ?? WHERE id IS NOT NULL ${data.where} ${data.orWhere} ${data.softDelete} ${data.orderBy} ${data.pagination}`;

        const [result, resultFields] = await pool.query(query, [
            data.select,
            table,
            ...data.whereValues,
            ...data.orWhereValues,
            ...data.paginationValues,
        ]);

        let request = {
            data: result,
        };

        if (totalPages != undefined && dataCount > result.length) {
            request.pagination = {
                currentPage: parseInt(data.page),
                totalPages,
                totalItems: result.length,
            };
        }

        if (request.pagination) {
            return { ...request, status: 206 };
        } else if (result.length > 0) {
            return { ...request, status: 200 };
        } else {
            return { ...request, status: 202 };
        }
    } catch (error) {
        console.log("get " + table, error);
        return { error: "Server error!", status: 500 };
    }
};

BaseModel.find = async (
    { select, table, where, orWhere, pool },
    softDelete = false
) => {
    try {
        let data = fixData({ select, where, orWhere, softDelete });

        const query = `SELECT ?? FROM ?? WHERE id IS NOT NULL ${data.where} ${data.orWhere} ${data.softDelete} LIMIT 0, 1`;
        const [result, resultFields] = await pool.query(query, [
            data.select,
            table,
            ...data.whereValues,
            ...data.orWhereValues,
        ]);
        if (result.length > 0) {
            return { data: result[0] };
        } else {
            return { data: {}, message: "No data found." };
        }
    } catch (error) {
        console.log(error);
        return { error: "Server error!", status: 400 };
    }
};

const fixData = (data) => {
    if (!data.select) {
        data.select = "*";
    }

    if (data.values) {
        data.setValues = Object.values(filterValues(data.values));
        data.set = valuesToSet(filterValues(data.values));
    } else {
        data.setValues = [];
        data.set = "";
    }

    if (data.where) {
        data.whereValues = Object.values(data.where);
        data.where = valuesToWhere(data.where);
    } else {
        data.whereValues = [];
        data.where = "";
    }

    if (data.orWhere) {
        data.orWhere = valuesToOrWhere(data.orWhere);
        data.orWhereValues = Object.values(data.orWhere);
    } else {
        data.orWhereValues = [];
        data.orWhere = "";
    }

    if (data.orderBy) {
        data.orderBy = arrangeOrderBy(data.orderBy);
    } else {
        data.orderBy = "";
    }

    if (data.softDelete) {
        data.softDelete = " AND deleted_on IS NULL";
    } else {
        data.softDelete = "";
    }

    if (Object.values(filterValues(data.pagination)).length > 0) {
        let newPagination = Object.assign({}, data.pagination);
        let limit = newPagination.page_size ? newPagination.page_size : 25;
        let page = newPagination.page ? newPagination.page : 1;
        let offset = limit * (page - 1);

        newPagination.limit = parseInt(limit);
        newPagination.offset = offset;

        delete newPagination.page_size;
        delete newPagination.page;

        data.pagination = valuesToPagination(newPagination);
        data.paginationValues = Object.values(newPagination);
        data.page = page;
    } else {
        data.pagination = "";
        data.paginationValues = [];
    }

    return data;
};

const valuesToSet = (values) => {
    let set = "";
    Object.keys(values).map((key, idx) => {
        set = set.concat(`${key} = ?`);
        if (Object.keys(values).length - 1 != idx) {
            set = set.concat(`,`);
        }
    });
    return set;
};

const valuesToWhere = (values) => {
    let set = "";
    Object.keys(values).map((key) => {
        set = set.concat(` AND `);
        set = set.concat(` ${key} = ? `);
    });
    return set;
};

const valuesToOrWhere = (values) => {
    let set = "";
    Object.keys(values).map((key) => {
        set = set.concat(` OR `);
        set = set.concat(` ${key} = ? `);
    });
    return set;
};

const valuesToPagination = (values) => {
    let set = "";
    Object.keys(values).map((key) => {
        set = set.concat(` ${key} ? `);
    });
    return set;
};

const arrangeOrderBy = (values) => {
    let orderBy = " ORDER BY ";
    Object.keys(values).map((key, idx) => {
        orderBy = orderBy.concat(` ${key} ${values[key]} `);

        if (Object.keys(values).length - 1 != idx) {
            orderBy = orderBy.concat(`, `);
        }
    });
    return orderBy;
};

const filterValues = (values) => {
    let newValues = Object.assign({}, values);
    Object.keys(newValues).forEach(
        (key) => newValues[key] === undefined && delete newValues[key]
    );

    return newValues;
};

module.exports = BaseModel;
