import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

import { withUser } from '../../context/withUser'

class Magazine extends Component {
  componentDidMount () {
    console.log(this.props)
  }

  render () {
    return (
      <View>
        <Text>This is Magazine</Text>
      </View>
    )
  }
}

export default withUser(Magazine)