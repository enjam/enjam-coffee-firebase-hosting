import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {Tabs, Tab} from 'material-ui/Tabs';
import Coffee from './Coffee';
import Iotjam from './Iotjam';
import Enjam from './Enjam';
import Admin from './Admin';

const MainApp = (props) => (
  <Tabs>
    <Tab label="coffee"><Coffee/></Tab>
    <Tab label="IoTjam"><Iotjam/></Tab>
    <Tab label="enjam"><Enjam/></Tab>
  </Tabs>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={MainApp} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
