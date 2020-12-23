import React, { useContext } from "react";
import { Redirect, withRouter } from "react-router";
import firebase from "../../utils/firebase.js";
import { AuthContext } from "../../utils/Auth";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { loginUser } from "../../utils/dbstorage.js";
import HeaderOutside from "../StylingComponents/HeaderOutside";

const Login = ({ history }) => {

    const handleLogin =
        async event => {

            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                const status = await loginUser(email.value, password.value)
                if (status === 200) {
                    await firebase
                        .auth()
                        .signInWithEmailAndPassword(email.value, password.value)
                        .catch(err => {
                            alert(err.message)
                            history.push("/")
                        });
                } else {
                    alert("Incorrect email or password!")
                }
            } catch (error) {
                alert(error);
            }
        };

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />
    }

    return (
        <>
            <HeaderOutside />
            <section className="login-register">
                <div className="container">
                    <h1>Log in</h1>
                    <Form onSubmit={handleLogin} name="loginForm">
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email: </Form.Label>
                            <Form.Control name="email" type="email" placeholder="Email" required />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" required />
                        </Form.Group>
                        <button type="submit">Log in</button>
                        <Link to="/login">
                            <button>Cancel</button>
                        </Link>
                    </Form>
                    <Link to="/register">Don't have an account? Register here.</Link>
                    <p>Or</p>
                    <Link to="/phone">Login with your phone!*</Link>
                    <p><i>* Must be verified first!</i></p>
                </div>
            </section>
        </>
    );
};

export default withRouter(Login);