import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Provider } from "react-redux";
import rootStore from "./stores/rootStore";

// Connect to the firebase project
firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
});

// Called whenever the auth state changes (registers, logs in, logs out, page loads)
firebase.auth().onAuthStateChanged(user => {
  // If there is a user
  if (user) {
    // Get that user's data from the database
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then(userData =>
        // Update Redux with that user data
        rootStore.dispatch({ type: "UPDATE_USER", user: userData.data() })
      );
  } else {
    // Update Redux with a null user
    rootStore.dispatch({ type: "UPDATE_USER", user: null });
  }
});

// Render the app wrapping it with Redux
ReactDOM.render(
  <Provider store={rootStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
