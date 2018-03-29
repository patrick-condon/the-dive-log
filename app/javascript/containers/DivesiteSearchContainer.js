import React, { Component } from 'react';
import TextField from '../components/TextField';
import DivesiteTile from '../components/DivesiteTile'

class DivesiteSearchContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      results: [],
      errors: {}
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }
  handleSearchChange(event) {
    this.props.validateField(event.target.value, { search: 'Divesite must be given'})
    this.setState({ search: event.target.value })
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
    let results = this.state.results.map(result => {
      let handleClick = () => {this.props.handleDivesiteSet(result)}
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
        {results}
      </div>
    )
  }
}

export default DivesiteSearchContainer;
