import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let config = {
  apiKey: "AIzaSyBpfc1n3tPEmQzo8--PMspeY1-KPVCcSgA",
  authDomain: "votingapp-46f38.firebaseapp.com",
  databaseURL: "https://votingapp-46f38.firebaseio.com",
  projectId: "votingapp-46f38",
  storageBucket: "votingapp-46f38.appspot.com",
  messagingSenderId: "64114253892"
};
export const fire = firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export const database = firebase.database();
export const auth = firebase.auth();
