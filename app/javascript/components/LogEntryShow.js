import React from 'react';
import BackButton from '../components/BackButton'
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
    length = `${props.logEntry.dive_length} min`
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
      width="30vh"
      lat={props.diveSite.lat}
      lng={props.diveSite.lng}
    />
  }
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let month, day, year
  if (props.logEntry.date) {
    let d = new Date(props.logEntry.date)
    month = months[d.getMonth()]
    day = d.getDate()
    year = d.getFullYear()
  }

  return(
    <div className='container'>
      <div className="row">
        <BackButton
          size="col-4"
        />
        <h3 className="col-4 le-title text-center">Log Entry{number}</h3>
      </div>
      <h5 className="col text-center">{props.diveSite.name}</h5>
      <h5 className="col text-center">{month} {day}, {year}</h5>
      <p className="col text-center">By {props.author.first_name} {props.author.last_name}</p>
      <div className="col text-center"><img src={image} height="50" width="50"/></div>
      <div className="row justify-content-center">{props.headerForm} {props.photoLink}</div>
      <div className="row">
        <div className="col-7 show-photos">
          <div className="row justify-content-center primary-photo-show">
            <div className="primary-photo">
              <img src={header} height="300" width="300" />
            </div>
          </div>
          <LightboxContainer
            photos={photos}
          />
        </div>
        <div className="col-5 show-details">
          <div className="row">
            <div className="col map">
              {mapbox}
            </div>
            <div className="col">
              <div><p>Max Depth: {depth}</p></div>
              <div><p>Visibility: {vis}</p></div>
              <div><p>Water Temp: {temp}</p></div>
              <div><p>Dive Length: {length}</p></div>
            </div>
          </div>
          <div className="comments">
            <h6>Comments:</h6>
            <p>{props.logEntry.comments}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogEntryShow
