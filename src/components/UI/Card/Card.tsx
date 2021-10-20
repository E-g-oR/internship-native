import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Button, Paragraph, Title, TouchableRipple } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import { observer } from "mobx-react";
import { PostsStore } from "../../../store/store";
import { useNavigation } from "@react-navigation/native";

export interface IPost {
	title: string,
	body: string,
	userId: number,
	id: number,
	isFavorite: boolean
}

const Post: React.FC<{ post: IPost, store: PostsStore }> = observer(({ post, store }: { post: IPost, store: PostsStore }) => {
	const navigation = useNavigation()
	const togglePost = (): void => {
		store.togglePost(post.id)
	}

	return (
		<Card style={[styles.Post, post.isFavorite ? styles.favorite : null]} elevation={4}>
			<TouchableRipple onPress={() => {
				navigation.navigate('Info', { post })
			}}>
				<Card.Content>
					<Title style={post.isFavorite ? styles.favoriteText : null}>{post.title}</Title>
					<Paragraph style={post.isFavorite ? styles.favoriteText : null}>{post.body}</Paragraph>
				</Card.Content>
			</TouchableRipple>
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
		backgroundColor: '#ffecb3',
	},
	favoriteText: {
		color: '#000'
	}
});