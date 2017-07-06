import React, { Component } from 'react';
import * as firebase from 'firebase';
import Login from './Login';
import CoffeeLoggedIn from './CoffeeLoggedIn';

class Coffee extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
    });
  }

  render() {
    if (!this.state.user) {
      return <Login/>;
    } else {
      return <CoffeeLoggedIn user={this.state.user}/>;
    }
  }
}

export default Coffee;
