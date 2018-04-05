import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import AvatarEditor from 'react-avatar-editor'
import Thumbnail from '../components/Thumbnail'
import FileField from '../components/FileField';
import ImageButtonGroup from '../components/ImageButtonGroup'
import BackButton from '../components/BackButton'

class PhotoUploadContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "Upload Photos",
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
  handleFileChange(event) {
      this.setState({ uploadFile: event.target.files[0] })
  }
  submitPhoto(event) {
    event.preventDefault();
    let id = this.props.params.id
    let img = this.editor.getImage().toDataURL()
    let formPayLoad = new FormData();
    formPayLoad.append('dive_photo', img);
    fetch(`/api/v1/log_entries/${id}/photos`, {
      method: 'POST',
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
    .then(body => browserHistory.push(`/log_entries/${body.log_entry.id}`))
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
    let buttonGroup
    if (this.state.uploadFile != '') {
      buttonGroup =
        <ImageButtonGroup
          handleScale={this.handleScale}
          rotateLeft={this.rotateLeft}
          rotateRight={this.rotateRight}
          submitPhoto={this.submitPhoto}
        />
    }

    return(
      <div className="container wrapper">
          <div  className='col text-center'>
            <div className='row'>
              <BackButton
                size="col-3"
              />
              <h2 className="col-6">{this.state.title}</h2>
            </div>
            <FileField
              class="row justify-content-center"
              handleChange={this.handleFileChange}
            />
            <AvatarEditor
              ref={this.setEditorRef}
              image={this.state.uploadFile}
              width={500}
              height={500}
              scale={parseFloat(this.state.scale)}
              rotate={this.state.rotate}
            />
            {buttonGroup}
          </div>
      </div>
    )
  }
}
export default PhotoUploadContainer
