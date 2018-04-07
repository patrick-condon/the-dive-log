import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import MapContainer from '../containers/MapContainer'

class DivesiteShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      divesite: {}
    }
  }
  componentDidMount() {
    let id = this.props.params.id
    fetch(`/api/v1/divesites/${id}`,{
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ divesite: body.divesite });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render() {
    let mapbox
    if (this.state.divesite.lat) {
      mapbox =
        <MapContainer
          size="col-md-9"
          height="70vh"
          width="100%"
          lat={this.state.divesite.lat}
          lng={this.state.divesite.lng}
        />
    }
    return(
      <div className="container wrapper">
        <div className="row">
          <div className="col-md-3">
            <Link to="/" className="btn btn-secondary le-form-back">Recent Log Entries</Link>
          </div>
          <h2 className="col-md-6 text-center">{this.state.divesite.name}</h2>
        </div>
        <div className="row">
          {mapbox}
          <div className="col-md-3 text-center">
            <p>Click here to create Log Entry</p>
            <Link to="/log_entries/new" className="btn btn-primary">Create</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default DivesiteShowContainer;
