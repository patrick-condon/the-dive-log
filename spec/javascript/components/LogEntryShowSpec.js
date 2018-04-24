import LogEntryShow from '../../../app/javascript/components/LogEntryShow';
import BackButton from '../../../app/javascript/components/BackButton'
import LightboxContainer from '../../../app/javascript/containers/LightboxContainer'

describe('LogEntryShow', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <LogEntryShow
        id='1'
        diveSite={{ name: 'Cathedral' }}
        date={'2016-3-24'}
        photos={[]}
        headerPhoto={'www.realphoto.org/photo.jpg'}
        authorPhoto={'www.realphoto.org/face_photo.jpg'}
        logEntry={{ id: 1, divesite_id: 1, user_id: 1, date: Date.parse('2016/2/24'),
                  entry_number: 1, comments: 'It was fun' }}
        author={{ id: 1, first_name: 'Vincent', last_name: 'Adultman' }}
      />
    )
  });

  it('renders an h3 entry number', () => {
    expect(wrapper.find('h3').text()).toBe('Log Entry #1')
  })

  it('renders an h5 log entry name', () => {
    expect(wrapper.find('h5').at(0).text()).toBe('Cathedral')
  })

  it('renders an h5 date converted to readable months', () => {
    expect(wrapper.find('h5').at(1).text()).toBe('Feb 24, 2016')
  })

  it('renders a backbutton', () => {
    expect(wrapper.find(BackButton)).toBePresent()
  })

  it('renders a lightbox container', () => {
    expect(wrapper.find(LightboxContainer)).toBePresent()
  })

  it('shows author name/image and header image', () => {
    expect(wrapper.find('p').at(0).text()).toBe('By Vincent Adultman')
    expect(wrapper.find('img').at(0)).toHaveProp('src', 'www.realphoto.org/face_photo.jpg')
    expect(wrapper.find('img').at(1)).toHaveProp('src', 'www.realphoto.org/photo.jpg')
  })

  it('autopopulates responses to unfilled fields', () => {
    expect(wrapper.find('p').at(1).text()).toBe('Max Depth: Not Given')
    expect(wrapper.find('p').at(2).text()).toBe('Visibility: Not Given')
    expect(wrapper.find('p').at(3).text()).toBe('Water Temp: Not Given')
    expect(wrapper.find('p').at(4).text()).toBe('Dive Length: Not Given')
  })

  it('displays correect responses when given with measures', () => {
    wrapper.setProps({
      logEntry: { id: 1, divesite_id: 1, user_id: 1, date: Date.parse('2016/2/24'),
                  entry_number: 1, comments: 'It was fun', max_depth: 45,
                  visibility: 90, water_temp: 80, dive_length: 65}
    })
    expect(wrapper.find('p').at(1).text()).toBe('Max Depth: 45 ft')
    expect(wrapper.find('p').at(2).text()).toBe('Visibility: 90 ft')
    expect(wrapper.find('p').at(3).text()).toBe('Water Temp: 80 °F')
    expect(wrapper.find('p').at(4).text()).toBe('Dive Length: 65 min')
  })
  it('displays the comments', () => {
    expect(wrapper.find('p').at(5).text()).toBe('It was fun')
  })
})
