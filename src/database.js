import firebase from 'firebase/app';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyBpfc1n3tPEmQzo8--PMspeY1-KPVCcSgA",
  authDomain: "votingapp-46f38.firebaseapp.com",
  databaseURL: "https://votingapp-46f38.firebaseio.com",
  projectId: "votingapp-46f38",
  storageBucket: "votingapp-46f38.appspot.com",
  messagingSenderId: "64114253892"
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
