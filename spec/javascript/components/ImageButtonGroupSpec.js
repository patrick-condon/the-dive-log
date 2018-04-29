import ImageButtonGroup from '../../../app/javascript/components/ImageButtonGroup';

describe('ImageButtonGroup', () => {
  let wrapper,
  rotateLeft,
  rotateRight,
  handleScale,
  submitPhoto;

  beforeEach(() => {
    rotateLeft = jasmine.createSpy('rotateLeft spy')
    rotateRight = jasmine.createSpy('rotateRight spy')
    handleScale = jasmine.createSpy('handleScale spy')
    submitPhoto = jasmine.createSpy('submitPhoto spy')

    wrapper = mount(
      <ImageButtonGroup
        handleScale={handleScale}
        rotateLeft={rotateLeft}
        rotateRight={rotateRight}
        submitPhoto={submitPhoto}
      />
    )
  });

  it('renders the proper object', () => {
    expect(wrapper.find(ImageButtonGroup)).toBePresent();
  })

  describe('renders buttons for each function', () => {
    it('has a range to handle scale', () => {
      expect(wrapper.find('input')).toHaveProp('type', 'range');
      wrapper.find('input').simulate('change')
      expect(handleScale).toHaveBeenCalled();
    })

    it('has a button to handle rotate left', () => {
      expect(wrapper.find('[className="fas fa-undo-alt"]')).toBePresent();
      wrapper.find('[className="fas fa-undo-alt"]').simulate('click')
      expect(rotateLeft).toHaveBeenCalled();
    })

    it('has a button to handle rotate right', () => {
      expect(wrapper.find('[className="fas fa-redo-alt"]')).toBePresent();
      wrapper.find('[className="fas fa-redo-alt"]').simulate('click')
      expect(rotateRight).toHaveBeenCalled();
    })
    it('has a button to handle submit', () => {
      expect(wrapper.find('button').at(2)).toBePresent();
      wrapper.find('button').at(2).simulate('click')
      expect(submitPhoto).toHaveBeenCalled();
    })
  })
})
