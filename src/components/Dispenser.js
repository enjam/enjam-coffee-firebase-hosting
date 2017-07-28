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

  componentWillReceiveProps(newProps){
    if (!this.props.access && newProps.access){
      this.setState({
        ...this.state,
        pattern: emptyPattern,
      });
    }
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
        label="Cancel"
        onClick={this.cancelModal.bind(this)}
      />
    );
    const submitButton = (
      <FlatButton
        label="Coffee!"
        secondary={true}
        onClick={this.okModal.bind(this)}
      />
    );

    switch (this.props.state){
      case 'ready':
      case 'requesting_access':
        return (
          <Dialog
            title="Connecting to the coffee machine.."
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
            title="Can you guess the pattern?"
            actions={[cancelButton, submitButton]}
            modal={true}
            open={this.props.access}
          >
            <p style={{marginTop: 0}}>hint: you can also see the pattern on the coffee machine</p>
            <br/>
            <Pattern
              pattern={this.state.pattern}
              onChange={this.updatePattern.bind(this)}
            />
          </Dialog>
        );
      case 'validating_userpattern':
        return (
          <Dialog
            title="Roasting coffee beans.."
            modal={true}
            open={this.props.access}
          >
            <Center><CircularProgress/></Center>
          </Dialog>
        );
      case 'dispensing':
        return (
          <Dialog
            title="Grinding coffee beans.."
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
