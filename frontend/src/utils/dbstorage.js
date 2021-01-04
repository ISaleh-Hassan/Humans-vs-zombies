import { getBaseUrl } from "./baseUrl";
import { storeUser } from "./localstorage";

// export a variable userType then create a function that gets usertype or just get direct

export async function storeUserDB(username, firstname, lastname, usertype, password, email) {
    console.log(usertype);
    const response = await fetch("/api/create/useraccount", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            players: [],
            username: username,
            firstName: firstname,
            lastName: lastname,
            userType: usertype,
            password: password,
            email: email
        })
    })
    const status = await response.status
    const user = await response.json()
    storeUser(user.userAccountId, user.username, user.userType);
    return status;
}

export async function loginUser(email, password) {
    const token = localStorage.getItem('jwt');
    const response = await fetch("/api/useraccount/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            players: [],
            username: null,
            firstName: null,
            lastName: null,
            userType: null,
            email: email,
            password: password
        })
    })
    const status = await response.status
    if (status === 200) {
        const user = await response.json()
        storeUser(user.userAccountId, user.username, user.userType, user.jwt);
    }
    return status;
}

export const getUserInfo = () => {
    fetch('/api/fetch/useraccount/all')
        .then(response => response.json())
        .then(data => console.log(data));
}

export async function loginPhone(phone) {
    const response = await fetch("/api/useraccount/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            players: [],
            username: null,
            firstName: null,
            lastName: null,
            userType: null,
            email: null,
            password: null,
            phoneNumber: phone
        })
    })
    const status = await response.status
    if (status === 200) {
        const user = await response.json()
        storeUser(user.userAccountId, user.username, user.userType);
    }
    return status;
}

export async function storePhone(phone) {
    const token = localStorage.getItem('jwt');
    const response = await fetch("/api/useraccount/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            players: [],
            username: null,
            firstName: null,
            lastName: null,
            userType: null,
            email: null,
            password: null,
            phoneNumber: phone
        })
    })
    const status = await response.status
    if (status === 200) {
        const user = await response.json()
        storeUser(user.userAccountId, user.username, user.userType);
    }
    return status;
}

export async function fetchUser(userId) {
    let url = getBaseUrl() + "fetch/useraccount/" + userId;
    const response = await fetch(url);
    if (response.status === 200) {
        let body = await response.json();
        return body;
    } else {
        return null;
    }
}
