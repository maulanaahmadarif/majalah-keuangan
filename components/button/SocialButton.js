import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

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
    borderRadius: 50,
    borderWidth: 1
  }
})

class SocialButton extends Component {
  renderLogo = () => {
    const icon = this.props.icon
    switch(icon) {
      case 'twitter':
        return <Image source={require('../../assets/images/logo-twitter.png')} />
      case 'facebook':
        return <Image source={require('../../assets/images/logo-facebook.png')} />
      case 'gmail':
        return <Image source={require('../../assets/images/logo-gmail.png')} />
      case 'instagram':
        return <Image source={require('../../assets/images/logo-instagram.png')} />
      case 'youtube':
        return <Image source={require('../../assets/images/logo-youtube.png')} />
      default:
        return null
    }
  }

  render () {
    return (
      <View style={styles.logoContainer}>
        <View style={[styles.logoBorder, this.props.settingPage && { borderColor: 'rgb(188,188,188)' }]}>
          <TouchableOpacity onPress={this.props.onPress}>
            { this.renderLogo() }
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default SocialButton