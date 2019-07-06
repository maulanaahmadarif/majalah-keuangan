import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {
  YellowBox
} from 'react-native'

import Readed from './Readed'
import Loved from './Loved'

YellowBox.ignoreWarnings(['ViewPagerAndroid'])

const TabScreen = createMaterialTopTabNavigator(
  {
    Readed,
    Loved,
  },
  {
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
