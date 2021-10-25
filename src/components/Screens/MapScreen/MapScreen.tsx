import React, { useEffect, useState } from "react"
import * as Location from "expo-location"
import { LocationObject } from "expo-location"
import MapView, { Marker } from "react-native-maps"
import { SafeAreaView, StyleSheet, Text } from "react-native"
import Topbar from "../../UI/Topbar/Topbar"



const MapScreen = () => {
	const [location, setLocation] = useState<LocationObject | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location: LocationObject = await Location.getCurrentPositionAsync({});
			console.log(location);
			setLocation(location);
		})();
	}, []);


	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Topbar goBack={false} title="Map" subtitle="Find cool places here" />
			{location ?
				(<MapView
					style={{ flex: 1, width: "100%" }}
					mapType="mutedStandard"
					initialRegion={{
						latitude: location.coords.latitude,  // from -90 to 90
						longitude: location.coords.longitude, // from -180 to 180
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>
					{location && (
						<Marker
							coordinate={{
								latitude: location.coords.latitude,
								longitude: location.coords.longitude,
							}}
						/>
					)}
				</MapView>)
				: <Text>{errorMsg}</Text>
			}

		</SafeAreaView>
	)
}

export default MapScreen

const styles = StyleSheet.create({})


