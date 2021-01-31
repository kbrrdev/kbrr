module.exports = (app) => {
    const usersController = require("../controllers/user.controller.js");
    const {
        authMiddleware,
        userMiddleware,
        validate,
        pagination,
    } = require("../middleware");

    // Create a new Customer
    app.post(
        "/api/users/",
        authMiddleware.authenticateToken,
        userMiddleware.create,
        validate,
        usersController.create
    );

    // // Retrieve all User
    app.get(
        "/api/users/",
        authMiddleware.authenticateToken,
        usersController.getAll
    );

    // Retrieve a paginated users
    app.get(
        "/api/users/pagination/",
        authMiddleware.authenticateToken,
        pagination,
        validate,
        usersController.paginateAll
    );

    // Retrieve a single Customer with userId
    app.get(
        "/api/users/:id/",
        authMiddleware.authenticateToken,
        usersController.findOne
    );

    // // Update a Customer with userId
    // app.put("/users/:userId", users.update);

    // // Delete a Customer with userId
    // app.delete("/users/:userId", users.delete);

    // // Create a new Customer
    // app.delete("/users", users.deleteAll);
};
