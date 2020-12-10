import React from "react";
import { useState } from "react";

const DBTest = () => {

    const [users, setUsers] = useState([]);

    const getUserInfo = () => {
        fetch('http://localhost:8080/api/fetch/useraccount/all')
            .then(response => response.json())
            .then(data => setUsers(data));
    }

    return (
        <>
            <p>Hej</p>
        </>
    );
};

export default DBTest;