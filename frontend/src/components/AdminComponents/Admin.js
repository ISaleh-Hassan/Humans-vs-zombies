import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../StylingComponents/Header";
import { Button } from 'react-bootstrap';

const Admin = () => {

    const BUTTON_STYLES = {
        width: '350px',
        height: '40px',
        margin: '2px',
        padding: '1px'
    }

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


    if (currentUser.userType === "PLAYER") {
        return (
            <>
            <section className="home">
                    <div className="container">
                        <Header />
                        <h3>Forbidden</h3>
                        <p>You do not have access to the admin page.</p>
                    </div>
                </section>
            </>
        );
    } else if (currentUser.userType === "ADMINISTRATOR") {
        return (
            <>
                <section className="home">
                    <div className="container">
                    <Header />
                    <h1>Admin</h1>
                    <Link to="/creategame">
                        <Button variant="dark" style={BUTTON_STYLES}>Create Game</Button>
                    </Link>

                    <Link to="/editgame">
                        <Button variant="dark" style={BUTTON_STYLES}>Edit Game</Button>
                    </Link>

                    <Link to="#">
                        <Button variant="dark" style={BUTTON_STYLES}>Edit Player State</Button>
                    </Link>

                    <Link to="/create/missionmarker">
                        <Button variant="dark" style={BUTTON_STYLES}>Create Mission Marker</Button>
                    </Link>

                    <Link to="#">
                        <Button variant="dark" style={BUTTON_STYLES}>Edit Mission Marker</Button>
                    </Link>
                    </div>
                </section>
            </>
        );
    } else {
        return (
            <>
                <section className="home">
                    <div className="container">
                        <Header />
                        <h3>***</h3>
                    </div>
                </section>
            </>
        );
    }
};

export default Admin;