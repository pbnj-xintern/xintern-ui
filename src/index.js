import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom'
import axios from 'axios'

// const ENV_PATH = process.env.REACT_APP_ENV_PATH || 'dev/'

axios.defaults.baseURL = "https://api.xintern.co"

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers['Authorization'] =  token ? "Bearer " + token : null;
    return config;
});

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
serviceWorker.unregister();
