import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

// firebase.initializeApp(firebaseConfig);

export const initializeFirebase = () => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
}