import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { withNavigation } from 'react-navigation'
import {
  View,
  TouchableOpacity
} from 'react-native'

import { withContext } from '../../context/withContext'

class TabBarCategory extends Component {
  constructor (props) {
    super(props)

    this.state = {
      nextIndex: null,
      prevIndex: null,
      index: null
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

  render () {
    const { nextIndex, prevIndex } = this.state
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopColor: 'rgba(0,0,0,.2)', borderTopWidth: 1 }}>
        <TouchableOpacity disabled={prevIndex === null} style={{ flex: 1, alignItems: 'center' }} onPress={this.onPrevCategory}>
          <Ionicons name="ios-arrow-back" size={25} color={prevIndex === null ? 'rgba(0,0,0,.2)' : '#000000'} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
          <Ionicons name="ios-heart-empty" size={25} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
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