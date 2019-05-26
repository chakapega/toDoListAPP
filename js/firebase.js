//Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAlpRLThwjE9-twmBMRN2J7xLhm2pQjA4o",
  authDomain: "to-do-list-4bfa0.firebaseapp.com",
  databaseURL: "https://to-do-list-4bfa0.firebaseio.com",
  projectId: "to-do-list-4bfa0",
  storageBucket: "to-do-list-4bfa0.appspot.com",
  messagingSenderId: "206114869556",
  appId: "1:206114869556:web:5ba3c68e76373167"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();