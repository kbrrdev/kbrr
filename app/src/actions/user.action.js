import { store } from "@src/index";
import * as types from "@constants/actionTypes";
import { connect } from "@helpers/api.helper";
import { getUser } from "@helpers/session.helper";

export function updateUserAccessToken(token) {
    return store.dispatch({
        type: types.UPDATE_USER_ACCESS_TOKEN,
        payload: { token },
    });
}

export const login = (params) => {
    let request = connect().post("/auth/login/", params);

    return store.dispatch({
        type: types.LOGIN_USER,
        payload: request,
    });
};

export const logout = () => {
    const user = getUser();
    connect().post("/auth/logout/", { id: user.id });

    return store.dispatch({
        type: types.LOGOUT_USER,
    });
};
