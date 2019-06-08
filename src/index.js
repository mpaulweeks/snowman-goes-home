import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './fe/App';
import './fe/index.css';
import scripts from './script';

// debug scripts via the browser console
window.scripts = scripts;

ReactDOM.render(<App />, document.getElementById('root'));
