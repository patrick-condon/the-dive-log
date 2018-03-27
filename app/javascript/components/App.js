import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import LogEntriesIndexContainer from '../containers/LogEntriesIndexContainer'
import LogEntryShowContainer from '../containers/LogEntryShowContainer'

const App = props => {

  return(
    <Router history={browserHistory}>
      <Route path='/' >
        <IndexRoute component={LogEntriesIndexContainer} />
        <Route path="log_entries" component={LogEntriesIndexContainer} />
        <Route path="log_entries/:id" component={LogEntryShowContainer} />
      </Route>
    </Router>
  )
}
export default App;
