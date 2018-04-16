import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import DivesiteSearchContainer from '../containers/DivesiteSearchContainer'
import TextField from '../components/TextField';
import DateField from '../components/DateField';
import TextAreaField from '../components/TextAreaField';
import FileField from '../components/FileField';
import NumberField from '../components/NumberField';
import BackButton from '../components/BackButton';

class LogEntryFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Add New Log Entry',
      buttonText: 'Add Entry!',
      allSites: [],
      diveSite: '',
      currentUser: null,
      date: '',
      comments: '',
      maxDepth: '',
      diveTime: '',
      visibility: '',
      waterTemp: '',
      metric: false,
      errors: {}
    }
    this.validateField = this.validateField.bind(this)
    this.handleDivesiteSet = this.handleDivesiteSet.bind(this)
    this.handleDivesiteClear = this.handleDivesiteClear.bind(this)
    this.handleMetricChange = this.handleMetricChange.bind(this)
    this.handleMaxDepthChange = this.handleMaxDepthChange.bind(this)
    this.handleDiveTimeChange = this.handleDiveTimeChange.bind(this)
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
    this.handleWaterTempChange = this.handleWaterTempChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleCommentsChange = this.handleCommentsChange.bind(this)
    this.addNewLogEntry = this.addNewLogEntry.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
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
  handleDivesiteSet(submission) {
    this.validateField(submission, { diveSite: 'Dive Site may not be blank' } )
    this.setState( { diveSite: submission } )
  }
  handleDivesiteClear() {
    this.setState({ diveSite: '' })
  }
  handleMetricChange(event) {
    if (this.state.metric == false) {
      this.setState({ metric: true })
    } else {
      this.setState({ metric: false })
    }
  }
  handleMaxDepthChange(event) {
    this.setState( { maxDepth: event.target.value } )
  }
  handleDiveTimeChange(event) {
    this.setState( { diveTime: event.target.value } )
  }
  handleVisibilityChange(event) {
    this.setState( { visibility: event.target.value } )
  }
  handleWaterTempChange(event) {
    this.setState( { waterTemp: event.target.value } )
  }
  handleDateChange(event) {
    this.validateField(event.target.value, { date: 'Please give the date' } )
    this.setState( { date: event.target.value } )
  }
  handleCommentsChange(event) {
    this.validateField(event.target.value, { comments: 'Please fill in some comments' } )
    this.setState( { comments: event.target.value } )
  }
  handleFormSubmit(event) {
    event.preventDefault();
    if (
      this.validateField(this.state.diveSite, { diveSite: 'Dive Site may not be blank' }) &&
      this.validateField(this.state.date, { date: 'Please give the date' }) &&
      this.validateField(this.state.comments, { comments: 'Please fill in some comments' })
    ) {
      let newLogEntry = { log_entry: {
        divesite_id: this.state.diveSite.id,
        user_id: this.state.currentUser.id,
        max_depth: this.state.maxDepth,
        visibility: this.state.visibility,
        water_temp: this.state.waterTemp,
        dive_length: this.state.diveTime,
        date: this.state.date,
        comments: this.state.comments
      } }
      // if (this.props.params.id) {
      //   this.editLogEntry(newLogEntry)
      // } else {
        this.addNewLogEntry(newLogEntry)
      // }
    }
  }
  componentDidMount() {
    fetch('/api/v1/divesites.json', {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        if (response.status == 401) {
          alert('Please log in to create log entry')
        } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
        }
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ allSites: body.sites, currentUser: body.user });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  addNewLogEntry(submission) {
    fetch("/api/v1/log_entries", {
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
    .then(body => browserHistory.push(`/log_entries/${body.log_entry.id}`))
    .catch(error => console.error(`Error in fetch: ${error.message}`))
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
    let title = this.state.title
    let buttonText = this.state.buttonText
    let deg = " °F", unit = " ft"
    if (this.state.metric == true) {
      deg = " °C", unit = " m"
    }
    let display, backButton
    if (this.state.diveSite == '') {
      backButton =
      <BackButton
        size="col-3 le-form-back"
      />
      display =
      <DivesiteSearchContainer
        diveSites={this.state.allSites}
        handleDivesiteSet={this.handleDivesiteSet}
      />
    } else {
      backButton =
      <div className="col-3 le-form-back text-left">
        <button
          onClick={this.handleDivesiteClear}
          className="btn btn-secondary">
          Back
        </button>
      </div>
      display =
      <form onSubmit={this.handleFormSubmit}>
        {errorDiv}
        <div className="container">
          <div className="form-group row">
            <label className="col-3">Dive Site</label>
            <div className="col-6">
              <h4>{this.state.diveSite.name}</h4>
            </div>
            <div className="form-check col-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="metric-check"
                onChange={this.handleMetricChange}
              />
              <label className="form-check-label">Metric?</label>
            </div>
          </div>
          <DateField
            handleChange={this.handleDateChange}
            label='Date of Dive'
            content={this.state.date}
          />
          <div className="form-group row justify-content-between">
            <NumberField
              content={this.state.diveTime}
              label="Time of Dive (optional)"
              name="dive-time"
              handleChange={this.handleDiveTimeChange}
              postLabel=" minutes"
            />
            <NumberField
              content={this.state.maxDepth}
              label="Max Depth (optional)"
              name="max-depth"
              handleChange={this.handleMaxDepthChange}
              postLabel={unit}
            />
            <NumberField
              content={this.state.visibility}
              label="Visibility (optional)"
              name="visibility"
              handleChange={this.handleVisibilityChange}
              postLabel={unit}
            />
            <NumberField
              content={this.state.waterTemp}
              label="Water Temperature (optional)"
              name="water-temp"
              handleChange={this.handleWaterTempChange}
              postLabel={deg}
            />
        </div>
          <TextAreaField
            content={this.state.comments}
            label="Comments:"
            name="comments"
            handleChange={this.handleCommentsChange}
          />
          <input type="submit" value={buttonText} />
        </div>
      </form>
    }
    let formDisplay
    if (this.state.currentUser) {
      formDisplay =
      <div>
          <div className="row">
            {backButton}
            <div className="col-6 text-center">
              <h2>{title}</h2>
            </div>
          </div>
          {display}
        </div>
    }
    return(
      <div className="container wrapper">
        {formDisplay}
      </div>
    )
  }
}

export default LogEntryFormContainer;
