import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './fe/App';
import './fe/index.css';
import { store } from './redux';
import scripts from './script';

// debug scripts via the browser console
window.scripts = scripts;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
