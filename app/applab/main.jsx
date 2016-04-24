import './index.html';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';

import React from 'react';
import AppLab from './AppLab';

React.render(
  <AppLab />,
  document.getElementById('app')
);
