/* global dashboard */

var React = require('react');
var ReactDOM = require('react-dom');
var ImagePicker = require('./ImagePicker');
var studioApp = require('../StudioApp').singleton;

/**
 * Display the "Manage Assets" modal.
 * @param assetChosen {Function} Called when the user chooses an asset. The
 *   "Choose" button in the UI only appears if this optional param is provided.
 * @param typeFilter {String} The type of assets to show and allow to be
 *   uploaded.
 */
module.exports = function (assetChosen, typeFilter) {
  var codeDiv = document.createElement('div');
  var showChoseImageButton = assetChosen && typeof assetChosen === 'function';
  var dialog = studioApp.createModalDialog({
    contentDiv: codeDiv,
    defaultBtnSelector: 'again-button',
    id: 'manageAssetsModal'
  });
  ReactDOM.render(React.createElement(ImagePicker, {
    typeFilter: typeFilter,
    channelId: dashboard.project.getCurrentId(),
    uploadsEnabled: !dashboard.project.exceedsAbuseThreshold(),
    assetChosen: showChoseImageButton ? function (fileWithPath) {
      dialog.hide();
      assetChosen(fileWithPath);
    } : null
  }), codeDiv);

  dialog.show();
};
