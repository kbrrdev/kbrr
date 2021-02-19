const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const rateRoute = require("./rate.route");
const companyRoute = require("./company.route");
const officeRoute = require("./office.route");
const assetRoute = require("./asset.route");
require("dotenv").config();

const router = express.Router();

const defaultRoutes = [
    {
        path: "/users",
        route: userRoute,
    },
    {
        path: "/rates",
        route: rateRoute,
    },
    {
        path: "/auth",
        route: authRoute,
    },
    {
        path: "/companies",
        route: companyRoute,
    },
    {
        path: "/offices",
        route: officeRoute,
    },
    {
        path: "/assets",
        route: assetRoute,
    },
];

// const devRoutes = [
//     // routes available only in development mode
//     {
//         path: "/docs",
//         route: docsRoute,
//     },
// ];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (process.env.NODE_ENV === "production") {
//     devRoutes.forEach((route) => {
//         router.use(route.path, route.route);
//     });
// }

module.exports = router;
