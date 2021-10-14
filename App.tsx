import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';

import Topbar from './components/UI/Topbar/Topbar';
import AllCardsContainer from './components/views/AllCardsContainer/AllCardsContainer';
import CardDetails from './components/views/CardDetails/CardDetails';
import FavoriteCardsContainer from './components/views/FavoriteCardsContainer/FavoriteCardsContainer';
import store from './store/store';
import { FAB, Provider, Surface } from 'react-native-paper';
import FormCreatePost from './components/UI/FormCreatePost/FormCreatePost';
import storeForm from './store/FormStore';


const App: React.FC = () => {

  const showForm = () => {
    storeForm.toggleForm()
  }

  return (
    <Provider>
      <Surface style={{ height: '100%' }} >

        <Topbar />

        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.container}>

              <AllCardsContainer store={store} />
              <CardDetails />
              <FavoriteCardsContainer store={store} />

            </View>
          </View>

        </ScrollView>

        <FAB onPress={showForm} style={styles.fab} icon="plus" />
        <FormCreatePost storeForm={storeForm} store={store} />

        <StatusBar style="auto" />
      </Surface>
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
    right: 0,
    bottom: 0,
  },
});

export default App;