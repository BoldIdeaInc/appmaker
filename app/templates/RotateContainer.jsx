'use strict';

var React = require('react');
var msg = require('../locale');
var turnphoneHorzontalImg = require('../media/turnphone_horizontal.png');

/**
 * "Rotate your device" overlay.
 */
var RotateContainer = React.createClass({
  propTypes: {
    assetUrl: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <div id='rotateContainer' style={this.getStyle()}>
        <div id='rotateText'>
          <p>{msg.rotateText()}<br />{msg.orientationLock()}</p>
        </div>
      </div>
    );
  },

  getStyle: function () {
    return {
      backgroundImage: 'url(' + turnphoneHorzontalImg + ')'
    };
  }
});
module.exports = RotateContainer;
