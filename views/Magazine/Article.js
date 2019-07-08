import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

import { withContext } from '../../context/withContext'

class Article extends Component {
  render () {
    return (
      <View>
        <Text>This is Article</Text>
      </View>
    )
  }
}

export default withContext(Article)