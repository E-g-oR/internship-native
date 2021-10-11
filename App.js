import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';

import Topbar from './components/UI/Topbar/Topbar';
import AllCardsContainer from './components/views/AllCardsContainer/AllCardsContainer';
import CardDetails from './components/views/CardDetails/CardDetails';
import FavoriteCardsContainer from './components/views/FavoriteCardsContainer/FavoriteCardsContainer';

export default function App() {

  return (
    <View>

      <Topbar />

      <ScrollView >
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <AllCardsContainer />
            <CardDetails />
            <FavoriteCardsContainer />
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
