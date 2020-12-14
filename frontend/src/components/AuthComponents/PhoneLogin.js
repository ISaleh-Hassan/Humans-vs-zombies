import { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../../utils/auth";
import React from 'react'
import firebase from "../../utils/firebase";
const PhoneLogin = () => {
    const auth = firebase.auth()
    const phoneNumberField = document.getElementById('phone');
    const codeField = document.getElementById('code');
    const signInWithPhoneButton = document.getElementById('signInWithPhone');
    const sendVerificationCode = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");
        const phoneNumber = phoneNumberField.value;
        const appVerifier = window.recaptchaVerifier;
        auth.signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(confirmationResult => {
                const sentCodeId = confirmationResult.verificationId;
                signInWithPhoneButton.addEventListener('click', () => signInWithPhone(sentCodeId));
            })
    }
    const signInWithPhone = sentCodeId => {
        const code = codeField.value;
        const credential = auth.PhoneAuthProvider.credential(sentCodeId, code);
        auth.signInWithCredential(credential)
            .then(() => {
                window.location.assign('/');
            })
            .catch(error => {
                console.error(error);
            })
    }
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
    }
    return (
        <>
            <section className="login-register">
                <div className="container">
                    <script src="https://www.gstatic.com/firebasejs/8.1.2/firebase.js"></script>
                    <h1>Log in</h1>
                    <div>
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required />
                    </div>
                    <div>
                        <label for="code">Code</label>
                        <input type="text" id="code" name="code" />
                    </div>
                    <div id="recaptcha-container"></div>
                    <button id="getCode" onClick={sendVerificationCode}>Get Code</button>
                    <button id="signInWithPhone">Login</button>
                </div>
            </section>
        </>
    );
};
export default withRouter(PhoneLogin);