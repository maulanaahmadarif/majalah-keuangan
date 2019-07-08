import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {
  YellowBox
} from 'react-native'

import Readed from './Readed'
import Loved from './Loved'

YellowBox.ignoreWarnings(['ViewPagerAndroid'])

const TabScreen = createMaterialTopTabNavigator(
  {
    Readed: {
      screen: Readed,
      navigationOptions: {
        title: 'Sudah Dibaca'
      },
    },
    Loved: {
      screen: Loved,
      navigationOptions: {
        title: 'Disukai'
      },
    }
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#FFFFFF',
      style: {
        backgroundColor: '#888888',
      },
      labelStyle: {
        textAlign: 'center',
        textTransform: 'capitalize'
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
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
});

export default createAppContainer(App)
