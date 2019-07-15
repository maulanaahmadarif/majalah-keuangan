import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  radioButtonContainerInline: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  radioButtonStyle: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10
  },
  radioLabelStyle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500'
  }
})

class RadioButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeButton: null
    }
  }

  onRadioPress = (value, index) => {
    if (this.state.activeButton !== index) {
      this.props.onChange(value)
      this.setState({ activeButton: index })
    }
  }

  renderRadioList () {
    return this.props.data.map((item, index) => {
      return (
        <TouchableOpacity activeOpacity={1} style={[styles.radioButtonContainer, this.props.inline && { marginRight: 10 }]} key={index} onPress={() => this.onRadioPress(item.value, index)}>
          <View style={[styles.radioButtonStyle, this.state.activeButton === index && { backgroundColor: 'gray' } ]}></View>
          <View>
            <Text style={[styles.radioLabelStyle, this.props.inline && { fontSize: 14 }]}>{ item.label }</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }

  render () {
    return (
      <View>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000' }}>{ this.props.label }</Text>
        </View>
        <View style={[this.props.inline && styles.radioButtonContainerInline]}>
          { this.renderRadioList() }
        </View>
      </View>
    )
  }
}

export default RadioButton