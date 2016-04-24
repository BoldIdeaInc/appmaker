import './favicon.ico';
import './index.html';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';
import './scss/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import AppLab from './applab/AppLab';

ReactDOM.render(
  <AppLab />,
  document.getElementById('app')
);
