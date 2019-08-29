/**
 * For purposes of deploying to gh-pages, we use HashRouter.
 * URL will have a # symbol
 * https://oliviah0.github.io/buffalo-watch/#/
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { HashRouter as Router } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

