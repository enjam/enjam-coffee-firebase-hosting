import React, { Component } from 'react';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';
import RewardList from './RewardList';
import DurationHighscoreList from './DurationHighscoreList';
import Dispenser from './Dispenser';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

class CoffeeLoggedIn extends Component {
  constructor(){
    super();
    this.state = {
      points: false,
      dispenser: {
        state: 'ready',
        user: null,
      },
      infoText: null,
    };
  }

  componentDidMount(){
    this.uid = this.props.user.providerData[0].uid;
    this.rootRef = firebase.database().ref();
    this.rootRef
      .child('scores')
      .child(this.uid)
      .on('value', snap => {
        this.setState({
          ...this.state,
          points: snap.val()
        });
      });
    this.rootRef.child('dispenser').on('value', snap => {
      this.setState({
        ...this.state,
        dispenser: snap.val()
      });
    });
    this.rootRef.child('info').child(this.uid).on('value', snap => {
      this.setState({
        ...this.state,
        infoText: snap.val(),
      });
    });
  }

  componentWillUnmount(){
    this.rootRef.off();
  }

  claimCoffee(){
    this.rootRef.child('dispenser').set({
      user: this.uid,
      state: 'requesting_access'
    }).then(() => {
      //
    }).catch(() => {
      console.log('Nooo');
    });
  }

  handleSnackbarRequestClose(){
    this.rootRef.child('info').child(this.uid).remove();
  }

  render() {
    let canClaimCoffee = true;
    let primaryText = "claim coffee (10 coins)";

    const dispenserBusy = this.state.dispenser.state !== 'ready';
    const isClaimingCoffee = this.state.dispenser.user === this.uid;

    if (this.state.points < 10){
      canClaimCoffee = false;
      primaryText = "get 10 coffee coins";
    } else if (dispenserBusy && !isClaimingCoffee){
      canClaimCoffee = false;
      primaryText = "the coffee machine is in use";
    }

    return (
      <Card zDepth={0} style={{backgroundColor: 'none', width: '100%', maxWidth: '800px'}}>
        <CardHeader
          className="flex-center flex-column flex-margin"
          style={{textAlign:'center'}}
        >
          <Avatar
            size={60}
            src={this.props.user.photoURL}
            className="avatar"
          />
          <div>
            {this.props.user.displayName}
            <br/>
            <span style={{fontSize: '14px', color: 'rgba(0,0,0,0.54)'}}>
              {(this.state.points || '0') + ' coffee coins!'}
            </span>
          </div>
          <RaisedButton
            label={primaryText}
            secondary={true}
            disabled={!canClaimCoffee}
            onClick={this.claimCoffee.bind(this)}
          />
        </CardHeader>
        <CardText>
          <Divider/>
          <RewardList user={this.props.user}/>
          <Divider/>
          <DurationHighscoreList uid={this.props.user.providerData[0].uid}/>
          <Divider/>
        </CardText>
        <br/>
        <div className="flex-center">
          <RaisedButton
            label="logout"
            onClick={() => firebase.auth().signOut()}
            secondary={true}
          />
        </div>
        <br/>
        <br/>
        <Dispenser access={isClaimingCoffee} state={this.state.dispenser.state}/>
        <Snackbar
          open={this.state.infoText ? true : false}
          message={this.state.infoText || ''}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarRequestClose.bind(this)}
        />
      </Card>
    );
  }
}

export default CoffeeLoggedIn;
