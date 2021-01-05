import React, { useContext } from "react";
import { Redirect, withRouter } from "react-router";
import firebase from "../../utils/firebase.js";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { AuthContext } from "../../utils/Auth.js";
import { getUserInfo, storePhone } from "../../utils/dbstorage.js";
import HeaderOutside from "../StylingComponents/HeaderOutside";

const RegisterPhone = ({ history }) => {

    let userId = localStorage.getItem("User ID")
    const isVerified = firebase.auth().currentUser.emailVerified;

    const handleRegister = async event => {
        event.preventDefault();
        const { phone } = event.target.elements;
        storePhone(userId, phone.value);
        history.push('/');
    }

    function redirectToIndex() {
        history.push('/');
    }

    const { currentUser } = useContext(AuthContext);

    return (
        <>
            {isVerified
                ?
                <>
                    <HeaderOutside />
                    <section className="login-register">
                        <div className="container">
                            <h1>Register Phone</h1>
                            <Form onSubmit={handleRegister} name="loginForm">
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Phone Number: </Form.Label>
                                    <Form.Control name="phone" type="tel" required />
                                </Form.Group>
                                <button type="submit">Register</button>
                                <Link to="/">
                                    <button>Cancel</button>
                                </Link>
                            </Form>
                        </div>
                    </section>
                </>
                : 
                redirectToIndex()
                }

        </>
    );
};

export default withRouter(RegisterPhone);