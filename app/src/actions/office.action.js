import { store } from "@src/index";
import * as types from "@constants/actionTypes";
import { connect } from "@helpers/api.helper";
import {
    syncGetParams,
    syncCreateParams,
    syncUpdateParams,
    syncDeleteParams,
} from "@helpers/action.helper";

export const getOffices = (params) => {
    let result = connect().get("/offices/", syncGetParams(params));

    return store.dispatch({
        type: types.GET_OFFICE,
        payload: result,
    });
};

export const createOffice = (params) => {
    return connect().post("/offices/", syncCreateParams(params));
};

export const updateOffice = (params, id) => {
    return connect().put(`/offices/${id}`, syncUpdateParams(params));
};

export const deleteOffice = (id, params = {}) => {
    return connect().delete(`/offices/${id}`, syncDeleteParams(params));
};
