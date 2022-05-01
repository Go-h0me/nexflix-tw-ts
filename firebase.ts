// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyATQgVSZXZE42V7ss673wrBaaOCmhlch8E',
  authDomain: 'nexflix-tw.firebaseapp.com',
  projectId: 'nexflix-tw',
  storageBucket: 'nexflix-tw.appspot.com',
  messagingSenderId: '523919629145',
  appId: '1:523919629145:web:39ed39c0402149e9a24a48',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore()

const auth = getAuth()

export default app
export { auth, db }
