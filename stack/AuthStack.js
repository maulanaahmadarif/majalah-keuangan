import { createStackNavigator } from 'react-navigation'

import Login from '../views/Login'
import Signup from '../views/Signup'

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      },
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        title: 'Registrasi'
      },
    }
  },
  {
    initialRouteName: 'Login'
  }
)

export default AuthStack