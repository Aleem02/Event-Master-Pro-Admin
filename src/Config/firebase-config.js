import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA30Bwf4SiMXF_YuIsKIwWa_UUHE_7_Ijc",
  authDomain: "fir-demo-36a54.firebaseapp.com",
  projectId: "fir-demo-36a54",
  storageBucket: "fir-demo-36a54.appspot.com",
  messagingSenderId: "511951819162",
  appId: "1:511951819162:web:8953b7c94437a53648ea23",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
