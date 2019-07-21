import React, { Component } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase'
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  Alert
} from 'react-native'

import Container from './Container'
import RegularButton from '../button/RegularButton'
import { withContext } from '../../context/withContext'
import { withNavigation } from 'react-navigation'

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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      isLoading: false
    }
  }

  handleSignUp = () => {
    const { name, email, password, confirmPassword } = this.state
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Info', 'All fields are required')
    } else if (password !== confirmPassword) {
      Alert.alert('Info', 'Pastikan password anda sama')
    } else {
      this.setState({ isLoading: true })
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          this.props.navigation.navigate('App')
        })
        .catch((err) => {
          Alert.alert('Error', err.message)
          this.setState({ isLoading: false })
        })
    }
  }

  componentWillUnmount () {
    this.setState({ isLoading: false })
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
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Nama Lengkap *'
              multiline={false}
            />
            <TextInput
              style={styles.inputField}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              keyboardType="email-address"
              placeholder='Email *'
              multiline={false}
            />
            <TextInput
              style={styles.inputField}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              secureTextEntry={true}
              placeholder='Password *'
              multiline={false}
            />
            <TextInput
              style={styles.inputField}
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
              value={this.state.confirmPassword}
              secureTextEntry={true}
              placeholder='Ulangi Password *'
              multiline={false}
            />
            <TextInput
              style={styles.inputField}
              onChangeText={(phone) => this.setState({ phone })}
              value={this.state.phone}
              keyboardType="phone-pad"
              placeholder='Nomor HP'
              multiline={false}
            />
          </View>
          <View>
            <RegularButton
              text="Register"
              bgColor='#000000'
              color='#FFFFFF'
              onPress={this.handleSignUp}
            />
          </View>
        </Container>
      </View>
    )
  }
}

export default withContext(withNavigation(SignupAuth))