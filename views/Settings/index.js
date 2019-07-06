import { createStackNavigator, createAppContainer } from 'react-navigation';

import About from './About'
import Account from './Account'
import Setting from './Setting'


const SettingStack = createStackNavigator(
  {
    About: {
      screen: About,
      navigationOptions: {
        title: 'About'
      },
    },
    Account: {
      screen: Account,
      navigationOptions: {
        title: 'Account'
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        title: 'Setting',
        headerTitleStyle: { 
          textAlign: 'center', 
          flex: 1,
          alignSelf: 'center'
        },
      },
    }
  },
  {
    initialRouteName: 'Setting'
  }
)

export default createAppContainer(SettingStack)
