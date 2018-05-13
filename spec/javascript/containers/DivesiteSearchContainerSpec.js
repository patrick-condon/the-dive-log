import DivesiteSearchContainer from '../../../app/javascript/containers/DivesiteSearchContainer';
import TextField from '../../../app/javascript/components/TextField';
import DivesiteTile from '../../../app/javascript/components/DivesiteTile'
import MapContainer from '../../../app/javascript/containers/MapContainer'

describe('DivesiteSearchContainer', () => {
  let wrapper;

  beforeEach(() => {
    spyOn(DivesiteSearchContainer.prototype, 'handleSearchChange').and.callThrough()
    spyOn(DivesiteSearchContainer.prototype, 'handleSearchSubmit').and.callThrough()
    spyOn(DivesiteSearchContainer.prototype, 'handleDivesiteSelect')
    spyOn(DivesiteSearchContainer.prototype, 'handleClick').and.callThrough()

    let data = [
        {
          id: 1,
          name: 'Cathedral'
        }
      ]
    let responseBody = JSON.stringify(data);
    let response = new Response(responseBody, {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' }
    });
    let responsePromise = Promise.resolve(response);
    spyOn(global, 'fetch').and.returnValue(responsePromise);
    wrapper = mount(<DivesiteSearchContainer
      diveSites={ [{ id: 1, name: 'Cathedral' }] }
     />)
  })

  it('should load with the default state', () => {
    expect(wrapper.state()).toEqual({
      search: '',
      results: null,
      selectedSite: '',
      currentPage: 1,
      errors: {}
    })
  })

  it('should load with a text field for site search', () => {
    expect(wrapper.find(TextField)).toBePresent()
    expect(wrapper.find(TextField)).toHaveProp('label', 'Search for Dive Site')
  })

  it('should trigger the change function on change', () => {
    wrapper.find('[name="search"]').simulate('change')
    expect(DivesiteSearchContainer.prototype.handleSearchChange).toHaveBeenCalled()
  })

  it('should return search results from site list', () => {
    wrapper.setState({ search: 'cath' })
    wrapper.find('form').simulate('submit')
    expect(DivesiteSearchContainer.prototype.handleSearchSubmit).toHaveBeenCalled()
    expect(wrapper.find(DivesiteTile)).toBePresent()
  })

  it('should trigger the select function on click', () => {
    wrapper.setState({ search: 'cath' })
    wrapper.find('form').simulate('submit')
    wrapper.find('h4').simulate('click')
    expect(DivesiteSearchContainer.prototype.handleDivesiteSelect).toHaveBeenCalled()
  })

  it('should not search with an incomplete field', () => {
    wrapper.find('form').simulate('submit')
    expect(wrapper.find(DivesiteTile)).not.toBePresent()
    expect(wrapper.find('[className="callout alert"]').text()).toBe('Divesite must be given')
  })

  it('should display a link to create divesite if none are found', () => {
    wrapper.setState({ search: 'asdf' })
    wrapper.find('form').simulate('submit')
    expect(wrapper.find('p').text()).toBe('No results. Please search again. Or ')
    expect(wrapper.find('Link')).toHaveProp('to', '/divesites/new')
  })

})
