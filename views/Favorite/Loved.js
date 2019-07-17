import React, { Component } from 'react'
import {
  ScrollView
} from 'react-native'

import Database from '../../Database';
import ArticleCard from '../../components/card/ArticleCard'
import Container from '../../components/layout/Container'

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
        return <ArticleCard key={index} image={mag.main_image} title={mag.title} author={mag.author} />
      })
    }
  }

  render () {
    return (
      <ScrollView>
        <Container style={{ marginVertical: 15 }}>
          { this.renderArticleCard() }
        </Container>
      </ScrollView>
    )
  }
}

export default Loved