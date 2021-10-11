import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Card, Paragraph, Title, Button, TouchableRipple, Appbar } from 'react-native-paper';
import BottomNav from './components/BottomNavigation/BottomNavigation';

import AllCardsContainer from './components/AllCardsContainer/AllCardsContainer'
import CardDetails from './components/CardDetails/CardDetails'
import FavoriteCardsContainer from './components/FavoriteCardsContainer/FavoriteCardsContainer'
import Post from './components/Card/Card';

export default function App() {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(prev => prev + 1)
  }
  return (
    <View>

      <Appbar.Header style={styles.appbar} dark >
        <Appbar.BackAction />
        <Appbar.Content title="My first native app" subtitle="Hello, world!" />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      <ScrollView >
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <AllCardsContainer />
            <CardDetails />
            <FavoriteCardsContainer />
            {/* <BottomNav /> */}
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
