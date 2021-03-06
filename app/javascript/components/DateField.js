import React from 'react';

const DateField = props => {

  return (
    <div className="form-group row">
      <label className="col-3 col-form-label">{props.label}</label>
        <div className="col-9">
          <input
            type="date"
            value={props.content}
            onChange={props.handleChange}
            className="form-control"
          >
          </input>
        </div>
    </div>
  );
}

export default DateField;
