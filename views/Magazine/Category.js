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

class Category extends Component {
  constructor () {
    super()

    this.state = {
      currentIndex: null
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
      isLoved: 'no'
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
            Alert.alert('Share', err.message)
          })
          .finally(() => {
            this.props.context.setShowShare(false)
          })
    }
  }

  renderContent = () => {
    const { category, currentCategory } = this.props.context
    if (currentCategory !== null) {
      return category[currentCategory].content.map((content, index) => {
        let bodyContent = null
        if (content.type === 'paragraph') {
          bodyContent = <HTML html={content.body} tagsStyles={this.getHTMLStyle()} />
        } else if (content.type === 'keterangan') {
          bodyContent = <Text style={[this.isDarkMode() && { color: '#FFFFFF'}, { fontSize: this.getFontSize() }]}>{ content.body }</Text>
        } else if (content.type === 'image') {
          !this.isImageHide() ? (
            bodyContent = <Image source={{ uri: content.body }} style={[{ width: (Dimensions.get('window').width * 0.9), height: 200 }]} resizeMode='contain' />
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

export default withContext(Category)