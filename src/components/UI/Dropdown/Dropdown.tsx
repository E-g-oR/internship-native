import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Button, Divider, IconButton, List, Menu, Surface, TouchableRipple } from 'react-native-paper'
import tw from 'twrnc'
import { IStore, PostsStore } from '../../../store/store'
import { observer } from 'mobx-react'

const Dropdown: React.FC<{ store: PostsStore }> = observer(({ store }) => {

  const initialValue = 'Please, select the country'
  const [opened, setOpened] = useState(false)
  const [value, setValue] = useState(initialValue)

  const selectCountry = (countryName: string) => {
    setValue(countryName);
    toggleMenu();
  }

  const toggleMenu = () => {
    setOpened(prev => !prev)
  }

  useEffect(() => {
    if (value !== initialValue) {
      store.setCountryFilter(value)
    }
    console.log(store.countryFilter);
  }, [value])

  return (
    <View>
      {store.countriesList.length
        ? (
          <Surface style={styles.menu} >
            <ScrollView >
              <List.Accordion expanded={opened} onPress={toggleMenu}
                title={value}
              >
                <List.Item title="All" onPress={() => { selectCountry("All") }} />
                {store.countriesList.map(country => <List.Item key={country} title={country} onPress={() => { selectCountry(country) }} />)}
              </List.Accordion>
            </ScrollView>
          </Surface>)
        : null}


    </View>
  )
})

export default Dropdown

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#eee',
    marginVertical: '3%',
    marginHorizontal: '5%',
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
    // position: 'absolute',
    // top: 85,
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 10,
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
