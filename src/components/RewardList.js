import React, { Component } from 'react';
import * as firebase from 'firebase';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

function RewardItem(props){
  return (
    <ListItem
      leftCheckbox={<Checkbox checked={props.checked} disabled={true}/>}
      primaryText={props.title}
      secondaryText={props.subtitle}
    />
  );
}

class RewardList extends Component {
  constructor(){
    super();
    this.state = {
      pageLike: false,
      postLikeCount: 0,
      postCommentCount: 0,
      dispenseCount: 0,
    };
  }

  componentDidMount(){
    const rootRef = firebase.database().ref();
    const uid = this.props.user.providerData[0].uid;

    rootRef.child('pageLikes').child(uid).on('value', snap => {
      this.setState({
        ...this.state,
        pageLike: snap.val()
      });
    });

    rootRef.child('postLikeCount').child(uid).on('value', snap => {
      this.setState({
        ...this.state,
        postLikeCount: snap.val() || 0,
      });
    });

    rootRef.child('postCommentCount').child(uid).on('value', snap => {
      this.setState({
        ...this.state,
        postCommentCount: snap.val() || 0,
      });
    });

    rootRef.child('dispenseCount').child(uid).on('value', snap => {
      this.setState({
        ...this.state,
        dispenseCount: snap.val() || 0,
      });
    });
  }

  componentWillUnmount(){
    this.rootRef.off();
  }

  render() {
    return (
      <List>
        <Divider/>
        <RewardItem
          title="Like enjams facebookside"
          subtitle="10 point"
          checked={this.state.pageLike}
        />
        <RewardItem
          title="Like opslag fra enjam"
          subtitle={
            "Du har liket " + this.state.postLikeCount +
            " opslag, " + (this.state.postLikeCount * 5) + " point"
          }
          checked={this.state.postLikeCount > 0}
        />
        <RewardItem
          title="Kommenter opslag fra enjam"
          subtitle={
            "Du har kommenteret " + this.state.postCommentCount +
            " opslag, " + (this.state.postCommentCount * 5) + " point"
          }
          checked={this.state.postCommentCount > 0}
        />
        <RewardItem
          title="Drik 5 kopper kaffe"
          subtitle={
            "10 point" + (this.state.dispenseCount >= 5 ?
            (', du har drukket ' + this.state.dispenseCount + ' kopper') :
            (', du mangler ' + (5 - this.state.dispenseCount ) + ' kopper'))
          }
          checked={this.state.dispenseCount >= 5}
        />
        <Divider/>
      </List>
    );
  }
}

export default RewardList;
