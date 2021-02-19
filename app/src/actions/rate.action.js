import { store } from "@src/index";
import * as types from "@constants/actionTypes";
import { connect } from "@helpers/api.helper";
import { syncGetParams } from "@helpers/action.helper";

export const getRates = (params) => {
    let result = connect().get("/rates/", syncGetParams(params));

    return store.dispatch({
        type: types.GET_RATE,
        payload: result,
    });
};
