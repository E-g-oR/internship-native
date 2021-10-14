import React from "react";
import { ScrollView, View } from "react-native";
import { Button, FAB, Surface, Text } from "react-native-paper";
import AllCardsContainer from "../../views/AllCardsContainer/AllCardsContainer";
import store from "../../../store/store";
import { useNavigation } from "@react-navigation/native";
import Topbar from "../../UI/Topbar/Topbar";


const HomeScreen = () => {

  return (
    <>
      <Topbar goBack={false} title="Home screen" subtitle="All posts" />
      <ScrollView>
        <AllCardsContainer store={store} />
      </ScrollView>
    </>
  )
}

export default HomeScreen
