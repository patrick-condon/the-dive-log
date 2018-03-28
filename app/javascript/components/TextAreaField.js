import React from 'react';

const TextAreaField = props => {
  return(
    <div className="form-group row">
      <label className="col-3">{props.label}</label>
        <div className="col-9">
          <textarea
            name={props.name}
            type={props.type}
            value={props.content}
            onChange={props.handleChange}
            className="form-control"
            >
          </textarea>
        </div>
    </div>
  )
}

export default TextAreaField
