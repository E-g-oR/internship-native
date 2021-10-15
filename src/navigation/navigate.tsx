import React from "react";
// import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from "../components/Screens/Home/Home";
import FavoritesScreen from "../components/Screens/Favorites/Favorites";
import PostInfoScreen from "../components/Screens/PostInfo/PostInfo";

const Stack = createNativeStackNavigator()

const Navigate = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {

      }
    }} >

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />

      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />

      <Stack.Screen
        name="PostInfo"
        component={PostInfoScreen}
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />

    </Stack.Navigator>
  )
}
export default Navigate