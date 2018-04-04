import React from 'react';

const ImageButtonGroup = props => {
  return(
    <div>
      <div className="row">
        <input
          name="scale"
          type="range"
          // className="form-control"
          onChange={props.handleScale}
          min=".5"
          max="2"
          step="0.01"
          defaultValue="1"
        />
        <label>Zoom</label>
      </div>
      <div className="row">
        <button onClick={props.rotateLeft} className="btn btn-secondary">
          <i className="fas fa-undo-alt"></i>
        </button>
        <button onClick={props.rotateRight} className="btn btn-secondary">
          <i className="fas fa-redo-alt"></i>
        </button>
        <button onClick={props.submitPhoto} className="btn btn-secondary">
          Upload Picture
        </button>
      </div>
    </div>
  )
}

export default ImageButtonGroup;
