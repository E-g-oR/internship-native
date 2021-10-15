import React from "react"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeScreen from "../components/Screens/Home/Home";
import FavoritesScreen from "../components/Screens/Favorites/Favorites";
import { IPost } from "../components/UI/Card/Card";

export type RootStackParamList = {
  Home: undefined,
  Favorites: undefined,
  Info: { post: IPost }
}

const Tab = createMaterialBottomTabNavigator<RootStackParamList>()


const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{ backgroundColor: '#6200ee' }}
      shifting={true}

    >
      <Tab.Group>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            )
          }}
        />

        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="heart" color={color} size={26} />
            )
          }}
        />
      </Tab.Group>

    </Tab.Navigator>
  )
}
export default MyTabs