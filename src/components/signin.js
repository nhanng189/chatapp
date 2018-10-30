import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import '../styles/signin.css';
import * as actions from '../actions/index';

class Signin extends Component {

  onSignIn = (event) => {
    event.preventDefault();
    this.props.onSignIn();
  }

  onSignOut = (event) => {
    event.preventDefault();
    this.props.onSignOut();
  }

  render() {
    return (
      <div className="background">
      <Grid container justify="center" alignItems="center">
        <Card className="card">
          <div className="card-content">
            <h2 className="text">Please sign in.</h2>
            <br/><br/>
            <Button size="large" variant="extendedFab" color="secondary">
              <img className="google" src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png" alt="google"/>
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
    onSignIn: () => {
      dispatch(actions.signIn());
    },
    onSignOut: () => {
      dispatch(actions.signOut());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
