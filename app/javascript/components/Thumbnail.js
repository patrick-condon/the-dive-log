import React from 'react';

const Thumbnail = props => {
  return(
    <div className="col">
      <img
        src={props.image}
        className="img-thumbnail"
        height="200"
        width="200"
      />
    </div>
  )
}

export default Thumbnail;
