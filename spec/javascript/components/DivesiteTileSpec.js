import DivesiteTile from '../../../app/javascript/components/DivesiteTile';

describe('DivesiteTile', () => {
  let wrapper, handleClick;

  beforeEach(() => {
    handleClick = jasmine.createSpy('handleClick spy')
    wrapper = mount(
      <DivesiteTile
        name='Cathedral'
        handleClick={handleClick}
      />
    )
  });

  it('renders a link with the divesite name', () => {
    expect(wrapper.find('a').text()).toBe('Cathedral')
  })

  it('triggers the click function when clicked', () => {
    wrapper.find('a').simulate('click')
    expect(handleClick).toHaveBeenCalled()
  })
})
