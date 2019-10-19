import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: 'AIzaSyDHAaGfbuT5WygYl1N3EmcmyNX8eAGDkDg',
    authDomain: 'csc-414-survival-app.firebaseapp.com',
    databaseURL: 'https://csc-414-survival-app.firebaseio.com'
  }

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();