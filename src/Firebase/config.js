import { initializeApp } from "firebase/app";
//import {getFirestore} from '@firebase/firestore'
import { getFirestore } from "firebase/firestore";
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

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
export default db;

  