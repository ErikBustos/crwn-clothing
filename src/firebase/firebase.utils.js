import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config= {
    apiKey: "AIzaSyAVY_gi7mQfzlm9GahFqDAqKfqKkg6EbPU",
    authDomain: "crwn-clothing-db-969d7.firebaseapp.com",
    databaseURL: "https://crwn-clothing-db-969d7.firebaseio.com",
    projectId: "crwn-clothing-db-969d7",
    storageBucket: "crwn-clothing-db-969d7.appspot.com",
    messagingSenderId: "853932587658",
    appId: "1:853932587658:web:2e5f746e34ea601ad48b73",
    measurementId: "G-JKWCE5ZRZX"
  };

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc( `users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt= new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(err){
      console.log('error creating user: ', err.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth= firebase.auth();
export const firestore= firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle= () => auth.signInWithPopup(provider);

export default firebase;