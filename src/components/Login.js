import React, { Component } from 'react';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

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
      <div className="margin-body flex-column">
        <Paper className="page" zDepth={0} style={{backgroundColor:'none', width: '100%', textAlign:'center'}}>
          It's simple: Coffee for likes!
          <br/>
          We made an internet connected instant coffee dispenser.
          <br/>
          Browse the tabs above if you want to know why.
        </Paper>
        <p style={{margin: 5}}/>
        <RaisedButton
          label="login with facebook"
          onClick={this.signIn}
          secondary={true}
        />
      </div>
    );
  }
}

export default Login;
