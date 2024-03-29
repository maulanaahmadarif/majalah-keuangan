import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import firebase from 'react-native-firebase'
import Spinner from 'react-native-loading-spinner-overlay'
import { authorize } from 'react-native-app-auth'
import jwtDecode from 'jwt-decode'
import {
  View,
  Alert
} from 'react-native'

import RegularButton from '../button/RegularButton'
import { withContext } from '../../context/withContext'

const analytics = firebase.analytics()

const config = {
  serviceConfiguration: {
    authorizationEndpoint: 'https://sso.kemenkeu.go.id/connect/authorize',
    tokenEndpoint: 'https://sso.kemenkeu.go.id/connect/token'
  },
  clientId: 'media-keuangan',
  clientSecret: 'c4779b1542f041d89dc1b875924741f2',
  redirectUrl: 'id.go.majalahkeuangan://callback',
  scopes: ['profile', 'openid', 'profil.hris', 'gateway'],
  useNonce: false,
  usePKCE: false
}

class LoginAuth extends Component {
  constructor(props) {
    super(props)

    this.unsubscriber = null
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
      user: null,
      isLoading: false
    }
  }

  auth =  async () => {
    authorize(config)
      .then((res) => {
        analytics.logEvent('Login', { status: 'Login Success' })
        const accessToken = res.accessToken
        const decodedJWT = jwtDecode(accessToken)
        this.props.context.setAccessToken(res.accessToken)
        this.props.context.setUser(decodedJWT)
        this.props.navigation.navigate('App')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleSignIn = () => {
    const { email, password } = this.state
    if (email === '' || password === '') {
      Alert.alert('Info', 'All fields are required')
    } else {
      this.setState({ isLoading: true })
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          this.props.context.setUser(res.user)
          this.props.navigation.navigate('App')
        })
        .catch((err) => {
          Alert.alert('Error', err.message)
        })
        .finally(() => {
          this.setState({ isLoading: false })
        })
    }
  }

  componentWillUnmount () {
    this.setState({ isLoading: false })
  }

  onPressSignup = () => {
    if (this.props.settingPage) {
      this.props.navigation.navigate('SignupSetting')
    } else {
      this.props.navigation.navigate('Signup')
    }
  }

  render () {
    return (
      <View>
        <Spinner
          visible={this.state.isLoading}
          overlayColor="rgba(0,0,0,0.7)"
          textStyle={{ color: '#fff' }}
        />
        <View style={{ marginBottom: 10 }}>
          <RegularButton
            text="SIGN IN"
            bgColor={this.props.settingPage ? 'rgb(188,188,188)' : 'rgba(255,255,255,.8)'}
            color="rgb(0,0,0)"
            onPress={this.auth}
          />
        </View>
        { this.props.settingPage ? (
          null
        ) : (
          <View>
            <RegularButton
              text="MASUK TANPA SIGN IN"
              bgColor={this.props.settingPage ? 'rgb(254,116,118)' : 'rgba(255,255,255,.8)'}
              color={this.props.settingPage ? 'rgb(255,255,255)' : 'rgb(0,0,0)'}
              onPress={() => this.props.navigation.navigate('App')}
              settingPage={this.props.settingPage}
            />
          </View>
        )}
      </View>
    )
  }
}

export default withContext(withNavigation(LoginAuth))