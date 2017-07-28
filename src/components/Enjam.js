import React, { Component } from 'react';
import {Page} from 'react-facebook';
import Paper from 'material-ui/Paper';
import {debounce, clamp} from 'lodash';

function calculateWidth(){
  return clamp(window.innerWidth - 32, 300, 500);
}

class Enjam extends Component {
  constructor(){
    super();
    this.state = {
      width: calculateWidth(),
    };
  }

  componentDidMount(){
    this.updateWidth = debounce(() => {
      this.setState({
        width: calculateWidth(),
      });
    }, 500);
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.updateWidth);
    this.updateWidth.cancel();
  }

  render() {
    return (
      <div className="flex-center margin-body flex-column">
        <Page
          href="https://www.facebook.com/enjam.sdu/"
          tabs="none"
          width={this.state.width}
        />
        <br/>
        <Paper className="page" zDepth={0} style={{backgroundColor: 'none', maxWidth: '500px'}}>
          Enjam organizes engineering-jams for students at SDU.
          We hope to help the students explore what they can do together across engineering studies.
          <br/><br/>
          Every jam is based on a theme with challenges that should be relevant to most engineering students.
          The students find together in smaller groups and make a product.
          <br/><br/>
          Hopefully the weekend ends with the students feeling more empowered and connected to other students at TEK.
        </Paper>
        <br/><br/>
      </div>
    );
  }
}

export default Enjam;
