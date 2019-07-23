import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'
import {
  View,
  Image,
  Alert
} from 'react-native'

import { withContext } from '../context/withContext'

import Database from '../Database'

const db = new Database()

class Splash extends Component {
  async componentDidMount () {
    // db.resetDB()
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
    }, 1000)
    
    try {
      const imageMode = await AsyncStorage.getItem('imageMode')
      const fontSizeMode = await AsyncStorage.getItem('fontSizeMode')
      const readMode = await AsyncStorage.getItem('readMode')
      const lineHeightMode = await AsyncStorage.getItem('lineHeightMode')
      const deleteMagazineIn = await AsyncStorage.getItem('deleteMagazineIn')
      if (imageMode !== null) {
        this.props.context.setUserSettings(['imageMode', imageMode])
      }
      if (fontSizeMode !== null) {
        this.props.context.setUserSettings(['fontSizeMode', fontSizeMode])
      }
      if (readMode !== null) {
        this.props.context.setUserSettings(['readMode', readMode])
      }
      if (lineHeightMode !== null) {
        this.props.context.setUserSettings(['lineHeightMode', lineHeightMode])
      }
      if (deleteMagazineIn !== null) {
        this.props.context.setUserSettings(['deleteMagazineIn', deleteMagazineIn])
      } 
    } catch (e) {
      Alert.alert('Error', e.message)
    }
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