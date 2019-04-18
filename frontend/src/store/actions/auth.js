import { SET_CURRENT_USER } from "../actionTypes"
import { /*apiCall,*/ setTokenHeader } from "../../services/api"

// import store from '../store'

import store from '../index'


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}


export function setAuthorizationToken(token) {
  setTokenHeader(token)
}

export function logout() {
  localStorage.clear()
  setTokenHeader(false)
  store.dispatch(setCurrentUser({}))
//   hotFix({
//     type: SET_CURRENT_USER,
//     user: {}
//   })
  /* WTF (re: above) */
}