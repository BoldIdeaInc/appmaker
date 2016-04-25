import React from 'react';
import appMain from '../appMain';
import AppLab from './applab';
import * as blocks from './blocks';
import levels from './levels';
import * as skins from './skins';

const defaultOptions = {
  baseUrl: '/',
  locale: 'en_us',
  level: 'full_sandbox',
  containerId: 'main'
};

const applabMain = function (opts) {
  const options = Object.assign(opts || {}, options);
  options.skinsModule = skins;
  options.blocksModule = blocks;
  appMain(AppLab, levels, options);
}

export default class App extends React.Component {
  render() {
    // TODO certain options could be set in localStorage, eg: locale
    const opts = Object.assign(defaultOptions, {});
    applabMain(opts);
    return (
      <div id="main"></div>
    );
  }
}
