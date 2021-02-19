const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/routes");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(
    fileUpload({
        createParentPath: true,
        uriDecodeFileNames: true,
        safeFileNames: true,
        preserveExtension: true,
    })
);

app.use(helmet());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

// enable cors
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

app.use("/api", routes);

app.listen(process.env.PORT, () =>
    console.log(`Listen on port ${process.env.PORT}.`)
);
