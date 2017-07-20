import React, { Component } from 'react';
import {Page} from 'react-facebook';

class Enjam extends Component {
  render() {
    console.log(window.screen.width);
    return (
      <div className="flex-center margin-body">
        <Page
          href="https://www.facebook.com/enjam.sdu/"
          tabs="none" 
          width={window.innerWidth - 32}
        />
      </div>
    );
  }
}

export default Enjam;
