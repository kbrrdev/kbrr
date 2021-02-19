import * as types from "@constants/actionTypes";
import initialState from "@constants/initialState";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState.rates, action) => {
    switch (action.type) {
        case types.GET_RATE + types.FULFILLED: {
            let pagination = action.payload.pagination
                ? action.payload.pagination
                : {};

            return Object.assign({}, state, {
                list: action.payload.data,
                pagination,
            });
        }

        default:
            return state;
    }
};
