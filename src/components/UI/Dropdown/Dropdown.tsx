import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, Divider, IconButton, Menu } from 'react-native-paper'
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
      <Menu
        visible={opened}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Show menu</Button>}>
        <Menu.Item onPress={() => { }} title="Item 1" />
        <Menu.Item onPress={() => { }} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => { }} title="Item 3" />
      </Menu>
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
  }
})
