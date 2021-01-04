const uKey = 'User ID';
const userName = 'Username';
const pKey = 'Player ID'
const jwt = 'jwt'

export const storeUser = (user, username, usertype, token) => {
    localStorage.setItem(uKey, user);
    localStorage.setItem(userName, username);
    localStorage.setItem(userType, usertype);
    localStorage.setItem(jwt, token)
}

export const clearUser = () => {
    localStorage.clear()
}

export const getUser = () => {
    return localStorage.getItem(userName);
}

export const storePlayer = (player) => {
    localStorage.setItem(pKey, player)
}