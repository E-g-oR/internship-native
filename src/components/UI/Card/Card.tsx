import React from "react";
import { observer } from "mobx-react";
import { PostsStore } from "../../../store/store";
import CardLogic, { IPost } from "./CardLogic";
import { StyleSheet } from "react-native";
import { Card, Button, Paragraph, Title, TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";


const Post: React.FC<{ post: IPost, store: PostsStore }> = observer(({ post, store }) => {

	const navigation = useNavigation();
	const { title, body, country } = post;
	const { navigateToPostInfo, togglePost, Icon, StylePost, TextButton, StyleText } = CardLogic(post);

	return (
		<Card style={[styles.Post, StylePost]} elevation={4}>
			<TouchableRipple onPress={() => { navigateToPostInfo(navigation) }}>
				<Card.Content>

					<Title style={StyleText}>{title}</Title>
					<Paragraph style={StyleText}>{body}</Paragraph>
					<Title >{country}</Title>

				</Card.Content>
			</TouchableRipple>
			<Card.Actions>

				<Button
					onPress={() => { togglePost(store) }}
					icon={Icon}
					mode="outlined"
				>
					{TextButton}
				</Button>

			</Card.Actions>

		</Card>
	)
})
export default Post;

const styles = StyleSheet.create({
	Post: {
		marginBottom: 10,
		marginHorizontal: '1%'
	}
});