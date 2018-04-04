import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import LogEntriesIndexContainer from '../containers/LogEntriesIndexContainer'
import LogEntryShowContainer from '../containers/LogEntryShowContainer'
import LogEntryFormContainer from '../containers/LogEntryFormContainer'
import DivesiteFormContainer from '../containers/DivesiteFormContainer'
import DivesiteShowContainer from '../containers/DivesiteShowContainer'
import PhotoUploadContainer from '../containers/PhotoUploadContainer'

const App = props => {

  return(
    <Router history={browserHistory}>
      <Route path='/' >
        <IndexRoute component={LogEntriesIndexContainer} />
        <Route path="log_entries" component={LogEntriesIndexContainer} />
        <Route path="log_entries/new" component={LogEntryFormContainer} />
        <Route path="log_entries/:id" component={LogEntryShowContainer} />
        <Route path="log_entries/:id/photos/new" component={PhotoUploadContainer}/>
        <Route path="divesites/new" component={DivesiteFormContainer}/>
        <Route path="divesites/:id" component={DivesiteShowContainer}/>
      </Route>
    </Router>
  )
}
export default App;
