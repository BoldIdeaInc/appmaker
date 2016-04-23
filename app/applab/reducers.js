/** @file Redux reducer functions for App Lab.
 *  @see http://redux.js.org/docs/basics/Reducers.html */
/** @file Redux reducer functions for App Lab.
 *  @see http://redux.js.org/docs/basics/Reducers.html */
/** @file Redux reducer functions for App Lab.
 *  @see http://redux.js.org/docs/basics/Reducers.html */
/** @file Redux reducer functions for App Lab.
 *  @see http://redux.js.org/docs/basics/Reducers.html */
'use strict';

import {ActionType} from './actions';
import {combineReducers} from 'redux';
import constants from './constants';
var ApplabInterfaceMode = constants.ApplabInterfaceMode;

function currentScreenId(state, action) {
  state = state || null;

  switch (action.type) {
    case ActionType.CHANGE_SCREEN:
      return action.screenId;
    default:
      return state;
  }
}

var levelInitialState = {
  assetUrl: function () {},
  isDesignModeHidden: undefined,
  isEmbedView: undefined,
  isReadOnlyWorkspace: undefined,
  isShareView: undefined,
  isViewDataButtonHidden: undefined
};

function level(state, action) {
  state = state || levelInitialState;

  switch (action.type) {
    case ActionType.SET_INITIAL_LEVEL_PROPS:
      var allowedKeys = [
        'assetUrl',
        'isDesignModeHidden',
        'isEmbedView',
        'isReadOnlyWorkspace',
        'isShareView',
        'isViewDataButtonHidden',
        'instructionsMarkdown',
        'instructionsInTopPane',
        'puzzleNumber',
        'stageTotal'
      ];
      Object.keys(action.props).forEach(function (key) {
        if (-1 === allowedKeys.indexOf(key)) {
          throw new Error('Property "' + key + '" may not be set using the ' +
              action.type + ' action.');
        }
      });
      return $.extend({}, state, action.props);

    default:
      return state;
  }
}

function interfaceMode(state, action) {
  state = state || ApplabInterfaceMode.CODE;

  switch (action.type) {
    case ActionType.CHANGE_INTERFACE_MODE:
      return action.interfaceMode;
    default:
      return state;
  }
}

var instructionsInitialState = {
  collapsed: false,
  // represents the uncollapsed height
  height: 0,
  inTopPane: false
};

function instructions(state, action) {
  state = state || instructionsInitialState;

  // TODO - we'll want to think about how to handle state that is common across
  // apps. For example, this (and eventually all of instructions) belongs in
  // a studioApps related store.
  if (action.type === ActionType.SET_INSTRUCTIONS_IN_TOP_PANE) {
    return Object.assign({}, state, {
      inTopPane: action.inTopPane
    });
  }

  if (action.type === ActionType.TOGGLE_INSTRUCTIONS_COLLAPSED) {
    return Object.assign({}, state, {
      collapsed: !state.collapsed
    });
  }

  if (action.type === ActionType.SET_INSTRUCTIONS_HEIGHT) {
    return Object.assign({}, state, {
      height: action.height
    });
  }

  return state;
}

var rootReducer = combineReducers({
  currentScreenId: currentScreenId,
  level: level,
  interfaceMode: interfaceMode,
  instructions: instructions
});

export default { rootReducer: rootReducer };
