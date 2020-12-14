import React, { Component } from 'react'
import firebase from '../../utils/firebase'

export class PhoneLoginTest extends Component {
  handleClick = () => {
    firebase.auth().languageCode = 'se';
    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    var number = '+46735812187';
    firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function (e) {
      var code = prompt('Enter the otp', '');


      if (code === null) return;


      e.confirm(code).then(function (result) {
        console.log(result.user);

        document.querySelector('label').textContent += result.user.phoneNumber + "Number verified";

      }).catch(function (error) {
        console.error(error);

      });

    })
      .catch(function (error) {
        console.error(error);

      });
  }
  render() {
    return (
      <div>
        <label></label>

        <div id="recaptcha"></div>
        <script src="https://www.gstatic.com/firebasejs/8.1.2/firebase.js"></script>

        <button onClick={this.handleClick}>Click</button>
      </div>
    )
  }
}

export default PhoneLoginTest