import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBu4h0Jo8sQNLMBoIQmeN0wBoHfx75kbpA",
    authDomain: "catch-of-the-day---emi.firebaseapp.com",
    databaseURL: "https://catch-of-the-day---emi-default-rtdb.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp };

// Default export
export default base;