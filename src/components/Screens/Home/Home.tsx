import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "./Feed";
import Info from "./Info";
import { Surface } from "react-native-paper";
import { View } from "react-native";

const Stack = createNativeStackNavigator()

const HomeScreen = () => {
  return (
    <Surface style={{ height: '100%' }}>
      <Navigate />
    </Surface>

  )
}


function Navigate() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(98, 0, 238)',
        },
        headerTintColor: '#fff'
      }}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Info" component={Info} />
    </Stack.Navigator >
  )
}

export default HomeScreen
