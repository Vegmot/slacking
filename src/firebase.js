import firebase from 'firebase'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

const fbApp = firebase.initializeApp(config)
const db = fbApp.firestore()
const chCollection = db.collection('channels')
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, chCollection, auth, provider }
