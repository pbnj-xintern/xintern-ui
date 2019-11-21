import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'

const ENV_PATH = process.env.NODE_ENV === "development"? "dev/" : ""
axios.defaults.baseURL = "https://mmu5kk85li.execute-api.us-east-2.amazonaws.com/" + ENV_PATH

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
