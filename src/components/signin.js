import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import '../styles/signin.css';
import { compose } from 'redux';

class Signin extends Component {
  onSignIn = (firebase) => {
    firebase.login({ provider: 'google', type: 'popup' });
  }

  render() {
    return (
      <div>
        <div className="signin-app-title">Chatugly</div>
        <Grid container justify="center" alignItems="center">
          <Card className="card">
            <div className="card-content">
              <h4 className="text">Please sign in.</h4>
              <br />
              <Button size="large" variant="extendedFab" color="secondary" onClick={()=>this.onSignIn(this.props.firebase)}>
                <img className="google" src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png" alt="google" />
                &nbsp;	&nbsp; 	&nbsp; <h6>Sign in with Google</h6>
              </Button>
            </div>
          </Card>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
}

export default compose(
  firebaseConnect(), //can use this.props.firebases
  connect(mapStateToProps, mapDispatchToProps)
)(Signin);
