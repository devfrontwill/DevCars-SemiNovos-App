import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBh_BuKgQ40DX7ZANaT0F7DXAUxxUnJixA",
    authDomain: "devmotors-ebd8a.firebaseapp.com",
    projectId: "devmotors-ebd8a",
    storageBucket: "devmotors-ebd8a.appspot.com",
    messagingSenderId: "817894958107",
    appId: "1:817894958107:web:91d7dadc6586e0788844be"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };