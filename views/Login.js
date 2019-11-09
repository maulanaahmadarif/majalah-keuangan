import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar } from 'react-native'
import { authorize } from 'react-native-app-auth'
import firebase from 'react-native-firebase'

import SocialAuth from '../components/layout/SocialAuth'
import LoginAuth from '../components/layout/LoginAuth'

const analytics = firebase.analytics()

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'row'
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  textForget: {
    color: '#fff'
  },
  forgetContainer: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
  }
})

class Login extends Component {
  componentDidMount () {
    analytics.setCurrentScreen('Login', 'Login.js')
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <StatusBar hidden={true} />
        <Image source={require('../assets/images/bg.jpg')} style={styles.backgroundImage}></Image>
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../assets/images/logo-kemenkeu.png')} style={{ width: 125, height: 86 }} />
          </View>
          <View style={{ marginBottom: 100 }}>
            <Text textBreakStrategy='balanced' style={{ color: '#fff', fontFamily: 'FiraSans-Medium', fontSize: 35, textAlign: 'center' }}>MEDIA<Text style={{ fontFamily: 'FiraSans-Black' }}>KEUANGAN</Text></Text>
            <Text style={{ color: '#fff', fontFamily: 'FiraSans-Medium', fontSize: 12, textAlign: 'center' }}>TRANSAPARNSI INFORMASI KEBIJAKAN FISKAL</Text>
          </View>
          <LoginAuth />
          {/* <View style={{ marginBottom: 30 }}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>or Connect With</Text>
          </View>
          <SocialAuth />
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={[styles.forgetContainer, { marginRight: 10 }]}>
              <Text style={styles.textForget} onPress={() => this.props.navigation.navigate('Forgot')}>Lupa Password</Text>
            </View>
            <View style={[styles.forgetContainer, { marginLeft: 10 }]}>
              <Text style={styles.textForget} onPress={() => this.props.navigation.navigate('App')}>Masuk Tanpa Login</Text>
            </View>
          </View> */}
        </View>
      </View>
    )
  }
}

export default Login
