import Blockly from './blockly';
import utils from './utils';
import _ from 'lodash';
import requiredBlockUtils from './required_block_utils';
import StudioApp from './StudioApp';
import authoredHintUtils from './authoredHintUtils';

const studioApp = StudioApp.singleton;

// TODO (br-pair) : This is to expose methods we need in the global namespace
// for testing purpose. Would be nice to eliminate this eventually.
window.__TestInterface = {
  loadBlocks: _.bind(studioApp.loadBlocks, studioApp),
  arrangeBlockPosition: _.bind(studioApp.arrangeBlockPosition, studioApp),
  getDropletContents: function () {
    return _.bind(studioApp.editor.getValue, studioApp.editor)();
  },
  getDroplet: function () {
    return studioApp.editor;
  },
  // Set to true to ignore onBeforeUnload events
  ignoreOnBeforeUnload: false
};

import {addReadyListener} from './dom';
import * as blocksCommon from './blocksCommon';

export default function (app, levels, options) {

  // If a levelId is not provided, then options.level is specified in full.
  // Otherwise, options.level overrides resolved level on a per-property basis.
  if (options.levelId) {
    var level = levels[options.levelId];
    options.level = options.level || {};
    options.level.id = options.levelId;
    for (var prop in options.level) {
      level[prop] = options.level[prop];
    }

    if (options.level.levelBuilderRequiredBlocks) {
      level.requiredBlocks = requiredBlockUtils.makeTestsFromBuilderRequiredBlocks(
          options.level.levelBuilderRequiredBlocks);
    }
    if (options.level.levelBuilderRecommendedBlocks) {
      level.recommendedBlocks = requiredBlockUtils.makeTestsFromBuilderRequiredBlocks(
          options.level.levelBuilderRecommendedBlocks);
    }

    if (options.level.authoredHints) {
      level.authoredHints = authoredHintUtils.generateAuthoredHints(options.level.authoredHints);
    }

    options.level = level;
  }

  studioApp.configure(options);

  options.skin = options.skinsModule.load(studioApp.assetUrl, options.skinId);

  if (studioApp.isUsingBlockly()) {
    var blockInstallOptions = {
      skin: options.skin,
      isK1: options.level && options.level.isK1,
      level: options.level
    };

    if (options.level && options.level.edit_blocks) {
      utils.wrapNumberValidatorsForLevelBuilder();
    }

    blocksCommon.install(Blockly, blockInstallOptions);
    options.blocksModule.install(Blockly, blockInstallOptions);
  }

  addReadyListener(function () {
    console.log('Ready listener fired');
    if (options.readonly) {
      if (app.initReadonly) {
        app.initReadonly(options);
      } else {
        studioApp.initReadonly(options);
      }
    } else {
      app.init(options);
      if (options.onInitialize) {
        options.onInitialize();
      }
    }
  });
};
