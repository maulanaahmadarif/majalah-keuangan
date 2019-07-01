import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    marginLeft: 20
  }
})

class Container extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        { this.props.children }
      </View>
    )
  }
}

export default Container
