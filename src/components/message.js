import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import '../styles/message.css';

class Message extends Component {
    render() {
        if (this.props.senderId === this.props.my.uid) return (
            <div>
                <Tooltip title={this.props.time} placement="top-end">
                    <ListItem className="my-message">
                        <div className="message-content">{this.props.message}</div>
                        <Avatar alt="avatar" src={this.props.my.photoURL} />
                    </ListItem>
                </Tooltip>
                {this.props.imageLink !== "" ? <ListItem className="my-message">
                    <img className="message-content" style={{ maxWidth: "50%" }} alt="thumbnail" src={this.props.imageLink} />
                    <Avatar />
                </ListItem> : ""}
            </div>
        );
        return <div>
            <Tooltip title={this.props.time} placement="top-start">
                <ListItem className="user2-message">
                    <Avatar alt="avatar" src={this.props.user2.avatarUrl} />
                    <div className="message-content">{this.props.message}</div>
                </ListItem>
            </Tooltip>
            {this.props.imageLink !== "" ? <ListItem className="user2-message">
                <Avatar />
                <img className="message-content" style={{ maxWidth: "50%" }} alt="thumbnail" src={this.props.imageLink} />
            </ListItem> : ""}
        </div>
    }
}

export default compose(
    firebaseConnect(),
    connect()
)(Message);
