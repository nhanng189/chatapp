import React, { Component } from 'react';
import { connect } from 'react-redux'

import Signin from './components/signin'
import Home from './components/home'
import Loading from './components/loading'

class App extends Component {
  render() {
    if(!this.props.auth.isLoaded) return (
      <Loading />
    )
    if (this.props.auth.isEmpty) return (
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
