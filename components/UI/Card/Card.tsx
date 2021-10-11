import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Button, Paragraph, Title, TouchableRipple } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import { observer } from "mobx-react/node_modules/mobx-react-lite";
import { PostsStore } from "../../../store/store";

export interface IPost {
	title: string,
	body: string,
	userId: number,
	id: number,
	isFavorite: boolean
}

const Post: React.FC<{ post: IPost, store: PostsStore }> = observer(({ post, store }) => {

	const togglePost = (): void => {
		store.togglePost(post.id)
	}

	return (
		<Card style={[styles.Post, post.isFavorite ? styles.favorite : null]} elevation={4}>

			<Card.Content>
				<Title>{post.title}</Title>
				<Paragraph>{post.body}</Paragraph>
			</Card.Content>

			<Card.Actions>

				<Button
					onPress={togglePost}
					icon={post.isFavorite ? "heart" : "heart-outline"}
					mode="outlined"
				>
					{post.isFavorite ? "Remove" : "Add to favorites"}
				</Button>

			</Card.Actions>

		</Card>
	)
})
export default Post

const styles = StyleSheet.create({
	Post: {
		marginBottom: 10,
		marginHorizontal: 10
	},
	favorite: {
		backgroundColor: '#ffecb3'
	}
});