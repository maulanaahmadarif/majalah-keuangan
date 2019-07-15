import React, { Component } from 'react'
import HTML from 'react-native-render-html'
import Share, { ShareSheet, Button } from 'react-native-share';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Alert
} from 'react-native'

import { withContext } from '../../context/withContext'
import Container from '../../components/layout/Container'

class Category extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentIndex: null
    }
  }

  removeAdditionalWhiteSpace = (text) => {
    return text.split(/\s+/).join(' ');
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
          bodyContent = <HTML html={content.body} />
        } else if (content.type === 'keterangan') {
          bodyContent = <Text>{ content.body }</Text>
        } else if (content.type === 'image') {
          bodyContent = <Image source={{ uri: content.body }} style={{ width: (Dimensions.get('window').width * 0.9), height: 200 }} resizeMode='contain' />
        }
        return (
          <View key={index} style={{ marginBottom: 10 }}>
            { bodyContent }
          </View>
        )
      })
    }
  }

  componentDidMount () {
    const { index } = this.props.navigation.state.params
    this.setState({
      currentIndex: index
    })
  }

  onCancel = () => {
    this.props.context.setShowShare(false)
  }

  render () {
    return (
      <ScrollView>
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