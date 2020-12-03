import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { storeUserDB } from "../utils/dbstorage";
import firebaseConfig from "../utils/firebase";
import { storeUser } from "../utils/localstorage";

const Register = ({ history }) => {
    const handleRegister = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await firebaseConfig
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/")
            storeUser(email.value);
            storeUserDB(email.value);
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <label>
                    Email
          <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password
          <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Register</button>
            </form>
            <Link to="/login">Log In</Link>
        </div>
    );
};

export default withRouter(Register);