const uKey = 'user';

export const storeUser = (user) => {
    localStorage.setItem(uKey, user);
}

export const clearUser = (user) => {
    localStorage.removeItem(uKey)
}

export const getUser = () => {
    return localStorage.getItem(uKey);
}