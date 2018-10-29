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
      <Grid container justify="center" alignItems="center">
        <Card className="card">
          <div className="card-content">
            <h2>Please sign in.</h2>
            <br/><br/>
            <Button size="large" variant="extendedFab" color="secondary">
              Sign in with Google
            </Button>
          </div>
        </Card>
      </Grid>
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
