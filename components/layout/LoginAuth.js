import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import firebase from 'react-native-firebase'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  TextInput,
  View,
  StyleSheet,
  Alert
} from 'react-native'

import RegularButton from '../button/RegularButton'
import { withUser } from '../../context/withUser'

const styles = StyleSheet.create({
  inputField: {
    borderColor: '#fff',
    alignItems: 'stretch',
    color: '#000',
    height: 40,
    textAlignVertical: 'top',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(255,255,255,.7)',
    borderRadius: 5
  },
  inputSetting: {
    borderColor: 'rgb(188,188,188)'
  }
})

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
          this.props.userContext.setUser(res.user)
          this.props.navigation.navigate('App')
        })
        .catch((err) => {
          Alert.alert('Error', err.message)
        })
    }
  }

  componentWillUnmount () {
    this.setState({ isLoading: false })
  }

  render () {
    return (
      <View>
        <Spinner
          visible={this.state.isLoading}
          overlayColor="rgba(0,0,0,0.7)"
          textStyle={{ color: '#fff' }}
        />
        <View style={{ alignItems: 'stretch', marginBottom: 10 }}>
          <View style={{ alignItems: 'stretch', marginBottom: 10 }}>
            <TextInput
              style={[styles.inputField, this.props.settingPage && styles.inputSetting]}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              keyboardType="email-address"
              placeholder='Email'
              multiline={false}
            />
          </View>
          <View style={{ alignItems: 'stretch' }}>
            <TextInput
              style={[styles.inputField, this.props.settingPage && styles.inputSetting]}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              placeholder='Password'
              secureTextEntry={true}
              multiline={false}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <RegularButton
              text="SIGN IN"
              bgColor={this.props.settingPage ? 'rgb(188,188,188)' : 'rgba(255,255,255,.8)'}
              color="rgb(0,0,0)"
              onPress={this.handleSignIn}
            />
          </View>
          <RegularButton
            text="DAFTAR"
            bgColor={this.props.settingPage ? 'rgb(254,116,118)' : 'rgba(255,255,255,.8)'}
            color={this.props.settingPage ? 'rgb(255,255,255)' : 'rgb(0,0,0)'}
            onPress={() => this.props.navigation.navigate('Signup')}
            settingPage={this.props.settingPage}
          />
        </View>
      </View>
    )
  }
}

export default withUser(withNavigation(LoginAuth))