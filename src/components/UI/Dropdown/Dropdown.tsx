import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, Divider, IconButton, Menu, Surface, TouchableRipple } from 'react-native-paper'
import tw from 'twrnc'

const Dropdown = () => {
  const [opened, setOpened] = useState(false)
  const [value, setValue] = useState('Please, select the country')
  const closeMenu = () => {
    setOpened(false)
  }
  const openMenu = () => {
    setOpened(true)
  }
  return (
    <View>
      <TouchableOpacity style={styles.dropdown}>
        <Text>{value}</Text>
        <IconButton
          size={20}
          icon="chevron-down"
          onPress={() => { console.log('press') }}
        />

      </TouchableOpacity>
      <Surface style={styles.menu} >
        <ScrollView style={{ maxHeight: 220 }}>
          <TouchableRipple style={styles.menuItem} onPress={() => closeMenu()} >
            <Text>some text here</Text>
          </TouchableRipple>
          <TouchableRipple style={styles.menuItem} onPress={() => closeMenu()} >
            <Text>some text here</Text>
          </TouchableRipple>
          <TouchableRipple style={styles.menuItem} onPress={() => closeMenu()} >
            <Text>some text here</Text>
          </TouchableRipple>
          <TouchableRipple style={styles.menuItem} onPress={() => closeMenu()} >
            <Text>some text here</Text>
          </TouchableRipple>
          <TouchableRipple style={styles.menuItem} onPress={() => closeMenu()} >
            <Text>some text here</Text>
          </TouchableRipple>
          <TouchableRipple style={styles.menuItem} onPress={() => closeMenu()} >
            <Text>some text here</Text>
          </TouchableRipple>
          <TouchableRipple style={styles.menuItem} onPress={() => closeMenu()} >
            <Text>some text here</Text>
          </TouchableRipple>
          <TouchableRipple style={styles.menuItem} onPress={() => closeMenu()} >
            <Text>some text here</Text>
          </TouchableRipple>
        </ScrollView>
      </Surface>
    </View>
  )
}

export default Dropdown

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#eee',
    marginVertical: '3%',
    marginHorizontal: '3%',
    padding: 15,
    borderRadius: 7,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menu: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 85,
    width: '94%',
    marginHorizontal: '3%',
    paddingVertical: 7,
    borderRadius: 7,
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 5,
  },
  menuItem: {
    padding: 15
  }
})
