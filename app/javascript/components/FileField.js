import React from 'react';

const FileField = props => {

  return (
    <div className="form-group row justify-content-center">
      {/* <label className="col-3 col-form-label">{props.label}</label> */}
        {/* <div className={props.class}> */}
          <input
            type="file"
            onChange={props.handleChange}
            accept="image/*"
            // className="form-control"
          >
          </input>
        {/* </div> */}
    </div>
  );
}

export default FileField;
