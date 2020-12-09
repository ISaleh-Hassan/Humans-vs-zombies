import React from "react";
import { useState } from "react";

const DBTest = () => {

    const [users, setUsers] = useState([]);

    const getUserInfo = () => {
        fetch('/api/fetch/useraccount/0')
            .then(response => response.json())
            .then(data => setUsers(data));
    }

    console.log(users)

    return (
        <>
            <p>Hej</p>
            { users ?
                <p>{users.userAccountId}</p>
                : <p>Error</p>}
            <button onClick={getUserInfo}>Click me</button>
        </>
    );
};

export default DBTest;