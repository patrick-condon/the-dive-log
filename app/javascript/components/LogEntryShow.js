import React from 'react';
import { Link } from 'react-router';
import LightboxContainer from '../containers/LightboxContainer'
import MapContainer from '../containers/MapContainer'

const LogEntryShow = props => {
  let unit = 'ft', deg = '°F'
  if (props.logEntry.metric == true) {
    unit = 'm', deg = '°C'
  }
  let number = ` #${props.logEntry.entry_number}`
  let depth = 'Not Given', temp = 'Not Given', length = 'Not Given', vis = 'Not Given'
  if (props.logEntry.max_depth) {
    depth = `${props.logEntry.max_depth} ${unit}`
  }
  if (props.logEntry.visibility) {
    vis = `${props.logEntry.visibility} ${unit}`
  }
  if (props.logEntry.water_temp) {
    temp = `${props.logEntry.water_temp} ${deg}`
  }
  if (props.logEntry.dive_length) {
    length = `${props.logEntry.dive_length} minutes`
  }
  let header
  if (props.headerPhoto != null) {
    header = `${props.headerPhoto}`
  }
  let image = `${props.authorPhoto}`
  let photos = props.photos.map(photo => {
    return(
      { src: photo }
    )
  })
  let mapbox
  if (props.diveSite.lat) {
    mapbox =
    <MapContainer
      height="30vh"
      width="30vw"
      lat={props.diveSite.lat}
      lng={props.diveSite.lng}
    />
  }
  return(
    <div className='container'>
      <div className="row">
        <h3 className="col">Log Entry{number}</h3>
        <h5 className="col text-right">{props.diveSite.name}</h5>
      </div>
      <div className="row">
        <div className="col">
          <img src={header} height="300" width="300" />
          <h5>{props.logEntry.date}</h5>
          <h5>By {props.author.first_name} {props.author.last_name}</h5>
          <img src={image} height="50" width="50"/>
        </div>
        <div className="col text-center">
          {props.headerLink}
          {props.headerForm}
        </div>
        <div className="col">
          {mapbox}
        </div>
      </div>
      <div className="row">
        <div className="col"><p>Max Depth: {depth}</p></div>
        <div className="col"><p>Visibility: {vis}</p></div>
        <div className="col"><p>Water Temp: {temp}</p></div>
        <div className="col"><p>Dive Length: {length}</p></div>
      </div>
      <p>{props.logEntry.comments}</p>
      {props.photoLink}
      <LightboxContainer
        photos={photos}
      />
    </div>
  )
}

export default LogEntryShow
