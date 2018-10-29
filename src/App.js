import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { compose } from 'redux'
// import { firebaseConnect } from 'react-redux-firebase'

import Signin from './components/signin'
import Home from './components/home'

class App extends Component {
  render() {
    if (this.props.profile.isEmpty) return (
      <Signin />
    );
    return (
      <div>
        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <Home />
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
