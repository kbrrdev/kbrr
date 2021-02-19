import "@assets/scss/app.scss";
import configureStore from "@constants/configureStore";
import Routes from "@src/Routes";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const store = configureStore().store;
const persistor = configureStore().persistor;

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

export { store };
