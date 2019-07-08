import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Magazine from '../views/Magazine'
import Settings from '../views/Settings'
import Favorite from '../views/Favorite'

const AppStack = createBottomTabNavigator(
  {
    Magazine: {
      screen: createStackNavigator(
        {
          Magazine: {
            screen: Magazine,
            navigationOptions: {
              header: null
            },
          }
        }
      )
    },
    Favorite: {
      screen: createStackNavigator(
        {
          Favorite: {
            screen: Favorite,
            navigationOptions: {
              header: null
            },
          }
        }
      )
    },
    Settings: {
      screen: createStackNavigator(
        {
          Settings: {
            screen: Settings,
            navigationOptions: {
              header: null
            },
          }
        }
      )
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Magazine') {
          iconName = `ios-book`;
        } else if (routeName === 'Settings') {
          iconName = `ios-cog`;
        } else if (routeName === 'Favorite') {
          iconName = `ios-heart`;
        }
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  }
)

export default AppStack