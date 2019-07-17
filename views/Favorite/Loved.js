import React, { Component } from 'react'
import {
  ScrollView,
  TouchableOpacity
} from 'react-native'

import Database from '../../Database';
import ArticleCard from '../../components/card/ArticleCard'
import Container from '../../components/layout/Container'
import { withContext } from '../../context/withContext'

const db = new Database()
class Loved extends Component {
  constructor () {
    super()

    this.state = {
      magazines: []
    }
  }

  componentDidMount () {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      db.listFavoriteMagazine('yes')
        .then((data) => {
          this.setState({
            magazines: data
          })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  renderArticleCard = () => {
    const { magazines } = this.state
    if (magazines.length !== 0) {
      return magazines.map((mag, index) => {
        return (
          <TouchableOpacity key={index} activeOpacity={1} onPress={() => this.onClickCard(mag)}>
            <ArticleCard image={mag.main_image} title={mag.title} author={mag.author} />
          </TouchableOpacity>
        )
      })
    }
  }

  onClickCard = (data) => {
    this.props.navigation.navigate('Detail', { id: data.id, title: data.title, author: data.author, content: JSON.parse(data.content) })
  }

  isDarkMode = () => {
    return this.props.context.userSettings.readMode !== 'normal'
  }

  render () {
    return (
      <ScrollView style={this.isDarkMode() && { backgroundColor: '#000000' }}>
        <Container style={{ marginVertical: 15 }}>
          { this.renderArticleCard() }
        </Container>
      </ScrollView>
    )
  }
}

export default withContext(Loved)