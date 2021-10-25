import React from 'react';
import { observer } from 'mobx-react';
import { PostsStore } from '../../../store/store';
import { ScrollView, StyleSheet, View } from 'react-native';
import { List, Surface } from 'react-native-paper';
import DropdownLogic from './DropdownLogic';

const Dropdown: React.FC<{ store: PostsStore }> = observer(({ store }) => {

  const { value, opened, selectCountry, toggleMenu } = DropdownLogic(store);

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
                {store.countriesList.map(country => <List.Item key={country} title={country} onPress={() => { selectCountry(country); }} />)}
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
