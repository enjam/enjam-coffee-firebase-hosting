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
      secondaryText={props.points + " points"}
    />
  );
}

class RewardList extends Component {
  constructor(){
    super();
    this.state = {
      pageLike: false,
      commentLike: false
    };
  }

  componentDidMount(){
    const rootRef = firebase.database().ref();
    const uid = this.props.user.providerData[0].uid;

    this.pageLikeRef = rootRef.child('pageLikes').child(uid);
    this.pageLikeRef.on('value', snap => {
      this.setState({
        ...this.state,
        pageLike: snap.val()
      });
    });

    this.pageLikeRef = rootRef.child('pageLikes').child(uid);
    this.pageLikeRef.on('value', snap => {
      this.setState({
        ...this.state,
        pageLike: snap.val()
      });
    });
  }

  componentWillUnmount(){
    this.pointsRef.off();
  }

  render() {
    return (
      <List>
        <Divider/>
        <RewardItem
          title="Like enjam på facebook"
          points={10}
          checked={this.state.pageLike}
        />
        <RewardItem
          title="Kommenter et opslag af enjam"
          points={5}
          checked={this.state.pageLike}
        />
        <Divider/>
      </List>
    );
  }
}

export default RewardList;
