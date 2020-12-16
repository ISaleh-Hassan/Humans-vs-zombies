const uKey = 'User ID';
const userName = 'Username';
const userType = 'Usertype'

export const storeUser = (user, username, usertype) => {
    localStorage.setItem(uKey, user);
    localStorage.setItem(userName, username);
    localStorage.setItem(userType, usertype);
}

export const clearUser = () => {
    localStorage.removeItem(uKey, userName, userType)
}

export const getUser = () => {
    return localStorage.getItem(userName);
}

