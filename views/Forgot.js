import React, { Component } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase'
import {
  TextInput,
  View,
  StyleSheet,
  Alert
} from 'react-native'

import Container from '../components/layout/Container'
import RegularButton from '../components/button/RegularButton'

const styles = StyleSheet.create({
  inputField: {
    borderColor: '#000',
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
    marginBottom: 10
  }
})

class SignupAuth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: ''
    }
  }

  handleForgotPassword = () => {
    const { email } = this.state
    if (email === '') {
      Alert.alert('Info', 'All fields are required')
    } else {
      this.setState({ isLoading: true })
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then((res) => {
          console.log(res)
          Alert.alert('Info', 'Please check your email')
          this.setState({ email: '' })
        })
        .catch((err) => {
          Alert.alert('Error', err.message)
        })
        .finally(() => {
          this.setState({ isLoading: false })
        })
    }
  }

  render() {
    return (
      <View>
        <Spinner
          visible={this.state.isLoading}
          overlayColor="rgba(0,0,0,0.7)"
          textStyle={{ color: '#fff' }}
        />
        <Container style={{ marginTop: 20 }}>
          <View>
            <TextInput
              style={styles.inputField}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              keyboardType="email-address"
              placeholder='Email *'
              multiline={false}
            />
          </View>
          <View>
            <RegularButton
              text="Kirim"
              bgColor='#000000'
              color='#FFFFFF'
              onPress={this.handleForgotPassword}
            />
          </View>
        </Container>
      </View>
    )
  }
}

export default SignupAuth