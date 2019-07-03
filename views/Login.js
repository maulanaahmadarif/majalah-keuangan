import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin'
import { AccessToken, LoginManager, ShareDialog } from 'react-native-fbsdk';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  NativeModules } from 'react-native'
  
const { RNTwitterSignIn } = NativeModules
const { TwitterAuthProvider } = firebase.auth

const TwitterKeys = {
  // TWITTER_CONSUMER_KEY: '53uuJ2EOu8BiXXM2ZyVnB5YRf',
  // TWITTER_CONSUMER_SECRET: '1IL22rZwwYhvDI08Upxlt7u0IwQDCKkT6UqL5Ae70aNiqxSnMh'
  TWITTER_CONSUMER_KEY: 'x54O8e8WxBSyd0nyXbqwQ8cd5',
  TWITTER_CONSUMER_SECRET: 'BvGSyM2y2WxtIpcATsbru13crC5dbQLNc1gExIyM8cCtGnwyM2'
}

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

const SHARE_LINK_CONTENT = {
  contentType: 'link',
  contentUrl: 'https://www.facebook.com/',
};

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errorMessage: null
    }
  }

  static navigationOptions = {
    header: null
  }

  _shareLinkWithShareDialog = async () => {
    const canShow = await ShareDialog.canShow(SHARE_LINK_CONTENT);
    if (canShow) {
      try {
        const {isCancelled, postId} = await ShareDialog.show(
          SHARE_LINK_CONTENT,
        );
        if (isCancelled) {
          Alert.alert('Share cancelled');
        } else {
          Alert.alert('Share success with postId: ' + postId);
        }
      } catch (error) {
        Alert.alert('Share fail with error: ' + error);
      }
    }
  };

  handleSignIn = () => {
    ToastAndroid.show(`Email: ${this.state.email}, Password: ${this.state.password}`, ToastAndroid.SHORT);
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate('Main')
      })
      .catch((err) => {
        ToastAndroid.show(`Err: ${err.message}`, ToastAndroid.SHORT)
      })
  }

  signInWithGoogle = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.configure({
        webClientId: '269582413397-7jhcqsa4adjl1phc11avr872fai7lpbv.apps.googleusercontent.com'
      })
  
      const data = await GoogleSignin.signIn();
  
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential)

      // ToastAndroid.show(`Err: ${data}`, ToastAndroid.SHORT)
      // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
      this.props.navigation.navigate('Main')
    } catch (e) {
      console.log(e)
      ToastAndroid.show(`Err: ${e.message}`, ToastAndroid.SHORT)
    }
  }

  signInWithTwitter = async () => {
    try {
      await RNTwitterSignIn.init(TwitterKeys.TWITTER_CONSUMER_KEY, TwitterKeys.TWITTER_CONSUMER_SECRET);
  
      // also includes: name, userID & userName
      const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();    
  
      const credential = TwitterAuthProvider.credential(authToken, authTokenSecret);
  
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  
      // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
      this.props.navigation.navigate('Main')
    } catch (e) {
      console.error(e);
    }
  }

  signInWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['email']);
  
      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error('User cancelled request'); 
      }
  
      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
  
      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        // handle this however suites the flow of your app
        throw new Error('Something went wrong obtaining the users access token');
      }
  
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  
      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
    } catch (e) {
      console.error(e);
    }
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
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
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
              <Button color='rgba(255,255,255,.8)' title='sign in' onPress={ this.handleSignUp }>
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
                <TouchableOpacity onPress={this._shareLinkWithShareDialog}>
                  <Image source={require('../assets/images/logo-facebook.png')} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.logoContainer} onPress>
              <View style={styles.logoBorder}>
                <TouchableOpacity onPress={this.signInWithGoogle}>
                  <Image source={require('../assets/images/logo-gmail.png')} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.logoContainer}>
              <View style={styles.logoBorder}>
                <TouchableOpacity onPress={this.signInWithTwitter}>
                  <Image source={require('../assets/images/logo-twitter.png')} />
                </TouchableOpacity>
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
