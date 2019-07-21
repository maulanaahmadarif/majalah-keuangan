import React, { Component } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  buttonStyle: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  }
})

class RegularButton extends Component {
  render () {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.buttonStyle, { backgroundColor: this.props.bgColor }]}>
        <Text style={{ color: this.props.color }}>{ this.props.text }</Text>
      </TouchableOpacity>
    )
  }
}

export default RegularButton
