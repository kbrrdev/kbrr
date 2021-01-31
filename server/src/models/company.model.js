// constructor
const Company = function () {
    let fillable = ["id", "name", "description", "last_name", "token"];
    this.fillable = fillable.toString();
};

Company.create = async (newCompany, pool) => {
    try {
        const query = `INSERT INTO companies SET ?`;
        const data = await pool.query(query, newCompany);

        return data;
    } catch (error) {
        console.log("create company ", error);
        return { error: true };
    }
};

Company.pagination = async (req, pool) => {
    try {
        const countQuery = `SELECT COUNT(*) AS count FROM copmanies WHERE deleted_at IS NULL`;
        const company = await pool.query(countQuery);
        const dataCount = company[0].count;

        const query = `SELECT ${this.fillable} FROM companies WHERE deleted_at IS NULL LIMIT ? OFFSET ?`;
        const data = await pool.query(query, [req.limit, req.offset]);

        const totalPages = dataCount / req.limit;

        let request = {
            data,
        };

        if (totalPages > 1) {
            request.pagination = {
                currentPage: req.page,
                totalPages,
                totalItems: data.length,
            };
        }

        return request;
    } catch (error) {
        console.log("paginate company ", error);
        return { error: true };
    }
};

Company.getAll = async (pool) => {
    try {
        const query = `SELECT ${this.fillable} FROM companies WHERE deleted_at IS NULL`;
        const data = await pool.query(query);

        return data;
    } catch (error) {
        return { error: true };
    }
};

Company.getWhere = async (pool) => {
    try {
        const query = `SELECT ${this.fillable} FROM companies WHERE ${where} deleted_at IS NULL`;
        const data = await pool.query(query, []);

        return data;
    } catch (error) {
        return { error: true };
    }
};

Company.findWhere = async (where, value, pool) => {
    try {
        const query = `SELECT ${this.fillable} FROM companies WHERE ${where} AND deleted_at IS NULL`;
        const data = await pool.query(query, [value]);

        return data;
    } catch (error) {
        return { error: true };
    }
};

module.exports = Company;
