import LogEntryShow from '../../../app/javascript/components/LogEntryShow';
import LogEntryShowContainer from '../../../app/javascript/containers/LogEntryShowContainer';
import FileField from '../../../app/javascript/components/FileField'
import ImageButtonGroup from '../../../app/javascript/components/ImageButtonGroup'
import AvatarEditor from 'react-avatar-editor'
import 'isomorphic-fetch'

describe('LogEntryShowContainer', () => {
  let wrapper,
  rotateRight;

  beforeEach(() => {
    let data = [
        {
          id: 1,
          question: 'Question goes here',
          answer: 'Answer goes here'
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
    wrapper = mount(<LogEntryShowContainer
      params={{ id: 1 }}
     />)
  })

  it('should load with the default state', () => {
    expect(wrapper.state()).toEqual({
      logEntry: {},
      currentUser: null,
      logEntryAuthor: '',
      diveSite: {},
      profilePhotoUrl: '',
      divePhotoUrls: [],
      headerPhoto: '',
      uploadFile: '',
      rotate: 0,
      scale: 1
    })
  })

  describe('once page has loaded', () => {
    beforeEach(() => {
      wrapper.setState({
        logEntry: { id: 1, divesite_id: 1, user_id: 1, date: Date.parse('2016/2/24'),
        entry_number: 1, comments: 'It was fun' },
        currentUser: { id: 1, first_name: 'Vincent', last_name: 'Adultman' },
        logEntryAuthor: { id: 1, first_name: 'Vincent', last_name: 'Adultman' },
        diveSite: { name: 'Cathedral' },
      })
    })

    it('should display information', () => {
      expect(wrapper.find('h3').text()).toBe('Log Entry #1')
      expect(wrapper.find('h5').at(0).text()).toBe('Cathedral')
      expect(wrapper.find('h5').at(1).text()).toBe('Feb 24, 2016')
    })

    it('should display buttons to add photos', () => {
      expect(wrapper.find('button').at(1).text()).toBe('Add New Primary Photo')
      expect(wrapper.find('Link').text()).toBe('Add Photos to Log Entry')
    })

    it('should have a link to the add photos page', () => {
      expect(wrapper.find('Link')).toHaveProp('to', '/log_entries/1/photos/new')
    })

    it('should display a primary photo editor modal when clicked', () => {
      wrapper.find('button').at(1).simulate('click')
      expect(wrapper.find(AvatarEditor)).toBePresent()
      expect(wrapper.find(FileField)).toBePresent()
    })

    it('should display image editing buttons only when file selected', () => {
      wrapper.find('button').at(1).simulate('click')
      expect(wrapper.find(ImageButtonGroup)).not.toBePresent()
      wrapper.setState({ uploadFile: 'www.realphoto.org/photo.jpg' })
      expect(wrapper.find(ImageButtonGroup)).toBePresent()
    })
  })
})
