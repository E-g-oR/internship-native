import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';

import Topbar from './src/components/UI/Topbar/Topbar';
import AllCardsContainer from './src/components/views/AllCardsContainer/AllCardsContainer';
import CardDetails from './src/components/views/CardDetails/CardDetails';
import FavoriteCardsContainer from './src/components/views/FavoriteCardsContainer/FavoriteCardsContainer';
import store from './src/store/store';
import { FAB, Provider, Surface } from 'react-native-paper';
import FormCreatePost from './src/components/UI/FormCreatePost/FormCreatePost';
import storeForm from './src/store/FormStore';
import Navigate from './src/navigation/navigate';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './src/navigation/TabNavigation';


const App: React.FC = () => {

  const showForm = () => {
    storeForm.toggleForm()
  }

  return (
    <Provider>
      <NavigationContainer>
        <Surface style={{ height: '100%' }} >

          <FAB onPress={showForm} style={styles.fab} icon="plus" />
          <MyTabs />

          <StatusBar style="auto" />
        </Surface>
      </NavigationContainer>
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
    // borderWidth: 2,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 70,
    right: 0,
    bottom: 0,
    zIndex: 20
  },
});

export default App;