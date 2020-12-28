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

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  //The userAuth object is used to query the DB for a document reference object
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  //get the snapShot from doc ref object, even if it doesn't exist
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      //creating a new document object inside the userRef
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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch(); //send all the requests together
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    // get a doc at an empty string. making a new doc ref in this colleciton and randomly generate me an ID
    batch.set(newDocRef, obj); // doc ref and the value that we wanna set it to
  });

  return await batch.commit();
  //fire off our batch request and return a promise
};

//We want to convert this array Snapshot into an object
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      //pass string into encordeURI to turn it into a URL friendly thing
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id, //this property belongs on the snapshot obj
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
