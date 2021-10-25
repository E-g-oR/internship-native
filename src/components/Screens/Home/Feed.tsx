import React from "react";
import store from "../../../store/store";
import { ScrollView } from "react-native";
import AllCardsContainer from "../../views/AllCardsContainer/AllCardsContainer";
import Topbar from "../../UI/Topbar/Topbar";

const Feed = () => {
  return (
    <>
      <Topbar goBack={false} title="All posts" subtitle="" />
      <ScrollView>
        <AllCardsContainer store={store} />
      </ScrollView>
    </>
  )
}
export default Feed;