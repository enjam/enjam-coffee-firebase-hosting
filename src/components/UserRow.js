import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

const snapForward = cb => (snap => cb(snap.val()));

class UserRow extends Component{
  constructor(props){
    super(props);
    this.state = {
      fb_uid: null,
      pageLiked: null,
      score: null,
      dispenseCount: null,
    };
  }

  updateScore = score => this.setState(prevState => ({...prevState, score}));
  updatePageLiked = pageLiked => this.setState(prevState => ({...prevState, pageLiked}));
  updateDispenseCount = dispenseCount => this.setState(prevState => ({...prevState, dispenseCount}));

  componentDidMount(){
    this.rootRef = firebase.database().ref();
    this.rootRef.child('fire2face').child(this.props.fireId).once('value')
      .then(snap => {
        const fb_uid = snap.val();
        if (!fb_uid){
          console.log('invalid fb_uid?');
          return;
        }
        this.setState({...this.state, fb_uid});
        this.rootRef.child('scores').child(fb_uid).on('value', snapForward(this.updateScore));
        this.rootRef.child('pageLikes').child(fb_uid).on('value', snapForward(this.updatePageLiked));
        this.rootRef.child('dispenseCount').child(fb_uid).on('value', snapForward(this.updateDispenseCount));
      }).catch(console.log);
  }

  componentWillUnmount(){
    this.rootRef.off();
  }

  pageLike = () => {
    const rootRef = firebase.database().ref();
    const {fb_uid} = this.state;
    rootRef.child('pageLikes').child(fb_uid).once('value', snap => {
      if(!snap.val()){
        rootRef.child('pageLikes').child(fb_uid)
          .set(true);
        rootRef.child('scores').child(fb_uid)
          .transaction(score => score + 10)
          .catch(console.log);
      }
    });
  };

  render(){

    const {name, fireId, avatarURL} = this.props;
    const {fb_uid, score, dispenseCount, pageLiked} = this.state;

    const total = dispenseCount * 10 + score;

    return (
      <TableRow key={fireId}>
        <TableRowColumn><Avatar src={avatarURL} /></TableRowColumn>
        <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>{fb_uid}</TableRowColumn>
        <TableRowColumn>{score}</TableRowColumn>
        <TableRowColumn>{dispenseCount}</TableRowColumn>
        <TableRowColumn>{total}</TableRowColumn>
        <TableRowColumn>{pageLiked ? 'Yes' : <FlatButton label="PageLike" onClick={this.pageLike}/>}</TableRowColumn>
      </TableRow>
    );
  }
}

export default UserRow;
