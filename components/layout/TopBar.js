import React, { Component } from  'react'
import { MaterialTopTabBar } from 'react-navigation'
import { SafeAreaView } from 'react-native'

class TopBar extends Component {
  render () {
    return (
      <SafeAreaView>
        <MaterialTopTabBar {...this.props} />
      </SafeAreaView>
    )
  }
}

export default TopBar