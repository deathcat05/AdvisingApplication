import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function withAuth(ComponentToBeRendered) {
  class Authenticated extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/signIn")
      }
    }

    componentWillUpdate() {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/signIn")
      }
    }

    render() {
      return <ComponentToBeRendered {...this.props} />
    }
  }

  const mapStateToProps = state => {
    const { userReducer: { isAuthenticated } } = state
    return { isAuthenticated }
  }

  return connect(mapStateToProps)(Authenticated)

}