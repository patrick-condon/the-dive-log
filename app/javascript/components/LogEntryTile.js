import React from 'react';
import { Link } from 'react-router';

const LogEntryTile = props => {
  return(
    <div>
      <Link to={`/log_entries/${props.id}`}>
        <div className="container">
          <h3><b>{props.siteName}</b></h3><br />
          <h5>{props.date}</h5>
        </div>
      </Link>
    </div>
  )
}

export default LogEntryTile;
