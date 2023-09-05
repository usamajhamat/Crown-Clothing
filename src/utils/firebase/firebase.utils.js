import {initializeApp} from 'firebase/app';
import{
    getAuth,
    
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
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
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCF30YWpNtcwu9zMFEa2tM0xgV15pDg-BA",
    authDomain: "crown-clothing-db-3c216.firebaseapp.com",
    projectId: "crown-clothing-db-3c216",
    storageBucket: "crown-clothing-db-3c216.appspot.com",
    messagingSenderId: "303058212648",
    appId: "1:303058212648:web:cdbf22313497d89ba6a21d"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const googleProvider= new GoogleAuthProvider();
  googleProvider.getCustomParameters({
    prompt:"select-account"
  });
  export const auth= getAuth();
  export const signInWithGoodlePopup=()=>signInWithPopup(auth,googleProvider);
 
  export const db= getFirestore();

  export const addCollectionAndDocuments= async (
    collectionKey,
     objectsToAdd
     )=>{
    const collectionRef = collection(db, collectionKey );
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });
    await batch.commit();
    console.log('Done');
  };
 

  export const getCatagoriesAndDocuments = async ()=>{
    const collectionRef = collection(db, 'catagories');
    const q = query(collectionRef);
    
    const querySnapshot = await getDocs(q);
    const catagoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
      const{items, title} = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
    return catagoryMap;
  }
  export const createUserDocumentFromAuth = async(userAuth,
     additionalInformation={}
     )=>{
    if(!userAuth) return;
    const userDocRef= doc(db,'users', userAuth.uid);
    console.log(userDocRef);
    
    const userSnapshot= await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists())
    
    if(!userSnapshot.exists()){
      const {displayName, email}= userAuth;
      const createdAt= new Date();

      try{
        await setDoc(userDocRef,
          {displayName,
            email,
            createdAt,
          ...additionalInformation 
          })
      } catch(error){
        console.log('error creating the user', error.message)
      }
      
    }
    return userDocRef;

 
  };

  export const createAuthUserWithEmailAndPassword=async(email,password)=>{
    if(!email ||  !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);

  };
  export const signInAuthUserWithEmailAndPassword=async(email,password)=>{
    if(!email ||  !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
    
  };
  export const SignOutUser=async()=> await signOut(auth);
  export const onAuthStateChangedListner=(callback)=>
    onAuthStateChanged(auth,callback);
   