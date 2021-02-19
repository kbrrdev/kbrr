import { store } from "@src/index";

export function getUser() {
    const user = Object.assign({}, store.getState().user);
    return user;
}

export const getIsLoggedIn = () => {
    let user = getUser();
    let isLoggedIn = false;

    if (
        user &&
        Object.keys(user).length > 0 &&
        user.hasOwnProperty("accessToken")
    ) {
        isLoggedIn = true;
    }
    return isLoggedIn;
};
