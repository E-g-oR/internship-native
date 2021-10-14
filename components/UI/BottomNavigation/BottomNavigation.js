import React, { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import AllCardsContainer from "../../views/AllCardsContainer/AllCardsContainer";

const Tab = createMaterialBottomTabNavigator();

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const BottomNav = () => {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'music', title: 'Music', icon: 'music' },
		{ key: 'albums', title: 'Albums', icon: 'album' },
		{ key: 'recents', title: 'Recents', icon: 'history' },
	]);

	const renderScene = BottomNavigation.SceneMap({
		music: MusicRoute,
		albums: AlbumsRoute,
		recents: RecentsRoute,
	});
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={AllCardsContainer} />
			<Tab.Screen name="Settings" component={AllCardsContainer} />
		</Tab.Navigator>
	)
}

export default BottomNav