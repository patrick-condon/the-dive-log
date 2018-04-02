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
          height="70vh"
          width="100vh"
          lat={this.state.divesite.lat}
          lng={this.state.divesite.lng}
        />
    }
    return(
      <div className="container">
        <h2>{this.state.divesite.name}</h2>
        {mapbox}
        <Link to="/log_entries/new">Create Log Entry</Link>
      </div>
    )
  }
}

export default DivesiteShowContainer;
