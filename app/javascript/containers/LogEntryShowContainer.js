import React, { Component } from 'react';
import LogEntryShow from '../components/LogEntryShow';
import FileField from '../components/FileField';
import { Link, browserHistory } from 'react-router';
import AvatarEditor from 'react-avatar-editor'
import Thumbnail from '../components/Thumbnail'

class LogEntryShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logEntry: {},
      currentUser: null,
      logEntryAuthor: '',
      diveSite: {},
      profilePhotoUrl: '',
      divePhotoUrls: [],
      headerPhoto: '',
      uploadFile: '',
      rotate: 0,
      scale: 1
    }
    this.handleFileChange = this.handleFileChange.bind(this)
    this.submitPhoto = this.submitPhoto.bind(this)
    this.setEditorRef = this.setEditorRef.bind(this)
    this.rotateRight = this.rotateRight.bind(this)
    this.rotateLeft = this.rotateLeft.bind(this)
    this.handleScale = this.handleScale.bind(this)
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
                    headerPhoto: body.header_photo,
                    divePhotoUrls: body.photos });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  handleFileChange(event) {
      this.setState({ uploadFile: event.target.files[0] })
  }
  submitPhoto(event) {
    event.preventDefault();
    let id = this.state.logEntry.id
    let img = this.editor.getImageScaledToCanvas().toDataURL()
    let formPayLoad = new FormData();
    formPayLoad.append('header_photo', img);
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
  setEditorRef = editor => {
    if (editor) this.editor = editor
  }
  rotateRight = e => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90,
    })
  }
  rotateLeft = e => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate - 90,
    })
  }
  handleScale = e => {
      const scale = parseFloat(e.target.value)
      this.setState({ scale })
    }

  render() {
    let headerForm, photoLink
    if (this.state.currentUser  && this.state.currentUser.id == this.state.logEntryAuthor.id) {
      headerForm =
        <div className='container'>
          <AvatarEditor
            ref={this.setEditorRef}
            image={this.state.uploadFile}
            width={250}
            height={250}
            scale={parseFloat(this.state.scale)}
            rotate={this.state.rotate}
          />
          <div className="row">
            <input
              name="scale"
              type="range"
              // className="form-control"
              onChange={this.handleScale}
              min=".5"
              max="2"
              step="0.01"
              defaultValue="1"
            />
            <label>Zoom</label>
          </div>
          <div className="row">
            <button onClick={this.rotateLeft} className="btn btn-secondary">
              <i className="fas fa-undo-alt"></i>
            </button>
            <button onClick={this.rotateRight} className="btn btn-secondary">
              <i className="fas fa-redo-alt"></i>
            </button>
            <button onClick={this.handleFileSet} className="btn btn-secondary">
              <i className="far fa-save"></i>
            </button>
            <button onClick={this.submitPhoto} className="btn btn-secondary">
              Upload Picture
            </button>
          </div>
          <FileField
            label="Select New Headline Photo"
            handleChange={this.handleFileChange}
          />
        </div>
      photoLink =
        <Link
          to={`/log_entries/${this.state.logEntry.id}/photos/new`}>
          Add Photos to Log Entry
        </Link>
    }
    let logEntry = this.state.logEntry

    return (
      <div className="container">
        <LogEntryShow
          logEntry={logEntry}
          author={this.state.logEntryAuthor}
          diveSite={this.state.diveSite}
          authorPhoto={this.state.profilePhotoUrl}
          headerPhoto={this.state.headerPhoto}
          headerForm={headerForm}
          photoLink={photoLink}
          photos={this.state.divePhotoUrls}
        />
        <Link to="/">Back to Recent Log Entries</Link>
      </div>
    )
  }
}

export default LogEntryShowContainer;
