import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';

import Topbar from './components/UI/Topbar/Topbar';
import AllCardsContainer from './components/views/AllCardsContainer/AllCardsContainer';
import CardDetails from './components/views/CardDetails/CardDetails';
import FavoriteCardsContainer from './components/views/FavoriteCardsContainer/FavoriteCardsContainer';
import { IPost } from './components/UI/Card/Card';
import { makeAutoObservable } from 'mobx';
import store from './store/store';


export default function App() {
  return (
    <View>

      <Topbar />

      <ScrollView >
        <View style={styles.wrapper}>
          <View style={styles.container}>

            <AllCardsContainer store={store} />
            <CardDetails />
            <FavoriteCardsContainer store={store} />

          </View>
        </View>
      </ScrollView>

      <StatusBar style="auto" />

    </View>
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
  }
});

