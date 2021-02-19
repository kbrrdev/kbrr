import * as types from "@constants/actionTypes";
import initialState from "@constants/initialState";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState.offices, { type, payload } = {}) => {
    switch (type) {
        case types.GET_OFFICE + types.FULFILLED: {
            let pagination = payload.pagination ? payload.pagination : {};

            return Object.assign({}, state, {
                list: payload.data,
                pagination,
            });
        }

        default:
            return state;
    }
};
