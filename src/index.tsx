import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

declare const google: any;

ReactDOM.render(<App google={google} />, document.getElementById('root'));
registerServiceWorker();
