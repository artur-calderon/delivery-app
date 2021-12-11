// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  addDoc,
  query,
  where
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDiMCxMvyLOFyy0fy0wrgNVyLmE1ZNI-YA',
  authDomain: 'deliveryapp-amostra.firebaseapp.com',
  projectId: 'deliveryapp-amostra',
  storageBucket: 'deliveryapp-amostra.appspot.com',
  messagingSenderId: '147922257926',
  appId: '1:147922257926:web:2cb55726652e7ac8139b87'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {
  app,
  db,
  auth,
  provider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  query,
  where
}
