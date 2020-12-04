import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { storeUserDB } from "../utils/dbstorage";
import firebaseConfig from "../utils/firebase";
import { storeUser } from "../utils/localstorage";
import Form from 'react-bootstrap/Form'

const Register = ({ history }) => {
    const handleRegister = useCallback(async event => {
        event.preventDefault();
        const { username, email, password } = event.target.elements;
        try {
            firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value)
                .then(userData => {
                    userData.user.sendEmailVerification();
                    console.log(userData);
                })
                .catch(err => {
                    console.log(err);
                });
            history.push("/")
            storeUser(username.value);
            storeUserDB(email.value);
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div>
            <h1>Register</h1>
            <Form onSubmit={handleRegister}>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstname" type="text" placeholder="First Name" />
                </Form.Group>

                <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastname" type="text" placeholder="Last Name" />
                </Form.Group>

                <Form.Group controlId="formUserName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group controlId="formAdminCheckbox">
                    <Form.Check name="admin-checkbox" type="checkbox" label="Register as admin?" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <Link to="/login">Log In</Link>
        </div>
    );
};

export default withRouter(Register);