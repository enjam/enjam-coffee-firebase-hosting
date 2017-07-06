import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Coffee from './Coffee';

class App extends Component {
  render() {
    return (
      <Tabs>
        <Tab label="coffee"><Coffee/></Tab>
        <Tab label="IoTjam"></Tab>
        <Tab label="enjam"></Tab>
      </Tabs>
    );
  }
}

export default App;
