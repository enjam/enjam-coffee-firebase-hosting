import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

window.firebase = firebase;

injectTapEventPlugin();

var config = {
  apiKey: "AIzaSyCS3sfQGzcHhs4iiNNaIoO1Xp7E98paBA4",
  authDomain: "enjam-coffee.firebaseapp.com",
  databaseURL: "https://enjam-coffee.firebaseio.com",
  projectId: "enjam-coffee",
  storageBucket: "enjam-coffee.appspot.com",
  messagingSenderId: "1049251801594"
};
firebase.initializeApp(config);

ReactDOM.render(
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>
  , document.getElementById('root'));
//registerServiceWorker();
