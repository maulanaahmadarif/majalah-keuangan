import React, { Component } from 'react'
import HTML from 'react-native-render-html'
import Share, { ShareSheet } from 'react-native-share'
import ImageViewer from 'react-native-image-zoom-viewer'
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  Modal,
  TouchableOpacity
} from 'react-native'

import { withContext } from '../../context/withContext'
import SettingsModal from '../../components/layout/SettingsModal'
import CardModal from '../../components/card/CardModal'
import Container from '../../components/layout/Container'

class Detail extends Component {
  constructor () {
    super()

    this.state = {
      showImageViewer: false,
      images: []
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
        color: this.isDarkMode() ? '#FFF' : '#000',
        fontFamily: 'FiraSans-Regular'
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
      return 25
    } else if (lineHeightMode === 'medium') {
      return 20
    } else {
      return 18
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
            // Alert.alert('Share', err.message)
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
          bodyContent = <Container><HTML ignoredStyles={['display']} html={con.body} tagsStyles={this.getHTMLStyle()} /></Container>
        } else if (con.type === 'image') {
          !this.isImageHide() ? (
            bodyContent = <TouchableOpacity activeOpacity={1} onPress={() => this.onPressImage(con.body)}><Image source={{ uri: con.body }} style={[{ width: (Dimensions.get('window').width), aspectRatio: 1.2 }]} resizeMode='contain' /></TouchableOpacity>
          ) : null
        } else if (con.type === 'keterangan') {
          bodyContent = (
            <Container>
              <Text style={[{ fontSize: this.getFontSize() * 0.8, color: '#AAAAAA', fontFamily: 'FiraSans-Regular' }]}>{ con.item[0].title }</Text>
              <Text style={[{ color: this.isDarkMode() ? '#FFFFFF' : '#000000' }, { fontSize: this.getFontSize(), fontFamily: 'FiraSans-Regular' }]}>{ con.item[0].text }</Text>
            </Container>
          )
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

  onPressImage = (imageUrl) => {
    this.setState({
      showImageViewer: true,
      images: [{
        url: imageUrl
      }]
    })
  }

  render () {
    return (
      <ScrollView style={[this.isDarkMode() && { backgroundColor: '#000000'}]}>
        <Modal visible={this.state.showImageViewer} onRequestClose={() => this.setState({ showImageViewer: false })} transparent={true}>
          <ImageViewer imageUrls={this.state.images}/>
        </Modal>
        <CardModal
          onBackButtonPress={() => this.props.context.setShowSettingsModal(false)}
          onBackdropPress={() => this.props.context.setShowSettingsModal(false)}
          title="Pengaturan Mode Baca"
          isVisible={this.props.context.showSettingsModal}>
          <SettingsModal onCloseModal={() => this.props.context.setShowSettingsModal(false)} />
        </CardModal>
        <View style={{ paddingVertical: 15 }}>{ this.renderContent() }</View>
        <View>
          <ShareSheet visible={this.props.context.showShare} onCancel={this.onCancel} />
        </View>
      </ScrollView>
    )
  }
}

export default withContext(Detail)
