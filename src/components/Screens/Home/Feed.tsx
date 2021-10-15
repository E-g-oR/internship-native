import React from "react";
import { ScrollView } from "react-native";
import store from "../../../store/store";
import AllCardsContainer from "../../views/AllCardsContainer/AllCardsContainer";
import Topbar from "../../UI/Topbar/Topbar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/TabNavigation";
type Props = NativeStackScreenProps<RootStackParamList, 'Feed'>
const Feed = ({ route, navigation }: Props) => {
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