import React from 'react';
import appMain from '../appMain';
import AppLab from './applab';
import blocks from './blocks';
import levels from './levels';
import skins from './skins';

const applabMain = function (options) {
  options.skinsModule = skins;
  options.blocksModule = blocks;
  appMain(Applab, levels, options);
}

export default class App extends React.Component {
  render() {
    console.log('Rendering')
    applabMain();
    return (
      <div></div>
    );
  }
}
