import firebase from 'firebase'

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyDiMCxMvyLOFyy0fy0wrgNVyLmE1ZNI-YA',
  authDomain: 'deliveryapp-amostra.firebaseapp.com',
  projectId: 'deliveryapp-amostra',
  storageBucket: 'deliveryapp-amostra.appspot.com',
  messagingSenderId: '147922257926',
  appId: '1:147922257926:web:2cb55726652e7ac8139b87'
});

  const db = firebase.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()
  const functions = firebase.functions()

export  {db , auth, storage, functions, firebaseConfig}