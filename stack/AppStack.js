import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Magazine from '../views/Magazine'
import Settings from '../views/Settings'
import Favorite from '../views/Favorite'
import TabBarMagazine from '../components/layout/TabBarMagazine'

const AppStack = createBottomTabNavigator(
  {
    Magazine: {
      screen: createStackNavigator(
        {
          Magazine: {
            screen: Magazine,
            navigationOptions: {
              header: null
            }
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
              header: null,
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
    defaultNavigationOptions: ({ navigation }) => {
      const currentRoute = navigation.state.routes[navigation.state.index];
      const { routeName } = currentRoute;
      let tabBarVisible = true
      if (routeName === 'Magazine') {
        const { routeName } = currentRoute.routes[currentRoute.index]
        if (routeName === 'Category') {
          tabBarVisible = false
        }
      }
      return {
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state
          let IconComponent = Ionicons
          let iconName
          if (routeName === 'Magazine') {
            iconName = 'ios-book'
          } else if (routeName === 'Settings') {
            iconName = 'ios-cog'
          } else if (routeName === 'Favorite') {
            iconName = 'ios-heart'
          }
          // You can return any component that you like here!
          return <IconComponent name={iconName} size={25} color={tintColor} />
        },
        tabBarVisible
      }
    },
    tabBarComponent: ({ navigation }) => <TabBarMagazine activeIndex={navigation.state.index} />,
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    }
  }
)

export default AppStack