import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebaseConfig from "../utils/firebase.js";
import { AuthContext } from "../utils/Auth.js";
import { Link } from "react-router-dom";
import { storeUser } from "../utils/localstorage.js";

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
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

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email
          <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password
          <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Log in</button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    );
};

export default withRouter(Login);