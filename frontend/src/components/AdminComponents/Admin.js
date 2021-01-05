import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../StylingComponents/Header";

const Admin = () => {

    let userId = localStorage.getItem('User ID');
    
    const [currentUser, setCurrentUser] = useState([]);
    
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    async function fetchCurrentUser() {
        const token = localStorage.getItem('jwt');
        const response = await fetch('/api/fetch/useraccount/' + userId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        if (response.status === 200) {
            let body = await response.json();
            setCurrentUser(body);
        } else {
            alert("Could not find user object.")
            setCurrentUser({});
        }
    };


    if (currentUser.userType !== "ADMINISTRATOR") {
        return (
            <div>
                <div className="container">
                    <Header />
                    <h3>Forbidden</h3>
                    <p>You do not have access to the admin page.</p>
                </div>
            </div>
        );
    } else {
        return (
            <>
            <section className="home">
                <div className="container">
                <Header />
                <h1>Admin</h1>
                <Link to="/creategame">Create Game</Link>
                <Link to="/editgame">Edit Game</Link>
                <Link to="#">Edit Player State</Link>
                <Link to="/create/missionmarker">Create Mission Marker</Link>
                <Link to="/edit/missionmarker">Edit Mission Marker</Link>
                </div>
            </section>
            </>
        );
    }
};

export default Admin;