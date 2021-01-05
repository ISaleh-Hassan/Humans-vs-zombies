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
        if (password.lenght < 6) {
            alert("Password should be more than 6")
        }
        try {
            const status = await storeUserDB(username.value, firstname.value, lastname.value, userType, password.value, email.value);
            if (status === 201) {
                firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
                    .then(userData => {
                        userData.user.sendEmailVerification();
                        console.log(userData);
                        history.push("/")
                    })
                    .catch(err => {
                        alert(err.message);
                    });
            } else {
                alert("Username or email already in use!")
            }
        } catch (error) {
            alert(error);
        }
    }

    const handleCheckbox = e => {
        const target = e.target;
        let isChecked = target.checked;
        if (isChecked) {
            setUserType('ADMINISTRATOR')
        } else {
            setUserType('PLAYER')
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
                            <Form.Control name="firstname" type="text" placeholder="First Name" required />
                        </Form.Group>

                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name: </Form.Label>
                            <Form.Control name="lastname" type="text" placeholder="Last Name" required />
                        </Form.Group>

                        <Form.Group controlId="formUserName">
                            <Form.Label>User Name: </Form.Label>
                            <Form.Control name="username" type="text" placeholder="Username" required />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" required />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email: </Form.Label>
                            <Form.Control name="email" type="email" placeholder="Email" required />
                        </Form.Group>

                        <Form.Group controlId="formAdminCheckbox">
                            <Form.Check type="checkbox" label="Register as admin?" onChange={handleCheckbox} />
                        </Form.Group>
                        <Button variant="dark" style={BUTTON_STYLES} type="submit">Register</Button>
                        <Link to="/register">
                            <Button variant="danger" style={BUTTON_STYLES}>Cancel</Button>
                        </Link>
                    </Form>
                    <Link to="/login">Already have an account? Log in here.</Link>
                </div>
            </section>
        </>
    );
};

export default withRouter(Register);