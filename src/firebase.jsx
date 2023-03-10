import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyB3Gf2eXJjuNvV73aqGhK-V8X2BKrvGkHo",
    authDomain: "suyogytclone.firebaseapp.com",
    projectId: "suyogytclone",
    storageBucket: "suyogytclone.appspot.com",
    messagingSenderId: "958924267594",
    appId: "1:958924267594:web:3dbde26d7ca43dfd7c06b3"
  };
firebase.initializeApp(firebaseConfig)

export default firebase.auth()
