import React from "react";
import store from "../../../store/store";
import { ScrollView } from "react-native";
import FavoriteCardsContainer from "../../views/FavoriteCardsContainer/FavoriteCardsContainer";
import Topbar from "../../UI/Topbar/Topbar";

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