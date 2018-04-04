import React from 'react';

const Thumbnail = props => {
  let photoClick = () => {props.photoClick(props.id)}
  return(
    <div>
      <img
        src={props.image}
        className="img-thumbnail"
        height="200"
        width="200"
        data-toggle="tooltip"
        data-placement="top"
        title="Click Image to See Full Size"
        data-toggle="modal"
        data-target={`#photoModal`}
        onClick={photoClick}
      />
    </div>
  )
}

export default Thumbnail;
