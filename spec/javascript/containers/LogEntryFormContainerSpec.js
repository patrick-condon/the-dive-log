import LogEntryFormContainer from '../../../app/javascript/containers/LogEntryFormContainer';
import DivesiteSearchContainer from '../../../app/javascript/containers/DivesiteSearchContainer';
import DateField from '../../../app/javascript/components/DateField'
import NumberField from '../../../app/javascript/components/NumberField'
import TextAreaField from '../../../app/javascript/components/TextAreaField'

describe('LogEntryFormContainer', () => {
  let wrapper,
  rotateRight;

  beforeEach(() => {
    spyOn(LogEntryFormContainer.prototype, 'handleCommentsChange').and.callThrough();
    spyOn(LogEntryFormContainer.prototype, 'handleDiveTimeChange').and.callThrough();
    spyOn(LogEntryFormContainer.prototype, 'handleMaxDepthChange').and.callThrough();
    spyOn(LogEntryFormContainer.prototype, 'handleVisibilityChange').and.callThrough();
    spyOn(LogEntryFormContainer.prototype, 'handleWaterTempChange').and.callThrough();
    spyOn(LogEntryFormContainer.prototype, 'handleDateChange').and.callThrough();
    spyOn(LogEntryFormContainer.prototype, 'handleMetricChange').and.callThrough();
    spyOn(LogEntryFormContainer.prototype, 'handleFormSubmit').and.callThrough();
    spyOn(LogEntryFormContainer.prototype, 'addNewLogEntry').and.callThrough();
    let data = [
        { id: 1 }
      ]
    let responseBody = JSON.stringify(data);
    let response = new Response(responseBody, {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' }
    });
    let responsePromise = Promise.resolve(response);
    spyOn(global, 'fetch').and.returnValue(responsePromise);
    wrapper = mount(<LogEntryFormContainer />);
  })

  it('should load with the default state', () => {
    expect(wrapper.state()).toEqual({
      title: 'Add New Log Entry',
      buttonText: 'Add Entry!',
      allSites: [],
      diveSite: '',
      currentUser: null,
      date: '',
      comments: '',
      maxDepth: '',
      diveTime: '',
      visibility: '',
      waterTemp: '',
      metric: false,
      errors: {}
    })
  })

  describe('once page has loaded with current user', () => {
    beforeEach(() => {
      wrapper.setState({
        allSites: [{ id: 1, name: 'Cathedral', lat: 18, lng: 44 }],
        currentUser: { id: 1, first_name: 'Vincent', last_name: 'Adultman' },
      })
    })

    it('should display the title from state', () => {
      expect(wrapper.find('h2').at(0).text()).toBe('Add New Log Entry')
    })

    it('should display a back button object', () => {
      expect(wrapper.find('BackButton')).toBePresent()
    })

    it('should display a DivesiteSearchContainer object', () => {
      expect(wrapper.find('DivesiteSearchContainer')).toBePresent()
    })

    describe('once divesite has been set', () => {
      beforeEach(() => {
        wrapper.setState({
          diveSite: { id: 1, name: 'Cathedral', lat: 18, lng: 44 }
        })
      })

      it('should populate the divesite name on the form', () => {
        expect(wrapper.find('h4').text()).toBe('Cathedral')
      })

      it('should display a date, number, and textarea field objects', () => {
        expect(wrapper.find('DateField')).toBePresent()
        expect(wrapper.find('NumberField')).toBePresent()
        expect(wrapper.find('TextAreaField')).toBePresent()
      })

      it('should trigger change functions upon input', () => {
        wrapper.find('[name="comments"]').simulate('change')
        expect(LogEntryFormContainer.prototype.handleCommentsChange).toHaveBeenCalled()
        wrapper.find('[name="dive-time"]').simulate('change')
        expect(LogEntryFormContainer.prototype.handleDiveTimeChange).toHaveBeenCalled()
        wrapper.find('[name="max-depth"]').simulate('change')
        expect(LogEntryFormContainer.prototype.handleMaxDepthChange).toHaveBeenCalled()
        wrapper.find('[name="visibility"]').simulate('change')
        expect(LogEntryFormContainer.prototype.handleVisibilityChange).toHaveBeenCalled()
        wrapper.find('[name="water-temp"]').simulate('change')
        expect(LogEntryFormContainer.prototype.handleWaterTempChange).toHaveBeenCalled()
        wrapper.find('[type="date"]').simulate('change')
        expect(LogEntryFormContainer.prototype.handleDateChange).toHaveBeenCalled()
        wrapper.find('[id="metric-check"]').simulate('change')
        expect(LogEntryFormContainer.prototype.handleMetricChange).toHaveBeenCalled()
      })

      it('should trigger the proper functions on submission', () => {
        wrapper.setState({ date: Date.parse('2016/2/24'), comments: 'Fun dive' })
        wrapper.find('form').simulate('submit')
        expect(LogEntryFormContainer.prototype.handleFormSubmit).toHaveBeenCalled()
        expect(LogEntryFormContainer.prototype.addNewLogEntry).toHaveBeenCalled()
      })

      it('should not submit with incomplete fields', () => {
        wrapper.find('form').simulate('submit')
        expect(LogEntryFormContainer.prototype.addNewLogEntry).not.toHaveBeenCalled()
      })
    })
  })
})
