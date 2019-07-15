import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { withNavigation } from 'react-navigation'
import { withContext } from '../../context/withContext'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  View,
  NativeModules,
  Alert
} from 'react-native'

import SocialButton from '../button/SocialButton'

const { RNTwitterSignIn } = NativeModules
const { TwitterAuthProvider } = firebase.auth

const TwitterKeys = {
  // TWITTER_CONSUMER_KEY: '53uuJ2EOu8BiXXM2ZyVnB5YRf',
  // TWITTER_CONSUMER_SECRET: '1IL22rZwwYhvDI08Upxlt7u0IwQDCKkT6UqL5Ae70aNiqxSnMh'
  TWITTER_CONSUMER_KEY: 'D3g97AOOvTFomVU0vaHBlTMcg',
  TWITTER_CONSUMER_SECRET: 'eC4szm2mmFd7LNi5m67WIefo762hP6OVnuLwBwy0ROPvRHpclt'
}

class SocialAuth extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  signInWithGoogle = async () => {
    try {
      this.setState({ isLoading: true })
      await GoogleSignin.configure({
        webClientId: '269582413397-7jhcqsa4adjl1phc11avr872fai7lpbv.apps.googleusercontent.com'
      })
      const data = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential)
      this.props.context.setUser(firebaseUserCredential.user)
      this.props.navigation.navigate('App')
    } catch (e) {
      this.setState({ isLoading: false })
      Alert.alert('Error', e.message)
    }
  }

  signInWithTwitter = async () => {
    try {
      this.setState({ isLoading: true })
      await RNTwitterSignIn.init(TwitterKeys.TWITTER_CONSUMER_KEY, TwitterKeys.TWITTER_CONSUMER_SECRET);
      const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
      const credential = TwitterAuthProvider.credential(authToken, authTokenSecret);
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      this.props.context.setUser(firebaseUserCredential.user)
      this.props.navigation.navigate('App')
    } catch (e) {
      this.setState({ isLoading: false })
      Alert.alert('Error', e.message)
    }
  }

  signInWithFacebook = async () => {
    try {
      this.setState({ isLoading: true })
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
      if (result.isCancelled) {
        // handle this however suites the flow of your app
        Alert.alert('Error', 'User cancelled request')
      }
      // console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        // handle this however suites the flow of your app
        Alert.alert('Error', 'Something went wrong obtaining the users access token')
      }
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      this.props.context.setUser(firebaseUserCredential.user)
      this.props.navigation.navigate('App')
    } catch (e) {
      this.setState({ isLoading: false })
      Alert.alert('Error', e.message)
    }
  }

  componentWillUnmount () {
    this.setState({ isLoading: false })
  }

  render () {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Spinner
          visible={this.state.isLoading}
          overlayColor="rgba(0,0,0,0.7)"
          textStyle={{ color: '#fff' }}
        />
        <SocialButton icon="facebook" onPress={this.signInWithFacebook} settingPage={this.props.settingPage} />
        <SocialButton icon="gmail" onPress={this.signInWithGoogle} settingPage={this.props.settingPage} />
        <SocialButton icon="twitter" onPress={this.signInWithTwitter} settingPage={this.props.settingPage} />
      </View>
    )
  }
}

export default withContext(withNavigation(SocialAuth))