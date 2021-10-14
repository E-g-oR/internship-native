import { observer } from "mobx-react/node_modules/mobx-react-lite";
import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Surface } from "react-native-paper";
import { PostsStore } from "../../../store/store";
import Post, { IPost } from "../../UI/Card/Card";

const FavoriteCardsContainer: React.FC<{ store: PostsStore }> = observer(({ store }) => {
	return (
		<View style={styles.FavoriteCardsContainer}>
			<Surface>
				<ScrollView>
					{store.allPosts.map(post => post.isFavorite ?
						<Post post={post} key={post.id} store={store} />
						: null)}
				</ScrollView>
			</Surface>
		</View >
	)
})

export default FavoriteCardsContainer

const styles = StyleSheet.create({
	FavoriteCardsContainer: {
		borderColor: '#66bb6a',
		borderWidth: 2,
	}
});