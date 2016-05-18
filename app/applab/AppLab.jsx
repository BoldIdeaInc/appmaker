/* global ENV */
import React from 'react';
import appMain from '../appMain';
import * as blocks from './blocks';
import levels from './levels';
import * as skins from './skins';

const defaultOptions = {
  baseUrl: '/',
  assetUrl: '/',
  locale: 'en_us',
  levelId: 'custom',
  containerId: 'main'
};

const applabMain = function (opts) {
  const options = Object.assign(opts || {}, options);

  // convert assetUrl to a function

  options.skinsModule = skins;
  options.blocksModule = blocks;
  appMain(Applab, levels, options);
};

export default class App extends React.Component {
  render() {
    const opts = Object.assign(defaultOptions, ENV);
    applabMain(opts);
    return (
      <div id='main'></div>
    );
  }
}
