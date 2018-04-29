import BackButton from '../../../app/javascript/components/BackButton'
import { Link, browserHistory } from 'react-router';

describe('BackButton', () => {
  let wrapper,
  goBack,
  size
  ;

  beforeEach(() => {
    wrapper = mount(
      <BackButton
        size=''
      />
    )
  })

  it('should render a BackButton component that has a button', () => {
    expect(wrapper.find('BackButton')).toBePresent()
    expect(wrapper.find('button')).toBePresent()
  })

  it('should only change size from props', () => {
    wrapper.setProps({ size: 'col-3'})
    expect(wrapper.find('div')).toHaveProp('className', 'col-3 text-left')
  })
})
