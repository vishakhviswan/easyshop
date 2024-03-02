// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7EvykyzA6LmK1Zbs4dcvqVidLvlXU0UU",
  authDomain: "eazyshop-72034.firebaseapp.com",
  projectId: "eazyshop-72034",
  storageBucket: "eazyshop-72034.appspot.com",
  messagingSenderId: "359959950255",
  appId: "1:359959950255:web:9c751229c4df04cb30355a",
  measurementId: "G-GF9ESF5MX5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
