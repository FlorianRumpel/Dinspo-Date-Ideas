import firebase from "firebase/compat/app";
import {getDatabase} from "firebase/database";
import {getAnalytics, isSupported} from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBom4P4lL0KRuJlgqRJNRgzZr3jq6fjyL8",
  authDomain: "dinspo-4ea87.firebaseapp.com",
  databaseURL: "https://dinspo-4ea87-default-rtdb.firebaseio.com",
  projectId: "dinspo-4ea87",
  storageBucket: "dinspo-4ea87.appspot.com",
  messagingSenderId: "477972539535",
  appId: "1:477972539535:web:541f92ccb9acf89ed6e8fa",
  measurementId: "G-W3LH1P677X",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = getDatabase();
// isSupported(getAnalytics());

export {firebase, db};
