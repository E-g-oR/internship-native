import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Button, Paragraph, Title, TouchableRipple } from "react-native-paper";

const Post = ({ title, body }) => {
	return (

		<Card style={styles.Post}>
			<Card.Content>

				<Title>{title}</Title>
				<Paragraph>{body}</Paragraph>

			</Card.Content>
			<Card.Actions>
				<Button onPress={() => { console.log('click'); }} icon="heart" mode="contained">Add to favorites</Button>
			</Card.Actions>
		</Card>

	)
}
export default Post

const styles = StyleSheet.create({
	Post: {
		marginBottom: 10,
		marginHorizontal: 10
	}
});