import React, { Component } from 'react'
import HTML from 'react-native-render-html'
import Share, { ShareSheet } from 'react-native-share';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Alert
} from 'react-native'

import Database from '../../Database'

import { withContext } from '../../context/withContext'
import SettingsModal from '../../components/layout/SettingsModal'
import CardModal from '../../components/card/CardModal'
import Container from '../../components/layout/Container'

const db = new Database()

class Detail extends Component {
  constructor () {
    super()

    this.state = {
      currentIndex: null
    }
  }

  removeAdditionalWhiteSpace = (text) => {
    return text.split(/\s+/).join(' ');
  }

  getHTMLStyle = () => {
    return {
      p: {
        marginBottom: 15,
        fontSize: this.getFontSize(),
        lineHeight: this.getLineHeight(),
        color: this.isDarkMode() ? '#FFF' : '#000'
      }
    }
  }

  getFontSize = () => {
    const { fontSizeMode } = this.props.context.userSettings
    if (fontSizeMode === 'big') {
      return 20
    } else if (fontSizeMode === 'medium') {
      return 16
    } else {
      return 12
    }
  }

  getLineHeight = () => {
    const { lineHeightMode } = this.props.context.userSettings
    if (lineHeightMode === 'wide') {
      return 20
    } else if (lineHeightMode === 'medium') {
      return 16
    } else {
      return 12
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.context.showShare !== prevProps.context.showShare) {
      const { id, title } = this.props.navigation.state.params
      const articleId = id
      const titles = this.removeAdditionalWhiteSpace(title)
      const slug = title.toLowerCase().split(' ').join('-')
      this.props.context.showShare &&
        Share.open(
          {
            title: titles,
            url: `http://mediakeuangan.kemenkeu.go.id/Home/Detail/${articleId}/${slug}`,
            subject: 'Majalah Media Keuangan'
          })
          .then((res) => {
            Alert.alert('Share', 'Shared')
          })
          .catch((err) => {
            Alert.alert('Share', err.message)
          })
          .finally(() => {
            this.props.context.setShowShare(false)
          })
    }
  }

  renderContent = () => {
    const { content } = this.props.navigation.state.params
    if (content !== null) {
      return content.map((con, index) => {
        let bodyContent = null
        if (con.type === 'paragraph') {
          bodyContent = <HTML html={con.body} tagsStyles={this.getHTMLStyle()} />
        } else if (con.type === 'keterangan') {
          bodyContent = <Text style={[this.isDarkMode() && { color: '#FFFFFF'}, { fontSize: this.getFontSize() }]}>{ con.body }</Text>
        } else if (con.type === 'image') {
          !this.isImageHide() ? (
            bodyContent = <Image source={{ uri: con.body }} style={[{ width: (Dimensions.get('window').width * 0.9), height: 200 }]} resizeMode='contain' />
          ) : null
        }
        return (
          <View key={index} style={{ marginBottom: 10 }}>
            { bodyContent }
          </View>
        )
      })
    }
  }

  onCancel = () => {
    this.props.context.setShowShare(false)
  }

  isDarkMode = () => {
    return this.props.context.userSettings.readMode !== 'normal'
  }

  isImageHide = () => {
    return this.props.context.userSettings.imageMode !== 'show'
  }

  render () {
    return (
      <ScrollView style={[this.isDarkMode() && { backgroundColor: '#000000'}]}>
        <CardModal
          onBackButtonPress={() => this.props.context.setShowSettingsModal(false)}
          onBackdropPress={() => this.props.context.setShowSettingsModal(false)}
          title="Pengaturan Mode Baca"
          isVisible={this.props.context.showSettingsModal}>
          <SettingsModal onCloseModal={() => this.props.context.setShowSettingsModal(false)} />
        </CardModal>
        <Container>
          <View style={{ paddingVertical: 15 }}>{ this.renderContent() }</View>
        </Container>
        <View>
          <ShareSheet visible={this.props.context.showShare} onCancel={this.onCancel} />
        </View>
      </ScrollView>
    )
  }
}

export default withContext(Detail)
