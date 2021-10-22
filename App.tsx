import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';

import store from './src/store/store';
import { FAB, Provider, Surface } from 'react-native-paper';
import FormCreatePost from './src/components/UI/FormCreatePost/FormCreatePost';
import storeForm from './src/store/FormStore';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './src/navigation/TabNavigation';


const App: React.FC = () => {

  const showForm = () => {
    storeForm.toggleForm()
  }

  return (
    <Provider>
      <Surface style={{ height: '100%' }} >
        <NavigationContainer>
          <FAB onPress={showForm} style={styles.fab} icon="plus" />
          <MyTabs />

          <StatusBar style="auto" />
        </NavigationContainer>
      </Surface>
      <FormCreatePost storeForm={storeForm} store={store} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingTop: 17
  },
  container: {
    width: "90%",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 70,
    right: "5%",
    bottom: 0,
    zIndex: 20
  },
});

export default App;