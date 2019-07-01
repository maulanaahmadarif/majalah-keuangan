import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button, StatusBar } from 'react-native'

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
  inputField: {
    borderColor: '#fff',
    alignItems: 'stretch',
    color: '#fff',
    height: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(255,255,255,.7)'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  buttonText: {
    color: '#000',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(255,255,255,.8)'
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoBorder: {
    backgroundColor: 'rgba(255,255,255,.7)',
    padding: 10,
    borderRadius: 50
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
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <StatusBar hidden={true} />
        <Image source={require('../assets/images/blackhole.jpg')} style={styles.backgroundImage}></Image>
        <View style={styles.container}>
          <View style={{ marginBottom: 100 }}>
            <Text textBreakStrategy='balanced' style={{ color: '#fff', fontFamily: 'FiraSans-Medium', fontSize: 40, textAlign: 'center' }}>MEDIA<Text style={{ fontFamily: 'FiraSans-Black' }}>KEUANGAN</Text></Text>
            <Text style={{ color: '#fff', fontFamily: 'FiraSans-Medium', fontSize: 12, textAlign: 'center' }}>TRANSAPARNSI INFORMASI KEBIJAKAN FISKAL</Text>
          </View>
          <View style={{ alignItems: 'stretch', marginBottom: 10 }}>
            <View style={{ alignItems: 'stretch', marginBottom: 10 }}>
              <TextInput
                style={styles.inputField}
                onChangeText={(username) => this.setState({ username })}
                value={this.state.username}
                placeholder='Email'
                multiline={false}
              />
            </View>
            <View style={{ alignItems: 'stretch' }}>
              <TextInput
                style={styles.inputField}
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                placeholder='Password'
                secureTextEntry={true}
                multiline={false}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={[styles.buttonContainer, { marginRight: 5 }]}>
              <Button color='rgba(255,255,255,.8)' title='sign in'>
                {/* TODO: DOESNT WORK */}
                <Text style={styles.buttonText}>Sign In</Text>
              </Button>
            </View>
            <View style={[styles.buttonContainer, { marginLeft: 5 }]}>
              <Button
                color='rgba(255,255,255,.8)'
                title='daftar'
                onPress={() => this.props.navigation.navigate('Signup')}
              >
                {/* TODO: DOESNT WORK */}
                <Text style={styles.buttonText}>Daftar</Text>
              </Button>
            </View>
          </View>
          <View style={{ marginBottom: 30 }}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>or Connect With</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBorder}>
                <Image source={require('../assets/images/logo-facebook.png')} />
              </View>
            </View>
            <View style={styles.logoContainer}>
              <View style={styles.logoBorder}>
                <Image source={require('../assets/images/logo-gmail.png')} />
              </View>
            </View>
            <View style={styles.logoContainer}>
              <View style={styles.logoBorder}>
                <Image source={require('../assets/images/logo-twitter.png')} />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={[styles.forgetContainer, { marginRight: 10 }]}>
              <Text style={styles.textForget}>Lupa Password</Text>
            </View>
            <View style={[styles.forgetContainer, { marginLeft: 10 }]}>
              <Text style={styles.textForget}>Masuk Tanpa Login</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../assets/images/logo-kemenkeu.png')} />
          </View>
        </View>
      </View>
    )
  }
}

export default Login
