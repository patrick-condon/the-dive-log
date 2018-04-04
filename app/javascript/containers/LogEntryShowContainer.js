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
      scale: 1,
      headerClicked: false,
    }
    this.handleFileChange = this.handleFileChange.bind(this)
    this.submitPhoto = this.submitPhoto.bind(this)
    this.setEditorRef = this.setEditorRef.bind(this)
    this.rotateRight = this.rotateRight.bind(this)
    this.rotateLeft = this.rotateLeft.bind(this)
    this.handleScale = this.handleScale.bind(this)
    this.setClicked = this.setClicked.bind(this)
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
  setClicked(event) {
    event.preventDefault()
    if (this.state.headerClicked == false) {
      this.setState({ headerClicked: true })
    } else {
      this.setState({ headerClicked: false })
    }
  }

  render() {
    let headerForm, headerLink, photoLink, buttonGroup
    if (this.state.currentUser  && this.state.currentUser.id == this.state.logEntryAuthor.id) {
      photoLink =
        <Link
          to={`/log_entries/${this.state.logEntry.id}/photos/new`}>
          Add Photos to Log Entry
        </Link>
      if (this.state.headerClicked == false) {
        headerLink = <a href="#" onClick={this.setClicked}>Add New Header Photo?</a>
      }
    }
    if (this.state.uploadFile != '') {
      buttonGroup =
        <ImageButtonGroup
          handleScale={this.handleScale}
          rotateLeft={this.rotateLeft}
          rotateRight={this.rotateRight}
          submitPhoto={this.submitPhoto}
        />
    }
    if (this.state.headerClicked == true) {
      headerLink = ''
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
          {buttonGroup}
          <FileField
            label="Select New Headline Photo"
            handleChange={this.handleFileChange}
          />
          <a href="#" onClick={this.setClicked}>Close Photo Selector</a>
        </div>
    }
    let logEntry = this.state.logEntry

    return (
      <div className="container">
        <Link to="/">Back to Recent Log Entries</Link>
        <LogEntryShow
          logEntry={logEntry}
          author={this.state.logEntryAuthor}
          diveSite={this.state.diveSite}
          authorPhoto={this.state.profilePhotoUrl}
          headerPhoto={this.state.headerPhoto}
          headerForm={headerForm}
          photoLink={photoLink}
          headerLink={headerLink}
          photos={this.state.divePhotoUrls}
        />
      </div>
    )
  }
}

export default LogEntryShowContainer;
