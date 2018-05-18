import React, { Component } from 'react'
import { Link } from 'react-router';
import Lightbox from 'react-images'
import Thumbnail from '../components/Thumbnail'

class LightboxContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImage: 0,
      lightboxOpen: false
    }
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }
  openLightbox (index) {
		this.setState({
			currentImage: index,
			lightboxOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}

  render() {
    let images = this.props.photos.map((image, index) => {
      return(
        <Thumbnail
          key={index}
          id={index}
          image={image.src}
          photoClick={this.openLightbox}
        />
      )
    })
    return (
      <div className="container">
        <Lightbox
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxOpen}
          images={this.props.photos}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClose={this.closeLightbox}
        />
        <div className="row justify-content-center">
          {images}
        </div>
      </div>
    )
  }
}

export default LightboxContainer;
