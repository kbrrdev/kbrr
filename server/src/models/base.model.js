const moment = require("moment");
class BaseModel {
    constructor(table, fillable, softDelete) {
        this.fillable = fillable;
        this.table = table;
        this.softDelete = softDelete;
        this.dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
    }

    create = async ({ values, promisePool }) => {
        try {
            values = filterValues(values, this.fillable);
            values.created_on = this.dateNow;

            const query = `INSERT INTO ?? SET ?`;

            const [result, resultFields] = await promisePool.query(query, [
                this.table,
                values,
            ]);

            if (result.affectedRows < 1)
                return { status: 400, message: "Bad request!" };

            return { status: 201, message: "Create successful!" };
        } catch (error) {
            console.log("base model create ", error);
            return { error: "Server error!", status: 500 };
        }
    };

    // params = values, where, orWhere
    update = async ({ promisePool, ...params }) => {
        try {
            params.values = filterValues(params.values, this.fillable);
            params.values.updated_on = this.dateNow;
            let data = fixData({ ...params, softDelete: this.softDelete });

            const query = `UPDATE ?? SET ${data.set} WHERE ${data.where} ${data.orWhere} ${data.softDelete}`;

            const [result, resultFields] = await promisePool.query(query, [
                this.table,
                ...data.setValues,
                ...data.whereValues,
                ...data.orWhereValues,
            ]);

            if (result.affectedRows < 1)
                return { status: 400, message: "Bad request!" };

            return { status: 202, message: "Update successful!" };
        } catch (error) {
            console.log("base model update ", error);
            return { error: "Server error!", status: 500 };
        }
    };

    // params = select, where, orWhere
    find = async ({ promisePool, ...params }) => {
        try {
            let data = fixData({ ...params, softDelete: this.softDelete });

            const query = `SELECT ?? FROM ?? WHERE ${data.where} ${data.orWhere} ${data.softDelete} LIMIT 0, 1`;

            const [result, resultFields] = await promisePool.query(query, [
                data.select,
                this.table,
                ...data.whereValues,
                ...data.orWhereValues,
            ]);

            if (result.length <= 0)
                return { data: {}, message: "No data found.", status: 202 };

            return {
                data: result[0],
                message: "Data retrieved success",
                status: 200,
            };
        } catch (error) {
            console.log("base model find ", error);
            return { error: "Server error!", status: 500 };
        }
    };

    // params = select, where, orWhere, whereLike, orderBy, pagination
    get = async ({ promisePool, ...params }) => {
        try {
            let totalPages,
                dataCount,
                data = fixData({ ...params, softDelete: this.softDelete });

            if (data.pagination) {
                const countQuery = `SELECT COUNT(*) AS count from ?? WHERE ${data.where} ${data.orWhere} ${data.whereLike} ${data.softDelete}`;

                const [
                    counter,
                    counterFields,
                ] = await promisePool.query(countQuery, [
                    this.table,
                    ...data.whereValues,
                    ...data.orWhereValues,
                    ...data.whereLikeValues,
                ]);

                dataCount = counter[0].count;
                totalPages = dataCount / data.paginationValues[0];

                if (totalPages % 1 == 0) {
                    totalPages = parseInt(totalPages);
                } else {
                    totalPages = parseInt(totalPages) + 1;
                }
            }

            const query = `SELECT ?? FROM ?? WHERE ${data.where} ${data.orWhere} ${data.whereLike} ${data.softDelete} ${data.orderBy} ${data.pagination}`;

            const [result, resultFields] = await promisePool.query(query, [
                data.select,
                this.table,
                ...data.whereValues,
                ...data.orWhereValues,
                ...data.whereLikeValues,
                ...data.paginationValues,
            ]);

            let request = {
                data: result,
            };

            if (totalPages != undefined && dataCount > result.length) {
                request.pagination = {
                    currentPage: parseInt(data.page),
                    totalPages,
                    totalItems: dataCount,
                    countItems: result.length,
                    pageSize: parseInt(data.pageSize),
                };
            }

            if (request.pagination) {
                return { ...request, message: "Data retrieved!", status: 206 };
            } else if (result.length > 0) {
                return { ...request, message: "Data retrieved!", status: 200 };
            } else {
                return { ...request, message: "No data found!", status: 202 };
            }
        } catch (error) {
            console.log("base model get ", error);
            return { error: "Server error!", status: 500 };
        }
    };

    delete = async ({ where, orWhere, promisePool }) => {
        try {
            let data = fixData({ where, orWhere, softDelete: this.softDelete });

            const query = `UPDATE ?? SET deleted_on = ? WHERE ${data.where} ${data.orWhere} ${data.softDelete}`;
            const [result, resultFields] = await promisePool.query(query, [
                this.table,
                this.dateNow,
                ...data.whereValues,
                ...data.orWhereValues,
            ]);

            if (result.affectedRows < 1)
                return { status: 400, message: "Bad request!" };

            return { status: 202, message: "Delete successful!" };
        } catch (error) {
            console.log("base model create ", error);
            return { error: true };
        }
    };

    permanentDelete = async ({ where, orWhere, promisePool }) => {
        try {
            let data = fixData({ where, orWhere, softDelete: this.softDelete });

            const query = `DELETE FROM ?? WHERE ${data.where} ${data.orWhere} ${data.softDelete}`;
            const [result, resultFields] = await promisePool.query(query, [
                this.table,
                ...data.whereValues,
                ...data.orWhereValues,
            ]);

            if (result.affectedRows < 1)
                return { status: 400, message: "Bad request!" };

            return { status: 202, message: "Delete successful!" };
        } catch (error) {
            console.log("base model permanent delete ", error);
            return { error: true };
        }
    };
}

const fixData = (data) => {
    if (!data.select) {
        data.select = ["*"];
    }

    if (data.values) {
        data.setValues = Object.values(data.values);
        data.set = valuesToSet(data.values);
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
        data.orWhereValues = Object.values(data.orWhere);
        data.orWhere = valuesToOrWhere(data.orWhere);

        if (data.where) {
            data.orWhere = `AND ${data.orWhere}`;
        }
    } else {
        data.orWhereValues = [];
        data.orWhere = "";
    }

    if (data.whereLike) {
        data.whereLikeValues = Object.values(data.whereLike);
        data.whereLike = valuesToWhereLike(data.whereLike);

        if (data.orWhere) {
            data.orWhere = `AND ${data.orWhere}`;
        }
    } else {
        data.whereLikeValues = [];
        data.whereLike = "";
    }

    if (data.orderBy) {
        data.orderBy = arrangeOrderBy(data.orderBy);
    } else {
        data.orderBy = "ORDER BY ID DESC";
    }

    if (data.softDelete) {
        data.softDelete = "deleted_on IS NULL";

        if (data.orWhere || data.where || data.whereLike) {
            data.softDelete = " AND " + data.softDelete;
        }
    }

    if (
        data.pagination &&
        Object.values(filterValues(data.pagination, ["page", "page_size"]))
            .length > 0
    ) {
        let { page_size = 25, page = 1 } = data.pagination,
            limit = page_size,
            offset = limit * (page - 1),
            pagination = {
                limit: parseInt(limit),
                offset,
            };

        data = {
            ...data,
            pagination: valuesToPagination(pagination),
            paginationValues: Object.values(pagination),
            page,
            pageSize: limit,
        };
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

        if (Object.keys(values).length - 1 != idx) set = set.concat(`,`);
    });
    return set;
};

const valuesToWhere = (values) => {
    let whereString = "";
    Object.keys(values).map((key, idx) => {
        if (idx === 0) whereString = whereString.concat(`(`);

        whereString = whereString.concat(` ${key} = ? `);

        if (Object.values(values).length - 1 != idx)
            whereString = whereString.concat(` AND `);
        else whereString = whereString.concat(`)`);
    });
    return whereString;
};

const valuesToOrWhere = (values) => {
    let OrWhereString = "";

    Object.keys(values).map((key, idx) => {
        if (idx === 0) OrWhereString = OrWhereString.concat(`(`);

        OrWhereString = OrWhereString.concat(` ${key} = ? `);

        if (Object.values(values).length - 1 != idx)
            OrWhereString = OrWhereString.concat(` OR `);
        else OrWhereString = OrWhereString.concat(`)`);
    });

    return OrWhereString;
};

const valuesToWhereLike = (values) => {
    let whereLikeString = "";
    Object.keys(values).map((key, idx) => {
        if (idx === 0) whereLikeString = whereLikeString.concat(`(`);

        whereLikeString = whereLikeString.concat(` ${key} LIKE ? `);

        if (Object.values(values).length - 1 != idx)
            whereLikeString = whereLikeString.concat(` OR `);
        else whereLikeString = whereLikeString.concat(`)`);
    });
    return whereLikeString;
};

const valuesToPagination = (values) => {
    let paginationString = "";

    Object.keys(values).map((key) => {
        paginationString = paginationString.concat(` ${key} ? `);
    });

    return paginationString;
};

const arrangeOrderBy = (values) => {
    let orderBy = " ORDER BY ";

    Object.keys(values).map((key, idx) => {
        orderBy = orderBy.concat(` ${key} ${values[key]} `);

        if (Object.keys(values).length - 1 != idx)
            orderBy = orderBy.concat(`, `);
    });

    return orderBy;
};

const filterValues = (data, fillable) => {
    let values = {};

    Object.keys(data).map((key) => {
        let validField = fillable.includes(key);

        if (validField)
            values = Object.assign({}, values, { [key]: data[key] });
    });
    return values;
};

module.exports = BaseModel;
