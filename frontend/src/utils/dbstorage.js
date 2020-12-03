export const storeUserDB = (user) => {
    fetch("http://localhost:8080/api/create/useraccount", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: user })
    })
}