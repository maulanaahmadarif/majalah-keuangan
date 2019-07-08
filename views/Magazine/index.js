import { createStackNavigator, createAppContainer } from 'react-navigation';

import Magazine from './Magazine'
import Article from './Article'

const MagazineStack = createStackNavigator(
  {
    Magazine: {
      screen: Magazine,
      navigationOptions: {
        title: 'Tahun Terbit',
        headerTitleStyle: { 
          textAlign: 'center', 
          flex: 1,
          alignSelf: 'center'
        },
      },
    },
    Article: {
      screen: Article,
      navigationOptions: {
        title: 'Article'
      },
    }
  },
  {
    initialRouteName: 'Magazine'
  }
)

export default createAppContainer(MagazineStack)
