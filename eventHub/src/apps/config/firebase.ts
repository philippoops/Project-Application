// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
// Importing firbase/auth
import 'firebase/auth';
// import the firebase storage
import 'firebase/storage';
// import firebase database it refer to realtime databse
import 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // this process in API key used to hide the api key when the file upload on GitHub
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'eventhub-e4721.firebaseapp.com',
  projectId: 'eventhub-e4721',
  databaseURL: 'https://eventhub-e4721-default-rtdb.firebaseio.com',
  storageBucket: 'eventhub-e4721.appspot.com',
  messagingSenderId: '296542945639',
  appId: '1:296542945639:web:b168e681eb2f13a16a6fc2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// use the getFirestore that has full package not the LITE version because the LITE version has limited function
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const fb = getDatabase(app);
