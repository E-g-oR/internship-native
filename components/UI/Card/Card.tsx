import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Button, Paragraph, Title, TouchableRipple } from "react-native-paper";

export interface IPost {
	title: string,
	body: string,
	userId: number,
	id: number
}

const Post: React.FC<{ post: IPost }> = ({ post }) => {
	return (

		<Card style={styles.Post}>
			<Card.Content>

				<Title>{post.title}</Title>
				<Paragraph>{post.body}</Paragraph>

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