import React, { Component } from 'react';
import { connect } from 'react-redux'

import Signin from './components/signin'
import Home from './components/home'
import Loading from './components/loading'

class App extends Component {
  render() {
    if(!this.props.firebase.isLoaded || !this.props.profile.isLoaded) return (
      <Loading />
    )
    if (this.props.firebase.isEmpty) return (
      <Signin />
    ); 
    return <Home />;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    firebase: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
