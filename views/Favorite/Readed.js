import React, { Component } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  View,
  Text,
  FlatList
} from 'react-native'

import Database from '../../Database';
import ArticleCard from '../../components/card/ArticleCard'
import Container from '../../components/layout/Container'
import { withContext } from '../../context/withContext'

const db = new Database()

class Readed extends Component {
  constructor () {
    super()

    this.state = {
      magazines: [],
      isRefreshing: false
    }
  }

  componentDidMount () {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.onRefresh()
    })
  }

  onRefresh = () => {
    this.setState({
      isRefreshing: true
    })
    db.listMagazine()
      .then((data) => {
        this.setState({
          magazines: data
        })
      })
      .catch((err) => {
        // Alert.alert('Error', err.message)
        console.log(err)
      })
      .finally(() => {
        this.setState({
          isRefreshing: false
        })
      })
  }

  renderArticleCard = (item, index) => {
    return (
      <TouchableOpacity key={index} activeOpacity={1} onPress={() => this.onClickCard(item)}>
        <ArticleCard image={item.main_image} title={item.title} author={item.author} />
      </TouchableOpacity>
    )
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
        { this.state.magazines.length !== 0 ? (
          <FlatList
            data={this.state.magazines}
            onRefresh={this.onRefresh}
            refreshing={this.state.isRefreshing}
            keyExtractor={(item, index) => `id-${index}`}
            renderItem={({ item, index }) => this.renderArticleCard(item, index)}
          />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: this.isDarkMode() ? '#FFFFFF' : '#AAAAAA' }}>Belum ada artikel</Text>
          </View>
        ) }
        </Container>
      </ScrollView>
    )
  }
}

export default withContext(Readed)