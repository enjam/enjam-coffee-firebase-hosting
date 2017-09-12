import React, { Component } from 'react';
import * as firebase from 'firebase';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

class DurationListItem extends Component {
  constructor(){
    super();
    this.state = {
      avatar: null,
      name: null,
    };
  }

  componentDidMount(){
    this.rootRef = firebase.database().ref();
    this.rootRef.child('face2fire')
      .child(this.props.fbUid)
      .once('value')
      .then(snap => {
        const userRef = this.rootRef
          .child('users')
          .child(snap.val());
        userRef.child('photoURL').once('value')
          .then(snap => this.setState(prevState => ({
              ...prevState,
              avatar: snap.val(),
          })));
        userRef.child('displayName').once('value')
          .then(snap => this.setState(prevState => ({
              ...prevState,
              name: snap.val(),
          })));
      });
  }

  componentWillUnmount(){
    this.rootRef.off();
  }

  render(){
    const {duration, number} = this.props;
    const {avatar, name} = this.state;
    return (
      <ListItem
        rightAvatar={<Avatar>{number}</Avatar>}
        leftAvatar={<Avatar src={avatar}/>}
        primaryText={name}
        secondaryText={duration ? (duration / 1000) + ' s' : ''}
        disabled={true}
      />
    );
  }
}

class DurationHighscoreList extends Component {
  constructor(){
    super();
    this.state = {
      highscores: [],
    };
  }

  componentDidMount(){
    this.rootRef = firebase.database().ref();
    const rootRef = this.rootRef;

    rootRef.child('durations')
      .orderByValue()
      .limitToFirst(3)
      .on('value', snap => {
        const highscores = Object.entries(snap.val())
          .map(entry => ({fbUid: entry[0], duration: entry[1]}))
          .sort((a, b) => a.duration > b.duration);
        this.setState({
          highscores,
        });
      });
  }

  componentWillUnmount(){
    this.rootRef.off();
  }

  render() {
    const highscores = this.state.highscores.map(
      (entry, index) => (<DurationListItem {...entry} key={entry.fbUid} number={index + 1}/>)
    );
    return (
      <List>
        <Subheader>Highscores - Pattern submit time</Subheader>
        {highscores}
      </List>
    );
  }
}

export default DurationHighscoreList;
