import React, { Component } from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as firebase from 'firebase';

class CoffeeLoggedIn extends Component {
  constructor(){
    super();
    this.state = {
      points: null,
    };
  }

  componentDidMount(){
    const rootRef = firebase.database().ref();
    const pointsRef = rootRef.child('scores').child(this.props.user.providerData[0].uid);
    pointsRef.on('value', snap => {
      console.log(snap);
      console.log(snap.val());
      this.setState({
        points: snap.val()
      });
    });
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.user.displayName}
            avatar={this.props.user.photoURL}
            subtitle={typeof this.state.points === 'number' ? this.state.points + ' coffee points!' : ''}
          />
        </Card>
        <FloatingActionButton className="floating-button" secondary={true}/>
      </div>
    );
  }
}

export default CoffeeLoggedIn;
