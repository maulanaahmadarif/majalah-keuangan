import React, { Component } from 'react'
import { UserContext } from './UserContext'

export default class UserProvider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      setUser: this.setUser.bind(this),
      user: null,
    }
  }

  setUser (user) {
    this.setState({ user })
  }

  render () {
    return (
      <UserContext.Provider value={{
        userContext: {
          ...this.state
        }
      }}>
        { this.props.children }
      </UserContext.Provider>
    )
  }
}