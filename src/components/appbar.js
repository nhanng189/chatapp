import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';

import '../styles/appbar.css';

class Appbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
  }

  state = {
    anchorEl: null,
  };

  componentWillMount() {
    var lastOnlineRef = this.props.firebase.database().ref('users/' + this.props.auth.uid + '/lastOnline');
    var connectedRef = this.props.firebase.database().ref('.info/connected');
    connectedRef.on('value', function (snap) {
      if (snap.val() === true) {
        lastOnlineRef.onDisconnect().set(moment().format('lll'));
      }
    });
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  onSignOut = (firebase) => {
    firebase.logout();
  }

  render() {
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
        <MenuItem onClick={() => this.onSignOut(this.props.firebase)}>Sign out</MenuItem>
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

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, null)
)(Appbar);
