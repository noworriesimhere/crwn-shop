import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDwnxabdX1i5v_tcObLA77VPDF9xnAJQ0Y',
  authDomain: 'crwn-db-67fc7.firebaseapp.com',
  projectId: 'crwn-db-67fc7',
  storageBucket: 'crwn-db-67fc7.appspot.com',
  messagingSenderId: '654228904253',
  appId: '1:654228904253:web:40ab03c566b1efe4790d54',
  measurementId: 'G-XJX03E54RR',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
