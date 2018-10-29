import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class Home extends Component {
  render() {
    console.log(this.props.authData.isEmpty);
    if(this.props.authData.isEmpty) return (
      <div className="container">
        Chua dang nhap ahihi
      </div>
    );
    return (
      <div className="container">
        <img style={{borderRadius: "50%", width: "100px", height: "100px"}} src={this.props.authData.avatarUrl} className="img-responsive" alt="Image" />
        <h3>{this.props.authData.displayName}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authData: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
