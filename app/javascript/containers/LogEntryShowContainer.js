import React, { Component } from 'react';
import LogEntryShow from '../components/LogEntryShow';
import FileField from '../components/FileField';

class LogEntryShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logEntry: {},
      currentUser: {},
      logEntryAuthor: {},
      diveSite: {},
      profilePhotoUrl: '',
      headerPhoto: ''
    }
    this.handleFileChange = this.handleFileChange.bind(this)
    this.submitPhoto = this.submitPhoto.bind(this)
  }

  componentDidMount() {
  let id = this.props.params.id
  fetch(`/api/v1/log_entries/${id}`,{
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
      this.setState({ logEntry: body.log_entry, currentUser: body.user,
                    logEntryAuthor: body.author, diveSite: body.site,
                    profilePhotoUrl: body.photo_address,
                    headerPhoto: body.header_photo });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  handleFileChange(event) {
      this.setState({ headerPhoto: event.target.files[0] })
  }
  submitPhoto(event) {
    event.preventDefault();
    let id = this.state.logEntry.id
    let formPayLoad = new FormData();
    formPayLoad.append('header_photo', this.state.headerPhoto);
    fetch(`/api/v1/log_entries/${id}`, {
      method: 'PATCH',
      credentials: 'same-origin',
      body: formPayLoad
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
    .then(body => this.setState({ headerPhoto: body.header_photo }))
  };

  render() {
    let headerForm
    if (this.state.currentUser.id == this.state.logEntryAuthor.id) {
      headerForm =  <form onSubmit={this.submitPhoto} className='container'>
                      <FileField
                        label="UpLoad New Headline Photo"
                        handleChange={this.handleFileChange}
                      />
                      <input type="submit" value="Upload Picture" />
                    </form>
    }
    let logEntry = this.state.logEntry
    return (
      <div>
        <LogEntryShow
          logEntry={logEntry}
          author={this.state.logEntryAuthor}
          diveSite={this.state.diveSite}
          authorPhoto={this.state.profilePhotoUrl}
          headerPhoto={this.state.headerPhoto}
        />
        {headerForm}
      </div>
    )
  }
}

export default LogEntryShowContainer;
