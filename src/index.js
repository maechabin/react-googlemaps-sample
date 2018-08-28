import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const google = window.google;

ReactDOM.render(<App google={google} />, document.getElementById('root'));
registerServiceWorker();
