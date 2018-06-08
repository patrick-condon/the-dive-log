import LogEntryTile from '../../../app/javascript/components/LogEntryTile';
import LogEntriesIndexContainer from '../../../app/javascript/containers/LogEntriesIndexContainer';
import 'isomorphic-fetch'

describe('LogEntriesIndexContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<LogEntriesIndexContainer />)
  })

  it('should load with the default state', () => {
    expect(wrapper.state()).toEqual({
      allLogEntries: [],
      diveSites: [],
      headerPhotos: [],
      currentPage: 1,
      title: 'Recent Dive Log Entries'
    })
  })

  it('should display the title as an h2', () => {
    expect(wrapper.find('h2')).toBePresent()
    expect(wrapper.find('h2').text()).toEqual('Recent Dive Log Entries')
  })

  it('should display the log entry tile after loading information', () => {
    wrapper.setState({
      allLogEntries: [{ id: 1, divesite_id: 1, user_id: 1, date: Date.parse('2016/2/24'),
                        comments: 'It was fun'}],
      diveSites: [{ id: 1, name: 'Cathedral', lat: 18, lng: 40}],
      headerPhotos: ['www.realphoto.org/photo.jpg']
    })
    expect(wrapper.find(LogEntryTile)).toBePresent()
    expect(wrapper.find('h3').text()).toEqual('Cathedral')
    expect(wrapper.find('img').at(3)).toHaveProp('src', 'www.realphoto.org/photo.jpg')
  })

  it('should display a link to create new log entry', () => {
    expect(wrapper.find('a').at(2).text()).toBe('Add New Log Entry')
  })
  it('should display a link to create new log divesite', () => {
    expect(wrapper.find('a').at(3).text()).toBe('Add New DiveSite')
  })
})
