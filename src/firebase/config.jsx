import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYVR9ChDdEkpE3JlSVuYzmKi1y_xAUP5U",
  authDomain: "avaliacao-lifedev-hugo.firebaseapp.com",
  projectId: "avaliacao-lifedev-hugo",
  storageBucket: "avaliacao-lifedev-hugo.firebasestorage.app",
  messagingSenderId: "591707868810",
  appId: "1:591707868810:web:445e222a21f48f21396773",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
