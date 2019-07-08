import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const IconComponent = Ionicons;

const styles = StyleSheet.create({
  cardListText: {
    fontSize: 16
  },
  cardListWrapper: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  }
})

class CardList extends Component {
  render () {
    return (
      <TouchableNativeFeedback onPress={this.props.onPress}>
        <View style={styles.cardListWrapper}>
          <View>
            <Text style={styles.cardListText}>{ this.props.text }</Text>
          </View>
          <View>
            <IconComponent name="ios-arrow-forward" size={20} color="gray" />
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

export default CardList
