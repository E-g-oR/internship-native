import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Feed from "./Feed";
import Info from "./Info";
import { Surface } from "react-native-paper";
import { View } from "react-native";
import Topbar from "../../UI/Topbar/Topbar";
import { RootStackParamList } from "../../../navigation/TabNavigation";

const Stack = createNativeStackNavigator()
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ route, navigation }: Props) => {
  return (
    <>
      <Surface style={{ height: '100%' }}>
        <Navigate />
      </Surface>
    </>
  )
}


function Navigate() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
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
