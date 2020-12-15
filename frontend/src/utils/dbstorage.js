import { storeUser } from "./localstorage";

export async function storeUserDB(username, firstname, lastname, usertype, password, email) {
    console.log(usertype);
    const response = await fetch("http://localhost:8080/api/create/useraccount", {
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
    return status;
}

export async function loginUser(email, password) {
    const response = await fetch("http://localhost:8080/api/useraccount/login", {
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
            email: email,
            password: password
        })
    })
    const status = await response.status
    if (status === 200) {
        const user = await response.json()
        storeUser(user.userAccountId, user.username, user.userType);
    }
    return status;
}

export const getUserInfo = () => {
    fetch('http://localhost:8080/api/fetch/useraccount/all')
        .then(response => response.json())
        .then(data => console.log(data));
}