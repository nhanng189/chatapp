import * as types from './../actions/types'
import { getFirebase } from 'react-redux-firebase';

var initialState = [];

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_USER: {
            const firebase = getFirebase();
            console.log(firebase)
            return state;
        }

        default: return state;
    }
}

export default myReducer;