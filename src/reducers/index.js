import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer
})

export default rootReducer;