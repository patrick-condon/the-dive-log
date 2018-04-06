import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import TextField from '../components/TextField';
import BackButton from '../components/BackButton';
import MapContainer from '../containers/MapContainer'

class DivesiteFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      siteName: '',
      coordinates: { lng: -80.03211398925986,
                     lat: 26.77125415352762 },
      clicked: false,
      errors: []
    }
    this.setCoordinates = this.setCoordinates.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.validateField = this.validateField.bind(this)
    this.submitDivesite = this.submitDivesite.bind(this)
    this.addNewDivesite = this.addNewDivesite.bind(this)
  }
  validateField(text, error) {
    if (text === '' || text === ' ') {
      let newError = error
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      let errorKey = Object.keys(error)[0]
      delete errorState[errorKey]
      this.setState({ errors: errorState })
      return true
    }
  }
  setCoordinates(coordinates) {
    this.setState({ coordinates: coordinates, clicked: true })
  }
  handleNameChange(event) {
    this.validateField(event.target.value, { siteName: 'Divesite Name Must Be Given'})
    this.setState({ siteName: event.target.value })
  }
  submitDivesite() {
    if (this.validateField(this.state.siteName, { siteName: 'Divesite Name Must Be Given'})){
      let newDivesite = { divesite: {
        name: this.state.siteName,
        lat: this.state.coordinates.lat,
        lng: this.state.coordinates.lng
      } }
      this.addNewDivesite(newDivesite)
    }
  }
  addNewDivesite(submission) {
    fetch("/api/v1/divesites", {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(submission)
    }).then(response => {
        if (response.ok) {
          return response
        } else {
          if (response.status == 401) {
            alert('You must be signed in to do that')
          } else {
          let errorMessage = `${response.status}`
          error = new Error(errorMessage)
          throw(error)
          }
        }
      }
    )
    .then(response => response.json())
    .then(body => browserHistory.push(`/divesites/${body.divesite.id}`))
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render() {
    let submitButton
    if (this.state.clicked == true) {
      submitButton =
        <div className="row justify-content-center">
          <p>Click here to submit divesite at this location</p>
          <button className="btn btn-primary" onClick={this.submitDivesite}>Submit
          </button>
        </div>
    }
    let errorDiv
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    return(
      <div className="container wrapper">
        <div className="col-12 text-center">
          <div className="row">
            <BackButton
              size="col-3"
            />
            <h2 className="col-6">Add a DiveSite</h2>
          </div>
          {errorDiv}
          <TextField
            content={this.state.siteName}
            label="Dive Site Name"
            name="divesite-name"
            type="text"
            handleChange={this.handleNameChange}
          />
        </div>
        <div className="col-12">
          <div className="row justify-content-center">
            <p>Click on map to select divesite location</p>
          </div>
          <div className="row">
            <MapContainer
              size="col-9"
              height="70vh"
              width="100%"
              lat={this.state.coordinates.lat}
              lng={this.state.coordinates.lng}
              setCoordinates={this.setCoordinates}
            />
          <div className="col-3">
              {submitButton}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default DivesiteFormContainer;
