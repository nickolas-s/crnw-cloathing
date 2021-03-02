// This base import loads the firebase namespace along with all its type information
import firebase from 'firebase/app';
// These imports load individual services into the firebase namespace
import 'firebase/firestore';
import 'firebase/auth';

// App config creacted when new project is added to Firebase
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

// Initialize Firebase
firebase.initializeApp(config);

// export Firebase products
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Get or Create user porfile
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // console.log(userRef);
  // console.log(snapShot);

  // create a new user if does not exist on the database
  if (!snapShot.exists) {
    console.log('creating new user');

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

// Add new collection to Firestore database
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    console.log(obj);
    batch.set(newDocRef, obj);
  });

  return batch.commit();
};

// Convert the array data fatched from the firestore database to an object
export const convertCollectionsSnapshotToMap = (collections) => {
  const transfomedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transfomedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    const unsusbcribe = auth.onAuthStateChanged((userAuth) => {
      unsusbcribe();
      resolve(userAuth);
    }, reject);
  });

// Google authentication set up
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
