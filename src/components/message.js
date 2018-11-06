import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import '../styles/message.css';

class Message extends Component {
    render() {
        if (this.props.senderId === this.props.my.uid) return (
            <Tooltip title={this.props.time} placement="top-start">
                <ListItem button className="my-message">
                    <ListItemText primary={this.props.message} />
                    <Avatar alt="avatar" src={this.props.my.photoURL} />
                </ListItem>
            </Tooltip>
        );
        return <Tooltip title={this.props.time} placement="top-end">
            <ListItem button>
                <Avatar alt="avatar" src={this.props.user2.avatarUrl} />
                <ListItemText primary={this.props.message} />
            </ListItem>
        </Tooltip>
    }
}

export default compose(
    firebaseConnect(),
    connect()
)(Message);
