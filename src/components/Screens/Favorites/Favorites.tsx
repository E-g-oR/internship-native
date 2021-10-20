import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import store from "../../../store/store";
import Topbar from "../../UI/Topbar/Topbar";
import FavoriteCardsContainer from "../../views/FavoriteCardsContainer/FavoriteCardsContainer";

const FavoritesScreen = () => {
  return (
    <>
      <Topbar goBack={false} title="Favorites" subtitle="you can see your favorite posts here" />
      <ScrollView>
        <FavoriteCardsContainer store={store} />
      </ScrollView>
    </>
  )
}

export default FavoritesScreen