import Main from "@layouts/Main";
import Company from "@views/Company/Company";
import Login from "@views/Login/Login";
import Rate from "@views/Rate/Rate";
import Office from "@views/Office";
import NotFound from "@views/NotFound";
import React from "react";
import { Switch, withRouter, Route, Router } from "react-router-dom";
import History from "@src/History";

const Routes = () => {
    return (
        <Router history={History}>
            <Switch>
                <Route path="/" exact component={Login} />
                <Main
                    path="/company/details"
                    component={Company}
                    meta={{ auth: true }}
                />
                <Main
                    path="/company/offices"
                    component={Office}
                    meta={{ auth: true }}
                />
                <Main
                    path="/company/rates"
                    component={Rate}
                    meta={{ auth: true }}
                />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default withRouter(Routes);
