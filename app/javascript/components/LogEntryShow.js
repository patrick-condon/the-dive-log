import React from 'react';
import { Link } from 'react-router';
import Thumbnail from '../components/Thumbnail'

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
  let images = props.photos.map(image => {
    return(
      <Thumbnail
        key={props.photos.indexOf(image)}
        image={image}
      />
    )
  })
  return(
    <div className='container'>
      <h3>Log Entry{number}</h3>
      <div className="row">
        <div className="col">
          <img src={header} height="300" />
          <h5>{props.diveSite.name} on {props.logEntry.date}</h5>
          <h5>By {props.author.first_name} {props.author.last_name}</h5>
          <img src={image} height="50" width="50"/>
        </div>
        <div className="col">
          {props.headerForm}
        </div>
      </div>
      <p>Max Depth: {depth}</p>
      <p>{props.logEntry.comments}</p>
      {props.photoLink}
      <h4>Photos</h4>
      <div className="row">
        {images}
      </div>
    </div>
  )
}

export default LogEntryShow
