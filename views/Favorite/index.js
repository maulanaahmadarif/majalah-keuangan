import React from 'react'
import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {
  YellowBox
} from 'react-native'

import Readed from './Readed'
import Loved from './Loved'
import Detail from './Detail'
import TopBar from '../../components/layout/TopBar'
import ButtonShare from '../../components/button/ButtonShare'

YellowBox.ignoreWarnings(['ViewPagerAndroid'])

const TabScreen = createMaterialTopTabNavigator(
  {
    Loved: {
      screen: Loved,
      navigationOptions: {
        title: 'Disukai'
      },
    },
    Readed: {
      screen: Readed,
      navigationOptions: {
        title: 'Sudah Dibaca'
      },
    }
  },
  {
    tabBarComponent: TopBar,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#000000',
      inactiveTintColor: '#000000',
      style: {
        backgroundColor: '#FFFFFF',
      },
      labelStyle: {
        textAlign: 'center',
        textTransform: 'uppercase'
      },
      indicatorStyle: {
        borderBottomColor: 'rgb(2, 46, 91)',
        borderBottomWidth: 2,
      }
    },
  }
);

const App = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      header: null
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({ navigation }) => {
      return {
        title: navigation.state.params.title,
        headerTitleStyle: { 
          textAlign: 'center', 
          flex: 1,
          alignSelf: 'center'
        },
        headerRight: <ButtonShare />
      }
    }
  }
});

export default createAppContainer(App)
