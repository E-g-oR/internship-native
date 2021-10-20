import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { ActivityIndicator, Surface } from "react-native-paper";
import Post, { IPost } from "../../UI/Card/Card";
import { observer } from 'mobx-react'
import { IStore, PostsStore } from "../../../store/store";

const AllCardsContainer: React.FC<{ store: PostsStore }> = observer(({ store }) => {

	useEffect(() => {
		if (!store.allPosts.length) {
			store.getPosts()
		}
	}, [store])

	return (
		<Surface>
			<View style={styles.AllCardsContainer}>
				<ScrollView>
					{store.allPosts.length ?
						store.allPosts.map(post =>
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
		// position: 'relative',
		// height: 600,
		borderColor: '#ef5350',
		borderWidth: 2,
		paddingVertical: 7
	}
});