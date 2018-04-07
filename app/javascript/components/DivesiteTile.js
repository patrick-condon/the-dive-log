import React from 'react';

const DivesiteTile = props => {
  return(
    <div className="row">
      <a href="#results" onClick={props.handleClick}><h4>{props.name}</h4></a>
    </div>
  )
}

export default DivesiteTile;
