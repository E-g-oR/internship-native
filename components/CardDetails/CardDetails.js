import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CardDetails = () => {
	return (
		<View style={styles.CardDetails} >
			<Text>CardDetails</Text>
		</View>
	)
}
export default CardDetails

const styles = StyleSheet.create({
	CardDetails: {
		borderColor: '#ffca28',
		borderWidth: 2,
		marginVertical: 15
	}
});