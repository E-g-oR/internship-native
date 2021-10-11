import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Post from "../Card/Card";

const AllCardsContainer = () => {
	return (
		<ScrollView style={styles.AllCardsContainer}>
			<ActivityIndicator />
			<View>
				<Post title="Hello motherf*cker" body="Here's some text for body of test post" />
				<Post title="Hello motherf*cker" body="Here's some text for body of test post" />
				<Post title="Hello motherf*cker" body="Here's some text for body of test post" />
				<Post title="Hello motherf*cker" body="Here's some text for body of test post" />
			</View>
		</ScrollView>
	)
}

export default AllCardsContainer

const styles = StyleSheet.create({
	AllCardsContainer: {
		height: '70%',
		borderColor: '#ef5350',
		borderWidth: 2,
		paddingVertical: 7
	}
});