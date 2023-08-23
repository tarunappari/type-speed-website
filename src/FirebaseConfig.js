import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCyWUxRgaQiV8LageISEgv7RNuU0nf6C7I",
    authDomain: "type-speed-website.firebaseapp.com",
    projectId: "type-speed-website",
    storageBucket: "type-speed-website.appspot.com",
    messagingSenderId: "368582916046",
    appId: "1:368582916046:web:ef7b2945368f78bf2cdd9f",
    measurementId: "G-ZH6JETQF1G"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth()

  const db = firebaseApp.firestore();

  export {auth,db};