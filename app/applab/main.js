import appMain from '../appMain';
import Applab from './applab';
import blocks from './blocks';
import levels from './levels';
import skins from './skins';

export default function (options) {
  const opts = Object.assign(options, {
    skinsModule: skins,
    blocksModule: blocks,
  });
  appMain(Applab, levels, opts);
}
