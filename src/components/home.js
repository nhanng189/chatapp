import React, { Component } from 'react';

import AppBar from './appbar';
import Users from './users';

class Home extends Component {
  render() {
    return (
      <div >
        <AppBar />
        <Users />
      </div>
    );
  }
}

export default Home;
