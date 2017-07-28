import React, { Component } from 'react';
import {EmbeddedPost} from 'react-facebook';
import Paper from 'material-ui/Paper';
import {debounce, clamp} from 'lodash';

function calculateWidth(){
  return clamp(window.innerWidth - 32, 350, 750);
}

class Iotjam extends Component {
  constructor(){
    super();
    this.state = {
      width: calculateWidth(),
    };
  }

  updateWidth(){
    this.setState({
      width: calculateWidth(),
    });
  }

  componentDidMount(){
    this.cb = debounce(this.updateWidth.bind(this), 500);
    window.addEventListener("resize", this.cb);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.cb);
    this.cb.cancel();
  }

  render() {
    return (
      <div className="flex-center margin-body flex-column">
        <div className="fb-post-container-parent">
          <EmbeddedPost
            href="https://www.facebook.com/events/1748049711875959/permalink/1748055881875342/"
            width={this.state.width}
          />
        </div>
        <br/>
        <Paper zDepth={0} style={{backgroundColor: 'none', maxWidth: '750px'}}>
          Why did we make an internet connected instant coffee dispenser?
          <br/><br/>
          Would you like to develop the 'smart' cities of the future? A 'smart' home? Or just something connected to the cloud?
          <br/><br/>
          Come and help save the world or make something ridicules at Internet of Things jam at TEK, SDU.
          <br/>
          Team up with fellow students who complements your interests and skills in an IoT project with the subject of your choice.
          You have the weekend to develop an IoT concept and a prototype. Maybe you want to automate your garden, put a gps on your ex's bike, or make beautiful graphs of the temperature in your refrigerator?
          <br/><br/>
          Maybe you are interested in product development, design, programming, electronics, business plans? Whatever your field of interest we are confident you can be a part of an IoT team.
          There will be a short talk on IoT to get you inspired and people from the industry to help you get ideas.
          For prototype development you have access to cardboard, wood, 3D printers, laser cutters, miscellaneous sensors and actuators, development boards and a helping hand.
          <br/><br/>
          You will gain most from the event if you have set aside the whole weekend. Ideas and groups are formed friday, saturday is the work day and the event ends with presentations and prize award sunday.
        </Paper>
        <br/><br/>
      </div>
    );
  }
}

export default Iotjam;
