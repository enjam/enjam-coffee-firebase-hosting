import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';
import Dialog from 'material-ui/Dialog';
import Pattern from './Pattern';
import CircularProgress from 'material-ui/CircularProgress';

const emptyPattern = Array(9).fill(false);

class Dispenser extends Component {
  constructor(){
    super();
    this.state = {
      pattern: emptyPattern,
    };
  }

  componentDidMount(){
    this.rootRef = firebase.database().ref();
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

  okModal(){
    const pattern = this.state.pattern.map(bool => bool ? 1 : 0).join('');
    this.rootRef.child('dispenser').update({
      state: 'validating_userpattern',
      userpattern: pattern,
    });
    this.setState({
      ...this.state,
      pattern: emptyPattern,
    });
  }

  cancelModal(){
    this.rootRef.child('dispenser').set({
      state: 'ready',
    });
    this.beforeCloseModal();
  }

  beforeCloseModal(){
    this.setState({
      ...this.state,
      pattern: emptyPattern,
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
    const Center = props => (
      <div style={{margin: 'auto', textAlign: 'center'}}>
        {props.children}
      </div>
    );

    const cancelButton = (
      <FlatButton
        label="Annuller"
        onClick={this.cancelModal.bind(this)}
      />
    );
    const submitButton = (
      <FlatButton
        label="Kaffe!"
        primary={true}
        onClick={this.okModal.bind(this)}
      />
    );

    let content;
    let title;

    switch (this.props.state){
      case 'ready':
      case 'requesting_access':
        return (
          <Dialog
            title="Forbinder til kaffemaskinen.."
            actions={cancelButton}
            modal={true}
            open={this.props.access}
          >
            <Center><CircularProgress/></Center>
          </Dialog>
        );
      case 'awaiting_userpattern':
        return (
          <Dialog
            title="Angiv mønstret på kaffemaskinen"
            actions={[cancelButton, submitButton]}
            modal={true}
            open={this.props.access}
          >
            <Pattern
              pattern={this.state.pattern}
              onChange={this.updatePattern.bind(this)}
            />
          </Dialog>
        );
      case 'validating_userpattern':
        return (
          <Dialog
            title="Kværner bønner..."
            modal={true}
            open={this.props.access}
          >
            <Center><CircularProgress/></Center>
          </Dialog>
        );
      case 'dispensing':
        return (
          <Dialog
            title="Smører cykelhjul.."
            modal={true}
            open={this.props.access}
          >
            <Center><CircularProgress/></Center>
          </Dialog>
        );
      default:
        return <div/>;
    }
  }
}

export default Dispenser;
