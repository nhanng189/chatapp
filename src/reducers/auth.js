import * as types from './../actions/types'
import firebase from 'firebase'

var initialState = {};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGN_IN: {
            let base_provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(base_provider)
                .then(() => {
                    let generateUserId = firebase.auth().currentUser.email.substring(0, firebase.auth().currentUser.email.indexOf("@"));
                    firebase.database().ref('/users/' + generateUserId).set({
                        email: firebase.auth().currentUser.email,
                        name: firebase.auth().currentUser.displayName,
                        avatar: firebase.auth().currentUser.photoURL
                    })
                })
            return state;
        }

        case types.SIGN_OUT: {
            firebase.auth().signOut()
            // .then(result => {})
            // .catch(error => {})
            return state;
        }

        default: return state;
    }
}

export default myReducer;