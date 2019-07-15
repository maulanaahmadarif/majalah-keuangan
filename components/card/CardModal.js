import React, { Component } from 'react'
import Modal from 'react-native-modal'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000'
  }
})

class CardModal extends Component {
  render () {
    return (
      <Modal
        onBackButtonPress={this.props.onBackButtonPress}
        onBackdropPress={this.props.onBackdropPress}
        isVisible={this.props.isVisible}>
        <View style={styles.modalStyle}>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.titleStyle}>{ this.props.title }</Text>
          </View>
          <View>
            { this.props.children }
          </View>
        </View>
      </Modal>
    )
  }
}

export default CardModal