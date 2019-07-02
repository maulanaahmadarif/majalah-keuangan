import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Login from './views/Login'
import Signup from './views/Signup'
import Main from './views/Main'

const MainNavigator = createStackNavigator(
  {
    Login,
    Signup,
    Main
  },
  {
    initialRouteName: 'Login'
  }
)

const AppContainer = createAppContainer(MainNavigator)

export default class App extends Component {
  render() {
    return <AppContainer />
  }
}
