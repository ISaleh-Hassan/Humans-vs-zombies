import firebase from '@firebase/app';
require('firebase/auth');

const config = {
    apiKey: "AIzaSyCLvDtCpR3TtjgBaE8hgHtObqr3KeG3LNw",
    authDomain: "fir-auth-demo-c828b.firebaseapp.com",
    databaseURL: "https://fir-auth-demo-c828b.firebaseio.com",
    projectId: "fir-auth-demo-c828b",
    storageBucket: "fir-auth-demo-c828b.appspot.com",
    messagingSenderId: "610995848611",
    appId: "1:610995848611:web:1c43c4bb6b30672b498616"

};
<div>
<script src="/__/firebase/7.6.1/firebase-app.js"></script>
<script src="/__/firebase/7.6.1/firebase-auth.js"></script>
</div>

const firebaseConfig = firebase.initializeApp(config);  

export default firebaseConfig;
