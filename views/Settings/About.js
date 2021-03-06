import React, { Component } from 'react'
import DeviceInfo from 'react-native-device-info'
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Linking,
  Alert
} from 'react-native'

import Container from '../../components/layout/Container'
import SocialButton from '../../components/button/SocialButton'

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'FiraSans-Regular'
  },
  imageCenter: {
    alignItems: 'center'
  },
  separator: {
    width: 100,
    height: 1,
    backgroundColor: '#000000',
    marginTop: 30,
    marginBottom: 30
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
})

class About extends Component {
  handleOpenURL = (url) => {
    Linking
      .openURL(url)
      .catch((err) => {
        Alert.alert('Error', err.message)
      })
  }

  render () {
    return (
      <ScrollView>
        <Container>
          <View>
            <View style={styles.imageCenter}>
              <Image source={require('../../assets/images/logo.png')} style={{ width: 100, height: 100 }} />
            </View>
            <View>
              <Text style={[styles.textStyle, { textAlign: 'center', fontFamily: 'FiraSans-Regular' }]}>Media Keuangan for { Platform.OS === 'ios' ? 'iOS' : 'Android' }</Text>
              <Text style={[styles.textStyle, { textAlign: 'center', fontFamily: 'FiraSans-Regular' }]}>Version { DeviceInfo.getVersion() }</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View>
            <Text style={styles.textStyle}>
              Media Keuangan adalah majalah resmi Kementrian Keuangan. MK memberikan informasi terkini seputar kebijakan fiskal didukung oleh narasumber penting dan kredibel dibidangnya.
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.textStyle}>
              Ikuti kami di <Text style={styles.linkText, { fontFamily: 'FiraSans-Regular' }} onPress={() => this.handleOpenURL('https://www.instagram.com/majalahmediakeuangan/?hl=id')}>@majalahmediakeuangan</Text>
            </Text>
          </View>
          <View style={styles.separator} />
          <View>
            <Text style={styles.textStyle}>
              Diterbitkan oleh {'\n'}
              Sekretariat Jendral Kementrian Keuangan
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.textStyle}>
              Pelindung {'\n'}
              Menteri Keuangan Republik Indonesia
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.textStyle}>
              Pengarah {'\n'}
              Wakil Menteri Keuangan Republik Indonesia
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.textStyle}>
              Penanggung Jawab {'\n'}
              Sekretaris Jendral Kementrian Keuangan Republik Indonesia
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.textStyle}>
              Pemimpin Umum {'\n'}
              Kepala Biro Komunikasi dan Layanan Informasi Kementrian Keuangan Republik Indonesia
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.textStyle}>
              Alamat Redaksi {'\n'}
              Gedung Djuanda 1 Lantai 9, Jalan Dr. Wahidin Raya No. 1, Jakarta
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.textStyle}>
              Telepon {'\n'}
              (021) 3849605, 3449230 pst. 6328/6330
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.textStyle}>
              Email {'\n'}
              mediakeuangan@kemenkeu.go.id
            </Text>
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <SocialButton icon="instagram" flexStart settingPage onPress={() => this.handleOpenURL('https://www.instagram.com/majalahmediakeuangan/?hl=id')} />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textStyle}>
              Redaksi menerima kontribusi tulisan dan artikel yang sesuai dengan misi penerbitan. Redaksi berhak mengubah isi tulisan tanpa mengubah maksud dan substansi. Bagi tulisan atau artikel yang dimuat akan mendapatkan imbalan sepantasnya.
            </Text>
          </View>
        </Container>
      </ScrollView>
    )
  }
}

export default About