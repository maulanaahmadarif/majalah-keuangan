import React, { Component } from 'react'
import { Context } from './Context'

export default class ContextProvider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null,
      setUser: this.setUser,
      magazines: [],
      setMagazines: this.setMagazines,
      edition: [],
      setEdition: this.setEdition
    }
  }

  setUser = (user) => {
    this.setState({ user })
  }

  setMagazines = (magazines) => {
    this.setState({ magazines })
  }

  setEdition = (edition) => {
    this.setState({ edition })
  }

  render () {
    return (
      <Context.Provider value={{
        context: {
          ...this.state
        }
      }}>
        { this.props.children }
      </Context.Provider>
    )
  }
}