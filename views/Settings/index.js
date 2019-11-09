import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';

import About from './About'
import Account from './Account'
import Setting from './Setting'
import Guide from './Guide'
import SignupSetting from './SignupSetting'

const SettingStack = createStackNavigator(
  {
    About: {
      screen: About,
      navigationOptions: {
        headerTitle: <Text style={{ flex: 1, fontFamily: 'FiraSans-Black', fontSize: 20, color: '#000' }}>Tentang Kami</Text>,
      },
    },
    Account: {
      screen: Account,
      navigationOptions: {
        headerTitle: <Text style={{ flex: 1, fontFamily: 'FiraSans-Black', fontSize: 20, color: '#000' }}>Akun</Text>,
      },
    },
    Guide: {
      screen: Guide,
      navigationOptions: {
        header: null
      },
    },
    SignupSetting: {
      screen: SignupSetting,
      navigationOptions: {
        headerTitle: <Text style={{ flex: 1, fontFamily: 'FiraSans-Black', fontSize: 20, color: '#000' }}>Registrasi</Text>,
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: ({ navigation, screenProps }) => {
        return {
          headerTitle: <Text style={{ textAlign: 'center', flex: 1, fontFamily: 'FiraSans-Black', fontSize: 20, color: '#000' }}>Setting</Text>,
          headerTitleStyle: { 
            textAlign: 'center', 
            flex: 1,
            alignSelf: 'center'
          },
        }
      },
    }
  },
  {
    initialRouteName: 'Setting'
  }
)

export default createAppContainer(SettingStack)
