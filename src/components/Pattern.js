import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

class Pattern extends Component {

  onCheck(i, val) {
    if (this.props.onChange)
      this.props.onChange(i, val);
  }

  render() {
    const styles = {
      container: {
        display: 'flex',
        justifyContent: 'center'
      },
      col: {
        width: '150px',
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      },
      row: {
        display: 'flex',
        justifyContent: 'space-around'
      },
      checkbox: {
        width: 'auto'
      }
    };

    let checkboxes = [];
    for (let i = 0; i < 9; i++)
      checkboxes.push(
        <Checkbox
          key={i}
          style={styles.checkbox}
          onCheck={(e, val) => this.onCheck(i, val)}
          checked={this.props.pattern[i] ? true : false}
        />
      );
    let rows = [];
    for (let i = 0; i < 3; i++)
      rows.push(
        <div style={styles.row} key={i}>
          {checkboxes.slice(i * 3, (i + 1) * 3)}
        </div>
      );

    return (
      <div style={styles.container}>
        <div style={styles.col}>{rows}</div>
      </div>
    );
  }
}

export default Pattern;
