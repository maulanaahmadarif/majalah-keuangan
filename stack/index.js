import { createSwitchNavigator } from 'react-navigation'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import Splash from '../views/Splash'

export default createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
    Splash
  },
  {
    // ENTRY POINT
    initialRouteName: 'Splash'
  }
)