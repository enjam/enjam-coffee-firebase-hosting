import React, { Component } from 'react';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const MyPaper = props => (
  <Paper
    className="page"
    zDepth={0}
    style={{backgroundColor:'none', width: '100%', textAlign:'center'}}
    {...props}
  />
);

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
        <MyPaper>
          Coffee for likes
          <br/>
          Login to start brewing!
          <br/>
        </MyPaper>
        <p style={{margin: 10}}/>
        <RaisedButton
          label="login with facebook"
          onClick={this.signIn}
          secondary={true}
        />
        <MyPaper>
          <br/>
          We made an IoT coffee dispenser
          <br/>
          Browse the tabs to find out why
          <br/><br/>
          We use Facebook authentication to be able <br/> to give you coffee for your likes
        </MyPaper>
      </div>
    );
  }
}

export default Login;
