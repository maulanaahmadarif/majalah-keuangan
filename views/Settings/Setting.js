import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  View,
  ScrollView,
  Text,
  Alert,
  Linking
} from 'react-native'

import Container from '../../components/layout/Container'
import CardList from '../../components/card/CardList'
import SocialAuth from '../../components/layout/SocialAuth'
import LoginAuth from '../../components/layout/LoginAuth'
import { withContext } from '../../context/withContext'

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  isLoggedIn = () => {
    return this.props.context.user !== null
  }

  onSignOut = () => {
    this.setState({ isLoading: true })
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.context.setUser(null)
        this.props.navigation.navigate('Auth')
      })
      .catch((err) => {
        Alert.alert('Error', err.message)
      })
  }

  componentWillUnmount () {
    this.setState({ isLoading: false })
  }

  renderAuthSettings = () => {
    if (this.isLoggedIn()) {
      // return (
      //   <CardList text="Akun" onPress={() => this.props.navigation.navigate('Account')} />
      // )
      return null
    } else {
      return (
        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Container>
            <LoginAuth settingPage />
              <View style={{ marginBottom: 30 }}>
                <Text style={{ textAlign: 'center', color: '#000' }}>or Connect With</Text>
              </View>
              <SocialAuth settingPage />
          </Container>
        </View>
      )
    }
  }

  handleOpenURL = (url) => {
    Linking
      .openURL(url)
      .catch((err) => {
        Alert.alert('Error', err.message)
      })
  }

  onAlertPopup = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah anda akan menghapus semua data yang tersimpan',
      [
        {
          text: 'Batal',
          onPress: () => console.log('Ask me later pressed')
        },
        {
          text: 'Iya',
          onPress: () => console.log('OK Pressed')
        },
      ],
      {
        cancelable: false
      },
    );
  }

  render () {
    return (
      <ScrollView>
        <Spinner
          visible={this.state.isLoading}
          overlayColor="rgba(0,0,0,0.7)"
          textStyle={{ color: '#fff' }}
        />
        { this.renderAuthSettings() }
        <CardList text="Berikan Rating di Google Play" onPress={() => this.handleOpenURL('market://details?id=com.facebook.katana')} />
        <CardList text="Cara Penggunaan" onPress={() => this.props.navigation.navigate('Guide')} />
        <CardList text="Hapus Majalah" onPress={this.onAlertPopup} />
        <CardList text="Hapus Riwayat Majalah" onPress={this.onAlertPopup} />
        <CardList text="Pengaturan Mode Baca" />
        <CardList text="Tentang Kami" onPress={() => this.props.navigation.navigate('About')} />
        <CardList text="Website Kemenkeu" onPress={() => this.handleOpenURL('http://mediakeuangan.kemenkeu.go.id/')} />
        { this.isLoggedIn() && <CardList text="Logout" onPress={this.onSignOut} /> }
      </ScrollView>
    )
  }
}

export default withContext(Settings)