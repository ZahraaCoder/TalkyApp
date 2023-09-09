import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCM7X5ooO2MUc2Lpc2AAJif42VYUlBYzKg",
  authDomain: "chat-app-4de4f.firebaseapp.com",
  projectId: "chat-app-4de4f",
  storageBucket: "chat-app-4de4f.appspot.com",
  messagingSenderId: "735593560651",
  appId: "1:735593560651:web:47ddff1ac980b32ec6abce"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export default firebase.firestore()

