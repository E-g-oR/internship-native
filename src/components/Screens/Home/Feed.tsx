import React from "react";
import { ScrollView } from "react-native";
import store from "../../../store/store";
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