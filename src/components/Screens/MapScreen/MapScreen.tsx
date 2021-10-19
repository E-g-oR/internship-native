import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { ScrollView, View } from "react-native";
import { Text, Title } from "react-native-paper";
import { RootStackParamList } from "../../../navigation/TabNavigation";
import { IPost } from "../../UI/Card/Card";
import Topbar from "../../UI/Topbar/Topbar";
import CardDetails from "../../views/CardDetails/CardDetails";


type Props = MaterialBottomTabScreenProps<RootStackParamList, 'MapScreen'>
const MapScreen = ({ route, navigation }: Props) => {
	return (<>
		<Topbar goBack={true} title="Post Info Screen" subtitle="Information of specific post" />
		<ScrollView>
			<Text>Post Info Screen</Text>
			<CardDetails post={route.params.post} />
		</ScrollView>
	</>)
}

export default MapScreen

// ?
// ?
// ?
//?
