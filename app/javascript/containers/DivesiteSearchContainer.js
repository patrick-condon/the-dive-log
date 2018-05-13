import React, { Component } from 'react';
import TextField from '../components/TextField';
import DivesiteTile from '../components/DivesiteTile'
import MapContainer from '../containers/MapContainer'
import { Link } from 'react-router'

class DivesiteSearchContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      results: null,
      selectedSite: '',
      currentPage: 1,
      errors: {}
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleDivesiteSelect = this.handleDivesiteSelect.bind(this)
    this.validateField = this.validateField.bind(this)
    this.handleClick = this.handleClick.bind(this)
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
  handleSearchChange(event) {
    this.validateField(event.target.value, { search: 'Divesite must be given'})
    this.setState({ search: event.target.value })
  }
  handleDivesiteSelect(submission) {
    this.setState({ selectedSite: submission })
  }
  handleSearchSubmit(event) {
    event.preventDefault();
    if (this.validateField(this.state.search, { search: 'Divesite must be given'})) {
      let sites = this.props.diveSites
      let search = this.state.search
      let results = sites.filter(site =>
        site.name.toLowerCase().includes(search.toLowerCase())
      )
      this.setState({ results: results, selectedSite: '' })
    }
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
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
    let resultsPerPage = 8
    let results, pages, pageResults, lastIndex, firstIndex
    if (this.state.results) {
      if (this.state.results.length > 0) {
        let allResults = this.state.results
        if (allResults.length > resultsPerPage){
          lastIndex = this.state.currentPage * resultsPerPage
          firstIndex = lastIndex - resultsPerPage
          pageResults = allResults.slice(firstIndex, lastIndex)
        } else {
          pageResults = allResults
        }
        results = pageResults.map(result => {
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
        let pageNumbers = []
        for (let i = 1; i <= Math.ceil(allResults.length / resultsPerPage); i++) {
              pageNumbers.push(i);
            }
        pages = pageNumbers.map(number => {
          let className = "page-item"
          let link =
            <a
              id={number}
              href="#"
              className="page-link"
              onClick={this.handleClick}
            >
            {number}
            </a>
          if (number == this.state.currentPage) {
            className = "page-item active"
            link =
            <span className="page-link">
              {number}
            </span>
          }
          return (
            <li className={className} key={number}>
              {link}
            </li>
          );
        })
      } else {
        results =
          <div>
            <p>No results. Please search again. Or </p>
            <Link to="/divesites/new" className="btn btn-primary">
              Click Here to Add a New DiveSite
            </Link>
          </div>
        }
    }
    let submitClick = () => {this.props.handleDivesiteSet(this.state.selectedSite)}
    let mapbox, submitLink
    if (this.state.selectedSite != '') {
      mapbox =
      <MapContainer
        height="30vh"
        width="90%"
        lat={this.state.selectedSite.lat}
        lng={this.state.selectedSite.lng}
      />
      submitLink =
      <div className="row justify-content-center">
        <a href="#" onClick={submitClick} className="btn btn-primary">
          Click here to select {this.state.selectedSite.name}
        </a>
      </div>
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
          <div className="col-md-6 site-results" id="results">
            {results}
            <ul className="pagination">
              {pages}
            </ul>
          </div>
          <div className="col-md-6 site-result-map">
            {mapbox}
          </div>
        </div>
        {submitLink}
      </div>
    )
  }
}

export default DivesiteSearchContainer;
