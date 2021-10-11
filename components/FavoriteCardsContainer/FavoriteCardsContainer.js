import React from "react";
import { Text, View, StyleSheet } from "react-native";

const FavoriteCardsContainer = () => {
	return (
		<View style={styles.FavoriteCardsContainer}>
			<Text>FavoriteCardsContainer</Text>
		</View>
	)
}

export default FavoriteCardsContainer

const styles = StyleSheet.create({
	FavoriteCardsContainer: {
		borderColor: '#66bb6a',
		borderWidth: 2
	}
});