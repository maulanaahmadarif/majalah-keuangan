import React, { Component } from 'react'
import { TextInput, Button, View, StyleSheet } from 'react-native'

import Container from '../components/layout/Container'

const styles = StyleSheet.create({
  inputField: {
    borderColor: '#000',
    alignItems: 'stretch',
    color: '#000',
    height: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(255,255,255,.7)',
    marginBottom: 10
  }
})

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    }
  }

  static navigationOptions = {
    title: 'Registrasi'
  }

  render() {
    return (
      <View>
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
              placeholder='Email *'
              multiline={false}
            />
            <TextInput
              style={styles.inputField}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              placeholder='Password *'
              multiline={false}
            />
            <TextInput
              style={styles.inputField}
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
              value={this.state.confirmPassword}
              placeholder='Ulangi Password *'
              multiline={false}
            />
            <TextInput
              style={styles.inputField}
              onChangeText={(phone) => this.setState({ phone })}
              value={this.state.phone}
              placeholder='Nomor HP'
              multiline={false}
            />
          </View>
          <View>
            <Button
              color='#000'
              title='Register'
            />
          </View>
        </Container>
      </View>
    )
  }
}

export default Signup