import LightboxContainer from '../../../app/javascript/containers/LightboxContainer'
import Lightbox from 'react-images'
import Thumbnail from '../../../app/javascript/components/Thumbnail'

describe('LightboxContainer', () => {
  let wrapper

  beforeEach(() => {
    spyOn(LightboxContainer.prototype, 'openLightbox').and.callThrough()
    wrapper = mount(
      <LightboxContainer
        photos={ [{id: 1, src: 'realpic.jpg'}] }
      />
    )
  })
  it('loads with the default state', () => {
    expect(wrapper.state()).toEqual({
      currentImage: 0,
      lightboxOpen: false
    })
  })

  it('displays a lightbox component', () => {
    expect(wrapper.find('Lightbox')).toBePresent()
  })

  it('displays Thumbnail objects of the photos from props', () => {
    expect(wrapper.find('Thumbnail')).toHaveProp('image', 'realpic.jpg')
    expect(wrapper.find('img')).toHaveProp('src', 'realpic.jpg')
  })

  it('opens the lightbox upon clicking the Thumbnail', () => {
    wrapper.find('img').simulate('click')
    expect(LightboxContainer.prototype.openLightbox).toHaveBeenCalled()
    expect(wrapper.state()).toEqual({
      currentImage: 0,
      lightboxOpen: true
    })
  })
})
