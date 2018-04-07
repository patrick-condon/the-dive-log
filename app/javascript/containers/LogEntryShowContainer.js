import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor';
import LogEntryShow from '../components/LogEntryShow';
import FileField from '../components/FileField';
import { Link, browserHistory } from 'react-router';
import ImageButtonGroup from '../components/ImageButtonGroup'
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
    let img = this.editor.getImage().toDataURL()
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
    .then(body => this.setState({ headerPhoto: body.header_photo,
                                  uploadFile: '',
                                  headerClicked: false}))
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
    let headerForm, photoLink, buttonGroup
    if (this.state.uploadFile != '') {
      buttonGroup =
      <ImageButtonGroup
        handleScale={this.handleScale}
        rotateLeft={this.rotateLeft}
        rotateRight={this.rotateRight}
        submitPhoto={this.submitPhoto}
      />
    }
    if (this.state.currentUser  && this.state.currentUser.id == this.state.logEntryAuthor.id) {
      photoLink =
        <Link
          to={`/log_entries/${this.state.logEntry.id}/photos/new`}
          className="btn btn-primary">
          Add Photos to Log Entry
        </Link>
      headerForm =
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          Add New Primary Photo
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">New Primary Photo</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col text-center">
                  <AvatarEditor
                    ref={this.setEditorRef}
                    image={this.state.uploadFile}
                    width={250}
                    height={250}
                    scale={parseFloat(this.state.scale)}
                    rotate={this.state.rotate}
                  />
                  {buttonGroup}
                  <FileField
                    label="Select New Primary Photo"
                    handleChange={this.handleFileChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    let logEntry = this.state.logEntry
    let display =
      <h2>Please Log In or Sign Up to View Entry Details</h2>
    if (this.state.currentUser) {
      display =
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
    }
    return (
      <div className="container wrapper">
        {display}
      </div>
    )
  }
}

export default LogEntryShowContainer;
