import React, { Component } from 'react';

import SignIn from './Components/SignIn'
import Register from './Components/Register'

import { Provider } from 'react-redux'
// import { configureStore } from './store'
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
              <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
