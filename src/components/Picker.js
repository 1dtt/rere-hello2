import React, { Component, PropTypes } from 'react';

class Picker extends Component {render() {
    const { value, onChange, options } = this.props;
    return (
      <span>
        <h1>{value}</h1>
        <select
          onChange={(event) => {
            if(this.props.value === event.target.value) {
              return;
            }

            onChange(event.target.value);
          }}
          value={this.props.value}
        >
          {
            options.map((option) => (
              <option
                value={option}
                key={option}
              >
                {option}
              </option>
            ))
          }
        </select>
      </span>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Picker;