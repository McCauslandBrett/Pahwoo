import * as firebase from 'firebase';

require('firebase/firestore')



// the following commented scripts were stated when configureing the app on firebase, not sure what they're for
// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-analytics.js"></script>



const firebaseConfig = {
    apiKey: "AIzaSyB9ipvuqBZnA-0sDbHBRmXs2bR8SdENy6A",
    authDomain: "virtualcards-3272e.firebaseapp.com",
    databaseURL: "https://virtualcards-3272e.firebaseio.com",
    projectId: "virtualcards-3272e",
    storageBucket: "virtualcards-3272e.appspot.com",
    messagingSenderId: "582940590182",
    appId: "1:582940590182:web:fad3b768f6f9da55a86da7",
    measurementId: "G-7ZKPHS2PT1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Enabled google analytics on firebase, might not need this
// Need to test what will happen if we remove this line and run the project
// firebase.analytics();

const db = firebase.firestore()
export default db;
