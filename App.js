import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'

import stack from './stack'
import ContextProvider from './context/ContextProvider'

const AppContainer = createAppContainer(stack)

class App extends Component {
  render() {
    return (
      <ContextProvider>
        <AppContainer />
      </ContextProvider>
    )
  }
}

export default App
