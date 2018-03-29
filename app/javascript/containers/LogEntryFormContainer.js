import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import TextField from '../components/TextField';
import SelectField from '../components/SelectField';
import DateField from '../components/DateField';
import TextAreaField from '../components/TextAreaField';
import FileField from '../components/FileField';

class LogEntryFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Add New Log Entry',
      buttonText: 'Add Entry!',
      allSites: [],
      diveSiteId: '',
      currentUser: {},
      date: '',
      comments: '',
      maxDepth: '',
      errors: {}
    }
    this.validateField = this.validateField.bind(this)
    this.handleDiveSiteChange = this.handleDiveSiteChange.bind(this)
    this.handleMaxDepthChange = this.handleMaxDepthChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
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
  handleMaxDepthChange(event) {
    this.setState( { maxDepth: event.target.value } )
  }
  handleDiveSiteChange(event) {
    this.validateField(event.target.value, { diveSiteId: 'Dive Site may not be blank' } )
    this.setState( { diveSiteId: event.target.value } )
  }
  handleDateChange(event) {
    this.validateField(event.target.value, { date: 'Please give the date' } )
    this.setState( { date: event.target.value } )
  }
  handleCommentsChange(event) {
    this.validateField(event.target.value, { comments: 'Please fill in some comments' } )
    this.setState( { comments: event.target.value } )
  }
  handleFileChange(event) {
      this.setState({ headerPhoto: event.target.files[0] })
  }
  handleFormSubmit(event) {
    event.preventDefault();
    if (
      this.validateField(this.state.diveSiteId, { diveSiteId: 'Dive Site may not be blank' }) &&
      this.validateField(this.state.date, { date: 'Please give the date' }) &&
      this.validateField(this.state.comments, { comments: 'Please fill in some comments' })
    ) {
      let newLogEntry = { log_entry: {
        divesite_id: this.state.diveSiteId,
        user_id: this.state.currentUser.id,
        max_depth: this.state.maxDepth,
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
    fetch('/api/v1/divesites', {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        if (response.status == 401) {
          alert('You must be signed in to do that')
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
    console.log(this.state.headerPhoto)
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
    return(
      <form onSubmit={this.handleFormSubmit}>
        <h2>{title}</h2>
        {errorDiv}
        <div className="container">
          <SelectField
            handlerFunction={this.handleDiveSiteChange}
            name='divesite'
            label='Dive Site'
            options={this.state.allSites}
            selectedOption={this.state.diveSiteId}
          />
          <DateField
            handleChange={this.handleDateChange}
            label='Date of Dive'
            content={this.state.date}
          />
          <TextField
            content={this.state.maxDepth}
            label="Max Depth (optional)"
            name="max-depth"
            type="text"
            handleChange={this.handleMaxDepthChange}
          />
          <TextAreaField
            content={this.state.comments}
            label="Comments:"
            name="comments"
            type="textarea"
            handleChange={this.handleCommentsChange}
          />
          <input type="submit" value={buttonText} />
        </div>
      </form>
    )
  }
}

export default LogEntryFormContainer;
