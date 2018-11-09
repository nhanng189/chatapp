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

    constructor(props) {
        super(props);
        this.state = {
            imageLink: ""
        }
    }

    componentWillMount() {
        let image = new Image();
        image.src = this.props.message;
        image.onload = () => {
            this.setState({
                imageLink: this.props.message
            })
        };
        image.onerror = () => {
            this.setState({
                imageLink: ""
            })
        }
    }

    render() {
        if (this.props.senderId === this.props.my.uid) return (
            <div>
                <Tooltip title={this.props.time} placement="top-start">
                    <ListItem className="my-message">
                        <ListItemText primary={this.props.message} />
                        <Avatar alt="avatar" src={this.props.my.photoURL} />
                    </ListItem>
                </Tooltip>
                {this.state.imageLink !== "" ?  <ListItem className="my-message"><img alt="aa" src={this.state.imageLink} /></ListItem> : ""}
            </div>
        );
        return <Tooltip title={this.props.time} placement="top-start">
            <ListItem >
                {this.state.imageLink !== "" ? <div>asdasdasd</div> : ""}
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
