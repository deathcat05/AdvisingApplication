import React, { Component } from 'react';

import SignIn from './Components/SignIn'
import Register from './Components/Register'
import AdvisorView from './Components/Advisor/AdvisorView'
import Advisee from './Components/Advisee/Advisee'

import { Provider } from 'react-redux'
import store from './store'

import withAuth from './hoc/withAuth'

import jwtDecode from 'jwt-decode'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import {
  setAuthorizationToken,
  setCurrentUser
} from './store/actions/auth'

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
  } catch (e) {
    store.dispatch(setCurrentUser({}))
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/advisor" component={withAuth(AdvisorView)} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/advisee" component={Advisee} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
