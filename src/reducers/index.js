import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

import auth from './auth';

// Add firebase to reducers
const rootReducer = combineReducers({
    auth: auth,
    firebase: firebaseReducer
})

export default rootReducer;