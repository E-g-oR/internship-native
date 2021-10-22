import React from "react";
import { StyleSheet } from "react-native";
import { Card, Button, Paragraph, Title, TouchableRipple } from "react-native-paper";
import { observer } from "mobx-react";
import { PostsStore } from "../../../store/store";
import CardLogic, { IPost } from "./CardLogic";

// type Props = NativeStackScreenProps<RootStackParamList, 'Info'>;


const Post: React.FC<{ post: IPost, store: PostsStore }> = observer(({ post, store }) => {

	const { navigateToPostInfo, togglePost } = CardLogic();
	return (
		<Card style={[styles.Post, post.isFavorite ? styles.favorite : null]} elevation={4}>
			<TouchableRipple onPress={() => { navigateToPostInfo(post) }}>
				<Card.Content>
					<Title style={post.isFavorite ? styles.favoriteText : null}>{post.title}</Title>
					<Paragraph style={post.isFavorite ? styles.favoriteText : null}>{post.body}</Paragraph>
					<Title >{post.country}</Title>
				</Card.Content>
			</TouchableRipple>
			<Card.Actions>

				<Button
					onPress={() => { togglePost(store, post.id) }}
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
		marginHorizontal: '1%'
	},
	favorite: {
		backgroundColor: '#ffecb3',
	},
	favoriteText: {
		color: '#000'
	}
});