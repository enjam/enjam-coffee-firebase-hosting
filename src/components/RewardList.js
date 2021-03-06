import React, { Component } from 'react';
import * as firebase from 'firebase';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';

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
      interested: false,
      postLikeCount: 0,
      postCommentCount: 0,
      dispenseCount: 0,
    };
  }

  componentDidMount(){
    this.rootRef = firebase.database().ref();
    const rootRef = this.rootRef;
    const uid = this.props.user.providerData[0].uid;

    rootRef.child('pageLikes').child(uid).on('value', snap => {
      this.setState(prevState => ({
        ...prevState,
        pageLike: snap.val() || false
      }));
    });

    rootRef.child('interested').child(uid).on('value', snap => {
      this.setState(prevState => ({
        ...prevState,
        interested: snap.val() || false
      }));
    });

    rootRef.child('postLikeCount').child(uid).on('value', snap => {
      this.setState(prevState => ({
        ...prevState,
        postLikeCount: snap.val() || 0,
      }));
    });

    rootRef.child('postCommentCount').child(uid).on('value', snap => {
      this.setState(prevState => ({
        ...prevState,
        postCommentCount: snap.val() || 0,
      }));
    });

    rootRef.child('dispenseCount').child(uid).on('value', snap => {
      this.setState(prevState => ({
        ...prevState,
        dispenseCount: snap.val() || 0,
      }));
    });
  }

  componentWillUnmount(){
    this.rootRef.off();
  }

  render() {
    return (
      <List>
        <Subheader>Ways to earn coffee coins</Subheader>
        <RewardItem
          title="Like enjams facebook page"
          subtitle={"10 coins" + (this.state.pageLike ? '' : " - you may have to 'relike'")}
          checked={this.state.pageLike}
        />
        <RewardItem
          title="IoT-jam 'Going' or 'Interested'"
          subtitle="10 coins"
          checked={this.state.interested}
        />
        <RewardItem
          title="Like post from enjam"
          subtitle={
            "You liked " + this.state.postLikeCount +
            " posts, " + (this.state.postLikeCount * 5) + " coins"
          }
          checked={this.state.postLikeCount > 0}
        />
        <RewardItem
          title="Comment post from enjam"
          subtitle={
            "You commented " + this.state.postCommentCount +
            " posts, " + (this.state.postCommentCount * 5) + " coins"
          }
          checked={this.state.postCommentCount > 0}
        />
        <RewardItem
          title="Claim 5 cups of coffee"
          subtitle={
            "10 coins, " + (this.state.dispenseCount >= 5 ?
              ('you claimed ' + this.state.dispenseCount + ' cups') :
              ('you need to claim ' + (5 - this.state.dispenseCount) + ' more')
            )
          }
          checked={this.state.dispenseCount >= 5}
        />
      </List>
    );
  }
}

export default RewardList;
