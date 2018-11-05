import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAvYBWtias8lmveuHQ18cVNSxUYztB29sc",
    authDomain: "chatapp-5ff4e.firebaseapp.com",
    databaseURL: "https://chatapp-5ff4e.firebaseio.com",
    projectId: "chatapp-5ff4e",
    storageBucket: "chatapp-5ff4e.appspot.com",
    messagingSenderId: "633952756016"
}
firebase.initializeApp(firebaseConfig)

// react-redux-firebase options
const config = {
    userProfile: 'users', // firebase root where user profiles are stored
    presence: 'presence', // where list of online users is stored in database
    enableLogging: true, // enable/disable Firebase's database logging
    attachAuthIsReady: true,
    firebaseStateName: 'firebase'
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, config),
    applyMiddleware(thunk.withExtraArgument(getFirebase))
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('root'));
})

serviceWorker.unregister();
