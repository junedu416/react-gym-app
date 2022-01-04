import firebaseAdmin from "firebase-admin";
import "@firebase/auth";
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";

require("dotenv").config();

export default function app() {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    ),
    storageBucket: "gs://gym-app-t3a2.appspot.com",
  });
}

export function initializeAppClient() {
  initializeApp(JSON.parse(process.env.FIREBASE_CLIENT_CONFIG));
}

// export const app = () => { firebase.initializeApp({
//     credential: firebaseAdmin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)),
//     storageBucket: "gs://gym-app-t3a2.appspot.com"
//   })
// }


// export const auth = app.auth();

//export storage bucket
// export const storage = firebaseAdmin.storage().bucket();