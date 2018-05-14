import Thumbnail from '../../../app/javascript/components/Thumbnail';

describe('Thumbnail', () => {
  let wrapper, photoClick;

  beforeEach(() => {
    photoClick = jasmine.createSpy('photoClick spy')
    wrapper = mount(
      <Thumbnail
        id='1'
        image='realpic.jpg'
        photoClick={photoClick}
      />
    )
  });

  it('renders an image linked from props', () => {
    expect(wrapper.find('img')).toHaveProp('src', 'realpic.jpg')
  })

  it('triggers the click function when clicked', () => {
    wrapper.find('img').simulate('click')
    expect(photoClick).toHaveBeenCalled()
  })
})
