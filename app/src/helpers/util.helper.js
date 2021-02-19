import moment from "moment";
import { getUser } from "@helpers/session.helper";

export const tableItemCounter = (idx, pagination) => {
    let index = idx + 1;

    if (pagination && Object.keys(pagination).length > 0) {
        index = (pagination.currentPage - 1) * pagination.pageSize + index;
    }

    return index;
};

export const syncGetParams = (newParams) => {
    let params = {
        page: 1,
        page_size: 10,
    };

    params = Object.assign({}, params, newParams);

    return { params };
};

export const syncUpdateParams = (newParams) => {
    let user = getUser();

    let params = {
        updated_by: `${user.first_name} ${user.last_name}`,
    };

    params = Object.assign({}, params, newParams);

    return { params };
};

export const syncCreateParams = (newParams) => {
    let user = getUser();

    let params = {
        created_by: `${user.first_name} ${user.last_name}`,
    };

    params = Object.assign({}, params, newParams);

    return { params };
};

export const getParamsFromLocation = (location) => {
    let params = {};
    let search = location.search;

    if (search) {
        search = search.substring(1);
        search = search.split("&");

        if (search.length > 0) {
            search.map((value) => {
                let valueArr = value.split("=");
                if (valueArr.length > 1) {
                    params = Object.assign({
                        ...params,
                        [valueArr[0]]: valueArr[1],
                    });
                }

                return value;
            });
        }
    }

    return params;
};

export const setParamsToUrlString = (params, location) => {
    let pathname = `${location.pathname}`;
    Object.keys(params).length > 0 &&
        Object.keys(params).map((key, idx) => {
            if (idx === 0) {
                pathname = pathname.concat("?");
            }

            pathname = pathname.concat(`${key}=${params[key]}`);

            if (Object.keys(params).length - 1 !== idx) {
                pathname = pathname.concat("&");
            }
            return key;
        });

    return pathname;
};

export const convertIfNull = (value) => {
    if (!value) {
        value = <span className="text-muted font-italic">Null</span>;
    }

    return value;
};

export const dateConvertIfNull = (value) => {
    if (!value) {
        value = <span className="text-muted font-italic">Null</span>;
    } else {
        value = moment(value).format("lll");
    }

    return value;
};
