import React, { Component } from 'react';
import {Page} from 'react-facebook';
import Paper from 'material-ui/Paper';

class Enjam extends Component {
  render() {
    return (
      <div className="flex-center margin-body flex-column">
        <Page
          href="https://www.facebook.com/enjam.sdu/"
          tabs="none" 
          width={window.innerWidth - 32}
        />
        <br/>
        <Paper className="page" zDepth={0} style={{backgroundColor: 'none', maxWidth: '500px'}}>
          Enjam arrangerer ingeniør-jams for studerende på SDU. 
          Idéen er at skabe et kreativt miljø, der sætter de 
          studerendes fagligheder og interesser i spil på tværs af uddannelserne.
          <br/><br/>
          Hver jam tager afsæt i et tema med udfordringer, 
          der er relevante for en række ingeniørudannelser. 
          Deltagerne finder sammen i mindre grupper og har weekenden til at lave et produkt.
          <br/><br/>
          Deltagerne skulle gerne tage hjem med inspiration, 
          eventuelle præmier og et større netværk.
        </Paper>
        <br/><br/>
      </div>
    );
  }
}

export default Enjam;
