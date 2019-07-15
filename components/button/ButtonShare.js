import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  TouchableOpacity
} from 'react-native'

import { withContext } from '../../context/withContext'

class ButtonShare extends Component {
  render () {
    return (
      <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => this.props.context.setShowShare(true)}>
        <Ionicons name="md-share" size={25} color="#000000" />
      </TouchableOpacity>
    )
  }
}

export default withContext(ButtonShare)
