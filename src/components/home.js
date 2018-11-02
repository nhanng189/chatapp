import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';

import '../styles/home.css';
import * as actions from '../actions/index';

class Home extends Component {
//#region navibar
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
  }

  state = {
    anchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
//#endregion navibar

  onSignOut = (firebase) => {
    firebase.logout();
  }

  componentDidMount() {
    this.props.onListUser();
  }

  render() {
    console.log(this.props.firebase)
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right' }}
        transformOrigin={{ horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={()=>this.onSignOut(this.props.firebase)}>Sign out</MenuItem>
      </Menu>
    );

    return (
      <div >
        <AppBar position="static">
          <Toolbar>
            <IconButton className="menu-icon" color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className="app-title" variant="h4" color="inherit" noWrap>
              Chatugly
            </Typography>
            <div >
              <Button
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="avatar" src={this.props.auth.photoURL} />
                &nbsp;	&nbsp; <h6>{this.props.auth.displayName}</h6>
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListUser: () => {
      dispatch(actions.listUser());
    }
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(Home);
