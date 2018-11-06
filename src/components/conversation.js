import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, getVal } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';

import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Message from './message';
import '../styles/conversation.css';

class Conversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputMessage: ""
        }
    }

    onChange = (event) => {
        var target = event.target;
        var value = target.value;
        var name = target.name;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.firebase.database().ref('/conversation/' + this.props.params.conversationId).push({
            time: moment().format('lll'),
            senderId: this.props.my.uid,
            message: this.state.inputMessage
        })
        this.props.firebase.database().ref('/users/' + this.props.user2.id + '/chatHistory/' + this.props.my.uid).set({
            lastMessageTime: moment().format()
        })
        this.props.firebase.database().ref('/users/' + this.props.my.uid + '/chatHistory/' + this.props.user2.id).set({
            lastMessageTime: moment().format()
        })
        this.setState({
            inputMessage: ""
        })
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        let elements;
        if (this.props.messages) {
            elements = Object.values(this.props.messages).map((messageData) => {
                return <Message message={messageData.message} senderId={messageData.senderId}
                    time={messageData.time} my={this.props.my} user2={this.props.user2} />
            })
        }
        else elements = "";

        return (
            <div className="conversation-container">
                <div className="messages-container">
                    <ListItem className="conservation-title">
                        <ListItemText>{this.props.user2.displayName}</ListItemText>
                    </ListItem>
                    <Divider/>
                    <div className="message-container">
                        <List component="nav">
                            {elements}
                        </List>
                        <div className="dummy-div"
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        name="inputMessage"
                        value={this.state.inputMessage}
                        placeholder="Type something"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.onChange}
                    />
                </form>
            </div>
        );
    }
}

export default compose(
    firebaseConnect((props) => {
        return [
            { path: `conversation/${props.params.conversationId}` }
        ]
    }),
    connect(({ firebase }, props) => ({
        messages: getVal(firebase, `data/conversation/${props.params.conversationId}`),
    }))
)(Conversation);
