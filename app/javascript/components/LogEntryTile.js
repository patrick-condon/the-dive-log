import React from 'react';
import { Link } from 'react-router';

const LogEntryTile = props => {
  return(
    <div className="container log-entry-tile">
      <Link to={`/log_entries/${props.id}`}>
        <div className="media">
          <img className="mr-3 tile-photo" src={props.photo} height="75" width="75"/>
          <div className="media-body">
            <h3><b>{props.siteName}</b></h3><br />
            <h5>{props.date}</h5>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default LogEntryTile;
