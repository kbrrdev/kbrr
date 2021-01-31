import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import moduleName from "redux";

ReactDOM.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
    document.getElementById("root")
);
