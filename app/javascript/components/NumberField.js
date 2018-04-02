import React from 'react';

const NumberField = props => {
  return(
    <div className="form-group">
      <label className="col">{props.label}</label>
        <div className="col">
          <input
            name={props.name}
            type="text"
            value={props.content}
            onChange={props.handleChange}
            className="form-control"
          />{props.postLabel}
        </div>
    </div>
  )
}

export default NumberField
