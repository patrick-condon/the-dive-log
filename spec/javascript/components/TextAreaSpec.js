import TextAreaField from '../../../app/javascript/components/TextAreaField'

describe('TextAreaField', () => {
  let wrapper,
  handleChange,
  name,
  label,
  content;

  beforeEach(() => {
    handleChange = jasmine.createSpy('handleChange spy');
    wrapper = mount(
      <TextAreaField
        handleChange={handleChange}
        content=''
        name=''
        label=''
      />
    )
  })

  it('should render a TextAreaField component that has an input field and a label', () => {
    expect(wrapper.find('TextAreaField')).toBePresent()
    expect(wrapper.find('textarea')).toBePresent()
    expect(wrapper.find('label')).toBePresent()
  })

  it('should display a label passed down through props', () => {
    wrapper.setProps({label: 'Field Label'})
    expect(wrapper.find('label').text()).toBe('Field Label')
  })

  it('should invoke the handleChange from props on change', () => {
    wrapper.find('textarea').simulate('change');
    expect(handleChange).toHaveBeenCalled();
  })

  it('should inherit value and name from props when content changes', () => {
    wrapper.setProps({content: 'Typed text', name: 'Name'});
    expect(wrapper.find('textarea')).toHaveProp('value', 'Typed text')
    expect(wrapper.find('textarea')).toHaveProp('name', 'Name')
  })
})
