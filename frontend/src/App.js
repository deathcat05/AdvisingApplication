import React, { Component } from 'react';

import SignIn from './Components/SignIn'
<<<<<<< HEAD
import SignUpCalendar from './Components/Calendar'
=======
import Register from './Components/Register'
>>>>>>> f58b3841a2b10983552ef2ad2ef5f4d65d1d7470

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
<<<<<<< HEAD
              <Route exact path="/signUpCalendar" component={SignUpCalendar} />
=======
              <Route exact path="/register" component={Register} />
>>>>>>> f58b3841a2b10983552ef2ad2ef5f4d65d1d7470
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
