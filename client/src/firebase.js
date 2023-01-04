// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "final-project-mern.firebaseapp.com",
  projectId: "final-project-mern",
  storageBucket: "final-project-mern.appspot.com",
  messagingSenderId: "833560450313",
  appId: "1:833560450313:web:04253a64fe566f1a9b6fd8",
  measurementId: "G-77PL67E7XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app)






// const initializeAppIfNecessary = () => {
//   try {
//     return getApp()
//   } catch {
//     return initializeApp(firebaseConfig)
//   }
// }
// let app = initializeAppIfNecessary()
// const clientAuth = getAuth(app)