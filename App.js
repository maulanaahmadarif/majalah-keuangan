import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'

import stack from './stack'
import UserProvider from './context/UserProvider'

const AppContainer = createAppContainer(stack)

class App extends Component {
  render() {
    return (
      <UserProvider>
        <AppContainer />
      </UserProvider>
    )
  }
}

export default App
