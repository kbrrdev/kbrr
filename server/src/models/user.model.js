// constructor
const User = function () {
    let fillable = ["id", "username", "first_name", "last_name", "token"];
    this.fillable = fillable.toString();
};

User.create = async (newUser, pool) => {
    try {
        const query = `INSERT INTO users SET ?`;
        const user = await pool.query(query, newUser);

        return user;
    } catch (error) {
        console.log("create user ", error);
        return { error: true };
    }
};

User.pagination = async (req, pool) => {
    try {
        const countQuery = `SELECT COUNT(*) AS count from users`;
        const user = await pool.query(countQuery);
        const userCount = user[0].count;

        const query = `SELECT ${this.fillable} FROM users WHERE deleted_at IS NULL LIMIT ? OFFSET ?`;
        const users = await pool.query(query, [req.limit, req.offset]);

        const totalPages = userCount / req.limit;

        let request = {
            data: users,
        };

        if (totalPages > 1) {
            request.pagination = {
                currentPage: req.page,
                totalPages,
                totalItems: users.length,
            };
        }

        return request;
    } catch (error) {
        console.log("create user ", error);
        return { error: true };
    }
};

User.getAll = async (pool) => {
    try {
        const query = `SELECT ${this.fillable} FROM users WHERE deleted_at IS NULL`;
        const users = await pool.query(query);

        return users;
    } catch (error) {
        return { error: true };
    }
};

User.findById = async (id, pool) => {
    try {
        const query = `SELECT ${this.fillable} FROM users WHERE id = ? AND deleted_at IS NULL`;
        const user = await pool.query(query, [id]);

        return user;
    } catch (error) {
        return { error: true };
    }
};

User.findByEmail = async (email, pool) => {
    try {
        const query = `SELECT ${this.fillable} FROM users WHERE email = ? AND deleted_at IS NULL`;
        const user = await pool.query(query, [email]);

        return user;
    } catch (error) {
        console.log("findByEmail", error);
        return { error: true };
    }
};

User.findByUsername = async (username, pool) => {
    try {
        const query = `SELECT ${this.fillable} FROM users WHERE username = ? AND deleted_at IS NULL`;
        const user = await pool.query(query, [username]);

        return user;
    } catch (error) {
        return { error: true };
    }
};

User.findByToken = async (token, pool) => {
    try {
        const query = `SELECT ${this.fillable} FROM users WHERE token = ? AND deleted_at IS NULL`;
        const user = await pool.query(query, [token]);

        return user;
    } catch (error) {
        return { error: true };
    }
};

module.exports = User;
