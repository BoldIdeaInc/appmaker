import './favicon.ico';
import './index.html';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import AppLab from './applab/AppLab';
import Applab from './applab/main';

import project from './studio/initApp/project';

window.dashboard = window.dashboard || {};
window.dashboard.project = project;

ReactDOM.render(
  <AppLab />,
  document.getElementById('app')
);
