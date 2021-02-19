import { getUser } from "@helpers/session.helper";
import axios from "axios";
import { logout, updateUserAccessToken } from "../actions/user.action";

export const connect = () => {
    const user = getUser();
    let headers = {},
        axiosApiInstance;

    if (user && Object.keys(user).length > 0 && user.accessToken) {
        headers = Object.assign(
            {},
            { authorization: `Bearer ${user.accessToken}` }
        );

        axiosApiInstance = axios.create({
            headers,
            withCredentials: true,
            baseURL: process.env.REACT_APP_API_URL,
        });
    } else {
        axiosApiInstance = axios.create({
            headers,
            withCredentials: true,
            baseURL: process.env.REACT_APP_API_URL,
        });
    }

    // Request interceptor for API calls
    axiosApiInstance.interceptors.request.use(
        async (config) => {
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    // Response interceptor for API calls
    axiosApiInstance.interceptors.response.use(
        (response) => {
            return response.data;
        },
        async function (error) {
            const originalRequest = error.config;

            if (
                user &&
                Object.keys(user).length > 0 &&
                user.refreshToken &&
                error.response.status === 403 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;
                const access_token = await refreshAccessToken();

                originalRequest.headers.authorization = `Bearer ${access_token}`;

                return axiosApiInstance(originalRequest);
            }
            return Promise.reject(error);
        }
    );

    return axiosApiInstance;
};

const refreshAccessToken = async (params) => {
    const user = getUser();

    let getAccessToken = await axios.post(
        "/auth/refresh-token",
        { token: user.refreshToken },
        {
            withCredentials: true,
            baseURL: process.env.REACT_APP_API_URL,
        }
    );

    if (getAccessToken.data && getAccessToken.data.accessToken) {
        updateUserAccessToken(getAccessToken.data.accessToken);
    } else {
        logout();
    }

    return getAccessToken.data.accessToken;
};
