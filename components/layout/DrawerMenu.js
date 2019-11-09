import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native'

import { withContext } from '../../context/withContext'

const styles = StyleSheet.create({
  textMenu: {
    color: '#FFFFFF',
    fontFamily: 'FiraSans-Regular'
  }
})

class DrawerMenu extends Component {
  renderMenu () {
    if (this.props.context.articles !== null) {
      const { section } = this.props.context.articles
      return section.map((sec) => {
        return (
          <TouchableOpacity key={sec.id} style={{ padding: 15, flexDirection: 'row', alignItems: 'center', borderBottomColor: '#FFFFFF', borderBottomWidth: 1 }} onPress={() => this.onClickMenu(sec)}>
            <View style={{ width: 10, height: 10, backgroundColor: '#FFFFFF', marginRight: 15 }}></View>
            <Text style={[styles.textMenu]}>{ sec.title }</Text>
          </TouchableOpacity>
        )
      })
    }
  }

  onClickMenu = (sec) => {
    if (sec.article.length === 0) {
      Alert.alert('Info', 'Tidak ada artikel untuk section ini')
    } else {
      const id = sec.article[0].id
      const title = sec.article[0].title
      const totalCategory = sec.article.length
      this.props.context.setCategory(sec.article)
      this.props.context.setCurrentCategory(0)
      this.props.navigation.navigate('Category', { id, index: 0, title, totalCategory })
    }
  }

  render () {
    return (
      <View>
        <ScrollView>
          { this.renderMenu() }
        </ScrollView>
      </View>
    )
  }
}

export default withNavigation(withContext(DrawerMenu))