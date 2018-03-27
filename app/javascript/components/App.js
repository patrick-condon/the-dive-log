import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import DivesIndexContainer from '../containers/DivesIndexContainer'
import DiveShowContainer from '../containers/DiveShowContainer'

const App = props => {

  return(
    <Router history={browserHistory}>
      <Route path='/' >
        <IndexRoute component={DivesIndexContainer} />
        <Route path="dives" component={DivesIndexContainer} />
        <Route path="dives/:id" component={DiveShowContainer} />
      </Route>
    </Router>
  )
}
export default App;
