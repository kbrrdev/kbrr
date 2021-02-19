import rootReducer from "@reducers/root.reducer";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ReduxPromise from "redux-promise-middleware";
import thunk from "redux-thunk";

const logger = createLogger({ collapsed: true });
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "company"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    let store = createStore(
        persistedReducer,
        composeWithDevTools(applyMiddleware(thunk, ReduxPromise, logger))
    );
    let persistor = persistStore(store);
    return { store, persistor };
};
