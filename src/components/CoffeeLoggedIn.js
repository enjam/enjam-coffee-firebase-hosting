import React, { Component } from 'react';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as firebase from 'firebase';
import RewardList from './RewardList';
import Dialog from 'material-ui/Dialog';
import Pattern from './Pattern';

class CoffeeLoggedIn extends Component {
  constructor(){
    super();
    this.state = {
      points: false,
      dispenser: {
        state: 'ready',
        user: null
      },
      modalOpen: true,
      pattern: [0,0,0,0,0,0,0,0,0]
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
  }

  componentWillUnmount(){
    this.rootRef.off();
  }

  claimCoffee(){
    this.rootRef.child('dispenser').set({
      user: this.uid,
      state: 'pattern'
    }).then(() => {
      this.setState({
        ...this.state,
        modalOpen: true
      })
    }).catch(() => {
      console.log('Nooo');
    });
  }

  okModal(){
    const pattern = this.state.pattern.map(bool => bool ? 1 : 0).join('');
    this.rootRef.child('dispenser/userpattern').set(pattern);
    this.closeModal();
  }

  cancelModal(){
    this.rootRef.child('dispenser').set({
      state: 'ready'
    });
    this.closeModal();
  }

  closeModal(){
    this.setState({
      ...this.state,
      modalOpen: false
    });
  }

  updatePattern(i, val){
    this.setState({
      ...this.state,
      pattern: [
        ...this.state.pattern.slice(0, i),
        val,
        ...this.state.pattern.slice(i + 1)
      ]
    });
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

    const actions = [
      <FlatButton
        label="Annuller"
        onClick={this.cancelModal.bind(this)}
      />,
      <FlatButton
        label="Giv mig kaffen"
        primary={true}
        onClick={this.okModal.bind(this)}
      />
    ];

    return (
      <Card zDepth={0}>
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
        <Dialog
          title="Angiv mønstret på kaffemaskinen"
          actions={actions}
          modal={true}
          open={this.state.modalOpen}
        >
          <Pattern pattern={this.state.pattern} onChange={this.updatePattern.bind(this)}/>
        </Dialog>
      </Card>
    );
  }
}

export default CoffeeLoggedIn;
