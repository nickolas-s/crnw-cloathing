import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDiueMABfJ2mgumS_LxJGF7xxoGhimv0GU',
  authDomain: 'crwn-db-1e6ae.firebaseapp.com',
  databaseURL: 'https://crwn-db-1e6ae.firebaseio.com',
  projectId: 'crwn-db-1e6ae',
  storageBucket: 'crwn-db-1e6ae.appspot.com',
  messagingSenderId: '350515201974',
  appId: '1:350515201974:web:25f6aaf377fac203986317',
  measurementId: 'G-4B2NCP9TZ0',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
