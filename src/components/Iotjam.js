import React, { Component } from 'react';
import {EmbeddedPost} from 'react-facebook';

class Iotjam extends Component {
  render() {    
    return (
      <div className="flex-center margin-body fb-post-container-parent">
        <EmbeddedPost 
          href="https://www.facebook.com/events/1748049711875959/permalink/1748055881875342/"
          width={window.innerWidth - 32}
          />
      </div>
    );
  }
}

export default Iotjam;
