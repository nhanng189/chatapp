import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

import auth from './auth';
import users from './users';

// Add firebase to reducers
const rootReducer = combineReducers({
    users: users,
    // auth: auth,
    firebase: firebaseReducer
})

export default rootReducer;