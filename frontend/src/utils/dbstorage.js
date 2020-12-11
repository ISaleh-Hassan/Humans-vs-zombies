export const storeUserDB = (username, firstname, lastname, password, email) => {
    fetch("http://localhost:8080/api/create/useraccount", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  players: [],
                                username: username,
                                firstName: firstname,
                                lastName: lastname,
                                userType: null,
                                password: password,  
                                email: email             
        })
    })
}

export const loginUser = (email, password) => {
    fetch("http://localhost:8080//api/useraccount/login", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  players: [],
                                username: null,
                                firstName: null,
                                lastName: null,
                                userType: null,
                                email: email,     
                                password: password      
        })
    })
}

export const getUserInfo = () => {
    fetch('http://localhost:8080/api/fetch/useraccount/all')
  .then(response => response.json())
  .then(data => console.log(data));
}