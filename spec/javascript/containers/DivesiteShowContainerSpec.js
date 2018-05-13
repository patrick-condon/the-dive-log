import DivesiteShowContainer from '../../../app/javascript/containers/DivesiteShowContainer';
import MapContainer from '../../../app/javascript/containers/MapContainer';

describe('DivesiteShowContainer', () => {
  let wrapper;

  beforeEach(() => {
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
    wrapper = mount(<DivesiteShowContainer
      params={{ id: 1 }}
     />)
  })

  it('should load with the default state', () => {
    expect(wrapper.state()).toEqual({
      divesite: {}
    })
  })

  describe('once page has loaded', () => {
    beforeEach(() => {
      wrapper.setState({
        divesite: { name: 'Cathedral' }
      })
    })

    it('should display information', () => {
      expect(wrapper.find('h2').text()).toBe('Cathedral')
    })

    it('should not display a map container without coordinates', () => {
      expect(wrapper.find(MapContainer)).not.toBePresent()
    })
  })
})
