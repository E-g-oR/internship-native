import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { IPost } from "../../UI/Card/Card";

const CardDetails: React.FC = () => {
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