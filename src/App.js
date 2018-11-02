import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';

import Signin from './components/signin'
import Home from './components/home'
import Loading from './components/loading'

class App extends Component {
  render() {
    if(!isLoaded(this.props.auth)) return (
      <Loading />
    )
    if (isEmpty(this.props.auth)) return (
      <Signin />
    ); 
    return <Home />;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {}
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(App);
