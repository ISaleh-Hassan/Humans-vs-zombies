import React, { useCallback, useContext } from "react";
import { Redirect, withRouter } from "react-router";
import firebaseConfig from "../../utils/firebase.js";
import { AuthContext } from "../../utils/Auth";
import { Link } from "react-router-dom";
import { storeUser } from "../../utils/localstorage.js";
import Form from 'react-bootstrap/Form';
import '../Stylings/Components.css';
import { loginUser } from "../../utils/dbstorage.js";

const Login = ({ history }) => {

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                const status = loginUser(email.value, password.value)
                console.log(status)
                await firebaseConfig
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/")
                storeUser(email.value);
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const onCancel = () => {
        console.log("You tried to cancel!")
    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />
    }

    return (
        <>
            <section className="login-register">
                <div className="container">
                    <h1>Log in</h1>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email: </Form.Label>
                            <Form.Control name="email" type="email" placeholder="Email" required />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" required />
                        </Form.Group>
                        <button type="submit">Log in</button><button name="cancel " onClick={onCancel}>Cancel</button>
                    </Form>
                    <Link to="/register">Don't have an account? Register here.</Link>
                </div>
            </section>
        </>
    );
};

export default withRouter(Login);