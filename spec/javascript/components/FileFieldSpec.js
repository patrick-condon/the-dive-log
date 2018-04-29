import FileField from '../../../app/javascript/components/FileField'

describe('FileField', () => {
  let wrapper,
  handleChange
  ;

  beforeEach(() => {
    handleChange = jasmine.createSpy('handleChange spy');
    wrapper = mount(
      <FileField
        handleChange={handleChange}
      />
    )
  })

  it('should render a FileField component that has an input field', () => {
    expect(wrapper.find('FileField')).toBePresent()
    expect(wrapper.find('input')).toBePresent()
  })

  it('should only accept image files', () => {
    expect(wrapper.find('input')).toHaveProp('type', 'file')
    expect(wrapper.find('input')).toHaveProp('accept', 'image/*')
  })

  it('should invoke the handleChange from props on change', () => {
    wrapper.find('input').simulate('change');
    expect(handleChange).toHaveBeenCalled();
  })

})
