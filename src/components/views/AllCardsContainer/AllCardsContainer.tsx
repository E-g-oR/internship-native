import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator, Button, Surface } from "react-native-paper";
import Post from "../../UI/Card/Card";
import { observer } from 'mobx-react'
import { PostsStore } from "../../../store/store";
import Dropdown from "../../UI/Dropdown/Dropdown";
import { IPost } from "../../UI/Card/CardLogic";

const AllCardsContainer: React.FC<{ store: PostsStore }> = observer(({ store }) => {

	const [posts, setPosts] = useState<IPost[]>([])

	useEffect(() => {
		if (!store.allPosts.length) {
			store.getPosts();
		}

		const data: IPost[] = store.getFilteredData()
		setPosts(data)

	}, [store.allPosts, store.countryFilter]);

	return (
		<Surface style={{ flex: 1, height: '100%' }}>
			<Dropdown store={store} />
			<View style={styles.AllCardsContainer}>
				<ScrollView>
					{(posts.length) ?
						posts.map(post =>
							<Post post={post} key={post.id} store={store} />)
						: <ActivityIndicator />
					}
				</ScrollView>
			</View>
		</Surface>
	)
})

export default AllCardsContainer

const styles = StyleSheet.create({
	AllCardsContainer: {
		width: '90%',
		marginHorizontal: '5%',
		paddingVertical: 7
	}
});