import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Coffee from './Coffee';
import Iotjam from './Iotjam';
import Enjam from './Enjam';

class App extends Component {
  render() {
    return (
      <Tabs>
        <Tab label="coffee"><Coffee/></Tab>
        <Tab label="IoTjam"><Iotjam/></Tab>
        <Tab label="enjam"><Enjam/></Tab>
      </Tabs>
    );
  }
}

export default App;
