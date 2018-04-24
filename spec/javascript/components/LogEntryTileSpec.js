import LogEntryTile from '../../../app/javascript/components/LogEntryTile';

describe('LogEntryTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <LogEntryTile
        id='1'
        siteName='Cathedral'
        photo={'www.realphoto.org/photo.jpg'}
        date={'2016-3-24'}
      />
    )
  });

  it('renders a list tag with the log entry name', () => {
    expect(wrapper.find('h3').text()).toBe('Cathedral')
  })

  it('contains a link to the log entry page', () => {
    expect(wrapper.find('Link')).toHaveProp('to', `/log_entries/1`)
  })

  it('shows the date of the dive', () => {
    expect(wrapper.find('h5').text()).toBe('2016-3-24')
  })

  it('shows a header image', () => {
    expect(wrapper.find('img')).toHaveProp('src', 'www.realphoto.org/photo.jpg')
  })
})
