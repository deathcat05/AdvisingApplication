import React, { Component } from 'react';

import SignIn from './Components/SignIn'
import SignUpCalendar from './Components/Calendar'
import Register from './Components/Register'
import AdvisorView from './Components/AdvisorView'

import { Provider } from 'react-redux'
import store from './store'


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

// const store = configureStore()

// setInterval(() => console.log(store.getState()), 5000);

if (localStorage.jwtToken) {
  console.log("yes")
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
              <Route exact path="/signIn" component={SignIn} />
              <Route exact path="/signUpCalendar" component={SignUpCalendar} />
              <Route exact path="/advisor" component={AdvisorView} />
              <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
