import React from 'react';
import { Link, browserHistory } from 'react-router';

const BackButton = props => {
  return(
    <div className={`${props.size} text-left`}>
      <button
        onClick={browserHistory.goBack}
        className="btn btn-secondary">
        Back
      </button>
    </div>
  )
}

export default BackButton;
