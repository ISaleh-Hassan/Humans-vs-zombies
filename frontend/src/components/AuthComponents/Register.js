import React, { useContext, useState } from "react";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { storeUserDB } from "../../utils/dbstorage";
import firebase from "../../utils/firebase";
import Form from 'react-bootstrap/Form'
import { AuthContext } from "../../utils/Auth";
import HeaderOutside from "../StylingComponents/HeaderOutside";
import { Button } from 'react-bootstrap';

const Register = ({ history }) => {

    const BUTTON_STYLES = {
        width: '120px',
        height: '40px',
        margin: '2px',
        padding: '1px'
    }

    let [userType, setUserType] = useState("PLAYER");

    const handleRegister = async event => {
        event.preventDefault();
        let { username, email, password, firstname, lastname } = event.target.elements;
        try {
            const status = await storeUserDB(username.value, firstname.value, lastname.value, userType, password.value, email.value);
            if (status === 201) {
                firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
                    .then(userData => {
                        userData.user.sendEmailVerification();
                        history.push("/login")
                    })
                    .catch(err => {
                        alert(err.message);
                    });
            } else {
                if (password.length < 6) {
                    alert("Password should be more than 6")
                }
            }
        } catch (error) {
            alert("Username or email already in use!");
        }
    }

    const handleCheckbox = e => {
        const target = e.value;
        let isChecked = target.checked;
        if (isChecked) {
            setUserType('ADMINISTRATOR')
        } else {
            setUserType('PLAYER')
        }
    }

    const firstNameChange = async e => {
        let firstname = e.target.value;
        if (firstname.length < 2) {
            let firstNameDiv = document.getElementById("firstname-div")
            const firstName =
                `<div>First name must be at least 1 character!</div>`;
            firstNameDiv.innerHTML = firstName;
        } else if (firstname.length > 1) {
            let firstNameDiv = document.getElementById("firstname-div")
            const firstName =
                `<div></div>`;
            firstNameDiv.innerHTML = firstName;
        }
    }

    const lastNameChange = async e => {
        let lastname = e.target.value;
        if (lastname.length < 2) {
            let lastNameDiv = document.getElementById("lastname-div")
            const lastName =
                `<div>Last name must be at least 1 character!</div>`;
            lastNameDiv.innerHTML = lastName;
        } else if (lastname.length > 1) {
            let lastNameDiv = document.getElementById("lastname-div")
            const lastName =
                `<div></div>`;
            lastNameDiv.innerHTML = lastName;
        }
    }
    const userNameChange = async e => {
        let username = e.target.value;
        if (username.length < 2) {
            let userNameDiv = document.getElementById("username-div")
            const userName =
                `<div>User name must be at least 1 character!</div>`;
            userNameDiv.innerHTML = userName;
        } else if (username.length > 1) {
            let userNameDiv = document.getElementById("username-div")
            const userName =
                `<div></div>`;
            userNameDiv.innerHTML = userName;
        }
    }

    const passwordChange = async e => {
        let password = e.target.value;
        if (password.length < 6) {
            let passwordDiv = document.getElementById("password-div")
            const passWord =
                `<div>Password must be at least 6 characters!</div>`;
            passwordDiv.innerHTML = passWord;
        } else if (password.length > 1) {
            let passwordDiv = document.getElementById("password-div")
            const passWord =
                `<div></div>`;
            passwordDiv.innerHTML = passWord;
        }
    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />
    }

    return (
        <>
            <HeaderOutside />
            <section className="login-register">
                <div className="container">
                    <h1>Register</h1>
                    <Form onSubmit={handleRegister}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name: </Form.Label>
                            <Form.Control name="firstname" type="text" placeholder="First Name" onChange={firstNameChange} required />
                            <div id="firstname-div"> </div>
                        </Form.Group>

                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name: </Form.Label>
                            <Form.Control name="lastname" type="text" placeholder="Last Name" onChange={lastNameChange} required />
                            <div id="lastname-div"> </div>
                        </Form.Group>

                        <Form.Group controlId="formUserName">
                            <Form.Label>User Name: </Form.Label>
                            <Form.Control name="username" type="text" placeholder="Username" onChange={userNameChange} required />
                            <div id="username-div"> </div>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={passwordChange} required />
                            <div id="password-div"> </div>
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email: </Form.Label>
                            <Form.Control name="email" type="email" placeholder="Email" required />
                        </Form.Group>

                        <Form.Group controlId="formAdminCheckbox">
                            <Form.Check type="checkbox" label="Register as admin?" onChange={handleCheckbox} />
                        </Form.Group>
                        <Button variant="dark" style={BUTTON_STYLES} type="submit">Register</Button>
                        <Link to="/login">
                            <Button variant="danger" style={BUTTON_STYLES}>Cancel</Button>
                        </Link>
                    </Form>
                </div>
            </section>
        </>
    );
};

export default withRouter(Register);