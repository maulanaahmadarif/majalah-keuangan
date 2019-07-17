import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { withNavigation } from 'react-navigation'
import {
  View,
  TouchableOpacity
} from 'react-native'

import Database from '../../Database'
import { withContext } from '../../context/withContext'

const db = new Database()

class TabBarCategory extends Component {
  constructor (props) {
    super(props)

    this.state = {
      nextIndex: null,
      prevIndex: null,
      index: null,
      lovedMagazines: [],
      isFavorite: false
    }
  }

  componentDidMount () {
    const { index, total } = this.props
    this.setState({
      nextIndex: index === (total - 1) ? null : (index + 1),
      prevIndex: index === 0 ? null : (index - 1),
      index
    })
    this.props.context.setCurrentCategory(index)
    this.refresh()
  }

  refresh = () => {
    db.listFavoriteMagazine('yes')
      .then((data) => {
        this.setState({
          lovedMagazines: data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onNextCategory = () => {
    const { index } = this.state
    const { total } = this.props
    const newIndex = index + 1
    this.setState({
      prevIndex: newIndex === 0 ? null : (index),
      nextIndex: newIndex === (total - 1) ? null : (newIndex + 1),
      index: newIndex
    })
    this.props.context.setCurrentCategory(newIndex)
    const { title } = this.props.context.category[newIndex]
    this.props.navigation.setParams({ title })
  }

  onPrevCategory = () => {
    const { index } = this.state
    const { total } = this.props
    const newIndex = index - 1
    this.setState({
      prevIndex: newIndex === 0 ? null : (newIndex - 1),
      nextIndex: newIndex === (total - 1) ? null : (newIndex + 1),
      index: newIndex
    })
    this.props.context.setCurrentCategory(newIndex)
    const { title } = this.props.context.category[newIndex]
    this.props.navigation.setParams({ title })
  }

  onFavoritePress = () => {
    const { category } = this.props.context
    const article = category[this.state.index]
    const data = {
      id: article.id,
      title: article.title,
      main_image: article.main_image,
      author: article.author,
      content: JSON.stringify(article.content),
      isLoved: 'yes'
    }
    db.updateMagazine(data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log('err', err)
      })
    this.refresh()
  }

  onRemoveFavorite = () => {
    const { category } = this.props.context
    const article = category[this.state.index]
    const data = {
      id: article.id,
      title: article.title,
      main_image: article.main_image,
      author: article.author,
      content: JSON.stringify(article.content),
      isLoved: 'no'
    }
    db.updateMagazine(data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log('err', err)
      })
    this.refresh()
  }

  isFavoriteArticle = () => {
    let isFavorite = false
    const { category } = this.props.context
    const article = category[this.state.index]
    const { lovedMagazines } = this.state
    for (let i = 0;i < lovedMagazines.length; i++) {
      if (lovedMagazines[i].id === article.id) {
        isFavorite = true
        break
      }
    }
    return isFavorite
  }

  render () {
    const { nextIndex, prevIndex } = this.state
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopColor: 'rgba(0,0,0,.2)', borderTopWidth: 1 }}>
        <TouchableOpacity disabled={prevIndex === null} style={{ flex: 1, alignItems: 'center' }} onPress={this.onPrevCategory}>
          <Ionicons name="ios-arrow-back" size={25} color={prevIndex === null ? 'rgba(0,0,0,.2)' : '#000000'} />
        </TouchableOpacity>
        { this.isFavoriteArticle() ? (
          <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.onRemoveFavorite()}>
            <Ionicons name="ios-heart" size={25} color="#000000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.onFavoritePress()}>
            <Ionicons name="ios-heart-empty" size={25} color="#000000" />
          </TouchableOpacity>
        ) }
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.props.context.setShowSettingsModal(true)}>
          <Ionicons name="ios-options" size={25} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity disabled={nextIndex === null} style={{ flex: 1, alignItems: 'center' }} onPress={this.onNextCategory}>
          <Ionicons name="ios-arrow-forward" size={25} color={nextIndex === null ? 'rgba(0,0,0,.2)' : '#000000'} />
        </TouchableOpacity>
      </View>
    )
  }
}

export default withContext(withNavigation(TabBarCategory))