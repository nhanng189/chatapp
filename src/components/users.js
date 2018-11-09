import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import _ from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Conversation from "./conversation";
import '../styles/users.css';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      presence: {},
      user2: {},
      displayUsers: []
    }
  }

  onChange = (event) => {
    let updatedList = this.state.users;
    updatedList = updatedList.filter((item) => {
      return item.displayName.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ displayUsers: updatedList })
  }

  handleListItemClick = (user2) => {
    this.setState({
      user2: user2
    });
  };

  generateConversationId = (user1Id, user2Id) => {
    if (user1Id < user2Id) return `${user1Id}-${user2Id}`
    return `${user2Id}-${user1Id}`;
  }

  componentWillMount() {
    //Get list presence users
    this.props.firebase.database().ref('/presence/').on('value', (data) => {
      let presence = data.val();
      this.setState({
        presence: presence
      })
    })

    //Get list ordered users
    this.props.firebase.database().ref('/users/').on('value', (data) => {
      let users = _.map(data.val(), (val, id) => {
        return { ...val, id: id }
      })

      //Add chatHistory data in case of undefined
      users.forEach(async (user) => {
        if (typeof user.chatHistory === 'undefined') user.chatHistory = {};
        if (typeof user.chatHistory[this.props.auth.uid] === 'undefined') user.chatHistory[this.props.auth.uid] = {};
        if (typeof user.chatHistory[this.props.auth.uid].lastMessageTime === 'undefined') user.chatHistory[this.props.auth.uid].lastMessageTime = "";
      })

      //Ordered users by chat history
      users = _.orderBy(users, `chatHistory.${this.props.auth.uid}.lastMessageTime`, 'desc');

      this.setState({
        users: users,
        displayUsers: users
      })

      //If no user is selected, set first user as default
      if (!this.state.user2.id) this.setState({
        user2: users[0]
      })
    })
  }

  render() {
    
    //Generate listItem of each user
    let elements = this.state.displayUsers.map((user) => {
      return (
        <ListItem divider button onClick={() => this.handleListItemClick(user)}>
          <Avatar alt="avatar" src={user.avatarUrl} />

          {/* //Check if user is online */}
          {_.has(this.state.presence, user.id) === true
            ? <ListItemText primary={user.displayName} secondary={<i className="fa fa-circle user-online">&nbsp;&nbsp;Online</i>} />
            : <ListItemText primary={user.displayName} secondary={<i className="fa fa-circle user-offline">&nbsp;&nbsp;Last seen: {user.lastOnline}</i>} />}
        </ListItem>
      );
    });

    return (
      <div className="user-container">
        <Grid className="user-grid-container" container justify="center" spacing={8}>
          <Grid item xs={3}>
            <TextField fullWidth margin="normal" variant="outlined"
              name="search"
              value={this.state.search}
              placeholder="Search user"
              onChange={this.onChange}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
            <List component="nav">
              {elements}
            </List>
          </Grid>
          <Grid item xs={9}>
            <Conversation my={this.props.auth} user2={this.state.user2}
              params={{ conversationId: this.generateConversationId(this.props.auth.uid, this.state.user2.id) }} />
          </Grid>
        </Grid>
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
)(Users);
