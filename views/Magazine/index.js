import React from 'react'
import { Text } from 'react-native'
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  TouchableOpacity
} from 'react-native'

import Magazine from './Magazine'
import Article from './Article'
import Category from './Category'
import DrawerMenu from '../../components/layout/DrawerMenu'
import TabBarCategory from '../../components/layout/TabBarCategory'
import ButtonShare from '../../components/button/ButtonShare'

const generateExcerpt = (text, maxWord) => {
  const textArr = text.split(' ')
  if (maxWord > textArr.length) {
    maxWord = textArr.length
  }
  const excerpt = []
  for (let i = 0; i < maxWord; i++) {
    excerpt.push(textArr[i])
  }
  return excerpt.join(' ')
}

const MagazineStack = createStackNavigator(
  {
    Magazine: {
      screen: Magazine,
      navigationOptions: {
        headerTitle: <Text style={{ textAlign: 'center', flex: 1, fontFamily: 'FiraSans-Black', fontSize: 20, color: '#000' }}>Majalah Keuangan</Text>,
        headerTitleStyle: { 
          textAlign: 'center', 
          flex: 1,
          alignSelf: 'center',
        },
      }
    },
    Category: {
      screen: createBottomTabNavigator(
        {
          Category: {
            screen: Category
          },
        },
        {
          navigationOptions: ({ navigation }) => {
            return {
              headerTitle: <Text style={{ textAlign: 'center', flex: 1, fontFamily: 'FiraSans-Black', fontSize: 20, color: '#000' }}>{ `${generateExcerpt(navigation.state.params.title, 3)} ...` }</Text>,
              headerTitleStyle: { 
                textAlign: 'center', 
                flex: 1,
                alignSelf: 'center'
              },
              headerRight: <ButtonShare />
            }
          },
          tabBarComponent: ({ navigation }) => {
            const { index, totalCategory } = navigation.state.params
            return <TabBarCategory index={index} total={totalCategory} />
          },
          tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
          },
        }
      )
    },
    Article: {
      screen: createDrawerNavigator(
        {
          Article: {
            screen: Article
          }
        },
        {
          drawerPosition: 'right',
          drawerBackgroundColor: '#000000',
          contentComponent: DrawerMenu
        }
      ),
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: <Text style={{ textAlign: 'center', flex: 1, fontFamily: 'FiraSans-Black', fontSize: 20, color: '#000' }}>{ navigation.state.params.title }</Text>,
          headerTitleStyle: { 
            textAlign: 'center', 
            flex: 1,
            alignSelf: 'center'
          },
          headerRight: (
            <TouchableOpacity activeOpacity={1} style={{ paddingRight: 15 }} onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="ios-menu" size={25} color="#000000" />
            </TouchableOpacity>
          )
        }
      }
    }
  },
  {
    initialRouteName: 'Magazine'
  }
)

export default createAppContainer(MagazineStack)
