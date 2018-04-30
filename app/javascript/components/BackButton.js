import React from 'react';
import { Link, browserHistory } from 'react-router';

const BackButton = props => {
  let backFunction = browserHistory.goBack
  if (props.show) {
    backFunction = () => {browserHistory.push("/")}
  }
  return(
    <div className={`${props.size} text-left`}>
      <button
        onClick={backFunction}
        className="btn btn-secondary">
        Back
      </button>
    </div>
  )
}

export default BackButton;
