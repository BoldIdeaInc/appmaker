/* global $ */
/* global $ */
import React from 'react';
import color from '../../color';
import rowStyle from './rowStyle';
import applabMsg from '../../locale';

var EventHeaderRow = React.createClass({
  render: function () {
    var style = $.extend({}, rowStyle.container, rowStyle.maxWidth, {
      color: color.charcoal
    });

    return (
      <div style={style}>
        {applabMsg.addEventHeader()}
      </div>
    );
  }
});
export default EventHeaderRow;
