export const storeUserDB = (user) => {
    fetch("http://localhost:8080/api/create/useraccount", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: user })
    })
}

export const getUserInfo = () => {
    fetch('http://localhost:8080/api/fetch/useraccount/all')
  .then(response => response.json())
  .then(data => console.log(data));
}