import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyACgjGAK2pHfz1gpsrV_oGxIGqyqKKnimE",
  authDomain: "st-school-5f262.firebaseapp.com",
  projectId: "st-school-5f262",
  storageBucket: "st-school-5f262.firebasestorage.app",
  messagingSenderId: "1004382985275",
  appId: "1:1004382985275:web:45b1e90861ffe64ad0d01e",
  measurementId: "G-2BKVXLN72F"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)