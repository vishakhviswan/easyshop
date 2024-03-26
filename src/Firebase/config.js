import { initializeApp } from "firebase/app";
//import {getFirestore} from '@firebase/firestore'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7EvykyzA6LmK1Zbs4dcvqVidLvlXU0UU",
  authDomain: "eazyshop-72034.firebaseapp.com",
  projectId: "eazyshop-72034",
  storageBucket: "eazyshop-72034.appspot.com",
  messagingSenderId: "359959950255",
  appId: "1:359959950255:web:9c751229c4df04cb30355a",
  measurementId: "G-GF9ESF5MX5",

  // Teporary code
  // apiKey: "AIzaSyDWycQOelYV1IOBA0-jvT_KH4FTmgnKbhs",
  // authDomain: "temp-project-5383d.firebaseapp.com",
  // projectId: "temp-project-5383d",
  // storageBucket: "temp-project-5383d.appspot.com",
  // messagingSenderId: "12711419438",
  // appId: "1:12711419438:web:000c87fbe6aed4076ac9bf",
  // measurementId: "G-DL96GJ8HH2"
};


const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
export const storage = getStorage(firebase)
export default db;
// Teporary code
  // apiKey: "AIzaSyDWycQOelYV1IOBA0-jvT_KH4FTmgnKbhs",
  // authDomain: "temp-project-5383d.firebaseapp.com",
  // projectId: "temp-project-5383d",
  // storageBucket: "temp-project-5383d.appspot.com",
  // messagingSenderId: "12711419438",
  // appId: "1:12711419438:web:000c87fbe6aed4076ac9bf",
  // measurementId: "G-DL96GJ8HH2"