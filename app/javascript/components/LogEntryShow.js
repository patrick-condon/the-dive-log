import React from 'react';
import { Link } from 'react-router';

const LogEntryShow = props => {
  let number = ` #${props.logEntry.entry_number}`
  let depth = 'Not Given'
  if (props.logEntry.max_depth) {
    depth = `${props.logEntry.max_depth}`
  }
  let header
  if (props.headerPhoto != null) {
    header = `${props.headerPhoto}`
  }
  let image = `${props.authorPhoto}`
  return(
    <div className='container'>
      <h3>Log Entry{number}</h3>
      <img src={header} height="300" />
      <h5>{props.diveSite.name} on {props.logEntry.date}</h5>
      <h5>By {props.author.first_name} {props.author.last_name}</h5>
      <img src={image} height="50" width="50"/>
      <p>Max Depth: {depth}</p>
      <p>{props.logEntry.comments}</p>
    </div>
  )
}

export default LogEntryShow
