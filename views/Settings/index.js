import { createStackNavigator, createAppContainer } from 'react-navigation';

import About from './About'
import Account from './Account'
import Setting from './Setting'
import Guide from './Guide'

const SettingStack = createStackNavigator(
  {
    About: {
      screen: About,
      navigationOptions: {
        title: 'Tentang Kami'
      },
    },
    Account: {
      screen: Account,
      navigationOptions: {
        title: 'Account'
      },
    },
    Guide: {
      screen: Guide,
      navigationOptions: {
        header: null
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
