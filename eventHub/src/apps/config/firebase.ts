// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // this process in API key used to hide the api key when the file upload on GitHub
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'eventhub-e4721.firebaseapp.com',
  projectId: 'eventhub-e4721',
  storageBucket: 'eventhub-e4721.appspot.com',
  messagingSenderId: '296542945639',
  appId: '1:296542945639:web:b168e681eb2f13a16a6fc2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// use the getFirestore that has full package not the LITE version because the LITE version has limited function
export const db = getFirestore(app);
