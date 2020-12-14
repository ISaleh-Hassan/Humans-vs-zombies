import firebase from "firebase/app";
import "firebase/auth";
// const config = {
//     apiKey: "AIzaSyCLvDtCpR3TtjgBaE8hgHtObqr3KeG3LNw",
//     authDomain: "fir-auth-demo-c828b.firebaseapp.com",
//     databaseURL: "https://fir-auth-demo-c828b.firebaseio.com",
//     projectId: "fir-auth-demo-c828b",
//     storageBucket: "fir-auth-demo-c828b.appspot.com",
//     messagingSenderId: "610995848611",
//     appId: "1:610995848611:web:1c43c4bb6b30672b498616"

// };

var MFAConfig = {
    apiKey: "AIzaSyDP-HD6oVytJy_hcg0eRr32LijvRfN6JXs",
    authDomain: "hardy-order-298218.firebaseapp.com",
};

// const firebaseConfig = firebase.initializeApp(MFAConfig);

// export default firebaseConfig;

if (!firebase.apps.length) {
    firebase.initializeApp(MFAConfig);
  }
  export default firebase;