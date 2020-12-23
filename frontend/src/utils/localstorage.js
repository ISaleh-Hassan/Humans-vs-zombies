const uKey = 'User ID';
const userName = 'Username';
const pKey = 'Player ID'

export const storeUser = (user, username) => {
    localStorage.setItem(uKey, user);
    localStorage.setItem(userName, username);
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