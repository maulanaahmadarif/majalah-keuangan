import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native'

import RadioButton from '../../components/button/RadioButton'
import { withContext } from '../../context/withContext'
import paragrafIcon from '../../assets/images/paragraph-icon.png'

const imageMode = [
  {
    name: 'imageMode',
    label: 'Show',
    value: 'show',
    default: true
  },
  {
    name: 'imageMode',
    label: 'Hide',
    value: 'hide'
  }
]

const lineHeightMode = [
  {
    name: 'lineHeightMode',
    label: '',
    icon: paragrafIcon,
    iconHeight: 20,
    value: 'narrow'
  },
  {
    name: 'lineHeightMode',
    label: '',
    icon: paragrafIcon,
    iconHeight: 25,
    value: 'medium'
  },
  {
    name: 'lineHeightMode',
    label: '',
    icon: paragrafIcon,
    iconHeight: 30,
    value: 'wide'
  },
]

const fontSizeMode = [
  {
    name: 'fontSizeMode',
    label: 'Small',
    value: 'small',
    labelSize: 12,
  },
  {
    name: 'fontSizeMode',
    label: 'Medium',
    value: 'medium',
    labelSize: 16
  },
  {
    name: 'fontSizeMode',
    label: 'Big',
    value: 'big',
    labelSize: 20
  }
]

const readMode = [
  {
    name: 'readMode',
    label: 'Normal Mode',
    value: 'normal'
  },
  {
    name: 'readMode',
    label: 'Night Mode',
    value: 'night'
  }
]

class SettingsModal extends Component {
  onRadioModeChange = async (value, name) => {
    try {
      await AsyncStorage.setItem(name, value)
      this.props.context.setUserSettings([name, value])
    } catch (e) {
      Alert.alert('Error', e.message)
    }
  }

  render () {
    const settings = this.props.context.userSettings
    return (
      <ScrollView>
        <View style={{ paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'gray' }}>
          <RadioButton value={settings.readMode} label="Pilihan Mode Baca" inline data={readMode} onChange={this.onRadioModeChange} />
        </View>
        <View style={{ paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'gray' }}>
          <RadioButton value={settings.fontSizeMode} label="Ukuran Huruf" inline data={fontSizeMode} onChange={this.onRadioModeChange} />
        </View>
        <View style={{ paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'gray' }}>
          <RadioButton value={settings.lineHeightMode} label="Jarak Paragraf" inline data={lineHeightMode} onChange={this.onRadioModeChange} />
        </View>
        <View style={{ paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'gray' }}>
          <RadioButton value={settings.imageMode} label="Show or Hide Image" inline data={imageMode} onChange={this.onRadioModeChange} />
        </View>
        <View style={{ marginVertical: 5 }}>
          <TouchableOpacity style={{ backgroundColor: '#000000', padding: 10 }} onPress={() => this.props.onCloseModal()}>
            <Text style={{ fontSize: 16, color: '#FFFFFF', textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default withContext(SettingsModal)