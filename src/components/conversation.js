import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, getVal } from 'react-redux-firebase';
import { compose } from 'redux';
import _ from 'lodash';

import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';

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
            senderId: this.props.my.uid,
            message: this.state.inputMessage
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
                    my={this.props.my} user2={this.props.user2} />
            })
        }
        else elements = "";

        return (
            <div className="conversation-container">
                <div className="message-container">
                    <List component="nav">
                        {elements}
                    </List>
                    <div className="dummy-div"
                        ref={(el) => { this.messagesEnd = el; }}>
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
