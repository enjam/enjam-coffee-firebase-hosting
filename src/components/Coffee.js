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
    let content;    
    if (!this.state.user) {
      content = (<Login/>);
    } else {
      content = (<CoffeeLoggedIn user={this.state.user}/>);
    }
    return (
      <div className="flex-center">
        {content}
      </div>
    );
    
  }
}

export default Coffee;
