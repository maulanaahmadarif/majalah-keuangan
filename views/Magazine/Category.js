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
  TouchableOpacity,
  Platform,
  PixelRatio
} from 'react-native'

import Database from '../../Database'

import { withContext } from '../../context/withContext'
import SettingsModal from '../../components/layout/SettingsModal'
import CardModal from '../../components/card/CardModal'
import Container from '../../components/layout/Container'

const db = new Database()

const width = 80 * (Platform.OS === 'ios' ? 1 : PixelRatio.get());
const height = 80 * (Platform.OS === 'ios' ? 1 : PixelRatio.get());


class Category extends Component {
  constructor () {
    super()

    this.state = {
      currentIndex: null,
      showImageViewer: false,
      images: []
    }
  }

  componentDidMount () {
    const { category, currentCategory } = this.props.context
    const article = category[currentCategory]
    const data = {
      id: article.id,
      title: article.title,
      main_image: article.main_image,
      author: article.author,
      content: JSON.stringify(article.content),
      isLoved: 'no',
      createdAt: new Date().toString()
    }
    db.addMagazine(data)
      .then((res) => {
        console.log('res', res)
      })
      .catch((err) => {
        console.log('err', err)
      })
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
      const { articles, currentCategory, category } = this.props.context
      const articleId = articles.id
      const title = this.removeAdditionalWhiteSpace(category[currentCategory].title)
      const slug = title.toLowerCase().split(' ').join('-')
      this.props.context.showShare &&
        Share.open(
          {
            title,
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

  renderImageHTML = () => {
    let index = 0
    const that = this
    return {
      img (htmlAttribs, children, convertedCSSStyles, passProps) {
        index += 1
        return <TouchableOpacity key={`image-${index}`} activeOpacity={1} onPress={() => that.onPressImage(htmlAttribs.src)}><Image source={{ uri: htmlAttribs.src }} style={[{ width: (Dimensions.get('window').width) - 40, aspectRatio: 1.2 }]} resizeMode='contain' /></TouchableOpacity>
      }
    }
  }

  renderContent = () => {
    const { category, currentCategory } = this.props.context
    if (currentCategory !== null) {
      return category[currentCategory].content.map((content, index) => {
        let bodyContent = null
        if (content.type === 'paragraph') {
          bodyContent = <Container><HTML ignoredStyles={['display']} html={content.body} tagsStyles={this.getHTMLStyle()} textSelectable={true} renderers={this.renderImageHTML()} /></Container>
        } else if (content.type === 'image') {
          !this.isImageHide() ? (
            bodyContent = <TouchableOpacity activeOpacity={1} onPress={() => this.onPressImage(content.body)}><Image source={{ uri: content.body }} style={[{ width: (Dimensions.get('window').width), aspectRatio: 1.2 }]} resizeMode='contain' /></TouchableOpacity>
          ) : null
        } else if (content.type === 'keterangan') {
          bodyContent = (
            <Container>
              <Text style={[{ fontSize: this.getFontSize() * 0.8, color: '#AAAAAA', fontFamily: 'FiraSans-Regular' }]}>{ content.item[0].title }</Text>
              <Text style={[{ color: this.isDarkMode() ? '#FFFFFF' : '#000000' },  { fontSize: this.getFontSize(), fontFamily: 'FiraSans-Regular' }]}>{ content.item[0].text }</Text>
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
          <ImageViewer imageUrls={this.state.images} onSwipeDown={() => this.setState({ showImageViewer: false })} enableSwipeDown  />
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

export default withContext(Category)