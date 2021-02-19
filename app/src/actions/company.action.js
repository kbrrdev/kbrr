import * as types from "@constants/actionTypes";
import { syncUpdateParams } from "@helpers/action.helper";
import { connect } from "@helpers/api.helper";
import { store } from "@src/index";

export function findCompany(id) {
    let result = connect().get("/companies/" + id);

    return store.dispatch({
        type: types.GET_COMPANY,
        payload: result,
    });
}

export const updateCompany = (params, id) => {
    return connect().put(`/companies/${id}`, syncUpdateParams(params));
};
