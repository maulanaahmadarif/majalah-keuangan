import { createStackNavigator } from 'react-navigation'

import Login from '../views/Login'
import Signup from '../views/Signup'
import Forgot from '../views/Forgot'

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
    },
    Forgot: {
      screen: Forgot,
      navigationOptions: {
        title: 'Forgot Password'
      },
    }
  },
  {
    initialRouteName: 'Login'
  }
)

export default AuthStack