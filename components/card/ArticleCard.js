import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'

const { width: viewportWidth } = Dimensions.get('window')

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 15
  }
})

class ArticleCard extends Component {
  render () {
    return (
      <View style={styles.viewContainer}>
        <View>
          { this.props.image ? (
            <Image source={{ uri: `https://mediakeuangan.kemenkeu.go.id/Images/article/${this.props.image}` }} style={{ width: viewportWidth * 0.9, height: 150 }} resizeMode="cover" />
          ) : (
            <Image source={require('../../assets/images/logo.png')} style={{ width: viewportWidth * 0.9, height: 150 }} resizeMode="cover" />
          ) }
        </View>
        <View style={{ padding: 15 }}>
          <Text style={{ fontFamily: 'FiraSans-Black', textAlign: 'center', fontSize: 20, color: '#000000' }}>{ this.props.title }</Text>
          <Text style={{ fontFamily: 'FiraSans-Regular', textAlign: 'center' }}>{ this.props.author }</Text>
        </View>
      </View>
    )
  }
}

export default ArticleCard