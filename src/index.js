import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {unregister as unregisterServiceWorker} from './registerServiceWorker';
import * as firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FacebookProvider from 'react-facebook';

injectTapEventPlugin();

firebase.initializeApp({
  apiKey: "AIzaSyCS3sfQGzcHhs4iiNNaIoO1Xp7E98paBA4",
  authDomain: "enjam-coffee.firebaseapp.com",
  databaseURL: "https://enjam-coffee.firebaseio.com",
  projectId: "enjam-coffee",
  storageBucket: "enjam-coffee.appspot.com",
  messagingSenderId: "1049251801594"
});
window.firebase = firebase;

ReactDOM.render(
  <MuiThemeProvider>
    <FacebookProvider appId="1311032879006324" version="v2.10">
      <App/>
    </FacebookProvider>
  </MuiThemeProvider>
  , document.getElementById('root'));
  
unregisterServiceWorker();
