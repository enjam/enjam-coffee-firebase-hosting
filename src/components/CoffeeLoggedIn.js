import React, { Component } from 'react';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';
import RewardList from './RewardList';
import Dispenser from './Dispenser';
import Snackbar from 'material-ui/Snackbar';

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
    let primaryText = "indløs kaffe (10 point)";

    const dispenserBusy = this.state.dispenser.state !== 'ready';
    const isClaimingCoffee = this.state.dispenser.user === this.uid;

    if (this.state.points < 10){
      canClaimCoffee = false;
      primaryText = "Optjen 10 point til kaffe";
    } else if (dispenserBusy && !isClaimingCoffee){
      canClaimCoffee = false;
      primaryText = "Kaffemaskinen er i brug :/";
    }

    return (
      <Card zDepth={0} style={{backgroundColor: 'none', width: '100%', maxWidth: '800px'}}>
        <CardHeader
          title={this.props.user.displayName}
          avatar={this.props.user.photoURL}
          subtitle={this.state.points === false ? '' : (this.state.points || '0') + ' kaffe point!'}
        />
        <CardActions className="flex-center">
          <RaisedButton
            label={primaryText}
            secondary={true}
            disabled={!canClaimCoffee}
            onClick={this.claimCoffee.bind(this)}
          />
        </CardActions>
        <CardText>
          <RewardList user={this.props.user}/>
        </CardText>
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
