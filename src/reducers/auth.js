import * as types from './../actions/types'
import firebase from 'firebase'

var initialState = {};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGN_IN: {
            let base_provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(base_provider)
                .then(result => {})
                .catch(error => {})
            return state;
        }

        case types.SIGN_OUT: {
            firebase.auth().signOut()
            .then(result => {})
            .catch(error => {})
            return state;
        }

        default: return state;
    }
}

export default myReducer;