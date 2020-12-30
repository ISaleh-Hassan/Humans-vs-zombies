import React from 'react'
import { loginPhone } from '../../utils/dbstorage';
import firebase from '../../utils/firebase'
import HeaderOutside from '../StylingComponents/HeaderOutside';

const Phone = ({ history }) => {
  const handleClick = async event => {
    firebase.auth().languageCode = 'se';
    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    const phoneNumber = document.getElementById('phone');

    const status = await loginPhone(phoneNumber.value)
    
    if (status === 200) {
      firebase.auth().signInWithPhoneNumber(phoneNumber.value, recaptcha).then(function (e) {
        var code = prompt('Enter the OTP Code: ', '');


        if (code === null) return;


        e.confirm(code).then(function (result) {
          console.log(result.user);
          document.querySelector('label').textContent += result.user.phoneNumber + " verified";
          history.push("/")
        }).catch(function (error) {
          console.error(error);

        });

      })
        .catch(function (error) {
          console.error(error);

        });
    } else {
      alert("Incorrect phone number!")
    }

  }
  return (
    <>
      <HeaderOutside />
      <section className="login-register">
        <div className="container">
          <div id="recaptcha"></div>
          <div>
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" required />
          </div>

          <script src="https://www.gstatic.com/firebasejs/8.1.2/firebase.js"></script>

          <button onClick={handleClick}>Get code</button>
        </div>
      </section>
    </>
  )
}

export default Phone