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
      selectedIndex: 0,
      users: [],
      presence: {}
    }
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  generateConversationId = (user1Id, user2Id) => {
    if (user1Id < user2Id) return `${user1Id}-${user2Id}`
    return `${user2Id}-${user1Id}`;
  }

  onSubmit = (event) => {
    event.preventDefault();
  }

  componentWillMount() {
    this.props.firebase.database().ref('/presence/').on('value', (data) => {
      let presence = data.val();
      this.setState({
        presence: presence
      })
    })
    this.props.firebase.database().ref('/users/').on('value', (data) => {
      let users = _.map(data.val(), (val, id) => {
        return { ...val, id: id }
      })
      this.setState({
        users: users
      })
    })
    console.log(this.props.firebase)
  }

  render() {
    let elements = this.state.users.map((user, index) => {
      return <ListItem
        button
        selected={this.state.selectedIndex === index}
        onClick={event => this.handleListItemClick(event, index)}
      >
        <Avatar alt="avatar" src={user.avatarUrl} />
        {_.has(this.state.presence, user.id) === true
          ? <ListItemText primary={user.displayName} secondary={<i style={{ color: "green", paddingTop: "5px" }} className="fa fa-circle">&nbsp;&nbsp;Online</i>} />
          : <ListItemText primary={user.displayName} secondary={<i style={{ color: "red", paddingTop: "5px" }} className="fa fa-circle">&nbsp;&nbsp;Offline</i>} />}
      </ListItem>
    });

    return (<div className="user-container">
      <Grid className="user-grid-container" container justify="center" spacing={8}>
        <Grid item xs={3}>
          <form className="search" onSubmit={this.onSubmit}>
            <TextField
              placeholder="Search user"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </form>
          <List component="nav">
            {elements}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Conversation my={this.props.auth} user2={Object.assign({}, this.state.users[this.state.selectedIndex])} params={{ conversationId: this.generateConversationId(this.props.auth.uid, Object.assign({}, this.state.users[this.state.selectedIndex]).id) }} />
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
