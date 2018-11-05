import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import '../styles/message.css';

class Message extends Component {
    render() {
        if(this.props.senderId === this.props.my.uid) return (
            <ListItem style={{textAlign: "right"}}> 
                <ListItemText primary={this.props.message}/>
                <Avatar alt="avatar" src={this.props.my.photoURL}/>
            </ListItem>
        );
        return <ListItem>
            <Avatar alt="avatar" src={this.props.user2.avatarUrl}/>
            <ListItemText primary={this.props.message}/>
        </ListItem>
    }
}

export default compose(
    firebaseConnect(),
    connect()
)(Message);
