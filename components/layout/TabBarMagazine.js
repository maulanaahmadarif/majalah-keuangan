import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { withNavigation } from 'react-navigation'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'

import { withContext } from '../../context/withContext'

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderTopColor: 'rgba(0,0,0,.2)',
    borderTopWidth: 1
  }
})

class TabBarMagazine extends Component {
  isDarkMode = () => {
    return this.props.context.userSettings.readMode !== 'normal'
  }

  getIconColor = (index) => {
    let color = ''
    if (this.isDarkMode()) {
      if (this.props.activeIndex === index) {
        color = '#FFFFFF'
      } else {
        color = '#aaaaaa'
      }
    } else {
      if (this.props.activeIndex === index) {
        color = '#000000'
      } else {
        color = '#aaaaaa'
      }
    }
    return color
  }

  render () {
    return (
      <View style={[styles.tabBarContainer, this.isDarkMode() && { backgroundColor: '#000000', borderTopColor: 'rgba(255,255,255,.2)' }]}>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Magazine')}>
          <Ionicons name="ios-book" size={25} color={this.getIconColor(0)} />
          <Text style={[{ fontSize: 10, color: this.getIconColor(0) }]}>Magazine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Favorite')}>
          <Ionicons name="ios-heart" size={25} color={this.getIconColor(1)} />
          <Text style={[{ fontSize: 10, color: this.getIconColor(1) }]}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Settings')}>
          <Ionicons name="ios-cog" size={25} color={ this.getIconColor(2) } />
          <Text style={[{ fontSize: 10, color: this.getIconColor(2) }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withContext(withNavigation(TabBarMagazine))