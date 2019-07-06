import React, { Component } from 'react'
import {
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  buttonStyle: {
    height: 35,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  }
})

class RegularButton extends Component {
  render () {
    return (
      <TouchableNativeFeedback
        onPress={this.props.onPress}
        background={TouchableNativeFeedback.SelectableBackground()}
      >
        <View style={[styles.buttonStyle, { backgroundColor: this.props.bgColor }]}>
          <Text style={{ color: this.props.color }}>{ this.props.text }</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

export default RegularButton
