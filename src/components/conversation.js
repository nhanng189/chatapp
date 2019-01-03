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
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import Message from './message';
import '../styles/conversation.css';

class Conversation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputMessage: "",
      imageLink: "",
      soundTrack: "",
      streamTrack: ""
    }
  }

  onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;

    //Tracking image link in message
    let buffer = value.split(" ");
    buffer.forEach((str) => {
      let image = new Image();
      image.src = str;
      image.onload = () => {
        this.setState({
          imageLink: str
        });
      };
    })

    //Read background link in message
    if (value.includes("sudo dj", 0)) {
      let soundId = value.substring(8);
      let soundTrack = "https://www.nhaccuatui.com/mh/background/" + soundId
      this.setState({
        soundTrack: soundTrack
      })
    }

    this.setState({
      [name]: value
    })
  }

  sendMessage = () => {
    //Push message to database
    this.props.firebase.database().ref('/conversation/' + this.props.params.conversationId + '/chatHistory').push({
      time: moment().format('lll'),
      senderId: this.props.my.uid,
      message: this.state.inputMessage,
      imageLink: this.state.imageLink
    })

    //Push background music to database
    this.props.firebase.database().ref('/conversation/' + this.props.params.conversationId + '/config/soundTrack').set(this.state.soundTrack)

    //Update last message time of users
    this.props.firebase.database().ref('/users/' + this.props.user2.id + '/chatHistory/' + this.props.my.uid + '/lastMessageTime').set(moment().format())
    this.props.firebase.database().ref('/users/' + this.props.my.uid + '/chatHistory/' + this.props.user2.id + '/lastMessageTime').set(moment().format())

    //Reset default state
    this.setState({
      inputMessage: "",
      imageLink: "",
      soundTrack: ""
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.sendMessage();
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

  onUpload = (event) => {
    let selectedFile = event.target.files[0];
    let fileName = selectedFile.name;
    let storageRef = this.props.firebase.storage().ref('/images/' + fileName);
    let uploadTask = storageRef.put(selectedFile);

    uploadTask.on('state_changed', (snapshot) => {
    }, (error) => {

    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        let image = new Image();
        image.src = downloadURL;
        image.onload = () => {
          this.setState({
            inputMessage: "",
            imageLink: downloadURL
          });
          this.sendMessage();
        };
      });
    })
  }

  render() {
    let elements;
    if (this.props.messages) {
      elements = Object.values(this.props.messages).map((messageData) => {
        return <Message message={messageData.message} senderId={messageData.senderId}
          time={messageData.time} my={this.props.my} user2={this.props.user2}
          imageLink={messageData.imageLink} />
      })
    }
    else elements = "";
    return (
      <div className="conversation-container">
        <iframe style={{ display: "none" }} title="bkg" src={this.props.soundTrack} allow="autoplay"></iframe>
        <div className="messages-container">
          <ListItem className="conservation-title">
            <ListItemText><div className="conservation-user">{this.props.user2.displayName}</div></ListItemText>
          </ListItem>
          <Divider />
          <div className="message-container">
            <List component="nav">
              {elements}
            </List>
            <div className="dummy-div"
              ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>
        </div>
        <Grid container justify="center" spacing={8}>
          <Grid item xs={11}>
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
          </Grid>
          <Grid className="send-image" item xs={1}>
            <input style={{ display: "none" }} onChange={this.onUpload} accept="image" id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
        </Grid>
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
    messages: getVal(firebase, `data/conversation/${props.params.conversationId}/chatHistory`),
    soundTrack: getVal(firebase, `data/conversation/${props.params.conversationId}/config/soundTrack`),
  }))
)(Conversation);
