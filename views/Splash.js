import React, { Component } from 'react'
import firebase from 'react-native-firebase';
import {
  View,
  Image
} from 'react-native'

import { withContext } from '../context/withContext'

class Splash extends Component {
  componentDidMount () {
    setTimeout(() => {
      firebase
        .auth()
        .onAuthStateChanged((user) => {
          this.props.context.setUser(user)
          if (user) {
            this.props.navigation.navigate('App')
          } else {
            this.props.navigation.navigate('Auth')
          }
        })
    }, 2500)
  }

  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/images/logo.png')} style={{ width: 100, height: 100 }} />
      </View>
    )
  }
}

export default withContext(Splash)