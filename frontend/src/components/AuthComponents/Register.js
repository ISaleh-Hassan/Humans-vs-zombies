import React, { useCallback, useContext } from "react";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { storeUserDB } from "../../utils/dbstorage";
import firebaseConfig from "../../utils/firebase";
import { storeUser } from "../../utils/localstorage";
import Form from 'react-bootstrap/Form'
import Header from "../Stylings/Header";
import '../Stylings/Components.css';
import { AuthContext } from "../../utils/Auth";

const Register = ({ history }) => {
    const handleRegister = useCallback(async event => {
        event.preventDefault();
        const { username, email, password, firstname, lastname } = event.target.elements;
        try {
            const status = await storeUserDB(username.value, firstname.value, lastname.value, password.value, email.value);
            if (status === 201) {
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
            } else {
                alert("Username or email already in use!")
            }
        } catch (error) {
            alert(error);
        }
    }, [history])

    const onCancel = () => {
        console.log("You tried to cancel!")
    };

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />
    }

    return (
        <>
            <Header />
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
                            <Form.Check name="admin-checkbox" type="checkbox" label="Register as admin?" />
                        </Form.Group>
                        <button type="submit">Register</button><button name="cancel " onClick={onCancel}>Cancel</button>
                    </Form>
                    <Link to="/login">Already have an account? Log in here.</Link>
                </div>
            </section>
        </>
    );
};

export default withRouter(Register);