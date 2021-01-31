import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route to="/" component={dashboard}></Route>
                <Route to="/" component={settings}></Route>
            </Switch>
        </BrowserRouter>
    );
};

Router.propTypes = {};

export default Router;
