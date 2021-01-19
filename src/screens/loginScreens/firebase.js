import * as firebase from 'firebase';
import '@firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAcasnVPElbZmhBMej-ElxFllPh6PGkGYQ",
    authDomain: "projectalpha-c313c.firebaseapp.com",
    databaseURL: "https://projectalpha-c313c-default-rtdb.firebaseio.com",
    projectId: "projectalpha-c313c",
    storageBucket: "projectalpha-c313c.appspot.com",
    messagingSenderId: "703407400320",
    appId: "1:703407400320:web:5d3e0e774bf0008c80cd65",
    measurementId: "G-MV2EEDHZLQ"
};
firebase.initializeApp(firebaseConfig);
export default firebase;
