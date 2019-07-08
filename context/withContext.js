import React from 'react'
import { Context } from './Context'

export function withContext (Component) {
  return function UserComponent (props) {
    return (
      <Context.Consumer>
        {(contexts) => <Component {...props} {...contexts} />}
      </Context.Consumer>
    )
  }
}