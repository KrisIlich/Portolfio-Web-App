import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getMessaging } from 'firebase/messaging';
import { collection, addDoc } from 'firebase/firestore';





// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIGMmuK0t8-DxJFnpur6OG291i9g3jm_Y",
    authDomain: "tanktalk-webapp.firebaseapp.com",
    databaseURL: "https://tanktalk-webapp-default-rtdb.firebaseio.com",
    projectId: "tanktalk-webapp",
    storageBucket: "tanktalk-webapp.appspot.com",
    messagingSenderId: "186788196260",
    appId: "1:186788196260:web:554baed350e5ad0224db31",
    measurementId: "G-DHS1ZXG073"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app);
const messaging = getMessaging(app);

// Export Firebase instances for use in your application
export {
    app,
    analytics,
    db,
    auth,
    storage,
    functions,
    messaging,
};

