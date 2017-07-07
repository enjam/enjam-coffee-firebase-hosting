import React, { Component } from 'react';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {

  signIn() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(res => {
      //console.log(res);
    }).catch(e => {
      throw e;
    });
  }

  render() {
    return (
      <div style={{display:'flex', justifyContent: 'center'}}>
        <RaisedButton style={{}} label="login" onClick={this.signIn}/>
      </div>
    );
  }
}

export default Login;