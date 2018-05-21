import PhotoUploadContainer from '../../../app/javascript/containers/PhotoUploadContainer'
import AvatarEditor from 'react-avatar-editor'
import Thumbnail from '../../../app/javascript/components/Thumbnail'
import FileField from '../../../app/javascript/components/FileField'
import ImageButtonGroup from '../../../app/javascript/components/ImageButtonGroup'
import BackButton from '../../../app/javascript/components/BackButton'

describe('PhotoUploadContainer', () => {
  let wrapper

  beforeEach(() => {
    spyOn(PhotoUploadContainer.prototype, 'submitPhoto')
    wrapper = mount(
      <PhotoUploadContainer
        params={ {id: 1} }
      />
    )
  })
  it('loads with the default state', () => {
    expect(wrapper.state()).toEqual({
      title: "Upload Photos",
      uploadFile: '',
      rotate: 0,
      scale: 1
    })
  })

  it('displays back button and file field components', () => {
    expect(wrapper.find('BackButton')).toBePresent()
    expect(wrapper.find('FileField')).toBePresent()
  })

  it('displays an avatar editor component', () => {
    expect(wrapper.find(AvatarEditor)).toBePresent()
  })

  it('changes the image and rotation with state', () => {
    wrapper.setState({ uploadFile: 'realpic.jpg', rotate: 90 })
    expect(wrapper.find(AvatarEditor)).toHaveProp('image', 'realpic.jpg')
    expect(wrapper.find(AvatarEditor)).toHaveProp('rotate', 90)
  })

  it('displays buttons when image is selected', () => {
    wrapper.setState({ uploadFile: 'realpic.jpg' })
    expect(wrapper.find(ImageButtonGroup)).toBePresent()
  })

  it('triggers the submit function when button is clicked', () => {
    wrapper.setState({ uploadFile: 'realpic.jpg' })
    wrapper.find('button').at(3).simulate('click')
    expect(PhotoUploadContainer.prototype.submitPhoto).toHaveBeenCalled()
  })
})
