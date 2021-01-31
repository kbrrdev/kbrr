const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

// const corsOptions = {
//     origin: "http://localhost:3000"
// }
// app.use(cors(corsOptions));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./src/routes/user.route.js")(app);
require("./src/routes/auth.route.js")(app);
require("./src/routes/rate.route.js")(app);

app.listen(process.env.PORT, () =>
    console.log(`Listen on port ${process.env.PORT}.`)
);
