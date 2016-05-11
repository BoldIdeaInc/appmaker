import React from 'react';
import DesignToolboxElement from './DesignToolboxElement';
import applabMsg from '../locale';

import buttonImg from '../media/applab/design_toolbox/button.png';
import inputImg from '../media/applab/design_toolbox/input.png';
import labelImg from '../media/applab/design_toolbox/label.png';
import dropdownImg from '../media/applab/design_toolbox/dropdown.png';
import radioImg from '../media/applab/design_toolbox/radio.png';
import checkboxImg from '../media/applab/design_toolbox/checkbox.png';
import imageImg from '../media/applab/design_toolbox/image.png';
import canvasImg from '../media/applab/design_toolbox/canvas.png';
import screenImg from '../media/applab/design_toolbox/screen.png';
import textareaImg from '../media/applab/design_toolbox/textarea.png';
import chartImg from '../media/applab/design_toolbox/chart.png';
import sliderImg from '../media/applab/design_toolbox/slider.png';

export default React.createClass({
  propTypes: {
    handleDragStart: React.PropTypes.func.isRequired,
    isToolboxVisible: React.PropTypes.bool.isRequired
  },

  render: function () {
    var toolboxStyle = {
      display: this.props.isToolboxVisible ? 'block' : 'none',
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: 270,
      boxSizing: 'border-box',
      borderRight: '1px solid gray',
      padding: 10
    };

    return (
      <div id='design-toolbox' style={toolboxStyle}>
        <p>{applabMsg.designToolboxDescription()}</p>
        <DesignToolboxElement
          imageUrl={buttonImg}
          desc={'Button'}
          elementType={'BUTTON'}
          handleDragStart={this.props.handleDragStart} />
        <DesignToolboxElement
          imageUrl={inputImg}
          desc={'Text Input'}
          elementType={'TEXT_INPUT'}
          handleDragStart={this.props.handleDragStart} />
        <DesignToolboxElement
          imageUrl={labelImg}
          desc={'Label'}
          elementType={'LABEL'}
          handleDragStart={this.props.handleDragStart} />
        <DesignToolboxElement
          imageUrl={dropdownImg}
          desc={'Dropdown'}
          elementType={'DROPDOWN'}
          handleDragStart={this.props.handleDragStart} />
        <DesignToolboxElement
          imageUrl={radioImg}
          desc={'Radio Button'}
          elementType={'RADIO_BUTTON'}
          handleDragStart={this.props.handleDragStart} />
        <DesignToolboxElement
          imageUrl={checkboxImg}
          desc={'Checkbox'}
          elementType={'CHECKBOX'}
          handleDragStart={this.props.handleDragStart} />
        <DesignToolboxElement
          imageUrl={imageImg}
          desc={'Image'}
          elementType={'IMAGE'}
          handleDragStart={this.props.handleDragStart} />
        <DesignToolboxElement
          imageUrl={canvasImg}
          desc={'Canvas'}
          elementType={'CANVAS'}
          handleDragStart={this.props.handleDragStart} />
        <DesignToolboxElement
          imageUrl={screenImg}
          desc={'Screen'}
          elementType={'SCREEN'}
          handleDragStart={this.props.handleDragStart} />
        <DesignToolboxElement
          imageUrl={textareaImg}
          desc={'Text Area'}
          elementType={'TEXT_AREA'}
          handleDragStart={this.props.handleDragStart} />
        <DesignToolboxElement
          imageUrl={chartImg}
          desc={'Chart'}
          elementType={'CHART'}
          handleDragStart={this.props.handleDragStart} />
        <DesignToolboxElement
          imageUrl={sliderImg}
          desc={'Slider'}
          elementType={'SLIDER'}
          handleDragStart={this.props.handleDragStart} />
      </div>
    );
  }
});
