import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
} from 'material-ui/Table';
import UserRow from './UserRow';

import * as firebase from 'firebase';

class Admin extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount(){
    this.rootRef = firebase.database().ref();
    this.rootRef.child('users').on('child_added', snap => {
      const user = snap.val();
      this.setState(prevState => {
        const users = [
          ...prevState.users,
          {
            key: snap.key,
            name: user.displayName,
            avatarURL: user.photoURL,
          }
        ];
        return {
          ...prevState,
          users: users.sort((u1, u2) => u1.name > u2.name),
        };
      });
    })
  }

  componentWillUnmount(){
    this.rootRef.off();
  }

  render() {
    return (
      <Table selectable={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableHeaderColumn>Avatar</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>FB UID</TableHeaderColumn>
          <TableHeaderColumn>Score</TableHeaderColumn>
          <TableHeaderColumn>Dispense Count</TableHeaderColumn>
          <TableHeaderColumn>Total</TableHeaderColumn>
          <TableHeaderColumn>PageLike</TableHeaderColumn>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.state.users.map(user => (<UserRow {...user} fireId={user.key}/>))}
        </TableBody>
      </Table>
    );
  }
}

export default Admin;
