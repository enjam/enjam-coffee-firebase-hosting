import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import './LightButtons.css';

const LightButton = ({cssColor, rgbColor, callback}) => (
  <div
    className="LightButton"
    style={{
      backgroundColor: cssColor
    }}
    onClick={() => callback && callback(rgbColor)}
  ></div>
);

const ButtonColors = [
  {css: 'red', rgb: [255, 0, 0]},
  {css: 'orange', rgb: [255, 165, 0]},
  {css: 'yellow', rgb: [255, 255, 0]},
  {css: 'lime', rgb: [0, 255, 0]},
  {css: 'cyan', rgb: [0, 255, 255]},
  {css: 'magenta', rgb: [255, 0, 255]},
];

class LightButtons extends Component {
  render() {
    const callback = this.props.onClickCallback;
    return (
      <div className="LightButtons">
        {
          ButtonColors.map(({css, rgb}, i) => (
            /*
            <LightButton
              key={`lightbutton:${css}`}
              cssColor={css}
              rgbColor={rgb}
              callback={this.props.onClickCallback}
            />*/
            <FloatingActionButton
              key={`lightbutton:${css}`}
              backgroundColor={css}
              mini={true}
              onClick={() => callback && callback(rgb)}
            ><div className="fill"/></FloatingActionButton>
          ))
        }
      </div>
    );
  }
}

export default LightButtons;
