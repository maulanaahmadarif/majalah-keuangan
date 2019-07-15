import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  View,
  ScrollView,
  Text,
  Alert,
  Linking,
  TouchableOpacity
} from 'react-native'

import Container from '../../components/layout/Container'
import CardList from '../../components/card/CardList'
import CardModal from '../../components/card/CardModal'
import SocialAuth from '../../components/layout/SocialAuth'
import LoginAuth from '../../components/layout/LoginAuth'
import RadioButton from '../../components/button/RadioButton'
import { withContext } from '../../context/withContext'

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

const readMode = [
  {
    label: 'Normal Mode',
    value: 'normal'
  },
  {
    label: 'Night Mode',
    value: 'night'
  }
]

const fontSizeMode = [
  {
    label: 'Big',
    value: 'big'
  },
  {
    label: 'Medium',
    value: 'medium'
  },
  {
    label: 'Small',
    value: 'small'
  }
]

const lineHeightMode = [
  {
    label: 'Wide',
    value: 'wide'
  },
  {
    label: 'Medium',
    value: 'medium'
  },
  {
    label: 'Narrow',
    value: 'narrow'
  }
]

const imageMode = [
  {
    label: 'Show',
    value: 'show'
  },
  {
    label: 'Hide',
    value: 'hide'
  }
]


class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      modalModeVisible: false,
      modalDeleteMagazineVisible: false
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

  onRadioDeleteMagazineChange = (value) => {
    Alert.alert('Value', `Value ${value}`)
  }

  render () {
    return (
      <ScrollView>
        <CardModal
          onBackButtonPress={() => this.setState({ modalModeVisible: false })}
          onBackdropPress={() => this.setState({ modalModeVisible: false })}
          title="Pengaturan Mode Baca"
          isVisible={this.state.modalModeVisible}>
          <ScrollView>
            <View style={{ paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'gray' }}>
              <RadioButton label="Pilihan Mode Baca" inline data={readMode} onChange={this.onRadioDeleteMagazineChange} />
            </View>
            <View style={{ paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'gray' }}>
              <RadioButton label="Ukuran Huruf" inline data={fontSizeMode} onChange={this.onRadioDeleteMagazineChange} />
            </View>
            <View style={{ paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'gray' }}>
              <RadioButton label="Jarak Paragraf" inline data={lineHeightMode} onChange={this.onRadioDeleteMagazineChange} />
            </View>
            <View style={{ paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'gray' }}>
              <RadioButton label="Show or Hide Image" inline data={imageMode} onChange={this.onRadioDeleteMagazineChange} />
            </View>
            <View style={{ marginVertical: 5 }}>
              <TouchableOpacity style={{ backgroundColor: '#000000', padding: 10 }} onPress={() => this.setState({ modalModeVisible: false })}>
                <Text style={{ fontSize: 16, color: '#FFFFFF', textAlign: 'center' }}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </CardModal>
        <CardModal
          onBackButtonPress={() => this.setState({ modalDeleteMagazineVisible: false })}
          onBackdropPress={() => this.setState({ modalDeleteMagazineVisible: false })}
          title="Hapus Majalah"
          isVisible={this.state.modalDeleteMagazineVisible}>
          <View>
            <RadioButton label="Hapus otomatis, kecuali" data={deleteMagazineRadioItem} onChange={this.onRadioDeleteMagazineChange} />
            <View style={{ marginVertical: 5 }}>
              <TouchableOpacity style={{ backgroundColor: '#000000', padding: 10 }} onPress={() => this.setState({ modalDeleteMagazineVisible: false })}>
                <Text style={{ fontSize: 16, color: '#FFFFFF', textAlign: 'center' }}>Batal</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{ backgroundColor: '#000000', padding: 10 }}>
                <Text style={{ fontSize: 16, color: '#FFFFFF', textAlign: 'center' }}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CardModal>
        <Spinner
          visible={this.state.isLoading}
          overlayColor="rgba(0,0,0,0.7)"
          textStyle={{ color: '#fff' }}
        />
        { this.renderAuthSettings() }
        <CardList text="Berikan Rating di Google Play" onPress={() => this.handleOpenURL('market://details?id=com.facebook.katana')} />
        <CardList text="Cara Penggunaan" onPress={() => this.props.navigation.navigate('Guide')} />
        <CardList text="Hapus Majalah" onPress={this.onAlertPopup} />
        <CardList text="Hapus Riwayat Majalah" onPress={() => this.setState({ modalDeleteMagazineVisible: true }) } />
        <CardList text="Pengaturan Mode Baca" onPress={() => this.setState({ modalModeVisible: true }) } />
        <CardList text="Tentang Kami" onPress={() => this.props.navigation.navigate('About')} />
        <CardList text="Website Kemenkeu" onPress={() => this.handleOpenURL('http://mediakeuangan.kemenkeu.go.id/')} />
        { this.isLoggedIn() && <CardList text="Logout" onPress={this.onSignOut} /> }
      </ScrollView>
    )
  }
}

export default withContext(Settings)