import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import Spinner from 'react-native-loading-spinner-overlay'
import { withNavigation } from 'react-navigation'
import {
  View,
  ScrollView,
  Text,
  Alert,
  Linking,
  TouchableOpacity,
  Platform
} from 'react-native'

import Container from '../../components/layout/Container'
import SettingsModal from '../../components/layout/SettingsModal'
import CardList from '../../components/card/CardList'
import CardModal from '../../components/card/CardModal'
import SocialAuth from '../../components/layout/SocialAuth'
import LoginAuth from '../../components/layout/LoginAuth'
import RadioButton from '../../components/button/RadioButton'
import Database from '../../Database'
import { withContext } from '../../context/withContext'

const db = new Database()

const deleteMagazineRadioItem = [
  {
    label: '3 Bulan Terakhir',
    value: 3
  },
  {
    label: '6 Bulan Terakhir',
    value: 6
  },
  {
    label: '12 Bulan Terakhir',
    value: 12
  }
]

const config = {
  serviceConfiguration: {
    authorizationEndpoint: 'https://demo-account.kemenkeu.go.id/connect/authorize',
    tokenEndpoint: 'https://demo-account.kemenkeu.go.id/connect/token'
  },
  clientId: 'media-keuangan',
  clientSecret: 'MKDev',
  redirectUrl: 'id.go.majalahkeuangan://callback',
  scopes: ['profile', 'openid', 'profil.hris.api.kemenkeu.go.id', 'gateway'],
  useNonce: false,
  usePKCE: false
}

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      modalModeVisible: false,
      modalDeleteMagazineVisible: false,
      deleteMagazineIn: 3
    }
  }

  isLoggedIn = () => {
    return this.props.context.user !== null
  }

  onSignOut = () => {
    this.props.context.setAccessToken(null)
    this.props.context.setUser(null)
    this.props.navigation.navigate('Auth')
    // firebase
    //   .auth()
    //   .signOut()
    //   .then(() => {
    //     db.resetDB()
    //       .then((res) => {
    //         this.props.context.setUser(null)
    //         this.props.navigation.navigate('Auth')
    //       })
    //       .catch((err) => {
    //         console.log(err.message)
    //       })
    //   })
    //   .catch((err) => {
    //     Alert.alert('Error', err.message)
    //   })
  }

  componentWillUnmount () {
    this.setState({ isLoading: false })
  }

  renderAuthSettings = () => {
    if (this.isLoggedIn()) {
      const user = this.props.context.user
      return (
        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Container>
            <Text style={{ fontFamily: 'FiraSans-Black', fontSize: 16, textAlign: 'center', color: this.isDarkMode() ? '#fff' : '#000' }}>{ user.name }</Text>
            <Text style={{ fontFamily: 'FiraSans-Black', fontSize: 16, textAlign: 'center', color: this.isDarkMode() ? '#fff' : '#000' }}>{ user.email }</Text>
          </Container>
        </View>
      )
      return null
    } else {
      return (
        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Container>
            <LoginAuth settingPage />
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
          onPress: () => console.log('Ask me later pressed'),
          style: 'cancel'
        },
        {
          text: 'Iya',
          onPress: () => this.onDeleteMagazine()
        },
      ],
      {
        cancelable: false
      },
    );
  }

  onDeleteMagazine = (value, name) => {
    this.setState({ isLoading: true })
    db.deleteAllMagazine()
      .then((res) => {
        this.setState({ isLoading: false })
        setTimeout(() => {
          Alert.alert('Info', 'Berhasil dihapus')
        }, 100)
      })
      .catch((err) => {
        this.setState({ isLoading: false })
        setTimeout(() => {
          Alert.alert('Error', err.message)
        }, 100)
      })
  }

  onRadioDeleteMagazineChange = (value, name) => {
    this.setState({
      deleteMagazineIn: value
    })
  }

  isDarkMode = () => {
    return this.props.context.userSettings.readMode !== 'normal'
  }

  isAndroid = () => {
    return Platform.OS !== 'ios'
  }

  getMarketLink = () => {
    let link = ''
    if (this.isAndroid()) {
      link = 'market://details?id=id.go.kemenkeu.iMagazine'
    } else {
      link = 'itms-apps://itunes.apple.com/us/app/id1157852487?mt=8'
    }
    return link
  }
  
  render () {
    return (
      <ScrollView style={this.isDarkMode() ? { backgroundColor: '#000000' } : { backgroundColor: '#FFFFFF' }}>
        <Spinner
          visible={this.state.isLoading}
          overlayColor="rgba(0,0,0,0.7)"
          textStyle={{ color: '#fff' }}
        />
        <CardModal
          onBackButtonPress={() => this.setState({ modalModeVisible: false })}
          onBackdropPress={() => this.setState({ modalModeVisible: false })}
          title="Pengaturan Mode Baca"
          isVisible={this.state.modalModeVisible}>
          <SettingsModal onCloseModal={() => this.setState({ modalModeVisible: false })} />
        </CardModal>
        <CardModal
          onBackButtonPress={() => this.setState({ modalDeleteMagazineVisible: false })}
          onBackdropPress={() => this.setState({ modalDeleteMagazineVisible: false })}
          title="Hapus Majalah"
          isVisible={this.state.modalDeleteMagazineVisible}>
          <View>
            <RadioButton value={this.state.deleteMagazineIn} label="Hapus otomatis, kecuali" data={deleteMagazineRadioItem} onChange={this.onRadioDeleteMagazineChange} />
            <View>
              <TouchableOpacity style={{ backgroundColor: '#000000', padding: 10 }} onPress={this.onDeleteMagazine}>
                <Text style={{ fontSize: 16, color: '#FFFFFF', textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Hapus</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 5 }}>
              <TouchableOpacity style={{ backgroundColor: '#000000', padding: 10 }} onPress={() => this.setState({ modalDeleteMagazineVisible: false })}>
                <Text style={{ fontSize: 16, color: '#FFFFFF', textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CardModal>
        { this.renderAuthSettings() }
        <CardList text={`Berikan Rating di ${this.isAndroid() ? 'Google Play' : 'App Store'}`} onPress={() => this.handleOpenURL(this.getMarketLink())} />
        <CardList text="Cara Penggunaan" onPress={() => this.props.navigation.navigate('Guide')} />
        <CardList text="Hapus Majalah" onPress={this.onAlertPopup} />
        <CardList text="Hapus Majalah Disukai dan Sudah Dibaca" onPress={() => this.setState({ modalDeleteMagazineVisible: true }) } />
        <CardList text="Pengaturan Mode Baca" onPress={() => this.setState({ modalModeVisible: true })} />
        <CardList text="Tentang Kami" onPress={() => this.props.navigation.navigate('About')} />
        <CardList text="Website Kemenkeu" onPress={() => this.handleOpenURL('https://www.kemenkeu.go.id/')} />
        { this.isLoggedIn() && <CardList text="Logout" onPress={this.onSignOut} /> }
      </ScrollView>
    )
  }
}

export default withContext(withNavigation(Settings))