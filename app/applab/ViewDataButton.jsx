/** @file Button that opens the data browser */
/* global $ */

/** @file Button that opens the data browser */
/* global $ */

import React from 'react';
import applabMsg from '../locale';
import styles from '../templates/ToggleButtonStyles';

/**
 * The button above the visualization that opens the data browser.
 * @type {function}
 */
var ViewDataButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render: function () {
    var showDataButtonStyle = $.extend({},
      styles.buttonStyle,
      styles.inactiveStyle,
      {
        float: 'right',
        textAlign: 'left',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    );

    return (
      <button
          id='viewDataButton'
          style={showDataButtonStyle}
          className='no-outline'
          onClick={this.props.onClick}>
        <i className='fa fa-database' style={styles.iconStyle} />
        {applabMsg.viewData()}
      </button>
    );
  }
});
export default ViewDataButton;
