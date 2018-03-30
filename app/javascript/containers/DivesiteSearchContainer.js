import React, { Component } from 'react';
import TextField from '../components/TextField';
import DivesiteTile from '../components/DivesiteTile'
import MapContainer from '../containers/MapContainer'

class DivesiteSearchContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      results: null,
      selectedSite: '',
      errors: {}
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleDivesiteSelect = this.handleDivesiteSelect.bind(this)
  }
  handleSearchChange(event) {
    this.props.validateField(event.target.value, { search: 'Divesite must be given'})
    this.setState({ search: event.target.value })
  }
  handleDivesiteSelect(submission) {
    this.setState({ selectedSite: submission })
  }
  handleSearchSubmit(event) {
    event.preventDefault();
    let sites = this.props.diveSites
    let search = this.state.search
    let results = sites.filter(site =>
      site.name.toLowerCase().includes(search.toLowerCase())
    )
    this.setState({ results: results })
  }

  render() {
    let errorDiv
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    let results
    if (this.state.results) {
      if (this.state.results.length > 0) {
        results = this.state.results.map(result => {
          let handleClick = () => {this.handleDivesiteSelect(result)}
          return(
            <DivesiteTile
              key={result.id}
              name={result.name}
              lat={result.lat}
              lng={result.lng}
              handleClick={handleClick}
            />
          )
        })
      } else {
        results = 'No results. Please search again'
      }
    }
    let submitClick = () => {this.props.handleDivesiteSet(this.state.selectedSite)}
    let mapbox, submitLink
    if (this.state.selectedSite != '') {
      mapbox =
      <MapContainer
        lat={this.state.selectedSite.lat}
        lng={this.state.selectedSite.lng}
      />
      submitLink =
      <a href="#" onClick={submitClick}>
        Click here to select {this.state.selectedSite.name}
      </a>
    }
    return(
      <div className="container">
        {errorDiv}
        <form onSubmit={this.handleSearchSubmit}>
          <TextField
            content={this.state.search}
            label="Search for Dive Site"
            name="search"
            type="text"
            handleChange={this.handleSearchChange}
          />
          <input type="submit" value="Search" />
        </form>
        <div className="row">
          <div className="col-6">
            {results}
          </div>
          <div className="col-6">
            {mapbox}
          </div>
        </div>
        {submitLink}
      </div>
    )
  }
}

export default DivesiteSearchContainer;
