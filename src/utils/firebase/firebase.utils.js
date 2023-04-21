import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    DocumentSnapshot,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWIXPhY_2cXo2s5ZPB1O08Q5shLlDKt0w",
    authDomain: "crwn-clothing-db-a0e59.firebaseapp.com",
    projectId: "crwn-clothing-db-a0e59",
    storageBucket: "crwn-clothing-db-a0e59.appspot.com",
    messagingSenderId: "1051615285681",
    appId: "1:1051615285681:web:073c5a25c7e4bfd13ced90"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    });

    await batch.commit();
    console.log('done')
}
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
}
export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    ) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email }= userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email ||!password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = ( callback ) => onAuthStateChanged(auth, callback);
  