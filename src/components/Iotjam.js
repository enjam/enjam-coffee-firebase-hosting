import React, { Component } from 'react';
import {EmbeddedPost} from 'react-facebook';
import Paper from 'material-ui/Paper';

class Iotjam extends Component {
  render() {    
    return (
      <div className="flex-center margin-body flex-column">
        <div className="fb-post-container-parent">
          <EmbeddedPost 
            href="https://www.facebook.com/events/1748049711875959/permalink/1748055881875342/"
            width={window.innerWidth - 32}
          />
        </div>
        <br/>
        <Paper className="page" zDepth={0} style={{backgroundColor: 'none', maxWidth: '750px'}}>
          Er du interesseret i at udvikle fremtidens 'smarte' byer, 
          en 'smart' industri, et 'smart' hjem eller noget andet 'smart'?
          <br/><br/>
          Kom og red verden - eller lav noget skørt - 
          til Internet of Things jam på TEK, Syddansk Universitet. 
          <br/>
          Team op med nogle der komplementerer dine interesser og færdigheder. 
          I har weekenden til at lave et IoT-koncept og måske en prototype. 
          Det kan være, du vil automatisere din urtehave, 
          sætte en gps på din ekskærestes cykel eller lave flotte grafer over 
          temperaturen i dit køleskab.
          <br/><br/>
          Der vil være et kort foredrag om IoT, så du ikke behøver at kende til IoT i forvejen. 
          Til prototypeudvikling er der adgang til 3D-printere, en laserskærer, 
          IoT development boards, sensorer, aktuatorer og en hjælpende hånd.
          <br/><br/>
          Du får mest ud af arrangementet, hvis du har sat hele weekenden af. 
          Fredag dannes der grupper og der idégenereres, lørdag udvikles der i fuld fart, 
          og søndag præsenterer og vurderer i jeres produkter. 
          Søndag eftermiddag sluttes der af med præmieoverrækkelser.
        </Paper>
        <br/><br/>
      </div>
    );
  }
}

export default Iotjam;
